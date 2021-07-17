import XRegExp from 'xregexp'

import {
  normalizeMap,
  stateCodesMap,
  directionsMap,
  streetTypeMap,
} from './maps'

import {
  keys,
  each,
  invert,
  values,
  flatten,
  isNumeric,
  capitalize,
} from './utils'

export class AddressParser {
  private addressMatch: Record<string, any>
  private directionCode: Record<string, any>

  constructor() {
    this.directionCode = invert(directionsMap)

    /*
    const Street_Type_Match = {}
    each(Street_Type,function(v,k){ Street_Type_Match[v] = XRegExp.escape(v) })
    each(Street_Type,function(v,k){ Street_Type_Match[v] = Street_Type_Match[v] + '|' + XRegExp.escape(k) })
    each(Street_Type_Match,function(v,k){ Street_Type_Match[k] = new RegExp( '\\b(?:' +  Street_Type_Match[k]  + ')\\b', 'i') })
    */

    this.addressMatch = {
      type: flatten(streetTypeMap).sort().filter(function (v, i, arr) { return arr.indexOf(v) === i }).join('|'),
      fraction: '\\d+\\/\\d+',
      state: '\\b(?:' + keys(stateCodesMap).concat(values(stateCodesMap)).map(XRegExp.escape).join('|') + ')\\b',
      direct: values(directionsMap).sort((a, b) => Number(a.length < b.length)).reduce(function (prev, curr) { return prev.concat([XRegExp.escape(curr.replace(/\w/g, '$&.')), curr]) }, keys(directionsMap)).join('|'),
      dircode: keys(this.directionCode).join('|'),
      zip: '(?<zip>\\d{5})[- ]?(?<plus4>\\d{4})?',
      corner: '(?:\\band\\b|\\bat\\b|&|\\@)',
    }

    this.addressMatch['number'] = '(?<number>(\\d+-?\\d*)|([N|S|E|W]\\d{1,3}[N|S|E|W]\\d{1,6}))(?=\\D)'

    this.addressMatch['street'] = '                                       \n\
      (?:                                                       \n\
        (?:(?<street_0>'+ this.addressMatch['direct'] + ')\\W+               \n\
            (?<type_0>'+ this.addressMatch['type'] + ')\\b                    \n\
        )                                                       \n\
        |                                                       \n\
        (?:(?<prefix_0>'+ this.addressMatch['direct'] + ')\\W+)?             \n\
        (?:                                                     \n\
          (?<street_1>[^,]*\\d)                                 \n\
          (?:[^\\w,]*(?<suffix_1>'+ this.addressMatch['direct'] + ')\\b)     \n\
          |                                                     \n\
          (?<street_2>[^,]+)                                    \n\
          (?:[^\\w,]+(?<type_2>'+ this.addressMatch['type'] + ')\\b)         \n\
          (?:[^\\w,]+(?<suffix_2>'+ this.addressMatch['direct'] + ')\\b)?    \n\
          |                                                     \n\
          (?<street_3>[^,]+?)                                   \n\
          (?:[^\\w,]+(?<type_3>'+ this.addressMatch['type'] + ')\\b)?        \n\
          (?:[^\\w,]+(?<suffix_3>'+ this.addressMatch['direct'] + ')\\b)?    \n\
        )                                                       \n\
      )'

    this.addressMatch['po_box'] = 'p\\W*(?:[om]|ost\\ ?office)\\W*b(?:ox)?'

    this.addressMatch['sec_unit_type_numbered'] = '             \n\
      (?<sec_unit_type_1>su?i?te                      \n\
        |'+ this.addressMatch['po_box'] + '                        \n\
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

    this.addressMatch['sec_unit_type_unnumbered'] = '           \n\
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

    this.addressMatch['sec_unit'] = '                               \n\
      (?:                               #fix3             \n\
        (?:                             #fix1             \n\
          (?:                                             \n\
            (?:'+ this.addressMatch['sec_unit_type_numbered'] + '\\W*) \n\
            |(?<sec_unit_type_3>\\#)\\W*                  \n\
          )                                               \n\
          (?<sec_unit_num_1>[\\w-]+)                      \n\
        )                                                 \n\
        |                                                 \n\
        '+ this.addressMatch['sec_unit_type_unnumbered'] + '           \n\
      )'

    this.addressMatch['city_and_state'] = '                       \n\
      (?:                                               \n\
        (?<city>[^\\d,]+?)\\W+                          \n\
        (?<state>'+ this.addressMatch['state'] + ')                  \n\
      )                                                 \n\
      '

    this.addressMatch['place'] = '                                \n\
      (?:'+ this.addressMatch['city_and_state'] + '\\W*)?            \n\
      (?:'+ this.addressMatch['zip'] + ')?                           \n\
      '

    this.addressMatch['address'] = XRegExp('                      \n\
      ^                                                 \n\
      [^\\w\\#]*                                        \n\
      ('+ this.addressMatch['number'] + ')\\W*                       \n\
      (?:'+ this.addressMatch['fraction'] + '\\W*)?                  \n\
          '+ this.addressMatch['street'] + '\\W+                      \n\
      (?:'+ this.addressMatch['sec_unit'] + ')?\\W*          #fix2   \n\
          '+ this.addressMatch['place'] + '                           \n\
      \\W*$', 'ix')

    const sep = '(?:\\W+|$)' // no support for \Z

    this.addressMatch['informal_address'] = XRegExp('                   \n\
      ^                                                       \n\
      \\s*                                                    \n\
      (?:'+ this.addressMatch['sec_unit'] + sep + ')?                        \n\
      (?:'+ this.addressMatch['number'] + ')?\\W*                          \n\
      (?:'+ this.addressMatch['fraction'] + '\\W*)?                        \n\
          '+ this.addressMatch['street'] + sep + '                            \n\
      (?:'+ this.addressMatch['sec_unit'].replace(/_\d/g, '$&1') + sep + ')?  \n\
      (?:'+ this.addressMatch['place'] + ')?                               \n\
      ', 'ix')

    this.addressMatch['po_address'] = XRegExp('                         \n\
      ^                                                       \n\
      \\s*                                                    \n\
      (?:'+ this.addressMatch['sec_unit'].replace(/_\d/g, '$&1') + sep + ')?  \n\
      (?:'+ this.addressMatch['place'] + ')?                               \n\
      ', 'ix')

    this.addressMatch['intersection'] = XRegExp('                     \n\
      ^\\W*                                                 \n\
      '+ this.addressMatch['street'].replace(/_\d/g, '1$&') + '\\W*?      \n\
      \\s+'+ this.addressMatch['corner'] + '\\s+                         \n\
      '+ this.addressMatch['street'].replace(/_\d/g, '2$&') + '($|\\W+) \n\
      '+ this.addressMatch['place'] + '\\W*$', 'ix')
  }

  normalizeAddress(parts) {
    const self = this

    if (!parts) return null
    const parsed: Record<string, any> = {}

    Object.keys(parts).forEach((part) => {
      if (['input', 'index'].includes(part) || isNumeric(part)) {
        return
      }

      const key = isNumeric(part.split('_').pop())
        ? part.split('_').slice(0, -1).join('_')
        : part

      if (parts[part]) {
        parsed[key] = parts[part].trim().replace(/^\s+|\s+$|[^\w\s\-#&]/g, '')
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

    if (parsed['city']) {
      parsed['city'] = XRegExp.replace(parsed['city'],
        XRegExp('^(?<dircode>' + this.addressMatch['dircode'] + ')\\s+(?=\\S)', 'ix'),
        function (match) {
          return capitalize(self.directionCode[match['dircode'].toUpperCase()]) + ' '
        })
    }

    return parsed
  }

  parseAddress(address) {
    const parts = XRegExp.exec(address, this.addressMatch['address'])
    return this.normalizeAddress(parts)
  }

  parseInformalAddress(address) {
    const parts = XRegExp.exec(address, this.addressMatch['informal_address'])
    return this.normalizeAddress(parts)
  }

  parsePoAddress(address) {
    const parts = XRegExp.exec(address, this.addressMatch['po_address'])
    return this.normalizeAddress(parts)
  }

  parseLocation(address) {
    if (XRegExp(this.addressMatch['corner'], 'xi').test(address)) {
      return this.parseIntersection(address)
    }

    if (XRegExp('^' + this.addressMatch['po_box'], 'xi').test(address)) {
      return this.parsePoAddress(address)
    }

    return this.parseAddress(address)
      || this.parseInformalAddress(address)
  }

  parseIntersection(address) {
    let parts = XRegExp.exec(address, this.addressMatch['intersection'])
    // @ts-ignore
    parts = this.normalizeAddress(parts)

    if (parts) {
      parts['type2'] = parts['type2'] || ''
      parts['type1'] = parts['type1'] || ''

      if (parts['type2'] && !parts['type1'] || (parts['type1'] === parts['type2'])) {
        let type = parts['type2']
        type = XRegExp.replace(type, /s\W*$/, '')

        if (XRegExp('^' + this.addressMatch['type'] + '$', 'ix').test(type)) {
          parts['type1'] = parts['type2'] = type
        }
      }
    }

    return parts
  }
}
