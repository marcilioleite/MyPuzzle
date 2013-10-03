/**
 * Objeto b�sico de um personagem/objeto do Jogo.
 * 
 * @param img Imagem usada na pintura.
 * @param x Coordenada no eixo x.
 * @param y Coordenada no eixo y.
 * @param width Largura do Sprite.
 * @param height Altura do Sprite.
 */
function Sprite(img, x, y, width, height) {
	
	// �ndice no Array de Sprites
	this.index = -1;
	
	// Context do canvas usado para pintura
	this.context = null;
	
	// Imagem usada na pintura
	this.img = img;
	
	// Linha do frame usado na pintura se for SpriteSheet
	var frameRow = 0;
	
	// Coluna do frame usado na pintura se for SpriteSheet
	var frameCol = 0;
	
	// Coordenada no eixo x
	this.x = x;
	
	// Coordenada no eixo y
	this.y = y;
	
	// Largura do Sprite
	this.width = width ? width : img.width;
	
	// Altura do Sprite
	this.height = height ? height : img.height;
	
	/**
	 * Define o frame do Sprite a ser pintado na tela.
	 * 
	 *  De acordo com o n�mero passado no par�metro, busca
	 *  o frameRow e frameCol corretos. 
	 * 
	 * @param frame Frame de pintura
	 */
	this.setFrame = function(frame) {
		frameRow = Math.floor(frame/(this.img.width/this.width));
		frameCol = parseInt(frame%(this.img.width/this.width));
	};
	
	/**
	 * Fun��o Update.
	 * 
	 * 	Respons�vel pela atualiza��o da l�gica 
	 * 	do Sprite.
	 * 
	 */
	this.update = function() {
	};

	/**
	 * Fun��o Draw.
	 * 
	 * 	Respons�vel pela renderiza��o do Sprite 
	 *  no Jogo.
	 * 
	 */
	this.draw = function() {
		this.context.drawImage(this.img, 
				(frameCol*this.width), (frameRow*this.height), 
				this.width, this.height, 
				this.x, this.y, 
				this.width, this.height);
	};
	
}