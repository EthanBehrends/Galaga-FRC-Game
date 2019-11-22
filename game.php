<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <link rel="stylesheet" type="text/css" href="stylesheet.css" />
    <meta name="viewport" content="user-scalable=NO, width=device-width, initial-scale=1.0">
    <script src="jquery-3.2.1.min.js"></script>
    <script src="jQuery.Custom-Caret-master/jquery.custom-caret-1.1.js"></script>
    <script src="newscript.js"></script>
    <title>Power Up Galaga</title>
  </head>
  <body onresize="DrawEnemies()">
    <div id="player"></div>
    <div class="rocket" id="shotone"></div>
    <div class="rocket" id="shottwo"></div>
    <div class="rocket" id="shotthree"></div>
    <div class="rocket" id="shotfour"></div>
    <div id="incomingbullets"></div>
    <div id="enemywrapper"> </div>
    <div id="score"> </div>
    <div id="time"></div>
    <div id="banner"></div><!--
    <form action="leaderboard.php" method="post">
      <input type="text" autocomplete="off" placeholder="test" ></input>
    </form>!-->
    <div id="name" contenteditable="true"></div>
    <div id="button">Submit</div>
    <div id="leaderboard">
      <?
        $leaderboardfile = fopen("leaderboard.csv","r") or die("Unable to open file!");
        $scores = fgetcsv($leaderboardfile, 1000, ',','"');
        for ($i=0; $i < 10; $i++) {
          print_r('<p>'. ($i + 1) . '. ' . $scores[0] . ": " . $scores[1] .'</p>');
          $scores = fgetcsv($leaderboardfile, 1000, ',','"');
        }

      ?>
    </div>
  </body>
  <script>

      $("#name").customCaret();

  </script>
</html>
