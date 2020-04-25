# vue2-filters [![Build Status](https://travis-ci.org/freearhey/vue2-filters.svg?branch=master)](https://travis-ci.org/freearhey/vue2-filters)

A collection Vue.js filters.

## Installation

### Direct include

Simply include `vue2-filters` after Vue and it will install itself automatically:

```html
<script src="vue.js"></script>
<script src="vue2-filters.min.js"></script>
```

To use one of the predefined methods (such as `limitBy`, `filterBy`, `find`, or `orderBy`) in your component, you also need to add `Vue2Filters.mixin` to mixin list:

```html
<script>
  new Vue({
    ...
    mixins: [Vue2Filters.mixin],
    ...
  })
</script>
```

### CDN [![jsDelivr Hits](https://data.jsdelivr.com/v1/package/npm/vue2-filters/badge?style=rounded)](https://www.jsdelivr.com/package/npm/vue2-filters)

```html
<script src="https://unpkg.com/vue/dist/vue.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/vue2-filters/dist/vue2-filters.min.js"></script>
```

To use one of the predefined methods (such as `limitBy`, `filterBy`, `find`, or `orderBy`) in your component, you also need to add `Vue2Filters.mixin` to mixin list:

```html
<script>
  new Vue({
    ...
    mixins: [Vue2Filters.mixin],
    ...
  })
</script>
```

### NPM [![npm](https://img.shields.io/npm/dm/vue2-filters.svg)](https://www.npmjs.com/package/vue2-filters)

```
npm install vue2-filters
```

When used with a module system, you must explicitly install the filters via `Vue.use()`:

```js
import Vue from 'vue'
import Vue2Filters from 'vue2-filters'

Vue.use(Vue2Filters)
```

You don't need to do this when using global script tags.

To use one of the predefined methods (such as `limitBy`, `filterBy`, `find`, or `orderBy`) in your component, you also need to add `Vue2Filters.mixin` to mixin list:

```js
import Vue2Filters from 'vue2-filters'

export default {
  ...
  mixins: [Vue2Filters.mixin],
  ...
}
```

### Nuxt.js

```
npm install vue2-filters
```

When create file `plugins/vue2-filters.js`:

```js
import Vue from 'vue'
import Vue2Filters from 'vue2-filters'

Vue.use(Vue2Filters)
```

Then, add the file inside the `plugins` key of `nuxt.config.js`:

```js
module.exports = {
  //...
  plugins: [
    '~/plugins/vue2-filters'
  ],
  //...
}
```

To use one of the predefined methods (such as `limitBy`, `filterBy`, `find`, or `orderBy`) in your component, you also need to add `Vue2Filters.mixin` to mixin list:

```js
import Vue2Filters from 'vue2-filters'

export default {
  ...
  mixins: [Vue2Filters.mixin],
  ...
}
```

## Available Filters

- [capitalize](#capitalize)
- [uppercase](#uppercase)
- [lowercase](#lowercase)
- [placeholder](#placeholder)
- [truncate](#truncate)
- [number](#number)
- [bytes](#bytes)
- [percent](#percent)
- [currency](#currency)
- [pluralize](#pluralize)
- [ordinal](#ordinal)
- [limitBy](#limitBy)
- [filterBy](#filterBy)
- [find](#find)
- [orderBy](#orderBy)

## Usage

#### capitalize

+ Arguments:
  * `{Object} [options] - default: {}`

+ Options:
  * `{Boolean} [onlyFirstLetter] - default: false`

+ Example:

  ```js
  {{ msg | capitalize }} // 'abc' => 'Abc'
  ```
  Capitalize only first letter of sentence:

  ```js
  {{ msg | capitalize({ onlyFirstLetter: true }) }} // 'lorem ipsum dolor' => 'Lorem ipsum dolor'
  ```


#### uppercase

+ Example:

  ```js
  {{ msg | uppercase }} // 'abc' => 'ABC'
  ```

#### lowercase

+ Example:

  ```js
  {{ msg | lowercase }} // 'ABC' => 'abc'
  ```

#### placeholder

+ Arguments:
  * `{String} [placeholder]`

+ Example:

  ```js
  {{ msg | placeholder('Text if msg is missing') }} // '' => 'Text if msg is missing'
  ```

#### truncate

+ Arguments:
  * `{Number} [length] - default: 15`

+ Example:

  ```js
  {{ msg | truncate(10) }} // 'lorem ipsum dolor' => 'lorem ipsu...'
  ```

#### number

+ Arguments:
  * `{String} [format] - default: ''`
  * `{Object} [options] - default: {}`

+ Options:
  * `{String} [thousandsSeparator] - default: ','`
  * `{String} [decimalSeparator] - default: '.'`

+ Examples:

  ```js
  {{ 123456 | number('0,0') }} // => 123,456
  ```

  Change the number of digits after the decimal point:

  ```js
  {{ 12345.67 | number('0.0000') }} // => 12345.6700
  ```

  Add a plus or minus sign to the beginning:

  ```js
  {{ 123456 | number('+0') }} // => +123456
  {{ 123456 | number('-0') }} // => -123456
  ```

  Show number in thousand (K) or in millions (M):

  ```js
  {{ 123456 | number('0a') }} // => 123K
  {{ 123456 | number('0 a') }} // => 123 K
  {{ 123456789 | number('0a') }} // => 123M
  ```

  Use a different thousands separator:

  ```js
  {{ 1234567 | number('0,0', { thousandsSeparator: ' ' }) }} // => 1 234 567
  ```
  Use a different decimal separator:

  ```js
  {{ 12345.67 | number('0.00', { decimalSeparator: '|' }) }} // => 12,345|67
  ```

#### bytes

+ Arguments:
  * `{Number} [decimalDigits] - default: 2`

+ Examples:

  ```js
  {{ 1 | bytes }}              // => 1 byte
  {{ 20 | bytes }}             // => 20 bytes
  {{ 2000 | bytes }}           // => 1.95 kB
  {{ 2000000 | bytes }}        // => 1.91 MB
  {{ 2000000000 | bytes }}     // => 1.86 GB
  {{ 2000000000000 | bytes }}  // => 1.82 TB
  ```

  Change the number of digits after the decimal point:

  ```js
  {{ 2000000000 | bytes(4) }}  // => 1.8626 GB
  ```

#### percent

+ Arguments:
  * `{Number} [decimalDigits] - default: 0`
  * `{Number} [multiplier] - default: 100`

+ Examples:

  ```js
  {{ 0.01 | percent }} // => 1%
  {{ 0.1 | percent }} // => 10%
  {{ 1 | percent }} // => 100%
  {{ 100 | percent }} // => 10000%
  {{ 0.97 | percent }} // => 97%
  ```

  Change the number of digits after the decimal point:

  ```js
  {{ 0.974878234 | percent(3) }} // => 97.488%
  ```

  Change the multiplier:

  ```js
  {{ 0.974878234 | percent(3, 150) }} // => 146.232%
  ```

#### currency

+ Arguments:
  * `{String} [symbol] - default: '$'`
  * `{Number} [decimalDigits] - default: 2`
  * `{Object} [options] - default: {}`

+ Options:
  * `{String} [thousandsSeparator] - default: ','`
  * `{String} [decimalSeparator] - default: '.'`
  * `{Boolean} [symbolOnLeft] - default: true`
  * `{Boolean} [spaceBetweenAmountAndSymbol] - default: false`
  * `{Boolean} [showPlusSign] - default: false`

+ Example:

  ```js
  {{ amount | currency }} // 12345 => $12,345.00
  ```
  Use a different symbol:

  ```js
  {{ amount | currency('£') }} // 12345 => £12,345.00
  ```
  Use a different number decimal places:

  ```js
  {{ amount | currency('₽', 0) }} // 12345 => ₽12,345
  ```
  Use a different thousands separator:

  ```js
  {{ amount | currency('$', 0, { thousandsSeparator: '.' }) }} // 12345 => $12.345
  ```
  Use a different decimal separator:

  ```js
  {{ amount | currency('$', 2, { decimalSeparator: ',' }) }} // 12345 => $12,345,00
  ```
  Use symbol on right:

  ```js
  {{ amount | currency('$', 0, { symbolOnLeft: false }) }} // 12345 => 12,345$
  ```
  Add space between amount and symbol:

  ```js
  {{ amount | currency('$', 0, { spaceBetweenAmountAndSymbol: true }) }} // 12345 => $ 12,345
  ```

  Show the plus sign if the value is greater than zero:

  ```js
  {{ amount | currency('$', 0, { showPlusSign: true }) }} // 12345 => +$12,345
  ```
  Use multiple options:

  ```js
  {{ amount | currency('kr', 2, { symbolOnLeft: false, spaceBetweenAmountAndSymbol: true }) }} // 12345 => 12,345.00 kr
  ```

#### pluralize

+ Arguments:
  * `{String|Array} single or Array(single, double, triple, ...)`
  * `{Object} [options] - default: {}`

+ Options:
  * `{Boolean} [includeNumber] - default: false`

+ Example:

  ```js
  {{ count }} {{ count | pluralize('item') }} 

  // 1 => '1 item'
  // 2 => '2 items'
  ```

  Use an array of words:

  ```js
  {{ count }} {{ count | pluralize(['fry', 'fries']) }} 

  // 1 => '1 fry'
  // 2 => '2 fries'
  // 3 => '3 fries'
  ```

  Include number to output:

  ```js
  {{ count | pluralize('test', { includeNumber: true }) }} 

  // 1 => '1 test'
  // 2 => '2 tests'
  ```

#### ordinal

+ Arguments:
  * `{Object} [options] - default: {}`

+ Options:
  * `{Boolean} [includeNumber] - default: false`

+ Example:

  ```js
  {{ date | ordinal }} 

  // 1 => 'st'
  // 2 => 'nd'
  // 3 => 'rd'
  // 4 => 'th'
  // 5 => 'th'
  ```

  Include number to output:

  ```js
  {{ date | ordinal({ includeNumber: true }) }} 

  // 1 => '1st'
  // 2 => '2nd'
  ```

#### limitBy

+ Arguments:
  * `{Number|Array} [items]`
  * `{Number} [limit]`
  * `{Number} [offset]`

+ Example:

  ```html
  <!-- only display first 10 items -->
  <div v-for="item in limitBy(items, 10)">{{ item }}</div>
  <!-- display items 5 to 15 -->
  <div v-for="item in limitBy(items, 10, 5)">{{ item }}</div>
  <!-- with a Range -->
  <div v-for="n in limitBy(10, 4, 2)">{{ n }}</div>
  ```

#### filterBy

+ Arguments:
  * `{Array} [items]`
  * `{String} [query]`
  * `{String} [searchKey]`

+ Example:

  ```html
  <!-- only items that contain the target string "hello" will be displayed -->
  <div v-for="item in filterBy(items, 'hello')">
  <!-- the filter will only search for "Jack" in the name field of each user object -->
  <div v-for="user in filterBy(users, 'Jack', 'name')">
  <!-- the filter will only search for "Bonnie" in the name or age fields of each user object -->
  <div v-for="user in filterBy(users, 'Bonnie', 'name', 'age')">
  ```

#### find

+ Arguments:
  * `{Array} [items]`
  * `{String} [query]`
  * `{String} [searchKey]`

+ Example:

  ```html
  <!-- only the first item that contains the target string "hello" will be displayed -->
  <div v-for="item in find(items, 'hello')">
  <!-- the filter will only search for "Bonnie" in the name or age fields of each user object and return the first result -->
  <div v-for="user in find(users, 'Bonnie', 'name', 'age')">
  ```

#### orderBy

+ Arguments:
  * `{Array} [items]`
  * `{String} [sortKey]`
  * `{Number} [order] - default: 1`

+ Example:

  Sort users by name:

  ```html
  <ul>
    <li v-for="user in orderBy(users, 'name')">
      {{ user.name }}
    </li>
  </ul>
  ```
  In descending order:

  ```html
  <ul>
    <li v-for="user in orderBy(users, 'name', -1)">
      {{ user.name }}
    </li>
  </ul>
  ```
  Sort primitive values:

  ```html
  <ul>
    <li v-for="name in orderBy(names, true)">
      {{ name }}
    </li>
  </ul>
  ```

## Global Configuration

If you need to override filter options globally you can do so by passing an object into `Vue.use()` function as the second argument:

```js
import Vue from 'vue'
import Vue2Filters from 'vue2-filters'

var Vue2FiltersConfig = {
  capitalize: {
    onlyFirstLetter: false
  },
  number: {
    format: '0',
    thousandsSeparator: ',',
    decimalSeparator: '.'
  },
  bytes: {
    decimalDigits: 2
  },
  percent: {
    decimalDigits: 2,
    multiplier: 100
  },
  currency: {
    symbol: '$',
    decimalDigits: 2,
    thousandsSeparator: ',',
    decimalSeparator: '.',
    symbolOnLeft: true,
    spaceBetweenAmountAndSymbol: false,
    showPlusSign: false
  },
  pluralize: {
    includeNumber: false
  },
  ordinal: {
    includeNumber: false
  }
}

Vue.use(Vue2Filters, Vue2FiltersConfig)
```

## Programmatic Usage

Aside from using filters inside templates you can do this programmatically using default filters object:

```js
this.$options.filters.filterName(value)
```

For example, here's how you can use the `currency`filter:

```js
this.$options.filters.currency(100) // => $100.00
```

As for such filters as `limitBy`, `filterBy`, `find`, or `orderBy`, they can be used as usual methods:

```js
this.limitBy([1,2,3,4,5], 2) // => [1,2]
```

## Upgrade Guide

### Upgrade to 0.6.0 from 0.5.*

#### The `pluralize` filter

The `pluralize` filter arguments order has been changed. In the new version to specify several variants of words you can do this by passing an array as first argument, like so:

```js
{{ count | pluralize(['item', 'items']) }}
````

In addition, the function of translate a regular number to its ordinal representation was removed from the `pluralize` filter. Now there is a separate `ordinal` filter for this:

```js
{{ count | ordinal }}
```

### Upgrade to 0.5.0 from 0.4.*

#### The `capitalize` filter

To match the definition of the word "capitalize", the default filter behavior has been changed. The filter now capitalizes the first letter in each word in the sentence (like CSS property `text-transform`). 

If you want capitalize only first letter of sentence, you just need to add the `onlyFirstLetter` parameter to the filter, like so:

```js
{{ msg | capitalize({ onlyFirstLetter: true }) }}
```

### Upgrade to 0.4.0 from 0.3.*

In the new version it was decided to refuse from global registration of mixins, as it could lead to errors when using this package with other packages. Therefore, you need to manually add `Vue2Filters.mixin` into the mixin list of your components if you use at least one of the predefined methods (such as `limitBy`, `filterBy`, `find` or `orderBy`):

```js
export default {
  ...
  mixins: [Vue2Filters.mixin],
  ...
}
```

You can read more about the reasons for this change [here](https://github.com/freearhey/vue2-filters/issues/52)

## Contribution

If you find a bug or want to contribute to the code or documentation, you can help by submitting an [issue](https://github.com/freearhey/vue2-filters/issues) or a [pull request](https://github.com/freearhey/vue2-filters/pulls).

## License

[MIT](http://opensource.org/licenses/MIT)
