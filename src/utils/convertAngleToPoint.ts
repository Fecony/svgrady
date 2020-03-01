import toRadians from './toRadians'
import { Point } from '../types'

export default function convertAngleToPoint(radius: number, angle: number): Point {
  let point: Point = {
    x: radius * Math.sin(toRadians(angle)),
    y: radius * Math.cos(toRadians(angle))
  }

  return point
}
