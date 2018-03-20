$(document).ready(() => {

  let pickedTopic;
  const topics = [
    "Anger",
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
  const sampleImages = [
    "http://imgsv.imaging.nikon.com/lineup/lens/zoom/normalzoom/af-s_dx_18-300mmf_35-56g_ed_vr/img/sample/sample4_l.jpg",
    "http://imaging.nikon.com/lineup/lens/zoom/normalzoom/af-s_dx_18-140mmf_35-56g_ed_vr/img/sample/sample1_l.jpg",
    "http://myanmareiti.org/sites/default/files/sample-5_0.jpg",
    "http://www.frankieballard.com/sites/g/files/g2000005856/f/Sample-image10-highres.jpg",
    "https://i.ytimg.com/vi/RHLknisJ-Sg/maxresdefault.jpg",
    "http://www.cameraegg.org/wp-content/uploads/2015/06/canon-powershot-g3-x-sample-images-1.jpg",
    "http://www.tarloandgraham.com/wp-content/uploads/2013/05/sample-1.jpg",
    "https://nikonrumors.com/wp-content/uploads/2014/03/Nikon-1-V3-sample-photo.jpg",
    "https://4.img-dpreview.com/files/p/E~TS590x0~articles/3925134721/0266554465.jpeg",
    "https://www.visioncritical.com/wp-content/uploads/2014/12/BLG_Andrew-G.-River-Sample_09.13.12.png"
  ];
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

  function getGifs(topic, index) {
    console.log(topic);
    $.ajax({
      url: "http://api.giphy.com/v1/gifs/search?q=" +
            topic +
            "&api_key=Ab7efgCTM4wUS3UD0wzdSdgIYDyj8H0q&limit=10",
      method: "GET"
    }).then(function(response) {
       gifs.push(response.data[index].images.fixed_width.url);
    });
  }

  // EVENT LISTNERS
  // ========================================================
  $(document).on("click", ".topic", function() {
    if (!$(this).hasClass("expanded")) {
      // THIS IS WHAT HAPPENS ON EXPANSION
      gifs = [];
      pickedTopic = $(this).attr("data-topic");
      $(this).empty();
      let title = $("<h1 class='title'>" + pickedTopic + "</h1>");
      let gifSection = $("<div class='gifSection'></div>");
      let gif = $("<img class='gif'></div>");
      $(this).append(title, gifSection);
      for(let i = 0; i < sampleImages.length; i++) {
        getGifs(pickedTopic, i);
        gifSection.append("<img class='gif' src=" + gifs[i] + ">");
      }
    } else if ($(this).hasClass("expanded")) {
      // THIS IS WHAT HAPPENS ON COLLAPSE
      $(this).html("<p>" + $(this).attr("data-topic") + "</p>");
    }
    $(this).toggleClass("expanded");
    console.log(gifs);
  });
  
  $("#addNew").on("click", function() {
    let newTopic = $("#newTopic").val();
    if(newTopic.length > 0 && topics.indexOf(newTopic) === -1) {
      topics.push(newTopic);
      generateList();
    } else {
      console.log("not long enough");
    }
  });
});