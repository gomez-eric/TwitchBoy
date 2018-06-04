//let daUserNames = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "noobs2ninjas", "DrDisRespectLIVE", "LIRIK", "shroud", "geekandsundry"];

$(document).ready(function(){

  $(function() {
    let maxSize = $(".jumbo").css("height").replace(/[^-\d\.]/g, '');

    $(window).scroll(function() {
      scroll = (maxSize - ($(window).scrollTop()));
      $( ".theNAV" ).css('opacity', (scroll / maxSize));
      if (scroll < 0) {
        $( ".theNAV" ).hide();
        //$( ".jumbo" ).css('opacity', 0);

      } else if (scroll == maxSize) {
        //$( ".jumbo" ).css('opacity', 1);
      } else {
          $( ".theNAV" ).show();
      }

    });

  });


  $("body").addClass("animated fadeIn").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
        $(this).removeClass("animated fadeIn");
    });

  makingTheList();

  $("#refresh").click(function(){
    makingTheList();
  });

  $("#on").popover({ trigger: "hover" });
  $("#off").popover({ trigger: "hover" });
  $("#filter").popover({ trigger: "hover" });
  $("#refresh").popover({ trigger: "hover" });
  $("#twitch").popover({ trigger: "hover" });

  $("#twitch").click(function() {
    window.open($(this).find("a").attr("href"), $(this).find("a").attr("target"));
  });

  $( "#on" ).click(function() {
    $( ".offDaLine" ).hide();
    $( ".onDaLine" ).show();

  });

  $( "#off" ).click(function() {
    $( ".offDaLine" ).show();
    $( ".onDaLine" ).hide();
  });

  $( "#filter" ).click(function() {
    $( ".offDaLine" ).show();
    $( ".onDaLine" ).show();
  });

});

function makingTheList(){
  $( ".listContainer" ).text("");

  daUserNames.forEach(function(currentUser, index){
    $( ".listContainer" ).append("<li class=\"media user" + index + "\">  </li>").append("<div class=\"loader loadingbby"  + index + " \"></div>");

    let online;

    $.getJSON(createDaLinks("streams/", currentUser), function(json) {

      if (json.stream == null) {
        online = "off";
      } else if (json.stream == undefined) {
        online = "off";
      } else {
        online = "on";
      }

    })

    .done(function(){

      $.getJSON(createDaLinks("channels/", currentUser), function(json) {
        daCurrentStream = "";
        if (online === "on") {
          daCurrentStream = json.status;
        } else if (online === "off") {
          daCurrentStream = "Offline";
        }

        daImageURL = json.logo;
        daLink = json.url;
        daUserName = json.display_name;
        //createElements(index,online);
        removeUnwanted (daUserName, index, online, json);
        $( ".loadingbby"+index ).remove();
      });

    });


  });

}

function createDaLinks(requestType, daUserName) {
    return reqUrl = "https://wind-bow.gomix.me/twitch-api/"+ requestType + daUserName +"?callback=?";
}

function createElements(index, online, json) {

  $( ".user" + index ).append("<div class=\"media-left\"> <a target=\"_blank\" href=\" " + daLink + "\"> <img class=\"media-object\" src=\"" + daImageURL + "\"> </a> </div>");
  $( ".user" + index ).append("<div class=\"media-body\"> <h3 class=\"media-heading\">" + "<a href=\"" + daLink + "\" target=\"_blank\" class=\"headingUsername\" >" + daUserName + " </a></h3><h5 class=\"\"> " + daCurrentStream + "</h5></div>");

  if (online == "on") {
    $(".user" + index ).addClass("animated bounceInLeft").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
      $(this).removeClass("animated bounceInLeft");
    });
    $( ".user" + index ).addClass( "onDaLine" );
    $( ".user" + index ).css( 'background-image', 'url(\"' + json.profile_banner + '\")');
    $(".user" + index).find(".media-body").addClass("textBG");

  } else if (online == "off") {
    $(".user" + index ).addClass("animated bounceInRight").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
      $(this).removeClass("animated bounceInRight");
    });
    $( ".user" + index ).addClass( "offDaLine" );
  }

}


function removeUnwanted (users, index, online, json) {
    if (users == undefined) {
      $( ".user" + index).remove();
    } else {
      createElements(index,online, json);
    }

  }
