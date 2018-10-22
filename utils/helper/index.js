/*
* Utility included some helper static function
*/

const keystone      = require('keystone');
const moment        = require('moment');
const _forEach      = require('lodash/forEach');
const _findIndex    = require('lodash/findIndex');
const _filter       = require('lodash/filter');
const _sortBy       = require('lodash/sortBy');
const conf          = require(global.__base + '/config/Config');

const mongoose          = keystone.mongoose;
const ValidationError   = mongoose.Error.ValidationError;
const ValidatorError    = mongoose.Error.ValidatorError;

const fs = require('fs');
const path = require('path');

function Utility() {}

/**
* An enum object as argument and string as return value
* The enum need to have count defined
* */
Utility.enumToKeystonOptionStr = function enumToKeystonOptionStr(enumObj) {
    let returnOptionString = '';
    for (let i = 0; i < enumObj.enums.length; i += 1) {
        returnOptionString += enumObj.enums[i].key;

        if (i < enumObj.enums.length - 1) {
            returnOptionString += ',';
        }
    }
    return returnOptionString;
};

/*
** Sort the result list
** @param1: list to be sorted
** @param2: sorting field
** @param3: is descending ordering
** @Terry Chan, 01/08/2018
*/
Utility.sortResultListByOrdering = function(list, field, desc) {
    var priorityList = _filter(list, function(o) {
        return o[field] !== 0;
    });
    const normalList = _filter(list, function(o) {
        return o[field] === 0;
    });
    priorityList = _sortBy(priorityList, field);
    // sort again
    // if (minorField) {
    //     priorityList = _sortBy(priorityList, minorField).reverse();
    // }
    if (desc) {
        priority = priority.reverse();
    }
    return priorityList.concat(normalList);
}

/*
** Add prefix to the target value with target length
** @param1: current value
** @param2: target length (default 6)
** @param3: prefix (default 0)
** @Terry Chan, 04/07/2018
*/
Utility.padNumber = (value, length = 6, prefix = '0000000') => (prefix +''+ value).slice(length * -1);

/*
** Check for a valid date from today
** @param1: startdate
** @param2: enddate
** @Terry Chan, 12/07/2018
*/
Utility.inValidDateRange = (start, end) => {
    const mStart = moment(start);
    const mEnd = moment(end);
    const mToday = moment({h: 0, m: 0});
    // console.log(mStart, mEnd, mToday, mStart.isSameOrBefore(mEnd) ? 1 : 0, mToday.isSameOrBefore(mStart) ? 2 : 3);
    return !mStart.isSameOrBefore(mEnd) || !mToday.isSameOrBefore(mStart);
};
Utility.inValidSingleDateRange = (date) => {
    const mDate = moment(date);
    const mToday = moment({h: 0, m: 0});
    return !mToday.isSameOrBefore(mDate);
};
/*
** Promise - Check all of invalid upload image
** @param1: fields to be checked
** @param2: storage object
** @Terry Chan, 05/10/2018
*/
Utility.validImagesCheck = (list, storage, required=false) => {
    return new Promise(resolve => {
        var totalSize = 0;
        const { totalImageUploadMaxSize } = conf;
        _forEach(list, (f) => {
            console.log(storage[f.field], storage[f.field].filename);
            if (storage[f.field] && storage[f.field].filename) {
                const allowed = _findIndex(conf.imageMineTypeAllowed, (e) => e === storage[f.field].mimetype);
                if (allowed === -1) {
                    resolve(`Image file format invalid (e.g. ${conf.imageMineTypeAllowed.join(',')})`);
                }
                totalSize += storage[f.field].size;
            } else if (required && (!storage[f.field] || !storage[f.field].filename)) {
                resolve(`Please upload ${f.label || f.field} file`);
            }
        });
        if (totalImageUploadMaxSize && totalSize >= totalImageUploadMaxSize) {
            resolve(`Please upload all of files, which are less than ${totalImageUploadMaxSize / 1000 / 1000}MB size.`);
        }
        resolve(null);
    });
};

/*
** Promise - Check any invalid upload image
** @param1: fields to be checked
** @param2: storage object
** @Terry Chan, 11/07/2018
*/
Utility.validImageCheck = (list, storage, required=false) => {
    return new Promise(resolve => {
        _forEach(list, (f) => {
            console.log(storage[f.field], storage[f.field].filename);
            if (storage[f.field] && storage[f.field].filename) {
                const allowed = _findIndex(conf.imageMineTypeAllowed, (e) => e === storage[f.field].mimetype);
                if (allowed === -1) {
                    resolve(`Image file format invalid (e.g. ${conf.imageMineTypeAllowed.join(',')})`);
                }
                // console.log(storage[f.field], storage[f.field].type);
                if (storage[f.field].size > conf.imageUploadMaxSize && !f.type) {
                    resolve(`${f.label || f.field} file size over 400KB`);
                } else if (storage[f.field].size > conf.thumbnailUploadMaxSize && f.type === 'thumbnail') {
                    resolve(`${f.label || f.field} file size over 200KB`);
                }
            } else if (required && (!storage[f.field] || !storage[f.field].filename)) {
                resolve(`Please upload ${f.label || f.field} file`);
            }
        });
        resolve(null);
    });
};
/*
** Promise - Check any invalid upload attachment file
** @param1: fields to be checked
** @param2: storage object
** @Terry Chan, 11/07/2018
*/
Utility.validAttachmentCheck = (list, storage, required=false) => {
    return new Promise(resolve => {
        _forEach(list, (f) => {
            if (storage[f.field] && storage[f.field].filename) {
                const allowed = _findIndex(conf.attachmentMineTypeAllowed, (e) => e === storage[f.field].mimetype);
                if (allowed === -1 && required) {
                    resolve(`${f.label} file format invalid (e.g. ${conf.attachmentMineTypeAllowed.join(',')})`);
                }
                // console.log(storage[f.field], storage[f.field].type);
                if (storage[f.field].size > conf.attachmentUploadMaxSize) {
                    resolve(`${f.label} file size over 5MB`);
                }
            } else if (required && (!storage[f.field] || !storage[f.field].filename)) {
                resolve(`Please upload ${f.label} file`);
            }
        });
        resolve(null);
    });
};

Utility.createPreSaveError = function createPreSaveError(msg) {
    const error = new ValidationError(this);
    error.errors.email = new ValidatorError(null, msg, null, null);
    return error;
};

Utility.createError = function createError(msg) {
    return new Error(msg);
};

Utility.isString = function isString(str) {
    return typeof str === 'string' || str instanceof String;
};

Utility.capitalize = function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
};

Utility.getClientIp = function getClientIp(req) {
    const str =
        (req.headers['X-Forwarded-For'] ||
            req.headers['x-forwarded-for'] ||
            ''
        ).split(',')[0] || req.client.remoteAddress;
    const array = str.split(':');
    return array.slice(-1)[0];
};

Utility.getRandomInt = function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

Utility.putObjectIdAndNameToOptionArray = function putObjectIdAndNameToOptionArray(
    dataArray
) {
    const destArray = [];
    dataArray.forEach(item => {
        const tempObj = {};
        tempObj.displayValue = item.name;
        tempObj.value = item._id;
        destArray.push(tempObj);
    });
    return destArray;
};

Utility.putEnumToOptionArray = function putEnumToOptionArray(enumObj) {
    const destArray = [];
    for (let i = 0; i < enumObj.enums.length; i += 1) {
        const tempObj = {};
        tempObj.displayValue = enumObj.enums[i].key;
        tempObj.value = enumObj.enums[i].key;
        destArray.push(tempObj);
    }
    return destArray;
};

Utility.checkWhetherKeyInEnum = function checkWhetherKeyInEnum(enumObj, key) {
    for (let i = 0; i < enumObj.enums.length; i += 1) {
        if (key === enumObj.get(i).key) {
            return true;
        }
    }
    return false;
};

Utility.getDirectories = function getDirectories(srcpath) {
    return fs
        .readdirSync(srcpath)
        .filter(file => fs.lstatSync(path.join(srcpath, file)).isDirectory());
};

module.exports = Utility;
