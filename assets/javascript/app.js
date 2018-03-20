$(document).ready(() => {

  let pickedTopic;

  const topics = [
    "Rage",
    "Surprise",
    "Joy",
    "Trust",
    "Sadness",
    "Fear",
    "Disgust"
  ];

  const colors = [
    "rgba(255, 0, 0, 0.6)",
    "rgba(255, 127, 0, 0.6)",
    "rgba(255, 255, 0, 0.6)",
    "rgba(0, 255, 0, 0.6)",
    "rgba(0, 0, 255, 0.6)",
    "rgba(75, 0, 30, 0.6)",
    "rgba(148, 0, 211, 0.6)"
  ];

  let gifs = [];

  // GIPHY API KEY
  const myKey = "Ab7efgCTM4wUS3UD0wzdSdgIYDyj8H0q";
  let topicDiv;
  let isExpanded = true;

  generateList();


  // FUNCTIONS
  // ========================================================
  function generateList() {
    $("#content").empty();
    for (let i = 0; i < topics.length; i++) {
      topicDiv = $("<div class='topic'>");
      topicDiv.css("background", getColor(i));
      topicDiv.attr("data-topic", topics[i]);
      topicDiv.html("<p>" + topics[i] + "</p>");
      $("#content").append(topicDiv);
      topicDiv.hide();
    }
    let tracker = 1;
    const cascade = setInterval(function() {
      $(".topic:nth-of-type(" + tracker + ")").fadeIn(1000);
      tracker++;
      if (tracker === topics.length + 1) {
        clearInterval(cascade);
      }
    }, 50);
  }

  function getColor(i) {
    if(topics.length > colors.length) {
      for(let i = colors.length; i < topics.length; i++) {
        colors.push(randomColor());
      }
    }
    return colors[i];
  }

  function randomColor() {
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);
    return "rgba(" + r + ", " + g + ", " + b + ", 0.6)";
  }

  // EVENT LISTNERS
  // ========================================================
  $(document).on("click", ".topic", function(e) {
    if (!$(this).hasClass("expanded")) {
      $(this).addClass("expanded");
      // THIS IS WHAT HAPPENS ON EXPANSION
      pickedTopic = $(this).attr("data-topic");
      $(this).empty();
      let title = $("<h1 class='title'>" + pickedTopic + "</h1>");
      let gifSection = $("<div class='gifSection'></div>");
      $(this).append(title, gifSection);
      // AJAX CALL
      for(let i = 0; i < 10; i++) {
        $.ajax({
          url: "https://api.giphy.com/v1/gifs/search?q=" +
                pickedTopic +
                "&api_key=Ab7efgCTM4wUS3UD0wzdSdgIYDyj8H0q&limit=10",
          method: "GET"
        }).then(function(response) {
          gifSection.append("<img class='gif' src=" + response.data[i].images.fixed_width.url + ">");
        });
      }
    } else if ($(this).hasClass("expanded")) {
      // THIS IS WHAT HAPPENS ON COLLAPSE
      if(e.target !== e.currentTarget) return;
      $(this).html("<p>" + $(this).attr("data-topic") + "</p>");
      $(this).removeClass("expanded");
    }
    // $(this).toggleClass("expanded");
    
    // console.log(gifs);
  });
  
  $("#addNew").on("click", function() {
    let newTopic = $("#newTopic").val();
    if(newTopic.length > 0 && topics.indexOf(newTopic) === -1) {
      topics.push(newTopic);
      generateList();
      $("#newTopic").val("");
    } else {
      console.log("not long enough");
    }
  });
});