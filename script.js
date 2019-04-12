let user_names_array = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "noobs2ninjas", "DrDisRespectLIVE", "LIRIK", "shroud", "geekandsundry"];

$(document).ready(function(){

  $("body").addClass("animated fadeIn").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
        $(this).removeClass("animated fadeIn");
    });

  makingTheList();

  $("#refresh").click(function(){
    makingTheList();
  });

  $("#on, #off, #filter, #refresh, #twitch, #github").popover({ trigger: "hover" });

  $("#twitch, #github").click(function() {
    window.open($(this).find("a").attr("href"), $(this).find("a").attr("target"));
  });

  $( "#on" ).click(function() {
    $( ".status_offline" ).hide();
    $( ".status_online" ).show();
  });

  $( "#off" ).click(function() {
    $( ".status_offline" ).show();
    $( ".status_online" ).hide();
  });

  $( "#filter" ).click(function() {
    $( ".status_offline" ).show();
    $( ".status_online" ).show();
  });

});

function makingTheList(){
  $( ".listContainer" ).text("");

  user_names_array.forEach(function(currentUser, index){
    let online;

    $.getJSON(create_links("streams/", currentUser), function(json) {

      if (json.status == 404) {
        console.log("USER DOES NOT EXIST: \n\'" + currentUser+"\'");
      } else {
        if (json.stream) online = true;
        else online = false;

        $( ".listContainer" ).append("<li class=\"media user" + index + "\">  </li>").append("<div class=\"loader loading_stat"  + index + " \"></div>");

      }

    })

    .done(function(){

      $.getJSON(create_links("channels/", currentUser), function(json) {
        current_stream_stat = "";
        if (online === true) {
          current_stream_stat = json.status;
        } else if (online === false) {
          current_stream_stat = "Offline";
        }

        image_url = json.logo;
        url_link = json.url;
        user_name = json.display_name;

        create_elements(index, online, json);

        $( ".loading_stat" + index ).remove();

      });

    });


  });

}

function create_links(requestType, user_name) {
    return reqUrl = "https://wind-bow.gomix.me/twitch-api/"+ requestType + user_name +"?callback=?";
}

function create_elements(index, online, json) {

  $( ".user" + index ).append("<div class=\"media-left\"> <a target=\"_blank\" href=\" " + url_link + "\"> <img class=\"media-object\" src=\"" + image_url + "\"> </a> </div>");
  $( ".user" + index ).append("<div class=\"media-body\"> <h3 class=\"media-heading\">" + "<a href=\"" + url_link + "\" target=\"_blank\" class=\"headingUsername\" >" + user_name + " </a></h3><h5 class=\"\"> " + current_stream_stat + "</h5></div>");

  if (online == true) {
    $(".user" + index ).addClass("animated pulse").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
      $(this).removeClass("animated pulse");
    });
    $( ".user" + index ).addClass( "status_online" );
    $( ".user" + index ).css( 'background-image', 'url(\"' + json.profile_banner + '\")');
    $(".user" + index).find(".media-body").addClass("textBG");

  } else if (online == false) {
    $(".user" + index ).addClass("animated pulse").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
      $(this).removeClass("animated pulse");
    });
    $( ".user" + index ).addClass( "status_offline" );
  }

}
