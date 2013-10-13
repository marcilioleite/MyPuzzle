var game = new Game(document.getElementById("game"));

game.onload = function() {
	var scene = new Scene(1);
	var scene2 = new Scene(2);
	
	var spritebg = new Sprite(game.gfx["assets/images/bg.jpg"], 0, 0, 800, 600);
	var sprite = new Sprite(game.gfx["assets/images/ships2.png"], 10, 10, 76, 85, "heroi");
	var sprite2 = new Sprite(game.gfx["assets/images/ships2.png"], 700, 110, 76, 85);

	// mainScene é sempre a primeira a ser adicionada.
	game.addScene(scene);
	//game.addScene(scene2);
	
	scene.addSprite(spritebg);
	scene.addSprite(sprite);
	//scene2.addSprite(sprite2);

	sprite.shake(10, 10, 5);
	//sprite.moveTo(155, 200, 2);
	//sprite2.moveTo(255, 300, 2);
	
	//game.enterScene(2, new CutTopTransition("fast"));
	
	game.start();
};

game.preload(["assets/images/ships2.png", "assets/images/bg.jpg"]);