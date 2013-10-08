var game = new Game(document.getElementById("game"));

game.preload(["assets/images/ships2.png"]);

window.onload = function() {
	var scene = new Scene(1);
	game.addScene(scene);
	
	var sprite = new Sprite(game.gfx["assets/images/ships2.png"], 10, 10, 76, 85);
	scene.addSprite(sprite);
	
	var scene2 = new Scene(2);
	game.addScene(scene2);
	
	var sprite2 = new Sprite(game.gfx["assets/images/ships2.png"], 50, 50, 76, 85);
	scene2.addSprite(sprite2);
	
	game.enterScene(2, new FadeTransition("fast", "#000"));
	
	bindEvents();
	game.start();
};