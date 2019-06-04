import Vue, { PluginFunction, PluginObject } from "vue";

declare const Vue2Filters: Vue2Filters;
export default Vue2Filters;
export interface Vue2Filters extends PluginObject<Vue2FiltersUseOptions> {
  install: PluginFunction<Vue2FiltersUseOptions>;
  mixin: {
    methods: {
      limitBy: (arr: any, n: number, offset: number) => any;
      filterBy: (arr: any[], search: string | number, ...args: any[]) => any[];
      orderBy: (arr: any, ...args: any[]) => any;
      find: (arr: any[], search: string | number, ...args: any[]) => any;
    };
  };
}

export interface Vue2FiltersUseOptions {}
