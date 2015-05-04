/*jslint plusplus: true */
var reqAnimFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                              window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;



var arenaWidth = 600;
var arenaHeight = 400;

function Tower(posX, posY, power) {
	'use strict';
	this.posX = posX;
	this.posY = posY;
	this.power = power;
}


function Animation(url, length, width, height, currentCanvas) {
	'use strict';
	var that, image, tabOffScreenCanvas;
	this.tabOffScreenCanvas = [];
	this.width = width;
	this.height = height;
	this.length = length;
	this.currentCanvas = currentCanvas;
	this.ready = false;
	this.cpt = 0;
	image = new Image();
	image.src = url;
	that = this;
	image.onload = function () {
		that.ready = true;
		var offScreenCanvas, offScreenContext, i;
		for (i = 0; i < that.length; i++) {
			offScreenCanvas = document.createElement("canvas");
			offScreenCanvas.width = that.width;
			offScreenCanvas.height = that.height;
			offScreenContext = offScreenCanvas.getContext("2d");
			offScreenContext.drawImage(image, 0, i * that.height, that.width, that.height, 0, 0, that.width, that.height);
			that.tabOffScreenCanvas.push(offScreenCanvas);
		}
	};
}

Animation.prototype.clear = function (x, y) {
	'use strict';
	this.currentCanvas.clearRect(x, y, this.width, this.height);
};
Animation.prototype.update = function () {
	'use strict';
    if (tics % 5 === 1) {
        this.cpt = (this.cpt + 1) % this.length;
    }
};
Animation.prototype.draw = function (x, y) {
	'use strict';
    if (this.ready) {
        this.currentCanvas.drawImage(this.tabOffscreenCanvas[this.cpt], x, y);
    }
};
	
function clearGame() {
	'use strict';
}


//Gestion des touches du clavier
////////////////////////////////
function updateKeys() {
	'use strict';

}

//Mise a jour du jeu
////////////////////
function updateGame() {
	'use strict';
}

//Affichage du jeu
//////////////////
function drawGame() {
	'use strict';

}

//Boucle de jeu
///////////////
function mainloop() {
	'use strict';
	clearGame();
	updateKeys();
	updateGame();
	drawGame();
}

//Definition de requestANimationFrame
/////////////////////////////////////
function recursiveAnim() {
	'use strict';
	mainloop();
	reqAnimFrame(recursiveAnim);
}

//Initialisation des differents canevas
///////////////////////////////////////
function init() {
	'use strict';
	var divArena, canArena, ctxArena;

	//Creation d'une div pour la zone de jeu
	divArena = document.createElement("div");
	divArena.id = "arena";
	document.body.appendChild(divArena);
	//Creation du canvas
    canArena = document.createElement("canvas");
    canArena.id				= "canArena";
    canArena.style.height	= arenaHeight;
    canArena.style.width	= arenaWidth;
    ctxArena = canArena.getContext("2d");
    divArena.appendChild(canArena);
	
	
	
	//On entre dansla boucle de jeu
	reqAnimFrame(recursiveAnim);
}
