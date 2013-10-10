/**
 * Pré-carrega arquivos de Imagens. 
 * 
 * @param sources paths
 * @param callback
 */
function loadGfx(sources, callback) {
	var images = new Array();
	var loaded = 0;
	var cntImg = sources.length;
	
	for (var i = 0; i < cntImg; i++) {
		var src = sources[i];
		images[src] = new Image();
		images[src].onload = function() {
			if (++loaded >= cntImg) {
				callback(images);
			}
		};
		images[src].src = src;
	}
}
