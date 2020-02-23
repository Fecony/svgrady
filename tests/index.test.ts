import SVGRady from '../src/index'

describe('SVGRady test', () => {
  it('should be truthy when true', () => {
    expect(true).toBeTruthy()
  })

  it('SVGRady Class is instantiable', () => {
    expect(new SVGRady()).toBeInstanceOf(SVGRady)
  })
})
