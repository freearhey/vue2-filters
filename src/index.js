import util from './util/index'
import * as stringFilters from './string/index'
import * as arrayFilters from './array/index'
import * as otherFilters from './other/index'

var install = function(Vue, namespace = '') {
  util.each(stringFilters, function(value, key) {
      Vue.filter(namespace + key, value)
  })

  util.each(otherFilters, function(value, key) {
      Vue.filter(namespace + key, value)
  })

  Vue.mixin({
    methods: {
      [namespace + 'limitBy']: arrayFilters.limitBy,
      [namespace + 'filterBy']: arrayFilters.filterBy,
      [namespace + 'orderBy']: arrayFilters.orderBy,
      [namespace + 'find']: arrayFilters.find
    }
  })
}

export var Vue2Filters = {
  install: (Vue) => install(Vue)
}

export function NamespacedVue2Filters(namespace) {
  return {
    install: (Vue) => install(Vue, namespace)
  };
}

export default Vue2Filters;


if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(Vue2Filters);
}
