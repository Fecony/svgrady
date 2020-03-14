import {
  convertAngleToPoint,
  getCenter,
  isFullCircle,
  calculateAngleBetweenTwoPoints,
  polarToCartesian,
  getDOMElements
} from './utils'
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
  strokeWidth?: number
  linecap?: Linecap
  color?: string
  replace?: boolean
  className?: string
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
  strokeWidth: number
  linecap: Linecap
  className: string

  constructor(options: SVGRadyInterface) {
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
    this.strokeWidth = options.strokeWidth ?? 4
    this.linecap = options.linecap ?? 'round'
    this.className = options.className ?? ''

    this.center = getCenter(this.width, this.height)
    this.elements = getDOMElements(this.selector)

    if (this.elements.length) {
      this.elements.forEach(el => this.drawSVG(el))
    }
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
   * Draw SVG and calculate everything else
   *
   * @todo Teardown this method because it does a lot of thinks
   * @param {HTMLElement} el
   * @returns {void}
   */
  private drawSVG(el: HTMLElement): void {
    let {
      selector,
      start,
      end,
      strokeWidth,
      radius,
      center,
      spacing,
      color,
      activeColor,
      replace,
      linecap,
      className
    } = this

    let [svg, g]: Element[] = this.createNSElements(['svg', 'g'])
    let [min, max]: number[] = el.dataset[selector]!.split(',').map(v => parseInt(v, 10))

    svg.setAttribute('data-steps', `${min},${max}`)
    svg.setAttribute('viewBox', `0 0 ${this.width} ${this.height}`)

    if (className.length) {
      svg.setAttribute('class', className)
    }

    g.setAttribute('stroke-width', strokeWidth.toString(10))
    g.setAttribute('fill-rule', 'evenodd')
    g.setAttribute('fill', 'transparent')
    g.setAttribute('stroke-linecap', linecap)

    if (isFullCircle(start, end)) {
      end = end - spacing
    }

    let point1: Point = convertAngleToPoint(this.radius, start)
    let point2: Point = convertAngleToPoint(this.radius, end)
    let length: number = calculateAngleBetweenTwoPoints(point1, point2)

    let spacesBetween: number = max - 1
    let lengthWithoutSpaces: number = length - spacing * spacesBetween + strokeWidth
    let pieceLength: number = lengthWithoutSpaces / max
    let count: number = 0

    for (let i = 0; i < max; i++) {
      let [path]: Element[] = this.createNSElements(['path'])
      path.setAttribute('stroke', color)
      path.setAttribute('class', 'step')
      count++

      for (let j = 1; j <= min; j++) {
        if (count <= min) {
          path.setAttribute('stroke', activeColor)
          path.setAttribute('class', 'step done')
        }
      }

      if (i > 0) {
        start = start + pieceLength + spacing
      }

      end = start + pieceLength - strokeWidth
      path.setAttribute('d', this.drawArc(center, radius, start, end))
      g.appendChild(path)
    }

    svg.appendChild(g)
    replace ? el.parentNode?.replaceChild(svg, el) : el.appendChild(svg)
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
  private drawArc(center: Point, radius: number, start: number, end: number): string {
    let startPoint: Point = polarToCartesian(center, radius, end)
    let endPoint: Point = polarToCartesian(center, radius, start)
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
