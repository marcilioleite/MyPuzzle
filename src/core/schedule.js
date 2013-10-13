/**
 * Tarefa realizada entre determinados intervalos
 * de tempo, seja pelo Jogo, Cena, Sprite ou at�
 * Proj�til.
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
		
		// Objetos a serem manipulados pela a��o.
		this.objects = objects;
		
		// Tempo da �ltima execu��o
		this.lastExecutionTime = 0;
	},
	
	/**
	 * Verifica se est� na hora e, caso esteja,
	 * chama a fun��o todo(), que realiza a
	 * tarefa desejada.
	 */
	run: function(currentTime) {
		if (currentTime + this.interval >= lastExecutionTime) {
			this.todo();
		}
	},
	
	/**
	 * Fun��o realizada  
	 * 
	 */
	todo: function() {
	}
	
});