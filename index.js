var vertexShaderText = [
    'precision mediump float;',
    '',
    'attribute vec2 vertPosition;',
    '',
    'void main() {',
    '  gl_Position = vec4(vertPosition, 0.0, 1.0);',
    '}'
  ].join('\n');

var fragmentShaderText = [
    'precision mediump float;',
    '',
    'void main() {',
    '  gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);',
    '}'
  ].join('\n');

var initDemo = function () {
  console.log('Working');
  var canvas = document.getElementById('c');
  var gl = canvas.getContext('webgl');
    if (!gl) {
      console.log('If you see this, then your browser can\'t handle the awesome power of WebGL.\nWe\'re gonna have to use experimental-webgl.');
      gl = canvas.getContext('experimental-webgl');
 }
    if (!gl) {
      alert('o noes! Yo browzer doesant suport webzGL!\ngo gets it now!!!');
 }
 canvas.width = window.innerWidth;
 canvas.height = window.innerHeight;
 gl.viewport(0, 0, window.innerWidth, window.innerHeight);
 gl.clearColor(1.0, 1.0, 0.9, 1.0);
 gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
 // Shaders

 var vertexShader = gl.createShader(gl.VERTEX_SHADER);
 var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);

 // Source
 gl.shaderSource(vertexShader, vertexShaderText);
 gl.shaderSource(fragmentShader, fragmentShaderText);

 // Compiler
 gl.compileShader(vertexShader);
   if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
  console.error('ERROR shadar conpiling.', gl.getShaderInfoLog(vertexShader));
  return;
 }
  gl.compileShader(fragmentShader);
    if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
  console.error('ERROR fragment shadar conpiling.', gl.getShaderInfoLog(fragmentShader));
  return;
 }

 var program = gl.createProgram();
 gl.attachShader(program, vertexShader);
 gl.attachShader(program, fragmentShader);
 gl.linkProgram(program);
 if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
  console.error('o noes! progarm linkang eror!', gl.getProgramLog(program));
  return;
 }

 gl.validateProgram(program);
 if (!gl.getProgramParameter(program, gl.VALIDATE_STATUS)) {
  console.error('o noes! progarm varlidate eror!', gl.getProgramInfoLog(program));
  return;
 }

 // Buffers
 var objectVertices = [
   // x y            R,G,B
  0.0, 0.5,       1.0, 1.0, 0.0,
  -0.5, -0.5,     0.7, 0.0, 1.0,
  0.5, -0.5,       0.1, 1.0, 0.6
 ];
 var objectVertexBufferObject = gl.createBuffer();
 gl.bindBuffer(gl.ARRAY_BUFFER, objectVertexBufferObject);
 gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(objectVertices), gl.STATIC_DRAW);
 var positionAttribLocation = gl.getAttribLocation(program, 'vertPosition');
 var colorAttribLocation = gl.getAttribLocation(program, 'vertColor');

 gl.vertexAttribPointer(
   positionAttribLocation, // Attribute location
   2, // Number of elements per attribute
   gl.FLOAT, // Type of elements
   gl.FALSE,
   5 * Float32Array.BYTES_PER_ELEMENT, // Size of an individual vertex
   0 // Offset from the beginning of a single vertex to this attribute
 );
 gl.vertexAttribPointer(
   colorAttribLocation, // Attribute location
   3, // Number of elements per attribute
   gl.FLOAT, // Type of elements
   gl.FALSE,
   5 * Float32Array.BYTES_PER_ELEMENT, // Size of an individual vertex
   3 * Float32Array.BYTES_PER_ELEMENT // Offset from the beginning of a single vertex to this attribute
 );

 gl.enableVertexAttribArray(positionAttribLocation);
 gl.enableVertexAttribArray(colorAttribLocation);

 gl.useProgram(program);
 gl.drawArrays(gl.TRIANGLES, 0, 3);
};﻿

//Load shape 
window.onload = function() {
  initDemo();

};
