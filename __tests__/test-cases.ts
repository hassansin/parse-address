import { AddressTestCaseMap } from '../src/types/address'

export const additionalTests: AddressTestCaseMap = {
  '4972 SW 91st Aven, Cooper City, FL 33328, USA': {
    city: 'Cooper City',
    state: 'FL',
    number: '4972',
    prefix: 'SW',
    street: '91st',
    type: 'Ave',
    short_street_type: 'AV',
    zip: '33328',
  },
  '925 SW 102ND TE, Pembroke Pines, FL 33025, USA': {
    city: 'Pembroke Pines',
    state: 'FL',
    number: '925',
    prefix: 'SW',
    street: '102ND',
    type: 'Ter',
    short_street_type: 'TE',
    zip: '33025',
  },
  '42 Wallaby Way, Sidney, TX 76442': {
    city: 'Sidney',
    state: 'TX',
    number: '42',
    street: 'Wallaby',
    type: 'Way',
    short_street_type: 'WY',
    zip: '76442',
  },
  '1120 S Lamar Blvd, Austin, TX 78704': {
    city: 'Austin',
    state: 'TX',
    number: '1120',
    prefix: 'S',
    street: 'Lamar',
    type: 'Blvd',
    short_street_type: 'BV',
    zip: '78704',
  },
}

export const existingTests: AddressTestCaseMap = {
  '1005 Gravenstein Hwy 95472': {
    number: '1005',
    street: 'Gravenstein',
    type: 'Hwy',
    short_street_type: 'HY',
    zip: '95472'
  },
  '1005 Gravenstein Hwy, 95472': {
    number: '1005',
    street: 'Gravenstein',
    type: 'Hwy',
    short_street_type: 'HY',
    zip: '95472'
  },
  '1005 Gravenstein Hwy N, 95472': {
    number: '1005',
    street: 'Gravenstein',
    type: 'Hwy',
    suffix: 'N',
    short_street_type: 'HY',
    zip: '95472'
  },
  '1005 Gravenstein Highway North, 95472': {
    number: '1005',
    street: 'Gravenstein',
    type: 'Hwy',
    suffix: 'N',
    short_street_type: 'HY',
    zip: '95472'
  },
  '1005 N Gravenstein Highway, Sebastopol, CA': {
    number: '1005',
    prefix: 'N',
    street: 'Gravenstein',
    type: 'Hwy',
    city: 'Sebastopol',
    short_street_type: 'HY',
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
    short_street_type: 'HY',
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
    short_street_type: 'HY',
    state: 'CA'
  },
  '1005 N Gravenstein Highway, Sebastopol, CA, 95472': {
    number: '1005',
    prefix: 'N',
    street: 'Gravenstein',
    type: 'Hwy',
    city: 'Sebastopol',
    state: 'CA',
    short_street_type: 'HY',
    zip: '95472'
  },
  '1005 N Gravenstein Highway Sebastopol CA 95472': {
    number: '1005',
    prefix: 'N',
    street: 'Gravenstein',
    type: 'Hwy',
    city: 'Sebastopol',
    state: 'CA',
    short_street_type: 'HY',
    zip: '95472'
  },
  '1005 Gravenstein Hwy N Sebastopol CA': {
    number: '1005',
    street: 'Gravenstein',
    type: 'Hwy',
    suffix: 'N',
    city: 'Sebastopol',
    short_street_type: 'HY',
    state: 'CA'
  },
  '1005 Gravenstein Hwy N, Sebastopol CA': {
    number: '1005',
    street: 'Gravenstein',
    type: 'Hwy',
    suffix: 'N',
    city: 'Sebastopol',
    short_street_type: 'HY',
    state: 'CA'
  },
  '1005 Gravenstein Hwy, N Sebastopol CA': {
    number: '1005',
    street: 'Gravenstein',
    type: 'Hwy',
    city: 'North Sebastopol',
    short_street_type: 'HY',
    state: 'CA'
  },
  '1005 Gravenstein Hwy, North Sebastopol CA': {
    number: '1005',
    street: 'Gravenstein',
    type: 'Hwy',
    city: 'North Sebastopol',
    short_street_type: 'HY',
    state: 'CA'
  },
  '1005 Gravenstein Hwy Sebastopol CA': {
    number: '1005',
    street: 'Gravenstein',
    type: 'Hwy',
    city: 'Sebastopol',
    short_street_type: 'HY',
    state: 'CA'
  },
  '7800 Mill Station Rd, Sebastopol, CA 95472': {
    number: '7800',
    street: 'Mill Station',
    type: 'Rd',
    city: 'Sebastopol',
    state: 'CA',
    short_street_type: 'RD',
    zip: '95472'
  },
  '7800 Mill Station Rd Sebastopol CA 95472': {
    number: '7800',
    street: 'Mill Station',
    type: 'Rd',
    city: 'Sebastopol',
    state: 'CA',
    short_street_type: 'RD',
    zip: '95472'
  },
  '1600 Pennsylvania Ave. Washington DC': {
    number: '1600',
    street: 'Pennsylvania',
    type: 'Ave',
    city: 'Washington',
    short_street_type: 'AV',
    state: 'DC'
  },
  '1600 Pennsylvania Avenue Washington DC': {
    number: '1600',
    street: 'Pennsylvania',
    type: 'Ave',
    city: 'Washington',
    short_street_type: 'AV',
    state: 'DC'
  },
  '100 South St, Philadelphia, PA': {
    number: '100',
    street: 'South',
    type: 'St',
    city: 'Philadelphia',
    short_street_type: 'ST',
    state: 'PA'
  },
  '100 S.E. Washington Ave, Minneapolis, MN': {
    number: '100',
    prefix: 'SE',
    street: 'Washington',
    type: 'Ave',
    city: 'Minneapolis',
    short_street_type: 'AV',
    state: 'MN'
  },
  '3813 1/2 Some Road, Los Angeles, CA': {
    number: '3813',
    street: 'Some',
    type: 'Rd',
    city: 'Los Angeles',
    short_street_type: 'RD',
    state: 'CA'
  },
  '1 First St, e San Jose CA': {
    number: '1',
    street: 'First',
    type: 'St',
    city: 'East San Jose',
    short_street_type: 'ST',
    state: 'CA'
  },
  '233 S Wacker Dr 60606-6306': {
    number: '233',
    prefix: 'S',
    street: 'Wacker',
    type: 'Dr',
    zip: '60606',
    short_street_type: 'DR',
    plus4: '6306'
  },
  '233 S Wacker Dr 606066306': {
    number: '233',
    prefix: 'S',
    street: 'Wacker',
    type: 'Dr',
    zip: '60606',
    short_street_type: 'DR',
    plus4: '6306'
  },
  '233 S Wacker Dr 60606 6306': {
    number: '233',
    prefix: 'S',
    street: 'Wacker',
    type: 'Dr',
    zip: '60606',
    short_street_type: 'DR',
    plus4: '6306'
  },
  'S Wacker Dr 60606 6306': {
    prefix: 'S',
    street: 'Wacker',
    type: 'Dr',
    zip: '60606',
    short_street_type: 'DR',
    plus4: '6306'
  },
  '233 S Wacker Dr lobby 60606': {
    number: '233',
    prefix: 'S',
    street: 'Wacker',
    type: 'Dr',
    sec_unit_type: 'lobby',
    short_street_type: 'DR',
    zip: '60606'
  },
  '(233 S Wacker Dr lobby 60606)': {
    number: '233',
    prefix: 'S',
    street: 'Wacker',
    type: 'Dr',
    sec_unit_type: 'lobby',
    short_street_type: 'DR',
    zip: '60606'
  },
  '#42 233 S Wacker Dr 60606': {
    sec_unit_type: '#',
    sec_unit_num: '42',
    number: '233',
    prefix: 'S',
    street: 'Wacker',
    type: 'Dr',
    short_street_type: 'DR',
    zip: '60606'
  },
  'lt42 99 Some Road, Some City LA': {
    sec_unit_type: 'lt',
    sec_unit_num: '42',
    number: '99',
    street: 'Some',
    type: 'Rd',
    city: 'Some City',
    short_street_type: 'RD',
    state: 'LA'
  },
  "'45 Quaker Ave, Ste 105'": {
    number: '45',
    street: 'Quaker',
    type: 'Ave',
    sec_unit_type: 'Ste',
    short_street_type: 'AV',
    sec_unit_num: '105'
  },
  '2672 Industrial Row Troy, MI 48084': {
    number: '2672',
    street: 'Industrial',
    type: 'Row',
    city: 'Troy',
    state: 'MI',
    short_street_type: 'RO',
    zip: '48084'
  },
  'N95W18855 Jay Dr, Menomonee Falls, WI 53051': {
    number: 'N95W18855',
    street: 'Jay',
    type: 'Dr',
    city: 'Menomonee Falls',
    state: 'WI',
    short_street_type: 'DR',
    zip: '53051'
  },
  'N95W18855 Jay Dr Menomonee Falls WI 53051': {
    number: 'N95W18855',
    street: 'Jay',
    type: 'Dr',
    city: 'Menomonee Falls',
    state: 'WI',
    short_street_type: 'DR',
    zip: '53051'
  },
  'n95w18855 Jay Dr Menomonee Falls WI 53051': {
    number: 'n95w18855',
    street: 'Jay',
    type: 'Dr',
    city: 'Menomonee Falls',
    state: 'WI',
    short_street_type: 'DR',
    zip: '53051'
  },
  '10144 Potters Hatch Cmn Cupertino CA 95014': {
    number: '10144',
    street: 'Potters Hatch',
    type: 'Cmn',
    city: 'Cupertino',
    state: 'CA',
    short_street_type: 'BL',
    zip: '95014'
  },
  '10144 Potters Hatch Common Cupertino CA 95014': {
    number: '10144',
    street: 'Potters Hatch',
    type: 'Cmn',
    city: 'Cupertino',
    state: 'CA',
    short_street_type: 'BL',
    zip: '95014'
  },
  '36 Hathway Commons Lebanon OH 45036': {
    number: '36',
    street: 'Hathway',
    type: 'Cmns',
    city: 'Lebanon',
    state: 'OH',
    short_street_type: 'BL',
    zip: '45036'
  },
  '36 Hathway Cmns Lebanon OH 45036': {
    number: '36',
    street: 'Hathway',
    type: 'Cmns',
    city: 'Lebanon',
    state: 'OH',
    short_street_type: 'BL',
    zip: '45036'
  },
  '174 Sunset Crossroad Deer Isle ME 04627': {
    number: '174',
    street: 'Sunset',
    type: 'Xrd',
    city: 'Deer Isle',
    state: 'ME',
    short_street_type: 'BL',
    zip: '04627'
  },
  '174 Sunset Xrd Deer Isle ME 04627': {
    number: '174',
    street: 'Sunset',
    type: 'Xrd',
    city: 'Deer Isle',
    state: 'ME',
    short_street_type: 'BL',
    zip: '04627'
  },
  '905 Laing Crossroads Dawson GA 39842': {
    number: '905',
    street: 'Laing',
    type: 'Xrds',
    city: 'Dawson',
    state: 'GA',
    short_street_type: 'BL',
    zip: '39842'
  },
  '905 Laing Xrds Dawson GA 39842': {
    number: '905',
    street: 'Laing',
    type: 'Xrds',
    city: 'Dawson',
    state: 'GA',
    short_street_type: 'BL',
    zip: '39842'
  },
  '9402 Sequoia Fall San Antonio TX 78251': {
    number: '9402',
    street: 'Sequoia',
    type: 'Fall',
    city: 'San Antonio',
    state: 'TX',
    short_street_type: 'FA',
    zip: '78251'
  },
  '24411 Alamosa Fls San Antonio TX 78255': {
    number: '24411',
    street: 'Alamosa',
    type: 'Falls',
    city: 'San Antonio',
    state: 'TX',
    short_street_type: 'FA',
    zip: '78255'
  },
  '24411 Alamosa Falls San Antonio TX 78255': {
    number: '24411',
    street: 'Alamosa',
    type: 'Falls',
    city: 'San Antonio',
    state: 'TX',
    short_street_type: 'FA',
    zip: '78255'
  },
  '15235 Spring Land San Antonio TX 78247': {
    number: '15235',
    street: 'Spring',
    type: 'Land',
    city: 'San Antonio',
    state: 'TX',
    short_street_type: 'LD',
    zip: '78247'
  },
  '2146 University Square Mall Tampa FL 33612': {
    number: '2146',
    street: 'University Square',
    type: 'Mall',
    city: 'Tampa',
    state: 'FL',
    short_street_type: 'MA',
    zip: '33612'
  },
  '415 Van Wyck Mews Norfolk VA 23517': {
    number: '415',
    street: 'Van Wyck',
    type: 'Mews',
    city: 'Norfolk',
    state: 'VA',
    short_street_type: 'BL',
    zip: '23517'
  },
  '22 Cumbres Pass Santa Fe New Mexico 87508': {
    number: '22',
    street: 'Cumbres',
    type: 'Pass',
    city: 'Santa Fe',
    state: 'NM',
    short_street_type: 'BL',
    zip: '87508'
  },
  '6 Maison Rue Hattiesburg MS 39402': {
    number: '6',
    street: 'Maison',
    type: 'Rue',
    city: 'Hattiesburg',
    state: 'MS',
    short_street_type: 'RU',
    zip: '39402'
  },
  '12921 Coyote Run Fishers IN 46038': {
    number: '12921',
    street: 'Coyote',
    type: 'Run',
    city: 'Fishers',
    state: 'IN',
    short_street_type: 'RN',
    zip: '46038'
  },
  '2974 London Wall Bloomfield Hills MI 48304': {
    number: '2974',
    street: 'London',
    type: 'Wall',
    city: 'Bloomfield Hills',
    state: 'MI',
    short_street_type: 'BL',
    zip: '48304'
  }
}
