$(document).ready(function() {
    let movies = ["Silver Linings Playbook", "Jurassic park", "Frozen", "Moana", "Malcolm X", "The Princess and the Frog", "Star Wars", "Up", "The Martian", "Saving Private Ryan", "Rick and Morty", "Back to the Future", "The Lion King", "Toy Story", "Forrest Gump", "The Great Gatsby", "The Pianist", "Schindler's List", "Joker", "The Dark Knight", "Catch Me if you Can", "Titanic", "Shrek"];
    let newMovie = "";

    function renderButtons() {
        var buttonsDiv = $('<div class="buttons">');
        $("#buttons").append(buttonsDiv);
        $('<div class="buttons">');
        for (var i = 0; i < movies.length; i++) {
            var gifButton = $('<button type="button" id="' + movies[i] + '" class="movie btn btn-dark m-1"">' + movies[i] + '</button>')
            $(".buttons").append(gifButton);
        }
        $("#form").html('<input class="form-control-sm new-movie" type="text"  placeholder="more movies..."><button type="button" class="query_btn btn m-1 btn-dark btn-default btn-sm" id="new-movie">Add movie</button>')
    };
    
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
        var xhr = $.get("https://api.giphy.com/v1/gifs/search?q=" + movie + "&api_key=xNLXdGgCbMsJEGAkltPSxL0LL24n3Y4N&limit=10");
        xhr.done(function(data) { 
            console.log("success got data", data);
            console.log(data.data[0].url); 
            displayGifs(data);
        });
    };

    function displayMovieInfo(film) {
        var queryURL = "https://www.omdbapi.com/?t=" + film + "&apikey=74b7a217";
        $.ajax({
        url: queryURL,
        method: "GET"
        }).then(function(response) {
          console.log(response);
          console.log(response.Poster);
          var title = response.Title;
          var image = response.Poster;
          var rated = response.Rated;
          var release = response.Released;
          var plot = response.Plot;
          var movieDiv = $('<div class="movie">');
          var titleDiv = $('<h1>' + title + '</h1>')
          var posterImg = $('<img src="' + image + '" width="200px">');
          var ratedDiv = $('<p>Rating: ' + rated + '</p>');
          var releaseDiv = $('<p>Release date: ' + release + '</p>');
          var plotDiv = $('<p>Plot: ' + plot + '</p>');
          $(movieDiv).append(titleDiv, posterImg, ratedDiv, releaseDiv, plotDiv);
          $("#movies-view").html(movieDiv);
      });
      }
    
    function resetScreen() {
        $(".gifDiv").remove();
    };

    function resetButtons() {
        $(".buttons").remove();
    };

    renderButtons();

    $("body").on("keyup", ".new-movie", function(event) {
        if (event.keyCode === 13) {
            $("#new-movie").click();
        }
    });

    $("body").on("click", "#new-movie", function(){
        resetButtons();
        event.preventDefault();
        newMovie = $(".new-movie").val().trim();
        movies.push(newMovie);
        console.log(newMovie);
        renderButtons();
        // button = $('<button type="button" id="' + newMovie + '" class="movie btn btn-info m-1"">' + newMovie + '</button>')
        // $("#buttons-view").append(button);
    });

    $("body").on("click", ".movie", function() {
        resetScreen();
        var movieTitle = $(this).attr("id");
        searchGIFY(movieTitle);
        displayMovieInfo(movieTitle);
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