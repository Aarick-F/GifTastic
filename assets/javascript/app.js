$(document).ready(() => {
  
  let pickedTopic;
  const topics = ["Anger", "Surprise", "Joy", "Trust",
                  "Sadness", "Fear", "Disgust"];
  // GIPHY API KEY
  const myKey = "Ab7efgCTM4wUS3UD0wzdSdgIYDyj8H0q";
  const query = "http://api.giphy.com/v1/gifs/search?q="
                + pickedTopic + "&api_key=" + myKey + "&limit=10";
  let topicDiv;
  let isExpanded = true;

  generateList();

  function generateList() {
    for(let i = 0; i < topics.length; i++) {
      topicDiv = $("<div class='topic'>");
      topicDiv.html("<p>" + topics[i] + "</p>");
      $("#content").append(topicDiv);
      topicDiv.hide();
    }
    let tracker = 1;
    const cascade = setInterval(function() {
      $(".topic:nth-of-type(" + tracker + ")").fadeIn(1000);
      tracker++;
      if(tracker === topics.length + 1) {
        clearInterval(cascade);
      }
    }, 50);
  }

  $(document).on("click", ".topic", function() {
    $(".container").toggleClass("containerExpand");
    $(this).toggleClass("expanded");
  });

  $.ajax({
    url: query,
    method: "GET"
  }).then(function(response) {
    console.log(response.data);
  });

});