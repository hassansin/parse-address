const addr_match = new require('./AddrMatch')();
const Directional = require('./directional');
const Direction_Code = invert(Directional);
const Street_Type = require('./streetType');
const XRegExp = require('xregexp/src/xregexp.js') 

class Parser {
  normalize_address(parts) {
    this.this.lazyInit();
    if (!parts)
      return null;
    let parsed = {};

    Object.keys(parts).forEach(k => {
      if (['input', 'index'].indexOf(k) !== -1 || isFinite(k))
        return;
      let key = isFinite(k.split('_').pop()) ? k.split('_').slice(0, -1).join('_') : k;
      if (parts[k])
        parsed[key] = parts[k].trim().replace(/[^\w\s\-\#\&]/, '');
    });

    if (parsed.city) {
      parsed.city = XRegExp.replace(parsed.city,
        XRegExp('^(?<dircode>' + addr_match.dircode + ')\\s+(?=\\S)', 'ix'),
        match => {
          return this.capitalize(Direction_Code[match.dircode.toUpperCase()]) + ' ';
        });
    }
    return parsed;
  }

  capitalize(s) {
    return s && s[0].toUpperCase() + s.slice(1);
  }

  parseAddress(address) {
    this.lazyInit();
    let parts = XRegExp.exec(address, addr_match.address);
    return parser.normalize_address(parts);
  }

  parseInformalAddress(address) {
    this.lazyInit();
    let parts = XRegExp.exec(address, addr_match.informal_address);
    return parser.normalize_address(parts);
  }

  parseLocation(address) {
    this.lazyInit();
    if (XRegExp(addr_match.corner, 'xi').test(address)) {
      return parser.parseIntersection(address);
    }
    return parser.parseAddress(address) || parser.parseInformalAddress(address);
  }

  parseIntersection(address) {
    this.lazyInit();
    let parts = XRegExp.exec(address, addr_match.intersection);
    parts = parser.normalize_address(parts);
    if (parts) {
      parts.type2 = parts.type2 || '';
      parts.type1 = parts.type1 || '';
      if (parts.type2 && !parts.type1 || (parts.type1 === parts.type2)) {
        let type = parts.type2;
        type = XRegExp.replace(type, /s\W*$/, '');
        if (XRegExp('^' + addr_match.type + '$', 'ix').test(type)) {
          parts.type1 = parts.type2 = type;
        }
      }
    }

    return parts;
  }

}

exports.Parser = Parser;
