/**
 * linscale
 * lightweight npm package to create linear scales
 * 
 * @author komed3 (Paul Köhler)
 * @version 1.0.1
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

            this.setMaxTicks( _ticks );

        }

    };

    /**
     * @private
     * find nearest value
     * 
     * @param {Number} range range (max - min)
     * @param {Boolean} round round value
     * @returns {Number} nearest value
     */
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

    /**
     * @private
     * generates a range of numbers
     * 
     * @param {Number} start range start
     * @param {Number} stop range end
     * @param {Number} step step size
     * @returns {Number[]} generated range of numbers
     */
    #range ( start, stop, step ) {

        return Array.from(
            { length: ( stop - start ) / step + 1 },
            ( _, i ) => start + ( i * step )
        );

    };

    /**
     * set lower / upper bounds
     * 
     * @param {Number} low lower bound
     * @param {Number} high upper bound
     */
    setBounds ( low, high ) {

        low = parseFloat( low );
        high = parseFloat( high );

        this.lowerBound = Math.min( low, high );
        this.upperBound = Math.max( low, high );

        this.is = false;

    };

    /**
     * set maximum number of ticks
     * 
     * @param {Number} ticks number of ticks
     */
    setMaxTicks ( ticks ) {

        this.maxTicks = parseInt( ticks );

        this.is = false;

    };

    /**
     * center scale at value
     * 
     * @param {Number} [value=0] center value
     */
    centerAt ( value = 0 ) {

        if ( this.lowerBound && this.upperBound ) {

            value = parseFloat( value );

            let abs = Math.max(
                Math.abs( value - this.lowerBound ),
                Math.abs( value - this.upperBound )
            );

            this.lowerBound = value - abs;
            this.upperBound = value + abs;

            this.is = false;

        }

    };

    /**
     * calculates scale min / max and step size
     * 
     * @returns {Boolean} scale successfully generated
     */
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

    /**
     * get step size
     * 
     * @returns {Number} step size
     */
    getStepSize () {

        if ( this.is ) {

            return this.stepSize;

        }

    };

    /**
     * get scale range
     * 
     * @returns {Number} range
     */
    getRange () {

        if ( this.is ) {

            return this.range;

        }

    };

    /**
     * gets scale maximum
     * 
     * @returns {Number} maximum
     */
    getMaximum () {

        if ( this.is ) {

            return this.max;

        }

    };

    /**
     * get scale minimum
     * 
     * @returns {Number} minimum
     */
    getMinimum () {

        if ( this.is ) {

            return this.min;

        }

    };

    /**
     * get scale ticks
     * 
     * @returns {Number[]} ticks
     */
    getTicks () {

        if ( this.is ) {

            return this.#range(
                this.min, this.max,
                this.stepSize
            );

        }

    };

    /**
     * gets scale ticks in reverse order
     * 
     * @returns {Number[]} ticks
     */
    getTicksReverse () {

        if ( this.is ) {

            return this.getTicks().reverse();

        }

    };

    /**
     * get percentage of a value within the scale
     * 
     * @param {Number} value value to calculate the percentage for
     * @param {String} [from="min"] reference point ( min / max )
     * @returns {Number} percentage
     */
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