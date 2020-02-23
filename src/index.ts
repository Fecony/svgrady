interface SVGRadyInterface {
  element: string
  startAngle: number
  endAngle: number
  activeColor: string
  color: string
}

export default class SVGRady {
  element: string
  startAngle: number
  endAngle: number
  activeColor: string
  color: string

  constructor(options?: SVGRadyInterface) {
    this.element = options?.element ?? 'svgrady'
    this.startAngle = options?.startAngle ?? 0
    this.endAngle = options?.endAngle ?? 250
    this.activeColor = options?.activeColor ?? 'lightblue'
    this.color = options?.color ?? 'gray'
    this.drawSVG()
  }

  private drawSVG(): void {}
}
