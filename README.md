# vue2-filters

The list of standard filters Vue.js 1.* adapted for use in Vue.js 2.*

## Installation

### NPM

```
npm install vue2-filters
```

### Direct include

```html
<script src="vue.js"></script>
<script src="vue2-filters.min.js"></script>
```

## Usage

#### capitalize

+ Example:

  ```js
{{ msg | capitalize }} // 'abc' => 'Abc'
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

#### currency

+ Arguments:
  * `{String} [symbol] - default: '$'`
  * `{Number} [decimal places] - default: 2`

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

#### pluralize

+ Arguments:
  * `{String} single, [double, triple, ...]`

+ Example:

  ```js
{{count}} {{count | pluralize('item')}} 

// 1 => '1 item'
// 2 => '2 items'
```

  ```js
{{date}} {{date | pluralize('st','nd','rd','th')}} 

// 1 => '1st'
// 2 => '2nd'
// 3 => '3rd'
// 4 => '4th'
// 5 => '5th'
```

#### limitBy

+ Arguments:
  * `{Array} [items]`
  * `{Number} [limit]`
  * `{Number} [offset]`

+ Example:

  ```html
<!-- only display first 10 items -->
<div v-for="item in limitBy(items, 10)"></div>
<!-- display items 5 to 15 -->
<div v-for="item in limitBy(items, 10, 5)"></div>
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

## Contribution

If you find a bug or want to contribute to the code or documentation, you can help by submitting an [issue](https://github.com/freearhey/vue2-filters/issues) or a [pull request](https://github.com/freearhey/vue2-filters/pulls).

## License

[MIT](http://opensource.org/licenses/MIT)