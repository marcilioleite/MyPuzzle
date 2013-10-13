/**
 * Tarefa realizada entre determinados intervalos
 * de tempo, seja pelo Jogo, Cena, Sprite ou até
 * Projétil.
 * 
 */
var ScheduledTask = Class.extend({
	
	/**
	 * Construtor.
	 * 
	 * @param interval Intervalo de tempo.
	 */
	init: function(interval, objects) {
		// Intervalo
		this.interval = interval;
		
		// Objetos a serem manipulados pela ação.
		this.objects = objects;
		
		// Tempo da última execução
		this.lastExecutionTime = 0;
	},
	
	/**
	 * Verifica se está na hora e, caso esteja,
	 * chama a função todo(), que realiza a
	 * tarefa desejada.
	 */
	run: function(currentTime) {
		if (currentTime + this.interval >= lastExecutionTime) {
			this.todo();
		}
	},
	
	/**
	 * Função realizada  
	 * 
	 */
	todo: function() {
	}
	
});