'use strict';

var assert = require('assert');

module.exports = Doth;

function Doth() {
  /**
   * Strict mode will throw when a value of "undefined" is found
   * @type {Boolean}
   */
  this.strict = true;
}

/**
 * Get value in object at given path
 * @param  {object} object     source object
 * @param  {path} dottedPath path using dot-notation
 * @return {var}            value at path or undefined
 * @throws {Error} if root, branch or leaf do not exists or have a value of "undefined" and Doth.strict === true
 */
Doth.prototype.get = function(object, dottedPath) {
  assert(typeof object === 'object', 'First parameter to Doth.get should be an object, not ' + typeof object);
  assert(typeof dottedPath === 'string', 'Second parameter to Doth.get should be a string, not ' + typeof dottedPath);
  
  dottedPath = dottedPath.split('.');
  assert(dottedPath.length > 0, 'Path should not be empty');
    
  var ret = object;
  
  while (dottedPath.length > 0) {
    var pathToken = dottedPath.shift();
    
    if (ret.hasOwnProperty(pathToken)) {
      ret = ret[pathToken];
    } else {
      if (this.strict) {
        throw new Error('Path branch or leaf led to undefined (and strict is true).');
      } else {
        return undefined;
      }
    }
  }
  
  return ret;
};


