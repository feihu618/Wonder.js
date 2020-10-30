type gameObject;

type sceneGameObject = gameObject;

type transform;

type directionLight;

type basicCameraView;

type perspectiveCameraProjection;

type position = (float, float, float);

type rotation = (float, float, float, float);

type scale = (float, float, float);

type localToWorldMatrix = Js.Typed_array.Float32Array.t;

type normalMatrix = Js.Typed_array.Float32Array.t;

type color3 = (float, float, float);

type intensity = float;

type direction = (float, float, float);

type far = float;

type near = float;

type aspect = float;

type fovy = float;

type viewWorldToCameraMatrix = Js.Typed_array.Float32Array.t;

type projectionMatrix = Js.Typed_array.Float32Array.t;
