$(document).ready(() => {
  // GIPHY API KEY
  const topics = ["Anger", "Anticipation", "Joy", "Trust",
                  "Sadness", "Fear", "Surprise", "Disgust"];
  const myKey = "Ab7efgCTM4wUS3UD0wzdSdgIYDyj8H0q";

  const query = "http://api.giphy.com/v1/gifs/search?q="
                + topics[0] + "&api_key=" + myKey + "&limit=10";
  $.ajax({
    url: query,
    method: "GET"
  }).then(function(response) {
    console.log(response.data);
  });

});