var script = document.createElement('script'); 
document.head.appendChild(script);    
script.type = 'text/javascript';
script.src = "https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js";
script.onload = function(){
    $.getJSON('players.json', function(players) {
      console.log(players)
      for(let i = 0; i < players['players'].length; i++) {
        $("#playerTable #tbody").append('<tr><th scope="row">' + (i + 1) + '</th><td>' + players["players"][i]["player_name"] + '</td><td>' + players["players"][i]["batting_average"] + '</td><td>' + players["players"][i]["on_base_percentage"] + '</td><td>' + players["players"][i]["slugging_percentage"] + '</td><td>' + players["players"][i]["home_runs"] + '</td><td>' + players["players"][i]["runs_batted_in"] + '</td><td>' + players["players"][i]["weighted_runs_created_plus"] + '</td></tr>')
      }
    });

    $.getJSON('teams.json', function(teams) {
      console.log(teams)
      for(let i = 0; i < teams['teams'].length; i++) {
        $("#teamTable #tbody").append('<tr><th scope="row">' + (i + 1) + '</th><td>' + teams["teams"][i]["team_name"] + '</td><td>?</td><td>?</td><td>?</td></tr>')
      }
    });
}