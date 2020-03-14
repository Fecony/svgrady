import { Point } from '../types'

/**
 * Get center point from width and height
 *
 * @returns {Point}
 */
export default function getCenter(width: number, height: number): Point {
  let x = width / 2
  let y = height / 2

  return { x, y }
}
