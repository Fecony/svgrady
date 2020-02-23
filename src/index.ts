interface SVGRadyInterface {
  selector: string
  startAngle: number
  endAngle: number
  activeColor: string
  color: string
  replace: boolean
}

export default class SVGRady {
  selector: string
  // startAngle: number
  // endAngle: number
  // activeColor: string
  // color: string
  elements: NodeListOf<HTMLElement>

  constructor(options?: SVGRadyInterface) {
    this.selector = options?.selector ?? 'svgrady'
    // this.startAngle = options?.startAngle ?? 0
    // this.endAngle = options?.endAngle ?? 250
    // this.activeColor = options?.activeColor ?? 'lightblue'
    // this.color = options?.color ?? 'gray'

    this.elements = this.getElements(this.selector)

    if (!!this.elements.length) {
      this.elements.forEach(el => this.drawSVG)
    }
  }

  private getElements(selector: string): NodeListOf<HTMLElement> {
    return document.querySelectorAll(`[data-${selector}]`)
  }

  private drawSVG(el: HTMLElement): void {
    let svgNS = 'http://www.w3.org/2000/svg'

    let svg = document.createElementNS(svgNS, 'svg')
    svg.classList.add('svg')
    svg.setAttribute('viewBox', '0 0 152 152')

    let g = document.createElementNS(svgNS, 'g')

    g.setAttribute('stroke-width', '4')
    g.setAttribute('fill-rule', 'evenodd')
    g.setAttribute('fill', 'transparent')
    g.setAttribute('stroke-linecap', 'round')

    let path = document.createElementNS(svgNS, 'path')
    path.setAttribute(
      'd',
      'M1.9982381 79.2284262c.78669047 17.8075714 7.85809523 33.9800948 19.0620476 46.3460238'
    )
    path.setAttribute('stroke', '#613DC1')

    g.appendChild(path)
    svg.appendChild(g)
    el.parentNode?.replaceChild(svg, el) // Replace element with svg
    // el.appendChild(svg) Add inisde

    console.log('add svg')
  }
}
