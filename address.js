// Copyright (c) 2014-2015, hassansin
//
//Perl Ref: http://cpansearch.perl.org/src/TIMB/Geo-StreetAddress-US-1.04/US.pm
"use strict";

(function(){
  var root;
  root = this;
  var XRegExp;

  if (typeof require !== "undefined"){
     XRegExp = require('xregexp/src/xregexp.js');
  }
  else
    XRegExp = root.XRegExp;

  var parser = {};
  var Addr_Match = {};

  var Directional = {
    north       : "N",
    northeast   : "NE",
    east        : "E",
    southeast   : "SE",
    south       : "S",
    southwest   : "SW",
    west        : "W",
    northwest   : "NW",
  };

  var Street_Type = {
    allee       : "aly",
    alley       : "aly",
    ally        : "aly",
    anex        : "anx",
    annex       : "anx",
    annx        : "anx",
    arcade      : "arc",
    av          : "ave",
    aven        : "ave",
    avenu       : "ave",
    avenue      : "ave",
    avn         : "ave",
    avnue       : "ave",
    bayoo       : "byu",
    bayou       : "byu",
    beach       : "bch",
    bend        : "bnd",
    bluf        : "blf",
    bluff       : "blf",
    bluffs      : "blfs",
    bot         : "btm",
    bottm       : "btm",
    bottom      : "btm",
    boul        : "blvd",
    boulevard   : "blvd",
    boulv       : "blvd",
    branch      : "br",
    brdge       : "brg",
    bridge      : "brg",
    brnch       : "br",
    brook       : "brk",
    brooks      : "brks",
    burg        : "bg",
    burgs       : "bgs",
    bypa        : "byp",
    bypas       : "byp",
    bypass      : "byp",
    byps        : "byp",
    camp        : "cp",
    canyn       : "cyn",
    canyon      : "cyn",
    cape        : "cpe",
    causeway    : "cswy",
    causway     : "cswy",
    cen         : "ctr",
    cent        : "ctr",
    center      : "ctr",
    centers     : "ctrs",
    centr       : "ctr",
    centre      : "ctr",
    circ        : "cir",
    circl       : "cir",
    circle      : "cir",
    circles     : "cirs",
    ck          : "crk",
    cliff       : "clf",
    cliffs      : "clfs",
    club        : "clb",
    cmp         : "cp",
    cnter       : "ctr",
    cntr        : "ctr",
    cnyn        : "cyn",
    common      : "cmn",
    corner      : "cor",
    corners     : "cors",
    course      : "crse",
    court       : "ct",
    courts      : "cts",
    cove        : "cv",
    coves       : "cvs",
    cr          : "crk",
    crcl        : "cir",
    crcle       : "cir",
    crecent     : "cres",
    creek       : "crk",
    crescent    : "cres",
    cresent     : "cres",
    crest       : "crst",
    crossing    : "xing",
    crossroad   : "xrd",
    crscnt      : "cres",
    crsent      : "cres",
    crsnt       : "cres",
    crssing     : "xing",
    crssng      : "xing",
    crt         : "ct",
    curve       : "curv",
    dale        : "dl",
    dam         : "dm",
    div         : "dv",
    divide      : "dv",
    driv        : "dr",
    drive       : "dr",
    drives      : "drs",
    drv         : "dr",
    dvd         : "dv",
    estate      : "est",
    estates     : "ests",
    exp         : "expy",
    expr        : "expy",
    express     : "expy",
    expressway  : "expy",
    expw        : "expy",
    extension   : "ext",
    extensions  : "exts",
    extn        : "ext",
    extnsn      : "ext",
    falls       : "fls",
    ferry       : "fry",
    field       : "fld",
    fields      : "flds",
    flat        : "flt",
    flats       : "flts",
    ford        : "frd",
    fords       : "frds",
    forest      : "frst",
    forests     : "frst",
    forg        : "frg",
    forge       : "frg",
    forges      : "frgs",
    fork        : "frk",
    forks       : "frks",
    fort        : "ft",
    freeway     : "fwy",
    freewy      : "fwy",
    frry        : "fry",
    frt         : "ft",
    frway       : "fwy",
    frwy        : "fwy",
    garden      : "gdn",
    gardens     : "gdns",
    gardn       : "gdn",
    gateway     : "gtwy",
    gatewy      : "gtwy",
    gatway      : "gtwy",
    glen        : "gln",
    glens       : "glns",
    grden       : "gdn",
    grdn        : "gdn",
    grdns       : "gdns",
    green       : "grn",
    greens      : "grns",
    grov        : "grv",
    grove       : "grv",
    groves      : "grvs",
    gtway       : "gtwy",
    harb        : "hbr",
    harbor      : "hbr",
    harbors     : "hbrs",
    harbr       : "hbr",
    haven       : "hvn",
    havn        : "hvn",
    height      : "hts",
    heights     : "hts",
    hgts        : "hts",
    highway     : "hwy",
    highwy      : "hwy",
    hill        : "hl",
    hills       : "hls",
    hiway       : "hwy",
    hiwy        : "hwy",
    hllw        : "holw",
    hollow      : "holw",
    hollows     : "holw",
    holws       : "holw",
    hrbor       : "hbr",
    ht          : "hts",
    hway        : "hwy",
    inlet       : "inlt",
    island      : "is",
    islands     : "iss",
    isles       : "isle",
    islnd       : "is",
    islnds      : "iss",
    jction      : "jct",
    jctn        : "jct",
    jctns       : "jcts",
    junction    : "jct",
    junctions   : "jcts",
    junctn      : "jct",
    juncton     : "jct",
    key         : "ky",
    keys        : "kys",
    knol        : "knl",
    knoll       : "knl",
    knolls      : "knls",
    la          : "ln",
    lake        : "lk",
    lakes       : "lks",
    landing     : "lndg",
    lane        : "ln",
    lanes       : "ln",
    ldge        : "ldg",
    light       : "lgt",
    lights      : "lgts",
    lndng       : "lndg",
    loaf        : "lf",
    lock        : "lck",
    locks       : "lcks",
    lodg        : "ldg",
    lodge       : "ldg",
    loops       : "loop",
    manor       : "mnr",
    manors      : "mnrs",
    meadow      : "mdw",
    meadows     : "mdws",
    medows      : "mdws",
    mill        : "ml",
    mills       : "mls",
    mission     : "msn",
    missn       : "msn",
    mnt         : "mt",
    mntain      : "mtn",
    mntn        : "mtn",
    mntns       : "mtns",
    motorway    : "mtwy",
    mount       : "mt",
    mountain    : "mtn",
    mountains   : "mtns",
    mountin     : "mtn",
    mssn        : "msn",
    mtin        : "mtn",
    neck        : "nck",
    orchard     : "orch",
    orchrd      : "orch",
    overpass    : "opas",
    ovl         : "oval",
    parks       : "park",
    parkway     : "pkwy",
    parkways    : "pkwy",
    parkwy      : "pkwy",
    passage     : "psge",
    paths       : "path",
    pikes       : "pike",
    pine        : "pne",
    pines       : "pnes",
    pk          : "park",
    pkway       : "pkwy",
    pkwys       : "pkwy",
    pky         : "pkwy",
    place       : "pl",
    plain       : "pln",
    plaines     : "plns",
    plains      : "plns",
    plaza       : "plz",
    plza        : "plz",
    point       : "pt",
    points      : "pts",
    port        : "prt",
    ports       : "prts",
    prairie     : "pr",
    prarie      : "pr",
    prk         : "park",
    prr         : "pr",
    rad         : "radl",
    radial      : "radl",
    radiel      : "radl",
    ranch       : "rnch",
    ranches     : "rnch",
    rapid       : "rpd",
    rapids      : "rpds",
    rdge        : "rdg",
    rest        : "rst",
    ridge       : "rdg",
    ridges      : "rdgs",
    river       : "riv",
    rivr        : "riv",
    rnchs       : "rnch",
    road        : "rd",
    roads       : "rds",
    route       : "rte",
    rvr         : "riv",
    shoal       : "shl",
    shoals      : "shls",
    shoar       : "shr",
    shoars      : "shrs",
    shore       : "shr",
    shores      : "shrs",
    skyway      : "skwy",
    spng        : "spg",
    spngs       : "spgs",
    spring      : "spg",
    springs     : "spgs",
    sprng       : "spg",
    sprngs      : "spgs",
    spurs       : "spur",
    sqr         : "sq",
    sqre        : "sq",
    sqrs        : "sqs",
    squ         : "sq",
    square      : "sq",
    squares     : "sqs",
    station     : "sta",
    statn       : "sta",
    stn         : "sta",
    str         : "st",
    strav       : "stra",
    strave      : "stra",
    straven     : "stra",
    stravenue   : "stra",
    stravn      : "stra",
    stream      : "strm",
    street      : "st",
    streets     : "sts",
    streme      : "strm",
    strt        : "st",
    strvn       : "stra",
    strvnue     : "stra",
    sumit       : "smt",
    sumitt      : "smt",
    summit      : "smt",
    terr        : "ter",
    terrace     : "ter",
    throughway  : "trwy",
    tpk         : "tpke",
    tr          : "trl",
    trace       : "trce",
    traces      : "trce",
    track       : "trak",
    tracks      : "trak",
    trafficway  : "trfy",
    trail       : "trl",
    trails      : "trl",
    trk         : "trak",
    trks        : "trak",
    trls        : "trl",
    trnpk       : "tpke",
    trpk        : "tpke",
    tunel       : "tunl",
    tunls       : "tunl",
    tunnel      : "tunl",
    tunnels     : "tunl",
    tunnl       : "tunl",
    turnpike    : "tpke",
    turnpk      : "tpke",
    underpass   : "upas",
    union       : "un",
    unions      : "uns",
    valley      : "vly",
    valleys     : "vlys",
    vally       : "vly",
    vdct        : "via",
    viadct      : "via",
    viaduct     : "via",
    view        : "vw",
    views       : "vws",
    vill        : "vlg",
    villag      : "vlg",
    village     : "vlg",
    villages    : "vlgs",
    ville       : "vl",
    villg       : "vlg",
    villiage    : "vlg",
    vist        : "vis",
    vista       : "vis",
    vlly        : "vly",
    vst         : "vis",
    vsta        : "vis",
    walks       : "walk",
    well        : "wl",
    wells       : "wls",
    wy          : "way",
  };

  var State_Code = {
    "alabama" : "AL",
    "alaska" : "AK",
    "american samoa" : "AS",
    "arizona" : "AZ",
    "arkansas" : "AR",
    "california" : "CA",
    "colorado" : "CO",
    "connecticut" : "CT",
    "delaware" : "DE",
    "district of columbia" : "DC",
    "federated states of micronesia" : "FM",
    "florida" : "FL",
    "georgia" : "GA",
    "guam" : "GU",
    "hawaii" : "HI",
    "idaho" : "ID",
    "illinois" : "IL",
    "indiana" : "IN",
    "iowa" : "IA",
    "kansas" : "KS",
    "kentucky" : "KY",
    "louisiana" : "LA",
    "maine" : "ME",
    "marshall islands" : "MH",
    "maryland" : "MD",
    "massachusetts" : "MA",
    "michigan" : "MI",
    "minnesota" : "MN",
    "mississippi" : "MS",
    "missouri" : "MO",
    "montana" : "MT",
    "nebraska" : "NE",
    "nevada" : "NV",
    "new hampshire" : "NH",
    "new jersey" : "NJ",
    "new mexico" : "NM",
    "new york" : "NY",
    "north carolina" : "NC",
    "north dakota" : "ND",
    "northern mariana islands" : "MP",
    "ohio" : "OH",
    "oklahoma" : "OK",
    "oregon" : "OR",
    "palau" : "PW",
    "pennsylvania" : "PA",
    "puerto rico" : "PR",
    "rhode island" : "RI",
    "south carolina" : "SC",
    "south dakota" : "SD",
    "tennessee" : "TN",
    "texas" : "TX",
    "utah" : "UT",
    "vermont" : "VT",
    "virgin islands" : "VI",
    "virginia" : "VA",
    "washington" : "WA",
    "west virginia" : "WV",
    "wisconsin" : "WI",
    "wyoming" : "WY",
  };

  var State_FIPS = {
    "01" : "AL",
    "02" : "AK",
    "04" : "AZ",
    "05" : "AR",
    "06" : "CA",
    "08" : "CO",
    "09" : "CT",
    "10" : "DE",
    "11" : "DC",
    "12" : "FL",
    "13" : "GA",
    "15" : "HI",
    "16" : "ID",
    "17" : "IL",
    "18" : "IN",
    "19" : "IA",
    "20" : "KS",
    "21" : "KY",
    "22" : "LA",
    "23" : "ME",
    "24" : "MD",
    "25" : "MA",
    "26" : "MI",
    "27" : "MN",
    "28" : "MS",
    "29" : "MO",
    "30" : "MT",
    "31" : "NE",
    "32" : "NV",
    "33" : "NH",
    "34" : "NJ",
    "35" : "NM",
    "36" : "NY",
    "37" : "NC",
    "38" : "ND",
    "39" : "OH",
    "40" : "OK",
    "41" : "OR",
    "42" : "PA",
    "44" : "RI",
    "45" : "SC",
    "46" : "SD",
    "47" : "TN",
    "48" : "TX",
    "49" : "UT",
    "50" : "VT",
    "51" : "VA",
    "53" : "WA",
    "54" : "WV",
    "55" : "WI",
    "56" : "WY",
    "72" : "PR",
    "78" : "VI",
  };
  var Normalize_Map = {
    prefix  : Directional,
    prefix1 : Directional,
    prefix2 : Directional,
    suffix  : Directional,
    suffix1 : Directional,
    suffix2 : Directional,
    type    : Street_Type,
    type1   : Street_Type,
    type2   : Street_Type,
    state   : State_Code,
  };
  var Direction_Code;
  var FIPS_State;

  function capitalize(s){
    return s && s[0].toUpperCase() + s.slice(1);
  }
  function keys(o){
    return Object.keys(o);
  }
  function values(o){
    var v = [];
    keys(o).forEach(function(k){
      v.push(o[k]);
    });
    return v;
  }
  function each(o,fn){
    keys(o).forEach(function(k){
      fn(o[k],k);
    });
  }
  function invert(o){
    var o1= {};
    keys(o).forEach(function(k){
      o1[o[k]] = k;
    });
    return o1;
  }
  function flatten(o){
    return keys(o).concat(values(o));
  }
  function init(){

    Direction_Code = invert(Directional);
    FIPS_State     = invert(State_FIPS);

    /*
    var Street_Type_Match = {};
    each(Street_Type,function(v,k){ Street_Type_Match[v] = XRegExp.escape(v) });
    each(Street_Type,function(v,k){ Street_Type_Match[v] = Street_Type_Match[v] + "|" + XRegExp.escape(k); });
    each(Street_Type_Match,function(v,k){ Street_Type_Match[k] = new RegExp( '\\b(?:' +  Street_Type_Match[k]  + ')\\b', 'i') });
    */

    Addr_Match = {
      type    : flatten(Street_Type).sort().filter(function(v,i,arr){return arr.indexOf(v)===i }).join('|'),
      fraction : '\\d+\\/\\d+',
      state   : '\\b(?:' + keys(State_Code).concat(values(State_Code)).map(XRegExp.escape).join('|') + ')\\b',
      direct  : values(Directional).sort(function(a,b){return a.length < b.length}).reduce(function(prev,curr){return prev.concat([XRegExp.escape(curr.replace(/\w/g,'$&.')),curr])},keys(Directional)).join('|'),
      dircode : keys(Direction_Code).join("|"),
      zip     : '\\d{5}(?:-?\\d{4})?',
      corner  : '(?:\\band\\b|\\bat\\b|&|\\@)',
    };

    Addr_Match.number = '(?<number>\\d+-?\\d*)(?=\\D)';

    Addr_Match.street = '                                       \n\
      (?:                                                       \n\
        (?:(?<street_0>'+Addr_Match.direct+')\\W+               \n\
           (?<type_0>'+Addr_Match.type+')\\b                    \n\
        )                                                       \n\
        |                                                       \n\
        (?:(?<prefix_0>'+Addr_Match.direct+')\\W+)?               \n\
        (?:                                                     \n\
          (?<street_1>[^,]*\\d)                                 \n\
          (?:[^\\w,]*(?<suffix_1>'+Addr_Match.direct+')\\b)     \n\
          |                                                     \n\
          (?<street_2>[^,]+)                                    \n\
          (?:[^\\w,]+(?<type_2>'+Addr_Match.type+')\\b)         \n\
          (?:[^\\w,]+(?<suffix_2>'+Addr_Match.direct+')\\b)?    \n\
          |                                                     \n\
          (?<street_3>[^,]+?)                                   \n\
          (?:[^\\w,]+(?<type_3>'+Addr_Match.type+')\\b)?        \n\
          (?:[^\\w,]+(?<suffix_3>'+Addr_Match.direct+')\\b)?    \n\
        )                                                       \n\
      )';

    Addr_Match.sec_unit_type_numbered = '             \n\
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

    Addr_Match.sec_unit_type_unnumbered = '           \n\
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

    Addr_Match.sec_unit = '                               \n\
      (?:                               #fix3             \n\
        (?:                             #fix1             \n\
          (?:                                             \n\
            (?:'+Addr_Match.sec_unit_type_numbered+'\\W*) \n\
            |(?<sec_unit_type_3>\\#)\\W*                  \n\
          )                                               \n\
          (?<sec_unit_num_1>[\\w-]+)                      \n\
        )                                                 \n\
        |                                                 \n\
        '+Addr_Match.sec_unit_type_unnumbered+'           \n\
      )';

    Addr_Match.city_and_state = '                       \n\
      (?:                                               \n\
        (?<city>[^\\d,]+?)\\W+                          \n\
        (?<state>'+Addr_Match.state+')                  \n\
      )                                                 \n\
      ';

    Addr_Match.place = '                                \n\
      (?:'+Addr_Match.city_and_state+'\\W*)?            \n\
      (?:(?<zip>'+Addr_Match.zip+'))?                   \n\
      ';

    Addr_Match.address = XRegExp('                      \n\
      ^                                                 \n\
      [^\\w\\#]*                                        \n\
      ('+Addr_Match.number+')\\W*                       \n\
      (?:'+Addr_Match.fraction+'\\W*)?                  \n\
         '+Addr_Match.street+'\\W+                      \n\
      (?:'+Addr_Match.sec_unit+')?\\W*          #fix2   \n\
         '+Addr_Match.place+'                           \n\
      \\W*$','ix');

    var sep = '(?:\\W+|$)'; // no support for \Z

    Addr_Match.informal_address = XRegExp('                   \n\
      ^                                                       \n\
      \\s*                                                    \n\
      (?:'+Addr_Match.sec_unit+sep+')?                        \n\
      (?:'+Addr_Match.number+')?\\W*                          \n\
      (?:'+Addr_Match.fraction+'\\W*)?                        \n\
         '+Addr_Match.street+sep+'                            \n\
      (?:'+Addr_Match.sec_unit.replace(/_\d/g,'$&1')+sep+')?  \n\
      (?:'+Addr_Match.place+')?                               \n\
      ','ix');

    Addr_Match.intersection = XRegExp('                     \n\
      ^\\W*                                                 \n\
      '+Addr_Match.street.replace(/_\d/g,'1$&')+'\\W*?      \n\
      \\s+'+Addr_Match.corner+'\\s+                         \n\
      '+Addr_Match.street.replace(/_\d/g,'2$&') + '\\W+     \n\
      '+Addr_Match.place+'\\W*$','ix');
  }
  init();
  parser.normalize_address = function(parts){
    if(!parts)
      return null;
    var parsed = {};

    Object.keys(parts).forEach(function(k){
      if(['input','index'].indexOf(k) !== -1 || isFinite(k))
        return;
      var key = isFinite(k.split('_').pop())? k.split('_').slice(0,-1).join('_'): k ;
      if(parts[k])
        parsed[key] = parts[k].trim().replace(/[^\w\s\-\#\&]/,'');
    });

    if(parsed.city){
      parsed.city = XRegExp.replace(parsed.city,
        XRegExp('^(?<dircode>'+Addr_Match.dircode+')\\s+(?=\\S)','ix'),
        function(match){
          return capitalize(Direction_Code[match.dircode.toUpperCase()]) +' ';
        });
    }
    if(parsed.zip){
      parsed.zip = XRegExp.replace(parsed.zip,/^(.{5}).*/,'$1');
    }
    return parsed;
  };

  parser.parseAddress = function(address){
    var parts = XRegExp.exec(address,Addr_Match.address);
    return parser.normalize_address(parts);
  };
  parser.parseInformalAddress = function(address){
    var parts = XRegExp.exec(address,Addr_Match.informal_address);
    return parser.normalize_address(parts);
  };
  parser.parseLocation = function(address){

    if (XRegExp(Addr_Match.corner,'xi').test(address)) {
        return parser.parseIntersection(address);
    }
    return parser.parseAddress(address)
        || parser.parseInformalAddress(address);
  };
  parser.parseIntersection = function(address){
    var parts = XRegExp.exec(address,Addr_Match.intersection);
    parts = parser.normalize_address(parts);
    if(parts){
        parts.type2 = parts.type2 || '';
        parts.type1 = parts.type1 || '';
        if (parts.type2 && !parts.type1 || (parts.type1 === parts.type2)) {
            var type = parts.type2;
            type = XRegExp.replace(type,/s\W*$/,'');
            if (XRegExp('^'+Addr_Match.type+'$','ix').test(type)) {
                parts.type1 = parts.type2 = type;
            }
        }
    }

    return parts;
  };

  // AMD / RequireJS
  if (typeof define !== 'undefined' && define.amd) {
      define([], function () {
          return parser;
      });
  }
  // Node.js
  else if (typeof exports !== "undefined") {
    exports.parseIntersection = parser.parseIntersection;
    exports.parseLocation = parser.parseLocation;
    exports.parseInformalAddress = parser.parseInformalAddress;
    exports.parseAddress = parser.parseAddress;
  }
  // included directly via <script> tag
  else {
      root.addressParser = root.addressParser || parser;
  }

}());
