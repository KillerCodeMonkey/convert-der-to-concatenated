/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __nccwpck_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__nccwpck_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__nccwpck_require__.o(definition, key) && !__nccwpck_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__nccwpck_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__nccwpck_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat */
/******/ 	
/******/ 	if (typeof __nccwpck_require__ !== 'undefined') __nccwpck_require__.ab = __dirname + "/";
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
__nccwpck_require__.r(__webpack_exports__);
/* harmony export */ __nccwpck_require__.d(__webpack_exports__, {
/* harmony export */   convertDerToConcatenated: () => (/* binding */ convertDerToConcatenated)
/* harmony export */ });
const convertDerToConcatenated = (signature) => {
    const derEncodedBytes = typeof signature === 'string' ? Buffer.from(signature, 'base64') : signature;
    if (derEncodedBytes.length < 8 || derEncodedBytes[0] != 48) {
        return null;
    }
    let offset = 0;
    if (derEncodedBytes[1] > 0) {
        offset = 2;
    }
    else if (derEncodedBytes[1] == 0x81) {
        offset = 3;
    }
    else {
        return null;
    }
    const rLength = derEncodedBytes[offset + 1];
    let i = rLength;
    for (i; (i > 0) && (derEncodedBytes[(offset + 2 + rLength) - i] == 0); i--)
        ;
    const sLength = derEncodedBytes[offset + 2 + rLength + 1];
    let j = sLength;
    for (j; (j > 0) && (derEncodedBytes[(offset + 2 + rLength + 2 + sLength) - j] == 0); j--)
        ;
    if ((derEncodedBytes[offset - 1] & 0xff) != derEncodedBytes.length - offset
        || (derEncodedBytes[offset - 1] & 0xff) != 2 + rLength + 2 + sLength
        || derEncodedBytes[offset] != 2
        || derEncodedBytes[offset + 2 + rLength] != 2) {
        return null;
    }
    return Buffer.concat([derEncodedBytes.subarray((offset + 2 + rLength) - i, (offset + 2 + rLength)), derEncodedBytes.subarray((offset + 2 + rLength + 2 + sLength) - j, (offset + 2 + rLength + 2 + sLength))]).toString('base64');
};

module.exports = __webpack_exports__;
/******/ })()
;