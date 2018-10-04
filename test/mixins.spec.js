import { Vue2Filters, NamespacedVue2Filters } from '../src/index';

class VueStub {

  constructor() {
    this.filters = {};
    this.methods = {};
  }

  filter(key, value) {
    this.filters[key] = value;
  }

  mixin(object) {
    this.methods = object.methods;
  }

  use(initializer) {
    initializer.install(this);
  }
};

describe('basic include', function() {
  beforeAll(function() {
    this.Vue = new VueStub();
    this.Vue.use(Vue2Filters);
  });

  it('has all expected filters', function() {
    expect(typeof this.Vue.filters.capitalize).toEqual('function');
    expect(typeof this.Vue.filters.uppercase).toEqual('function');
    expect(typeof this.Vue.filters.lowercase).toEqual('function');
    expect(typeof this.Vue.filters.placeholder).toEqual('function');
    expect(typeof this.Vue.filters.truncate).toEqual('function');
    expect(typeof this.Vue.filters.currency).toEqual('function');
    expect(typeof this.Vue.filters.pluralize).toEqual('function');
  });

  it('has all expected methods', function() {
    expect(typeof this.Vue.methods.limitBy).toEqual('function');
    expect(typeof this.Vue.methods.filterBy).toEqual('function');
    expect(typeof this.Vue.methods.find).toEqual('function');
    expect(typeof this.Vue.methods.orderBy).toEqual('function');
  });
});
describe('namespaced include', function() {
  beforeAll(function() {
    this.Vue = new VueStub();
    this.Vue.use(NamespacedVue2Filters('vf'));
  });

  it('has all expected filters with VF namespace', function() {
    expect(typeof this.Vue.filters.vfcapitalize).toEqual('function');
    expect(typeof this.Vue.filters.vfuppercase).toEqual('function');
    expect(typeof this.Vue.filters.vflowercase).toEqual('function');
    expect(typeof this.Vue.filters.vfplaceholder).toEqual('function');
    expect(typeof this.Vue.filters.vftruncate).toEqual('function');
    expect(typeof this.Vue.filters.vfcurrency).toEqual('function');
    expect(typeof this.Vue.filters.vfpluralize).toEqual('function');
  });

  it('has all expected methods', function() {
    expect(typeof this.Vue.methods.vflimitBy).toEqual('function');
    expect(typeof this.Vue.methods.vffilterBy).toEqual('function');
    expect(typeof this.Vue.methods.vffind).toEqual('function');
    expect(typeof this.Vue.methods.vforderBy).toEqual('function');
  });
});
