import { stateCodesMap } from './states'
import { directionsMap } from './directions'
import { streetTypeMap } from './street-type'

export const normalizeMap = {
  prefix: directionsMap,
  prefix1: directionsMap,
  prefix2: directionsMap,
  suffix: directionsMap,
  suffix1: directionsMap,
  suffix2: directionsMap,
  type: streetTypeMap,
  type1: streetTypeMap,
  type2: streetTypeMap,
  state: stateCodesMap,
}
