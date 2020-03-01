import { toDegrees } from '../src/utils'

describe('toDegrees test', () => {
  it('should convert radians to degrees', () => {
    let radians = 3.141592653589793
    let expectedDegrees = 180
    expect(toDegrees(radians)).toBe(expectedDegrees)
  })
})
