import SVGRady from '../src/index'

describe('SVGRady test', () => {
  it('SVGRady Class is instantiable', () => {
    let params = {
      selector: 'svgrady'
    }
    expect(new SVGRady(params)).toBeInstanceOf(SVGRady)
  })
})
