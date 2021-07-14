# US Street Address Parser  [![Build Status](https://travis-ci.org/hassansin/parse-address.svg)](https://travis-ci.org/hassansin/parse-address)

This is a Typescript port for the Perl [Geo::StreetAddress::US](http://search.cpan.org/~timb/Geo-StreetAddress-US-1.04/US.pm) package

*Description from Geo::StreetAddress::US*:

>Geo::StreetAddress::US is a regex-based street address and street intersection parser for the United States. Its basic goal is to be as forgiving as possible when parsing user-provided address strings. Geo::StreetAddress::US knows about directional prefixes and suffixes, fractional building numbers, building units, grid-based addresses (such as those used in parts of Utah), 5 and 9 digit ZIP codes, and all of the official USPS abbreviations for street types and state names... [more](http://search.cpan.org/~timb/Geo-StreetAddress-US-1.04/US.pm)

## Usage:

```ts
import parser from '@bankrate/parse-address'

const address = '1005 N Gravenstein Highway Sebastopol CA 95472'
const parsed = parser.parseLocation(address)

// Parsed address:
{
 number: '1005',
 prefix: 'N',
 street: 'Gravenstein',
 type: 'Hwy',
 city: 'Sebastopol',
 state: 'CA',
 zip: '95472',
}
```
