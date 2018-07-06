// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({3:[function(require,module,exports) {
/** write UIC-SDK */

var _appendScriptTag = function _appendScriptTag(path, targetId) {

    var a = document.createElement('script');

    var b = document.getElementById(targetId);

    a.async = true;

    a.src = path;

    b.parentNode.insertBefore(a, b);
};

module.exports = _appendScriptTag;

// var isLocalHost = _isLocalHost()
},{}],4:[function(require,module,exports) {
/** check current page is localhost */

var _isLocalHost = function _isLocalHost() {

    if (location.hostname.indexOf('localhost') === -1) {

        return false;
    } else {

        return true;
    }
};

module.exports = _isLocalHost;

// var isLocalHost = _isLocalHost()
},{}],5:[function(require,module,exports) {
/** check current page is test or prod */

var _isTestPage = function _isTestPage() {

    var yourRegexpString = /test-/;

    // const yourHostname = 'test-r.gnavi.co.jp'
    var yourHostname = location.hostname;

    if (yourRegexpString.test(yourHostname)) {

        return true;
    } else {

        return false;
    }
};

module.export = _isTestPage;
},{}],6:[function(require,module,exports) {
/** check localStorage availability */

var _localStorageAvailable = function _localStorageAvailable(type) {
    try {
        var storage = window[type],
            x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    } catch (e) {
        return e instanceof DOMException && (
        // everything except Firefox
        e.code === 22 ||
        // Firefox
        e.code === 1014 ||
        // test name field too, because code might not be present
        // everything except Firefox
        e.name === 'QuotaExceededError' ||
        // Firefox
        e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
        // acknowledge QuotaExceededError only if there's something already stored
        storage.length !== 0;
    }
};

module.exports = _localStorageAvailable;
},{}],1:[function(require,module,exports) {
'use strict';

var _appendScriptTag2 = require('./utils/appendScriptTag');

var _appendScriptTag3 = _interopRequireDefault(_appendScriptTag2);

var _isLocalHost2 = require('./utils/isLocalHost');

var _isLocalHost3 = _interopRequireDefault(_isLocalHost2);

var _isTestPage2 = require('./utils/isTestPage');

var _isTestPage3 = _interopRequireDefault(_isTestPage2);

var _localStorageAvailable2 = require('./utils/localStorageAvailable');

var _localStorageAvailable3 = _interopRequireDefault(_localStorageAvailable2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function (path) {

  /** write UIC-SDK 
   * 
   * call as below
   * appendScriptTag(uicsdkPath, 'tsdk')
   * 
  */

  var appendScriptTag = _appendScriptTag3.default;

  /** check current page is localhost 
   * 
   * just check location.hostname contains 'localhost', then return true
   * 
  */

  var isLocalHost = _isLocalHost3.default;

  /** check current page is test or prod 
   * 
   * just check location.hostname contains 'test-', then return true
   * 
  */

  var isTestPage = _isTestPage3.default;

  /** check localStorage availability 
   * 
   * check availability of localstorage and return boolean
   * 
  */

  var localStorageAvailable = _localStorageAvailable3.default;

  console.log('isLocalHost', isLocalHost);
  console.log('isTestPage', isTestPage);
  console.log('localStorageAvailable', localStorageAvailable);

  if ((isLocalHost || isTestPage) && localStorageAvailable) {

    appendScriptTag('sdk', 't.js');
  }
})();
},{"./utils/appendScriptTag":3,"./utils/isLocalHost":4,"./utils/isTestPage":5,"./utils/localStorageAvailable":6}]},{},[1], null)