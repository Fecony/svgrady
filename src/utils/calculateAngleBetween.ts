import { Point } from '../types'
import { toDegrees } from './'

/**
 * Calculate Angle between given points.
 *
 * @param {Point} point1 First Point on circle
 * @param {Point} point2 Second Point on circle
 * @returns {number}
 */
export default function calculateAngleBetweenTwoPoints(
  point1: Point,
  point2: Point
): number {
  let angle1: number = toDegrees(Math.atan2(point1.y, point1.x))
  let angle2: number = toDegrees(Math.atan2(point2.y, point2.x))
  let angle: number = Math.round(angle1 - angle2)

  let result: number = angle < 0.0 ? angle + 360 : angle

  return result
}
