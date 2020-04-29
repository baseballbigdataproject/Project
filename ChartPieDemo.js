var script2 = document.createElement('script'); 
document.head.appendChild(script2);    
script2.type = 'text/javascript';
script2.src = "https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js";
script2.onload = function() {

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const team_id = urlParams.get('team_id');
  console.log(team_id);

  console.log("test")
  // Set new default font family and font color to mimic Bootstrap's default styling
  Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
  Chart.defaults.global.defaultFontColor = '#858796';

  let team1 = "", team2 = "", team1score = 0, team2score = 0;
  let team1outcome = "", team2outcome = "";
  let tem1name = "", team2name= "";

  $.getJSON('http://35.239.62.224:5000/games?team_id=' + team_id, function(predict) {
      console.log(predict);
      for(let i = 0; i < predict['prediction'].length; i++) {
        team1 = predict['prediction'][i]['team_1_id']
        team2 = predict['prediction'][i]['team_2_id']

        team1name = predict['prediction'][i]['team_1_name']
        team2name = predict['prediction'][i]['team_2_name']

        team1score = predict['prediction'][i]['team_1_probability'] * 100 // gives the precentage like 70%
        team2score = predict['prediction'][i]['team_2_probability'] * 100 // gives the percentage like 30%
      }
    
      team1outcome = (team1score > team2score) ? team1.toUpperCase() + ": Win" : team1.toUpperCase() + ": Lose";
      team2outcome = (team2score > team1score) ? team2.toUpperCase() + ": Win" : team2.toUpperCase() + ": Lose";

      // $("#team1name").text(team1outcome);
      // $("#team2name").text(team2outcome);

      $("#team1").text(team1name + " ("  + team1outcome + ")" );
      $("#team2").text(team2name + " (" + team2outcome + ")");
 

    
      // Pie Chart ExampleP
      var ctx = document.getElementById("myPieChart");
      var myPieChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: [team1outcome, team2outcome],
          datasets: [{
            data: [team1score, team2score],
            backgroundColor: ['#df4e99', '#52474c'],
            //hoverBackgroundColor: ['#df4e99', '#52474c', '#ebcedd'],
            //hoverBorderColor: "rgba(234, 236, 244, 1)",
          }],
        },
        options: {
          maintainAspectRatio: false,
          tooltips: {
            backgroundColor: "rgb(255,255,255)",
            bodyFontColor: "#858796",
            borderColor: '#dddfeb',
            borderWidth: 1,
            xPadding: 15,
            yPadding: 15,
            displayColors: false,
            caretPadding: 10,
          },
          legend: {
            display: false
          },
          cutoutPercentage: 80,
        },
      });
  });
}
