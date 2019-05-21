let disposeGlTextureMap = (texture, gl, glTextureMap) =>
  switch (
    glTextureMap |> WonderCommonlib.MutableSparseMapService.get(texture)
  ) {
  | Some(glTexture) =>
    gl |> WonderWebgl.Gl.deleteTexture(glTexture);

    glTextureMap |> WonderCommonlib.MutableSparseMapService.deleteVal(texture);
  | None => glTextureMap
  };