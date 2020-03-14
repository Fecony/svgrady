import {
  calculateAngleBetweenTwoPoints,
  convertAngleToPoint,
  toRadians,
  toDegrees,
  getCenter,
  getDOMElements,
  isFullCircle,
  polarToCartesian
} from '../src/utils'
import { Point } from '../src/types'

describe('Util tests', () => {
  describe('toRadians.ts', () => {
    it('should convert degrees to radians', () => {
      let degrees: number = 45
      let expectedRadians: number = 0.7853981633974483
      expect(toRadians(degrees)).toBe(expectedRadians)
    })
  })

  describe('toDegrees.ts', () => {
    it('should convert radians to degrees', () => {
      let radians: number = 3.141592653589793
      let expectedDegrees: number = 180
      expect(toDegrees(radians)).toBe(expectedDegrees)
    })
  })

  describe('getCenter.ts', () => {
    it('should return valid center point', () => {
      let size: number = 50
      let expectedCenter: Point = {
        x: size / 2,
        y: size / 2
      }

      expect(getCenter(size, size)).toMatchObject(expectedCenter)
    })
  })

  describe('isFullCircle.ts', () => {
    it('should return true if is full circle', () => {
      expect(isFullCircle(0, 360)).toBe(true)
      expect(isFullCircle(360, 360)).toBe(true)
      expect(isFullCircle(180, 180)).toBe(true)
    })

    it('should return false if is not full circle', () => {
      expect(isFullCircle(0, 180)).toBe(false)
      expect(isFullCircle(0, 45)).toBe(false)
      expect(isFullCircle(-40, 40)).toBe(false)
    })
  })

  describe('getDOMElements.ts', () => {
    it('should return Node List of HTML Elements', () => {
      document.body.innerHTML = '<div data-test="1,2"></div>'
      expect(getDOMElements('test')).not.toBeNull()
      expect(getDOMElements('test')).toHaveLength(1)
    })

    it('should return empty array', () => {
      document.body.innerHTML = '<div>test</div>'
      expect(getDOMElements('test')).toHaveLength(0)
    })
  })

  describe('polarToCartesian.ts', () => {
    it('should return correct cartesian coords', () => {
      let center: Point = { x: 15, y: 15 }
      let radius: number = 80
      let angleInDegrees: number = 120

      let expectedResult: Point = { x: 84.2820323027551, y: 54.99999999999999 }

      expect(polarToCartesian(center, radius, angleInDegrees)).toMatchObject(
        expectedResult
      )
    })
  })

  describe('convertAngleToPoint.ts', () => {
    it('should convert angle to point on circle', () => {
      let radius: number = 80
      let angle: number = 17

      let expectedResult: Point = {
        x: 23.38973637781894,
        y: 76.50438047704283
      }

      expect(convertAngleToPoint(radius, angle)).toMatchObject(expectedResult)
    })
  })

  describe('calculateAngleBetweenTwoPoints.ts', () => {
    it('should return correct angle between', () => {
      let point1: Point = convertAngleToPoint(80, -90)
      let point2: Point = convertAngleToPoint(80, 90)

      let expectedResult: number = 180

      expect(calculateAngleBetweenTwoPoints(point1, point2)).toBe(expectedResult)
    })

    it('should return positive angle', () => {
      let radius: number = 80
      let point1: Point = convertAngleToPoint(radius, -140)
      let point2: Point = convertAngleToPoint(radius, 140)

      let expectedResult: number = 280

      expect(calculateAngleBetweenTwoPoints(point1, point2)).toBe(expectedResult)
    })
  })
})
