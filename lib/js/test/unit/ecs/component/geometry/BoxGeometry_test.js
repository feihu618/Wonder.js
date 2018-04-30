// Generated by BUCKLESCRIPT VERSION 2.1.0, PLEASE EDIT WITH CARE
'use strict';

var Curry                                 = require("bs-platform/lib/js/curry.js");
var Sinon                                 = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1                               = require("sinon");
var Wonder_jest                           = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var TestTool$Wonderjs                     = require("../../../../tool/TestTool.js");
var FakeGlTool$Wonderjs                   = require("../../../../tool/gl/FakeGlTool.js");
var GameObjectAPI$Wonderjs                = require("../../../../../src/api/GameObjectAPI.js");
var MainStateTool$Wonderjs                = require("../../../../tool/service/state/MainStateTool.js");
var VboBufferTool$Wonderjs                = require("../../../../tool/service/vboBuffer/VboBufferTool.js");
var BoxGeometryAPI$Wonderjs               = require("../../../../../src/api/geometry/BoxGeometryAPI.js");
var GameObjectTool$Wonderjs               = require("../../../../tool/service/gameObject/GameObjectTool.js");
var BoxGeometryTool$Wonderjs              = require("../../../../tool/service/geometry/BoxGeometryTool.js");
var SparseMapService$WonderCommonlib      = require("wonder-commonlib/lib/js/src/SparseMapService.js");
var RecordBoxGeometryMainService$Wonderjs = require("../../../../../src/service/state/main/geometry/box/RecordBoxGeometryMainService.js");

describe("BoxGeometry", (function () {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var state = [MainStateTool$Wonderjs.createState(/* () */0)];
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                state[0] = TestTool$Wonderjs.init(sandbox, /* None */0, /* None */0, /* () */0);
                return /* () */0;
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        describe("createBoxGeometry", (function () {
                return Wonder_jest.test("create a new geometry which is just index(int)", (function () {
                              var match = BoxGeometryAPI$Wonderjs.createBoxGeometry(state[0]);
                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                              RecordBoxGeometryMainService$Wonderjs.getRecord(match[0])[/* index */0],
                                              match[1]
                                            ]), /* tuple */[
                                          1,
                                          0
                                        ]);
                            }));
              }));
        Wonder_jest.test("test vertices", (function () {
                return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](BoxGeometryAPI$Wonderjs.getBoxGeometryVertices(state[0])), BoxGeometryTool$Wonderjs.getDefaultVertices(/* () */0));
              }));
        Wonder_jest.test("test normals", (function () {
                return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](BoxGeometryAPI$Wonderjs.getBoxGeometryNormals(state[0])), BoxGeometryTool$Wonderjs.getDefaultNormals(/* () */0));
              }));
        Wonder_jest.test("test indices", (function () {
                return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](BoxGeometryAPI$Wonderjs.getBoxGeometryIndices(state[0])), BoxGeometryTool$Wonderjs.getDefaultIndices(/* () */0));
              }));
        describe("getDrawMode", (function () {
                return Wonder_jest.test("return TRIANGLES", (function () {
                              var state$1 = FakeGlTool$Wonderjs.setFakeGl({
                                    TRIANGLES: 1
                                  }, state[0]);
                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](BoxGeometryAPI$Wonderjs.getBoxGeometryDrawMode(state$1)), 1);
                            }));
              }));
        describe("unsafeGetBoxGeometryGameObject", (function () {
                return Wonder_jest.test("get geometry's gameObject", (function () {
                              var match = BoxGeometryAPI$Wonderjs.createBoxGeometry(state[0]);
                              var geometry = match[1];
                              var match$1 = GameObjectAPI$Wonderjs.createGameObject(match[0]);
                              var gameObject = match$1[1];
                              var state$1 = GameObjectAPI$Wonderjs.addGameObjectBoxGeometryComponent(gameObject, geometry, match$1[0]);
                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](BoxGeometryAPI$Wonderjs.unsafeGetBoxGeometryGameObject(geometry, state$1)), gameObject);
                            }));
              }));
        describe("dispose component", (function () {
                describe("dispose geometry data", (function () {
                        describe("test dispose shared geometry", (function () {
                                return Wonder_jest.test("descrease group count", (function () {
                                              var match = BoxGeometryAPI$Wonderjs.createBoxGeometry(state[0]);
                                              var geometry1 = match[1];
                                              var match$1 = GameObjectAPI$Wonderjs.createGameObject(match[0]);
                                              var gameObject1 = match$1[1];
                                              var state$1 = GameObjectAPI$Wonderjs.addGameObjectBoxGeometryComponent(gameObject1, geometry1, match$1[0]);
                                              var match$2 = GameObjectAPI$Wonderjs.createGameObject(state$1);
                                              var state$2 = GameObjectAPI$Wonderjs.addGameObjectBoxGeometryComponent(match$2[1], geometry1, match$2[0]);
                                              var match$3 = GameObjectAPI$Wonderjs.createGameObject(state$2);
                                              var state$3 = GameObjectAPI$Wonderjs.addGameObjectBoxGeometryComponent(match$3[1], geometry1, match$3[0]);
                                              var state$4 = GameObjectTool$Wonderjs.disposeGameObjectBoxGeometryComponentWithoutVboBuffer(gameObject1, geometry1, state$3);
                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](BoxGeometryTool$Wonderjs.getGroupCount(geometry1, state$4)), 1);
                                            }));
                              }));
                        describe("test dispose not shared geometry", (function () {
                                var _prepare = function (state) {
                                  var match = BoxGeometryTool$Wonderjs.createGameObject(state[0]);
                                  var geometry1 = match[2];
                                  var gameObject1 = match[1];
                                  var state$1 = VboBufferTool$Wonderjs.addVboBufferToBoxGeometryBufferMap(geometry1, match[0]);
                                  var state$2 = GameObjectTool$Wonderjs.disposeGameObjectBoxGeometryComponentWithoutVboBuffer(gameObject1, geometry1, state$1);
                                  return /* tuple */[
                                          state$2,
                                          gameObject1,
                                          geometry1
                                        ];
                                };
                                return Wonder_jest.test("remove from groupCountMap, gameObjectMap", (function () {
                                              var match = _prepare(state);
                                              var geometry1 = match[2];
                                              var match$1 = RecordBoxGeometryMainService$Wonderjs.getRecord(match[0]);
                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                              SparseMapService$WonderCommonlib.has(geometry1, match$1[/* groupCountMap */5]),
                                                              SparseMapService$WonderCommonlib.has(geometry1, match$1[/* gameObjectMap */4])
                                                            ]), /* tuple */[
                                                          /* false */0,
                                                          /* false */0
                                                        ]);
                                            }));
                              }));
                        return /* () */0;
                      }));
                describe("test add new one after dispose old one", (function () {
                        Wonder_jest.test("use disposed index as new index firstly", (function () {
                                var match = BoxGeometryTool$Wonderjs.createGameObject(state[0]);
                                var geometry1 = match[2];
                                var gameObject1 = match[1];
                                var state$1 = GameObjectAPI$Wonderjs.initGameObject(gameObject1, match[0]);
                                var state$2 = VboBufferTool$Wonderjs.addVboBufferToBoxGeometryBufferMap(geometry1, state$1);
                                var state$3 = GameObjectTool$Wonderjs.disposeGameObjectBoxGeometryComponentWithoutVboBuffer(gameObject1, geometry1, state$2);
                                var match$1 = BoxGeometryAPI$Wonderjs.createBoxGeometry(state$3);
                                return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](match$1[1]), geometry1);
                              }));
                        return Wonder_jest.test("if has no disposed index, get index from boxGeometryRecord.index", (function () {
                                      var match = BoxGeometryTool$Wonderjs.createGameObject(state[0]);
                                      var geometry1 = match[2];
                                      var gameObject1 = match[1];
                                      var state$1 = GameObjectAPI$Wonderjs.initGameObject(gameObject1, match[0]);
                                      var state$2 = VboBufferTool$Wonderjs.addVboBufferToBoxGeometryBufferMap(geometry1, state$1);
                                      var state$3 = GameObjectTool$Wonderjs.disposeGameObjectBoxGeometryComponentWithoutVboBuffer(gameObject1, geometry1, state$2);
                                      var match$1 = BoxGeometryAPI$Wonderjs.createBoxGeometry(state$3);
                                      var match$2 = BoxGeometryAPI$Wonderjs.createBoxGeometry(match$1[0]);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                      match$1[1],
                                                      match$2[1]
                                                    ]), /* tuple */[
                                                  geometry1,
                                                  geometry1 + 1 | 0
                                                ]);
                                    }));
                      }));
                describe("contract check", (function () {
                        return Wonder_jest.test("shouldn't dispose the alive component", (function () {
                                      var match = BoxGeometryTool$Wonderjs.createGameObject(state[0]);
                                      var geometry1 = match[2];
                                      var gameObject1 = match[1];
                                      var state$1 = GameObjectAPI$Wonderjs.initGameObject(gameObject1, match[0]);
                                      var state$2 = VboBufferTool$Wonderjs.addVboBufferToBoxGeometryBufferMap(geometry1, state$1);
                                      var state$3 = GameObjectTool$Wonderjs.disposeGameObjectBoxGeometryComponentWithoutVboBuffer(gameObject1, geometry1, state$2);
                                      return Wonder_jest.Expect[/* toThrowMessage */20]("expect dispose the alive component, but actual not", Wonder_jest.Expect[/* expect */0]((function () {
                                                        GameObjectTool$Wonderjs.disposeGameObjectBoxGeometryComponentWithoutVboBuffer(gameObject1, geometry1, state$3);
                                                        return /* () */0;
                                                      })));
                                    }));
                      }));
                return /* () */0;
              }));
        describe("contract check", (function () {
                describe("check is alive", (function () {
                        describe("if geometry is disposed", (function () {
                                return Wonder_jest.test("unsafeGetBoxGeometryGameObject should error", (function () {
                                              var getFunc = BoxGeometryAPI$Wonderjs.unsafeGetBoxGeometryGameObject;
                                              var match = BoxGeometryTool$Wonderjs.createGameObject(state[0]);
                                              var geometry = match[2];
                                              var state$1 = VboBufferTool$Wonderjs.addVboBufferToBoxGeometryBufferMap(geometry, match[0]);
                                              var state$2 = GameObjectTool$Wonderjs.disposeGameObjectBoxGeometryComponentWithoutVboBuffer(match[1], geometry, state$1);
                                              return Wonder_jest.Expect[/* toThrowMessage */20]("expect component alive, but actual not", Wonder_jest.Expect[/* expect */0]((function () {
                                                                return Curry._2(getFunc, geometry, state$2);
                                                              })));
                                            }));
                              }));
                        return /* () */0;
                      }));
                return /* () */0;
              }));
        return /* () */0;
      }));

/*  Not a pure module */