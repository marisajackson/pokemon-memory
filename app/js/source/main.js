/* global _ */

(function(){
  'use strict';

  $(document).ready(initialize);

  var flipped = 0;
  var counter;
  var started = false;
  var timer;
  var score = 0;

  function initialize(){
    $('td > .card').append('<img src="./media/backCard.png" class="front">');
    addImages();
    $('#start').click(start);
    setHeight();
    $(window).on('resize', setHeight);
    preload();
    $('#container').on('click', '.retry', refresh);
  }

  function refresh(){
    window.location = '/';
  }

  function preload(){
    var images = [];
    var assets = ['./media/1.png', './media/2.png', './media/3.png', './media/4.png', './media/5.png', './media/6.png', './media/7.png', './media/8.png', './media/9.png', './media/loser.png', './media/win.png'];
    for (var i = 0; i < assets.length; i++) {
					images[i] = new Image();
					images[i].src = assets[i];
				}
  }

  function setHeight(){
    var windowHeight = $(window).outerHeight();
    $('#container').css('height', windowHeight);
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
        addMatchPoints();
      } else {
        setTimeout(function(){
          $('.card').removeClass('rotate');
        }, 400);
      }
      flipped = 0;
    }
    winner();
  }

  function addMatchPoints(){
    score += 10;
    $('.score').text(score);
  }

  function winner(){
    if($('.match > img.back').length === 20){
      score += counter;
      var win = '<div class=winner style="width: 100%"><h3>Nice Score!\n'+score+' points!</h3><img style="width:100%" src="media/win.png"></div>';
      clearInterval(timer);
      $('#game').empty().append(win);
      $('#start').addClass('retry');
      $('#start').text('Retry?');
    }
  }

  function start(){
    if (!started){
      started = true;
      // addImages();
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
       $('#start').text(counter);
     } else if(counter === 0) {
       $('.rotate').removeClass('rotate');
       $('.match').removeClass('match');
       loser();
     }

     }, 1000);
  }

  function loser(){
    var lose = '<div class=loser style="width: 100%"><h3>Try Again!\n'+score+' points!</h3><img style="width:90%" src="media/loser.png"></div>';
    clearInterval(timer);
    $('#game').empty().append(lose);
    $('#start').addClass('retry');
    $('#start').text('Retry?');
  }

  function addImages(){
    var $tds = $('td > .card');


    var array = _.range(1, 11);
    var newArray = array.concat(array);
    // console.log(newArray);
    //
    // var array1 = [];
    // var array2 = [];
    // for (var i = 1; i <= 10; i++){
    //   array1.push(i);
    //   array2.push(i);
    // }
    //
    // var numbers = array1.concat(array2);
    //
    // console.log(numbers);

    newArray.sort(function(){
      return 0.5 - Math.random();
    });

    for(var j = 0; j < $tds.length; j++){
      $($tds[j]).append('<img src="./media/' + newArray[j] + '.png" class="back">');
    }
  }


})();
