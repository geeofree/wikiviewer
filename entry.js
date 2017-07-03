const $ = require('jquery')

var $result = document.getElementById("res");

function searchWiki(){
  var dotResult = $(".result");
  var url = "https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search="+$("#search").val()+"&callback=?";
  $.getJSON(url, function(data){
    var title = data[1];
    var desc = data[2];
    var link = data[3];

    for(var i = 0; i < title.length; i++){
      dotResult.append("<a href="+link[i]+" target =_blank><div class='child'><h1>"+title[i]+"</h1><p>"+desc[i]+"</p></div></a>");
    }
    });
}

function events(){
  function load(){
    $(document).ajaxStart(function(){
      $(".result").removeClass("maxHeight");
      $("body").addClass("darkened");
      $("span").css("display","none");
      if($result.hasChildNodes()){
        while($result.hasChildNodes()){
          $result.removeChild($result.firstChild);
        }
      }
    })
    $(document).ajaxComplete(function(){
      $(".field").addClass("open");
      $(".logo").addClass("clicked");
      $("body").removeClass("darkened");
      $("span").css("display","block");
      $("#search").val("");
      if($result.hasChildNodes()){
        $(".result").addClass("maxHeight");
      }
    });
  }

  $(".logo").click(function(){
   if($(".logo").hasClass("clicked")){
     $(".field").removeClass("open");
     $(".logo").removeClass("clicked");
     if($("#search").val().length != 0){
       load();
       searchWiki();
     }
   }
   else{
     $(".field").addClass("open");
     $(".logo").addClass("clicked");
   }
  })

  $("#search").keypress(function(e){
    if(e.which == 13){
      if($("#search").val().length != 0){
        $(".field").removeClass("open");
        $(".logo").removeClass("clicked");
        load();
        searchWiki();
      }
    }
  });
}

$(document).ready(function(){
  events();
})
