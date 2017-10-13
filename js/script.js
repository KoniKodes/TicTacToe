$(document).ready(function () {
     'use strict';

var space = document.getElementsByClassName("space"),
    symbX = "X",
	symbO = "O",
	playrVal = -1,
    cmpVal = 1,
	statVal = 0,	
	boardMatrix=[
	// Horizontal Wins
	  [0,1,2],[3,4,5],[6,7,8],
	// Vertical Wins
	  [0,3,6],[1,4,7],[2,5,8],
	// Diagonal Wins
	  [0,4,8],[2,4,6]
	  ],
	status = [0,0,0,0,0,0,0,0,0],
	scores = [0,1,2,3,4,5,6,7,8],
	turnCount = 0,
	gameOn = true,
	place,
	playr = symbO,
	cmp = symbX,
	tie,
	curplayr = playr,
	winner = false,
	winVal = 0;

	
// Initial Game SetUp
function init() {
// click Flower but not spaces
	  $("#marker").prop("disabled", false);
	  $("#board").prop("disabled", true);
	  $("#msg2").text(" ");
	  turnCount = 0;
	  gameOn = true;

	choices();
}	// end init
									
// Initial Choices
function choices(){									
// if bird of paradise clicked
	  $(".bp").on("click", function(){
	  $("#msg").text("You will play with the Bird Of Paradise as your Marker");
	  $("#msg1a").text("The computer will play with the Plumeria Flower as its Marker");
	  $("#msg1").text("Please click on the space to place your marker");  
	  playr = symbX;
	  cmp = symbO;
	  curplayr = playr;
	  console.log("Player is " + playr);
     }); 

// if plumeria clicked
	$(".pl").on("click", function(){
	  $("#msg").text("You will play with the Plumeria Flower as your Marker");
	  $("#msg1a").text("Computer will play with the Bird of Paradise as its Marker");
	  $("#msg1").text("Please click on the space to place your marker");
	  playr = symbO;
	  cmp = symbX;
	  curplayr = playr;
	  console.log("Player is " + playr);
	  });
}  // end choices 

// Attach Marker to GameBoard for Player 
	$(".space").on("click", function(){
	place = $(this).attr("id"); 
	curplayr = playr;
    playGame(curplayr, place);
	}); // end Attach Marker for Player

// Announce Winning Status
function winnr(curplayr, a, d, e, f, x){
           if (turnCount === 9 && winner === false && curplayr === "tie"){
		 	tiesound.play();
			 $("#msg").text("We Have a Tie Game!");	
			 $("#msg1").text("Preparing for next game");
			 console.log("Tie Game!");	
		  }  
	
	    $('*[id="' + d + '"]').addClass("hilite");
		$('*[id="' + e + '"]').addClass("hilite");
		$('*[id="' + f + '"]').addClass("hilite");	
			  
	
 	   if (curplayr === cmp){
	   console.log("Winner is " + curplayr);
		  cmpsound.play();
		  $("#msg").text("Computer is the Winner of This Game!");		  
		 $("#msg1a").text("Preparing for next game");
		 
	     }else if (curplayr === playr){
 	  
		  playrsound.play();
		  $("#msg").text("Congratulations!");
		  $("#msg1a").text("You are the Winner of This Game!");	
		  $("#msg1a").text("Preparing for next game");
		  	  
		  }

			setTimeout(function() {
			reset();
	     }, 8000); 
		gameOn = false;
		return;
		reset();   
} // end winnr()	
	
// Player Placement if GameOn, Board is not full and place is not taken
function playGame(curplayr, place){
	if (gameOn === false){
	reset();
	}
	 if (turnCount === 9){
	 checkFull();
	 } else {
	$("#msg").text("");
	$("#msg1a").text("");
	$("#msg1").text("");
	$("#msg2").text("");
	$(".choice").hide();

// Is space taken?
	if ($('*[id="' + place + '"]').hasClass("taken")){
	$("#msg1a").text("Please choose a space that has not been taken");
	return;
	} else {	
		  if (curplayr === playr){
	       statVal = playrVal;
	     }else{
	        statVal = cmpVal;
	     }
	 status[place] = statVal;
	 
// Then place marker
	     if (curplayr == playr && playr != symbO) {
	         $('*[id="' + place + '"]').addClass("brd taken");
			 scores[place] = ("X");
	         console.log("Space " + place + " has added the Bird of Paradise Class");
			 
	     } else {
	        $('*[id="' + place + '"]').addClass("plm taken"); 
			scores[place] = ("O");
	        console.log("Space " + place + " has added the Plumeria Class");
			
	     } turnCount = turnCount + 1;

		 
	     if (turnCount > 3){
	   winCheck(curplayr);
	 }

	 $("#msg1a").text("");
	 curplayr = cmp;
	 statVal = cmpVal;
	 place = "";
	 comp(curplayr, place);
	 } 
}

}// end playGame()


// Computer Turn to choose placement 
	 function comp(curplayr, place){
	  if (scores[4] === 4){
	  place = 4;
	  } else if (scores[0] === 0){
      place = 0;
	  } else if ((scores[0] !== 0 && scores[2] !== 2 && scores[1] === 1) && status[0] === status[2]  || (scores[4] !== 4 && scores[7] !== 7 && scores[1] === 1) &&
	             status[4] === status[7]){
     console.log("space 1 is " + scores[1]);
	 place = 1;
	 }
 	 else if ((scores[0] !== 0 && scores[1] !== 1 && status[0] === status[1] && scores[2] === 2) || (scores[4] !== 4 && scores[6] !== 6 && status[4] === status[6]  && scores[2] === 2) || 
	          (scores[5] !== 5 && scores[8] !== 8 && status[5] === status[8] && scores[2] === 2) ){
     console.log("space 2 is " + scores[2]);
	 place = 2;
	 } 	
	 else if ((scores[0] !== 0 && scores[3] !== 3 && status[0] === status[3] && scores[6] === 6) || (scores[2] !== 2 && scores[4] !== 4 && status[2] === status[4] && scores[6] === 6) ||
	          (scores[7] !== 7 && scores[8] !== 8 && status[7] === status[8] && scores[6] === 6)) {
     console.log("space 6 is " + scores[6]);
	 place = 6;
	 }
	 else if ((scores[4] !== 4 && scores[0] !== 0 && status[4] === status[0] && scores[8] === 8) || (scores[2] !== 2 && scores[5] !== 5 && status[2] === status[5] && scores[8] === 8) ||
	          (scores[6] !== 6 && scores[7] !== 7 && status[6] === status[7] && scores[8] === 8)) {
     console.log("space 8 scores is " + scores[8]);
	 place = 8;
	 }
	 else if ((scores[0] !== 0 && scores[6] !== 6 && status[0] === status[6] && scores[3] === 3) || (scores[4] !== 4 && scores[5] !== 5 && status[4] === status[5] && scores[3] === 3)){
     console.log("space 3 is " + scores[3]);
	 place = 3;
	 } 
	 else if ((scores[2] !== 2 && scores[8] !== 8 && status[2] === status[8] && scores[5] === 5)|| (scores[4] !== 4 && scores[3] !== 3 && status[4] === status[3] &&  scores[5] === 5)){
     console.log("space 5 is " + scores[5]);
	 place = 5;
	 } 
 	 else if ((scores[1] !== 1 && scores[4] !== 4 && status[1] === status[4] && scores[7] === 7)|| (scores[6] !== 6 && scores[8] !== 8 && status[6] === status[8] && scores[7] === 7)){
     console.log("space 7 is " + scores[7]);
	 place = 7;
	 } 
	 else {
	  for (var i = 0; i < scores.length; i ++){
	   var newList = [];
	 if (scores[i] !== "X" && scores[i] !== "O"){
	 
	  newList.push(i);
	  place = newList[Math.floor(Math.random() * newList.length)];
}
}
}
	     if (cmp != symbO) {
	         setTimeout(function() {
	           $('*[id="' + place + '"]').addClass("brd taken");
			   scores[place] = ("X");
			   winCheck(curplayr, place);
	         }, 500);
	     } else {
	        setTimeout(function() {
	           $('*[id="' + place + '"]').addClass("plm taken");
			   scores[place] = ("O"); 
			   winCheck(curplayr, place);
	     }, 500);
	     }
	 status[place] = 1;
	 	turnCount = turnCount + 1;
        winCheck(curplayr, place);
} // end cmpPlace()

// Check if Board is Full
function checkFull(turnCount){
      for (var i = 0; i < 9; i++){
         if (status[i] === 0){
         playGame(place, curplayr);
		  gameOn = true;
		 
		 }else if (status[i] === 9){
		 var winVal = 2;
		 winnr(winVal); 
      } 
   }
} // end checkFull

// Check for Winner
function winCheck(curplayr){
      for (var i = 0; i < boardMatrix.length; i++) {

	   var a, b, c, d, e, f, x;
	   a = scores[boardMatrix[i][0]];
	   b = scores[boardMatrix[i][1]];
	   c = scores[boardMatrix[i][2]];

	   
      if (a === b && a === c && a !== 0){
	 console.log("Current a = " + a);
	   d = [boardMatrix[i][0]];
	   e = [boardMatrix[i][1]];
	   f = [boardMatrix[i][2]];
	   x = status[boardMatrix[i][0]];

	 if (x === -1){
	 curplayr = playr;
	 } 
	 if (x === 1){
	 curplayr = cmp;
	 }  
	  winner = true;
      winnr(curplayr,a, d, e, f,x);
			  
   }else if (turnCount === 9 && winner === false){

	curplayr = "tie";
	a = "t";
	d = "t";
	e = "t";
	f = "t";
	x = "t"
	winnr(curplayr,a, d, e, f, x);
}
	 } 
} // end winCheck()



// Game Over reset Board
function reset(){
	  $("#msg").text("");
	  $("#msg1a").text("");
	  $("#msg1").text("");  
	  $(".hero").show();
	  $(".choice").show();
	  status = [0,0,0,0,0,0,0,0,0];
	  scores = [0,1,2,3,4,5,6,7,8];
	  place = "";
	  curplayr = "";
	  statVal = 0;
	  $(".space").removeClass("brd plm taken hilite");
	  gameOn = false;
     
      init();

} // end reset

init();

}); // end document
