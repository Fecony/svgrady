/**
 * Check if provided angles are full circle
 *
 * @param {start} Start Angle
 * @param {end} End Angle
 * @returns {boolean}
 */
export default function isFullCircle(start: number, end: number): boolean {
  if (start - end === 0 || end - start === 360 || start - end === -360) {
    return true
  }
  return false
}
