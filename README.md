# SVGRady ◠

[![Build Status](https://travis-ci.com/Fecony/svgrady.svg?token=KquVGmQ9CBMhcoabSNv9&branch=master)](https://travis-ci.com/Fecony/svgrady)
[![codecov](https://codecov.io/gh/Fecony/svgrady/branch/master/graph/badge.svg?token=SwFAQ4QTft)](https://codecov.io/gh/Fecony/svgrady)

Javascript Separated Radial SVG generator

![Radial SVG Preview](./images/preview.png)

## Installation

Use the package manager [npm](https://www.npmjs.com/) to install svgrady.

```bash
npm install svgrady
```

## Usage

Import package

```js
import svgrady from 'svgrady'
```

In your layout add data attribute with values (min,max).
Where 3 is minimal(completed steps), and 5 is total count, separated by comma

```html
<div data-svgrady="3,5"></div>
```

Customize options and initialize SVGRady

```js
let options = {
  selector: 'svgrady', // Element data attribute
  width: 150, // SVG width
  height: 150, // SVG height
  radius: 60, // SVG radius
  start: -140, // Start angle
  end: 140, // End Angle
  spacing: 5, // Spacing between each step
  activeColor: '#613DC1',
  color: '#D9DAD8',
  replace: false // if true, will replace element with svg
}

new SVGRady(options)
```

## To Do:

Things that can be implemented.

- Animations
- Tooltips (show info about step)
- ...

## Examples

- TODO

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
