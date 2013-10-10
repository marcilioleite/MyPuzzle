/**
 * Objeto básico de um Jogo. 
 * 
 * Contém as funções update e render, start e
 * binds para eventos de teclado e mouse.
 * 
 */
var Game = Class.extend({
	
	/**
	 * Construtor
	 * 
	 * @param canvas onde o jogo será pintado.
	 */
	init: function(canvas) {
		// Largura do Jogo na tela.
		this.width = canvas.width;
		
		// Altura do Jogo na tela.
		this.height = canvas.height;
		
		// Context usado para pintura no Canvas
		this.context = canvas.getContext("2d");

		// Buffer de Imagens carregadas
		this.gfx = new Array();

		// Tempo em que o Jogo foi iniciado
		this.startTime = 0;
		
		// Tempo passado desde o início do Jogo
		this.elapsedTime = 0;
		
		// Tempo de animação. Define a velocidade das animações
		this.animateTime = 0;
		
		// Cenas pertencentes ao Jogo
		this.scenes = new Array();
		
		// Cena principal (a que será pintada) no Jogo
		this.mainScene = null;
		
		// Cena trocada pela principal
		this.oldScene = null;
		
		// Transição entra a Cena antiga e principal
		this.transition = null;
	},
		
	/**
	 * Carrega uma ou várias imagens a serem usadas
	 * no Jogo. 
	 * 
	 * @param images Array com os paths das imagens
	 * 			a serem carregadas para o buffer.
	 */
	preload: function(images) {
		var thatGame = this;
		loadGfx(images, function(imgs) {
			thatGame.gfx = imgs;
			thatGame.onload();
		});
	},
	
	/**
	 * Adiciona uma Cena ao array de Cenas do Jogo.
	 * 
	 * Se a Cena principal estiver nula, assina a
	 * Cena recém adicionada a ela.
	 * 
	 * @param scene Cena adicionada
	 * 
	 */
	addScene: function(scene) {
		scene.context = this.context; // atualiza o context de pintura
		if (scene.width === 0) {
			scene.width = this.width;
		}
		if (scene.height === 0) {
			scene.height = this.height;
		}
		this.scenes.push(scene);
		if (this.mainScene == null) {
			this.mainScene = scene;
		}
	},
	
	/**
	 * 
	 * Troca a Cena principal.
	 * 
	 * @param id Id da Cena que assumirá o lugar da
	 * 			  principal.
	 * 
	 * @param trs Transição entre as cenas.
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
	 * Função Update. 
	 * 
	 * 	Responsável pela atualização da lógica do Jogo.
	 * 
	 */
	update: function() {
		this.mainScene.update();
	},
	
	/**
	 * Função Draw.
	 * 	
	 * 	Responsável pela renderização de gráficos do Jogo.
	 * 	Pinta os Sprites, Textos e Backgrounds na tela.
	 * 
	 */
	draw: function() {
		this.context.clearRect(0, 0, this.width, this.height);

		if (this.transition != null && !this.transition.finished) {
			this.transition.realize();
		} else {
			if (this.transition) {
				this.transition = null;
				this.oldScene = null;	
			}
			this.mainScene.draw();
		}
	},

	/**
	 * Função Start.
	 * 	
	 * 	Inicia o Loop de execução do Jogo utilizando
	 * 	requestAnimFrame(). Aqui são chamadas as funções
	 * 	Update e Draw, o que significa que o Jogo é 
	 * 	atualizado e renderizado a cada iteração.
	 * 
	 */
	start: function() {
		this.startTime = parseInt(new Date().getTime());
		var thatGame = this;
		
		bindEvents(); // Binda eventos de mouse e teclado.
		(function animloop() {
			requestAnimFrame(animloop);
			thatGame.update();
			thatGame.draw();
			thatGame.elapsedTime = parseInt(new Date().getTime()-thatGame.startTime);
			thatGame.animateTime = parseInt((new Date().getTime()-thatGame.startTime)/100);
		})();
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
		if (!this.transition) {
			this.mainScene.keyUp(keyCode);
		}
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
		if (!this.transition) {
			this.mainScene.keyDown(keyCode);			
		}
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
		if (!this.transition) {
			this.mainScene.mouseUp(x, y);
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
		if (!this.transition) {
			this.mainScene.mouseDown(x, y);
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
		if (!this.transition) {
			this.mainScene.mouseMove(x, y);
		}
	}
});