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
        // username: {
        //     type: Types.Text,
        //     required: true,
        //     initial: true,
        //     index: true,
        //     label: 'Login Name',
        // },
        // userna4me: {
        //     type: Types.Text,
        //     required: true,
        //     initial: true,
        //     index: true,
        //     label: 'Login Name',
        // },
        // usernam2e: {
        //     type: Types.Text,
        //     required: true,
        //     initial: true,
        //     index: true,
        //     label: 'Login Name',
        // },
        // usernam3e: {
        //     type: Types.Text,
        //     required: true,
        //     initial: true,
        //     index: true,
        //     label: 'Login Name',
        // },
        // date: {
        //     type: Types.DateRange,
        // },
        // use1rname: {
        //     type: Types.Text,
        //     required: true,
        //     initial: true,
        //     index: true,
        //     label: 'Login Name',
        // },
        // use4rname: {
        //     type: Types.Text,
        //     required: true,
        //     initial: true,
        //     index: true,
        //     label: 'Login Name',
        // },
        // user6name: {
        //     type: Types.Text,
        //     required: true,
        //     initial: true,
        //     index: true,
        //     label: 'Login Name',
        // },
        // user8name: {
        //     type: Types.Text,
        //     required: true,
        //     initial: true,
        //     index: true,
        //     label: 'Login Name',
        // },
        date2: {
            type: Types.DateTimeRange,
        },

    }
);

TestMultilingual.register();

module.exports = TestMultilingual;
