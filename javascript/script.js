let movies = ["siver linings playbook", "jurassic park", "frozen"];

window.onload = function() {
    for (var i = 0; i < movies.length; i++) {
        var gifButton = $('<button type="button" class="movie btn btn-dark m-1"">' + movies[i] + '</button>')
        $("#buttons").append(gifButton);
        $(".bg-dark").attr("style", "background-image: url('./assets/images/wwii.jpg');") 
    }
    
};

function searchGIFY(movie) {
    var xhr = $.get("http://api.giphy.com/v1/gifs/search?q=" + movie + "&api_key=xNLXdGgCbMsJEGAkltPSxL0LL24n3Y4N&limit=10");
    xhr.done(function(data) { 
        console.log("success got data", data);
        console.log(data.data[0].url); 
    });
};

searchGIFY(movies[0]);

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