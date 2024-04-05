"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/Adaptive/page",{

/***/ "(app-client)/./src/app/Adaptive/page.tsx":
/*!***********************************!*\
  !*** ./src/app/Adaptive/page.tsx ***!
  \***********************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ Mcq; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-client)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! axios */ \"(app-client)/./node_modules/axios/lib/axios.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(app-client)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _components_MCQ__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/MCQ */ \"(app-client)/./src/app/components/MCQ.tsx\");\n/* __next_internal_client_entry_do_not_use__ default auto */ \nvar _s = $RefreshSig$();\n\n\n\nfunction Mcq() {\n    _s();\n    const [paragraph, setParagraph] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(\"\");\n    const [selectedWords, setSelectedWords] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);\n    const [enableHighlight, setEnableHighlight] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);\n    let index = 0;\n    let randomID = 0;\n    const [mcqDataList, setMcqDataList] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);\n    let generatedIds = new Set();\n    function generateUniqueId() {\n        let randomId;\n        do {\n            randomId = Math.floor(Math.random() * 9999) + 1;\n        }while (generatedIds.has(randomId));\n        generatedIds.add(randomId);\n        return randomId;\n    }\n    const handleWordSelection = (word)=>{\n        if (enableHighlight && !selectedWords.includes(word)) {\n            setSelectedWords([\n                ...selectedWords,\n                word\n            ]);\n        }\n    };\n    const handleDeleteWordSelection = ()=>{\n        const updatedSelectedWords = [\n            ...selectedWords\n        ];\n        updatedSelectedWords.pop();\n        setSelectedWords(updatedSelectedWords);\n    };\n    const handleSubmit = async (e)=>{\n        e.preventDefault();\n        let sentenceWithoutMarks = paragraph;\n        selectedWords.forEach((phrase)=>{\n            const escapedPhrase = phrase.replace(/[.*+?^${}()|[\\]\\\\]/g, \"\\\\$&\");\n            const regex = new RegExp(escapedPhrase, \"g\");\n            sentenceWithoutMarks = sentenceWithoutMarks.replace(regex, \"**\".concat(phrase, \"**\"));\n        });\n        const sentenceWithMarks = sentenceWithoutMarks.split(\".\").filter((sentence)=>sentence.includes(\"**\"));\n        try {\n            const newMcqDataList = [];\n            let random_ID = generateUniqueId();\n            randomID = random_ID;\n            for (const sentence of sentenceWithMarks){\n                const serverUrl = \"http://127.0.0.1:5000\";\n                const response = await fetch(\"\".concat(serverUrl, \"/api/generate_mcq\"), {\n                    method: \"POST\",\n                    headers: {\n                        \"content-type\": \"application/json\"\n                    },\n                    body: JSON.stringify({\n                        sentence\n                    })\n                });\n                if (!response.ok) {\n                    throw new Error(\"Failed to generate MCQ\");\n                }\n                const data = await response.json();\n                newMcqDataList.push(data);\n                try {\n                    const response = await axios__WEBPACK_IMPORTED_MODULE_3__[\"default\"].post(\"http://localhost:3001/api/mcq\", {\n                        email: \"rabibhaque200@gmail.com\",\n                        ques_id: random_ID,\n                        question: data.question,\n                        answer: data.answer\n                    });\n                } catch (error) {\n                    console.error(\"Error adding Question:\", error);\n                }\n            }\n            setMcqDataList(newMcqDataList);\n        } catch (error) {\n            console.log(\"Error: \", error);\n        }\n    };\n    const selectOption = (index, selectedOption)=>{\n        console.log(selectedOption);\n    };\n    const savedOptions = (additionalOptions)=>{\n        console.log(additionalOptions);\n    };\n    const deleteQuestion = (index)=>{\n        const updatedMcqDataList = [\n            ...mcqDataList\n        ];\n        updatedMcqDataList.splice(index, 1);\n        setMcqDataList(updatedMcqDataList);\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: \"flex-col  gap-10 bg-gray\",\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"form\", {\n                onSubmit: handleSubmit,\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"label\", {\n                        className: \"gap-10\",\n                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"textarea\", {\n                            name: \"\",\n                            id: \"\",\n                            value: paragraph,\n                            onChange: (e)=>setParagraph(e.target.value),\n                            style: {\n                                width: \"90%\",\n                                height: \"400px\",\n                                padding: \"10px\",\n                                border: \"1px solid #ccc\",\n                                borderRadius: \"5px\",\n                                resize: \"none\",\n                                fontFamily: \"Arial, sans-serif\",\n                                fontSize: \"16px\",\n                                color: \"#000\",\n                                backgroundColor: \"#fff\",\n                                justifyContent: \"center\"\n                            },\n                            onSelect: (event)=>{\n                                const selectedText = event.target.value.substring(event.target.selectionStart, event.target.selectionEnd);\n                                handleWordSelection(selectedText);\n                            }\n                        }, void 0, false, {\n                            fileName: \"D:\\\\FYDP-2\\\\MCQ_generation-Flask-Next-\\\\client\\\\src\\\\app\\\\Adaptive\\\\page.tsx\",\n                            lineNumber: 109,\n                            columnNumber: 11\n                        }, this)\n                    }, void 0, false, {\n                        fileName: \"D:\\\\FYDP-2\\\\MCQ_generation-Flask-Next-\\\\client\\\\src\\\\app\\\\Adaptive\\\\page.tsx\",\n                        lineNumber: 108,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"br\", {}, void 0, false, {\n                        fileName: \"D:\\\\FYDP-2\\\\MCQ_generation-Flask-Next-\\\\client\\\\src\\\\app\\\\Adaptive\\\\page.tsx\",\n                        lineNumber: 136,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        children: [\n                            \"Selected Highlights: \",\n                            selectedWords.join(\", \")\n                        ]\n                    }, void 0, true, {\n                        fileName: \"D:\\\\FYDP-2\\\\MCQ_generation-Flask-Next-\\\\client\\\\src\\\\app\\\\Adaptive\\\\page.tsx\",\n                        lineNumber: 137,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        className: \"flex justify-center text-center  \",\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                                type: \"button\",\n                                className: \"bg-gray-300 h-[40px] px-5 flex items-center\",\n                                onClick: ()=>{\n                                    setEnableHighlight(!enableHighlight);\n                                },\n                                children: enableHighlight ? \"Disable Highlight\" : \"Enable Highlight\"\n                            }, void 0, false, {\n                                fileName: \"D:\\\\FYDP-2\\\\MCQ_generation-Flask-Next-\\\\client\\\\src\\\\app\\\\Adaptive\\\\page.tsx\",\n                                lineNumber: 140,\n                                columnNumber: 11\n                            }, this),\n                            \" \",\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                                type: \"submit\",\n                                children: \"Generate MCQ\"\n                            }, void 0, false, {\n                                fileName: \"D:\\\\FYDP-2\\\\MCQ_generation-Flask-Next-\\\\client\\\\src\\\\app\\\\Adaptive\\\\page.tsx\",\n                                lineNumber: 149,\n                                columnNumber: 11\n                            }, this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                                type: \"button\",\n                                onClick: handleDeleteWordSelection,\n                                children: \"Delete Latest Highlight\"\n                            }, void 0, false, {\n                                fileName: \"D:\\\\FYDP-2\\\\MCQ_generation-Flask-Next-\\\\client\\\\src\\\\app\\\\Adaptive\\\\page.tsx\",\n                                lineNumber: 150,\n                                columnNumber: 11\n                            }, this)\n                        ]\n                    }, void 0, true, {\n                        fileName: \"D:\\\\FYDP-2\\\\MCQ_generation-Flask-Next-\\\\client\\\\src\\\\app\\\\Adaptive\\\\page.tsx\",\n                        lineNumber: 139,\n                        columnNumber: 9\n                    }, this)\n                ]\n            }, void 0, true, {\n                fileName: \"D:\\\\FYDP-2\\\\MCQ_generation-Flask-Next-\\\\client\\\\src\\\\app\\\\Adaptive\\\\page.tsx\",\n                lineNumber: 107,\n                columnNumber: 7\n            }, this),\n            mcqDataList.length > 0 && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"flex-col justify-center gap-10\",\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h3\", {\n                        children: \"Generated MCQ Data:\"\n                    }, void 0, false, {\n                        fileName: \"D:\\\\FYDP-2\\\\MCQ_generation-Flask-Next-\\\\client\\\\src\\\\app\\\\Adaptive\\\\page.tsx\",\n                        lineNumber: 158,\n                        columnNumber: 11\n                    }, this),\n                    mcqDataList.map((mcqData, index)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_MCQ__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {\n                            index: index,\n                            ques_id: randomID,\n                            paragraph: paragraph,\n                            question: mcqData.question,\n                            options: mcqData.distractors,\n                            answer: mcqData.answer,\n                            onDelete: ()=>deleteQuestion(index)\n                        }, index, false, {\n                            fileName: \"D:\\\\FYDP-2\\\\MCQ_generation-Flask-Next-\\\\client\\\\src\\\\app\\\\Adaptive\\\\page.tsx\",\n                            lineNumber: 160,\n                            columnNumber: 13\n                        }, this))\n                ]\n            }, void 0, true, {\n                fileName: \"D:\\\\FYDP-2\\\\MCQ_generation-Flask-Next-\\\\client\\\\src\\\\app\\\\Adaptive\\\\page.tsx\",\n                lineNumber: 157,\n                columnNumber: 9\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"flex justify-center\",\n                children: \"Confirm\"\n            }, void 0, false, {\n                fileName: \"D:\\\\FYDP-2\\\\MCQ_generation-Flask-Next-\\\\client\\\\src\\\\app\\\\Adaptive\\\\page.tsx\",\n                lineNumber: 173,\n                columnNumber: 7\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"D:\\\\FYDP-2\\\\MCQ_generation-Flask-Next-\\\\client\\\\src\\\\app\\\\Adaptive\\\\page.tsx\",\n        lineNumber: 106,\n        columnNumber: 5\n    }, this);\n}\n_s(Mcq, \"SIPrJ8GjReqtDkzpNFpkXSz5VMg=\");\n_c = Mcq;\nvar _c;\n$RefreshReg$(_c, \"Mcq\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1jbGllbnQpLy4vc3JjL2FwcC9BZGFwdGl2ZS9wYWdlLnRzeC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUMwQjtBQUNPO0FBQ0c7QUFFckIsU0FBU0csTUFBTTs7SUFDNUIsTUFBTSxDQUFDQyxXQUFXQyxhQUFhLEdBQUdKLCtDQUFRQSxDQUFDO0lBQzNDLE1BQU0sQ0FBQ0ssZUFBZUMsaUJBQWlCLEdBQUdOLCtDQUFRQSxDQUFDLEVBQUU7SUFDckQsTUFBTSxDQUFDTyxpQkFBaUJDLG1CQUFtQixHQUFHUiwrQ0FBUUEsQ0FBQyxLQUFLO0lBQzVELElBQUlTLFFBQVE7SUFDWixJQUFJQyxXQUFXO0lBQ2YsTUFBTSxDQUFDQyxhQUFhQyxlQUFlLEdBQUdaLCtDQUFRQSxDQUFDLEVBQUU7SUFFakQsSUFBSWEsZUFBZSxJQUFJQztJQUN2QixTQUFTQyxtQkFBbUI7UUFDMUIsSUFBSUM7UUFDSixHQUFHO1lBQ0RBLFdBQVdDLEtBQUtDLEtBQUssQ0FBQ0QsS0FBS0UsTUFBTSxLQUFLLFFBQVE7UUFDaEQsUUFBU04sYUFBYU8sR0FBRyxDQUFDSixXQUFXO1FBRXJDSCxhQUFhUSxHQUFHLENBQUNMO1FBQ2pCLE9BQU9BO0lBQ1Q7SUFFQSxNQUFNTSxzQkFBc0IsQ0FBQ0MsT0FBaUI7UUFDNUMsSUFBSWhCLG1CQUFtQixDQUFDRixjQUFjbUIsUUFBUSxDQUFDRCxPQUFPO1lBQ3BEakIsaUJBQWlCO21CQUFJRDtnQkFBZWtCO2FBQUs7UUFDM0MsQ0FBQztJQUNIO0lBQ0EsTUFBTUUsNEJBQTRCLElBQU07UUFDdEMsTUFBTUMsdUJBQXVCO2VBQUlyQjtTQUFjO1FBQy9DcUIscUJBQXFCQyxHQUFHO1FBQ3hCckIsaUJBQWlCb0I7SUFDbkI7SUFFQSxNQUFNRSxlQUFlLE9BQU9DLElBQVc7UUFDckNBLEVBQUVDLGNBQWM7UUFFaEIsSUFBSUMsdUJBQXVCNUI7UUFDM0JFLGNBQWMyQixPQUFPLENBQUMsQ0FBQ0MsU0FBVztZQUNoQyxNQUFNQyxnQkFBZ0JELE9BQU9FLE9BQU8sQ0FBQyx1QkFBdUI7WUFDNUQsTUFBTUMsUUFBUSxJQUFJQyxPQUFPSCxlQUFlO1lBQ3hDSCx1QkFBdUJBLHFCQUFxQkksT0FBTyxDQUNqREMsT0FDQSxLQUFZLE9BQVBILFFBQU87UUFFaEI7UUFFQSxNQUFNSyxvQkFBb0JQLHFCQUN2QlEsS0FBSyxDQUFDLEtBQ05DLE1BQU0sQ0FBQyxDQUFDQyxXQUFhQSxTQUFTakIsUUFBUSxDQUFDO1FBRTFDLElBQUk7WUFDRixNQUFNa0IsaUJBQWlCLEVBQUU7WUFDekIsSUFBSUMsWUFBWTVCO1lBQ2hCTCxXQUFXaUM7WUFDWCxLQUFLLE1BQU1GLFlBQVlILGtCQUFtQjtnQkFDeEMsTUFBTU0sWUFBWTtnQkFDbEIsTUFBTUMsV0FBVyxNQUFNQyxNQUFNLEdBQWEsT0FBVkYsV0FBVSxzQkFBb0I7b0JBQzVERyxRQUFRO29CQUNSQyxTQUFTO3dCQUNQLGdCQUFnQjtvQkFDbEI7b0JBQ0FDLE1BQU1DLEtBQUtDLFNBQVMsQ0FBQzt3QkFBRVY7b0JBQVM7Z0JBQ2xDO2dCQUVBLElBQUksQ0FBQ0ksU0FBU08sRUFBRSxFQUFFO29CQUNoQixNQUFNLElBQUlDLE1BQU0sMEJBQTBCO2dCQUM1QyxDQUFDO2dCQUVELE1BQU1DLE9BQU8sTUFBTVQsU0FBU1UsSUFBSTtnQkFDaENiLGVBQWVjLElBQUksQ0FBQ0Y7Z0JBRXBCLElBQUk7b0JBQ0YsTUFBTVQsV0FBVyxNQUFNOUMsa0RBQVUsQ0FBQyxpQ0FBaUM7d0JBQ2pFMkQsT0FBTzt3QkFDUEMsU0FBU2hCO3dCQUNUaUIsVUFBVU4sS0FBS00sUUFBUTt3QkFDdkJDLFFBQVFQLEtBQUtPLE1BQU07b0JBQ3JCO2dCQUNGLEVBQUUsT0FBT0MsT0FBTztvQkFDZEMsUUFBUUQsS0FBSyxDQUFDLDBCQUEwQkE7Z0JBQzFDO1lBQ0Y7WUFFQWxELGVBQWU4QjtRQUNqQixFQUFFLE9BQU9vQixPQUFPO1lBQ2RDLFFBQVFDLEdBQUcsQ0FBQyxXQUFXRjtRQUN6QjtJQUNGO0lBRUEsTUFBTUcsZUFBZSxDQUFDeEQsT0FBZXlELGlCQUEyQjtRQUM5REgsUUFBUUMsR0FBRyxDQUFDRTtJQUNkO0lBQ0EsTUFBTUMsZUFBZSxDQUFDQyxvQkFBdUM7UUFDM0RMLFFBQVFDLEdBQUcsQ0FBQ0k7SUFDZDtJQUVBLE1BQU1DLGlCQUFpQixDQUFDNUQsUUFBa0I7UUFDeEMsTUFBTTZELHFCQUFxQjtlQUFJM0Q7U0FBWTtRQUMzQzJELG1CQUFtQkMsTUFBTSxDQUFDOUQsT0FBTztRQUNqQ0csZUFBZTBEO0lBQ2pCO0lBRUEscUJBQ0UsOERBQUNFO1FBQUlDLFdBQVU7OzBCQUNiLDhEQUFDQztnQkFBS0MsVUFBVS9DOztrQ0FDZCw4REFBQ2dEO3dCQUFNSCxXQUFVO2tDQUNmLDRFQUFDSTs0QkFDQ0MsTUFBSzs0QkFDTEMsSUFBRzs0QkFDSEMsT0FBTzdFOzRCQUNQOEUsVUFBVSxDQUFDcEQsSUFBTXpCLGFBQWF5QixFQUFFcUQsTUFBTSxDQUFDRixLQUFLOzRCQUM1Q0csT0FBTztnQ0FDTEMsT0FBTztnQ0FDUEMsUUFBUTtnQ0FDUkMsU0FBUztnQ0FDVEMsUUFBUTtnQ0FDUkMsY0FBYztnQ0FDZEMsUUFBUTtnQ0FDUkMsWUFBWTtnQ0FDWkMsVUFBVTtnQ0FDVkMsT0FBTztnQ0FDUEMsaUJBQWlCO2dDQUNqQkMsZ0JBQWdCOzRCQUNsQjs0QkFDQUMsVUFBVSxDQUFDQyxRQUFVO2dDQUNuQixNQUFNQyxlQUFlRCxNQUFNZCxNQUFNLENBQUNGLEtBQUssQ0FBQ2tCLFNBQVMsQ0FDL0NGLE1BQU1kLE1BQU0sQ0FBQ2lCLGNBQWMsRUFDM0JILE1BQU1kLE1BQU0sQ0FBQ2tCLFlBQVk7Z0NBRTNCOUUsb0JBQW9CMkU7NEJBQ3RCOzs7Ozs7Ozs7OztrQ0FHSiw4REFBQ0k7Ozs7O2tDQUNELDhEQUFDN0I7OzRCQUFJOzRCQUFzQm5FLGNBQWNpRyxJQUFJLENBQUM7Ozs7Ozs7a0NBRTlDLDhEQUFDOUI7d0JBQUlDLFdBQVU7OzBDQUNiLDhEQUFDOEI7Z0NBQ0NDLE1BQUs7Z0NBQ0wvQixXQUFVO2dDQUNWZ0MsU0FBUyxJQUFNO29DQUNiakcsbUJBQW1CLENBQUNEO2dDQUN0QjswQ0FFQ0Esa0JBQWtCLHNCQUFzQixrQkFBa0I7Ozs7Ozs0QkFDbkQ7MENBQ1YsOERBQUNnRztnQ0FBT0MsTUFBSzswQ0FBUzs7Ozs7OzBDQUN0Qiw4REFBQ0Q7Z0NBQU9DLE1BQUs7Z0NBQVNDLFNBQVNoRjswQ0FBMkI7Ozs7Ozs7Ozs7Ozs7Ozs7OztZQU03RGQsWUFBWStGLE1BQU0sR0FBRyxtQkFDcEIsOERBQUNsQztnQkFBSUMsV0FBVTs7a0NBQ2IsOERBQUNrQztrQ0FBRzs7Ozs7O29CQUNIaEcsWUFBWWlHLEdBQUcsQ0FBQyxDQUFDQyxTQUFTcEcsc0JBQ3pCLDhEQUFDUix1REFBR0E7NEJBRUZRLE9BQU9BOzRCQUNQa0QsU0FBU2pEOzRCQUNUUCxXQUFXQTs0QkFDWHlELFVBQVVpRCxRQUFRakQsUUFBUTs0QkFDMUJrRCxTQUFTRCxRQUFRRSxXQUFXOzRCQUM1QmxELFFBQVFnRCxRQUFRaEQsTUFBTTs0QkFDdEJtRCxVQUFVLElBQU0zQyxlQUFlNUQ7MkJBUDFCQTs7Ozs7Ozs7Ozs7MEJBWWIsOERBQUMrRDtnQkFBSUMsV0FBVTswQkFBc0I7Ozs7Ozs7Ozs7OztBQUczQyxDQUFDO0dBMUt1QnZFO0tBQUFBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL3NyYy9hcHAvQWRhcHRpdmUvcGFnZS50c3g/MDBiNyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBjbGllbnRcIjtcclxuaW1wb3J0IGF4aW9zIGZyb20gXCJheGlvc1wiO1xyXG5pbXBvcnQgeyB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgTUNRIGZyb20gXCIuLi9jb21wb25lbnRzL01DUVwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gTWNxKCkge1xyXG4gIGNvbnN0IFtwYXJhZ3JhcGgsIHNldFBhcmFncmFwaF0gPSB1c2VTdGF0ZShcIlwiKTtcclxuICBjb25zdCBbc2VsZWN0ZWRXb3Jkcywgc2V0U2VsZWN0ZWRXb3Jkc10gPSB1c2VTdGF0ZShbXSk7XHJcbiAgY29uc3QgW2VuYWJsZUhpZ2hsaWdodCwgc2V0RW5hYmxlSGlnaGxpZ2h0XSA9IHVzZVN0YXRlKGZhbHNlKTtcclxuICBsZXQgaW5kZXggPSAwO1xyXG4gIGxldCByYW5kb21JRCA9IDA7XHJcbiAgY29uc3QgW21jcURhdGFMaXN0LCBzZXRNY3FEYXRhTGlzdF0gPSB1c2VTdGF0ZShbXSk7XHJcblxyXG4gIGxldCBnZW5lcmF0ZWRJZHMgPSBuZXcgU2V0KCk7XHJcbiAgZnVuY3Rpb24gZ2VuZXJhdGVVbmlxdWVJZCgpIHtcclxuICAgIGxldCByYW5kb21JZDtcclxuICAgIGRvIHtcclxuICAgICAgcmFuZG9tSWQgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiA5OTk5KSArIDE7XHJcbiAgICB9IHdoaWxlIChnZW5lcmF0ZWRJZHMuaGFzKHJhbmRvbUlkKSk7XHJcblxyXG4gICAgZ2VuZXJhdGVkSWRzLmFkZChyYW5kb21JZCk7XHJcbiAgICByZXR1cm4gcmFuZG9tSWQ7XHJcbiAgfVxyXG5cclxuICBjb25zdCBoYW5kbGVXb3JkU2VsZWN0aW9uID0gKHdvcmQ6IHN0cmluZykgPT4ge1xyXG4gICAgaWYgKGVuYWJsZUhpZ2hsaWdodCAmJiAhc2VsZWN0ZWRXb3Jkcy5pbmNsdWRlcyh3b3JkKSkge1xyXG4gICAgICBzZXRTZWxlY3RlZFdvcmRzKFsuLi5zZWxlY3RlZFdvcmRzLCB3b3JkXSk7XHJcbiAgICB9XHJcbiAgfTtcclxuICBjb25zdCBoYW5kbGVEZWxldGVXb3JkU2VsZWN0aW9uID0gKCkgPT4ge1xyXG4gICAgY29uc3QgdXBkYXRlZFNlbGVjdGVkV29yZHMgPSBbLi4uc2VsZWN0ZWRXb3Jkc107XHJcbiAgICB1cGRhdGVkU2VsZWN0ZWRXb3Jkcy5wb3AoKTtcclxuICAgIHNldFNlbGVjdGVkV29yZHModXBkYXRlZFNlbGVjdGVkV29yZHMpO1xyXG4gIH07XHJcblxyXG4gIGNvbnN0IGhhbmRsZVN1Ym1pdCA9IGFzeW5jIChlOiBhbnkpID0+IHtcclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICBsZXQgc2VudGVuY2VXaXRob3V0TWFya3MgPSBwYXJhZ3JhcGg7XHJcbiAgICBzZWxlY3RlZFdvcmRzLmZvckVhY2goKHBocmFzZSkgPT4ge1xyXG4gICAgICBjb25zdCBlc2NhcGVkUGhyYXNlID0gcGhyYXNlLnJlcGxhY2UoL1suKis/XiR7fSgpfFtcXF1cXFxcXS9nLCBcIlxcXFwkJlwiKTtcclxuICAgICAgY29uc3QgcmVnZXggPSBuZXcgUmVnRXhwKGVzY2FwZWRQaHJhc2UsIFwiZ1wiKTtcclxuICAgICAgc2VudGVuY2VXaXRob3V0TWFya3MgPSBzZW50ZW5jZVdpdGhvdXRNYXJrcy5yZXBsYWNlKFxyXG4gICAgICAgIHJlZ2V4LFxyXG4gICAgICAgIGAqKiR7cGhyYXNlfSoqYFxyXG4gICAgICApO1xyXG4gICAgfSk7XHJcblxyXG4gICAgY29uc3Qgc2VudGVuY2VXaXRoTWFya3MgPSBzZW50ZW5jZVdpdGhvdXRNYXJrc1xyXG4gICAgICAuc3BsaXQoXCIuXCIpXHJcbiAgICAgIC5maWx0ZXIoKHNlbnRlbmNlKSA9PiBzZW50ZW5jZS5pbmNsdWRlcyhcIioqXCIpKTtcclxuXHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCBuZXdNY3FEYXRhTGlzdCA9IFtdO1xyXG4gICAgICBsZXQgcmFuZG9tX0lEID0gZ2VuZXJhdGVVbmlxdWVJZCgpO1xyXG4gICAgICByYW5kb21JRCA9IHJhbmRvbV9JRDtcclxuICAgICAgZm9yIChjb25zdCBzZW50ZW5jZSBvZiBzZW50ZW5jZVdpdGhNYXJrcykge1xyXG4gICAgICAgIGNvbnN0IHNlcnZlclVybCA9IFwiaHR0cDovLzEyNy4wLjAuMTo1MDAwXCI7XHJcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChgJHtzZXJ2ZXJVcmx9L2FwaS9nZW5lcmF0ZV9tY3FgLCB7XHJcbiAgICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICBcImNvbnRlbnQtdHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIixcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7IHNlbnRlbmNlIH0pLFxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpZiAoIXJlc3BvbnNlLm9rKSB7XHJcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJGYWlsZWQgdG8gZ2VuZXJhdGUgTUNRXCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcclxuICAgICAgICBuZXdNY3FEYXRhTGlzdC5wdXNoKGRhdGEpO1xyXG5cclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBheGlvcy5wb3N0KFwiaHR0cDovL2xvY2FsaG9zdDozMDAxL2FwaS9tY3FcIiwge1xyXG4gICAgICAgICAgICBlbWFpbDogXCJyYWJpYmhhcXVlMjAwQGdtYWlsLmNvbVwiLFxyXG4gICAgICAgICAgICBxdWVzX2lkOiByYW5kb21fSUQsXHJcbiAgICAgICAgICAgIHF1ZXN0aW9uOiBkYXRhLnF1ZXN0aW9uLFxyXG4gICAgICAgICAgICBhbnN3ZXI6IGRhdGEuYW5zd2VyLFxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciBhZGRpbmcgUXVlc3Rpb246XCIsIGVycm9yKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHNldE1jcURhdGFMaXN0KG5ld01jcURhdGFMaXN0KTtcclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3I6IFwiLCBlcnJvcik7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgY29uc3Qgc2VsZWN0T3B0aW9uID0gKGluZGV4OiBudW1iZXIsIHNlbGVjdGVkT3B0aW9uOiBzdHJpbmcpID0+IHtcclxuICAgIGNvbnNvbGUubG9nKHNlbGVjdGVkT3B0aW9uKTtcclxuICB9O1xyXG4gIGNvbnN0IHNhdmVkT3B0aW9ucyA9IChhZGRpdGlvbmFsT3B0aW9uczogc3RyaW5nW10gfCBudWxsKSA9PiB7XHJcbiAgICBjb25zb2xlLmxvZyhhZGRpdGlvbmFsT3B0aW9ucyk7XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgZGVsZXRlUXVlc3Rpb24gPSAoaW5kZXg6IG51bWJlcikgPT4ge1xyXG4gICAgY29uc3QgdXBkYXRlZE1jcURhdGFMaXN0ID0gWy4uLm1jcURhdGFMaXN0XTtcclxuICAgIHVwZGF0ZWRNY3FEYXRhTGlzdC5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgc2V0TWNxRGF0YUxpc3QodXBkYXRlZE1jcURhdGFMaXN0KTtcclxuICB9O1xyXG5cclxuICByZXR1cm4gKFxyXG4gICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4LWNvbCAgZ2FwLTEwIGJnLWdyYXlcIj5cclxuICAgICAgPGZvcm0gb25TdWJtaXQ9e2hhbmRsZVN1Ym1pdH0+XHJcbiAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImdhcC0xMFwiPlxyXG4gICAgICAgICAgPHRleHRhcmVhXHJcbiAgICAgICAgICAgIG5hbWU9XCJcIlxyXG4gICAgICAgICAgICBpZD1cIlwiXHJcbiAgICAgICAgICAgIHZhbHVlPXtwYXJhZ3JhcGh9XHJcbiAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gc2V0UGFyYWdyYXBoKGUudGFyZ2V0LnZhbHVlKX1cclxuICAgICAgICAgICAgc3R5bGU9e3tcclxuICAgICAgICAgICAgICB3aWR0aDogXCI5MCVcIixcclxuICAgICAgICAgICAgICBoZWlnaHQ6IFwiNDAwcHhcIixcclxuICAgICAgICAgICAgICBwYWRkaW5nOiBcIjEwcHhcIixcclxuICAgICAgICAgICAgICBib3JkZXI6IFwiMXB4IHNvbGlkICNjY2NcIixcclxuICAgICAgICAgICAgICBib3JkZXJSYWRpdXM6IFwiNXB4XCIsXHJcbiAgICAgICAgICAgICAgcmVzaXplOiBcIm5vbmVcIixcclxuICAgICAgICAgICAgICBmb250RmFtaWx5OiBcIkFyaWFsLCBzYW5zLXNlcmlmXCIsXHJcbiAgICAgICAgICAgICAgZm9udFNpemU6IFwiMTZweFwiLFxyXG4gICAgICAgICAgICAgIGNvbG9yOiBcIiMwMDBcIixcclxuICAgICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IFwiI2ZmZlwiLFxyXG4gICAgICAgICAgICAgIGp1c3RpZnlDb250ZW50OiBcImNlbnRlclwiLFxyXG4gICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICBvblNlbGVjdD17KGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgICAgY29uc3Qgc2VsZWN0ZWRUZXh0ID0gZXZlbnQudGFyZ2V0LnZhbHVlLnN1YnN0cmluZyhcclxuICAgICAgICAgICAgICAgIGV2ZW50LnRhcmdldC5zZWxlY3Rpb25TdGFydCxcclxuICAgICAgICAgICAgICAgIGV2ZW50LnRhcmdldC5zZWxlY3Rpb25FbmRcclxuICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgIGhhbmRsZVdvcmRTZWxlY3Rpb24oc2VsZWN0ZWRUZXh0KTtcclxuICAgICAgICAgICAgfX1cclxuICAgICAgICAgIC8+XHJcbiAgICAgICAgPC9sYWJlbD5cclxuICAgICAgICA8YnIgLz5cclxuICAgICAgICA8ZGl2PlNlbGVjdGVkIEhpZ2hsaWdodHM6IHtzZWxlY3RlZFdvcmRzLmpvaW4oXCIsIFwiKX08L2Rpdj5cclxuXHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGp1c3RpZnktY2VudGVyIHRleHQtY2VudGVyICBcIj5cclxuICAgICAgICAgIDxidXR0b25cclxuICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXHJcbiAgICAgICAgICAgIGNsYXNzTmFtZT1cImJnLWdyYXktMzAwIGgtWzQwcHhdIHB4LTUgZmxleCBpdGVtcy1jZW50ZXJcIlxyXG4gICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XHJcbiAgICAgICAgICAgICAgc2V0RW5hYmxlSGlnaGxpZ2h0KCFlbmFibGVIaWdobGlnaHQpO1xyXG4gICAgICAgICAgICB9fVxyXG4gICAgICAgICAgPlxyXG4gICAgICAgICAgICB7ZW5hYmxlSGlnaGxpZ2h0ID8gXCJEaXNhYmxlIEhpZ2hsaWdodFwiIDogXCJFbmFibGUgSGlnaGxpZ2h0XCJ9XHJcbiAgICAgICAgICA8L2J1dHRvbj57XCIgXCJ9XHJcbiAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJzdWJtaXRcIj5HZW5lcmF0ZSBNQ1E8L2J1dHRvbj5cclxuICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIG9uQ2xpY2s9e2hhbmRsZURlbGV0ZVdvcmRTZWxlY3Rpb259PlxyXG4gICAgICAgICAgICBEZWxldGUgTGF0ZXN0IEhpZ2hsaWdodFxyXG4gICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZm9ybT5cclxuXHJcbiAgICAgIHttY3FEYXRhTGlzdC5sZW5ndGggPiAwICYmIChcclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXgtY29sIGp1c3RpZnktY2VudGVyIGdhcC0xMFwiPlxyXG4gICAgICAgICAgPGgzPkdlbmVyYXRlZCBNQ1EgRGF0YTo8L2gzPlxyXG4gICAgICAgICAge21jcURhdGFMaXN0Lm1hcCgobWNxRGF0YSwgaW5kZXgpID0+IChcclxuICAgICAgICAgICAgPE1DUVxyXG4gICAgICAgICAgICAgIGtleT17aW5kZXh9XHJcbiAgICAgICAgICAgICAgaW5kZXg9e2luZGV4fVxyXG4gICAgICAgICAgICAgIHF1ZXNfaWQ9e3JhbmRvbUlEfVxyXG4gICAgICAgICAgICAgIHBhcmFncmFwaD17cGFyYWdyYXBofVxyXG4gICAgICAgICAgICAgIHF1ZXN0aW9uPXttY3FEYXRhLnF1ZXN0aW9ufVxyXG4gICAgICAgICAgICAgIG9wdGlvbnM9e21jcURhdGEuZGlzdHJhY3RvcnN9XHJcbiAgICAgICAgICAgICAgYW5zd2VyPXttY3FEYXRhLmFuc3dlcn1cclxuICAgICAgICAgICAgICBvbkRlbGV0ZT17KCkgPT4gZGVsZXRlUXVlc3Rpb24oaW5kZXgpfVxyXG4gICAgICAgICAgICAvPlxyXG4gICAgICAgICAgKSl9XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICl9XHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBqdXN0aWZ5LWNlbnRlclwiPkNvbmZpcm08L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gICk7XHJcbn1cclxuIl0sIm5hbWVzIjpbImF4aW9zIiwidXNlU3RhdGUiLCJNQ1EiLCJNY3EiLCJwYXJhZ3JhcGgiLCJzZXRQYXJhZ3JhcGgiLCJzZWxlY3RlZFdvcmRzIiwic2V0U2VsZWN0ZWRXb3JkcyIsImVuYWJsZUhpZ2hsaWdodCIsInNldEVuYWJsZUhpZ2hsaWdodCIsImluZGV4IiwicmFuZG9tSUQiLCJtY3FEYXRhTGlzdCIsInNldE1jcURhdGFMaXN0IiwiZ2VuZXJhdGVkSWRzIiwiU2V0IiwiZ2VuZXJhdGVVbmlxdWVJZCIsInJhbmRvbUlkIiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwiaGFzIiwiYWRkIiwiaGFuZGxlV29yZFNlbGVjdGlvbiIsIndvcmQiLCJpbmNsdWRlcyIsImhhbmRsZURlbGV0ZVdvcmRTZWxlY3Rpb24iLCJ1cGRhdGVkU2VsZWN0ZWRXb3JkcyIsInBvcCIsImhhbmRsZVN1Ym1pdCIsImUiLCJwcmV2ZW50RGVmYXVsdCIsInNlbnRlbmNlV2l0aG91dE1hcmtzIiwiZm9yRWFjaCIsInBocmFzZSIsImVzY2FwZWRQaHJhc2UiLCJyZXBsYWNlIiwicmVnZXgiLCJSZWdFeHAiLCJzZW50ZW5jZVdpdGhNYXJrcyIsInNwbGl0IiwiZmlsdGVyIiwic2VudGVuY2UiLCJuZXdNY3FEYXRhTGlzdCIsInJhbmRvbV9JRCIsInNlcnZlclVybCIsInJlc3BvbnNlIiwiZmV0Y2giLCJtZXRob2QiLCJoZWFkZXJzIiwiYm9keSIsIkpTT04iLCJzdHJpbmdpZnkiLCJvayIsIkVycm9yIiwiZGF0YSIsImpzb24iLCJwdXNoIiwicG9zdCIsImVtYWlsIiwicXVlc19pZCIsInF1ZXN0aW9uIiwiYW5zd2VyIiwiZXJyb3IiLCJjb25zb2xlIiwibG9nIiwic2VsZWN0T3B0aW9uIiwic2VsZWN0ZWRPcHRpb24iLCJzYXZlZE9wdGlvbnMiLCJhZGRpdGlvbmFsT3B0aW9ucyIsImRlbGV0ZVF1ZXN0aW9uIiwidXBkYXRlZE1jcURhdGFMaXN0Iiwic3BsaWNlIiwiZGl2IiwiY2xhc3NOYW1lIiwiZm9ybSIsIm9uU3VibWl0IiwibGFiZWwiLCJ0ZXh0YXJlYSIsIm5hbWUiLCJpZCIsInZhbHVlIiwib25DaGFuZ2UiLCJ0YXJnZXQiLCJzdHlsZSIsIndpZHRoIiwiaGVpZ2h0IiwicGFkZGluZyIsImJvcmRlciIsImJvcmRlclJhZGl1cyIsInJlc2l6ZSIsImZvbnRGYW1pbHkiLCJmb250U2l6ZSIsImNvbG9yIiwiYmFja2dyb3VuZENvbG9yIiwianVzdGlmeUNvbnRlbnQiLCJvblNlbGVjdCIsImV2ZW50Iiwic2VsZWN0ZWRUZXh0Iiwic3Vic3RyaW5nIiwic2VsZWN0aW9uU3RhcnQiLCJzZWxlY3Rpb25FbmQiLCJiciIsImpvaW4iLCJidXR0b24iLCJ0eXBlIiwib25DbGljayIsImxlbmd0aCIsImgzIiwibWFwIiwibWNxRGF0YSIsIm9wdGlvbnMiLCJkaXN0cmFjdG9ycyIsIm9uRGVsZXRlIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(app-client)/./src/app/Adaptive/page.tsx\n"));

/***/ })

});