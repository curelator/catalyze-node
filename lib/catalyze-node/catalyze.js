/*!
 * 
 * Copyright (C) 2013 Curelator, Inc.
 * Author: Gabriel Boucher (gboucher@curelator.com)
 * 
 * Copyright(c) 2012 BJ Basañes / Shiki (shikishiji@gmail.com)
 * MIT Licensed
 *
 * See the README.md file for documentation.
 */


var request = require('request');
var _ = require('underscore');

var Catalyze = function (applicationId, restAPIKey, apiIdentifier, sessionToken) {
  this.applicationId = applicationId;
  this.restAPIKey = restAPIKey;
  this.apiIdentifier = apiIdentifier;
  this.sessionToken = _.isUndefined(sessionToken) ? null : sessionToken;
};

Catalyze.prototype = {
  API_BASE_URL: 'https://api.catalyze.io',
  apiIdentifier: null,
  applicationId: null,
  restAPIKey: null,
  sessionToken: null,

  createUser: function (data, callback) {
    
    data.appId = this.applicationId;
    
    this._jsonRequest({
      method: 'POST',
      url: '/v1/user',
      params: data,
      callback: function (err, res, body, success) {
        if (!err && success)
          body = _.extend({}, data, body);
        callback(err, res, body, success);
      }
    });
  },

  getUser: function (params, callback) {
    this._jsonRequest({
      url: '/v1/user',
      params: _.isFunction(params) ? null : params,
      callback: _.isFunction(params) ? params : callback
    });
  },

  loginUser: function (username, password, callback) {
    this._jsonRequest({
      url: '/v1/auth/signin',
      params: {
        username: username,
        password: password
      },
      callback: callback
    });
  },

  updateUser: function (data, callback) {
    this._jsonRequest({
      method: 'PUT',
      url: '/v1/user',
      params: data,
      callback: callback
    });
  },

  deleteUser: function (callback) {
    this._jsonRequest({
      method: 'DELETE',
      url: '/v1/user',
      callback: callback
    });
  },
  
  createObject: function(className, data, callback) {
    
    data = {"content":data};
    
    this._jsonRequest({
      method: 'POST',
      url: '/v1/classes/' + className,
      params: data,
      callback: function(err, res, body, success) {
        if (!err && success)
          body = _.extend({}, data, body);
          callback(err, res, body, success);
      }
    });
  },
  
  findObject: function (className, params, callback) {
    this._jsonRequest({
      method: 'POST',
      url: '/v1/classes/' + className + '/query',
      params: _.isFunction(params) ? null : params,
      callback: _.isFunction(params) ? params : callback
    });
  },
  
  getLastObject: function (className, callback) {
    this.findObject (className, {"pageNumber":1,"pageSize":1}, callback);
  },
  
  
  
  // getObject: function(className, objectId, params, callback) {
  //   this._jsonRequest({
  //     url: '/1/classes/' + className + '/' + objectId,
  //     params: _.isFunction(params) ? null : params,
  //     callback: _.isFunction(params) ? params : callback
  //   });
  // },

  // getUsers: function(params, callback) {
  //   this._jsonRequest({
  //     url: '/1/users',
  //     params: _.isFunction(params) ? null : params,
  //     callback: _.isFunction(params) ? params : callback
  //   });
  // },
  // 
  // requestPasswordReset: function(email, callback) {
  //   this._jsonRequest({
  //     method: 'POST',
  //     url: '/1/requestPasswordReset',
  //     params: {'email': email},
  //     callback: callback
  //   });
  // },
  // 
  // createObject: function(className, data, callback) {
  //   this._jsonRequest({
  //     method: 'POST',
  //     url: '/1/classes/' + className,
  //     params: data,
  //     callback: function(err, res, body, success) {
  //       if (!err && success)
  //         body = _.extend({}, data, body);
  //       callback(err, res, body, success);
  //     }
  //   });
  // },
  // 
  // getObject: function(className, objectId, params, callback) {
  //   this._jsonRequest({
  //     url: '/1/classes/' + className + '/' + objectId,
  //     params: _.isFunction(params) ? null : params,
  //     callback: _.isFunction(params) ? params : callback
  //   });
  // },
  // 
  // updateObject: function(className, objectId, data, callback) {
  //   this._jsonRequest({
  //     method: 'PUT',
  //     url: '/1/classes/' + className + '/' + objectId,
  //     params: data,
  //     callback: callback
  //   });
  // },
  // 
  // deleteObject: function(className, objectId, callback) {
  //   this._jsonRequest({
  //     method: 'DELETE',
  //     url: '/1/classes/' + className + '/' + objectId,
  //     callback: callback
  //   });
  // },
  // 
  // getObjects: function(className, params, callback) {
  //   this._jsonRequest({
  //     url: '/1/classes/' + className,
  //     params: _.isFunction(params) ? null : params,
  //     callback: _.isFunction(params) ? params : callback
  //   });
  // },
  // 
  // countObjects: function(className, params, callback) {
  //   var paramsMod = params;
  // 
  //   if (_.isFunction(params)) {
  //     paramsMod = {};
  //     paramsMod['count'] = 1;
  //     paramsMod['limit'] = 0;
  //   } else {
  //     paramsMod['count'] = 1;
  //     paramsMod['limit'] = 0;
  //   }
  // 
  //   this._jsonRequest({
  //     url: '/1/classes/' + className,
  //     params: paramsMod,
  //     callback: _.isFunction(params) ? params : callback
  //   });
  // },
  // 
  // createRole: function(data, callback) {
  //   this._jsonRequest({
  //     method: 'POST',
  //     url: '/1/roles',
  //     params: data,
  //     callback: function(err, res, body, success) {
  //       if (!err && success)
  //         body = _.extend({}, data, body);
  //       callback(err, res, body, success);
  //     }
  //   });
  // },
  // 
  // getRole: function(objectId, params, callback) {
  //   this._jsonRequest({
  //     url: '/1/roles/' + objectId,
  //     params: _.isFunction(params) ? null : params,
  //     callback: _.isFunction(params) ? params : callback
  //   });
  // },
  // 
  // updateRole: function(objectId, data, callback) {
  //   this._jsonRequest({
  //     method: 'PUT',
  //     url: '/1/roles/' + objectId,
  //     params: data,
  //     callback: callback
  //   });
  // },
  // 
  // deleteRole: function(objectId, callback) {
  //   this._jsonRequest({
  //     method: 'DELETE',
  //     url: '/1/roles/' + objectId,
  //     callback: callback
  //   });
  // },
  // 
  // getRoles: function(params, callback) {
  //   this._jsonRequest({
  //     url: '/1/roles',
  //     params: _.isFunction(params) ? null : params,
  //     callback: _.isFunction(params) ? params : callback
  //   });
  // },
  // 
  // uploadFile: function(filePath, fileName, callback) {
  //   if (_.isFunction(fileName)) {
  //     callback = fileName;
  //     fileName = null;
  //   }
  // 
  //   var contentType = require('mime').lookup(filePath);
  //   if (!fileName)
  //     fileName = filePath.replace(/^.*[\\\/]/, ''); // http://stackoverflow.com/a/423385/246142
  //   var buffer = require('fs').readFileSync(filePath);
  //   this.uploadFileBuffer(buffer, contentType, fileName, callback);
  // },
  // 
  // uploadFileBuffer: function(buffer, contentType, fileName, callback) {
  //   this._jsonRequest({
  //     method: 'POST',
  //     url: '/1/files/' + fileName,
  //     body: buffer,
  //     headers: { 'Content-type': contentType },
  //     callback: callback
  //   });
  // },
  // 
  // deleteFile: function(name, callback) {
  //   this._jsonRequest({
  //     method: 'DELETE',
  //     url: '/1/files/' + name,
  //     callback: callback
  //   });
  // },
  // 
  // sendPushNotification: function(data, callback) {
  //   this._jsonRequest({
  //     method: 'POST',
  //     url: '/1/push',
  //     params: data,
  //     callback: function(err, res, body, success) {
  //       if (!err && success)
  //         body = _.extend({}, data, body);
  // 
  //       callback.apply(this, arguments);
  //     }
  //   });
  // },

  stringifyParamValues: function(params) {
    if (!params || _.isEmpty(params))
      return null;
    var values = _(params).map(function(value, key) {
      if (_.isObject(value) || _.isArray(value))
        return JSON.stringify(value);
      else
        return value;
    });
    var keys = _(params).keys();
    var ret = {};
    for (var i = 0; i < keys.length; i++)
      ret[keys[i]] = values[i];
    return ret;
  },

  _jsonRequest: function(opts) {
    opts = _.extend({
      method: 'GET',
      url: null,
      params: null,
      body: null,
      headers: null,
      callback: null
    }, opts);

    var reqOpts = {
      method: opts.method,
      headers: {
        'Content-Type': 'application/json',
        'X-Api-Key': 'browser ' + this.apiIdentifier + ' ' + this.restAPIKey
      }
    };
    if (this.sessionToken)
      reqOpts.headers['Authorization'] = 'Bearer ' + this.sessionToken;
    if (opts.headers)
      _.extend(reqOpts.headers, opts.headers);

    if (opts.params) {
      if (opts.method == 'GET')
        opts.params = this.stringifyParamValues(opts.params);

      var key = 'qs';
      if (opts.method === 'POST' || opts.method === 'PUT')
        key = 'json';
      reqOpts[key] = opts.params;
    } else if (opts.body) {
      reqOpts.body = opts.body;
    }

    request(this.API_BASE_URL + opts.url, reqOpts, function(err, res, body) {
      var isCountRequest = opts.params && !_.isUndefined(opts.params['count']) && !!opts.params.count;
      var success = !err && (res.statusCode === 200 || res.statusCode === 201);
      if (res && res.headers['content-type'] && res.headers['content-type'].toLowerCase().indexOf('application/json') >= 0) {
        try {
          if (!_.isObject(body) && !_.isArray(body)) {
            body = JSON.parse(body);
          }
          if (body.error) {
            success = false;
          } else if (body.results && _.isArray(body.results) && !isCountRequest) {
            // If this is a "count" request. Don't touch the body/result.
            body = body.results;
          }
        }
        catch(e) {
          success = false;
        } 
        
      }
      opts.callback(err, res, body, success);
    });
  }
};

module.exports = Catalyze;