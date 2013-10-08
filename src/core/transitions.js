/*
 * Classe base de uma Transi��o entre duas Cenas.
 */
var Transition = Class.extend({

	/**
	 * Construtor.
	 * 
	 * @param speed Velocidade da transi��o (fast ou low)
	 */
	init: function(speed) {
		// Context usado para pintura no Canvas
		this.context = null;
		
		// Velocidade
		this.speed = speed === "fast" ? 2.5 : 1;
		
		// Flag que indica se a anima��o terminou.
		this.finished = false;
	},

	/**
	 * Realiza a Transi��o entre duas Cenas.
	 * 
	 */
	realize: function() {
		
	}
});

/**
 * Transi��o de de Fade Preto entre duas cenas. 
 */
var FadeTransition = Transition.extend({

	/**
	 * Construtor.
	 * 
	 * @param speed Velocidade da transi��o (fast ou low)
	 */
	init: function(speed, color) {
		this._super(speed);
		
		// Cor da Transi��o
		this.color = color;
		
		// Valor do Canal Alpha
		this.alpha = 0;
		
		// Status fadeIn ou fadeOut
		this.status = "fadeIn";
	},
	
	/**
	 * Atualiza a Transi��o diminuindo sua 
	 * transpar�ncia.
	 * 
	 */
	realize: function() {
		this.context.fillStyle = this.color;
		
		if (this.alpha > 99) {
			this.status = "fadeOut";
		}
		
		if (this.status === "fadeIn") {
			this.context.globalAlpha = 1;
			game.oldScene.draw();
			
			this.alpha = this.alpha + this.speed;
			this.context.globalAlpha = this.alpha/100;
			this.context.fillRect(0, 0, game.canvas.width, game.canvas.height);
		}
		else {
			this.context.globalAlpha = 1;
			game.mainScene.draw();

			this.alpha = this.alpha - this.speed;
			this.context.globalAlpha = this.alpha/100;
			this.context.fillRect(0, 0, game.canvas.width, game.canvas.height);
		}

		if (this.status === "fadeOut" && (this.alpha/100) < 0.01) {
			this.context.globalAlpha = 1;
			this.finished = true;
		}
	},
});

/**
 * Transi��o de Transpar�ncia entre duas cenas. 
 */
var AlphaTransition = Transition.extend({

	/**
	 * Construtor.
	 * 
	 * @param speed Velocidade da transi��o (high ou low)
	 */
	init: function(speed) {
		this._super(speed);
		
		// Valor do Canal Alpha
		this.alpha = 100;
	},
	
	/**
	 * Atualiza a Transi��o diminuindo sua 
	 * transpar�ncia.
	 * 
	 */
	realize: function() {
		game.mainScene.draw();
		
		this.alpha = this.alpha - this.speed;
		this.context.globalAlpha = this.alpha/100;
		
		game.oldScene.draw();
		
		this.context.globalAlpha = 1;
		
		if (this.alpha > 0 && this.alpha < this.speed * 2) {
			this.finished = true;
		}
	}
});