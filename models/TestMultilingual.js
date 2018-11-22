const nextnode = require('next-nodecms');
const moment = require('moment');
const Types = nextnode.Field.Types;

const storage = new nextnode.Storage({
    adapter: nextnode.Storage.Adapters.FS,
    fs: {
        path: 'static/uploads/',
        publicPath: '/uploads/',
    },
    schema: {
        url: true
    }
});
/**
 * TestMultilingual Model
 * ==========
 */
const TestMultilingual = new nextnode.List('TestMultilingual', {
    track: true,
    history: true,
    multilingual: true,
    searchFields: 'name, email',
    defaultColumns: 'name, textarea, html, url, name, activate',
});
// format should be 'DD-MMM-YYYY h:mm a'
TestMultilingual.add(
    {
        username: {
            type: Types.Text,
            required: true,
            initial: true,
            index: true,
            label: 'Login Name',
        },
        textarea: {
            type: Types.Textarea,
            index: true,
        },
        html: {
            type: Types.Html,
            wysiwyg: true,
            index: true,
        },
        url: {
            type: Types.Url,
            index: true,
        },
        name: {
            type: Types.Name,
            index: true,
        },
        activate: {
            type: Types.Boolean,
            realedit: true,
        },

        thumbnail: {
            type: Types.CloudinaryImages,
            autoCleanup: true,
            select: true,
            selectPrefix: nextnode.get('cloudinary prefix') + '/',
            multilingual: false,
        },
    }
);

TestMultilingual.register();

module.exports = TestMultilingual;
