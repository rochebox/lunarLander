// This is a javascript file

//alert("Wake Up!!!!");

var gameArea = document.getElementById('myGameArea');
var gameRect = gameArea.getBoundingClientRect();
var gameAreaHeight = Math.round(gameRect.bottom - gameRect.top);
var gameAreaWidth =  Math.round(gameRect.right - gameRect.left);

alert("Hi game Area Width is " + gameAreaWidth + 
	" and game area Height is " + gameAreaHeight);


var landerImage = document.getElementById('lander');
landerImage.style.position = "absolute";
landerImage.style.zIndex = "1";

var targetImage = document.getElementById('target');
targetImage.style.position = "absolute"
targetImage.style.zIndex = "0";

var flameImage =  document.getElementById('flame');
flameImage.style.position = "absolute"
flameImage.style.zIndex = "0";
flameImage.style.display = "none";

var blowUpImage = document.getElementById('blowup');
blowUpImage.style.position = "absolute"
blowUpImage.style.zIndex = "1";
blowUpImage.style.display = "none";

