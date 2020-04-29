

var script = document.createElement('script'); 
document.head.appendChild(script);    
script.type = 'text/javascript';
script.src = "https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js";


script.onload = function() {
    $.getJSON('teams.json', function(teams) {

      for(let i = 0; i < teams['teams'].length; i++) {

        if(teams["teams"][i]['division'] == 6){
            $("#nlw #tbody1").append('<tr><th scope="row">' + '<a href=player.html?team_id='+teams["teams"][i]["team_id"]+'><img src=' + teams["teams"][i]["img"] +' width="45" height="45"> </a>'+  '</th><td>' +'<a href=player.html?team_id='+teams["teams"][i]["team_id"]+'>' + teams["teams"][i]["team_name"] +'</a>' + '</td><td>' + teams["teams"][i]["wins"] + '</td><td>' + teams["teams"][i]["losses"]+ '</td><td>' + teams["teams"][i]["PCT"]+ '</td><td>'+ teams["teams"][i]["home"]+'</td><td>'+ teams["teams"][i]["away"]+'</td></tr>')
        }
        if(teams["teams"][i]['division'] == 5){
            $("#nlc #tbody2").append('<tr><th scope="row">' + '<a href=player.html?team_id='+teams["teams"][i]["team_id"]+'><img src=' + teams["teams"][i]["img"] +' width="45" height="45"> </a>'+  '</th><td>' +'<a href=player.html?team_id='+teams["teams"][i]["team_id"]+'>' + teams["teams"][i]["team_name"] +'</a>' + '</td><td>' + teams["teams"][i]["wins"] + '</td><td>' + teams["teams"][i]["losses"]+ '</td><td>' + teams["teams"][i]["PCT"]+ '</td><td>'+ teams["teams"][i]["home"]+'</td><td>'+ teams["teams"][i]["away"]+'</td></tr>')
        }
        if(teams["teams"][i]['division'] == 4){
            $("#nle #tbody3").append('<tr><th scope="row">' + '<a href=player.html?team_id='+teams["teams"][i]["team_id"]+'><img src=' + teams["teams"][i]["img"] +' width="45" height="45"> </a>'+  '</th><td>' +'<a href=player.html?team_id='+teams["teams"][i]["team_id"]+'>' + teams["teams"][i]["team_name"] +'</a>' + '</td><td>' + teams["teams"][i]["wins"] + '</td><td>' + teams["teams"][i]["losses"]+ '</td><td>' + teams["teams"][i]["PCT"]+ '</td><td>'+ teams["teams"][i]["home"]+'</td><td>'+ teams["teams"][i]["away"]+'</td></tr>')
        }
        if(teams["teams"][i]['division'] == 3){
            $("#alw #tbody4").append('<tr><th scope="row">' + '<a href=player.html?team_id='+teams["teams"][i]["team_id"]+'><img src=' + teams["teams"][i]["img"] +' width="45" height="45"> </a>'+  '</th><td>' +'<a href=player.html?team_id='+teams["teams"][i]["team_id"]+'>' + teams["teams"][i]["team_name"] +'</a>' + '</td><td>' + teams["teams"][i]["wins"] + '</td><td>' + teams["teams"][i]["losses"]+ '</td><td>' + teams["teams"][i]["PCT"]+ '</td><td>'+ teams["teams"][i]["home"]+'</td><td>'+ teams["teams"][i]["away"]+'</td></tr>')
        }
        if(teams["teams"][i]['division'] == 2){
            $("#alc #tbody5").append('<tr><th scope="row">' + '<a href=player.html?team_id='+teams["teams"][i]["team_id"]+'><img src=' + teams["teams"][i]["img"] +' width="45" height="45"> </a>'+  '</th><td>' +'<a href=player.html?team_id='+teams["teams"][i]["team_id"]+'>' + teams["teams"][i]["team_name"] +'</a>' + '</td><td>' + teams["teams"][i]["wins"] + '</td><td>' + teams["teams"][i]["losses"]+ '</td><td>' + teams["teams"][i]["PCT"]+ '</td><td>'+ teams["teams"][i]["home"]+'</td><td>'+ teams["teams"][i]["away"]+'</td></tr>')
        }
        if(teams["teams"][i]['division'] == 1){
            $("#ale #tbody6").append('<tr><th scope="row">' + '<a href=player.html?team_id='+teams["teams"][i]["team_id"]+'><img src=' + teams["teams"][i]["img"] +' width="45" height="45"> </a>'+  '</th><td>' +'<a href=player.html?team_id='+teams["teams"][i]["team_id"]+'>' + teams["teams"][i]["team_name"] +'</a>' + '</td><td>' + teams["teams"][i]["wins"] + '</td><td>' + teams["teams"][i]["losses"]+ '</td><td>' + teams["teams"][i]["PCT"]+ '</td><td>'+ teams["teams"][i]["home"]+'</td><td>'+ teams["teams"][i]["away"]+'</td></tr>')
        }

      }

    });


var script = document.createElement('script'); 
document.head.appendChild(script);    
script.type = 'text/javascript';
script.src = "https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js";
script.onload = function(){
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const team_id = urlParams.get('team_id');
    $.getJSON('http://35.239.62.224:5000/players?team_id='+team_id, function(players) {
      for(let i = 0; i < players['players'].length; i++) {
        $("#playerTable #tbody").append('<tr><th scope="row">' + (i + 1) + '</th><td>' + players["players"][i]["player_name"] + '</td><td>' + players["players"][i]["batting_average"] + '</td><td>' + players["players"][i]["on_base_percentage"] + '</td><td>' + players["players"][i]["slugging_percentage"] + '</td><td>' + players["players"][i]["home_runs"] + '</td><td>' + players["players"][i]["runs_batted_in"] + '</td><td>' + players["players"][i]["weighted_runs_created_plus"] + '</td></tr>')
      }
    });

    $.getJSON('teams.json', function(teams) {
      for(let i = 0; i < teams['teams'].length; i++) {
        $("#teamTable #tbody").append('<tr><th scope="row">' + (i + 1) + '</th><td>' + teams["teams"][i]["team_name"] + '</td><td>?</td><td>?</td><td>?</td></tr>')
      }
    });
}















// var script = document.createElement('script');
// document.head.appendChild(script);
// script.type = 'text/javascript';
// script.src = "https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js";
// script.onload = function() {
//   const queryString = window.location.search;
//   const urlParams = new URLSearchParams(queryString);
//   const team_id = urlParams.get('team_id');
//   console.log(team_id);
//   // var team_id = "col"
//   // $.getJSON('http://35.239.62.224:5000/players?team_id='+team_id, function(players) {
//   $.getJSON('http://35.239.62.224:5000/players?team_id=' + team_id, function(players) {
//     console.log(players)
//     for(let i = 0; i < players['players'].length; i++) {
//       $("#playerTable #tbody").append('<tr><th scope="row">' + (i + 1) + '</th><td><a href="player.html?player_id=' + players["players"][i]["player_id"] + '">' + players["players"][i]["player_name"] + '</a></td><td>' + players["players"][i]["batting_average"] + '</td><td>' + players["players"][i]["on_base_percentage"] + '</td><td>' + players["players"][i]["slugging_percentage"] + '</td><td>' + players["players"][i]["home_runs"] + '</td><td>' + '</td></tr>')
//     }
//   });
//   $.getJSON('http://35.239.62.224:5000/teams', function(teams) {
//     console.log(teams)
//     for(let i = 0; i < teams['teams'].length; i++) {
//       $("#teamTable #tbody").append('<tr><th scope="row">' + (i + 1) + '</th><td>' + teams["teams"][i]["team_name"] + '</td><td>' + teams["teams"][i]["batting_average"] + '</td><td>' + teams["teams"][i]["wins"] + '</td><td>?</td><td>?</td><td>?</td><td>?</td></tr>')
//     }
//   });
//   $.getJSON('http://159.65.248.122:4000/api', function(twit) {
//     console.log(twit)
//     for(let i = 0; i < twit['statuses'].length; i++) {
//       $("#latest-tweets").append('<div style="border: 1px solid #000; padding: 10px; margin-bottom: 10px;"><div id="user" style="font-size: 11px; text-decoration: underline;">@' + twit.statuses[i].user.screen_name + ':</div><div style="font-weight: bold;">' + twit.statuses[i].text + '</div><div style="font-size: 9px; font-style: italic;">' + twit.statuses[i].created_at + '</div></div>')
//     }
//   });
  // $.getJSON('prediction.json', function(predict) {
  //   console.log(predict)
  //   console.log(predict["teams"][i]["team_1_id"])
  //   // for(let i = 0; i < predict['teams'].length; i++) {
  //   //   $("#teamTable #tbody").append('<tr><th scope="row">' + (i + 1) + '</th><td>' + predict["teams"][i]["team_1_id"] + '</td><td>' + predict["teams"][i]["batting_average"] + '</td><td>' + predict["teams"][i]["wins"] + '</td><td>?</td><td>?</td><td>?</td><td>?</td></tr>')
  //   // }
  // });
  // $.urlParam = function(teams){
  // var results = new RegExp('[\?&]' + teams + '=([^&#]*)').exec(window.location.href);
  // if (results==null) {
  //    return null;
  // }
  // return decodeURI(results[1]) || 0;
  // }
  // console.log(decodeURIComponent($.urlParam('team_id')));
}
