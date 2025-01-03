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

### JavaScript

Using JavaScript load this package by embed this file via jsDelivr:

```js
import LinScale from 'https://cdn.jsdelivr.net/npm/linscale@1.0.1/+esm';
```

Remember: To use import you need to load your JavaScript file as ``type="module"``.

## API

Here you can find all methods available in the ``LinScale`` class.

Creating a new instance of ``LinScale`` allows to pass the bounds and maximum number of ticks. This replaces methods ``setBounds`` and ``setMaxTicks``. You still need to run ``calculate()``.

### ``setBounds( min, max )``

Set lower / upper bounds for the scale. Requires to run ``calculate()`` afterwards.

### ``setMaxTicks( ticks )``

Set maximum number of ticks within the scale. Requires to run ``calculate()`` afterwards.

### ``centerAt ( [ value = 0 ] )``

Center scale at the given value (default is zero). Requires to run ``calculate()`` afterwards.

### ``calculate()``

Calculates the scale range, minimum, maximum and step size.

### ``getStepSize()``

Returns the scale step size.

### ``getRange()``

Returns the scale range (from min to max).

### ``getMinimum()``

Returns the scale minium value.

### ``getMaximum()``

Returns the scale maximum value.

### ``getTicks()``

Returns an array of the scale ticks (ascending order).

### ``getTicksReverse()``

Returns an array of the scale ticks (descending order).

### ``pct( value [, from = 'min' ] )``

Returns the percentage of a value within the scale from the reference point (either minimum or maximum value).

## Patch notes

### 1.0.1

* Add ``centerAt`` method

### 1.0.0

* Initial release