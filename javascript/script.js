let movies = ["silver linings playbook", "jurassic park", "Frozen", "Moana"];

window.onload = function() {
    for (var i = 0; i < movies.length; i++) {
        var gifButton = $('<button type="button" id="' + movies[i] + '" class="movie btn btn-dark m-1"">' + movies[i] + '</button>')
        $("#buttons").append(gifButton);
    }
    
};

$(document).ready(function() {
    function displayGifs(data) {
        for(var j = 0; j < 10; j++) {
            let gifDiv = $('<div class="gifDiv">');
            $("#gifs").append(gifDiv);
            let gifImg = $('<img src="' + data.data[j].images.downsized_large.url + '">');
            let gifRating = $('<p>Rating: ' + data.data[j].rating + '</p>')
            console.log("success got data", data);
            $(gifDiv).append(gifImg, gifRating); 
        }
    };
    
    function searchGIFY(movie) {
        var xhr = $.get("http://api.giphy.com/v1/gifs/search?q=" + movie + "&api_key=xNLXdGgCbMsJEGAkltPSxL0LL24n3Y4N&limit=10");
        xhr.done(function(data) { 
            console.log("success got data", data);
            console.log(data.data[0].url); 
            displayGifs(data);
        });
    };
    
    function resetScreen() {
        $(".gifDiv").remove();
    };
    
    $(".movie").on("click", function() {
        resetScreen();
        var movieTitle = $(this).attr("id");
        searchGIFY(movieTitle);
    });
});



// Search the OMDB API for the following movies, and append table rows for each
//console.log(xhr.done.data[0]);

// function createRow(data) {
//     var tRow = $("<tr>");
//     var titleTd = $("<td>").text(data.Title);
//     var yearTd = $("<td>").text(data.Year);
//     var actorsTd = $("<td>").text(data.Actors);
//     tRow.append(titleTd, yearTd, actorsTd);
//     $("tbody").append(tRow);
// };

// function searchGIFY(movie) {
//     var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + movie + "&api_key=xNLXdGgCbMsJEGAkltPSxL0LL24n3Y4N&limit=10";
//     $.ajax({
//         url: queryURL,
//         method: "GET"
//     }).then(function(response) {
//         //createRow(response);
//         console.log(searchGIFY("saving private ryan"));
//     });
// };