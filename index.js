var vertexShaderText =	[
	'precision mediump float;',
	'',
	'attribute vec2 vertPosition;',
	'',
	'void main()',
	'{',
	' gl_Position = vec4(vertPosition, 0.0, 1.0);',
].join('\n');

var fragmentShaderText = [
	'percision mediump float;',
	'',
	'void main()',
	'{',
	' gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);',
	'}'
].join('\n');

var InitDemo = function () {
	var canvas = document.getElementById('c');
	gl = canvas.getContext('webgl');

	if (!gl) {
		console.log('WebGL not supported, falling back on experimental-webgl');
		gl = canvas.getContext('experimental-webgl');
	}

	if (!gl) {
		alert('Your browser does not support WebGL');
	}

	gl.clearColor(0.75, 0.85, 0.8, 1.0);
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

};
InitDemo()
