/**
 * Objeto de uma Cena do Jogo.
 * 
 * Cenas cont�m Sprites e pertencem a um Jogo.
 * 
 */
var Scene = Class.extend({
	
	/**
	 * Construtor.
	 * 
	 * @param id Para que seja feita a troca ou transi��o entre
	 * 			  cenas, � usado o ID da cena no Jogo.
	 * 
	 * @param width Largura da Cena na tela de pintura.
	 * @param height Altura da Cena na tela de pintura. 
	 */
	init: function(id, width, height) {
		// Id da Cena no Jogo
		this.id = id;
		
		// Largura da Cena na tela.
		this.width = width || game.width;
		
		// Algura da Cena na tela.
		this.height = height || game.height;
		
		// Sprites a serem pintados no Jogo
		this.sprites = new Array();
	},

	/**
	 * Adiciona um Sprite ao array de Sprites do Jogo.
	 * 
	 * @param sprite Sprite a ser adicionado ao array
	 * 			de Sprites do Jogo. 
	 * 
	 */
	addSprite: function(sprite) {
		sprite.index = this.sprites.length; // define o �ndice
		sprite.context = game.context; // atualiza o context de pintura
		this.sprites.push(sprite);
	},
	
	/**
	 * Remove um Sprite do array de Sprites do Jogo.
	 * 
	 * @param sprite Sprite a ser removido do array
	 * 			de Sprites do Jogo. Seu �ndice � usado
	 * 			na busca.
	 * 
	 */
	removeSprite: function(sprite) {
		this.sprites.splice(sprite.index, 1);
	},
	
	/**
	 * Fun��o Update. 
	 * 
	 * 	Respons�vel pela atualiza��o da l�gica da Cena.
	 * 
	 */
	update: function() {
		for (var spr = 0; spr < this.sprites.length; spr++) {
			this.sprites[spr].update();
		}
	},
	
	/**
	 * Fun��o Draw.
	 * 	
	 * 	Respons�vel pela pintura dos Sprites da Cena.
	 * 
	 */
	draw: function() {
		for (var spr = 0; spr < this.sprites.length; spr++) {
			this.sprites[spr].draw(this.width, this.height);
		}
	},

	/**
	 * Bind para Evento KeyUp.
	 * 
	 * 	Executado quando uma tecla � liberada
	 * 	pelo Usu�rio.
	 * 
	 * @param keyCode
	 */
	keyUp: function(keyCode) {
		
	},

	/**
	 * Bind para Evento KeyDown.
	 * 
	 * 	Executado quando uma tecla � pressionada
	 * 	pelo Usu�rio.
	 * 
	 * @param keyCode
	 */
	keyDown: function(keyCode) {
		
	},

	/**
	 * Bind para Evento MouseUp.
	 * 
	 * 	Executado quando o bot�o do mouse � liberado
	 * 	pelo Usu�rio.
	 * 
	 * @param x coordenada x do mouse
	 * @param y coordenada y do mouse
	 */
	mouseUp: function(x, y) {
		for (var spr = 0; spr < this.sprites.length; spr++) {
			if (x >= this.sprites[spr].x && x <= this.sprites[spr].x + this.sprites[spr].width &&
				y >= this.sprites[spr].y && y <= this.sprites[spr].y + this.sprites[spr].height) {
					
				this.sprites[spr].onReleaseClick();
			}
		}
	},
	
	/**
	 * Bind para Evento MouseDown.
	 * 
	 * 	Executado quando o bot�o do mouse � pressionado
	 * 	pelo Usu�rio.
	 * 
     * @param x coordenada x do mouse
	 * @param y coordenada y do mouse
	 */
	mouseDown: function(x, y) {
		for (var spr = 0; spr < this.sprites.length; spr++) {
			if (x >= this.sprites[spr].x && x <= this.sprites[spr].x + this.sprites[spr].width &&
				y >= this.sprites[spr].y && y <= this.sprites[spr].y + this.sprites[spr].height) {
					
				this.sprites[spr].onClick();
			}
		}
	},
	
	/**
	 * Bind para Evento MouseMove.
	 * 
	 * 	Executado quando o mouse � movido pelo Usu�rio.
	 * 
	 * @param x coordenada x do mouse
	 * @param y coordenada y do mouse
	 */
	mouseMove: function(x, y) {
		for (var spr = 0; spr < this.sprites.length; spr++) {
			if (x >= this.sprites[spr].x && x <= this.sprites[spr].x + this.sprites[spr].width &&
				y >= this.sprites[spr].y && y <= this.sprites[spr].y + this.sprites[spr].height) {
				
				this.sprites[spr].onFocus();
			} else {
				if (this.sprites[spr].focused) {
					this.sprites[spr].onFocusLost();
				}
			}
		}
	}
});