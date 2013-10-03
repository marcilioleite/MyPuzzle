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
	game.mouseUp(evt.x, evt.y);
};
window.onmousedown = function(evt) {
	game.mouseDown(evt.x, evt.y);
};
window.onmouseMove = function(evt) {
	game.mouseMove(evt.x, evt.y);
};