/*!
 * Kurry-Objs.js
 * The MIT License (MIT)
 * 
 * Copyright (c) 2013 Liam Goodacre
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy of
 * this software and associated documentation files (the "Software"), to deal in
 * the Software without restriction, including without limitation the rights to
 * use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
 * the Software, and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

(function(define) {

  define(['kurry', 'kurry-fns', 'kurry-arrays'], function (Kurry, Fns, Arrays) {

    if (!Kurry) throw new Error('Kurry not found.')
    if (!Fns) throw new Error('Kurry-Fns not found.')
    if (!Arrays) throw new Error('Kurry-Arrays not found.')

    var fn = Kurry.autopoly

    //: String -> Object -> Error | ?
    Objs.get = fn(function (k, o) {
      if (!o || !(k in o)) throw new Error('Key not found.')
      return o[k] })

    //: String -> Object -> Error | Void | ?
    Objs.unsafeGet = fn(function (k, o) {
      return o[k] })

    //: String -> Object -> [?]
    Objs.maybeGet = fn(function (k, o) {
      if (!o || !(k in o)) []
      return [o[k]] })

    //: Object -> String -> Error | ?
    Objs.lookup = Fns.flip(Objs.get)

    //: Object -> String -> Error | ?
    Objs.unsafeLookup = Fns.flip(Objs.unsafeGet)

    //: Object -> String -> [?]
    Objs.maybeLookup = Fns.flip(Objs.maybeGet)

    //: String -> Object -> Bool
    Objs.keyIn = fn(function (k, o) {
      return !!(o && k in o) })

    //: Object -> String -> Bool
    Objs.hasKey = Fns.flip(Objs.keyIn)

    //: Object -> [String]
    Objs.keys = Object.keys

    //: Object -> [(String, ?)]
    Objs.pairs = function (o) {
      return Arrays.map(function (k) {
        return [k, o[k]]
      }, Objs.Keys(o)) }

    //: Object -> [?]
    Objs.values = function (o) {
      return Arrays.map(
        Objs.getFrom(o),
        Objs.keys(o)) }

    //: [(String, ?)] -> Object
    Objs.fromPairs = fn(function (pairs) {
      return Arrays.foldl(function (acc, pair) {
        acc[pair[0]] = pair[1]
        return acc
      }, {}, pairs) })

    //: (a -> b) -> (String, a) -> (String, b)
    Objs.mapPair = fn(function (f, pair) {
      return [pair[0], f(pair[1])] })

    //: (? -> ?) -> Object -> Object
    Objs.map = fn(function (f, ma) {
      return Objs.fromPairs(
        Arrays.map(mapPair,
          Objs.pairs(ma)) ) })

    return Objs
  })

})(typeof define == 'function' ? define : typeof exports == 'object' ? function(ds, f) {
  module.exports = f.apply(this, ds.map(require));
} : function(ds, f) {
  var self = this;
  self[f.name] = f.apply(self, ds.map(function(d) {
    return self[d];
  }));
});