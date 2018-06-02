/**
 *
 * name: iiko-delivery
 * documentation: https://docs.google.com/document/d/1kuhs94UV_0oUkI2CI3uOsNo_dydmh9Q0MFoDWmhzwxc/edit#
 * author: pub42 (xziy, ...)
 *
 */
let config;


const request = require('iiko-request');


const methods = {
  getDeliveryTerminals: {
    type: 'GET',
    path: '/api/0/deliverySettings/getDeliveryTerminals/',
    params: {organization: 'string'}
  },
  getNomenclature: {
    type: 'GET',
    path: '/api/0/nomenclature/',
    params: {
      revision: 'string'
    },
    modifier: url => url + config.organization
  },
  getOrganization: {
    type: 'GET',
    path: '/api/0/organization/list',
    params: {
      request_timeout: 'number'
    }
  },
  getStopList: {
    type: 'GET',
    path: '/api/0/stopLists/getDeliveryStopList',
    params: {
      organization: 'string'
    }
  },
  createOrder: {
    type: 'POST',
    path: '/api/0/orders/add',
    params: {
      request_timeout: 'number'
    }
  },
  getCities: {
    type: 'GET',
    path: '/api/0/cities/cities',
    params: {
      organization: 'string'
    }
  }
};

////////////////////////////////////////////////////////////////////////////////
exports.init = function (_config) {
  config = _config;
  request.init(config);
};

exports.api = function (method, params, data) {
  return new Promise((resolve, reject) => {

    // TODO: validation data for separate method
    request.call(methods[method], params, methods[method].modifier, data).then(
      result => {
        resolve(result);
      },
      error => {
        reject(error);
      });
  })
};

exports.getApi = function (name) {
  if (!name)
    return Object.keys(methods);

  if (!methods.hasOwnProperty(name))
    return null;

  return methods[name];
};
