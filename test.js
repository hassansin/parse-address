var parser = require('./address');
var assert = require('assert');

var address = {
  '1005 Gravenstein Hwy 95472': {
    number: '1005',
    street: 'Gravenstein',
    type: 'Hwy',
    zip: '95472'
  },
  '1005 Gravenstein Hwy, 95472': {
    number: '1005',
    street: 'Gravenstein',
    type: 'Hwy',
    zip: '95472'
  },
  '1005 Gravenstein Hwy N, 95472': {
    number: '1005',
    street: 'Gravenstein',
    type: 'Hwy',
    suffix: 'N',
    zip: '95472'
  },
  '1005 Gravenstein Highway North, 95472': {
    number: '1005',
    street: 'Gravenstein',
    type: 'Hwy',
    suffix: 'N',
    zip: '95472'
  },
  '1005 N Gravenstein Highway, Sebastopol, CA': {
    number: '1005',
    prefix: 'N',
    street: 'Gravenstein',
    type: 'Hwy',
    city: 'Sebastopol',
    state: 'CA'
  },
  '1005 N Gravenstein Highway, Suite 500, Sebastopol, CA': {
    number: '1005',
    prefix: 'N',
    street: 'Gravenstein',
    type: 'Hwy',
    sec_unit_type: 'Suite',
    sec_unit_num: '500',
    city: 'Sebastopol',
    state: 'CA'
  },
  '1005 N Gravenstein Hwy Suite 500 Sebastopol, CA': {
    number: '1005',
    prefix: 'N',
    street: 'Gravenstein',
    type: 'Hwy',
    sec_unit_type: 'Suite',
    sec_unit_num: '500',
    city: 'Sebastopol',
    state: 'CA'
  },
  '1005 N Gravenstein Highway, Sebastopol, CA, 95472': {
    number: '1005',
    prefix: 'N',
    street: 'Gravenstein',
    type: 'Hwy',
    city: 'Sebastopol',
    state: 'CA',
    zip: '95472'
  },
  '1005 N Gravenstein Highway Sebastopol CA 95472': {
    number: '1005',
    prefix: 'N',
    street: 'Gravenstein',
    type: 'Hwy',
    city: 'Sebastopol',
    state: 'CA',
    zip: '95472'
  },
  '1005 Gravenstein Hwy N Sebastopol CA': {
    number: '1005',
    street: 'Gravenstein',
    type: 'Hwy',
    suffix: 'N',
    city: 'Sebastopol',
    state: 'CA'
  },
  '1005 Gravenstein Hwy N, Sebastopol CA': {
    number: '1005',
    street: 'Gravenstein',
    type: 'Hwy',
    suffix: 'N',
    city: 'Sebastopol',
    state: 'CA'
  },
  '1005 Gravenstein Hwy, N Sebastopol CA': {
    number: '1005',
    street: 'Gravenstein',
    type: 'Hwy',
    city: 'North Sebastopol',
    state: 'CA'
  },
  '1005 Gravenstein Hwy, North Sebastopol CA': {
    number: '1005',
    street: 'Gravenstein',
    type: 'Hwy',
    city: 'North Sebastopol',
    state: 'CA'
  },
  '1005 Gravenstein Hwy Sebastopol CA': {
    number: '1005',
    street: 'Gravenstein',
    type: 'Hwy',
    city: 'Sebastopol',
    state: 'CA'
  },
  '115 Broadway San Francisco CA': {
    number: '115',
    street: 'Broadway',
    city: 'San Francisco',
    state: 'CA'
  },
  '7800 Mill Station Rd, Sebastopol, CA 95472': {
    number: '7800',
    street: 'Mill Station',
    type: 'Rd',
    city: 'Sebastopol',
    state: 'CA',
    zip: '95472'
  },
  '7800 Mill Station Rd Sebastopol CA 95472': {
    number: '7800',
    street: 'Mill Station',
    type: 'Rd',
    city: 'Sebastopol',
    state: 'CA',
    zip: '95472'
  },
  '1005 State Highway 116 Sebastopol CA 95472': {
    number: '1005',
    street: 'State Highway 116',
    city: 'Sebastopol',
    state: 'CA',
    zip: '95472'
  },
  '1600 Pennsylvania Ave. Washington DC': {
    number: '1600',
    street: 'Pennsylvania',
    type: 'Ave',
    city: 'Washington',
    state: 'DC'
  },
  '1600 Pennsylvania Avenue Washington DC': {
    number: '1600',
    street: 'Pennsylvania',
    type: 'Ave',
    city: 'Washington',
    state: 'DC'
  },
  '48S 400E, Salt Lake City UT': {
    number: '48',
    prefix: 'S',
    street: '400',
    suffix: 'E',
    city: 'Salt Lake City',
    state: 'UT'
  },
  '550 S 400 E #3206, Salt Lake City UT 84111': {
    number: '550',
    prefix: 'S',
    street: '400',
    suffix: 'E',
    sec_unit_type: '#',
    sec_unit_num: '3206',
    city: 'Salt Lake City',
    state: 'UT',
    zip: '84111'
  },
  '6641 N 2200 W Apt D304 Park City, UT 84098': {
    number: '6641',
    prefix: 'N',
    street: '2200',
    suffix: 'W',
    sec_unit_type: 'Apt',
    sec_unit_num: 'D304',
    city: 'Park City',
    state: 'UT',
    zip: '84098'
  },
  '100 South St, Philadelphia, PA': {
    number: '100',
    street: 'South',
    type: 'St',
    city: 'Philadelphia',
    state: 'PA'
  },
  '100 S.E. Washington Ave, Minneapolis, MN': {
    number: '100',
    prefix: 'SE',
    street: 'Washington',
    type: 'Ave',
    city: 'Minneapolis',
    state: 'MN'
  },
  '3813 1/2 Some Road, Los Angeles, CA': {
    number: '3813',
    street: 'Some',
    type: 'Rd',
    city: 'Los Angeles',
    state: 'CA'
  },
  'Mission & Valencia San Francisco CA': {
    street1: 'Mission',
    street2: 'Valencia',
    city: 'San Francisco',
    state: 'CA',
    type2: '',
    type1: ''
  },
  'Mission & Valencia, San Francisco CA': {
    street1: 'Mission',
    street2: 'Valencia',
    city: 'San Francisco',
    state: 'CA',
    type2: '',
    type1: ''
  },
  'Mission St and Valencia St San Francisco CA': {
    street1: 'Mission',
    type1: 'St',
    street2: 'Valencia',
    type2: 'St',
    city: 'San Francisco',
    state: 'CA'
  },
  'Mission St & Valencia St San Francisco CA': {
    street1: 'Mission',
    type1: 'St',
    street2: 'Valencia',
    type2: 'St',
    city: 'San Francisco',
    state: 'CA'
  },
  'Mission and Valencia Sts San Francisco CA': {
    street1: 'Mission',
    street2: 'Valencia',
    type2: 'St',
    city: 'San Francisco',
    state: 'CA',
    type1: 'St'
  },
  'Mission & Valencia Sts. San Francisco CA': {
    street1: 'Mission',
    street2: 'Valencia',
    type2: 'St',
    city: 'San Francisco',
    state: 'CA',
    type1: 'St'
  },
  'Mission & Valencia Streets San Francisco CA': {
    street1: 'Mission',
    street2: 'Valencia',
    type2: 'St',
    city: 'San Francisco',
    state: 'CA',
    type1: 'St'
  },
  'Mission Avenue and Valencia Street San Francisco CA': {
    street1: 'Mission',
    type1: 'Ave',
    street2: 'Valencia',
    type2: 'St',
    city: 'San Francisco',
    state: 'CA'
  },
  '1 First St, e San Jose CA': {
    number: '1',
    street: 'First',
    type: 'St',
    city: 'East San Jose',
    state: 'CA'
  },
  '123 Maple Rochester, New York': {
    number: '123',
    street: 'Maple',
    city: 'Rochester',
    state: 'NY'
  },
  '233 S Wacker Dr 60606-6306': {
    number: '233',
    prefix: 'S',
    street: 'Wacker',
    type: 'Dr',
    zip: '60606',
    plus4: '6306'
  },
  '233 S Wacker Dr 606066306': {
    number: '233',
    prefix: 'S',
    street: 'Wacker',
    type: 'Dr',
    zip: '60606',
    plus4: '6306'
  },
  '233 S Wacker Dr 60606 6306': {
    number: '233',
    prefix: 'S',
    street: 'Wacker',
    type: 'Dr',
    zip: '60606',
    plus4: '6306'
  },
  'S Wacker Dr 60606 6306': {
    prefix: 'S',
    street: 'Wacker',
    type: 'Dr',
    zip: '60606',
    plus4: '6306'
  },
  '233 S Wacker Dr lobby 60606': {
    number: '233',
    prefix: 'S',
    street: 'Wacker',
    type: 'Dr',
    sec_unit_type: 'lobby',
    zip: '60606'
  },
  '(233 S Wacker Dr lobby 60606)': {
    number: '233',
    prefix: 'S',
    street: 'Wacker',
    type: 'Dr',
    sec_unit_type: 'lobby',
    zip: '60606'
  },
  '#42 233 S Wacker Dr 60606': {
    sec_unit_type: '#',
    sec_unit_num: '42',
    number: '233',
    prefix: 'S',
    street: 'Wacker',
    type: 'Dr',
    zip: '60606'
  },
  'lt42 99 Some Road, Some City LA': {
    sec_unit_type: 'lt',
    sec_unit_num: '42',
    number: '99',
    street: 'Some',
    type: 'Rd',
    city: 'Some City',
    state: 'LA'
  },
  '36401 County Road 43, Eaton, CO 80615': {
    number: '36401',
    street: 'County Road 43',
    city: 'Eaton',
    state: 'CO',
    zip: '80615'
  },
  '1234 COUNTY HWY 60E, Town, CO 12345': {
    number: '1234',
    street: 'COUNTY HWY 60',
    suffix: 'E',
    city: 'Town',
    state: 'CO',
    zip: '12345'
  },
  '321 S. Washington': {
    number: '321',
    prefix: 'S',
    street: 'Washington'
  },
  '\'45 Quaker Ave, Ste 105\'': {
    number: '45',
    street: 'Quaker',
    type: 'Ave',
    sec_unit_type: 'Ste',
    sec_unit_num: '105'
  },
  '2672 Industrial Row Troy, MI 48084': {
    number: '2672',
    street: 'Industrial',
    type: 'Row',
    city: 'Troy',
    state: 'MI',
    zip: '48084'
  },
  'Post office Box 3094 Collierville TN 38027': {
    sec_unit_type: 'Post office Box',
    sec_unit_num: '3094',
    city: 'Collierville',
    state: 'TN',
    zip: '38027'
  },
  'P.O. box 3094 Collierville TN 38027': {
    sec_unit_type: 'PO box',
    sec_unit_num: '3094',
    city: 'Collierville',
    state: 'TN',
    zip: '38027'
  },
  'POBox 3094 Collierville TN 38027': {
    sec_unit_type: 'POBox',
    sec_unit_num: '3094',
    city: 'Collierville',
    state: 'TN',
    zip: '38027'
  },
  'N95W18855 Jay Dr, Menomonee Falls, WI 53051': {
    number: 'N95W18855',
    street: 'Jay',
    type: 'Dr',
    city: 'Menomonee Falls',
    state: 'WI',
    zip: '53051'
  },
  'N95W18855 Jay Dr Menomonee Falls WI 53051': {
    number: 'N95W18855',
    street: 'Jay',
    type: 'Dr',
    city: 'Menomonee Falls',
    state: 'WI',
    zip: '53051'
  },
  'n95w18855 Jay Dr Menomonee Falls WI 53051': {
    number: 'n95w18855',
    street: 'Jay',
    type: 'Dr',
    city: 'Menomonee Falls',
    state: 'WI',
    zip: '53051'
  },
  '10144 Potters Hatch Cmn Cupertino CA 95014': {
    number: '10144',
    street: 'Potters Hatch',
    type: 'Cmn',
    city: 'Cupertino',
    state: 'CA',
    zip: '95014'
  },
  '10144 Potters Hatch Common Cupertino CA 95014': {
    number: '10144',
    street: 'Potters Hatch',
    type: 'Cmn',
    city: 'Cupertino',
    state: 'CA',
    zip: '95014'
  },
  '36 Hathway Commons Lebanon OH 45036': {
    number: '36',
    street: 'Hathway',
    type: 'Cmns',
    city: 'Lebanon',
    state: 'OH',
    zip: '45036'
  },
  '36 Hathway Cmns Lebanon OH 45036': {
    number: '36',
    street: 'Hathway',
    type: 'Cmns',
    city: 'Lebanon',
    state: 'OH',
    zip: '45036'
  },
  '174 Sunset Crossroad Deer Isle ME 04627': {
    number: '174',
    street: 'Sunset',
    type: 'Xrd',
    city: 'Deer Isle',
    state: 'ME',
    zip: '04627'
  },
  '174 Sunset Xrd Deer Isle ME 04627': {
    number: '174',
    street: 'Sunset',
    type: 'Xrd',
    city: 'Deer Isle',
    state: 'ME',
    zip: '04627'
  },
  '905 Laing Crossroads Dawson GA 39842': {
    number: '905',
    street: 'Laing',
    type: 'Xrds',
    city: 'Dawson',
    state: 'GA',
    zip: '39842'
  },
  '905 Laing Xrds Dawson GA 39842': {
    number: '905',
    street: 'Laing',
    type: 'Xrds',
    city: 'Dawson',
    state: 'GA',
    zip: '39842'
  },
  '9402 Sequoia Fall San Antonio TX 78251': {
    number: '9402',
    street: 'Sequoia',
    type: 'Fall',
    city: 'San Antonio',
    state: 'TX',
    zip: '78251'
  },
  '24411 Alamosa Fls San Antonio TX 78255': {
    number: '24411',
    street: 'Alamosa',
    type: 'Fls',
    city: 'San Antonio',
    state: 'TX',
    zip: '78255'
  },
  '24411 Alamosa Falls San Antonio TX 78255': {
    number: '24411',
    street: 'Alamosa',
    type: 'Fls',
    city: 'San Antonio',
    state: 'TX',
    zip: '78255'
  },
  '15235 Spring Land San Antonio TX 78247': {
    number: '15235',
    street: 'Spring',
    type: 'Land',
    city: 'San Antonio',
    state: 'TX',
    zip: '78247'
  },
  '2146 University Square Mall Tampa FL 33612': {
    number: '2146',
    street: 'University Square',
    type: 'Mall',
    city: 'Tampa',
    state: 'FL',
    zip: '33612'
  },
  '415 Van Wyck Mews Norfolk VA 23517': {
    number: '415',
    street: 'Van Wyck',
    type: 'Mews',
    city: 'Norfolk',
    state: 'VA',
    zip: '23517'
  },
  '22 Cumbres Pass Santa Fe New Mexico 87508': {
    number: '22',
    street: 'Cumbres',
    type: 'Pass',
    city: 'Santa Fe',
    state: 'NM',
    zip: '87508'
  },
  '6 Maison Rue Hattiesburg MS 39402': {
    number: '6',
    street: 'Maison',
    type: 'Rue',
    city: 'Hattiesburg',
    state: 'MS',
    zip: '39402'
  },
  '12921 Coyote Run Fishers IN 46038': {
    number: '12921',
    street: 'Coyote',
    type: 'Run',
    city: 'Fishers',
    state: 'IN',
    zip: '46038'
  },
  '2974 London Wall Bloomfield Hills MI 48304': {
    number: '2974',
    street: 'London',
    type: 'Wall',
    city: 'Bloomfield Hills',
    state: 'MI',
    zip: '48304'
  }
};

Object.keys(address).forEach(function (k) {
  var parsed = parser.parseLocation(k);
  assert.deepEqual(address[k], parsed);
});