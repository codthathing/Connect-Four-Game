/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/components/ButtonClass.ts":
/*!***************************************!*\
  !*** ./src/components/ButtonClass.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   ButtonClass: () => (/* binding */ ButtonClass)\n/* harmony export */ });\nconst landingButtonsDiv = document.querySelector(\"#landing-buttons-div\");\nclass ButtonClass {\n    constructor(text, backgroundStyle, image, alt, textStyle) {\n        this.text = text;\n        this.backgroundStyle = backgroundStyle;\n        this.image = image;\n        this.alt = alt;\n        this.textStyle = textStyle;\n    }\n    ;\n    render() {\n        const div = document.createElement(\"div\");\n        div.setAttribute(\"class\", \"landing-buttons\");\n        div.style.backgroundColor = this.backgroundStyle;\n        const span = document.createElement(\"span\");\n        span.setAttribute(\"class\", \"landing-buttons-text\");\n        span.textContent = this.text;\n        if (this.textStyle)\n            span.style.color = this.textStyle;\n        div.append(span);\n        if (this.image && this.alt) {\n            const image = document.createElement(\"img\");\n            image.setAttribute(\"src\", this.image);\n            image.setAttribute(\"class\", \"landing-buttons-image\");\n            image.setAttribute(\"alt\", this.alt);\n            div.append(image);\n        }\n        landingButtonsDiv.append(div);\n    }\n}\n\n\n//# sourceURL=webpack://connect-four-game/./src/components/ButtonClass.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _components_ButtonClass__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/ButtonClass */ \"./src/components/ButtonClass.ts\");\n\nconst buttonsDetails = [\n    { text: \"player vs cpu\", backgroundStyle: \"#FF5A84\", image: \"./assets/player-vs-cpu.svg\", alt: \"Player CPU\", textStyle: \"#FFFFFF\" },\n    { text: \"player vs player\", backgroundStyle: \"#FFD35A\", image: \"./assets/player-vs-player.svg\", alt: \"Player Player\" },\n    { text: \"game rules\", backgroundStyle: \"#FFFFFF\" },\n];\nbuttonsDetails.forEach((button) => {\n    const buttonElement = new _components_ButtonClass__WEBPACK_IMPORTED_MODULE_0__.ButtonClass(button.text, button.backgroundStyle, button.image, button.alt, button.textStyle);\n    buttonElement.render();\n});\n\n\n//# sourceURL=webpack://connect-four-game/./src/index.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ })()
;