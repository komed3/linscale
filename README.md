# linscale

This lightweight npm package can be used to calculate a simple linear scale between two given values (minimum and maximum) and the maximal amount of ticks.

Install

Using Node.js, install the package with the following shell command:

```sh
npm install linscale
```

## Usage

Load the package into your project:

```js
const LinScale = require( 'linscale' );
```

Sample of how to use the package in your code:

```js
let scale = new LinScale( -1.341, 6.5, 6 );

if ( scale.calculate() ) {

    let min = scale.getMinimum();
    // expected: -2

    let max = scale.getMaximum();
    // expected: 7

    let ticks = scale.getTicks();
    // expected: [ -2, 0, 2, 4, 6, 8 ]

    let pct = scale.pct( 1.5 );
    // expected: 35

}
```