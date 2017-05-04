// lunar.js



var gameArea = document.getElementById('myGameArea');
var gameRect = gameArea.getBoundingClientRect();
var gameAreaWidth = gameRect.right - gameRect.left;
var gameAreaHeight = gameRect.bottom - gameRect.top;

var landerImage = document.getElementById('lander');
//alert("landerImage is " + landerImage);
landerImage.style.position = "absolute";
landerImage.style.zIndex = "1";

var targetImage = document.getElementById('target');
targetImage.style.position = "absolute";
targetImage.style.zIndex = "0";

var flameImage = document.getElementById('flame');
flameImage.style.position = "absolute";
flameImage.style.zIndex = "0";
flameImage.style.display = "none";

var blowUpImage = document.getElementById('blowup');
blowUpImage.style.position = "absolute";
blowUpImage.style.zIndex = "1";
blowUpImage.style.display = "none";

var landerDY = 6;
var landerDX = 0;
var landerX = 0;
var landerY = 0;
var landerWidth = 110;
var targetX = 0;
var targetY = 0;
var flameX = 0;
var flameY = 0;

var id;


function setFlamePosition(){
	//Set the Flame
    flameY = landerY + 80;
    flameX = landerX + 40;
    flameImage.style.top = flameY + 'px';
    flameImage.style.left = flameX + 'px';

}



function setLanderAtTopAndTargetAtBottom(){
    //alert("Hello from top of setLanderAtTop");
    //landerY = gameRect.top ;

    blowUpImage.style.display = "none";
    landerImage.style.display = "block";
    landerY = 0;
    landerDX = 0;
    landerDY = 6;
    //alert("in setLanderAtTop landerY is " + landerY);
    landerImage.style.top = landerY + 'px';

    //landerX = gameRect.left + Math.round(gameAreaWidth/2);
    //landerX = gameRect.left ;
    //landerX = 0;
    landerX = Math.round(gameAreaWidth/2) - Math.round(landerWidth/2);
   // alert("in setLanderAtTop landerX is " + landerX);
    landerImage.style.left = landerX + 'px';

    //Set the Target
    targetY = gameAreaHeight - 75;
    targetX = Math.round(Math.random() * (gameAreaWidth-110)) + 55;
    targetImage.style.top = targetY + 'px';
    targetImage.style.left = targetX + 'px';

    //Set the Flame
    setFlamePosition();
   








   

}


/*
function checkImageLoad() {
    if (document.getElementById('lander').complete == true){
    	console.log("lunar lander Loaded!");
    	setLanderAtTopAndTargetAtBottom();
    }
}

*/

function switchLanderImages(){

    blowUpImage.style.left = landerX + 'px';
    blowUpImage.style.top = landerY + 'px';

    landerImage.style.display = "none";
    blowUpImage.style.display = "block";


}

function checkForWin(){
	var didIWin = false;

	if(Math.abs(landerX - targetX) < 10){
		if (targetY - (landerY + 80) < 10){
			if(Math.abs(landerDY) < 5){
				didIWin = true;
			}
		}
	}

	return didIWin;
}



function frame() {
	    //console.log("At top of frame");
        if (landerY >= gameAreaWidth - 20) {
        	//alert("landerY is at bottom");
        	//console.log("LANDER Y is TOO HIGH>>>>> STOP");
            clearInterval(id);
            landerDY = 0;
            switchLanderImages();
        } else {
        	if(checkForWin() == true) {
        		clearInterval(id);
                landerDY = 0;
                alert("Congratulations you win")

        	} else {
	            landerY += landerDY;
	            landerDY += 1;
	            //console.log("In Frame Lander Y is.. " + landerY); 
	            landerX += landerDX

	            landerImage.style.left = landerX + 'px'; 
	            landerImage.style.top = landerY + 'px'; 
	            setFlamePosition();  
        	}
        }
}

function startAnimation(){
 id = setInterval(frame, 50);
 landerDY = 6;
}

function resetAnimation(){
  clearInterval(id);
  landerDY = 0;
  setLanderAtTopAndTargetAtBottom();
}

function showFlame(){
	flameImage.style.display = "block";
}

function hideFlame(){
	flameImage.style.display = "none";
}



//- Using a function pointer:
document.getElementById("startButton").onclick = startAnimation;

//- Using a function pointer:
document.getElementById("resetButton").onclick = resetAnimation;

// -- set up for grabbing key strokes
document.onkeydown = function(e) {

	 if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
    
    switch (e.keyCode) {
    	//Spacebar
    	case 32:
    		//alert("spacebar");
    		startAnimation();
    		break;

    	//Left
        case 37:
            //alert('left');
            landerDX += -1;
            break;

         //UP   
        case 38:
			showFlame();
			landerDY -= 9;
            break;

         //Right   
        case 39:
            //alert('right');
            landerDX += 1;
            break;

        case 40:
            //alert('down');
            break;

    }
};


document.onkeyup = function(e) {
    switch (e.keyCode) {
        case 37:
            //alert('left');
            break;
        case 38:

        	hideFlame();
           
            break;
        case 39:
            //alert('right');
            break;
        case 40:
            //alert('down');
            break;
    }
};


setLanderAtTopAndTargetAtBottom();



   