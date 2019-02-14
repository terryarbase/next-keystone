const withSass 	= require('@zeit/next-sass');
const path 		= require('path');
// console.log(path.resolve(__dirname, 'static/styles'));

module.exports = withSass({
	cssModules: true,
	cssLoaderOptions: {
		importLoaders: 1,
	    localIdentName: "[local]___[hash:base64:5]",
	},
	webpack: config => {
		/*
		** Absolute Import Path
		** Terry Chan
		** 22/10/2018
		**/
	    config.resolve = {
		    alias: {
		    	Styles: path.resolve(__dirname, 'static/styles'),
		    	Components: path.resolve(__dirname, 'components/'),
		    	Client: path.resolve(__dirname, 'client/'),
		    },
		};
	    return config;
	},
});
