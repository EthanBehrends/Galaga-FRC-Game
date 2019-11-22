var enemy = [];
var ebullets = [];
for (var i = 0; i < 32; i++) {
  enemy[i] = new Enemy(i);
};

for (var i = 1001; i < 1006; i++) {
  ebullets[i] = new Bullet(i);
  console.log('test');
};
var viewportmeta = document.querySelector('meta[name="viewport"]');
viewportmeta.content = 'user-scalable=NO, width=device-width, initial-scale=1.0'
function clamp(val, min, max) {
    return val > max ? max : val < min ? min : val;
};
var shot1 = false;
var shot2 = false;
var shot3 = false;
var shot4 = false;
var shot1pos = 85;
var shot2pos = 85;
var shot3pos = 85;
var shot4pos = 85;
var score = 0;
var defaultTime = 30;
var time = 30;
var gameState = 'running';
var enemiesLeft = 0;
function Enemy(numb) {
  this.x = numb % 8;
  this.y = Math.floor(numb / 8) + 1;
  this.type = this.y + ".svg";
  this.xpos = (100 / 8 * this.x + this.x * 5 / 8);
  this.ypos = 8;
  this.alive=true;
}
function Bullet(numb) {
  this.active = false;
}
function drawstars() {
  for (var i = 0; i < 30; i++) {
    $('body').append($('<div id="sparklecont" style="animation-delay: ' + Math.random() * 5 +'s;left:' + Math.floor(Math.random() * 100) +'vw"><div id="sparkle" style="animation-delay: ' + Math.random() * 4 +'s;"></div></div>'));
  }
}
function DrawEnemies() {
  if(gameState == 'running'){
  $("#enemywrapper").empty();
  enemiesLeft=0;
  $("#enemywrapper").css('left',window.innerWidth/2 - parseInt($("#enemywrapper").css('width'))/2);
  for (var i = 0; i < 32; i++) {
    if(enemy[i].alive){
      $("#enemywrapper").append("<img src='assets/powerup/" + enemy[i].type + "' style='position:absolute;' id='" + i + "'/>");
      $("#" + i).css("left",enemy[i].xpos +"%");
      enemiesLeft +=1;
      $("#" + i).css("width",100 / 8 - 5 +"%");
      $("#" + i).css("top",(enemy[i].y -1) * .21 * parseInt($("#" + i).css("width"))  +"%");
    }
  }
}
};
function DrawBullets() {
  for (var i=1001; i < 1006; i++){
    $('#incomingbullets').append('<div class="enemybullet" id="' + i + '"></div>');
  }
}
function getPosition(idnum) {
  return parseInt($('#enemywrapper').css('left')) + parseInt($('#' + idnum).css('left'));
}
function advanceShots() {
  if(shot1) {
    shot1pos -= 3;
    $('#shotone').css('top',shot1pos +'vh');
    if(parseInt($('#shotone').css('top')) < (0 - parseInt($('#shotone').css('height')))){
      shot1pos =150;
      $('#shotone').css('top', shot1pos +'vh');
      shot1=false;
    }
  }
  if(shot2) {
    shot2pos -= 3;
    $('#shottwo').css('top',shot2pos +'vh');
    if(parseInt($('#shottwo').css('top')) < (0 - parseInt($('#shottwo').css('height')))){
      shot2pos =150;
      $('#shottwo').css('top', shot2pos +'vh');
      shot2=false;
    }
  }
  if(shot3) {
    shot3pos -= 3;
    $('#shotthree').css('top',shot3pos +'vh');
    if(parseInt($('#shotthree').css('top')) < (0 - parseInt($('#shotthree').css('height')))){
      shot3pos =150;
      $('#shotthree').css('top', shot3pos +'vh');
      shot3=false;
    }
  }
  if(shot4) {
    shot4pos -= 3;
    $('#shotfour').css('top',shot4pos +'vh');
    if(parseInt($('#shotfour').css('top')) < (0 - parseInt($('#shotfour').css('height')))){
      shot4pos =150;
      $('#shotfour').css('top', shot4pos +'vh');
      shot4=false;
    }
  }
  for (var i = 1001; i < 1006; i++) {
    if(ebullets[i].active){
      $('#' + i).css('top',parseInt($('#' + i).css('top')) + 2 + 'px');
      testAttack(i);
      if(parseInt($('#' + i).css('top')) > window.innerHeight) {
        ebullets[i].active = false;
      }
    }
  }
  };
function testAttack(bullet) {
  if(parseInt($('#player').css('left')) < parseInt($('#' + bullet).css('left'))) {
    if(parseInt($('#player').css('left')) + parseInt($('#player').css('width')) > parseInt($('#' + bullet).css('left')) + parseInt($('#' + bullet).css('width'))) {
      if(parseInt($('#player').css('top')) < parseInt($('#' + bullet).css('top')) + parseInt($('#' + bullet).css('height'))) {
        if(parseInt($('#player').css('top')) + parseInt($('#player').css('height')) > parseInt($('#' + bullet).css('top')) + parseInt($('#' + bullet).css('height'))) {
          time = 1;
        }
      }
    }
  }
}
function Shoot() {
  if(!shot1) {
    shot1 = true;
    shot1pos = 85;
    $('#shotone').css('top',shot1pos +'vh');
    $('#shotone').css('left', parseInt(window.event.clientX) - (parseInt($('#shotone').css('width')) / 2 ) + "px");

  }
  else if(!shot2) {
    shot2 = true;
    shot2pos = 85;
    $('#shottwo').css('top',shot2pos +'vh');
    $('#shottwo').css('left',  window.event.clientX - (parseInt($('#shottwo').css('width')) / 2) + "px");
  }
  else if(!shot3) {
    shot3 = true;
    shot3pos = 85;
    $('#shotthree').css('top',shot3pos +'vh');
    $('#shotthree').css('left',  window.event.clientX - (parseInt($('#shotthree').css('width')) / 2) + "px");

}
else if(!shot4) {
  shot4 = true;
  shot4pos = 85;
  $('#shotfour').css('top',shot4pos +'vh');
  $('#shotfour').css('left',  window.event.clientX - (parseInt($('#shotfour').css('width')) / 2 ) + "px");

  };
};
function Collision(bullet){
  if(bullet = shot1){

    for (var i = 31; i >= 0; i--) {
            if(parseInt($('#shotone').css('top')) < parseInt($('#'+(i)).css('top')) +parseInt($('#'+(i)).css('height')) +parseInt($("#enemywrapper").css('top'))) {

        if((parseInt($('#shotone').css('left'))) + (parseInt($('#shotone').css('width'))) > parseInt($('#' + i).css('left')) + parseInt($("#enemywrapper").css('left'))){

          if((parseInt($('#shotone').css('left')))< parseInt($('#' + i).css('left'))+ parseInt($('#'+(i)).css('width')) + parseInt($("#enemywrapper").css('left'))) {
            $('#'+(i)).remove();
            score += 100;
            updateScore();
            enemiesLeft -= 1;
            CheckWin();
            shot1pos =150;
            enemy[i].alive=false;
            $('#shotone').css('top', shot1pos +'vh');
            shot1=false;
          }
        }
      }
    }
  }
  if(bullet = shot2){

    for (var i = 31; i >= 0; i--) {
      if(parseInt($('#shottwo').css('top')) < parseInt($('#'+(i)).css('top')) +parseInt($('#'+(i)).css('height')) +parseInt($("#enemywrapper").css('top'))) {

  if((parseInt($('#shottwo').css('left'))) + (parseInt($('#shottwo').css('width'))) > parseInt($('#' + i).css('left')) + parseInt($("#enemywrapper").css('left'))){

    if((parseInt($('#shottwo').css('left')))< parseInt($('#' + i).css('left'))+ parseInt($('#'+(i)).css('width')) + parseInt($("#enemywrapper").css('left'))) {
      $('#'+(i)).remove();
      score += 100;
      enemiesLeft -=1;
      updateScore();
      CheckWin();
      enemy[i].alive=false;
      shot2pos =150;
      $('#shottwo').css('top', shot2pos +'vh');
      shot2=false;
    }
  }
}
    }
  }
  if(bullet = shot3){

    for (var i = 31; i >= 0; i--) {
      if(parseInt($('#shotthree').css('top')) < parseInt($('#'+(i)).css('top')) +parseInt($('#'+(i)).css('height'))) {

  if((parseInt($('#shotthree').css('left'))) + (parseInt($('#shotthree').css('width'))) > parseInt($('#' + i).css('left')) + parseInt($("#enemywrapper").css('left'))){

    if((parseInt($('#shotthree').css('left')))< parseInt($('#' + i).css('left'))+ parseInt($('#'+(i)).css('width')) + parseInt($("#enemywrapper").css('left'))) {
      $('#'+(i)).remove();
      score += 100;
      updateScore();
      enemiesLeft -=1;
      CheckWin();
      enemy[i].alive=false;
      shot3pos =150;
      $('#shotthree').css('top', shot3pos +'vh');
      shot3=false;
    }
  }
}
    }
  }
  if(bullet = shot4){

    for (var i = 31; i >= 0; i--) {
      if(parseInt($('#shotfour').css('top')) < parseInt($('#'+(i)).css('top')) +parseInt($('#'+(i)).css('height')) + parseInt($("#enemywrapper").css('top'))) {

  if((parseInt($('#shotfour').css('left'))) + (parseInt($('#shotfour').css('width'))) > parseInt($('#' + i).css('left')) + parseInt($("#enemywrapper").css('left'))){

    if((parseInt($('#shotfour').css('left')))< parseInt($('#' + i).css('left'))+ parseInt($('#'+(i)).css('width')) + parseInt($("#enemywrapper").css('left'))) {
      $('#'+(i)).remove();
      score += 100;
      updateScore();
      enemiesLeft -=1;
      CheckWin();
      enemy[i].alive=false;
      shot4pos =150;
      $('#shotfour').css('top', shot4pos +'vh');
      shot4=false;
    }
  }
}
    }
  }
}
function updateScore(){
  $("#score").html("SCORE:" + score);
}
function leaderboard() {
  setTimeout(function(){
    $("#enemywrapper").empty();
    $("#banner").html("ENTER NAME");
    $("#name").css('display','block').css('height','7.5vh').focus();
    $("#button").css('display','block');
    $("#leaderboard").css('display','block');
  }, 3000);
}
function timer() {
  if(gameState != 'paused'){
    time -= 1;
    score-= 10;
    updateScore();
    $("#time").html("TIME:" + time);
    if(time <= 0){
      gameState = 'paused';
      $("#banner").html("GAME OVER");
      $("#player").css('display','none');
      leaderboard();
    }
  }
}
function CheckWin(){
  if(enemiesLeft == 0){
    gameState = 'paused';
    $("#banner").html("YOU WIN");
    setTimeout(function(){$("#banner").html("NEXT LEVEL")
    for (var i = 0; i < 32; i++) {
      enemy[i].alive = true;  };
    setTimeout(function(){
      $("#banner").html("");
      gameState= 'running';
      time = defaultTime;
      DrawEnemies();
    }, 3000);

    },3000);
}};
function enemyFire(){
  for (var i = 0; i < 32; i++) {
    if(enemy[i].alive){
      if((-1) / ((0.00000000001 * (score * score)) + 1) + 1.01 > Math.random()) {
        bulletFire(i);
      }
    };
}};
function bulletFire(enemynum) {
  for (var i = 1001; i < 1006; i++) {
    if(ebullets[i].active == false){
        console.log('test');
        ebullets[i].active = true;
        $('#' + i).css('left',getPosition(enemynum) + ((parseInt($('#' + enemynum).css('width')) - parseInt($('#' + i).css('width')))/2) + 'px')
        $('#' + i).css('top',parseInt($('#' + enemynum).css('top')) + parseInt($('#' + enemynum).css('height')) + parseInt($('#enemywrapper').css('top')) + 'px');
        break;
    }
  }
}
$(document ).ready(function(){
  drawstars();
  DrawEnemies();
  DrawBullets();
  timer();
  updateScore();
  $(document).mousemove(function(){
      $("#player").css("left", (clamp((window.event.clientX - (parseInt($("#player").css('width')) / 2)),10,(window.innerWidth-(parseInt($("#player").css('width'))) + 10))).toString() + "px");
  });
  $(document).click(function(){if(gameState != 'paused'){Shoot()}});
  setInterval(function(){Collision(shot1);advanceShots();},5);
  setInterval(function(){timer();},1000);
  setInterval(function(){enemyFire()}, 1000)

  $("#button").click(function() {
    $("#button").css('display','none');
    $("#name").attr('contenteditable','false');
    var submittedName = ($("#name").html()).substring(0,11);
    var submittedScore = score;
    try {
    $.ajax({
      url: 'leaderboard.php',
      type: 'get',
      data: {
        submittedName: submittedName,
        submittedScore: submittedScore
      },
      dataType: 'json',
      success: function(data) {
        $("#leaderboard").empty();
        $("#leaderboard").html(data['newleaderboard']);
      },
      error: function(errorThrown) {

      }
      })
}
      catch(err) {
         alert(err.message);
      }
    }
    )

});
