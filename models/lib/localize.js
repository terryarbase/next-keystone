const _ = require('lodash');
const keystone = require('keystone');

const Types = keystone.Field.Types;

const Locale = require(`${global.__base}/types/Locale`);

const localize = function localize(fields) {
    const defaultLocale = Locale.get('zhtw').value;

    const localizedFields = {
        // locale: {
        //     type: Types.Select,
        //     options: Locale.options,
        //     default: defaultLocale,
        //     required: true,
        //     initial: true,
        //     hidden: true,
        //     label: 'Language',
        // }
    };

    Object.keys(fields).forEach(key => {
        localizedFields[key] = fields[key];
        if (
            [
                Types.Text.name,
                Types.Textarea.name,
                Types.CloudinaryImage.name,
                Types.CloudinaryImages.name,
                Types.File.name,
                Types.Html.name
            ].includes(fields[key].type.name) &&
            !fields[key].skipLocalized
        ) {
            // localizedFields[key].dependsOn = {
            //     locale: defaultLocale
            // };
            
            Locale.enums
                .filter(locale => locale.key !== defaultLocale)
                .forEach(locale => {
                    const currentKey = `${key}_${locale.key}`;
                    localizedFields[currentKey] = _.clone(fields[key]);
                    // localizedFields[currentKey].dependsOn = {
                    //     locale: locale.key
                    // };
                    if (fields[key].label) {
                        localizedFields[currentKey].label = _.startCase(`${locale.value} ${fields[key].label}`);
                    } else {
                        localizedFields[currentKey].label = _.startCase(`${locale.value} ${key}`);
                    }
                    // delete localizedFields[currentKey].required;
                });
        }
    });

    return localizedFields;
};

module.exports = localize;
