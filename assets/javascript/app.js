function callPrevious(previousWord){
    websterCall(previousWord);
    callYoutube(previousWord);
    callUrban(previousWord);
    callGiphy(previousWord);
database.ref().on("child_added", function (snapshot) {
    //console.log(snapshot.val());
    previousWord=snapshot.val();
    $("#previousSearch").html("<p>Previous Search: " + '<a href="javascript:callPrevious('+"'"+previousWord+"')"+'">'+ previousWord + "</a></p>");
})


    
}
function websterCall(myExpression)
{
    //elementary dictionary
    //var queryURL = "https://www.dictionaryapi.com/api/v3/references/sd2/json/" + myExpression + "?key=8a432f3f-03bf-4acd-9217-bd6489771a25";

    //collegiate dictionary
    var queryURL = "https://www.dictionaryapi.com/api/v3/references/collegiate/json/" + myExpression + "?key=8a432f3f-03bf-4acd-9217-bd6489771a25";
    
    

    $.ajax({
        url: queryURL, 
        method: "GET"
    
    }).then(function (response)
    {
        results = response[0].shortdef
       // console.log(response);
        $("#websterDiv").empty();
        var pos = 1;
        if (results)
            {
                $("#websterDiv").append("<p id='websterDefinition'>" + myExpression + "</p>");
                for (var i = 0; i < results.length; i++)
                    {
                        if(i <=2)
                            {
                                $("#websterDiv").append("<p>" + pos + ": " + results[i] + "</p>")
                                pos++
                            }
                    }                
            }
        else{
            $("#websterDiv").append("That doth not be a word. . . bro.")
        }

    })
}
function callYoutube(myExpression) {
    var queryURL = 'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=' + myExpression + '&safeSearch=strict&key=AIzaSyBtTKhUd5u7vSo3QD8S0k7mIFbFJGd0ooQ&type=video';

    //console.log(myExpression)

    $.ajax({
        url: queryURL,
        method: "GET"

    }).then(function (response) {
       // console.log(response);
        var results = response.items["0"].id.videoId;

        //console.log("this is the variable results:" + results)


        $("#youtubeDiv").html('<iframe id="youtubeFrame" style="background-size: cover" src="https://www.youtube.com/embed/' + results + '" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>');
    })
}
function callUrban(myExpression){

    var queryURL = "https://mashape-community-urban-dictionary.p.rapidapi.com/define?term="+myExpression+"";

    $.ajax({
        url: queryURL, 
        headers: {"X-RapidAPI-Host": "mashape-community-urban-dictionary.p.rapidapi.com",
        "X-RapidAPI-Key": "748ddc26b8mshb590d128ea3a157p115cd4jsn1816f6826646"},
        method: "GET"
    
    }).then(function (response)
    {
        var results = response.list;
        //console.log(results);
        $("#urbanDiv").html("");
        var pos=1;
        for(var i = 0; i < 3; i++)
        {
            $("#urbanDefinition").html(myExpression);
            
            
            $("#urbanDefinition").html(myExpression);
            $("#urbanDiv").append("<p>" + pos + ": " + results[i].definition + "</p>");
            pos++
        }
    })
}
function callGiphy(myExpression){
    var queryURL = queryURL = "https://api.giphy.com/v1/gifs/random?api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&tag=" + myExpression;
   
    $.ajax({
         url: queryURL,
         method: "GET"
       }).then(function(response) {
       var results = response.data.image_original_url;
       if(results){
          // console.log(response);
        var gif = results;
      // var dictionaryGif = $("<img>");
        $("#gifDiv").html('<img class="gifSizing" src=" '+ gif+ ' ">');
       }
       else{
           $("#gifDiv").html("No gif result.");
       }
        })
}

$(document).ready(function()
{  
    var previousWord;
    
    var searchWord = ["computer", "copy", "dog", "butterfly", "car", "shirt", "glasses", "victorian", "machete", "monkey", "bottle", "movie"];
    var randomWord = searchWord[Math.floor(Math.random() * searchWord.length)];
    //console.log(randomWord);
    websterCall(randomWord);
    callYoutube(randomWord);
    callUrban(randomWord);
    callGiphy(randomWord);

    $("#randomButton").click(function(event) {
        event.preventDefault();
        randomWord = searchWord[Math.floor(Math.random() * searchWord.length)];
        //console.log(randomWord);
        websterCall(randomWord);
        callYoutube(randomWord);
        callUrban(randomWord);
        callGiphy(randomWord);
    })

    $("#submitButton").click(function(event){

        event.preventDefault();
        var myExpression = $("#userInput").val();
        if(myExpression != "")
            {
                database.ref("/userInputTerm").set(myExpression);
                database.ref("/searchHistory").push(myExpression);                
            }

        //console.log(searchWord);
        if(myExpression == "")
        {
            $("#myModal").css("display", "block");
        }
        else
        {
        searchWord.push(myExpression);
        //console.log(searchWord);
        $("#userInput").val("");
        websterCall(myExpression);
        callYoutube(myExpression);
        callUrban(myExpression);
        callGiphy(myExpression);
        }

})
    var modal = document.getElementById("myModal");
    var span = document.getElementsByClassName("close")[0];


    span.onclick = function() {
        modal.style.display = "none";
    }
  
  // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
        modal.style.display = "none";
    }
  }
  database.ref("/userInputTerm").on("value", function(snapshot){
    previousWord=snapshot.val();
    $("#previousSearch").html("<p>Previous Search: " + '<a href="javascript:callPrevious('+"'"+previousWord+"')"+'">'+ previousWord + "</a></p>");

    })
    database.ref("/searchHistory").on("child_added", function (snapshot) {
        //console.log(snapshot.val());
        if(!searchWord.includes(snapshot.val())){
            searchWord.push(snapshot.val());
        }
    })



})
