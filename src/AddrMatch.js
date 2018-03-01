class AddrMatch {
  constructor() {
    this.sep = '(?:\\W+|$)'; // no support for \Z
    this.fraction = '\\d+\\/\\d+';
    this.state = '\\b(?:' + Object.keys(State_Code).concat(Object.values(State_Code)).map(XRegExp.escape).join('|') + ')\\b';
    this.type = flatten(Street_Type).sort().filter((v, i, arr) => arr.indexOf(v) === i).join('|');
    this.direct = Object.values(Directional).sort((a, b) => a.length < b.length).reduce((prev, curr) => prev.concat([XRegExp.escape(curr.replace(/\w/g, '$&.')), curr]), Object.keys(Directional).join('|'))
    this.dircode = Object.keys(Direction_Code).join("|");
    this.zip = '(?<zip>\\d{5})[- ]?(?<plus4>\\d{4})?';
    this.corner = '(?:\\band\\b|\\bat\\b|&|\\@)';
    this.number = '(?<number>\\d+-?\\d*)(?=\\D)';
    this.street = '                                       \n\
      (?:                                                       \n\
        (?:(?<street_0>' + Addr_Match.direct + ')\\W+               \n\
           (?<type_0>' + Addr_Match.type + ')\\b                    \n\
        )                                                       \n\
        |                                                       \n\
        (?:(?<prefix_0>' + Addr_Match.direct + ')\\W+)?               \n\
        (?:                                                     \n\
          (?<street_1>[^,]*\\d)                                 \n\
          (?:[^\\w,]*(?<suffix_1>' + Addr_Match.direct + ')\\b)     \n\
          |                                                     \n\
          (?<street_2>[^,]+)                                    \n\
          (?:[^\\w,]+(?<type_2>' + Addr_Match.type + ')\\b)         \n\
          (?:[^\\w,]+(?<suffix_2>' + Addr_Match.direct + ')\\b)?    \n\
          |                                                     \n\
          (?<street_3>[^,]+?)                                   \n\
          (?:[^\\w,]+(?<type_3>' + Addr_Match.type + ')\\b)?        \n\
          (?:[^\\w,]+(?<suffix_3>' + Addr_Match.direct + ')\\b)?    \n\
        )                                                       \n\
      )';
    this.sec_unit_type_numbered = '             \n\
      (?<sec_unit_type_1>su?i?te                      \n\
        |p\\W*[om]\\W*b(?:ox)?                        \n\
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
      ';

    this.sec_unit_type_unnumbered = '           \n\
      (?<sec_unit_type_2>ba?se?me?n?t                 \n\
        |fro?nt                                       \n\
        |lo?bby                                       \n\
        |lowe?r                                       \n\
        |off?i?ce?                                    \n\
        |pe?n?t?ho?u?s?e?                             \n\
        |rear                                         \n\
        |side                                         \n\
        |uppe?r                                       \n\
      )\\b';

    this.sec_unit = '                               \n\
      (?:                               #fix3             \n\
        (?:                             #fix1             \n\
          (?:                                             \n\
            (?:' + Addr_Match.sec_unit_type_numbered + '\\W*) \n\
            |(?<sec_unit_type_3>\\#)\\W*                  \n\
          )                                               \n\
          (?<sec_unit_num_1>[\\w-]+)                      \n\
        )                                                 \n\
        |                                                 \n\
        ' + Addr_Match.sec_unit_type_unnumbered + '           \n\
      )';

    this.city_and_state = '                       \n\
      (?:                                               \n\
        (?<city>[^\\d,]+?)\\W+                          \n\
        (?<state>' + this.state + ')                  \n\
      )                                                 \n\
      ';

    this.place = '                                \n\
      (?:' + this.city_and_state + '\\W*)?            \n\
      (?:' + this.zip + ')?                           \n\
      ';
    
    this.address = XRegExp('                      \n\
      ^                                                 \n\
      [^\\w\\#]*                                        \n\
      (' + this.number + ')\\W*                       \n\
      (?:' + this.fraction + '\\W*)?                  \n\
         ' + this.street + '\\W+                      \n\
      (?:' + this.sec_unit + ')?\\W*          #fix2   \n\
         ' + this.place + '                           \n\
      \\W*$', 'ix');

    this.informal_address = XRegExp('                   \n\
      ^                                                       \n\
      \\s*                                                    \n\
      (?:' + this.sec_unit + this.sep + ')?                        \n\
      (?:' + this.number + ')?\\W*                          \n\
      (?:' + this.fraction + '\\W*)?                        \n\
         ' + this.street + this.sep + '                            \n\
      (?:' + this.sec_unit.replace(/_\d/g, '$&1') + this.sep + ')?  \n\
      (?:' + this.place + ')?                               \n\
      ', 'ix');

    this.intersection = XRegExp('                     \n\
      ^\\W*                                                 \n\
      ' + this.street.replace(/_\d/g, '1$&') + '\\W*?      \n\
      \\s+' + this.corner + '\\s+                         \n\
      ' + this.street.replace(/_\d/g, '2$&') + '\\W+     \n\
      ' + this.place + '\\W*$', 'ix');
  }
}
exports.AddrMatch = AddrMatch;
