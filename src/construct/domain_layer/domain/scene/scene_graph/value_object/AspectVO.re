type t =
  | Aspect(SceneGraphType.aspect);

let create = value => Aspect(value);

let value = aspect =>
  switch (aspect) {
  | Aspect(value) => value
  };
