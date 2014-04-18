(function(){
  'use strict';

  $(document).ready(initialize);

  var flipped = 0;
  var counter;
  var started = 0;
  var timer;

  function initialize(){
    $('td > .card').append('<img src="./media/backCard.png" class="front">');
    $('#start').click(start);
  }

  function flip(){
    $(this).addClass('rotate');
    if ($('.rotate > img.back').length < 2){
      flipped++;
    } else {
      flipped++;
      checkMatch();
    }

  }

  function checkMatch(){
    var $imgs = $('.rotate > img.back');
    var img1 = $imgs.eq(0).attr('src');
    var img2 = $imgs.eq(1).attr('src');
    if (flipped > 1){
      if (img1 === img2){
        $('.rotate').addClass('match');
        $('.rotate').removeClass('rotate');
      } else {
        setTimeout(function(){
          $('.card').removeClass('rotate');
        }, 400);
      }
      flipped = 0;
    }
    winner();
  }

  function winner(){
    if($('.match > img.back').length === 20){
      clearInterval(timer);
      alert('You won!');
    }
  }

  function start(){
    started++;
    if (started < 2){
      addImages();
      startTimer();
      $('.card').click(flip);
    }
  }

  function startTimer(){
    counter = 60;
    timer = setInterval(function(){
      counter--;
      if (counter > 0){
       $('.timer').text(counter);
     } else if(counter === 0) {
       alert('GAME OVER!');
       $('.rotate').removeClass('rotate');
       $('.match').removeClass('match');
     }

     }, 1000);
  }

  function addImages(){
    var $tds = $('td > .card');
    var array1 = [];
    var array2 = [];
    for (var i = 1; i <= 10; i++){
      array1.push(i);
      array2.push(i);
    }

    var numbers = array1.concat(array2);

    numbers.sort(function(){
      return 0.5 - Math.random();
    });

    for(var j = 0; j < $tds.length; j++){
      $($tds[j]).append('<img src="./media/' + numbers[j] + '.png" class="back">');
    }
  }


})();
