import assert from 'assert'
import { testCases } from './test-cases'
import { AddressParser } from '../src/parser'

describe('Parser', () => {
  const addressParser = new AddressParser()

  it('Properly parses addresses (existing test cases)', () => {
    Object.keys(testCases).forEach((addressString) => {
      const parsed = addressParser.parseLocation(addressString)
      assert.deepEqual(parsed, testCases[addressString])
    })
  })

  it('Properly parses addresses (new test cases)', () => {
    const cooperCity = addressParser.parseLocation(
      '4972 SW 91st Aven, Cooper City, FL 33328, USA'
    )

    const lisaAdams = addressParser.parseLocation(
      '925 SW 102ND TE, Pembroke Pines, FL 33025, USA'
    )

    const soCo = addressParser.parseLocation(
      '3801 S Congress Ave, L216, Austin, TX 78704'
    )

    expect(cooperCity).toEqual({
      city: 'Cooper City',
      state: 'FL',
      number: '4972',
      prefix: 'SW',
      street: '91st',
      type: 'Ave',
      zip: '33328',
    })

    expect(lisaAdams).toEqual({
      city: 'Pembroke Pines',
      state: 'FL',
      number: '925',
      prefix: 'SW',
      street: '102ND',
      type: 'Ter',
      zip: '33025',
    })

    expect(soCo).toEqual({
      city: 'Austin',
      state: 'TX',
      number: '3801',
      prefix: 'S',
      street: 'Congress',
      type: 'Ave',
      zip: '78704',
    })
  })
})
