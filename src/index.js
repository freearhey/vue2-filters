import util from './util/index'
import * as stringFilters from './string/index'
import * as arrayFilters from './array/index'
import * as otherFilters from './other/index'

var Vue2Filters = {
  install: function(Vue, options) {
    util.each(stringFilters, function(value, key) {
      Vue.filter(key, value.bind(options))
    })

    util.each(otherFilters, function(value, key) {
      Vue.filter(key, value.bind(options))
    })
  },
  mixin: {
    methods: {
        limitBy: arrayFilters.limitBy,
        filterBy: arrayFilters.filterBy,
        orderBy: arrayFilters.orderBy,
        find: arrayFilters.find
    }
  }
}

export default Vue2Filters;

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(Vue2Filters);
  window.Vue2Filters = Vue2Filters;
}
