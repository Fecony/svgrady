import SVGrady from '../src/index'

describe('SVGrady test', () => {
  it('SVGrady Class is instantiable', () => {
    let params = {
      selector: 'svgrady'
    }
    expect(new SVGrady(params)).toBeInstanceOf(SVGrady)
  })
})
