

var gameArr = [];



function game(name,platform,genre,releaseDate,priority,daysLeft,toDisplay){
	this.name = name;
	this.platform = platform;
	this.releaseDate = releaseDate;
	this.genre = genre;
	this.priority = priority;
	this.daysLeft = daysLeft;
	this.toDisplay = toDisplay;
}



function catchNewGame(gameName,platform,genre,releaseDate,priority){

	///////////////////////////////////////////////
	var countDown = moment(releaseDate,"DD-MM-YYYY");
	var now = moment().format('L');
	var daysLeft = Math.floor(countDown.diff(now,'days'));
	addNewGame(gameName,platform,genre,releaseDate,priority,daysLeft,true);

}


function addNewGame(gameName,platform,genre,releaseDate,priority,daysLeft,toDisplay){

	var newGame = new game(gameName,platform,genre,releaseDate,priority,daysLeft,toDisplay);
	gameArr.push(newGame);
	popGames();

}


function popGames(){


	for (let i = 0; i < gameArr.length; i++){
		if (gameArr[i].toDisplay == true){
	

		var gameDiv = $(
			"<div class = 'gameDiv'>"+
			"<h4 class='name'>"+gameArr[i].name+"</h4>"+ " " +
			"<div class='countDownBlock'><p class='blockText text-center'>"+gameArr[i].daysLeft+"</p></div>"+
			"<h5 class='plat'>"+"("+gameArr[i].platform+")"+
			"<h5 class='gen'>"+gameArr[i].genre+
			"<h5 class='release'>"+gameArr[i].releaseDate+
			"<h5 class='priority'>"+gameArr[i].priority+"</h5>"+		
			"<a class='compareLink' href ='https://pricespy.co.uk/search?q="+gameArr[i].name+gameArr[i].platform+"'"+"><h5 id='comparePrice'>Find Cheapest Deals</h5></a>"+							
			"<div class='expandArrow'><span class='glyphicon glyphicon-chevron-down'></span></div>"+
			"<div class='expandedSection'><div class='minimizeArrow'><span class='glyphicon glyphicon-chevron-up'></span></div></div>"+
			"</div>"  		
			);
	
		$(".innerPortal").append(gameDiv);
		gameArr[i].toDisplay = false; //sets to false to stop populating duplicate games

	}

}
	
	
$('.expandedSection').hide();
    $(".expandArrow").off().on('click',function(e){
    	e.stopPropagation();
   		var currentDiv = $(this).parents('.gameDiv');   	
    	$(".gameDiv").not(currentDiv).hide();  
    	$(this).hide();   	
    	$(this).next('.expandedSection').toggle(); 
    	var gameToFetch = $(this).siblings("h4").eq(0).html();
    	getData(gameToFetch);
         
});

    $('.minimizeArrow').off().on('click',function(e){
    	e.stopPropagation;   	
    	var currentSection = $(this).parents('.expandedSection');
    	$(currentSection).toggle(); 
    	$('.expandArrow').show();	
    	var currentDiv = $(this).parents('.gameDiv');  	 	
    	$(".gameDiv").not(currentDiv).show();

    });


    var  elements = $(".expandedSection");

    for (let i = 0; i < elements.length; i++){
    	const ps = new PerfectScrollbar($(elements)[i]);
    }


removeGame();
}





$("#addGameBtn").on('click',function(){
	

	$(".modalShow").removeClass().addClass("modalAdd");
	let gameName = document.getElementById("gameName").value;
	let platform = document.getElementById("gamePlat").value;
	let genre = document.getElementById("gameGen").value;
	let releaseDate = document.getElementById("gameRelease").value;
	let priority = document.getElementById("gamePriority").value;

	if (gameName.length > 0 && releaseDate.length > 0){
		catchNewGame(gameName,platform,genre,releaseDate,priority)
	}else{
		alert("You must enter the required details");
	}
});


$(".plusGame").on('click',function(){
	$(".modalAdd").removeClass().addClass("modalShow");
});

//Form validation for game name
(function(){
	$('#gameRelease').on('keyup change',function(){

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
		
	$(".gameDiv").off().on('dblclick',function(){
		let gameName = $(this).children(".name").html();
		$(this).css("display","none");
		var index = gameArr.findIndex(x => x.name == gameName);
		gameArr.splice(index,1);
		popGames();

	});
	
}


function getData(gameToFetch){
	var url = 'https://newsapi.org/v2/everything?'+
          'q='+gameToFetch+'&' +
          'sources=google-news'+
          'from=2018-10-09&' +
          'sortBy=relevancy&' +
          'apiKey=ad3db1ce23bd44e081754698f99b59d1';

var req = new Request(url);
var articlesArray = [];

//request for news articles using news API
fetch(req)
    .then(function(response) {
        console.log(response.json().then(function(data){
        	for (let i = 0 ; i <=5;i++){
        		articlesArray.push(data.articles[i]);        		
        	
        		//trimming of description and titles
        		var descriptionCaught = articlesArray[i].description;        		
        		var trimmedDescription = descriptionCaught.substring(0,85);
        		trimmedDescription = trimmedDescription+"...";

        		var titleCaught = articlesArray[i].title;
        		var trimmedTitle = titleCaught.substring(0,57);
        		trimmedTitle = trimmedTitle+"...";
        		
 
        		var newsDiv = $(

    				"<div class ='newsDiv'>"+
					"<h4 class='headline'>"+trimmedTitle+"</h4>"+
					"<img class='newsImg' src='"+articlesArray[i].urlToImage+"'"+">"+
					"<p class='author'>"+articlesArray[i].author+"</p>"+
					"<p class='source'>"+articlesArray[i].source.name+"</p>"+
					"<p class='description'>"+trimmedDescription+"</p>"+
					"<a class='compareLink' href='"+articlesArray[i].url+"'"+"><p>Full Article</p></a>"+
					"</div>"

    			
    			);

    			$(".expandedSection").append(newsDiv);

        	};
        }));
     
    });
	
}

$(document).ready(function(){
	var url = 'https://newsapi.org/v2/everything?'+
          'q=games&' +
          'sources=google-news'+
          'from=2018-10-09&' +
          'sortBy=relevancy&' +
          'apiKey=ad3db1ce23bd44e081754698f99b59d1';

var req = new Request(url);
var feedArticlesArray = [];

fetch(req)
    .then(function(response) {
        console.log(response.json().then(function(data){
        	for (let i = 0 ; i <=20;i++){
        		feedArticlesArray.push(data.articles[i]);        		
        	
        		//trimming of description and titles
        		var descriptionCaught = feedArticlesArray[i].description;        		
        		var trimmedDescription = descriptionCaught.substring(0,150);
        		trimmedDescription = trimmedDescription+"...";

        		var titleCaught = feedArticlesArray[i].title;
        		var trimmedTitle = titleCaught.substring(0,70);
        		trimmedTitle = trimmedTitle+"...";


        		var feedNewsDiv = $(

    				"<div class ='feedNewsDiv'>"+
					"<h4 class='feedHeadline text-center'>"+trimmedTitle+"</h4>"+
					"<p class='feedSource text-center'>"+feedArticlesArray[i].source.name+"</p>"+
					"<p class='feedDesc text-center'>"+trimmedDescription+"</p>"+
					"<a class='feedLink text-center' href='"+feedArticlesArray[i].url+"'"+"><p>Full Article</p></a>"+
					"</div>"

    			
    			);

    			$(".newsPortal").append(feedNewsDiv);
	};
        }));
     
    });

});

const ps = new PerfectScrollbar('.newsPortal')  ;





