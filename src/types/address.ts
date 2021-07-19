export interface ParsedAddress {
  city?: string
  state?: string
  number?: string
  prefix?: string
  street?: string
  street1?: string
  street2?: string
  type?: string
  type1?: string
  type2?: string
  sec_unit_num?: string
  sec_unit_type?: string
  suffix?: string
  zip?: string
  plus4?: string
  short_street_type?: string
}

export interface AddressTestCase extends ParsedAddress {
  __skipTest?: boolean
}

export type AddressTestCaseMap = Record<string, AddressTestCase>
