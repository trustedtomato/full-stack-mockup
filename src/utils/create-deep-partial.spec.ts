import { createDeepPartial } from './create-deep-partial'

describe('createDeepPartial', () => {
  it('should preserve the source when layout = true', () => {
    const x = { y: '' }
    expect(createDeepPartial(x, true)).toBe(x)
  })

  it('should create a shallow partial correctly', () => {
    expect(createDeepPartial(
      { a: 'bob', b: 'marley' },
      { b: true }
    )).toEqual(
      { b: 'marley' }
    )
  })

  it('should create a deep partial correctly', () => {
    expect(createDeepPartial(
      {
        a: 'bob',
        b: {
          c: 'marley',
          d: 'sun is shining',
          e: 'makes you wanna move'
        }
      },
      {
        b: {
          d: true,
          e: true
        }
      }
    )).toEqual(
      {
        b: {
          d: 'sun is shining',
          e: 'makes you wanna move'
        }
      }
    )
  })

  it('should create a deep partial correctly w/ array', () => {
    expect(createDeepPartial(
      {
        a: 'bob',
        b: [{
          c: 'marley',
          d: 'sun is shining',
          e: 'makes you wanna move'
        },{
          c: 'dylan',
          d: 'like a',
          e: 'rolling stone'
        }]
      },
      {
        b: [{
          d: true,
          e: true
        }]
      }
    )).toEqual(
      {
        b: [{
          d: 'sun is shining',
          e: 'makes you wanna move'
        },{
          d: 'like a',
          e: 'rolling stone'
        }]
      }
    )
  })

  it('should handle not-array when an array is expected', () => {
    expect(createDeepPartial(
      {
        a: 'bob',
        b: 'not-an-array',
        c: {
          map: 'not-callable'
        }
      },
      {
        b: [{
          d: true,
          e: true
        }],
        c: [true]
      }
    )).toEqual(
      {}
    )
  })

  it('should handle when an expected property does not exist', () => {
    expect(createDeepPartial(
      {
        a: 'bob'
      },
      {
        b: true
      }
    )).toEqual(
      {}
    )
  })
})
