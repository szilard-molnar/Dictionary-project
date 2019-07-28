$(document).ready(function()
{   
    var urbanTerm = [];
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
    $("#submit").click(function(){
        var myExpression = $("#inputTerm").val();
        urbanTerm.push(myExpression);
        console.log(myExpression)
        $("#inputTerm").val("");
        websterCall(myExpression);

})
})