import { toDegrees, convertAngleToPoint } from './utils'
import { Point, Linecap } from './types'

export interface SVGRadyInterface {
  selector?: string
  width?: number
  height?: number
  radius?: number
  start?: number
  end?: number
  spacing?: number
  activeColor?: string
  strokeWidth?: string
  linecap?: Linecap
  color?: string
  replace?: boolean
}

export default class SVGRady {
  selector: string
  width: number
  height: number
  radius: number
  start: number
  end: number
  spacing: number
  activeColor: string
  color: string
  elements: NodeListOf<HTMLElement>
  center: Point
  replace: boolean
  strokeWidth: string
  linecap: Linecap

  constructor(options: SVGRadyInterface = {}) {
    this.selector = options.selector ?? 'svgrady'
    this.width = options.width ?? 150
    this.height = options.height ?? 150
    this.radius = options.radius ?? 60
    this.start = options.start ?? -140
    this.end = options.end ?? 140
    this.spacing = options.spacing ?? 5
    this.activeColor = options.activeColor ?? '#613DC1'
    this.color = options.color ?? '#D9DAD8'
    this.replace = options.replace ?? false
    this.strokeWidth = options.strokeWidth ?? '4'
    this.linecap = options.linecap ?? 'round'

    this.center = this.getCenter()

    this.elements = this.getElements(this.selector)

    if (this.elements.length) {
      this.elements.forEach(el => this.drawSVG(el))
    }
  }

  /**
   * Search for elements with provided selector as data attribute
   *
   * @param {string} selector
   * @returns {NodeListOf<HTMLElement>} Array of Node HTMLElements
   */
  private getElements(selector: string): NodeListOf<HTMLElement> {
    return document.querySelectorAll(`[data-${selector}]`)
  }

  /**
   * Create SVG Namespaced Elements
   *
   * @param {string} elements Namespaced Elements to create
   * @returns {Array<Element>}
   */
  private createNSElements(elements: string[]): Array<Element> {
    let svgNS: string = 'http://www.w3.org/2000/svg'

    return elements.map(el => document.createElementNS(svgNS, el))
  }

  /**
   * Get center point from width and height
   *
   * @returns {Point}
   */
  private getCenter(): Point {
    let x = this.width / 2
    let y = this.height / 2

    return { x, y }
  }

  /**
   * Check if provided angles are full circle
   *
   * @param {start} Start Angle
   * @param {end} End Angle
   * @returns {boolean}
   */
  private isFullCircle(start: number, end: number): boolean {
    if (start - end === 0 || end - start === 360 || start - end === -360) {
      return true
    }
    return false
  }

  /**
   * Draw SVG and calculate everything else
   *
   * @todo Teardown this method because it does a lot of thinks
   * @param {HTMLElement} el
   * @returns {void}
   */
  private drawSVG(el: HTMLElement): void {
    let {
      start,
      end,
      strokeWidth,
      radius,
      center,
      spacing,
      color,
      activeColor,
      replace,
      linecap
    } = this

    let [svg, g]: Element[] = this.createNSElements(['svg', 'g'])
    let [min, max]: number[] = el.dataset.svgrady!.split(',').map(v => parseInt(v, 10))

    svg.setAttribute('data-steps', `${min},${max}`)
    svg.setAttribute('viewBox', `0 0 ${this.width} ${this.height}`)

    g.setAttribute('stroke-width', strokeWidth)
    g.setAttribute('fill-rule', 'evenodd')
    g.setAttribute('fill', 'transparent')
    g.setAttribute('stroke-linecap', linecap)

    if (this.isFullCircle(start, end)) {
      end = end - spacing
    }

    let point1: Point = convertAngleToPoint(this.radius, start)
    let point2: Point = convertAngleToPoint(this.radius, end)
    let length: number = this.calculateAngleBetweenTwoPoints(point1, point2)

    let spacesBetween: number = max - 1
    let lengthWithoutSpaces: number =
      length - spacing * spacesBetween + parseInt(strokeWidth, 10)
    let pieceLength: number = lengthWithoutSpaces / max
    let count: number = 0

    for (let i = 0; i < max; i++) {
      let [path]: Element[] = this.createNSElements(['path'])
      path.setAttribute('stroke', color)
      count++

      for (let j = 1; j <= min; j++) {
        if (count <= min) path.setAttribute('stroke', activeColor)
      }

      if (i > 0) {
        start = start + pieceLength + spacing
      }

      end = start + pieceLength - parseInt(strokeWidth, 10)
      path.setAttribute('d', this.drawArc(center, radius, start, end))
      g.appendChild(path)
    }

    svg.appendChild(g)
    replace ? el.parentNode?.replaceChild(svg, el) : el.appendChild(svg)
  }

  /**
   * Calculate Angle between given points.
   *
   * @param {Point} point1 First Point on circle
   * @param {Point} point2 Second Point on circle
   * @returns {number}
   */
  private calculateAngleBetweenTwoPoints(point1: Point, point2: Point): number {
    let angle1: number = toDegrees(Math.atan2(point1.y, point1.x))
    let angle2: number = toDegrees(Math.atan2(point2.y, point2.x))
    let angle: number = Math.round(angle1 - angle2)

    let result: number = angle < 0.0 ? angle + 360 : angle

    return result
  }

  /**
   * Will Convert given polar coordinates to Cartesian
   * - Convert Angle with radius to x,y
   *
   * @param {number} centerX
   * @param {number} centerY
   * @param {number} radius
   * @param {number} angleInDegrees
   * @returns {Point}
   */
  private polarToCartesian(
    centerX: number,
    centerY: number,
    radius: number,
    angleInDegrees: number
  ): Point {
    let angleInRadians: number = ((angleInDegrees - 90) * Math.PI) / 180.0

    return {
      x: centerX + radius * Math.cos(angleInRadians),
      y: centerY + radius * Math.sin(angleInRadians)
    }
  }

  /**
   * Draw arc on current path element
   *
   * @param {Point} x, y
   * @param {number} radius
   * @param {number} start
   * @param {number} end
   * @returns {string} Returns svg arc string
   */
  private drawArc({ x, y }: Point, radius: number, start: number, end: number): string {
    let startPoint: Point = this.polarToCartesian(x, y, radius, end)
    let endPoint: Point = this.polarToCartesian(x, y, radius, start)
    let angle = end - start

    angle = angle <= 0 ? (angle += 360) : angle
    let largeArcFlag = angle <= 180 ? 0 : 1

    // prettier-ignore
    let d = [
      'M', startPoint.x, startPoint.y,
      'A', radius, radius, 0, largeArcFlag, 0, endPoint.x, endPoint.y
    ].join(' ')

    return d
  }
}
