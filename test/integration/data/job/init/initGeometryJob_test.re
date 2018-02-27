open Wonder_jest;

open Geometry;

open BoxGeometry;

let _ =
  describe(
    "test init geometry",
    () => {
      open Expect;
      open Expect.Operators;
      open Sinon;
      let sandbox = getSandboxDefaultVal();
      let state = ref(StateTool.createState());
      let _buildNoWorkerJobConfig = () =>
        NoWorkerJobConfigTool.buildNoWorkerJobConfig(
          ~initPipelines={|
        [
    {
      "name": "default",
      "jobs": [
        {
          "name": "init_geometry"
        }
      ]
    }
  ]
        |},
          ~initJobs={|
[
        {
          "name": "init_geometry"
        }
]
        |},
          ()
        );
      beforeEach(
        () => {
          sandbox := createSandbox();
          state :=
            TestTool.initWithJobConfigWithoutBuildFakeDom(
              ~sandbox,
              ~isDebug="true",
              ~noWorkerJobConfig=_buildNoWorkerJobConfig(),
              ()
            )
        }
      );
      afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
      describe(
        "init all geometrys",
        () => {
          let _prepare = () => {
            let (state, geometry1) = createBoxGeometry(state^);
            let (state, geometry2) = createBoxGeometry(state);
            let state = state |> BoxGeometryTool.setDefaultConfigData(geometry1);
            let state = state |> BoxGeometryTool.setDefaultConfigData(geometry2);
            (state, geometry1, geometry2)
          };
          test(
            "compute and set vertices",
            () => {
              let (state, geometry1, geometry2) = _prepare();
              let state = state |> GeometryTool.initGeometrys;
              (getGeometryVertices(geometry1, state), getGeometryVertices(geometry2, state))
              |>
              expect == (
                          BoxGeometryTool.getDefaultVertices(),
                          BoxGeometryTool.getDefaultVertices()
                        )
            }
          );
          test(
            "compute and set normals",
            () => {
              let (state, geometry1, geometry2) = _prepare();
              let state = state |> GeometryTool.initGeometrys;
              (getGeometryNormals(geometry1, state), getGeometryNormals(geometry2, state))
              |>
              expect == (BoxGeometryTool.getDefaultNormals(), BoxGeometryTool.getDefaultNormals())
            }
          );
          test(
            "compute and set indices",
            () => {
              let (state, geometry1, geometry2) = _prepare();
              let state = state |> GeometryTool.initGeometrys;
              (getGeometryIndices(geometry1, state), getGeometryIndices(geometry2, state))
              |>
              expect == (BoxGeometryTool.getDefaultIndices(), BoxGeometryTool.getDefaultIndices())
            }
          )
        }
      );
      describe(
        "contract check",
        () =>
          test(
            "shouldn't dispose any geometry before init",
            () => {
              let (state, geometry1) = BoxGeometryTool.createBoxGeometry(state^);
              let (state, geometry2) = BoxGeometryTool.createBoxGeometry(state);
              let state =
                VboBufferTool.passBufferShouldExistCheckWhenDisposeGeometry(geometry1, state);
              expect(() => state |> GeometryTool.dispose(geometry1)) |> toThrow
            }
          )
      )
    }
  );