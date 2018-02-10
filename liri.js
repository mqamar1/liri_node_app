require("dotenv").config();
var fs = require('fs')
var keys = require('./keys.js');
var request = require('request');
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var dotEnvpac = require('dotenv');
var client = new Spotify(keys.spotify);
var input = process.argv[2];
var input2 = process.argv[3];
var movieName = "";

function myTwitter() {
  var params = {
    screen_name: 'eagles'
  };
  var client = new Twitter(keys.twitter);
  client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error) {
      for (var i = 0; i <= 20; i++)
        console.log(tweets[i]);
    }
  });
}
//myTwitter();

function myMovie(movieName) {

  var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

  console.log(queryUrl);

  request(queryUrl, function(error, response, body) {

    if (!error && response.statusCode === 200) {
      var movieData = JSON.parse(body);
      console.log(movieData)

      console.log("Title: " + movieData.Title);
      console.log("Year: " + movieData.Year);
      console.log("Rating: " + movieData.Rating);
      console.log("Country: " + movieData.Country);
      console.log("Language: " + movieData.language);
      console.log("Plot: " + movieData.Plot);
      console.log("Actors: " + movieData.Actors);
    }

  });
}

var spotifySong = function(songName) {
  if (songName === undefined) {
    songName = "The Sign";
  }
  client.search({type: "track", query: songName},
    function(err, data) {
      if (err) {
        console.log("Error occurred: " + err);
        return;
      }
      var songs = data.tracks.items;
      for (var i = 0; i <songs.length; i++) {
        console.log(i);
        console.log("Artist(s): " + songs[i].album.artists[0]);
        console.log("The song name: " + songs[i].name);
        console.log("The preview URL: " + songs[i].preview_url);
        console.log("The album: " + songs[i].album.name);
        console.log("-----------------------------------");
      }
    })
  };



//myMovie();

if (input === "my-tweet") {
  myTwitter();
} else if (input === "movie-this"){
  myMovie();
}
else if (input==="spotify-this-song"){
  spotifySong();
}
else("wrong input")
