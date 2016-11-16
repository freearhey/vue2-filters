import util from './util/index'
import * as stringFilters from './string/index'
import * as arrayFilters from './array/index'
import * as otherFilters from './other/index'

function install(Vue) {
  util.each(stringFilters, function(value, key) {
      Vue.filter(key, value)
  })

  util.each(otherFilters, function(value, key) {
      Vue.filter(key, value)
  })

  Vue.mixin({
    methods: {
      limitBy: arrayFilters.limitBy,
      filterBy: arrayFilters.filterBy,
      orderBy: arrayFilters.orderBy
    }
  })
}

if (window.Vue) {
  Vue.use(install)
} else if (typeof exports === "object") {
  module.exports = install
} else if (typeof define === "function" && define.amd) {
  define([], function(){ return install })
} 