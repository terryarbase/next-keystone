var Config = require(global.__base + '/config/Config');
var conf = new Config();


function CacheManager () {
	var cache = {};

	if (CacheManager._singletonInstance) {
		return CacheManager._singletonInstance;
	}
	CacheManager._singletonInstance = this;

	this.setCache = function (key, value) {
		cache[`${conf.cachePrefix}${key}`] = value;
	};

	this.getCache = function (key, callback) {
		callback(null, cache[`${conf.cachePrefix}${key}`]);
	};
	
	this.deleteCache = function (key) {
		delete cache[`${conf.cachePrefix}${key}`];
	};

}


module.exports = CacheManager;
