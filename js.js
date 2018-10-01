var gameArr = [];

console.log("page loaded");

function game(name,platform,releaseDate,price,daysLeft){
	this.name = name;
	this.platform = platform;
	this.releaseDate = releaseDate;
	this.price = price;
	this.daysLeft = daysLeft;
}



function catchNewGame(gameName,platform,releaseDate,price){

	price ="£" + price;
	///////////////////////////////////////////////
	var countDown = moment(releaseDate,"DD-MM-YYYY");
	var now = moment().format('L');
	var daysLeft = Math.floor(countDown.diff(now,'days'));
	addNewGame(gameName,platform,releaseDate,price,daysLeft);

}


function addNewGame(gameName,platform,releaseDate,price,daysLeft){

	var newGame = new game(gameName,platform,releaseDate,price,daysLeft);
	gameArr.push(newGame);
	popGames();

}


function popGames(){

	var gameToAppend = gameArr.slice(-1)[0];

		var gameDiv = $(
			"<div id = 'gameDiv'>"+
			"<h4 id='name'>"+gameToAppend.name+"</h4>"+ " " +
			"<div class='countDownBlock'><p class='blockText text-center'>"+gameToAppend.daysLeft+"</p></div>"+
			"<h5 id='plat'>"+"("+gameToAppend.platform+")"+
			"<h5 id='release'>"+gameToAppend.releaseDate+
			"<h5 id='price'>"+gameToAppend.price+"</h5>"+		
			"<a href ='https://pricespy.co.uk/search?q="+gameToAppend.name+gameToAppend.platform+"'"+"><h5 id='comparePrice'>Find Cheapest Deals</h5></a>"+							
			"</div>"  		
			);
	
		$(".innerPortal").append(gameDiv);

	


}


$("#addGameBtn").on('click',function(){
	
	$(".modalShow").removeClass().addClass("modalAdd");
	let gameName = document.getElementById("gameName").value;
	let platform = document.getElementById("gamePlat").value;
	let releaseDate = document.getElementById("gameRelease").value;
	let price = document.getElementById("gamePrice").value;

	catchNewGame(gameName,platform,releaseDate,price)
});


$(".plusGame").on('click',function(){
	$(".modalAdd").removeClass().addClass("modalShow");
})


