$(document).ready(function()
{   
    var searchWord = [];

    $("#submitButton").click(function(){
        var myExpression = $("#userInput").val();
        searchWord.push(myExpression);
        console.log(searchWord);
        $("#userInput").val("");
        //comment

        var queryURL = "https://mashape-community-urban-dictionary.p.rapidapi.com/define?term="+searchWord+"";

    $.ajax({
        url: queryURL, 
        headers: {"X-RapidAPI-Host": "mashape-community-urban-dictionary.p.rapidapi.com",
        "X-RapidAPI-Key": "748ddc26b8mshb590d128ea3a157p115cd4jsn1816f6826646"},
        method: "GET"
    
    }).then(function (response)
    {
        var results = response.list;
        console.log(results);

        for(var i = 0; i < results.length; i++)
        {
            $("#urbanDiv").html(results[i].definition);
        }
    })


    
})
})
