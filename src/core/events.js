window.onkeyup = function(key) {
	game.keyUp(key.keyCode);
};
window.onkeydown = function(key) {
	game.keyDown(key.keyCode);
};
window.onmouseup = function(evt) {
	var	x = evt.offsetX || evt.layerX;
	var	y = evt.offsetY || evt.layerY;
	game.mouseUp(x, y);
};
window.onmousedown = function(evt) {
	var	x = evt.offsetX || evt.layerX;
	var	y = evt.offsetY || evt.layerY;
	game.mouseDown(x, y);
};
window.onmousemove = function(evt) {
	var	x = evt.offsetX || evt.layerX;
	var	y = evt.offsetY || evt.layerY;
	game.mouseMove(x, y);
};