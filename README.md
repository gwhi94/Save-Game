# Personal Projects - Create a web app to track upcoming video games and offer tailored information and news
### Completed.
**1** - Create mockup and layout design  
**2** - Design and create responsive web app layout 
**3** - Implement the add game functionality 
**4** - Allow users to delete games 
**5** - Utilise local storage for game objects 
**6** - Use the News API to pull in video game news 
**7** - Create a custom request based on stored user games
**8** - Display cheapest deals for user stored games

### Work in progress...
**9** - Look at implementing Amazon affiliate linking
**10** - Thorough testing and refactoring

Skills Developed
REST API's
JavaScript
jQuery
HTML
BootStrap
Using Local Storage

```

open index.html


```
![savga e](https://user-images.githubusercontent.com/40371755/47443330-f5eb0600-d7ab-11e8-9b91-8a813f7534c6.png)


### Example Code
 
 ```JavaScript
 //request for news articles using news API
fetch(req)
    .then(function(response) {
        console.log(response.json().then(function(data){
        	for (let i = 0 ; i <=20;i++){
        		articlesArray.push(data.articles[i]);        		
        	
        		//trimming of description and titles
        		var descriptionCaught = articlesArray[i].description;        		
        		var trimmedDescription = descriptionCaught.substring(0,300);
        		trimmedDescription = trimmedDescription+"...";

        		var titleCaught = articlesArray[i].title;
        		var trimmedTitle = titleCaught.substring(0,57);
        		trimmedTitle = trimmedTitle+"...";
        		
 
        		var newsDiv = $(

    				"<div class ='newsDiv'>"+
					"<h4 class='headline text-center'>"+trimmedTitle+"</h4>"+
					"<p class='author text-center'>"+articlesArray[i].author+"</p>"+
					"<p class='source text-center'>"+articlesArray[i].source.name+"</p>"+
					"<p class='description text-center'>"+trimmedDescription+"</p>"+
					"<a class='compareLink text-center' href='"+articlesArray[i].url+"'"+"><p>Full Article</p></a>"+
					"</div>"

    			
    			);

    			$(".expandedSection").append(newsDiv);

        	};
        }));
     
    });
	
}

    
    
    
   
   
