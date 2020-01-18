let movies = ["Silver Linings Playbook", "Jurassic park", "Frozen", "Moana", "Malcolm X", "The Princess and the Frog", "Star Wars", "Up", "The Martian", "Saving Private Ryan", "Rick and Morty", "Back to the Future", "The Lion King", "Toy Story", "Forrest Gump", "The Great Gatsby", "The Pianist", "Schindler's List", "Joker", "The Dark Knight", "Catch Me if you Can", "Titanic", "Shrek"];
let newMovie = "";

window.onload = function() {
    for (var i = 0; i < movies.length; i++) {
        var gifButton = $('<button type="button" id="' + movies[i] + '" class="movie btn btn-info m-1"">' + movies[i] + '</button>')
        $("#buttons").append(gifButton);
    }
    $("#form").html('<input class="form-control-sm new-movie" type="text"  placeholder="more movies..."><button type="button" class="query_btn btn m-1 btn-info btn-default btn-sm" id="new-movie">Add movie...</button>')
};

$(document).ready(function() {
    
    function displayGifs(data) {
        for(var j = 0; j < 10; j++) {
            let gifDiv = $('<div class="gifDiv">');
            $("#gifs").append(gifDiv);
            let gifImgStill = $('<img class="gif" src="' + data.data[j].images.fixed_height_still.url + '">');
            let gifRating = $('<p>Rating: ' + data.data[j].rating + '</p>')
            console.log("success got data", data);
            $(gifDiv).append(gifImgStill, gifRating);
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

    $("#new-movie").click(function(){
        newMovie = $(".new-movie").val();
        console.log(newMovie);
        movies.push(newMovie);
        console.log(movies);

    });

    $('body').on('click', '.gif', function() {
    	var src = $(this).attr("src");
      if($(this).hasClass('playing')){
         //stop
         $(this).attr('src', src.replace(/\.gif/i, "_s.gif"))
         $(this).removeClass('playing');
      } else {
        //play
        $(this).addClass('playing');
        $(this).attr('src', src.replace(/\_s.gif/i, ".gif"))
      }
    });
});