$(document).ready(function()
{   
    var searchWord = [];

    $("#submitButton").click(function(urbanDictionaryFunction){
        if($("#userInput").val() == "")
        {
            alert("Please type in a word or an expression.");
            return;
        }
        var myExpression = $("#userInput").val();
        searchWord.push(myExpression);
        console.log(searchWord);
        $("#userInput").val("");
        
        var lastWord = searchWord.slice(-1).pop();

        var queryURL = "https://mashape-community-urban-dictionary.p.rapidapi.com/define?term="+lastWord+"";

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
})
})