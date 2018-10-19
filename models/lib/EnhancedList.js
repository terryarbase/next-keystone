const keystone = require('keystone');
const _ = require('lodash');
const jsonpatch = require('fast-json-patch');
const Joi = require('joi');

const utils = keystone.utils;

class EnhancedList {
    constructor(listName, listOptions = {}) {
        const keystoneList = new keystone.List(listName, listOptions);
        // console.log('>>>>>>>>>>>', listName, keystoneList);
        const resourceName = listName.toLowerCase();

        this._name = resourceName;
        this._language = 'zh-HK';
        this._pluralizedName = utils.plural(resourceName);
        this._keystoneList = keystoneList;
        this._model = null;
        this._defaultSelectOption = null;
        this._defaultSortOption = null;
        this._defaultPaginateOption = {
            page: 1,
            perPage: 10
        };
        this._defaultPatchJoiSchema = null;
        this._childResources = [];
        this._plainChildResources = [];
        this._searchKeyword = '';
    }

    get name() {
        return this._name;
    }

    get language() {
        return this._language;
    }

    set language(language) {
        this._language = language;
    }

    get pluralizedName() {
        return this._pluralizedName;
    }

    get searchKeyword() {
        return this._searchKeyword;
    }

    set searchKeyword(keyword) {
        this._searchKeyword = keyword;
    }

    get keystoneList() {
        return this._keystoneList;
    }

    get model() {
        return this._model;
    }

    get childResources() {
        return this._childResources;
    }

    get plainChildResources() {
        return this._plainChildResources;
    }

    get defaultSelectOption() {
        return this._defaultSelectOption;
    }

    set defaultSelectOption(selectOption) {
        this._defaultSelectOption = selectOption;
    }

    get defaultSortOption() {
        return this._defaultSortOption;
    }

    set defaultSortOption(sortOption) {
        this._defaultSortOption = sortOption;
    }

    get defaultPaginateOption() {
        return this._defaultPaginateOption;
    }

    set defaultPaginateOption(paginateOption) {
        this._defaultPaginateOption = paginateOption;
    }

    get defaultPatchJoiSchema() {
        return this._defaultPatchJoiSchema;
    }

    set defaultPatchJoiSchema(schema) {
        this._defaultPatchJoiSchema = schema;
    }

    add() {
        this._keystoneList.add(...arguments);
    }

    register() {
        // this._keystoneList.schema.query.customPopulate =
        //     MongooseQueryHelper.customPopulate;

        this._keystoneList.register();

        this._model = this._keystoneList.model;
        keystone.enhancedList().push(this);
    }

    addChildResource(resource) {
        this.childResources.push(resource);
    }

    getById(id, findOption, populateOption = '') {
        return this._model
            .find(findOption)
            .findOne({
                _id: id
            })
            .customPopulate(populateOption, this._keystoneList)
            .select(this.defaultSelectOption);
    }

    getList(findOption, sortOption, populateOption = '') {
        return this._model
            .find(findOption)
            .select(this.defaultSelectOption)
            .customPopulate(populateOption, this._keystoneList)
            .sort(sortOption || this.defaultSortOption);
    }

    getListByPage(findOption, sortOption, paginateOption, populateOption = '') {
        const { page, perPage } = _.merge(
            {},
            this.defaultPaginateOption,
            paginateOption
        );
        return new Promise((resolve, reject) => {
            this._keystoneList
                .paginate({
                    page,
                    perPage,
                    filters: findOption
                })
                .select(this.defaultSelectOption)
                .customPopulate(populateOption, this._keystoneList)
                .sort(sortOption || this.defaultSortOption)
                .lean()
                .exec((err, results) => {
                    if (err) {
                        reject(err);
                    } else {
                        results.perPage = perPage;
                        resolve(results);
                    }
                });
        });
    }

    postToCreate(entity) {
        const newDoc = new this._model(entity);
        return newDoc.save();
    }

    amendPatchForRemoveByValue(obj, patches) {
        const objToBeManipulated = JSON.parse(JSON.stringify(obj));

        patches.forEach(patch => {
            if (patch.op === 'remove-by-value') {
                const keys = patch.path.split('/');
                if (
                    patch.value &&
                    typeof patch.value === 'string' &&
                    keys.length === 2 &&
                    Array.isArray(objToBeManipulated[keys[1]])
                ) {
                    const index = objToBeManipulated[keys[1]].findIndex(
                        element => element.toString() === patch.value
                    );
                    if (index > -1) {
                        patch.op = 'remove';
                        patch.path = `${patch.path}/${index}`;
                        objToBeManipulated[keys[1]].splice(index, 1);
                        delete patch.value;
                    } else {
                        patch.op = 'test';
                    }
                } else {
                    patch.op = 'test';
                }
            }
        });
    }

    patchById(id, findOption, patches) {
        return this.getById(id, findOption)
            .exec()
            .then(result => {
                let _patches = patches;
                if (!Array.isArray(_patches)) {
                    _patches = [_patches];
                }

                this.amendPatchForRemoveByValue(result, _patches);

                const jsonPatchError = jsonpatch.validate(_patches, result);
                if (!jsonPatchError) {
                    const patchRequestDefaultJoiSchema = Joi.object().keys({
                        op: Joi.string()
                            .valid(
                                'add',
                                'remove',
                                'replace',
                                'move',
                                'copy',
                                'test'
                            )
                            .required(),
                        path: Joi.string().required(),
                        value: Joi.any()
                    });

                    let joiSchema = patchRequestDefaultJoiSchema;
                    if (this.defaultPatchJoiSchema) {
                        joiSchema = patchRequestDefaultJoiSchema.keys(
                            this.defaultPatchJoiSchema
                        );
                    }

                    let joiValidateResult = null;
                    _patches.some(patch => {
                        joiValidateResult = Joi.validate(patch, joiSchema);
                        return joiValidateResult.error;
                    });

                    if (!joiValidateResult.error) {
                        jsonpatch.applyPatch(result, _patches);
                        return result.save();
                    }
                    return Promise.reject(joiValidateResult.error);
                }
                return Promise.reject(jsonPatchError);
            });
    }
}

module.exports = EnhancedList;
