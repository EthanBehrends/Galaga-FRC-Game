<?
$data = json_decode(file_get_contents('php://input'), true);
$lbfile = fopen("leaderboard.csv","r+") or die("Unable to open file!");
$scores = fgetcsv($lbfile, 1000, ',','"');
$rating = file("leaderboard.csv");

for ($i=0; $i < count($rating); $i++) {
  if ($_GET["submittedScore"] > $scores[1]) {
    $rating[$i] = ('"' . $_GET["submittedName"] . '","' . $_GET["submittedScore"] . '"' . "\n") . $rating[$i];
    file_put_contents("leaderboard.csv",$rating);
    break;
  }
  $scores = fgetcsv($lbfile, 1000, ',','"');
}
fclose($lbfile);
$currentboard = "";
$leaderboardfile = fopen("leaderboard.csv","r") or die("Unable to open file!");
$scores = fgetcsv($leaderboardfile, 1000, ',','"');
for ($i=0; $i < 10; $i++) {
  $currentboard = $currentboard . ('<p>'. ($i + 1) . '. ' . $scores[0] . ": " . $scores[1] .'</p>');
  $scores = fgetcsv($leaderboardfile, 1000, ',','"');
}
$returneddata = array (
  'newleaderboard' => $currentboard,
);

echo(json_encode($returneddata));
/*
$leaderboardfile = fopen("leaderboard.csv","a+") or die("Unable to open file!");
fwrite($leaderboardfile, '"' . $_GET["submittedName"] . '","' . $_GET["submittedScore"] . '"' . "\n");
fclose($leaderboardfile);*/
?>
