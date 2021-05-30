let ball = document.querySelector(".ball");
let board = document.querySelector('.board');
let boardCoordinates = board.getClientRects();
let boardTop = boardCoordinates[0].top;
let boardBottom = boardCoordinates[0].bottom;
let boardLeft = boardCoordinates[0].left;
let boardRight = boardCoordinates[0].right;
let x=(Math.floor(Math.random() * (10 - 1)) + 1)%2==0?true:false;
let y=(Math.floor(Math.random() * (10 - 1)) + 1)%2==0?false:true;
let paddleLeft = document.querySelector(".left");
let paddleRight = document.querySelector(".right");
let leftPlayesLife = 3;
let rightPlayesLife = 3;
// user input listener
document.addEventListener("keydown", function(e){
	// console.log(e)
	if(e.key==="w"){
		movePaddle(paddleLeft,-window.innerHeight*0.1);
	}
	else if (e.key==="s"){
		movePaddle(paddleLeft,window.innerHeight*0.1);		
	}
	else if(e.key==="ArrowUp"){
		movePaddle(paddleRight,-window.innerHeight*0.1);
	} else if (e.key==="ArrowDown"){
		movePaddle(paddleRight,window.innerHeight*0.1);		
	}
});
function movePaddle (cPaddle,change) {
	let cPaddleBounds = cPaddle.getClientRects();
	let cPaddleTop = cPaddleBounds[0].top;
	let cPaddleBottom = cPaddleBounds[0].bottom;
	// console.log(cPaddleTop,boardTop)
	if(cPaddleTop+change>=boardTop && cPaddleBottom+change<=boardBottom){
		cPaddle.style.top = cPaddleBounds[0].top+change+"px";
	}
}
function setColor (idx) {
	let allocation = document.querySelectorAll(".fa-heart");
	console.log(allocation)
	allocation[idx].style.color = "#0d1137";
}
function resetGame () {
	ball.style.top = window.innerHeight*0.45+"px";
	ball.style.left = window.innerWidth*0.5+"px";
	requestAnimationFrame(moveBall);
}


function moveBall () {
	let ballCoordinates = ball.getClientRects()
	let ballTop = ballCoordinates[0].top;
	let ballBottom = ballCoordinates[0].bottom;
	let ballLeft = ballCoordinates[0].left;
	let ballRight = ballCoordinates[0].right;


	// check if colloided with any playes boundary
	let hasTochLeft = ballLeft<boardLeft;
	let hasTochRight = ballRight>boardRight;
	if(hasTochRight||hasTochLeft){
		
		if(hasTochLeft){
			leftPlayesLife--;
			setColor(leftPlayesLife);
			if(leftPlayesLife==0){
				alert("GameOver Player 🅱 won 🔥🔥");
				location.reload();
			} else {
				return resetGame();
			}
		}

		else{
			rightPlayesLife--;
			setColor(rightPlayesLife+3);
			if(rightPlayesLife==0){
				alert("GameOver Player 🅰 won 💥💥");
				location.reload();
			} else {
				return resetGame();
			}	
		} 
	}
	
	// is ball in bound
	if(ballTop<=boardCoordinates[0].top || ballBottom>=boardCoordinates[0].bottom){
		// handle vertical bound
		y= !y;
	}

	// if(ballLeft<=boardCoordinates[0].left || ballRight>=boardCoordinates[0].right){
	// 	// handle horizotal bound
	// 	x= !x;
	// }
	
	// *****************************collosion****************************
	let leftPaddelBounds = paddleLeft.getClientRects()[0];
	let rightPaddleBounds = paddleRight.getClientRects()[0];
	if(ballLeft<=leftPaddelBounds.right&&ballRight>=leftPaddelBounds.left&&ballTop+40>=leftPaddelBounds.top&&ballBottom-40<=leftPaddelBounds.bottom){
		x=!x;
	}
	if(ballLeft<=rightPaddleBounds.right&&ballRight>=rightPaddleBounds.left&&ballTop+40>=rightPaddleBounds.top&&ballBottom-40<=rightPaddleBounds.bottom){
		x=!x;
	}

	// *****************************collosion****************************



	console.log(ballCoordinates[0].x,ballCoordinates[0].y,)
	ball.style.top = y===true?ballTop+4+"px":ballTop-4+"px";
	ball.style.left = x===true?ballLeft+6+"px":ballLeft-6+"px";
	
	requestAnimationFrame(moveBall);

}
requestAnimationFrame(moveBall)