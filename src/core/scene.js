/**
 * Objeto de uma Cena do Jogo.
 * 
 * Cenas contém Sprites e pertencem a um Jogo.
 * 
 */
var Scene = Class.extend({
	
	/**
	 * Construtor.
	 * 
	 * @param id Para que seja feita a troca ou transição entre
	 * 			  cenas, é usado o ID da cena no Jogo.
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
		sprite.index = this.sprites.length; // define o índice
		sprite.context = game.context; // atualiza o context de pintura
		this.sprites.push(sprite);
	},
	
	/**
	 * Remove um Sprite do array de Sprites do Jogo.
	 * 
	 * @param sprite Sprite a ser removido do array
	 * 			de Sprites do Jogo. Seu índice é usado
	 * 			na busca.
	 * 
	 */
	removeSprite: function(sprite) {
		this.sprites.splice(sprite.index, 1);
	},
	
	/**
	 * Função Update. 
	 * 
	 * 	Responsável pela atualização da lógica da Cena.
	 * 
	 */
	update: function() {
		for (var spr = 0; spr < this.sprites.length; spr++) {
			this.sprites[spr].update();
		}
	},
	
	/**
	 * Função Draw.
	 * 	
	 * 	Responsável pela pintura dos Sprites da Cena.
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
	 * 	Executado quando uma tecla é liberada
	 * 	pelo Usuário.
	 * 
	 * @param keyCode
	 */
	keyUp: function(keyCode) {
		
	},

	/**
	 * Bind para Evento KeyDown.
	 * 
	 * 	Executado quando uma tecla é pressionada
	 * 	pelo Usuário.
	 * 
	 * @param keyCode
	 */
	keyDown: function(keyCode) {
		
	},

	/**
	 * Bind para Evento MouseUp.
	 * 
	 * 	Executado quando o botão do mouse é liberado
	 * 	pelo Usuário.
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
	 * 	Executado quando o botão do mouse é pressionado
	 * 	pelo Usuário.
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
	 * 	Executado quando o mouse é movido pelo Usuário.
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