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

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ Mcq; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-client)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! axios */ \"(app-client)/./node_modules/axios/lib/axios.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(app-client)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _components_MCQ__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/MCQ */ \"(app-client)/./src/app/components/MCQ.tsx\");\n/* __next_internal_client_entry_do_not_use__ default auto */ \nvar _s = $RefreshSig$();\n\n\n\nfunction Mcq() {\n    _s();\n    const [paragraph, setParagraph] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(\"\");\n    const [selectedWords, setSelectedWords] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);\n    const [enableHighlight, setEnableHighlight] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);\n    const [randomIDs, setRandomIDs] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);\n    const [mcqDataList, setMcqDataList] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);\n    // let generatedIds = new Set();\n    // function generateUniqueId() {\n    //   let randomId;\n    //   do {\n    //     randomId = Math.floor(Math.random() * 9999) + 1;\n    //   } while (generatedIds.has(randomId));\n    //   generatedIds.add(randomId);\n    //   return randomId;\n    // }\n    const handleWordSelection = (word)=>{\n        if (enableHighlight && !selectedWords.includes(word)) {\n            setSelectedWords([\n                ...selectedWords,\n                word\n            ]);\n        }\n    };\n    const handleDeleteWordSelection = ()=>{\n        const updatedSelectedWords = [\n            ...selectedWords\n        ];\n        updatedSelectedWords.pop();\n        setSelectedWords(updatedSelectedWords);\n    };\n    const handleSubmit = async (e)=>{\n        try {\n            e.preventDefault();\n            let sentenceWithoutMarks = paragraph;\n            selectedWords.forEach((phrase)=>{\n                const escapedPhrase = phrase === null || phrase === void 0 ? void 0 : phrase.replace(/[.*+?^${}()|[\\]\\\\]/g, \"\\\\$&\");\n                const regex = new RegExp(escapedPhrase, \"g\");\n                sentenceWithoutMarks = sentenceWithoutMarks.replace(regex, \"**\".concat(phrase, \"**\"));\n            });\n            const sentenceWithMarks = sentenceWithoutMarks.split(\".\").filter((sentence)=>sentence.includes(\"**\"));\n            // sentenceWithMarks.forEach((element) => {\n            //   const ids = randomIDs;\n            //   ids.push(generateUniqueId());\n            //   setRandomIDs(ids);\n            // });\n            const mcqRequests = sentenceWithMarks.map(async (sentence, i)=>{\n                const serverUrl = \"http://127.0.0.1:5000\";\n                const mcqResponse = await axios__WEBPACK_IMPORTED_MODULE_3__[\"default\"].post(\"\".concat(serverUrl, \"/api/generate_mcq\"), {\n                    sentence\n                });\n                if (mcqResponse.status !== 200) {\n                    throw new Error(\"Failed to generate MCQ\");\n                }\n                const data = mcqResponse.data;\n                // const random_ID = randomIDs[i];\n                try {\n                    await axios__WEBPACK_IMPORTED_MODULE_3__[\"default\"].post(\"http://localhost:3001/api/mcq\", {\n                        email: \"rabibhaque200@gmail.com\",\n                        ques_id: data.random_id,\n                        question: data.question,\n                        answer: data.answer\n                    });\n                } catch (error) {\n                    console.error(\"Error adding Question:\", error);\n                    throw new Error(\"Failed to add question\");\n                }\n                return data;\n            });\n            const newMcqDataList = await Promise.all(mcqRequests);\n            setMcqDataList([\n                ...mcqDataList,\n                ...newMcqDataList\n            ]);\n            const optionsPromises = newMcqDataList.map(async (data, i)=>{\n                try {\n                    await axios__WEBPACK_IMPORTED_MODULE_3__[\"default\"].post(\"http://localhost:3001/api/options\", {\n                        options: [\n                            data.answer\n                        ],\n                        ques_id: data.random_id\n                    });\n                } catch (error) {\n                    console.error(\"Error adding Answer in Options Table\", error);\n                }\n            });\n            await Promise.all(optionsPromises);\n        } catch (error) {\n            console.error(\"Error in handleSubmit:\", error);\n        }\n    };\n    // const selectOption = (index: number, selectedOption: string) => {\n    //   console.log(selectedOption);\n    // };\n    // const savedOptions = (additionalOptions: string[] | null) => {\n    //   console.log(additionalOptions);\n    // };\n    const deleteQuestion = async (index, ques_id)=>{\n        const updatedMcqDataList = [\n            ...mcqDataList\n        ];\n        updatedMcqDataList.splice(index, 1);\n        setMcqDataList(updatedMcqDataList);\n        try {\n            await axios__WEBPACK_IMPORTED_MODULE_3__[\"default\"][\"delete\"](\"http://localhost:3001/api/mcq/\".concat(ques_id));\n            console.log(\"Deleted Successfully\");\n        } catch (error) {\n            console.log(\"Error in deleteQuestion: \", error);\n        }\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: \"flex-col  gap-10 bg-gray\",\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"form\", {\n                onSubmit: handleSubmit,\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"label\", {\n                        className: \"gap-10\",\n                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"textarea\", {\n                            name: \"\",\n                            id: \"\",\n                            value: paragraph,\n                            onChange: (e)=>setParagraph(e.target.value),\n                            style: {\n                                width: \"90%\",\n                                height: \"400px\",\n                                padding: \"10px\",\n                                border: \"1px solid #ccc\",\n                                borderRadius: \"5px\",\n                                resize: \"none\",\n                                fontFamily: \"Arial, sans-serif\",\n                                fontSize: \"16px\",\n                                color: \"#000\",\n                                backgroundColor: \"#fff\",\n                                justifyContent: \"center\"\n                            },\n                            onSelect: (event)=>{\n                                const selectedText = event.target.value.substring(event.target.selectionStart, event.target.selectionEnd);\n                                handleWordSelection(selectedText);\n                            }\n                        }, void 0, false, {\n                            fileName: \"D:\\\\FYDP-2\\\\MCQ_generation-Flask-Next-\\\\client\\\\src\\\\app\\\\Adaptive\\\\page.tsx\",\n                            lineNumber: 133,\n                            columnNumber: 11\n                        }, this)\n                    }, void 0, false, {\n                        fileName: \"D:\\\\FYDP-2\\\\MCQ_generation-Flask-Next-\\\\client\\\\src\\\\app\\\\Adaptive\\\\page.tsx\",\n                        lineNumber: 132,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"br\", {}, void 0, false, {\n                        fileName: \"D:\\\\FYDP-2\\\\MCQ_generation-Flask-Next-\\\\client\\\\src\\\\app\\\\Adaptive\\\\page.tsx\",\n                        lineNumber: 160,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        children: [\n                            \"Selected Highlights: \",\n                            selectedWords.join(\", \")\n                        ]\n                    }, void 0, true, {\n                        fileName: \"D:\\\\FYDP-2\\\\MCQ_generation-Flask-Next-\\\\client\\\\src\\\\app\\\\Adaptive\\\\page.tsx\",\n                        lineNumber: 161,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        className: \"flex justify-center text-center  \",\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                                type: \"button\",\n                                className: \"bg-gray-300 h-[40px] px-5 flex items-center\",\n                                onClick: ()=>{\n                                    setEnableHighlight(!enableHighlight);\n                                },\n                                children: enableHighlight ? \"Disable Highlight\" : \"Enable Highlight\"\n                            }, void 0, false, {\n                                fileName: \"D:\\\\FYDP-2\\\\MCQ_generation-Flask-Next-\\\\client\\\\src\\\\app\\\\Adaptive\\\\page.tsx\",\n                                lineNumber: 164,\n                                columnNumber: 11\n                            }, this),\n                            \" \",\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                                type: \"submit\",\n                                children: \"Generate MCQ\"\n                            }, void 0, false, {\n                                fileName: \"D:\\\\FYDP-2\\\\MCQ_generation-Flask-Next-\\\\client\\\\src\\\\app\\\\Adaptive\\\\page.tsx\",\n                                lineNumber: 173,\n                                columnNumber: 11\n                            }, this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                                type: \"button\",\n                                onClick: handleDeleteWordSelection,\n                                children: \"Delete Latest Highlight\"\n                            }, void 0, false, {\n                                fileName: \"D:\\\\FYDP-2\\\\MCQ_generation-Flask-Next-\\\\client\\\\src\\\\app\\\\Adaptive\\\\page.tsx\",\n                                lineNumber: 174,\n                                columnNumber: 11\n                            }, this)\n                        ]\n                    }, void 0, true, {\n                        fileName: \"D:\\\\FYDP-2\\\\MCQ_generation-Flask-Next-\\\\client\\\\src\\\\app\\\\Adaptive\\\\page.tsx\",\n                        lineNumber: 163,\n                        columnNumber: 9\n                    }, this)\n                ]\n            }, void 0, true, {\n                fileName: \"D:\\\\FYDP-2\\\\MCQ_generation-Flask-Next-\\\\client\\\\src\\\\app\\\\Adaptive\\\\page.tsx\",\n                lineNumber: 131,\n                columnNumber: 7\n            }, this),\n            mcqDataList.length > 0 && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"flex-col justify-center gap-10\",\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h3\", {\n                        children: \"Generated MCQ Data:\"\n                    }, void 0, false, {\n                        fileName: \"D:\\\\FYDP-2\\\\MCQ_generation-Flask-Next-\\\\client\\\\src\\\\app\\\\Adaptive\\\\page.tsx\",\n                        lineNumber: 182,\n                        columnNumber: 11\n                    }, this),\n                    mcqDataList.map((mcqData, index)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_MCQ__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {\n                            index: index,\n                            ques_id: mcqData.random_id,\n                            paragraph: paragraph,\n                            question: mcqData.question,\n                            options: mcqData.distractors,\n                            answer: mcqData.answer,\n                            onDelete: ()=>deleteQuestion(index, mcqData.random_id)\n                        }, index, false, {\n                            fileName: \"D:\\\\FYDP-2\\\\MCQ_generation-Flask-Next-\\\\client\\\\src\\\\app\\\\Adaptive\\\\page.tsx\",\n                            lineNumber: 184,\n                            columnNumber: 13\n                        }, this))\n                ]\n            }, void 0, true, {\n                fileName: \"D:\\\\FYDP-2\\\\MCQ_generation-Flask-Next-\\\\client\\\\src\\\\app\\\\Adaptive\\\\page.tsx\",\n                lineNumber: 181,\n                columnNumber: 9\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"D:\\\\FYDP-2\\\\MCQ_generation-Flask-Next-\\\\client\\\\src\\\\app\\\\Adaptive\\\\page.tsx\",\n        lineNumber: 130,\n        columnNumber: 5\n    }, this);\n}\n_s(Mcq, \"ln5o0Yt/M2YrzqbxBCSDJsJUvbg=\");\n_c = Mcq;\nvar _c;\n$RefreshReg$(_c, \"Mcq\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1jbGllbnQpLy4vc3JjL2FwcC9BZGFwdGl2ZS9wYWdlLnRzeC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUMwQjtBQUNPO0FBQ0c7QUFFckIsU0FBU0csTUFBTTs7SUFDNUIsTUFBTSxDQUFDQyxXQUFXQyxhQUFhLEdBQUdKLCtDQUFRQSxDQUFDO0lBQzNDLE1BQU0sQ0FBQ0ssZUFBZUMsaUJBQWlCLEdBQUdOLCtDQUFRQSxDQUFDLEVBQUU7SUFDckQsTUFBTSxDQUFDTyxpQkFBaUJDLG1CQUFtQixHQUFHUiwrQ0FBUUEsQ0FBQyxLQUFLO0lBQzVELE1BQU0sQ0FBQ1MsV0FBV0MsYUFBYSxHQUFHViwrQ0FBUUEsQ0FBVyxFQUFFO0lBQ3ZELE1BQU0sQ0FBQ1csYUFBYUMsZUFBZSxHQUFHWiwrQ0FBUUEsQ0FBQyxFQUFFO0lBRWpELGdDQUFnQztJQUNoQyxnQ0FBZ0M7SUFDaEMsa0JBQWtCO0lBQ2xCLFNBQVM7SUFDVCx1REFBdUQ7SUFDdkQsMENBQTBDO0lBRTFDLGdDQUFnQztJQUNoQyxxQkFBcUI7SUFDckIsSUFBSTtJQUVKLE1BQU1hLHNCQUFzQixDQUFDQyxPQUFpQjtRQUM1QyxJQUFJUCxtQkFBbUIsQ0FBQ0YsY0FBY1UsUUFBUSxDQUFDRCxPQUFPO1lBQ3BEUixpQkFBaUI7bUJBQUlEO2dCQUFlUzthQUFLO1FBQzNDLENBQUM7SUFDSDtJQUNBLE1BQU1FLDRCQUE0QixJQUFNO1FBQ3RDLE1BQU1DLHVCQUF1QjtlQUFJWjtTQUFjO1FBQy9DWSxxQkFBcUJDLEdBQUc7UUFDeEJaLGlCQUFpQlc7SUFDbkI7SUFFQSxNQUFNRSxlQUFlLE9BQU9DLElBQVc7UUFDckMsSUFBSTtZQUNGQSxFQUFFQyxjQUFjO1lBRWhCLElBQUlDLHVCQUF1Qm5CO1lBQzNCRSxjQUFja0IsT0FBTyxDQUFDLENBQUNDLFNBQVc7Z0JBQ2hDLE1BQU1DLGdCQUFnQkQsbUJBQUFBLG9CQUFBQSxLQUFBQSxJQUFBQSxPQUFRRSxPQUFPLENBQUMsdUJBQXVCO2dCQUM3RCxN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Ly4vc3JjL2FwcC9BZGFwdGl2ZS9wYWdlLnRzeD8wMGI3Il0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIGNsaWVudFwiO1xyXG5pbXBvcnQgYXhpb3MgZnJvbSBcImF4aW9zXCI7XHJcbmltcG9ydCB7IHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCBNQ1EgZnJvbSBcIi4uL2NvbXBvbmVudHMvTUNRXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBNY3EoKSB7XHJcbiAgY29uc3QgW3BhcmFncmFwaCwgc2V0UGFyYWdyYXBoXSA9IHVzZVN0YXRlKFwiXCIpO1xyXG4gIGNvbnN0IFtzZWxlY3RlZFdvcmRzLCBzZXRTZWxlY3RlZFdvcmRzXSA9IHVzZVN0YXRlKFtdKTtcclxuICBjb25zdCBbZW5hYmxlSGlnaGxpZ2h0LCBzZXRFbmFibGVIaWdobGlnaHRdID0gdXNlU3RhdGUoZmFsc2UpO1xyXG4gIGNvbnN0IFtyYW5kb21JRHMsIHNldFJhbmRvbUlEc10gPSB1c2VTdGF0ZTxudW1iZXJbXT4oW10pO1xyXG4gIGNvbnN0IFttY3FEYXRhTGlzdCwgc2V0TWNxRGF0YUxpc3RdID0gdXNlU3RhdGUoW10pO1xyXG5cclxuICAvLyBsZXQgZ2VuZXJhdGVkSWRzID0gbmV3IFNldCgpO1xyXG4gIC8vIGZ1bmN0aW9uIGdlbmVyYXRlVW5pcXVlSWQoKSB7XHJcbiAgLy8gICBsZXQgcmFuZG9tSWQ7XHJcbiAgLy8gICBkbyB7XHJcbiAgLy8gICAgIHJhbmRvbUlkID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogOTk5OSkgKyAxO1xyXG4gIC8vICAgfSB3aGlsZSAoZ2VuZXJhdGVkSWRzLmhhcyhyYW5kb21JZCkpO1xyXG5cclxuICAvLyAgIGdlbmVyYXRlZElkcy5hZGQocmFuZG9tSWQpO1xyXG4gIC8vICAgcmV0dXJuIHJhbmRvbUlkO1xyXG4gIC8vIH1cclxuXHJcbiAgY29uc3QgaGFuZGxlV29yZFNlbGVjdGlvbiA9ICh3b3JkOiBzdHJpbmcpID0+IHtcclxuICAgIGlmIChlbmFibGVIaWdobGlnaHQgJiYgIXNlbGVjdGVkV29yZHMuaW5jbHVkZXMod29yZCkpIHtcclxuICAgICAgc2V0U2VsZWN0ZWRXb3JkcyhbLi4uc2VsZWN0ZWRXb3Jkcywgd29yZF0pO1xyXG4gICAgfVxyXG4gIH07XHJcbiAgY29uc3QgaGFuZGxlRGVsZXRlV29yZFNlbGVjdGlvbiA9ICgpID0+IHtcclxuICAgIGNvbnN0IHVwZGF0ZWRTZWxlY3RlZFdvcmRzID0gWy4uLnNlbGVjdGVkV29yZHNdO1xyXG4gICAgdXBkYXRlZFNlbGVjdGVkV29yZHMucG9wKCk7XHJcbiAgICBzZXRTZWxlY3RlZFdvcmRzKHVwZGF0ZWRTZWxlY3RlZFdvcmRzKTtcclxuICB9O1xyXG5cclxuICBjb25zdCBoYW5kbGVTdWJtaXQgPSBhc3luYyAoZTogYW55KSA9PiB7XHJcbiAgICB0cnkge1xyXG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICBsZXQgc2VudGVuY2VXaXRob3V0TWFya3MgPSBwYXJhZ3JhcGg7XHJcbiAgICAgIHNlbGVjdGVkV29yZHMuZm9yRWFjaCgocGhyYXNlKSA9PiB7XHJcbiAgICAgICAgY29uc3QgZXNjYXBlZFBocmFzZSA9IHBocmFzZT8ucmVwbGFjZSgvWy4qKz9eJHt9KCl8W1xcXVxcXFxdL2csIFwiXFxcXCQmXCIpO1xyXG4gICAgICAgIGNvbnN0IHJlZ2V4ID0gbmV3IFJlZ0V4cChlc2NhcGVkUGhyYXNlLCBcImdcIik7XHJcbiAgICAgICAgc2VudGVuY2VXaXRob3V0TWFya3MgPSBzZW50ZW5jZVdpdGhvdXRNYXJrcy5yZXBsYWNlKFxyXG4gICAgICAgICAgcmVnZXgsXHJcbiAgICAgICAgICBgKioke3BocmFzZX0qKmBcclxuICAgICAgICApO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIGNvbnN0IHNlbnRlbmNlV2l0aE1hcmtzID0gc2VudGVuY2VXaXRob3V0TWFya3NcclxuICAgICAgICAuc3BsaXQoXCIuXCIpXHJcbiAgICAgICAgLmZpbHRlcigoc2VudGVuY2UpID0+IHNlbnRlbmNlLmluY2x1ZGVzKFwiKipcIikpO1xyXG5cclxuICAgICAgLy8gc2VudGVuY2VXaXRoTWFya3MuZm9yRWFjaCgoZWxlbWVudCkgPT4ge1xyXG4gICAgICAvLyAgIGNvbnN0IGlkcyA9IHJhbmRvbUlEcztcclxuICAgICAgLy8gICBpZHMucHVzaChnZW5lcmF0ZVVuaXF1ZUlkKCkpO1xyXG4gICAgICAvLyAgIHNldFJhbmRvbUlEcyhpZHMpO1xyXG4gICAgICAvLyB9KTtcclxuXHJcbiAgICAgIGNvbnN0IG1jcVJlcXVlc3RzID0gc2VudGVuY2VXaXRoTWFya3MubWFwKGFzeW5jIChzZW50ZW5jZSwgaSkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHNlcnZlclVybCA9IFwiaHR0cDovLzEyNy4wLjAuMTo1MDAwXCI7XHJcbiAgICAgICAgY29uc3QgbWNxUmVzcG9uc2UgPSBhd2FpdCBheGlvcy5wb3N0KGAke3NlcnZlclVybH0vYXBpL2dlbmVyYXRlX21jcWAsIHtcclxuICAgICAgICAgIHNlbnRlbmNlLFxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpZiAobWNxUmVzcG9uc2Uuc3RhdHVzICE9PSAyMDApIHtcclxuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkZhaWxlZCB0byBnZW5lcmF0ZSBNQ1FcIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBkYXRhID0gbWNxUmVzcG9uc2UuZGF0YTtcclxuXHJcbiAgICAgICAgLy8gY29uc3QgcmFuZG9tX0lEID0gcmFuZG9tSURzW2ldO1xyXG5cclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgYXdhaXQgYXhpb3MucG9zdChcImh0dHA6Ly9sb2NhbGhvc3Q6MzAwMS9hcGkvbWNxXCIsIHtcclxuICAgICAgICAgICAgZW1haWw6IFwicmFiaWJoYXF1ZTIwMEBnbWFpbC5jb21cIixcclxuICAgICAgICAgICAgcXVlc19pZDogZGF0YS5yYW5kb21faWQsXHJcbiAgICAgICAgICAgIHF1ZXN0aW9uOiBkYXRhLnF1ZXN0aW9uLFxyXG4gICAgICAgICAgICBhbnN3ZXI6IGRhdGEuYW5zd2VyLFxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciBhZGRpbmcgUXVlc3Rpb246XCIsIGVycm9yKTtcclxuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkZhaWxlZCB0byBhZGQgcXVlc3Rpb25cIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gZGF0YTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgICBjb25zdCBuZXdNY3FEYXRhTGlzdCA9IGF3YWl0IFByb21pc2UuYWxsKG1jcVJlcXVlc3RzKTtcclxuXHJcbiAgICAgIHNldE1jcURhdGFMaXN0KFsuLi5tY3FEYXRhTGlzdCwgLi4ubmV3TWNxRGF0YUxpc3RdKTtcclxuXHJcbiAgICAgIGNvbnN0IG9wdGlvbnNQcm9taXNlcyA9IG5ld01jcURhdGFMaXN0Lm1hcChhc3luYyAoZGF0YSwgaSkgPT4ge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICBhd2FpdCBheGlvcy5wb3N0KFwiaHR0cDovL2xvY2FsaG9zdDozMDAxL2FwaS9vcHRpb25zXCIsIHtcclxuICAgICAgICAgICAgb3B0aW9uczogW2RhdGEuYW5zd2VyXSxcclxuICAgICAgICAgICAgcXVlc19pZDogZGF0YS5yYW5kb21faWQsXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgY29uc29sZS5lcnJvcihcIkVycm9yIGFkZGluZyBBbnN3ZXIgaW4gT3B0aW9ucyBUYWJsZVwiLCBlcnJvcik7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIGF3YWl0IFByb21pc2UuYWxsKG9wdGlvbnNQcm9taXNlcyk7XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgaW4gaGFuZGxlU3VibWl0OlwiLCBlcnJvcik7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgLy8gY29uc3Qgc2VsZWN0T3B0aW9uID0gKGluZGV4OiBudW1iZXIsIHNlbGVjdGVkT3B0aW9uOiBzdHJpbmcpID0+IHtcclxuICAvLyAgIGNvbnNvbGUubG9nKHNlbGVjdGVkT3B0aW9uKTtcclxuICAvLyB9O1xyXG4gIC8vIGNvbnN0IHNhdmVkT3B0aW9ucyA9IChhZGRpdGlvbmFsT3B0aW9uczogc3RyaW5nW10gfCBudWxsKSA9PiB7XHJcbiAgLy8gICBjb25zb2xlLmxvZyhhZGRpdGlvbmFsT3B0aW9ucyk7XHJcbiAgLy8gfTtcclxuXHJcbiAgY29uc3QgZGVsZXRlUXVlc3Rpb24gPSBhc3luYyAoaW5kZXg6IG51bWJlciwgcXVlc19pZDogbnVtYmVyKSA9PiB7XHJcbiAgICBjb25zdCB1cGRhdGVkTWNxRGF0YUxpc3QgPSBbLi4ubWNxRGF0YUxpc3RdO1xyXG4gICAgdXBkYXRlZE1jcURhdGFMaXN0LnNwbGljZShpbmRleCwgMSk7XHJcbiAgICBzZXRNY3FEYXRhTGlzdCh1cGRhdGVkTWNxRGF0YUxpc3QpO1xyXG5cclxuICAgIHRyeSB7XHJcbiAgICAgIGF3YWl0IGF4aW9zLmRlbGV0ZShgaHR0cDovL2xvY2FsaG9zdDozMDAxL2FwaS9tY3EvJHtxdWVzX2lkfWApO1xyXG4gICAgICBjb25zb2xlLmxvZyhcIkRlbGV0ZWQgU3VjY2Vzc2Z1bGx5XCIpO1xyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgY29uc29sZS5sb2coXCJFcnJvciBpbiBkZWxldGVRdWVzdGlvbjogXCIsIGVycm9yKTtcclxuICAgIH1cclxuICB9O1xyXG5cclxuICByZXR1cm4gKFxyXG4gICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4LWNvbCAgZ2FwLTEwIGJnLWdyYXlcIj5cclxuICAgICAgPGZvcm0gb25TdWJtaXQ9e2hhbmRsZVN1Ym1pdH0+XHJcbiAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImdhcC0xMFwiPlxyXG4gICAgICAgICAgPHRleHRhcmVhXHJcbiAgICAgICAgICAgIG5hbWU9XCJcIlxyXG4gICAgICAgICAgICBpZD1cIlwiXHJcbiAgICAgICAgICAgIHZhbHVlPXtwYXJhZ3JhcGh9XHJcbiAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gc2V0UGFyYWdyYXBoKGUudGFyZ2V0LnZhbHVlKX1cclxuICAgICAgICAgICAgc3R5bGU9e3tcclxuICAgICAgICAgICAgICB3aWR0aDogXCI5MCVcIixcclxuICAgICAgICAgICAgICBoZWlnaHQ6IFwiNDAwcHhcIixcclxuICAgICAgICAgICAgICBwYWRkaW5nOiBcIjEwcHhcIixcclxuICAgICAgICAgICAgICBib3JkZXI6IFwiMXB4IHNvbGlkICNjY2NcIixcclxuICAgICAgICAgICAgICBib3JkZXJSYWRpdXM6IFwiNXB4XCIsXHJcbiAgICAgICAgICAgICAgcmVzaXplOiBcIm5vbmVcIixcclxuICAgICAgICAgICAgICBmb250RmFtaWx5OiBcIkFyaWFsLCBzYW5zLXNlcmlmXCIsXHJcbiAgICAgICAgICAgICAgZm9udFNpemU6IFwiMTZweFwiLFxyXG4gICAgICAgICAgICAgIGNvbG9yOiBcIiMwMDBcIixcclxuICAgICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IFwiI2ZmZlwiLFxyXG4gICAgICAgICAgICAgIGp1c3RpZnlDb250ZW50OiBcImNlbnRlclwiLFxyXG4gICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICBvblNlbGVjdD17KGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgICAgY29uc3Qgc2VsZWN0ZWRUZXh0ID0gZXZlbnQudGFyZ2V0LnZhbHVlLnN1YnN0cmluZyhcclxuICAgICAgICAgICAgICAgIGV2ZW50LnRhcmdldC5zZWxlY3Rpb25TdGFydCxcclxuICAgICAgICAgICAgICAgIGV2ZW50LnRhcmdldC5zZWxlY3Rpb25FbmRcclxuICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgIGhhbmRsZVdvcmRTZWxlY3Rpb24oc2VsZWN0ZWRUZXh0KTtcclxuICAgICAgICAgICAgfX1cclxuICAgICAgICAgIC8+XHJcbiAgICAgICAgPC9sYWJlbD5cclxuICAgICAgICA8YnIgLz5cclxuICAgICAgICA8ZGl2PlNlbGVjdGVkIEhpZ2hsaWdodHM6IHtzZWxlY3RlZFdvcmRzLmpvaW4oXCIsIFwiKX08L2Rpdj5cclxuXHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGp1c3RpZnktY2VudGVyIHRleHQtY2VudGVyICBcIj5cclxuICAgICAgICAgIDxidXR0b25cclxuICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXHJcbiAgICAgICAgICAgIGNsYXNzTmFtZT1cImJnLWdyYXktMzAwIGgtWzQwcHhdIHB4LTUgZmxleCBpdGVtcy1jZW50ZXJcIlxyXG4gICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XHJcbiAgICAgICAgICAgICAgc2V0RW5hYmxlSGlnaGxpZ2h0KCFlbmFibGVIaWdobGlnaHQpO1xyXG4gICAgICAgICAgICB9fVxyXG4gICAgICAgICAgPlxyXG4gICAgICAgICAgICB7ZW5hYmxlSGlnaGxpZ2h0ID8gXCJEaXNhYmxlIEhpZ2hsaWdodFwiIDogXCJFbmFibGUgSGlnaGxpZ2h0XCJ9XHJcbiAgICAgICAgICA8L2J1dHRvbj57XCIgXCJ9XHJcbiAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJzdWJtaXRcIj5HZW5lcmF0ZSBNQ1E8L2J1dHRvbj5cclxuICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIG9uQ2xpY2s9e2hhbmRsZURlbGV0ZVdvcmRTZWxlY3Rpb259PlxyXG4gICAgICAgICAgICBEZWxldGUgTGF0ZXN0IEhpZ2hsaWdodFxyXG4gICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZm9ybT5cclxuXHJcbiAgICAgIHttY3FEYXRhTGlzdC5sZW5ndGggPiAwICYmIChcclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXgtY29sIGp1c3RpZnktY2VudGVyIGdhcC0xMFwiPlxyXG4gICAgICAgICAgPGgzPkdlbmVyYXRlZCBNQ1EgRGF0YTo8L2gzPlxyXG4gICAgICAgICAge21jcURhdGFMaXN0Lm1hcCgobWNxRGF0YSwgaW5kZXgpID0+IChcclxuICAgICAgICAgICAgPE1DUVxyXG4gICAgICAgICAgICAgIGtleT17aW5kZXh9XHJcbiAgICAgICAgICAgICAgaW5kZXg9e2luZGV4fVxyXG4gICAgICAgICAgICAgIHF1ZXNfaWQ9e21jcURhdGEucmFuZG9tX2lkfVxyXG4gICAgICAgICAgICAgIHBhcmFncmFwaD17cGFyYWdyYXBofVxyXG4gICAgICAgICAgICAgIHF1ZXN0aW9uPXttY3FEYXRhLnF1ZXN0aW9ufVxyXG4gICAgICAgICAgICAgIG9wdGlvbnM9e21jcURhdGEuZGlzdHJhY3RvcnN9XHJcbiAgICAgICAgICAgICAgYW5zd2VyPXttY3FEYXRhLmFuc3dlcn1cclxuICAgICAgICAgICAgICBvbkRlbGV0ZT17KCkgPT4gZGVsZXRlUXVlc3Rpb24oaW5kZXgsIG1jcURhdGEucmFuZG9tX2lkKX1cclxuICAgICAgICAgICAgLz5cclxuICAgICAgICAgICkpfVxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICApfVxyXG4gICAgICB7LyogPGRpdiBjbGFzc05hbWU9XCJmbGV4IGp1c3RpZnktY2VudGVyXCI+Q29uZmlybTwvZGl2PiAqL31cclxuICAgIDwvZGl2PlxyXG4gICk7XHJcbn1cclxuIl0sIm5hbWVzIjpbImF4aW9zIiwidXNlU3RhdGUiLCJNQ1EiLCJNY3EiLCJwYXJhZ3JhcGgiLCJzZXRQYXJhZ3JhcGgiLCJzZWxlY3RlZFdvcmRzIiwic2V0U2VsZWN0ZWRXb3JkcyIsImVuYWJsZUhpZ2hsaWdodCIsInNldEVuYWJsZUhpZ2hsaWdodCIsInJhbmRvbUlEcyIsInNldFJhbmRvbUlEcyIsIm1jcURhdGFMaXN0Iiwic2V0TWNxRGF0YUxpc3QiLCJoYW5kbGVXb3JkU2VsZWN0aW9uIiwid29yZCIsImluY2x1ZGVzIiwiaGFuZGxlRGVsZXRlV29yZFNlbGVjdGlvbiIsInVwZGF0ZWRTZWxlY3RlZFdvcmRzIiwicG9wIiwiaGFuZGxlU3VibWl0IiwiZSIsInByZXZlbnREZWZhdWx0Iiwic2VudGVuY2VXaXRob3V0TWFya3MiLCJmb3JFYWNoIiwicGhyYXNlIiwiZXNjYXBlZFBocmFzZSIsInJlcGxhY2UiLCJyZWdleCIsIlJlZ0V4cCIsInNlbnRlbmNlV2l0aE1hcmtzIiwic3BsaXQiLCJmaWx0ZXIiLCJzZW50ZW5jZSIsIm1jcVJlcXVlc3RzIiwibWFwIiwiaSIsInNlcnZlclVybCIsIm1jcVJlc3BvbnNlIiwicG9zdCIsInN0YXR1cyIsIkVycm9yIiwiZGF0YSIsImVtYWlsIiwicXVlc19pZCIsInJhbmRvbV9pZCIsInF1ZXN0aW9uIiwiYW5zd2VyIiwiZXJyb3IiLCJjb25zb2xlIiwibmV3TWNxRGF0YUxpc3QiLCJQcm9taXNlIiwiYWxsIiwib3B0aW9uc1Byb21pc2VzIiwib3B0aW9ucyIsImRlbGV0ZVF1ZXN0aW9uIiwiaW5kZXgiLCJ1cGRhdGVkTWNxRGF0YUxpc3QiLCJzcGxpY2UiLCJkZWxldGUiLCJsb2ciLCJkaXYiLCJjbGFzc05hbWUiLCJmb3JtIiwib25TdWJtaXQiLCJsYWJlbCIsInRleHRhcmVhIiwibmFtZSIsImlkIiwidmFsdWUiLCJvbkNoYW5nZSIsInRhcmdldCIsInN0eWxlIiwid2lkdGgiLCJoZWlnaHQiLCJwYWRkaW5nIiwiYm9yZGVyIiwiYm9yZGVyUmFkaXVzIiwicmVzaXplIiwiZm9udEZhbWlseSIsImZvbnRTaXplIiwiY29sb3IiLCJiYWNrZ3JvdW5kQ29sb3IiLCJqdXN0aWZ5Q29udGVudCIsIm9uU2VsZWN0IiwiZXZlbnQiLCJzZWxlY3RlZFRleHQiLCJzdWJzdHJpbmciLCJzZWxlY3Rpb25TdGFydCIsInNlbGVjdGlvbkVuZCIsImJyIiwiam9pbiIsImJ1dHRvbiIsInR5cGUiLCJvbkNsaWNrIiwibGVuZ3RoIiwiaDMiLCJtY3FEYXRhIiwiZGlzdHJhY3RvcnMiLCJvbkRlbGV0ZSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(app-client)/./src/app/Adaptive/page.tsx\n"));

/***/ })

});