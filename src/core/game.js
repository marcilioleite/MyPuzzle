/**
 * Objeto b�sico de um Jogo. 
 * 
 * Cont�m as fun��es update e render, start e
 * binds para eventos de teclado e mouse.
 * 
 */
var Game = Class.extend({
	
	/**
	 * Construtor
	 * 
	 * @param canvas onde o jogo ser� pintado.
	 */
	init: function(canvas) {
		// Canvas onde o jogo � pintado
		this.canvas = canvas;
		
		// Context usado para pintura no Canvas
		this.context = canvas.getContext("2d");

		// Buffer de Imagens carregadas
		this.gfx = new Array();

		// Tempo passado desde o in�cio do Jogo
		this.elapsedTime = 0;
		
		// Tempo de anima��o. Define a velocidade das anima��es
		this.animateTime = 0;
		
		// Cenas pertencentes ao Jogo
		this.scenes = new Array();
		
		// Cena principal (a que ser� pintada) no Jogo
		this.mainScene = null;
		
		// Cena trocada pela principal
		this.oldScene = null;
		
		// Transi��o entra a Cena antiga e principal
		this.transition = null;
	},
		
	/**
	 * Carrega uma ou v�rias imagens a serem usadas
	 * no Jogo. 
	 * 
	 * @param images Array com os paths das imagens
	 * 			a serem carregadas para o buffer.
	 */
	preload: function(images) {
		var thatGame = this;
		loadGfx(images, function(imgs) {
			thatGame.gfx = imgs;
		});
	},
	
	/**
	 * Adiciona uma Cena ao array de Cenas do Jogo.
	 * 
	 * Se a Cena principal estiver nula, assina a
	 * Cena rec�m adicionada a ela.
	 * 
	 * @param scene Cena adicionada
	 * 
	 */
	addScene: function(scene) {
		scene.context = this.context; // atualiza o context de pintura
		this.scenes.push(scene);
		if (this.mainScene == null) {
			this.mainScene = scene;
		}
	},
	
	/**
	 * 
	 * Troca a Cena principal.
	 * 
	 * @param id Id da Cena que assumir� o lugar da
	 * 			  principal.
	 * 
	 * @param trs Transi��o entre as cenas.
	 */
	enterScene: function(id, trs) {
		if (trs) {
			trs.context = this.context;
			this.transition = trs;
		}
		
		for (var scn = 0; scn < this.scenes.length; scn++) {
			if (this.scenes[scn].id === id) {
				this.oldScene = this.mainScene;
				this.mainScene = this.scenes[scn];
			}
		}
	},
	
	/**
	 * Fun��o Update. 
	 * 
	 * 	Respons�vel pela atualiza��o da l�gica do Jogo.
	 * 
	 */
	update: function() {
		this.mainScene.update();
	},
	
	/**
	 * Fun��o Draw.
	 * 	
	 * 	Respons�vel pela renderiza��o de gr�ficos do Jogo.
	 * 	Pinta os Sprites, Textos e Backgrounds na tela.
	 * 
	 */
	draw: function() {
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

		if (this.transition != null && !this.transition.finished) {
			this.transition.realize();
		} else {
			if (this.transition != null) {
				this.transition = null;
				this.oldScene = null;
			}
			this.mainScene.draw();
		}
	},

	/**
	 * Fun��o Start.
	 * 	
	 * 	Inicia o Loop de execu��o do Jogo utilizando
	 * 	requestAnimFrame(). Aqui s�o chamadas as fun��es
	 * 	Update e Draw, o que significa que o Jogo � 
	 * 	atualizado e renderizado a cada itera��o.
	 * 
	 */
	start: function() {
		var thatGame = this;
		(function animloop() {
			requestAnimFrame(animloop);
			thatGame.update();
			thatGame.draw();
			
			this.elapsedTime = parseInt((new Date().getTime()-this.elapsedTime)/1000);
			this.animateTime = parseInt((new Date().getTime()-this.animateTime)/100);
		})();
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
		if (!this.transition) {
			this.mainScene.keyUp(keyCode);
		}
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
		if (!this.transition) {
			this.mainScene.keyDown(keyCode);			
		}
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
		if (!this.transition) {
			this.mainScene.mouseUp(x, y);
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
		if (!this.transition) {
			this.mainScene.mouseDown(x, y);
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
		if (!this.transition) {
			this.mainScene.mouseMove(x, y);
		}
	}
});