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

    is = false;

    constructor ( _low, _high, _ticks ) {

        if ( _low && _high ) {

            this.setBounds( _low, _high );

        }

        if ( _ticks ) {

            this.setTickCount( _ticks );

        }

    };

    #nearest ( range, round ) {

        let exponent = Math.floor( Math.log10( range ) ),
            value = range / Math.pow( 10, exponent ),
            nearest;

        for( const [ near, test ] of Object.entries( [
            { 1: 1.0, 2: 2, 5: 5, 10: 10 },
            { 1: 1.5, 2: 3, 5: 7, 10: 10 }
        ][ round ? 1 : 0 ] ) ) {

            if ( round ? value < test : value <= test ) {

                nearest = near;
                break;

            }

        }

        return nearest * Math.pow( 10, exponent );

    };

    #range ( start, stop, step ) {

        return Array.from(
            { length: ( stop - start ) / step + 1 },
            ( _, i ) => start + ( i * step )
        );

    };

    setBounds ( low, high ) {

        low = parseFloat( low );
        high = parseFloat( high );

        this.lowerBound = Math.min( low, high );
        this.upperBound = Math.max( low, high );

        this.is = false;

    };

    setTickCount ( ticks ) {

        this.maxTicks = parseInt( ticks );

        this.is = false;

    };

    calculate () {

        if ( this.lowerBound && this.upperBound && this.maxTicks ) {

            let range = this.#nearest(
                this.upperBound - this.lowerBound,
                false
            );

            this.stepSize = this.#nearest(
                range / ( this.maxTicks - 1 ),
                true
            );

            this.min = Math.floor(
                this.lowerBound / this.stepSize
            ) * this.stepSize;

            this.max = Math.ceil(
                this.upperBound / this.stepSize
            ) * this.stepSize;

            this.range = this.max - this.min;

            this.is = true;

        }

        return this.is;

    };

    getStepSize () {

        if ( this.is ) {

            return this.stepSize;

        }

    };

    getRange () {

        if ( this.is ) {

            return this.range;

        }

    };

    getMaximum () {

        if ( this.is ) {

            return this.max;

        }

    };

    getMinimum () {

        if ( this.is ) {

            return this.min;

        }

    };

    getTicks () {

        if ( this.is ) {

            return this.#range(
                this.min, this.max,
                this.stepSize
            );

        }

    };

    getTicksReverse () {

        if ( this.is ) {

            return this.getTicks().reverse();

        }

    };

    pct ( value, from = 'min' ) {

        if ( this.is ) {

            switch ( from ) {

                default:
                case 'min':
                    return ( value - this.min ) / this.range * 100;

                case 'max':
                    return ( this.max - value ) / this.range * 100;

            }

        }

    };

};