import assert from 'assert'
import { AddressParser } from '../src/parser'
import { AddressTestCaseMap } from '../src/types/address'
import { existingTests, additionalTests } from './test-cases'

const addressParser = new AddressParser()

describe('Parser', () => {
  it('Properly parses addresses (existing test cases)', () => {
    const testAddresses = Object.keys(existingTests)
    testAddresses.forEach(runTests(existingTests))
  })

  it('Properly parses addresses (new test cases)', () => {
    const testAddresses = Object.keys(additionalTests)
    testAddresses.forEach(runTests(additionalTests))
  })
})

function runTests(tests: AddressTestCaseMap) {
  return function runTestsCurried(addressString) {
    const testCase = tests[addressString]

    if (testCase.__skipTest) {
      return
    }

    const parsed = addressParser.parseLocation(addressString)
    assert.deepEqual(parsed, testCase)
  }
}
