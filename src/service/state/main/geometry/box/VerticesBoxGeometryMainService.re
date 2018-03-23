open MainStateDataType;

open BoxGeometryType;

open TypeArrayService;

open Js.Typed_array;

let getVertices =
  [@bs]
  (
    (index, state) =>
      RecordBoxGeometryMainService.getVerticesTypeArray(
        index,
        RecordBoxGeometryMainService.getRecord(state).vertices
      )
  );

let setVertices = (index, data: array(float), state) => {
  RecordBoxGeometryMainService.setVertices(
    index,
    data,
    RecordBoxGeometryMainService.getRecord(state).vertices
  )
  |> ignore;
  state
};

let setVerticesByTypeArray = (index: int, data: Float32Array.t, state) => {
  RecordBoxGeometryMainService.setVerticesByTypeArray(
    index,
    data,
    RecordBoxGeometryMainService.getRecord(state).vertices
  )
  |> ignore;
  state
};