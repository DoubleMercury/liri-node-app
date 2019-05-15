require("dotenv").config();

const fs = require("fs");
const keys = require("./keys.js");
const Spotify = require("node-spotify-api");
const axios = require("axios");
const moment = require("moment");


var spotify = new Spotify(keys.spotify);


var operator = process.argv[2];
var term = process.argv.slice(3).join(" ");

var queryUrl = "http://www.omdbapi.com/?t=" + term + "&y=&plot=short&apikey=trilogy";


if (operator === "concert-this") {
    var bandUrl = "https://rest.bandsintown.com/artists/" + term + "/events?app_id=codingbootcamp"

    axios.get(bandUrl).then(
        function(response) {
           for (var i = 0; i < 1; i++){
               console.log("Venue: " + response.data[i].venue.name);
               console.log("Venue Location: " + response.data[i].venue.city);
               console.log("Event Date: " + moment(response.data[i].datetime).format("MM-DD-YYYY"));
           }
        }
    )};
if (operator === "spotify-this-song") {
    if (!term){
        term = 'The Sign';
    }
    spotify.search({type: 'track', query: term}, function(err, data){
        if (err){
            console.log('Error occurred: ' + err);
            return;
        }
                var albumTrack = data.tracks.items;

        for (i=0; i < albumTrack.length; i++){
        console.log("Artist: " + albumTrack[i].artists[i].name);
        console.log("Track Title: " + albumTrack[i].name);
        console.log("Spotify Link: " + albumTrack[i].preview_url);
        console.log("Album Title: " + albumTrack[i].album.name);
        }
    });

};

if (operator === "movie-this") {
        if(!term) {
        term = 'Mr.Nobody';
        } 
        {
        axios.get(queryUrl).then(
        function(response) {
            console.log("Title: " + response.data.Title);
            console.log("Year: " + response.data.Year);
            console.log("IMDB Rating: " + response.data.imdbRating);
            console.log("Rotten Tomatoes Rating: " + response.data.tomatoRating);
            console.log("Country: " + response.data.Country);
            console.log("Language: " + response.data.Language);
            console.log("Plot: " + response.data.Plot);
            console.log("Actors: " + response.data.Actors);
        }
        )}
    
};
if (operator === "do-what-it-says") {
    fs.readFile("random.txt", "UTF-8", function(error, data){
        if (error){
            console.log(error);
        }
            var output = data.split(",");
            
    })
};





