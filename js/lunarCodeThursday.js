// This is a javascript file

//alert("Wake Up!!!!");
//Stuff from Thursday
var gameArea = document.getElementById('myGameArea');
var gameRect = gameArea.getBoundingClientRect();
var gameAreaHeight = Math.round(gameRect.bottom - gameRect.top);
var gameAreaWidth =  Math.round(gameRect.right - gameRect.left);

//alert("Hi game Area Width is " + gameAreaWidth + 
//	" and game area Height is " + gameAreaHeight);


var moonImage = document.getElementById('moon');
moonImage.style.zIndex = "0";
moonImage.style.position = "absolute";
moonImage.style.bottom = "0"; 
moonImage.style.left = "0"; 
moonImage.style.width = "100%"; 
	



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


//More Awesome Stuff from Friday

var landerX = 0;
var landerY = 0;
var landerDX = 0;
var landerDY = 0;
var landerWidth = 110;

var targetX = 0;
var targetY = 0;
var crashed = false;
var moving = false;
var id  = setInterval(frame, 40);

//for the flame
var flameX;
var flameY;

function checkForTargetWin(){
	var didIWin = false;
    //do something to check

    if( Math.abs(landerX - targetX) < 15){  // look at x
    	if(((targetY + 5) - (landerY + 80)) < 10){  //look at y
    		if(Math.abs(landerDY) < 5){  // look at speed...
    			didIWin = true;
    		}
    	}
    }
    return didIWin;
}

function setFlamePosition(){
	flameX = landerX + 40;
	flameY = landerY + 80;
	flameImage.style.top = flameY + 'px';
    flameImage.style.left = flameX + 'px';
}


function showFlame(){
   flameImage.style.display = "block";
}

function hideFlame(){
	flameImage.style.display = "none";
}


function setLanderAndTarget(){

    crashed = false;
	landerImage.style.display = "block";
	blowUpImage.style.display = "none";

    //Code to set the Lander...
	landerY = 0;
	landerX = Math.round(gameAreaWidth/2) - Math.round(landerWidth/2);
	landerImage.style.left = landerX + 'px';
	landerImage.style.top = landerY + 'px';
	setFlamePosition();

	//Code to set the target
	targetY = gameAreaHeight - 95;
	targetX = Math.round(Math.random() * (gameAreaWidth - landerWidth));

	targetImage.style.left = targetX + 'px';
	targetImage.style.top = targetY + 'px';
}



function resetAnimation(){
	landerDY = 0;
	landerDX = 0;
	setLanderAndTarget();
}


function startAnimation(){
	moving = true;
	landerDY = 6;
	
}



function moveLander(){
	//move 

	if(moving === true){

		if(checkForTargetWin() === false){
			landerX += landerDX;
			landerY += landerDY;
			//added to accerlerate the descent
			landerDY += 1;

			//Check X location

			if( landerX <= 0  && landerDX < 0){
				landerX = 0;
				landerDX = 0;
			}

			if( (landerX > gameAreaWidth - landerWidth) && landerDX > 0){
				landerX = gameAreaWidth - landerWidth;
				landerDX = 0;
			}

			//This checks Y location
			if(landerY >= gameAreaHeight - landerWidth){
				landerY = gameAreaHeight - landerWidth;
		         
		         //change to handle a crash
		         if(landerDY > 4) {
		         	crashed = true;
		         	landerDX = 0;
		         }

				landerDY = 0;
				landerDX = 0;

			}

		    //drawing based on crash state...
		    if(crashed === false){
		    	//draw
				landerImage.style.left = landerX + 'px';
				landerImage.style.top = landerY + 'px';
				setFlamePosition();  //***** TO MOVE THE FLAME


		    } else {
		    	moving = false;
		        landerImage.style.display = "none";
		        hideFlame();
		    	blowUpImage.style.left = landerX + 'px';
		    	blowUpImage.style.top = landerY + 'px';
		    	blowUpImage.style.display = "block";

		    }
		} else {
			flameImage.style.display = "none";
			moving = false;
			setTimeout(doTheWinAlert, 750);

			
		}
	}
}

function doTheWinAlert(){
	alert("Hey you won -- nice landing!");
}


function frame() {

   //console.log("hi from frame");
   moveLander();
}




setLanderAndTarget();
//Temporary Test of flame
//showFlame();

document.getElementById('resetButton').onclick = resetAnimation;
document.getElementById('startButton').onclick = startAnimation;

//anonymous function
document.onkeydown = function(e){
//alert("hi you pressed the key with code " + e.keyCode);
   //37 = left
   //38 = up
   //39 = right
   //40 = down
   //32 = space bar

   //protection
   //if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
   //     e.preventDefault();
   
   // }

    switch(e.keyCode){

    	// spacebar
    	case 32:
    		//alert("You pushed the spacebar");
    		crashed = false;
    		resetAnimation();
    		startAnimation();	
    		break;

    	//left
    	case 37:
    	   //	alert("You pushed the left arrow"); <--
    	   landerDX += -1;
    	   showFlame();
    	   break;

    	//up
    	case 38:
    	   //	alert("You pushed the up arrow");
    	   landerDY -=9;
    	   showFlame();
    	   break;

    	// right
    	case 39:
    	   	//alert("You pushed the right arrow");
    	   	landerDX += 1;
    	   	showFlame();
    		break;

    	//down..not using. right now
    	case 40:
    	   	//alert("You pushed the down arrow");
    		break;

    }

};


//On Key Up
//Another anonymous function
document.onkeyup = function(e){

   //protection
   //if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
   //    e.preventDefault();
   // }

    switch(e.keyCode){

    	case 32:
    	   	//spacebar is released
    	break;

    	case 37:
    	   	//left arrow Key is released
    	   	//landerDX = 0;
    	   	hideFlame();
    	break;

    	case 38:
    	   	//up arrow key is released
    	   	hideFlame();
    	break;

    	case 39:
    	   	//right arrow Key is released
    	   	//landerDX = 0;
    	   	hideFlame();
    	break;

    	case 40:
    	   	//down arrow key is released
    	break;



    }


};


















