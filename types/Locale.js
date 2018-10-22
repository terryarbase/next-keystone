/*
 *  @file       Locale.js
 *  @author     Terry Chan
 *  @date       19-10-2018
 *
 *  @description
 *  Immutable file for Localizations
 */
const keystone = require('keystone');
const { Map } = require('immutable');

const Locale = Map({
	zhtw: {
		label: 'Chinese Traditional',
		value: 'zh-HK'
	},
	en: {
		label: 'English',
		value: 'en-US'
	},
});

module.exports = Locale;

