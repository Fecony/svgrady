import { toRadians } from '../src/utils'

describe('toRadians test', () => {
  it('should convert degrees to radians', () => {
    let degrees = 45
    let expectedRadians = 0.7853981633974483
    expect(toRadians(degrees)).toBe(expectedRadians)
  })
})
