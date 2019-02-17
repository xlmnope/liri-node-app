
var keys = require("./keys.js");
var axios = require("axios");
var fs = require("fs");


var Spotify = require('node-spotify-api');
 
if (process.argv[2] == 'concert-this') {
  concertThis();
}
if (process.argv[2] == 'spotify-this-song'){
  spotifyThis();
}
if(process.argv[2] == 'movie-this'){
movieThis();
}
if (process.argv[2] == 'do-what-it-says'){
  doWhatitSays();
}

 

function concertThis(artistS){
  if (!artistS){
    var artist = process.argv.slice(3);
    var artistS = artist.join("+");
  }
  
  var URL = ("https://rest.bandsintown.com/artists/" + artistS + "/events?app_id=codingbootcamp");
  //  search the Bands in Town Artist Events API for an artist 
  axios.get(URL).then(
  function(response) {
    var data = response.data[0];
    var showData = [
      "Venue Name: " + data.venue.name,
      "Venue Location: " + data.venue.city,
      "Date of Event: " + data.datetime,
      //to do: use moment to format data mm/dd/yy
    ].join("\n\n");
    console.log(showData);
  }
);
}


function spotifyThis(song){
  if (!song){
    var songArr = process.argv.splice(3);
    var song = songArr.join("+");

  }
  console.log(song);
   if (!song){
     song = "The Sign Ace of Base"
   }
  var spotify = new Spotify({
    //need to put this in .env.. couldn't get it working. 
    id: "bbee20c9040b4729b60692f0e146fb29",
    secret: "d6a1d5be12ed4bbc92a90b01d0bbfb79",
  });
    spotify.search({ type: 'track', query: song }, function(err, data) {
      if (err) {
        return console.log('Error occurred: ' + err);
      }
      //var data = data.response;

      var songData = [
        "Artists: " + data.tracks.items[0].artists[0].name,
        "Song Name: " + data.tracks.items[0].name,
        "Preview: " + data.tracks.href,
        "Album: " + data.tracks.items[0].album.name,
      ].join("\n\n"); 
      console.log(songData);
   });
}


function movieThis(movie) {
  if (!movie){
    var movieArr = process.argv.slice(3);
    var movie = movieArr.join("+");
  }
    if (!movie) {
      movie = "Mr.Nobody"
    }
    var URL = "http://www.omdbapi.com/?t="+ movie + "&y=&plot=short&apikey=trilogy"
    axios.get(URL).then(
    function(response) {
      var movie = response.data
      var movieData = [
        "Title: " + movie.Title,
        "Year the movie came out:" + movie.Year,
        "IMBD rating: " + movie.imdbRating,
        //"Rotten Tomatoes Rating " + movie.Ratings[1],
        "Country: " + movie.Country,
        "Language: " + movie.Language,
        "Plot: " + movie.Plot,
        "Actors: " + movie.Actors,
      ].join("\n\n");
      console.log(movieData);
    }
  );
}

function   doWhatitSays() {
//  var random = require("./random.txt");

  fs.readFile("random.txt", "utf8", function(error, data) {
    if(error){
      return console.log("Error: "+error);
    }
    console.log("data: "+ data);
    var dataArr = data.split(',');
    
    console.log(dataArr);
    if (dataArr[0]==="concert-this"){
      concertThis(artistS);
    }
    if (dataArr[0]==="spotify-this-song"){
      var song = dataArr[1];
      spotifyThis(song);
    }
    if (dataArr[0]==="movie-this"){
      movieThis(movie);
    }
  })
}
  //    * Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
  
  //      * It should run `spotify-this-song` for "I Want it That Way," as follows the text in `random.txt`.
  
  //      * Edit the text in random.txt to test out the feature for movie-this and concert-this.
  




