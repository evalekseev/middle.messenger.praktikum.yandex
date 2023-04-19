type Indexed<T = unknown> = {
  [key in string]: T
}

export default function set(
  object: Indexed | unknown,
  path: string,
  value: unknown
): Indexed | unknown {
  if (typeof path !== 'string') {
    throw new Error('path must be string')
  }
  if (!(object instanceof Object)) {
    return object
  }

  const arr = path.split('.')
  const res = arr.reduceRight((acc, el) => {
    return { [el]: acc }
  }, value)

  return merge(object, res)
}

function merge(lhs: any, rhs: any) {
  function mergeObj(lhs: any, rhs: any) {
    const lhsKeys = Object.keys(lhs)
    const rhsKeys = Object.keys(rhs)

    rhsKeys.forEach(el => {
      const check = lhsKeys.includes(el)

      if (check) {
        const isLeftObj = Object.keys(lhs[el]).length
        const isRightObj = Object.keys(rhs[el]).length

        if (!isRightObj) {
          lhs[el] = rhs[el]
        }

        if (isRightObj && isLeftObj) {
          mergeObj(lhs[el], rhs[el])
        }
      } else lhs[el] = rhs[el]
    })
    return lhs
  }

  return mergeObj(lhs, rhs)
}
export { set, merge }
