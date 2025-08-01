/**
 * -----------------------------------------------------------------------------------------
 * INTERSEL - 4 cité d'Hauteville - 75010 PARIS
 * RCS PARIS 488 379 660 - NAF 721Z
 *
 * File : Compatibility.js
 * Compatibility extensions for Blapy V2
 *
 * -----------------------------------------------------------------------------------------
 * @copyright Intersel 2015-2025
 * @fileoverview Compatibility extensions for Blapy V1 support in Blapy V2.
 * @see {@link https://github.com/intersel/blapy2}
 * @author Corentin NELHOMME - corentin.nelhomme@intersel.fr
 * @version 1.0.0
 * @license DonationWare - see https://github.com/intersel/blapy2/blob/master/LICENSE
 * -----------------------------------------------------------------------------------------
 */

import { Blapy } from '../core/Blapy2.js';

/**
 * HTMLElement extension.
 * Allows usage like: document.getElementById('myId').Blapy(options)
 *
 * @function Blapy
 * @memberof HTMLElement
 * @param {Object} [options={}] - Configuration options for the Blapy instance.
 * @returns {Blapy} The Blapy instance attached to the HTMLElement.
 */
HTMLElement.prototype.Blapy = function (options = {}) {
    // If a Blapy instance is already attached to this element, return it
    if (this._blapyInstance) {
        return this._blapyInstance;
    }

    const instance = new Blapy(this, options);
    instance.initApplication();
    this._blapyInstance = instance;
    return instance;
};

/**
 * Extension for compatibility with jQuery-like syntax.
 *
 * Allows usage like: $('#myId').Blapy(options)
 *
 * This function defines a global `$blapy` function that mimics
 * the jQuery selector behavior and attaches the Blapy instance
 * to the selected DOM element.
 *
 * @function enableJQueryLikeSyntax
 * @example
 * enableJQueryLikeSyntax();
 * $blapy('#myContainer').Blapy({ debug: true });
 */
export function enableJQueryLikeSyntax() {
    if (typeof window !== 'undefined' && !window.$blapy) {
        window.$blapy = function (selector) {
            const element = typeof selector === 'string'
                ? document.querySelector(selector)
                : selector;

            if (!element) {
                throw new Error(`Element not found: ${selector}`);
            }

            return {
                Blapy: function (options = {}) {
                    return element.Blapy(options);
                }
            };
        };
    }
}

export default { enableJQueryLikeSyntax };