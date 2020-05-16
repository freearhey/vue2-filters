var stringFilters = require('../src/string/index')
var arrayFilters = require('../src/array/index')
var otherFilters = require('../src/other/index')

describe('Filters', function () {
  it('number', function () {
    var filter = otherFilters.number
    expect(filter(123456)).toBe('123456')
    expect(filter('123456')).toBe('123456')
    expect(filter(-123456)).toBe('-123456')
    expect(filter(123456, '+0,0')).toBe('+123,456')
    expect(filter(123456, '-0,0')).toBe('-123,456')
    expect(filter(-123456, '+0,0')).toBe('+123,456')
    expect(filter(123456, '+0')).toBe('+123456')
    expect(filter(123456, '-0')).toBe('-123456')
    expect(filter(12345.67, '0,0')).toBe('12,346')
    expect(filter(12345.67, '0.0000')).toBe('12345.6700')
    expect(filter(12345.67, '0,0.0000')).toBe('12,345.6700')
    expect(filter(12345.6789, '0,0.0000')).toBe('12,345.6789')
    expect(filter(12345, '0,0.0')).toBe('12,345.0')
    expect(filter(-12345, '0,0.0')).toBe('-12,345.0')
    expect(filter(12345.6789, '0.000')).toBe('12345.679')
    expect(filter(1024, '0a')).toBe('1K')
    expect(filter(1224, '0.0a')).toBe('1.2K')
    expect(filter(10245, '0 a')).toBe('10 K')
    expect(filter(10245678, '0.0a')).toBe('10.2M')
    expect(filter(-10245678, '.0a')).toBe('-10.2M')
    expect(filter(-123456.093, '0.00 a')).toBe('-123.46 K')
    expect(filter(-0.23, '.00')).toBe('-.23')
    // options
    expect(filter(123456, '0,0', { thousandsSeparator: '|' })).toBe('123|456')
    expect(filter(123456.789, '0.00', { decimalSeparator: '|' })).toBe('123456|79')
    expect(filter(10000.998, '0,0.00', { thousandsSeparator: '.', decimalSeparator: '|' })).toBe(
      '10.001|00'
    )
  })

  it('number with global options', function () {
    var filter = otherFilters.number.bind({
      number: {
        thousandsSeparator: '@',
        decimalSeparator: '|',
        format: '0,0.000'
      }
    })

    expect(filter(123456.789)).toBe('123@456|789')
    expect(filter(123456.789, '0,0.0')).toBe('123@456|8')
  })

  it('capitalize', function () {
    var filter = stringFilters.capitalize
    var res = filter('fsefsfsef zxcvxzsaxz')
    var words = res.split(' ')
    expect(words[0].charAt(0)).toBe('F')
    expect(words[0].slice(1)).toBe('sefsfsef')
    expect(words[1].charAt(0)).toBe('Z')
    expect(words[1].slice(1)).toBe('xcvxzsaxz')
    assertNumberAndFalsy(filter)
  })

  it('capitalize only first letter of sentence', function () {
    var filter = stringFilters.capitalize
    var res = filter('fsefsfsef zxcvxzsaxz', { onlyFirstLetter: true })
    var words = res.split(' ')
    expect(words[0].charAt(0)).toBe('F')
    expect(words[0].slice(1)).toBe('sefsfsef')
    expect(words[1].charAt(0)).toBe('z')
    expect(words[1].slice(1)).toBe('xcvxzsaxz')
    assertNumberAndFalsy(filter)
  })

  it('capitalize with global options', function () {
    var filter = stringFilters.capitalize.bind({ capitalize: { onlyFirstLetter: true } })
    var res = filter('fsefsfsef zxcvxzsaxz')
    var words = res.split(' ')
    expect(words[0].charAt(0)).toBe('F')
    expect(words[0].slice(1)).toBe('sefsfsef')
    expect(words[1].charAt(0)).toBe('z')
    expect(words[1].slice(1)).toBe('xcvxzsaxz')
    assertNumberAndFalsy(filter)
  })

  it('uppercase', function () {
    var filter = stringFilters.uppercase
    expect(filter('fsefef')).toBe('FSEFEF')
    assertNumberAndFalsy(filter)
  })

  it('lowercase', function () {
    var filter = stringFilters.lowercase
    expect(filter('AWEsoME')).toBe('awesome')
    assertNumberAndFalsy(filter)
  })

  it('placeholder', function () {
    var filter = stringFilters.placeholder
    expect(filter('sometext', 'placeholder text')).toBe('sometext')
    expect(filter(1234, 'placeholder text')).toBe(1234)
    expect(filter('', 'placeholder text')).toBe('placeholder text')
    expect(filter(undefined, 'placeholder text')).toBe('placeholder text')
    expect(filter(null, 'placeholder text')).toBe('placeholder text')
  })

  it('truncate', function () {
    var filter = stringFilters.truncate
    expect(filter('lorem ipsum dolor')).toBe('lorem ipsum dol...')
    expect(filter('lorem ipsum dolor', 5)).toBe('lorem...')
    expect(filter('lorem ipsum dolor', 20)).toBe('lorem ipsum dolor')
    expect(filter(1234, 5)).toBe('')
    expect(filter('', 5)).toBe('')
    expect(filter(undefined, 5)).toBe('')
    expect(filter(null, 5)).toBe('')
  })

  it('currency', function () {
    var filter = otherFilters.currency
    expect(filter(1234)).toBe('$1,234.00')
    expect(filter(1234.45)).toBe('$1,234.45')
    expect(filter(123443434.4343434)).toBe('$123,443,434.43')
    expect(filter(0.99)).toBe('$0.99')
    expect(filter(0.99999)).toBe('$1.00')
    expect(filter(0.76)).toBe('$0.76')
    // sign arg
    expect(filter(2134, '@')).toBe('@2,134.00')
    // no symbol
    expect(filter(2134, '')).toBe('2,134.00')
    // decimal places
    expect(filter(1234, '$', 0)).toBe('$1,234')
    // if decimal places are present, currency is required
    expect(filter(1234, '', 2)).toBe('1,234.00')
    expect(filter(123.4, '$', 3)).toBe('$123.400')
    expect(filter(-12345, 'VND', 0)).toBe('-VND12,345')
    // falsy, infinity and 0
    expect(filter(0)).toBe('$0.00')
    expect(filter(false)).toBe('')
    expect(filter(null)).toBe('')
    expect(filter(undefined)).toBe('')
    expect(filter(Infinity)).toBe('')
    // negative numbers
    expect(filter(-50)).toBe('-$50.00')
    expect(filter(-150.43)).toBe('-$150.43')
    expect(filter(-1500.4343434)).toBe('-$1,500.43')
    // options
    expect(filter(1234, '@', 0, { thousandsSeparator: ',' })).toBe('@1,234')
    expect(filter(1234, '', 2, { decimalSeparator: '|' })).toBe('1,234|00')
    expect(filter(1234, '$', 2, { symbolOnLeft: false })).toBe('1,234.00$')
    expect(filter(1234, '$', 0, { spaceBetweenAmountAndSymbol: true })).toBe('$ 1,234')
    expect(filter(1234, '$', 0, { symbolOnLeft: false, spaceBetweenAmountAndSymbol: true })).toBe(
      '1,234 $'
    )
    expect(filter(-12345, 'VND', 0, { symbolOnLeft: true })).toBe('-VND12,345')
    expect(filter(12345, 'VND', 0, { showPlusSign: true })).toBe('+VND12,345')
    expect(filter(-12345, 'VND', 0, { showPlusSign: true })).toBe('-VND12,345')
    expect(filter(0, 'VND', 0, { showPlusSign: true })).toBe('VND0')
    // round up
    expect(filter(4514.275)).toBe('$4,514.28')
    expect(filter(9446.975)).toBe('$9,446.98')
  })

  it('currency with global options', function () {
    var filter = otherFilters.currency.bind({
      currency: {
        symbol: '@',
        decimalDigits: 3,
        thousandsSeparator: ',',
        decimalSeparator: '|',
        symbolOnLeft: false,
        spaceBetweenAmountAndSymbol: true,
        showPlusSign: true
      }
    })

    expect(filter(1234)).toBe('+1,234|000 @')
  })

  it('pluralize', function () {
    var filter = otherFilters.pluralize
    // single word
    var word = 'item'
    expect(filter(0, word)).toBe('items')
    expect(filter(1, word)).toBe('item')
    expect(filter(2, word)).toBe('items')
    expect(filter(21, word)).toBe('items')

    // multi words
    expect(filter(0, ['fry', 'fries'])).toBe('fries')
    expect(filter(1, ['fry', 'fries'])).toBe('fry')
    expect(filter(2, ['fry', 'fries'])).toBe('fries')

    expect(filter(0, ['first', 'second', 'third', 'nth'])).toBe('nth')
    expect(filter(1, ['first', 'second', 'third', 'nth'])).toBe('first')
    expect(filter(2, ['first', 'second', 'third', 'nth'])).toBe('second')
    expect(filter(3, ['first', 'second', 'third', 'nth'])).toBe('third')
    expect(filter(4, ['first', 'second', 'third', 'nth'])).toBe('nth')
    expect(filter(50, ['first', 'second', 'third', 'nth'])).toBe('nth')

    // include number
    expect(filter(1, word, { includeNumber: false })).toBe('item')
    expect(filter(1, word, { includeNumber: true })).toBe('1 item')
    expect(filter(1, ['fry', 'fries'], { includeNumber: true })).toBe('1 fry')
  })

  it('pluralize with global options', function () {
    var filter = otherFilters.pluralize.bind({
      pluralize: { includeNumber: false }
    })
    var word = 'item'

    expect(filter(1, word)).toBe('item')
  })

  it('ordinal', function () {
    var filter = otherFilters.ordinal

    expect(filter(0)).toBe('th')
    expect(filter(1)).toBe('st')
    expect(filter(2)).toBe('nd')
    expect(filter(3)).toBe('rd')
    expect(filter(4)).toBe('th')

    expect(filter(230)).toBe('th')
    expect(filter(231)).toBe('st')
    expect(filter(232)).toBe('nd')
    expect(filter(233)).toBe('rd')
    expect(filter(234)).toBe('th')

    expect(filter(4, { includeNumber: false })).toBe('th')
    expect(filter(0, { includeNumber: true })).toBe('0th')
    expect(filter(1, { includeNumber: true })).toBe('1st')
  })

  it('ordinal with global options', function () {
    var filter = otherFilters.ordinal.bind({
      ordinal: { includeNumber: false }
    })

    expect(filter(4)).toBe('th')
  })

  it('bytes', function () {
    var filter = otherFilters.bytes

    expect(filter(1)).toBe('1 byte')
    expect(filter(12)).toBe('12 bytes')
    expect(filter(2000, 0)).toBe('2 kB')
    expect(filter(2000, 1)).toBe('2.0 kB')
    expect(filter(2000)).toBe('1.95 kB')
    expect(filter(2000, 3)).toBe('1.953 kB')
    expect(filter(2000, 4)).toBe('1.9531 kB')
    expect(filter(2000000)).toBe('1.91 MB')
    expect(filter(2000000, 4)).toBe('1.9073 MB')
    expect(filter(2000000000)).toBe('1.86 GB')
    expect(filter(2000000000, 4)).toBe('1.8626 GB')
    expect(filter(2000000000000)).toBe('1.82 TB')
    expect(filter(2000000000000, 4)).toBe('1.8190 TB')

    // edge cases
    expect(filter(undefined)).toBe('0 bytes')
    expect(filter(null)).toBe('0 bytes')
    expect(filter('a random string')).toBe('0 bytes')
  })

  it('bytes with global options', function () {
    var filter = otherFilters.bytes.bind({
      bytes: { decimalDigits: 1 }
    })

    expect(filter(2000)).toBe('2.0 kB')
  })

  it('percent', function () {
    var filter = otherFilters.percent

    expect(filter(1.2)).toBe('120%')
    expect(filter(-0.2)).toBe('-20%')
    expect(filter(12)).toBe('1200%')
    expect(filter(100, 0)).toBe('10000%')
    expect(filter(1, 1)).toBe('100.0%')
    expect(filter(0.974878234, 3)).toBe('97.488%')
    expect(filter(0.0003, 1)).toBe('0.0%')

    // different multiplier
    expect(filter(0.1, 0, 150)).toBe('15%')
    expect(filter(0.2, 1, 150)).toBe('30.0%')
    expect(filter(1.2, 0, 300)).toBe('360%')
    expect(filter(0.974878234, 3, 150)).toBe('146.232%')

    // edge cases
    expect(filter(undefined)).toBe('0%')
    expect(filter(null)).toBe('0%')
    expect(filter('a random string')).toBe('0%')
  })

  it('percent with global options', function () {
    var filter = otherFilters.percent.bind({
      percent: { decimalDigits: 1, multiplier: 150 }
    })

    expect(filter(100)).toBe('15000.0%')
  })

  it('limitByArray', function () {
    var filter = arrayFilters.limitBy
    var arr = [1, 2, 3]
    var res = filter(arr, false)
    expect(res).toBe(arr)
    res = filter(arr, 1)
    assertArray(res, [1])
    res = filter(arr, 10)
    assertArray(res, [1, 2, 3])
    res = filter(arr, -1)
    assertArray(res, [1, 2])
    // with offsets, note offsets are 0 bound (as expected)
    res = filter(arr, 1, 1)
    assertArray(res, [2])
    res = filter(arr, 2, 1)
    assertArray(res, [2, 3])
    res = filter(arr, 1, 2)
    assertArray(res, [3])
  })

  it('limitByRange', function () {
    var filter = arrayFilters.limitBy
    var range = 3
    var res = filter(range, false)
    expect(res).toEqual([1, 2, 3])
    res = filter(range, 1)
    assertArray(res, [1])
    res = filter(range, 10)
    assertArray(res, [1, 2, 3])
    res = filter(range, -1)
    assertArray(res, [1, 2])
    // with offsets, note offsets are 0 bound (as expected)
    res = filter(range, 1, 1)
    assertArray(res, [2])
    res = filter(range, 2, 1)
    assertArray(res, [2, 3])
    res = filter(range, 1, 2)
    assertArray(res, [3])
  })

  it('filterBy', function () {
    var filter = arrayFilters.filterBy
    var arr = [
      { a: 1, b: { c: 'hello' } },
      { a: 2, b: 'hello' },
      { a: 3, b: ['yoyo'] }
    ]
    var res
    // normal
    res = filter(arr, 'hello')
    assertArray(res, [arr[0], arr[1]])
    // data key
    res = filter(arr, 'hello', 'b.c')
    assertArray(res, [arr[0]])
    // no search key
    res = filter(arr, null)
    expect(res).toBe(arr)
    // number search key
    res = filter(arr, 2)
    assertArray(res, [arr[1]])
    // search in sub array
    res = filter(arr, 'yoyo')
    assertArray(res, [arr[2]])
    // filter by false (#928)
    arr = [{ a: false }, { b: true }]
    res = filter(arr, false)
    assertArray(res, [arr[0]])
    // filter by a function
    res = filter(arr, function (val) {
      return val.b === true
    })
    assertArray(res, [arr[1]])
  })

  it('filterBy multiple keys', function () {
    var filter = arrayFilters.filterBy
    var arr = [
      { firstname: 'A', lastname: 'B' },
      { firstname: 'C', lastname: 'B' },
      { firstname: 'A', lastname: 'D' }
    ]
    // multiple string keys
    var res
    // array of keys
    res = filter(arr, 'B', ['firstname', 'lastname'])
    assertArray(res, [arr[0], arr[1]])
    // multiple arrays of keys
    res = filter(arr, 'A', ['firstname', 'lastname'], [])
    assertArray(res, [arr[0], arr[2]])
  })

  it('find', function () {
    var find = arrayFilters.find
    var arr = [
      { a: 1, b: { c: 'hello' } },
      { a: 2, b: 'hello' },
      { a: 3, b: ['yoyo'] }
    ]
    var res = find(arr, 'hello')
    assertArray(res, [arr[0]])
  })

  it('orderBy', function () {
    var filter = arrayFilters.orderBy
    var arr = [
      { a: { b: 0 }, c: 'B' },
      { a: { b: 2 }, c: 'c' },
      { a: { b: 1 }, c: 'a' }
    ]
    var res
    // sort key
    res = filter(arr, 'a.b')
    assertArray(res, [arr[0], arr[2], arr[1]])
    // reverse key
    res = filter(arr, 'a.b', -1)
    assertArray(res, [arr[1], arr[2], arr[0]])
    // literal asc
    res = filter(arr, 'c', 1)
    assertArray(res, [arr[2], arr[0], arr[1]])
    // no sort key
    res = filter(arr, null)
    expect(res).toBe(arr)
    res = filter(arr)
    expect(res).toBe(arr)
  })

  it('orderBy on Object-converted array', function () {
    // object converted
    var filter = arrayFilters.orderBy
    var arr = [
      { $key: 'a', $value: 3 },
      { $key: 'c', $value: 1 },
      { $key: 'b', $value: 2 }
    ]
    var res = filter(arr, '$key')
    assertArray(res, [arr[0], arr[2], arr[1]])
    res = filter(arr, '$value')
    assertArray(res, [arr[1], arr[2], arr[0]])
    // normal keys
    arr = [
      { $key: 'a', $value: { v: 3 } },
      { $key: 'c', $value: { v: 1 } },
      { $key: 'b', $value: { v: 2 } }
    ]
    res = filter(arr, 'v')
    assertArray(res, [arr[1], arr[2], arr[0]])
  })

  it('orderBy primitive values', function () {
    var filter = arrayFilters.orderBy
    var arr = [9, 11, 1, 2]
    var res = filter(arr, true)
    assertArray(res, [arr[2], arr[3], arr[0], arr[1]])
  })

  it('orderBy array of strings', function () {
    var filter = arrayFilters.orderBy
    var arr = ['C', 'a', 'B', 'b']
    var res = filter(arr, true)
    assertArray(res, [arr[1], arr[2], arr[3], arr[0]])
  })

  it('orderBy multiple fields', function () {
    var filter = arrayFilters.orderBy
    var arr = [
      { a: 1, b: 1, c: 1 }, // 0
      { a: 0, b: 1, c: 1 }, // 1
      { a: 1, b: 2, c: 0 }, // 2
      { a: 1, b: 0, c: 0 }, // 3
      { a: 0, b: 0, c: 0 }, // 4
      { a: 0, b: 1, c: 0 } // 5
    ]
    var res
    // sort two keys
    res = filter(arr, ['a', 'b'])
    assertArray(res, [arr[4], arr[1], arr[5], arr[3], arr[0], arr[2]])
    res = filter(arr, 'a', 'b')
    assertArray(res, [arr[4], arr[1], arr[5], arr[3], arr[0], arr[2]])

    // sort two keys with order
    res = filter(arr, ['a', 'b'], 1)
    assertArray(res, [arr[4], arr[1], arr[5], arr[3], arr[0], arr[2]])
    res = filter(arr, 'a', 'b', 1)
    assertArray(res, [arr[4], arr[1], arr[5], arr[3], arr[0], arr[2]])

    // sort three keys
    res = filter(arr, ['a', 'b', 'c'])
    assertArray(res, [arr[4], arr[5], arr[1], arr[3], arr[0], arr[2]])
    res = filter(arr, 'a', 'b', 'c')
    assertArray(res, [arr[4], arr[5], arr[1], arr[3], arr[0], arr[2]])

    // reverse two key. Preserves order when equal: 1 then 5
    res = filter(arr, ['a', 'b'], -1)
    assertArray(res, [arr[2], arr[0], arr[3], arr[1], arr[5], arr[4]])
    res = filter(arr, 'a', 'b', -1)
    assertArray(res, [arr[2], arr[0], arr[3], arr[1], arr[5], arr[4]])
  })

  it('orderBy using a compare function', function () {
    var filter = arrayFilters.orderBy
    var arr = [9, 11, 1, 2]
    var res = filter(arr, evenBeforeOdd)
    assertArray(res, [arr[3], arr[2], arr[0], arr[1]])
    res = filter(arr, evenBeforeOdd, 1)
    assertArray(res, [arr[3], arr[2], arr[0], arr[1]])
    res = filter(arr, evenBeforeOdd, -1)
    assertArray(res, [arr[1], arr[0], arr[2], arr[3]])
  })
})

function evenBeforeOdd(a, b) {
  if (a % 2 === 0) {
    if (b % 2 === 0) {
      return a - b
    } else {
      return -1
    }
  } else if (b % 2 === 0) {
    return 1
  } else {
    return a - b
  }
}

function assertArray(res, expectations) {
  expect(res.length).toBe(expectations.length)
  expectations.forEach(function (exp, i) {
    expect(exp).toBe(res[i])
  })
}

function assertNumberAndFalsy(filter) {
  // should stringify numbers
  expect(filter(12345)).toBe('12345')
  expect(filter(0)).toBe('0')
  expect(filter(undefined)).toBe('')
  expect(filter(null)).toBe('')
  expect(filter(false)).toBe('')
}
