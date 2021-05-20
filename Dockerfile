docker run --rm \
  -v "/path/to/files":/work \
  -w=/work \
  -e PARAMETER_INPUT_PATH=/work/src \
  -e PARAMETER_OUTPUT_PATH=/work/minify/src \
  -e PARAMETER_ADD_SUFFIX=false \
  devatherock/minify-js:latest
