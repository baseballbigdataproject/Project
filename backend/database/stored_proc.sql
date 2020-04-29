DELIMITER $$
DROP PROCEDURE fetch_batting_stats$$

CREATE PROCEDURE fetch_batting_stats(IN team_id VARCHAR(20))

BEGIN
  DECLARE home_team VARCHAR(20);
  DECLARE away_team VARCHAR(20);
  DECLARE _g_id VARCHAR(20);

  DECLARE _top VARCHAR(20);


  SET _top = 'True';
  select f.home_team,f.away_team,f.g_id INTO home_team, away_team,_g_id  from future_games_info f where (f.home_team = team_id OR f.away_team = team_id) order by f.date  limit 1;
  IF home_team = team_id THEN
    SET _top = 'False';
  END IF;
  
  select * from players p where p.player_id in (select distinct f.batter_id from future_games_info f where f.g_id = _g_id AND f.top = _top);


END$$
DELIMITER ;
