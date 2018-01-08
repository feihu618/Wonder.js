// Generated by BUCKLESCRIPT VERSION 2.1.0, PLEASE EDIT WITH CARE
'use strict';

import * as Contract$Wonderjs               from "../../../../definition/Contract.js";
import * as SparseMapSystem$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/SparseMapSystem.js";

function getUniformSendData(shaderIndex, map) {
  return Contract$Wonderjs.ensureCheck((function () {
                return Contract$Wonderjs.test("uniform send data should exist", (function () {
                              return Contract$Wonderjs.assertExist(SparseMapSystem$WonderCommonlib.get(shaderIndex, map));
                            }));
              }), SparseMapSystem$WonderCommonlib.unsafeGet(shaderIndex, map));
}

export {
  getUniformSendData ,
  
}
/* No side effect */