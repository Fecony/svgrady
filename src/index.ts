import { toDegrees, convertAngleToPoint, toRadians } from './utils'
import { Point } from './types'

interface SVGRadyInterface {
  selector?: string
  width?: number
  height?: number
  radius?: number
  start?: number
  end?: number
  spacing?: number
  activeColor?: string
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
    this.center = this.getCenter()

    this.elements = this.getElements(this.selector)

    if (!!this.elements.length) {
      this.elements.forEach(el => this.drawSVG(el))
    }
  }

  private getElements(selector: string): NodeListOf<HTMLElement> {
    return document.querySelectorAll(`[data-${selector}]`)
  }

  private createNSElements(elements: string[]): Array<Element> {
    let svgNS: string = 'http://www.w3.org/2000/svg'

    return elements.map(el => document.createElementNS(svgNS, el))
  }

  private getCenter(): Point {
    let x = this.width / 2
    let y = this.height / 2

    return { x, y }
  }

  private drawSVG(el: HTMLElement): void {
    let { start, end, radius, center, spacing, color, activeColor, replace } = this

    let [svg, g]: Element[] = this.createNSElements(['svg', 'g'])
    let [min, max]: number[] = el.dataset.svgrady!.split(',').map(v => parseInt(v))

    svg.setAttribute('data-steps', `${min},${max}`)
    svg.setAttribute('viewBox', `0 0 ${this.width} ${this.height}`)

    g.setAttribute('stroke-width', '4')
    g.setAttribute('fill-rule', 'evenodd')
    g.setAttribute('fill', 'transparent')
    g.setAttribute('stroke-linecap', 'round')

    /**
     * Find given angles as Vectors on circle
     * And length between them
     *
     * Yes, I know we can just substract one angle from another to get same value
     * I just can't get it in my head for now.
     */
    let point1: Point = convertAngleToPoint(this.radius, start)
    let point2: Point = convertAngleToPoint(this.radius, end)
    let length: number = this.calculateAngleBetweenTwoPoints(point1, point2)

    let spacesBetween: number = max - 1
    let lengthWithoutSpaces: number = length - spacing * spacesBetween
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

      end = start + pieceLength
      path.setAttribute('d', this.drawArc(center, radius, start, end))
      g.appendChild(path)
    }

    svg.appendChild(g)
    replace ? el.parentNode?.replaceChild(svg, el) : el.appendChild(svg)
  }

  private calculateAngleBetweenTwoPoints(point1: Point, point2: Point): number {
    let angle1: number = toDegrees(Math.atan2(point1.y, point1.x))
    let angle2: number = toDegrees(Math.atan2(point2.y, point2.x))
    let angle: number = Math.round(angle1 - angle2)

    let result: number = angle < 0.0 ? angle + 360 : angle

    return result
  }

  private polarToCartesian(
    centerX: number,
    centerY: number,
    radius: number,
    angleInDegrees: number
  ) {
    let angleInRadians: number = ((angleInDegrees - 90) * Math.PI) / 180.0

    return {
      x: centerX + radius * Math.cos(angleInRadians),
      y: centerY + radius * Math.sin(angleInRadians)
    }
  }

  private drawArc({ x, y }: Point, radius: number, start: number, end: number) {
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
