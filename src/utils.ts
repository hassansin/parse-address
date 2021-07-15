export function capitalize(s) {
  return s && s[0].toUpperCase() + s.slice(1)
}

export function keys(o) {
  return Object.keys(o)
}

export function values(o: Record<string, any>) {
  var v: any[] = []

  keys(o).forEach(function (k) {
    v.push(o[k])
  })

  return v
}

export function each(o, fn) {
  keys(o).forEach(function (k) {
    fn(o[k], k)
  })
}

export function invert(o) {
  var o1 = {}

  keys(o).forEach(function (k) {
    o1[o[k]] = k
  })

  return o1
}

export function flatten(o) {
  return keys(o).concat(values(o))
}
