/**
 * linscale
 * lightweight npm package to create linear scales
 * 
 * @author komed3 (Paul Köhler)
 * @version 1.0.0
 * @license MIT
 */

'use strict';

module.exports = class LinScale {

    constructor ( _low, _high, _ticks ) {

        if ( _low && _high ) {

            this.setBounds( _low, _high );

        }

        if ( _ticks ) {

            this.setTickCount( _ticks );

        }

    };

    setBounds ( low, high ) {

        low = parseFloat( low );
        high = parseFloat( high );

        this.lowerBound = Math.min( low, high );
        this.upperBound = Math.max( low, high );

    };

    setTickCount ( ticks ) {

        this.maxTicks = parseInt( ticks );

    };

};