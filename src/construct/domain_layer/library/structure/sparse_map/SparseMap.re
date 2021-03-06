let createEmpty = (~hintSize=10, ()): SparseMapType.t2('a) => [||];

let copy = Js.Array.copy;

let unsafeGet = (map: SparseMapType.t2('a), key: int): 'a =>
  Array.unsafe_get(map, key)->SparseMapType.nullableToNotNullable;

let get = (map, key: int) => {
  let value = unsafeGet(map, key);

  NullUtils.isEmpty(value) ? None : Some(value);
};

let getNullable = (map, key) => {
  get(map, key)->Js.Nullable.fromOption;
};

let has = (map, key: int) => !NullUtils.isEmpty(unsafeGet(map, key));

let map = (map, func) =>
  map->Js.Array.map(
         value =>
           if (NullUtils.isNotInMap(value)) {
             Js.Nullable.undefined;
           } else {
             func(. value->SparseMapType.nullableToNotNullable)
             ->SparseMapType.notNullableToNullable;
           },
         _,
       );

let reducei = (map, initValue, func) =>
  map
  ->ArraySt.reduceOneParami(
      initValue->SparseMapType.notNullableToNullable,
      (. previousValue, value, index) =>
      if (NullUtils.isNotInMap(value)) {
        previousValue;
      } else {
        func(.
          previousValue->SparseMapType.nullableToNotNullable,
          value->SparseMapType.nullableToNotNullable,
          index,
        )
        ->SparseMapType.notNullableToNullable;
      }
    )
  ->SparseMapType.nullableToNotNullable;

let getValues = map =>
  map
  |> Js.Array.filter(value => NullUtils.isInMap(value))
  |> SparseMapType.arrayNullableToArrayNotNullable;

let getKeys = map =>
  map->ArraySt.reduceOneParami([||], (. arr, value, key) =>
    if (NullUtils.isNotInMap(value)) {
      arr;
    } else {
      arr |> Js.Array.push(key) |> ignore;
      arr;
    }
  );
