$(document).ready(() => {

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

  // GIPHY API KEY
  const myKey = "Ab7efgCTM4wUS3UD0wzdSdgIYDyj8H0q";
  let pickedTopic;
  let topicDiv;
  let numberOfGifs;
  let isExpanded = true;

  const forTheSneakyOnes = "Hey There. I noticed you were trying to input some angle brackets. "
                            + "Look, I'm not pointing fingers, but if you were trying "
                            + "to run scripts in here, stop that. That is very rude "
                            + "and also against the Geneva Convention I think. Anyways, " 
                            + "quit messing around and try a different topic.";

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

  function getGifs(amount, section) {
    let data = "";
    $.ajax({
      url: "https://api.giphy.com/v1/gifs/search?q=" +
            pickedTopic +
            "&api_key=Ab7efgCTM4wUS3UD0wzdSdgIYDyj8H0q&limit=" + amount,
      method: "GET"
    }).then(function(response) {
      data = response.data;
      for(let i = 0; i < data.length; i++) {
        section.append("<img class='gif' src=" + data[i].images.fixed_width.url + ">");
      }
    });
  }

  // EVENT LISTNERS
  // ========================================================
  $(document).on("click", ".topic", function(e) {
    if (!$(this).hasClass("expanded")) {
      numberOfGifs = 10;
      $(this).addClass("expanded");
      // THIS IS WHAT HAPPENS ON EXPANSION
      pickedTopic = $(this).attr("data-topic");
      $(this).empty();
      let title = $("<h1 class='title'>" + pickedTopic + "</h1>");
      let gifSection = $("<div class='gifSection'></div>");
      let moreButton = $("<div class='moreButton'>MORE</div>");
      $(this).append(title, gifSection);
      getGifs(numberOfGifs, gifSection);
    } else if ($(this).hasClass("expanded")) {
      // THIS IS WHAT HAPPENS ON COLLAPSE
      if(e.target !== e.currentTarget) return;
      $(this).html("<p>" + $(this).attr("data-topic") + "</p>");
      $(this).removeClass("expanded");
    }
  });
  
  $("#addNew").on("click", function() {
    let newTopic = $("#newTopic").val();
    for(let i = 0; i < newTopic.length; i++) {
      if(newTopic[i] === "<" || newTopic === ">") {
        alert(forTheSneakyOnes);
        newTopic = "";
        break;
      } 
    }
    if(newTopic.length > 0 && topics.indexOf(newTopic) === -1) {
      topics.push(newTopic);
      generateList();
      $("#newTopic").val("");
    }
  });
});