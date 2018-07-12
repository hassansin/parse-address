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
    type: 'Hwy',
    street: 'Gravenstein',
    city: 'Sebastopol',
    state: 'CA',
    prefix: 'N',
    sec_unit_num: '500',
    sec_unit_type: 'Suite',
    number: '1005'
  },
  '1005 N Gravenstein Hwy Suite 500 Sebastopol, CA': {
    number: '1005',
    type: 'Hwy',
    city: 'Sebastopol',
    state: 'CA',
    sec_unit_type: 'Suite',
    street: 'Gravenstein',
    prefix: 'N',
    sec_unit_num: '500'
  },
  '1005 N Gravenstein Highway, Sebastopol, CA, 95472': {
    state: 'CA',
    number: '1005',
    zip: '95472',
    prefix: 'N',
    city: 'Sebastopol',
    street: 'Gravenstein',
    type: 'Hwy'
  },
  '1005 N Gravenstein Highway Sebastopol CA 95472': {
    street: 'Gravenstein',
    zip: '95472',
    prefix: 'N',
    state: 'CA',
    number: '1005',
    city: 'Sebastopol',
    type: 'Hwy'
  },
  '1005 Gravenstein Hwy N Sebastopol CA': {
    street: 'Gravenstein',
    state: 'CA',
    city: 'Sebastopol',
    suffix: 'N',
    number: '1005',
    type: 'Hwy'
  },
  '1005 Gravenstein Hwy N, Sebastopol CA': {
    type: 'Hwy',
    number: '1005',
    suffix: 'N',
    city: 'Sebastopol',
    street: 'Gravenstein',
    state: 'CA'
  },
  '1005 Gravenstein Hwy, N Sebastopol CA': {
    street: 'Gravenstein',
    number: '1005',
    state: 'CA',
    city: 'North Sebastopol',
    type: 'Hwy'
  },
  '1005 Gravenstein Hwy, North Sebastopol CA': {
    type: 'Hwy',
    street: 'Gravenstein',
    state: 'CA',
    number: '1005',
    city: 'North Sebastopol'
  },
  '1005 Gravenstein Hwy Sebastopol CA': {
    number: '1005',
    type: 'Hwy',
    city: 'Sebastopol',
    state: 'CA',
    street: 'Gravenstein'
  },
  '115 Broadway San Francisco CA': {
    street: 'Broadway',
    city: 'San Francisco',
    state: 'CA',
    number: '115'
  },
  '7800 Mill Station Rd, Sebastopol, CA 95472': {
    state: 'CA',
    type: 'Rd',
    street: 'Mill Station',
    zip: '95472',
    city: 'Sebastopol',
    number: '7800'
  },
  '7800 Mill Station Rd Sebastopol CA 95472': {
    number: '7800',
    city: 'Sebastopol',
    zip: '95472',
    state: 'CA',
    type: 'Rd',
    street: 'Mill Station'
  },
  '1005 State Highway 116 Sebastopol CA 95472': {
    city: 'Sebastopol',
    zip: '95472',
    state: 'CA',
    street: 'State Highway 116',
    number: '1005'
  },
  '1600 Pennsylvania Ave. Washington DC': {
    state: 'DC',
    street: 'Pennsylvania',
    type: 'Ave',
    number: '1600',
    city: 'Washington'
  },
  '1600 Pennsylvania Avenue Washington DC': {
    number: '1600',
    street: 'Pennsylvania',
    state: 'DC',
    type: 'Ave',
    city: 'Washington'
  },
  '48S 400E, Salt Lake City UT': {
    prefix: 'S',
    street: '400',
    city: 'Salt Lake City',
    number: '48',
    state: 'UT',
    suffix: 'E'
  },
  '550 S 400 E #3206, Salt Lake City UT 84111': {
    suffix: 'E',
    number: '550',
    sec_unit_num: '3206',
    prefix: 'S',
    state: 'UT',
    sec_unit_type: '#',
    city: 'Salt Lake City',
    zip: '84111',
    street: '400'
  },
  '6641 N 2200 W Apt D304 Park City, UT 84098': {
    city: 'Park City',
    sec_unit_num: 'D304',
    prefix: 'N',
    number: '6641',
    sec_unit_type: 'Apt',
    state: 'UT',
    suffix: 'W',
    street: '2200',
    zip: '84098'
  },
  '100 South St, Philadelphia, PA': {
    street: 'South',
    city: 'Philadelphia',
    state: 'PA',
    type: 'St',
    number: '100'
  },
  '100 S.E. Washington Ave, Minneapolis, MN': {
    city: 'Minneapolis',
    type: 'Ave',
    state: 'MN',
    street: 'Washington',
    prefix: 'SE',
    number: '100'
  },
  '3813 1/2 Some Road, Los Angeles, CA': {
    number: '3813',
    street: 'Some',
    type: 'Rd',
    state: 'CA',
    city: 'Los Angeles'
  },
  'Mission & Valencia San Francisco CA': {
    type2: '',
    street2: 'Valencia',
    state: 'CA',
    city: 'San Francisco',
    type1: '',
    street1: 'Mission'
  },
  'Mission & Valencia, San Francisco CA': {
    type1: '',
    city: 'San Francisco',
    type2: '',
    street1: 'Mission',
    state: 'CA',
    street2: 'Valencia'
  },
  'Mission St and Valencia St San Francisco CA': {
    type1: 'St',
    city: 'San Francisco',
    state: 'CA',
    street2: 'Valencia',
    type2: 'St',
    street1: 'Mission'
  },
  'Mission St & Valencia St San Francisco CA': {
    street2: 'Valencia',
    state: 'CA',
    street1: 'Mission',
    type2: 'St',
    city: 'San Francisco',
    type1: 'St'
  },
  'Mission and Valencia Sts San Francisco CA': {
    type2: 'St',
    street1: 'Mission',
    type1: 'St',
    city: 'San Francisco',
    street2: 'Valencia',
    state: 'CA'
  },
  'Mission & Valencia Sts. San Francisco CA': {
    street1: 'Mission',
    street2: 'Valencia',
    type1: 'St',
    city: 'San Francisco',
    state: 'CA',
    type2: 'St'
  },
  'Mission & Valencia Streets San Francisco CA': {
    street1: 'Mission',
    type2: 'St',
    city: 'San Francisco',
    state: 'CA',
    type1: 'St',
    street2: 'Valencia'
  },
  'Mission Avenue and Valencia Street San Francisco CA': {
    type1: 'Ave',
    state: 'CA',
    city: 'San Francisco',
    street1: 'Mission',
    type2: 'St',
    street2: 'Valencia'
  },
  '1 First St, e San Jose CA': {
    street: 'First',
    number: '1',
    city: 'East San Jose',
    state: 'CA',
    type: 'St'
  },
  '123 Maple Rochester, New York': {
    city: 'Rochester',
    street: 'Maple',
    number: '123',
    state: 'NY'
  },
  '233 S Wacker Dr 60606-6306': {
    type: 'Dr',
    number: '233',
    prefix: 'S',
    zip: '60606',
    street: 'Wacker',
    plus4: '6306'
  },
  '233 S Wacker Dr 606066306': {
    street: 'Wacker',
    zip: '60606',
    type: 'Dr',
    number: '233',
    prefix: 'S',
    plus4: '6306'
  },
  '233 S Wacker Dr 60606 6306': {
    type: 'Dr',
    prefix: 'S',
    zip: '60606',
    street: 'Wacker',
    number: '233',
    plus4: '6306'
  },
  'S Wacker Dr 60606 6306': {
    zip: '60606',
    type: 'Dr',
    street: 'Wacker',
    prefix: 'S',
    plus4: '6306'
  },
  '233 S Wacker Dr lobby 60606': {
    sec_unit_type: 'lobby',
    prefix: 'S',
    type: 'Dr',
    number: '233',
    street: 'Wacker',
    zip: '60606'
  },
  '(233 S Wacker Dr lobby 60606)': {
    zip: '60606',
    sec_unit_type: 'lobby',
    street: 'Wacker',
    type: 'Dr',
    number: '233',
    prefix: 'S'
  },
  '#42 233 S Wacker Dr 60606': {
    type: 'Dr',
    prefix: 'S',
    zip: '60606',
    sec_unit_num: '42',
    sec_unit_type: '#',
    number: '233',
    street: 'Wacker'
  },
  'lt42 99 Some Road, Some City LA': {
    city: 'Some City',
    state: 'LA',
    type: 'Rd',
    sec_unit_type: 'lt',
    street: 'Some',
    number: '99',
    sec_unit_num: '42'
  },
  '36401 County Road 43, Eaton, CO 80615': {
    street: 'County Road 43',
    number: '36401',
    zip: '80615',
    state: 'CO',
    city: 'Eaton'
  },
  '1234 COUNTY HWY 60E, Town, CO 12345': {
    suffix: 'E',
    state: 'CO',
    zip: '12345',
    number: '1234',
    city: 'Town',
    street: 'COUNTY HWY 60'
  },
  '321 S. Washington': {
    prefix: 'S',
    street: 'Washington',
    number: '321'
  },
  '\'45 Quaker Ave, Ste 105\'': {
    sec_unit_type: 'Ste',
    street: 'Quaker',
    number: '45',
    type: 'Ave',
    sec_unit_num: '105'
  },
  '2672 Industrial Row Troy, MI 48084': {
    zip: '48084',
    type: 'Row',
    city: 'Troy',
    number: '2672',
    state: 'MI',
    street: 'Industrial'
  }
};

Object.keys(address).forEach(function (k) {
  var parsed = parser.parseLocation(k);
  assert.deepEqual(address[k], parsed);
});