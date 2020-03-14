import { Point } from '../types'

/**
 * Will Convert given polar coordinates to Cartesian
 * - Convert Angle with radius to x,y
 *
 * @param {Point} centerX Center Point
 * @param {number} radius
 * @param {number} angleInDegrees
 * @returns {Point}
 */
export default function polarToCartesian(
  center: Point,
  radius: number,
  angleInDegrees: number
): Point {
  let angleInRadians: number = ((angleInDegrees - 90) * Math.PI) / 180.0

  return {
    x: center.x + radius * Math.cos(angleInRadians),
    y: center.y + radius * Math.sin(angleInRadians)
  }
}
