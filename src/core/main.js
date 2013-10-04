var game = new Game(document.getElementById("game"));

game.preload(["assets/images/ships2.png"]);

window.onload = function() {
	var sprite = new Sprite(game.gfx["assets/images/ships2.png"], 10, 10, 76, 85);
	
	sprite.setFrame(0);
	
	game.addSprite(sprite);
	
	game.start();
};

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