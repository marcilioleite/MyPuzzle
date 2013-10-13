/**
 * Objeto b�sico de um personagem/objeto do Jogo.
 * 
 */
var Sprite = Class.extend({
	
	/**
	 * Construtor
	 * 
	 * @param img Imagem do Sprite
	 * @param x Coordenada no eixo x.
	 * @param y Coordenada no eixo y.
	 * @param width Largura do Sprite.
	 * @param height Altura do Sprite.
	 * @param alias Opcional. Serve como um apelido para o Sprite
	 * 				 e ajuda a encontr�-lo no array.
	 */
	init: function(img, x, y, width, height, alias) {
		
		// �ndice no Array de Sprites
		this.index = -1;
		
		// Alias serve como um "apelido" ou ID para o Sprite.
		this.alias = alias;
		
		// Velocidade do Sprite
		this.speed = 2;
		
		// Imagem usada na pintura
		this.img = img;
		
		// Linha do frame usado na pintura se for SpriteSheet
		this.frameRow = 0;
		
		// Coluna do frame usado na pintura se for SpriteSheet
		this.frameCol = 0;
		
		// Coordenada no eixo x
		this.x = x;
		
		// Coordenada no eixo y
		this.y = y;

		// A��o de movimento do Objeto nos eixos x e y
		this.actionMove = null;
		
		// Largura do Sprite
		this.width = width ? width : img.width;
		
		// Altura do Sprite
		this.height = height ? height : img.height;
		
		// Indicador de foco no Sprite
		this.focused = false;
	},
	
	/**
	 * Define o frame do Sprite a ser pintado na tela.
	 * 
	 *  De acordo com o n�mero passado no par�metro, busca
	 *  o frameRow e frameCol corretos. 
	 * 
	 * @param frame Frame de pintura
	 */
	setFrame: function(frame) {
		this.frameRow = Math.floor(frame/(this.img.width/this.width));
		this.frameCol = parseInt(frame%(this.img.width/this.width));
	},
	
	/**
	 * Fun��o Update.
	 * 
	 * 	Respons�vel pela atualiza��o da l�gica 
	 * 	do Sprite.
	 * 
	 */
	update: function() {
		// Atualiza ou finaliza a��o de movimento
		if (this.actionMove && !this.actionMove.finished) {
			this.actionMove.update();
		} else {
			if (this.actionMove) {
				this.actionMove = null;
			}
		}
	},

	/**
	 * Fun��o Draw.
	 * 
	 * 	Respons�vel pela renderiza��o do Sprite 
	 *  no Jogo.
	 * 
	 * @param sceneWidthLimit Largura da cena. Serve como
	 * 						   limite de pintura da cena na tela.
	 * 
	 * @param sceneHeightLimit Altura da cena. Serve como
	 * 						   limite de pintura da cena na tela.
	 */
	draw: function(sceneWidthLimit, sceneHeightLimit) {
		var swl = sceneWidthLimit 	|| 0;
		var shl = sceneHeightLimit  || 0;
		
		// swl-x conserta bug da CutLeftTransition
		var width = Math.min (swl-this.x, this.width);
		// shl-y conserta bug da CutTopTransition
		var height = Math.min(shl-this.y, this.height);
		
		game.context.drawImage(this.img, 
				(this.frameCol*this.width), (this.frameRow*this.height), 
				width, height, 
				this.x, this.y, 
				width, height); // �ltimos width e height s�o scale
	},
	
	/**
	 * Realiza a movimenta��o de um Sprite para uma
	 * localiza��o dada.
	 * 
	 * @param x Coordenada no eixo x.
	 * @param y Coordenada no eixo y.
	 * @param speed Velocidade do movimento.
	 */
	moveTo: function(x, y, speed) {
		this.actionMove = new MoveTo(this, x, y, speed);
	},
	
	/**
	 * Realiza a��o de chacoalhar o Sprite.
	 * 
	 * @param magnitude Magnitude do evento.
	 * @param speed Velocidade do evento.
	 * @param times Vezes que ser� repetido.
	 * @param orientation Orienta��o. Default � Horizontal
	 */
	shake: function(magnitude, speed, times, orientation) {
		this.actionMove = new Shake(this, magnitude, speed, times, orientation);
	},
	
	/**
	 * Realiza a movimenta��o de um Sprite para uma
	 * atrav�s de uma fun��o dada.
	 * 
	 * @param x Coordenada no eixo x.
	 * @param func Fun��o usada para calcular valor no eixo y.
	 * @param speed Velocidade do movimento.
	 */
	moveByFunction: function(x, func, speed) {
		this.actionMove = new MoveByFunction(this, x, func, speed);
	},
	
	/**
	 * Verifica a colis�o com outro Sprite. 
	 * 
	 * @param sprite Outro Sprite com o qual ser� verificada
	 * 				  a colis�o.
	 * 
	 * @param distance Dist�ncia de aproxima��o. Opcional, se n�o 
	 * 			 for passada, � tomada dist�ncia 0.
	 */
	collides: function(sprite, distance) {
		var d = distance || 0;
		
		var xCollides = Math.abs(this.x - sprite.x) < this.width + d; 
		var yCollides = Math.abs(this.y - sprite.y) < this.height + d;

		if (xCollides && yCollides) {
			return true;
		}
		return false;
	},
	
	/**
	 * Verifica se um x e y est�o dentro do espa�o ocupado
	 * pelo Sprite.
	 * 
	 * @param x coordenada x.
	 * @param y coordenada y.
	 * 
	 */
	xyIn: function(x, y) {
		var xIn = x >= this.x && x <= this.x + this.width; 
		var yIn = y >= this.y && y <= this.y + this.height;
		
		if (xIn && yIn) {
			return true;
		}
		return false;
	},
	
	/**
	 * Bind para evento de mouse sobre o Sprite.
	 * 
	 */
	onFocus: function() {
		this.focused = true;
	},
	
	/**
	 * Bind para evento de mouse sair de cima do Sprite.
	 * 
	 */
	onFocusLost: function() {
		this.focused = false;
	},

	/**
	 * Bind para evento de clique no Sprite.
	 * 
	 */
	onClick: function() {
	},
	
	/**
	 * Bind para evento de libera��o de clique no Sprite.
	 * 
	 */
	onReleaseClick: function() {
	}
	
});