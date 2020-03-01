import { convertAngleToPoint } from '../src/utils'

describe('convertAngleToPoint test', () => {
  it('should convert angle to point on circle', () => {
    let radius = 80
    let angle = 17

    let expectedResult = {
      x: 23.38973637781894,
      y: 76.50438047704283
    }

    expect(convertAngleToPoint(radius, angle)).toMatchObject(expectedResult)
  })
})
