var randomClickTimes = 0;
var searchClickTimes = 0;
$("#random-button").on("click", function(){
  $(".content").css({"display": "block"});
  $(".result").css({"display":"none"});
  $(".header").animate({"margin-top":"1rem"},"slow");
  $("#contentBlock").addClass("showContent"); 
  if (randomClickTimes > 0) {
    $("#contentBlock").removeClass("fadeInOut");
    setTimeout(function(){
      $("#contentBlock").addClass("fadeInOut");
    }, 50);
  }
  randomClickTimes += 1;
  $("#contentBlock").html("<iframe id='wikiPage' src='https://en.wikipedia.org/wiki/Special:Random'></iframe>");
});
  //$(".result").css({"display":"block"});

$(".btn-search").on("click", function(e){
  e.preventDefault();
  $(".content").css({"display": "none"});
  $(".result").css({"display":"block"});
  var searchContent = $("#searchInput").val();
  //console.log(searchContent);
  $("#searchForm")[0].reset();
  $(".header").animate({"margin-top":"1rem"},"slow");
  $("#resultList").addClass("showResult"); 
  if (searchClickTimes > 0) {
    $("#resultList").removeClass("fadeInOut");
    setTimeout(function(){
      $("#resultList").addClass("fadeInOut");
    }, 50);
  }
  searchClickTimes += 1;
  var apiURL =encodeURI( "https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search="+searchContent+"&callback=?");
  $.getJSON(apiURL, function(json){
    var resultsLen = json[1].length;
    var listContent = "<ul>";
    for (var i=0; i<resultsLen; i++){
      listContent+="<a target='_blank' href='"+json[3][i]+"'><li><h5>"+json[1][i]+"</h5>"+json[2][i]+"</li></a>";
    };
    listContent += "</ul>";
    $("#resultList").html(listContent);
  });
});