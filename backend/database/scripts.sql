 CREATE TABLE players (player_id VARCHAR(20), player_name VARCHAR(20),
       batting_average VARCHAR(20), on_base_percentage FLOAT, slugging_percentage FLOAT, home_runs INT);

CREATE TABLE future_games_info (g_id VARCHAR(20), home_team VARCHAR(20),
             away_team VARCHAR(20), date DATE, batter_id VARCHAR(10),pitcher_id VARCHAR(10), top VARCHAR(10));

select distinct batter_id from future_games_info where g_id in (select g_id from future_games_info where home_team = 'tex'  order by date  limit 1);

select * from players where player_id in(select distinct batter_id from future_games_info join (select g_id from future_games_info where home_team = 'tex'  order by date  limit 1) d
on future_games_info.g_id in (d.g_id) where  top = 'False');


select home_team,away_team from future_games_info where home_team = 'tex' OR away_team ='tex' order by date  limit 1


select player_id,player_name,batting_average,on_base_percentage,slugging_percentage,home_runs from players where player_id in (select distinct batter_id from future_games_info where g_id = '201800007' AND top = 'True');



select home_team,away_team,g_id  from future_games_info
where (future_games_info.home_team = 'tex' OR future_games_info.away_team = 'tex') order by date  limit 1;

CREATE TABLE final_team_stats (team_id VARCHAR(20), team_name VARCHAR(20),
             wins INT, losses INT, PCT FLOAT,home INT, away INT , division INT);

select s.team_id,s.team_name, s.PCT from final_team_stats s join (select home_team,away_team from future_games_info  where home_team = 'tex' OR away_team ='tex' order by date  limit 1) f on f.home_team = s.team_id or f.away_team = s.team_id;
