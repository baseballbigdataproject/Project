//imports
import org.apache.spark.sql.types.{StructType, StructField, StringType, IntegerType};


// data pre processing


val atbats = spark.read.format("csv").option("header", "true").option("mode", "DROPMALFORMED").load("gs://big-data-class-274800/baseball/atbats.csv")
val games = spark.read.format("csv").option("header", "true").option("mode", "DROPMALFORMED").load("gs://big-data-class-274800/baseball/games.csv")
val pitches = spark.read.format("csv").option("header", "true").option("mode", "DROPMALFORMED").load("gs://big-data-class-274800/baseball/pitches.csv")
val player_names = spark.read.format("csv").option("header", "true").option("mode", "DROPMALFORMED").load("gs://big-data-class-274800/baseball/player_names.csv")

val combined1 = games.join(atbats,"g_id")
val entire = combined1.join(pitches.withColumn("ab_id", $"ab_id".substr(lit(1), length($"ab_id")-2)),"ab_id")
//entire.write.format("csv").save("gs://big-data-class-274800/baseball/afterJoin.csv")

// data prep
//todo write columns
val afterJoin = spark.read.format("csv").option("header", "true").option("mode", "DROPMALFORMED").load("gs://big-data-class-274800/baseball/afterJoin.csv")
// dropping unnecessary columns
/*
start_speed, spin_rate are useful for predicting future pitcher performance within each pitch_type category. code is also helpful for specific details and can be mapped directly to type.
pitch_type can be used to tune our calculations a little if a batter does especially well or poorly against a certain type of pitch. For example, if batter X does especially well against a slider and pitcher Y throws a higher than normal amount of sliders, we would expect the hitter to have a slightly more productive plate appearance than if we just used raw numbers.
pitch_num could be used for summing up pitch counts more quickly, but isn't really necessary.
b_count and s_count are used to determine how far along the plate appearance is, outs determines how much longer a team can hit for and is also useful.
*/

// computing batsmen stats
val trainAtBats = atbats.filter(not(substring(col("ab_id"),0,4).isin("2018")))
val  hits = trainAtBats.filter(col("event").isin("Single","Double","Triple","Home Run")).groupBy($"batter_id").count().withColumn("hits",$"count").select("batter_id","hits")
val totalAtBats = trainAtBats.groupBy($"batter_id").count().withColumn("totalAtBats",$"count").select("batter_id","totalAtBats")
val battingAvgDf = totalAtBats.join(hits,Seq("batter_id"), "outer").na.fill(0)
val battingAverageDf = battingAvgDf.withColumn("batting_average",bround($"hits"/$"totalAtBats",2)).select("batter_id","batting_average")
val  walks = trainAtBats.filter(col("event").isin("Walk")).groupBy($"batter_id").count().withColumn("walks",$"count").select("batter_id","walks")
val  hitByPitches = trainAtBats.filter(col("event").isin("Hit By Pitch")).groupBy($"batter_id").count().withColumn("hitByPitches",$"count").select("batter_id","hitByPitches")
val  sacrificeFlies = trainAtBats.filter(col("event").isin("Sacrifice Bunt DP")).groupBy($"batter_id").count().withColumn("sacrificeFlies",$"count").select("batter_id","sacrificeFlies")

val on_base_percentage_num = hits.join(walks,Seq("batter_id"),"outer").na.fill(0).join(hitByPitches,Seq("batter_id"),"outer").na.fill(0).withColumn("numerator",$"hits"+$"walks"+$"hitByPitches").select("batter_id","numerator")
val on_base_percentage_den = totalAtBats.join(hits,Seq("batter_id"), "outer").na.fill(0).join(walks,Seq("batter_id"), "outer").na.fill(0).join(sacrificeFlies,Seq("batter_id"), "outer").na.fill(0).withColumn("denominator",$"totalAtBats"+$"hits"+$"walks"+$"sacrificeFlies").select("batter_id","denominator")
val on_base_percentage = on_base_percentage_num.join(on_base_percentage_den,Seq("batter_id"),"outer").na.fill(0).withColumn("on_base_percentage",bround(lit(100)*$"numerator"/$"denominator",2)).select("batter_id","on_base_percentage")


val  singles = trainAtBats.filter(col("event").isin("Singles")).groupBy($"batter_id").count().withColumn("singles",$"count").select("batter_id","singles").withColumn("singles",col("singles").cast(IntegerType)
val  doubles = trainAtBats.filter(col("event").isin("Double")).groupBy($"batter_id").count().withColumn("doubles",$"count").select("batter_id","doubles").withColumn("doubles",col("doubles").cast(IntegerType))
val  triples = trainAtBats.filter(col("event").isin("Triple")).groupBy($"batter_id").count().withColumn("triples",$"count").select("batter_id","triples").withColumn("triples",col("triples").cast(IntegerType))
val  home_runs = trainAtBats.filter(col("event").isin("Home Run")).groupBy($"batter_id").count().withColumn("home_runs",$"count").select("batter_id","home_runs").withColumn("home_runs",col("home_runs").cast(IntegerType))
val slugging_percentage_num = singles.join(doubles,Seq("batter_id"),"outer").na.fill(0).join(triples,Seq("batter_id"),"outer").na.fill(0).join(home_runs,Seq("batter_id"),"outer").na.fill(0).withColumn("numerator",$"singles"+lit(2)*$"doubles"+lit(3)*$"triples"+lit(4)*$"home_runs").select("batter_id","numerator")
val slugging_percentage = slugging_percentage_num.join(totalAtBats,Seq("batter_id"),"outer").na.fill(0).withColumn("slugging_percentage",bround(lit(100)*$"numerator"/$"totalAtBats",2)).select("batter_id","slugging_percentage")

//(player stats)
val afterJoinTrain = entire.filter(not(substring(col("ab_id"),0,4).isin("2018")))
val players =  player_names.withColumn("player_name",concat($"first_name", lit(" "), $"last_name")).withColumn("batter_id",$"id").select("batter_id","player_name").join(battingAverageDf,Seq("batter_id"),"outer").na.fill(0).join(on_base_percentage,Seq("batter_id"),"outer").na.fill(0).join(slugging_percentage,Seq("batter_id"),"outer").na.fill(0).join(home_runs,Seq("batter_id"),"outer").na.fill(0)
//players.coalesce(1).write.format("csv").save("gs://big-data-class-274800/baseball/players.csv")

//future games (test)
val testAtBats = atbats.filter(substring(col("ab_id"),0,4).isin("2018"))
val games_info = games.select("g_id","home_team","away_team","date").join(testAtBats.select("g_id","batter_id","pitcher_id","top"),Seq("g_id"))
val future_games_info = games_info.dropDuplicates()
future_games_info.coalesce(1).write.format("csv").save("gs://big-data-class-274800/baseball/future_games_info.csv")
//
// team stats
val games = spark.read.format("csv").option("header", "true").option("mode", "DROPMALFORMED").load("gs://big-data-class-274800/baseball/games.csv")
val games_train = games.filter($"date" < "2018-01-01")
val home_wins= games_train.filter($"home_final_score">$"away_final_score").groupBy($"home_team").count().withColumn("team_id",$"home_team").withColumn("home",$"count").select("team_id","home")
val away_wins= games_train.filter($"home_final_score"<=$"away_final_score").groupBy($"away_team").count().withColumn("team_id",$"away_team").withColumn("away",$"count").select("team_id","away")
val all_wins = home_wins.join(away_wins,Seq("team_id")).withColumn("wins",$"home"+$"away")
val home_losses= games_train.filter($"home_final_score"<$"away_final_score").groupBy($"home_team").count().withColumn("team_id",$"home_team").withColumn("home_losses",$"count").select("team_id","home_losses")
val away_losses= games_train.filter($"home_final_score">$"away_final_score").groupBy($"away_team").count().withColumn("team_id",$"away_team").withColumn("away_losses",$"count").select("team_id","away_losses")
val losses = home_losses.join(away_losses,Seq("team_id")).withColumn("losses",$"home_losses"+$"away_losses").select("team_id","losses")
val total = all_wins.join(losses,Seq("team_id")).withColumn("total",$"wins"+$"losses")
val total_with_pct = total.withColumn("pct",bround(lit(100)*$"wins"/$"total",2))
val divisionsMap = Map("bal"->"1","bos"->"1","nya"->"1","tba"->"1","tor"->"1",
    "cha" -> "2", "cle" -> "2","det"->"2","kca"->"2","min"->"2",
    "hou"->"3","ana"->"3","oak"->"3","sea"->"3","tex"->"3",
    "chn"->"5","cin"->"5","mil"->"5","pit"->"5","sln"->"5",
    "atl"->"4","mia"->"4","nyn"->"4","phi"->"4","was"->"4",
    "ari"->"6","col"->"6","lan"->"6","sdn"->"6","sfn"->"6"
    )

val divisionsMapDf = sc.parallelize(divisionsMap.toSeq).toDF("team_id", "division")
val team_stats = total_with_pct.join(divisionsMapDf,Seq("team_id"))
val team_names = spark.read.format("csv").option("header", "true").option("mode", "DROPMALFORMED").load("gs://big-data-class-274800/baseball/team_names.csv")
val final_team_stats  = team_stats.join(team_names,Seq("team_id")).withColumn("PCT",$"pct").select("team_id","team_name","wins","losses","PCT","home","away","division")
final_team_stats.coalesce(1).write.format("csv").save("gs://big-data-class-274800/baseball/final_team_stats.csv")
