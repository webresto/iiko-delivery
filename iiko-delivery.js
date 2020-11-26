/**
 * name: iiko-delivery
 * documentation: https://docs.google.com/document/d/1kuhs94UV_0oUkI2CI3uOsNo_dydmh9Q0MFoDWmhzwxc/edit#
 * author: pub42 (xziy, ...)
 *
 */

/**
 * type:
 *  - date: YYYY-MM-DD
 *
 */
const request = require('iiko-request');

let config;

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
      request_timeout: 'time'
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
      request_timeout: 'time'
    }
  },
  getCities: {
    type: 'GET',
    path: '/api/0/cities/cities',
    params: {
      organization: 'string'
    }
  },
  checkOrder: {
    type: 'POST',
    path: '/api/0/orders/checkCreate',
    params: {
      request_timeout: 'time'
    }
  },
  deliveryOrders: {
    type: 'GET',
    path: '/api/0/orders/deliveryOrders',
    params: {
      organization: 'string',
      dateFrom: 'date',
      dateTo: 'date',
      deliveryTerminalId: 'string',
      deliveryStatus: 'string'
    }
  },
  cancelOrder: {
    type: 'POST',
    path: '/api/0/orders/add_order_problem',
    params: {
      organization: 'string',
      request_timeout: 'time'
    }
  },
  userCreateOrUpdate: {
    type: 'POST',
    path: '/api/0/customers/create_or_update',
    params: {
      organization: 'string'
    }
  },
  userGetInfoByPhone: {
    type: 'GET',
    path: '/api/0/customers/get_customer_by_phone',
    params: {
      organization: 'string',
      phone: 'string'
    }
  },
  userUseBonuses: {
    type: 'POST',
    path: '/api/0/customers/withdraw_balance',
    params: {}
  },
  userAddBonuses: {
    type: 'POST',
    path: '/api/0/customers/refill_balance',
    params: {}
  },
  userGetTransactions: {
    type: 'GET',
    path: '/api/0/organization/{organizationId}/transactions_report',
    params: {
      date_from: 'date',
      date_to: 'date',
      userId: 'string'
    },
    modifier: url => url.replace('{organizationId}', config.organization)
  },
  sendSMS: {
    type: 'POST',
    path: '/api/0/organization/{organizationId}/send_sms',
    params: {},
    modifier: url => url.replace('{organizationId}', config.organization)
  },
  getPaymentTypes: {
    type: 'GET',
    path: '/api/0/rmsSettings/getPaymentTypes',
    params: {
      organization: 'string'
    }
  },
  getDiscounts: {
    type: 'GET',
    path: '/api/0/deliverySettings/deliveryDiscounts',
    params: {
      organization: 'string'
    }
  },
  getUserHistory: {
    type: 'GET',
    path: '/api/0/orders/deliveryHistoryByPhone',
    params: {
      organization: 'string',
      phone: 'string'
    }
  },
  getOrderInfo: {
    type: 'GET',
    path: '/api/0/orders/info',
    params: {
      organization: 'string',
      orderId: 'string'
    }
  }
};

function init(_config) {
  config = _config;
  request.init(config);
}

function api(method, params, data) {
  return new Promise((resolve, reject) => {
    // TODO: rewrite to TS :)
    if (!methods[method])
      reject('Method not found');
    request.call(methods[method], params, methods[method].modifier, data)
      .then(resolve)
      .catch(reject);
  })
}

function getApi(name) {
  if (!name)
    return Object.keys(methods);

  if (!methods.hasOwnProperty(name))
    return null;

  return methods[name];
}

exports.init = init;
exports.api = api;
exports.getApi = getApi;
