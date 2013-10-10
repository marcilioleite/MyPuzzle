/**
 * Ação de Movimento de um Sprite nos eixos x e y.
 * 
 * O Sprite possui coordenadas x, y e a ação recebe
 * valores (x,y) para onde deverá levar o Sprite. 
 * 
 */
var MoveTo = Class.extend({
	
	/**
	 * Construtor.
	 * 
	 * @param sprite Sprite que deve ser movido.
	 * @param x destino no eixo x.
	 * @param y destino no eixo y.
	 * @param speed velocidade de pixels por segundo.
	 */
	init: function(sprite, x, y, speed) {
		this.sprite = sprite;
		this.toX = x;
		this.toY = y;
		this.speed = speed;
		this.finished = false;
	},
	
	/**
	 * Atualiza atributos do Sprite.
	 * 
	 * Devem ser passados os atributos x e y do Sprite,
	 * para que a ação atualize-os.
	 * 
	 * @param x coordenada x do Sprite.
	 * @param y coordenada y do Sprite.
	 */
	update: function() {
		var a = Math.abs(this.sprite.y - this.toY);
		var b = Math.abs(this.sprite.x - this.toX);
		// Distância Euclidiana entre dois pontos
		var c = Math.sqrt(Math.pow(a,2) + Math.pow(b,2));
		
		// Ângulo da Hipotenusa
		var beta_rad = Math.asin(b/c);
		
		c = this.speed;
		
		// Velocidade no eixo x
		var nx = c * Math.sin(beta_rad);
		// Velocidade no eixo y
		var ny = c * Math.cos(beta_rad);
		
		// Ajustes para acréscimo ou decréscimo
		if (this.sprite.x > this.toX) nx *= -1;
		if (this.sprite.y > this.toY) ny *= -1;
		
		this.sprite.x = this.sprite.x + nx;
		this.sprite.y = this.sprite.y + ny;
		
		if (this.sprite.x >= this.toX - this.speed && 
			this.sprite.x <= this.toX + this.speed && 
			this.sprite.y >= this.toY - this.speed && 
			this.sprite.y <= this.toY + this.speed) {
			
			this.finished = true;
			this.sprite.x = this.toX;
			this.sprite.y = this.toY;
		}
	}
	
});