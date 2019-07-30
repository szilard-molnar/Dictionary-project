$(document).ready(function()
{   
    var searchWord = [];

    $("#submit").click(function(callGif){
        var myExpression = $("#inputTerm").val();
        searchWord.push(myExpression);
        console.log(searchWord);
        $("#inputTerm").val("");
        var queryURL = queryURL = "https://api.giphy.com/v1/gifs/random?api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&tag=" + myExpression;
       
$.ajax({
     url: queryURL,
     method: "GET"
   }).then(function(response) {
   var results = response.data.image_original_url;
   console.log(response);
    var gif = "<img src='"+results+"'>";
  // var dictionaryGif = $("<img>");
    $("#gifDiv").html(gif);
    })
    })
})