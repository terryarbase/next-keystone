const MultiLang = require(global.__base + '/config/MultiLang');
const _ = require('lodash');

class CommonHandler {
	constructor(modelName, keystoneList) {
		this._name = modelName;
		this._keystoneList = keystoneList;
	}
	
	get name() {
		return this._name;
	}

	set name(name) {

	}
	
	get keystoneListRaw() {
		return this._keystoneList._keystoneList;
	}
	
	get model() {
		return this._model;
	}

	set model(model) {
		
	}

	choiceLang(obj , lang) {
		var enUS = [];
		_.each(obj, (value, key) => {              
			const lastSix = key.slice(-6);
			const noLastSix = key.slice(0, key.length - 6);
			if ( lastSix == '_en-US' ) {
				enUS.push({key_zh: noLastSix, key_en: key})
			}
		});
		_.map(enUS, (enUSEach) => {
			if (obj[enUSEach.key_zh]) {
				if (lang == 'en') {
					obj[enUSEach.key_zh] = obj[enUSEach.key_en];
				};
				delete obj[enUSEach.key_en];
			}
		});
	}

	appResAns(res, data) {
		const resAnswer = {
			status: true,
			errorCode: 0,
			errorMessage: '',
			data
		};
		res.json(resAnswer);
	}

	/*
	** 1.1 Specical for aggregation response from cursor (^MongoDB 3.6)
	** By Terry Chan 01/07/2018
	*/
	async appFromAggregation(cursor, single, lang) {
		const result = [];
		await (async () => {
          let doc;
          while ((doc = await cursor.next())) {
			this.choiceLang(doc, lang);
          	result.push(doc);
	        if (single) {
	        	break;
	        }
          }
        })();
        return result;
	}
 	async appResAnsFromAggregation(res, name, cursor, single = false, lang = 'en', errorKey = 'noAvailableRecord') {
		const result = await this.appFromAggregation(cursor, single, lang);
        if (single) {
        	if (!result.length) {
        		return this.multiResErr(res, lang, errorKey);
        	}
        	return this.appResAns(res, {
	        	[name]: result[0], 
	        });
        }
        return this.appResAns(res, {
        	total: result.length, 
        	[name]: result, 
        });
	}
	/*
	** same as 1.1 but without total count and flat to the parent level
	*/
	async appResLightFromAggregation(res, cursor, single = false, lang = 'en', errorKey = 'noAvailableRecord') {
		const result = await this.appFromAggregation(cursor, single, lang);
		// console.log(result);
        if (single) {
        	if (!result.length) {
        		return this.multiResErr(res, lang, errorKey);
        	}
        	return this.appResAns(res, result[0]);
        }
        return this.appResAns(res, result);
	}

	multiResAns(res, lang, data, options) {
		options = {
			sanitlizeForStaging: false,
			sanitlizeForGlus: false,
			...options
		};

		const resAnswer = {
			status: true,
			errorCode: 0,
			errorMessage: '',
			data
		};

		let sanitizedData = data;
		if (options.sanitlizeForStaging) {
			sanitizedData = this.sanitizeForStaging(sanitizedData, lang);
		}

		if (options.sanitlizeForGlus) {
			sanitizedData = this.sanitizeForGlus(sanitizedData, lang);
		}

		this.appResAns(res, sanitizedData);
	}

	appResErr(res, err, errorCode, errorMessage, httpCode, externalFlag={}) {
		const resError = {
			...{
				status: false,
				errorCode: errorCode || 999,
				errorMessage: errorMessage || 'Error',
			},
			...externalFlag,
		};
		// console.log(`[API Error][${new Date().toString()}][${res.req.url}]`, JSON.stringify(res.req.body), resError.errorCode, resError.errorMessage, httpCode);
		if (httpCode) {
			return res.status(httpCode).json(resError);
		}
		return res.json(resError);
	}

	// the original handling is default 200, so no change no rask
	multiResErr(res, lang, langItem, value, httpCode=200, externalFlag={}) {
		const ml = MultiLang[langItem];
		const eCode = (ml && ml.errCode) ? ml.errCode : 999;
		var eMessage = (ml && ml.content) ? 
			((lang == 'en') ? 
				(ml.content[1] ? ml.content[1] : ml.content[0]) : 
				ml.content[0]) :
			'Error' ;
		if (value) {
			eMessage = eMessage.replace("<value>", value);
		};
		// const resError = {
		// 	status: false,
		// 	errorCode: eCode,
		// 	errorMessage: eMessage
		// };
		// res.json(resError);
		this.appResErr(res, null, eCode, eMessage, httpCode, externalFlag);
	}

	registerToKeystone() {
		this._keystoneList.register();
		this._model = this._keystoneList.model;
	}
}

module.exports = CommonHandler;