var script2 = document.createElement('script'); 
document.head.appendChild(script2);    
script2.type = 'text/javascript';
script2.src = "https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js";
script2.onload = function() {
  console.log("test")
  // Set new default font family and font color to mimic Bootstrap's default styling
  Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
  Chart.defaults.global.defaultFontColor = '#858796';

  let team1 = "", team2 = "", team1score = 0, team2score = 0;
  let team1outcome = "", team2outcome = "";

  $.getJSON('prediction.json', function(predict) {
      console.log(predict);
      for(let i = 0; i < predict['prediction'].length; i++) {
        team1 = predict['prediction'][i]['team_1_id']
        team2 = predict['prediction'][i]['team_2_id']
        team1score = predict['prediction'][i]['team_1_probability'] * 100
        team2score = predict['prediction'][i]['team_2_probability'] * 100
      }
    
      team1outcome = (team1score > team2score) ? team1.toUpperCase() + " Win" : team1.toUpperCase() + " Lose";
      team2outcome = (team2score > team1score) ? team2.toUpperCase() + " Win" : team2.toUpperCase() + " Lose";

      $("#team1").text(team1outcome);
      $("#team2").text(team2outcome);
    
      // Pie Chart ExampleP
      var ctx = document.getElementById("myPieChart");
      var myPieChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: [team1outcome, team2outcome],
          datasets: [{
            data: [team1score, team2score],
            backgroundColor: ['#52474c','#df4e99'],
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