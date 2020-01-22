$(document).ready(function() {
    let movies = ["Silver Linings Playbook", "Jurassic park", "Frozen", "Moana", "Malcolm X", "The Princess and the Frog", "Star Wars", "Up", "The Martian", "Saving Private Ryan", "Rick and Morty", "Back to the Future", "The Lion King", "Toy Story", "Forrest Gump", "The Great Gatsby", "The Pianist", "Schindler's List", "Joker", "The Dark Knight", "Catch Me if you Can", "Titanic", "Shrek"];
    let newMovie = "";

    //loop through movies array and append button for each
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
    
    //loop through GIPHY data and append still gifs. function must run inside searchGIFY function
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
    
    //access api data, use displayGifs function append gifs
    //although we've been using ajax in class, the giphy documentation recommended xhr $.get / xhr.done function
    function searchGIFY(movie) {
        var xhr = $.get("https://api.giphy.com/v1/gifs/search?q=" + movie + "&api_key=xNLXdGgCbMsJEGAkltPSxL0LL24n3Y4N&limit=10");
        xhr.done(function(data) { 
            console.log("success got data", data);
            console.log(data.data[0].url); 
            displayGifs(data);
        });
    };

    //using ajax to append movie title, poster, rating, release date, and plot.
    //we did this activity in class and i decided to integrate it into my GifTastic program
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
          var movieDiv = $('<div class="movie-data">');
          var titleDiv = $('<h2>' + title + '</h2>')
          var posterImg = $('<img id="poster" src="' + image + '" width="200px">');
          var ratedDiv = $('<p><b>Rating: </b>' + rated + '</p>');
          var releaseDiv = $('<p><b>Release date: </b>' + release + '</p>');
          var plotDiv = $('<p><b>Plot: </b>' + plot + '</p>');
          $(movieDiv).append(titleDiv, posterImg, ratedDiv, releaseDiv, plotDiv);
          $("#movies-view").html(movieDiv);
      });
      }
    
    //seset screen to load new gifs/movie info
    function resetScreen() {
        $(".gifDiv").remove();
    };

    //reset buttons when new button is added
    function resetButtons() {
        $(".buttons").remove();
    };

    //start program by rendering buttons
    renderButtons();

    //add new movie when pressing enter key
    $("body").on("keyup", ".new-movie", function(event) {
        if (event.keyCode === 13) {
            $("#new-movie").click();
        }
    });

    //add new movie
    $("body").on("click", "#new-movie", function(){
        resetButtons();
        event.preventDefault();
        newMovie = $(".new-movie").val().trim();
        movies.push(newMovie);
        console.log(newMovie);
        renderButtons();
    });

    //on mpvie button click, display ten gifs and movie info
    $("body").on("click", ".movie", function() {
        resetScreen();
        var movieTitle = $(this).attr("id");
        searchGIFY(movieTitle);
        displayMovieInfo(movieTitle);
    });

    //on gif click, swap out link information in order to animate gif (found this using google fu)
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