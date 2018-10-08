var gameArr = [];


console.log("page loaded");

function game(name,platform,releaseDate,priority,daysLeft){
	this.name = name;
	this.platform = platform;
	this.releaseDate = releaseDate;
	this.priority = priority;
	this.daysLeft = daysLeft;
}



function catchNewGame(gameName,platform,releaseDate,priority){

	///////////////////////////////////////////////
	var countDown = moment(releaseDate,"DD-MM-YYYY");
	var now = moment().format('L');
	var daysLeft = Math.floor(countDown.diff(now,'days'));
	addNewGame(gameName,platform,releaseDate,priority,daysLeft);

}


function addNewGame(gameName,platform,releaseDate,priority,daysLeft){

	var newGame = new game(gameName,platform,releaseDate,priority,daysLeft);
	gameArr.push(newGame);
	popGames();

}


function popGames(){

	if(gameArr.length == 0){
		$(".innerPortal").find("#gameDiv").not(".plusGame").remove();
	}else{

	var gameToAppend = gameArr.slice(-1)[0];

		var gameDiv = $(
			"<div id = 'gameDiv'>"+
			"<h4 id='name'>"+gameToAppend.name+"</h4>"+ " " +
			"<div class='countDownBlock'><p class='blockText text-center'>"+gameToAppend.daysLeft+"</p></div>"+
			"<h5 id='plat'>"+"("+gameToAppend.platform+")"+
			"<h5 id='release'>"+gameToAppend.releaseDate+
			"<h5 id='priority'>"+gameToAppend.priority+"</h5>"+		
			"<a href ='https://pricespy.co.uk/search?q="+gameToAppend.name+gameToAppend.platform+"'"+"><h5 id='comparePrice'>Find Cheapest Deals</h5></a>"+							
			"</div>"  		
			);
	
		$(".innerPortal").append(gameDiv);
}
removeGame();
}


$("#addGameBtn").on('click',function(){
	

	$(".modalShow").removeClass().addClass("modalAdd");
	let gameName = document.getElementById("gameName").value;
	let platform = document.getElementById("gamePlat").value;
	let releaseDate = document.getElementById("gameRelease").value;
	let priority = document.getElementById("gamePriority").value;

	catchNewGame(gameName,platform,releaseDate,priority)
});


$(".plusGame").on('click',function(){
	$(".modalAdd").removeClass().addClass("modalShow");
});

//Form validation for game name
(function(){
	$('#gameName').on('keyup change',function(){

		var empty = false;
		$('form > input').each(function(){
			if($(this).val()==''){
				empty = true;
			}
		});


		if (empty){
			$("#addGameBtn").attr('disabled', 'disabled');

		}else{

		$("#addGameBtn").removeAttr('disabled');
		}
	});
})();


//remove game from list

function removeGame(){
	$("#gameDiv").on('dblclick',function(){
		let gameName = $(this).children("#name").html();

		var index = gameArr.findIndex(x => x.name == gameName);
		gameArr.splice(index,1);

	});
}



  





