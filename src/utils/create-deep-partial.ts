interface LayoutObject { [key: string]: true | LayoutObject | [true] | [LayoutObject] }
type Layout = true | LayoutObject | [true] | [LayoutObject]

type DeepPartial<T> = Partial<{ [P in keyof T]: DeepPartial<T[P]> }>;

/**
 * Create a deep partial of "obj" based on "layout".
 * Example:
 *   obj = { dogs: ['Bob'], cats: [{ says: 'Meow', name: 'Jack' }, { says: 'Woof', name: 'Catdog' }] }
 *   layout = { cats: [{ name: true }] }
 *   return =  { cats: [{ name: 'Jack' }, { name: 'Catdog' }]}
 * @param obj Source object.
 * @param layout The layout of the returned object.
 * @returns The resulting deep partial.
 */
export function createDeepPartial <T>(obj: T, layout: Layout): DeepPartial<T> {
  if (layout === true || obj === undefined || obj === null) {
    return obj
  }

  if (Array.isArray(layout)) {
    // @ts-ignore
    return typeof obj?.map === 'function' ? obj.map(
      (member: any) => createDeepPartial(member, layout[0])
    ) : undefined
  }

  const res: DeepPartial<T> = {}
  for (const prop of Object.keys(layout)) {
    const propVal = Object.getOwnPropertyDescriptor(obj, prop)?.value
    if (propVal !== undefined && propVal !== null) {
      const resVal = createDeepPartial(propVal, layout[prop])
      if (resVal !== undefined && resVal !== null) {
        // @ts-ignore
        res[prop] = resVal
      }
    }
  }

  return res
}
