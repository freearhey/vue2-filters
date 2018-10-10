import util from './util/index'
import * as stringFilters from './string/index'
import * as arrayFilters from './array/index'
import * as otherFilters from './other/index'

var Vue2Filters = {
  install: function(Vue) {
    util.each(stringFilters, function(value, key) {
        Vue.filter(key, value)
    })

    util.each(otherFilters, function(value, key) {
        Vue.filter(key, value)
    })

    Vue.mixin({
      methods: {
        limitBy2: arrayFilters.limitBy,
        filterBy2: arrayFilters.filterBy,
        orderBy2: arrayFilters.orderBy,
        find2: arrayFilters.find
      }
    })
  }
}

export default Vue2Filters;

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(Vue2Filters);
}
