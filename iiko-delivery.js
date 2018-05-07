/*

name: iiko-delivery
documentation: https://docs.google.com/document/d/1kuhs94UV_0oUkI2CI3uOsNo_dydmh9Q0MFoDWmhzwxc/edit#
author: pub42 (xziy, ...)

*/
var config



const request = require('iiko-request');
    
    
var method = {
test: {
		type: 'GET',
		path: '/api/0/customers/test',
		params: {
			organization: "string",
			phone: "phone-ru"	
		}
	},
any: {} 
};    
    
////////////////////////////////////////////////////////////////////////////////
exports.init = function(_config) {
	config = _config;
	request.init(config);
};

exports.api = function(method, data) {
	return new Promise((resolve, reject) => {

		// TODO: vlidation data for separate methods 
		
		request.exec(method[method], data).then(
		  result => {
					resolve(result);
		  },
		  error => {
		      reject(error);
		  }
		)
  }
};
