let movies = ["silver linings playbook", "jurassic park", "Frozen"];

window.onload = function() {
    for (var i = 0; i < movies.length; i++) {
        var gifButton = $('<button type="button" id="' + movies[i] + '" class="movie btn btn-dark m-1"">' + movies[i] + '</button>')
        $("#buttons").append(gifButton);
    }
    
};

$(document).ready(function() {
    function displayGifs(data) {
        let gifDiv = $('<div>');
        $("#gifs").append(gifDiv);
        let gifImg = $('<img src="' + data.data[0].images.downsized_large.url + '">');
        let gifRating = $()
        $(gifDiv).append(gifImg);
    };
    
    function searchGIFY(movie) {
        var xhr = $.get("http://api.giphy.com/v1/gifs/search?q=" + movie + "+movie&api_key=xNLXdGgCbMsJEGAkltPSxL0LL24n3Y4N&limit=10");
        xhr.done(function(data) { 
            console.log("success got data", data);
            console.log(data.data[0].url); 
            displayGifs(data);
        });
    };
    
    //searchGIFY(movies[0]);
    
    function resetScreen() {
        $("#gifs").remove();
    };
    
    $(".movie").on("click", function() {
        //resetScreen();
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