/**
 * Objeto básico de um Jogo. 
 * 
 * Contém as funções update e render, start e
 * binds para eventos de teclado e mouse.
 * 
 * @param canvas Usado no construtor do Jogo.
 */
function Game(canvas) {
	
	// Context usado para pintura no Canvas
	var context = canvas.getContext("2d");

	// Buffer de Imagens carregadas
	this.gfx = new Array();
	
	// Sprites a serem pintados no Jogo.
	var sprites = new Array();
	
	/**
	 * Carrega uma ou várias imagens a serem usadas
	 * no Jogo. 
	 * 
	 * @param images Array com os paths das imagens
	 * 			a serem carregadas para o buffer.
	 */
	this.preload = function(images) {
		var game = this; 
		loadGfx(images, function(imgs) {
			game.gfx = imgs;
		});
	};
	
	/**
	 * Adiciona um Sprite ao array de Sprites do Jogo.
	 * 
	 * @param sprite Sprite a ser adicionado ao array
	 * 			de Sprites do Jogo. 
	 * 
	 */
	this.addSprite = function(sprite) {
		sprite.index = sprites.length; // define o índice
		sprite.context = context; // atualiza o context de pintura
		sprites.push(sprite);
	};
	
	/**
	 * Remove um Sprite do array de Sprites do Jogo.
	 * 
	 * @param sprite Sprite a ser removido do array
	 * 			de Sprites do Jogo. Seu índice é usado
	 * 			na busca.
	 * 
	 */
	this.removeSprite = function(sprite) {
		sprites.splice(sprite.index, 1);
	};
	
	/**
	 * Função Update. 
	 * 
	 * 	Responsável pela atualização da lógica do Jogo.
	 * 
	 */
	this.update = function() {
		for (var spr = 0; spr < sprites.length; spr++) {
			sprites[spr].update();
		}
	};
	
	/**
	 * Função Draw.
	 * 	
	 * 	Responsável pela renderização de gráficos do Jogo.
	 * 	Pinta os Sprites, Textos e Backgrounds na tela.
	 * 
	 */
	this.draw = function() {
		context.clearRect(0, 0, canvas.width, canvas.height);
		
		for (var spr = 0; spr < sprites.length; spr++) {
			sprites[spr].draw();
		}
	};

	/**
	 * Função Start.
	 * 	
	 * 	Inicia o Loop de execução do Jogo utilizando
	 * 	requestAnimFrame(). Aqui são chamadas as funções
	 * 	Update e Draw, o que significa que o Jogo é 
	 * 	atualizado e renderizado a cada iteração.
	 * 
	 */
	this.start = function() {
		var game = this;
		(function animloop() {
			requestAnimFrame(animloop);
		  	game.update();
			game.draw();
		})();
	};
	
	/**
	 * Bind para Evento KeyUp.
	 * 
	 * 	Executado quando uma tecla é liberada
	 * 	pelo Usuário.
	 * 
	 * @param keyCode
	 */
	this.keyUp = function(keyCode) {
		
	};

	/**
	 * Bind para Evento KeyDown.
	 * 
	 * 	Executado quando uma tecla é pressionada
	 * 	pelo Usuário.
	 * 
	 * @param keyCode
	 */
	this.keyDown = function(keyCode) {
		
	};

	/**
	 * Bind para Evento MouseUp.
	 * 
	 * 	Executado quando o botão do mouse é liberado
	 * 	pelo Usuário.
	 * 
	 * @param x coordenada x do mouse
	 * @param y coordenada y do mouse
	 */
	this.mouseUp = function(x, y) {
		
	};
	
	/**
	 * Bind para Evento MouseDown.
	 * 
	 * 	Executado quando o botão do mouse é pressionado
	 * 	pelo Usuário.
	 * 
     * @param x coordenada x do mouse
	 * @param y coordenada y do mouse
	 */
	this.mouseDown = function(x, y) {
		
	};
	
	/**
	 * Bind para Evento MouseMove.
	 * 
	 * 	Executado quando o mouse é movido pelo Usuário.
	 * 
	 * @param x coordenada x do mouse
	 * @param y coordenada y do mouse
	 */
	this.mouseMove = function(x, y) {
		
	};
}