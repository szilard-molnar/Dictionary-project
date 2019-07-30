$(document).ready(function()
{   
    var searchWord = [];
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
            console.log(response);
            $("#websterDiv").html("");
            var pos = 1;
            if (results)
                {
                    $("#websterDiv").append("<p>" + myExpression + "</p>");
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
        var queryURL = "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=" + myExpression + "&safeSearch=strict&key=AIzaSyBtTKhUd5u7vSo3QD8S0k7mIFbFJGd0ooQ&type=video";

        console.log(myExpression)

        $.ajax({
            url: queryURL,
            method: "GET"

        }).then(function (response) {
            console.log(response);
            var results = response.items["0"].id.videoId;

            console.log("this is the variable results:" + results)


            $("#youtubeDiv").html('<iframe id="youtubeFrame" width="560" height="315" src="https://www.youtube.com/embed/' + results + '" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>');
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
            console.log(results);
            $("#urbanDiv").html("");
    
            for(var i = 0; i < 3; i++)
            {
                $("#urbanDefinition").html(myExpression);
                $("#urbanDiv").append("<li>"+results[i].definition+"</li>");
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
               console.log(response);
            var gif = "<img src='"+results+"'>";
          // var dictionaryGif = $("<img>");
            $("#gifDiv").html(gif);
           }
           else{
               $("#gifDiv").html("No gif result.");
           }
            })
    }
    $("#submitButton").click(function(){
        var myExpression = $("#userInput").val();
        searchWord.push(myExpression);
        console.log(searchWord);
        $("#userInput").val("");
        //comment
        websterCall(myExpression);
        callYoutube(myExpression);
        callUrban(myExpression);
        callGiphy(myExpression);
})
})
