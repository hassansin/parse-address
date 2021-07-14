import XRegExp from 'xregexp'

import {
  stateCodesMap,
  directionsMap,
  streetTypeMap,
} from './maps'

let directionCode
let initialized = false
let addressMatch: Record<string, any> = {}

const parser: Record<string, any> = {}

const normalizeMap = {
  prefix: directionsMap,
  prefix1: directionsMap,
  prefix2: directionsMap,
  suffix: directionsMap,
  suffix1: directionsMap,
  suffix2: directionsMap,
  type: streetTypeMap,
  type1: streetTypeMap,
  type2: streetTypeMap,
  state: stateCodesMap,
}

function capitalize(s) {
  return s && s[0].toUpperCase() + s.slice(1)
}

function keys(o) {
  return Object.keys(o)
}

function values(o: Record<string, any>) {
  var v: any[] = []

  keys(o).forEach(function (k) {
    v.push(o[k])
  })

  return v
}

function each(o, fn) {
  keys(o).forEach(function (k) {
    fn(o[k], k)
  })
}

function invert(o) {
  var o1 = {}
  keys(o).forEach(function (k) {
    o1[o[k]] = k
  })
  return o1
}

function flatten(o) {
  return keys(o).concat(values(o))
}

function lazyInit() {
  if (initialized) {
    return
  }
  initialized = true

  directionCode = invert(directionsMap)

  /*
  var Street_Type_Match = {}
  each(Street_Type,function(v,k){ Street_Type_Match[v] = XRegExp.escape(v) })
  each(Street_Type,function(v,k){ Street_Type_Match[v] = Street_Type_Match[v] + '|' + XRegExp.escape(k) })
  each(Street_Type_Match,function(v,k){ Street_Type_Match[k] = new RegExp( '\\b(?:' +  Street_Type_Match[k]  + ')\\b', 'i') })
  */

  addressMatch = {
    type: flatten(streetTypeMap).sort().filter(function (v, i, arr) { return arr.indexOf(v) === i }).join('|'),
    fraction: '\\d+\\/\\d+',
    state: '\\b(?:' + keys(stateCodesMap).concat(values(stateCodesMap)).map(XRegExp.escape).join('|') + ')\\b',
    direct: values(directionsMap).sort((a, b) => Number(a.length < b.length)).reduce(function (prev, curr) { return prev.concat([XRegExp.escape(curr.replace(/\w/g, '$&.')), curr]) }, keys(directionsMap)).join('|'),
    dircode: keys(directionCode).join('|'),
    zip: '(?<zip>\\d{5})[- ]?(?<plus4>\\d{4})?',
    corner: '(?:\\band\\b|\\bat\\b|&|\\@)',
  }

  addressMatch.number = '(?<number>(\\d+-?\\d*)|([N|S|E|W]\\d{1,3}[N|S|E|W]\\d{1,6}))(?=\\D)'

  addressMatch.street = '                                       \n\
    (?:                                                       \n\
      (?:(?<street_0>'+ addressMatch.direct + ')\\W+               \n\
          (?<type_0>'+ addressMatch.type + ')\\b                    \n\
      )                                                       \n\
      |                                                       \n\
      (?:(?<prefix_0>'+ addressMatch.direct + ')\\W+)?             \n\
      (?:                                                     \n\
        (?<street_1>[^,]*\\d)                                 \n\
        (?:[^\\w,]*(?<suffix_1>'+ addressMatch.direct + ')\\b)     \n\
        |                                                     \n\
        (?<street_2>[^,]+)                                    \n\
        (?:[^\\w,]+(?<type_2>'+ addressMatch.type + ')\\b)         \n\
        (?:[^\\w,]+(?<suffix_2>'+ addressMatch.direct + ')\\b)?    \n\
        |                                                     \n\
        (?<street_3>[^,]+?)                                   \n\
        (?:[^\\w,]+(?<type_3>'+ addressMatch.type + ')\\b)?        \n\
        (?:[^\\w,]+(?<suffix_3>'+ addressMatch.direct + ')\\b)?    \n\
      )                                                       \n\
    )'

  addressMatch.po_box = 'p\\W*(?:[om]|ost\\ ?office)\\W*b(?:ox)?'

  addressMatch.sec_unit_type_numbered = '             \n\
    (?<sec_unit_type_1>su?i?te                      \n\
      |'+ addressMatch.po_box + '                        \n\
      |(?:ap|dep)(?:ar)?t(?:me?nt)?                 \n\
      |ro*m                                         \n\
      |flo*r?                                       \n\
      |uni?t                                        \n\
      |bu?i?ldi?n?g                                 \n\
      |ha?nga?r                                     \n\
      |lo?t                                         \n\
      |pier                                         \n\
      |slip                                         \n\
      |spa?ce?                                      \n\
      |stop                                         \n\
      |tra?i?le?r                                   \n\
      |box)(?![a-z]                                 \n\
    )                                               \n\
    '

  addressMatch.sec_unit_type_unnumbered = '           \n\
    (?<sec_unit_type_2>ba?se?me?n?t                 \n\
      |fro?nt                                       \n\
      |lo?bby                                       \n\
      |lowe?r                                       \n\
      |off?i?ce?                                    \n\
      |pe?n?t?ho?u?s?e?                             \n\
      |rear                                         \n\
      |side                                         \n\
      |uppe?r                                       \n\
    )\\b'

  addressMatch.sec_unit = '                               \n\
    (?:                               #fix3             \n\
      (?:                             #fix1             \n\
        (?:                                             \n\
          (?:'+ addressMatch.sec_unit_type_numbered + '\\W*) \n\
          |(?<sec_unit_type_3>\\#)\\W*                  \n\
        )                                               \n\
        (?<sec_unit_num_1>[\\w-]+)                      \n\
      )                                                 \n\
      |                                                 \n\
      '+ addressMatch.sec_unit_type_unnumbered + '           \n\
    )'

  addressMatch.city_and_state = '                       \n\
    (?:                                               \n\
      (?<city>[^\\d,]+?)\\W+                          \n\
      (?<state>'+ addressMatch.state + ')                  \n\
    )                                                 \n\
    '

  addressMatch.place = '                                \n\
    (?:'+ addressMatch.city_and_state + '\\W*)?            \n\
    (?:'+ addressMatch.zip + ')?                           \n\
    '

  addressMatch.address = XRegExp('                      \n\
    ^                                                 \n\
    [^\\w\\#]*                                        \n\
    ('+ addressMatch.number + ')\\W*                       \n\
    (?:'+ addressMatch.fraction + '\\W*)?                  \n\
        '+ addressMatch.street + '\\W+                      \n\
    (?:'+ addressMatch.sec_unit + ')?\\W*          #fix2   \n\
        '+ addressMatch.place + '                           \n\
    \\W*$', 'ix')

  var sep = '(?:\\W+|$)' // no support for \Z

  addressMatch.informal_address = XRegExp('                   \n\
    ^                                                       \n\
    \\s*                                                    \n\
    (?:'+ addressMatch.sec_unit + sep + ')?                        \n\
    (?:'+ addressMatch.number + ')?\\W*                          \n\
    (?:'+ addressMatch.fraction + '\\W*)?                        \n\
        '+ addressMatch.street + sep + '                            \n\
    (?:'+ addressMatch.sec_unit.replace(/_\d/g, '$&1') + sep + ')?  \n\
    (?:'+ addressMatch.place + ')?                               \n\
    ', 'ix')

  addressMatch.po_address = XRegExp('                         \n\
    ^                                                       \n\
    \\s*                                                    \n\
    (?:'+ addressMatch.sec_unit.replace(/_\d/g, '$&1') + sep + ')?  \n\
    (?:'+ addressMatch.place + ')?                               \n\
    ', 'ix')

  addressMatch.intersection = XRegExp('                     \n\
    ^\\W*                                                 \n\
    '+ addressMatch.street.replace(/_\d/g, '1$&') + '\\W*?      \n\
    \\s+'+ addressMatch.corner + '\\s+                         \n\
    '+ addressMatch.street.replace(/_\d/g, '2$&') + '($|\\W+) \n\
    '+ addressMatch.place + '\\W*$', 'ix')
}

parser.normalize_address = function (parts) {
  lazyInit()

  if (!parts) return null
  const parsed: Record<string, any> = {}

  Object.keys(parts).forEach(function (k) {
    // @ts-ignore
    if (['input', 'index'].indexOf(k) !== -1 || isFinite(k)) {
      return
    }

    // @ts-ignore
    const key = isFinite(k.split('_').pop())
      ? k.split('_').slice(0, -1).join('_')
      : k

    if (parts[k]) {
      parsed[key] = parts[k].trim().replace(/^\s+|\s+$|[^\w\s\-#&]/g, '')
    }
  })

  each(normalizeMap, function (map, key) {
    if (parsed[key] && map[parsed[key].toLowerCase()]) {
      parsed[key] = map[parsed[key].toLowerCase()]
    }
  })

  ;['type', 'type1', 'type2'].forEach(function (key) {
    if (key in parsed)
      parsed[key] = parsed[key].charAt(0).toUpperCase() + parsed[key].slice(1).toLowerCase()
  })

  if (parsed.city) {
    parsed.city = XRegExp.replace(parsed.city,
      XRegExp('^(?<dircode>' + addressMatch.dircode + ')\\s+(?=\\S)', 'ix'),
      function (match) {
        return capitalize(directionCode[match.dircode.toUpperCase()]) + ' '
      })
  }

  return parsed
}

parser.parseAddress = function (address) {
  lazyInit()
  const parts = XRegExp.exec(address, addressMatch.address)
  return parser.normalize_address(parts)
}

parser.parseInformalAddress = function (address) {
  lazyInit()
  const parts = XRegExp.exec(address, addressMatch.informal_address)
  return parser.normalize_address(parts)
}

parser.parsePoAddress = function (address) {
  lazyInit()
  const parts = XRegExp.exec(address, addressMatch.po_address)
  return parser.normalize_address(parts)
}

parser.parseLocation = function (address) {
  lazyInit()
  if (XRegExp(addressMatch.corner, 'xi').test(address)) {
    return parser.parseIntersection(address)
  }
  if (XRegExp('^' + addressMatch.po_box, 'xi').test(address)) {
    return parser.parsePoAddress(address)
  }
  return parser.parseAddress(address)
    || parser.parseInformalAddress(address)
}

parser.parseIntersection = function (address) {
  lazyInit()

  let parts = XRegExp.exec(address, addressMatch.intersection)
  parts = parser.normalize_address(parts)

  if (parts) {
    parts.type2 = parts.type2 || ''
    parts.type1 = parts.type1 || ''
    if (parts.type2 && !parts.type1 || (parts.type1 === parts.type2)) {
      var type = parts.type2
      type = XRegExp.replace(type, /s\W*$/, '')
      if (XRegExp('^' + addressMatch.type + '$', 'ix').test(type)) {
        parts.type1 = parts.type2 = type
      }
    }
  }

  return parts
}

export default parser
