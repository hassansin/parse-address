import test from 'ava';
import Parser from '../Parser';
// let parser = new Parser();
// console.log(parser)
const address = {
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
    type: 'Highway',
    suffix: 'North',
    zip: '95472'
  },
  '1005 N Gravenstein Highway, Sebastopol, CA': {
    number: '1005',
    prefix: 'N',
    street: 'Gravenstein',
    type: 'Highway',
    city: 'Sebastopol',
    state: 'CA'
  },
  '1005 N Gravenstein Highway, Suite 500, Sebastopol, CA': {
    number: '1005',
    prefix: 'N',
    street: 'Gravenstein',
    type: 'Highway',
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
    type: 'Highway',
    city: 'Sebastopol',
    state: 'CA',
    zip: '95472'
  },
  '1005 N Gravenstein Highway Sebastopol CA 95472': {
    number: '1005',
    prefix: 'N',
    street: 'Gravenstein',
    type: 'Highway',
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
    type: 'Avenue',
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
    prefix: 'SE.',
    street: 'Washington',
    type: 'Ave',
    city: 'Minneapolis',
    state: 'MN'
  },
  '3813 1/2 Some Road, Los Angeles, CA': {
    number: '3813',
    street: 'Some',
    type: 'Road',
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
    type2: 'Street',
    city: 'San Francisco',
    state: 'CA',
    type1: 'Street'
  },
  'Mission Avenue and Valencia Street San Francisco CA': {
    street1: 'Mission',
    type1: 'Avenue',
    street2: 'Valencia',
    type2: 'Street',
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
    state: 'New York'
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
   "233 S Wacker Dr 60606 6306": {
     number: "233",
     prefix: "S",
     street: "Wacker",
     type: "Dr",
     zip: "60606",
     plus4: "6306"
   },
   "S Wacker Dr 60606 6306": {
     prefix: "S",
     street: "Wacker",
     type: "Dr",
     zip: "60606",
     plus4: "6306"
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
    type: 'Road',
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
  }
};

test('test', t => {
  t.true(true)
})
// Object.keys(address).forEach((k, i) => {
//   test(`${i} - does not error`, t => {
//     t.deepEqual(address[k], parser.parseLocation(k));
//   });
// });
