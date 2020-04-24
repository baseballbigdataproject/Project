import "./style.css";

const styled = styled.default;

// player data array to populate cards

/*
const players = [
  {
    name: "Lionel Messi",
    image:
      "https://pre00.deviantart.net/9cff/th/pre/i/2016/215/a/9/lionel_messi_png_topaz_by_beastieblake-dacff0z.png",
    position: "Forward",
    nationality: "Argentina",
    age: "31",
    dob: "June 24, 1987",
    height: "5'6\" (1.69m)",
    weight: "148lbs (67kg)",
    currentTeam: "Barcelona",
    goals: "42",
    strength: "Dribbling",
    number: "10",
  },
  {
    name: "Paul Pogba",
    image:
      "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/intermediary/f/26d99471-040a-4d16-9549-735eb387f92d/dayelca-c49789fd-8058-4bfa-a9d7-858ab617044a.png/v1/fill/w_712,h_1122,strp/paul_pogba_topaz_png_by_beastieblake_dayelca-pre.png",
    position: "Midfielder",
    nationality: "France",
    age: "25",
    dob: "March 3, 1993",
    height: "6'3\" (1.9m)",
    weight: "185lbs (84kg)",
    currentTeam: "Manchester United",
    goals: "22",
    strength: "Finishing",
    number: "6",
  },
];

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
`;

const Card = styled.div`
  width: 100%;
  max-width: 900px;
  padding: 20px;
  background: #191b21;
  border-radius: 10px;
  height: 500px;
  position: relative;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.25);
`;

const Player = styled.div`
  height: 600px;
  width: 600px;
  position: absolute;
  overflow: hidden;
  left: -60px;
  bottom: 0px;
  > img {
    width: 400px;
  }
`;

const PlayerName = styled.div`
  font-size: 5.5em;
  line-height: 1;
  color: #191b21;
  text-align: center;
  position: absolute;
  top: -73px;
  right: 10px;
  text-transform: uppercase;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-shadow: 0.05em 0 0 #d70435, 0.1em 0 0 #0f4c94;
  z-index: -1;
  margin: 0;
  line-height: 1;
`;

const StatsContainer = styled.div`
  color: rgba(255, 255, 255, 0.8);
  width: 450px;
  background: #2d2f35;
  height: 100%;
  border-radius: 6px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  float: right;
  padding: 20px;
`;

const Group = styled.div`
  width: 175px;
  display: inline-block;
`;

const Label = styled.h3`
  font-size: 0.875rem;
  letter-spacing: 3px;
  color: #feee43;
  text-transform: uppercase;
  line-height: 1;
  margin: 0 0 0.5em;
  &:first-child {
    margin-top: 0px;
  }
`;

const Description = styled.span`
  font-size: 1.25rem;
`;

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return players.map((player) => (
      <Container>
        <Card>
          <Player>
            <img src={player.image} alt={player.name} />
          </Player>
          <PlayerName>{player.name}</PlayerName>
          <StatsContainer>
            <Group>
              <Label>Position</Label>
              <Description>{player.position}</Description>
            </Group>
            <Group>
              <Label>Nationality</Label>
              <Description>{player.nationality}</Description>
            </Group>
            <Group>
              <Label>Age</Label>
              <Description>{player.age}</Description>
            </Group>
            <Group>
              <Label>DOB</Label>
              <Description>{player.dob}</Description>
            </Group>
            <Group>
              <Label>Height</Label>
              <Description>{player.height}</Description>
            </Group>
            <Group>
              <Label>Weight</Label>
              <Description>{player.weight}</Description>
            </Group>
            <Group>
              <Label>Current Team</Label>
              <Description>{player.currentTeam}</Description>
            </Group>
            <Group>
              <Label>Season Goals</Label>
              <Description>{player.goals}</Description>
            </Group>
            <Group>
              <Label>Strength</Label>
              <Description>{player.strength}</Description>
            </Group>
            <Group>
              <Label>Number</Label>
              <Description>{player.number}</Description>
            </Group>
          </StatsContainer>
        </Card>
      </Container>
    ));
  }
}
*/
class App extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="bg-light mt-2 text-center">
          <h1 className="display-4">
            <i className="fas fa-tasks text-info mr-2" />
            Tasks<span className="text-info ml-2"> To-Do</span>
          </h1>
        </div>

        <form>
          <div className="from-group">
            <label htmlFor="input" className="lead text light">
              Task
            </label>
            <input
              type="text"
              name="input"
              placeholder="Type your task here ..."
              className="form-control"
            />
            <button type="submit" className="btn btn-success btn-block mt-2">
              Add Task
            </button>
          </div>
          <ul className="list-group">
            <li className="list-group-item"></li>
            <task></task>
            <task></task>
            <task></task>
          </ul>
        </form>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
