open MainStateDataType;

let unsafeGetGeometryComponentData = (uid, state) => GetComponentGameObjectService.unsafeGetGeometryComponentData(uid, state.gameObjectRecord);