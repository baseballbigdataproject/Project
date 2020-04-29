function fetchData() {
  console.log("Start fetch");
  //fetch("https://reqres.in/api/users")
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const player_id = urlParams.get("player_id");
  fetch("players_team_id.json")
    .then((response) => {
      //console.log(response);
      if (!response.ok) {
        throw Error("error");
      }
      //console.log(response);
      return response.json();
      //console.log(data);
    })
    .then((data) => {
      //console.log(team_id);
      //console.log(players);
      //html.adjacenthtml gives mmore fexibility
      const html = data.players
        .map((user) => {
          return `
          <div class="header">${user.player_name}</div>
          <div class="banner-img">
                <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.8_MgA5v1EnVIw2EIwVZOiwHaD4%26pid%3DApi&f=1/640x360" alt="Image 1" />
              </div>
         
            
          <div class="stats">
                <div><strong>Batting Avg</strong> ${user.batting_average}</div>

          <div><strong>On Base Percentage</strong> ${user.on_base_percentage}</div>

          <div><strong>Slugging Percentage</strong> ${user.slugging_percentage}</div>
              </div>

          <div class="stats">

                <div><strong></strong> </div>

                <div class = "gang"><strong></strong>yuh</div>

          <div><strong> Home runs </strong> ${user.home_runs}</div>
              </div>

          <div class="footer">
                <a href="#" class="Cbtn Cbtn-primary">Home Page</a>
                <a href="bhawana.html" class="Cbtn Cbtn-danger">Team Page</a>
              </div>

          
          `;
        })
        .join("");
      //console.log(html);

      document.querySelector("#app").insertAdjacentHTML("afterBegin", html);
    })
    .catch((error) => {
      console.log(error);
    });
}
fetchData();
//// <p><img src="${user.avatar}" alt="${user.first_name}" /></p>

//original
//* {
//  /*box-sizing: border-box;*/
//  margin: 0px;
//  padding: 0px;
//}

//center aligned
// * {
//  /*box-sizing: border-box;*/
//  display: block;
//  margin- left: auto;
//margin - right: auto;
// /*margin: 0px;*/
//padding: 0px;
//}
