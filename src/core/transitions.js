/**
 * Transi��o de Transpar�ncia entre duas cenas. 
 */
var AlphaTransition = Class.extend({
	
	/**
	 * Construtor.
	 * 
	 * @param speed Velocidade da transi��o (high ou low)
	 */
	init: function(speed) {
		// Context usado para pintura no Canvas
		this.context = null;
		
		// Velocidade
		this.speed = speed === "high" ? 2.5 : 1.5;
		
		// Valor do Canal Alpha
		this.alpha = 100;
		
		// Flag que indica se a anima��o terminou.
		this.finished = false;
	},
	
	/**
	 * Atualiza a Transi��o diminuindo sua 
	 * transpar�ncia.
	 * 
	 */
	update: function() {
		if (this.alpha > 0 && this.alpha < this.speed * 2) {
			this.finished = true;
		}
		this.alpha = this.alpha - this.speed;
		this.context.globalAlpha = this.alpha/100;
	},
	
	/**
	 * Restaura as modifica��es feitas no context pelo
	 * update().
	 */
	restore: function() {
		this.context.globalAlpha = 1;
	}
});