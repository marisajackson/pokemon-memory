(function(){
  'use strict';

  $(document).ready(initialize);

  var flipped = 0;

  function initialize(){
    $('#start').click(start);
    $('.card').click(flip);
  }

  function flip(){
    flipped++;
    $(this).addClass('rotate');
    var $imgs = $('.rotate > img.back');
    var img1 = $imgs.eq(0).attr('src');
    var img2 = $imgs.eq(1).attr('src');

    if (flipped === 2){
      if (img1 === img2){
        $('.rotate').addClass('match');
        setTimeout(function(){
          $('.rotate').removeClass('rotate');
        }, 1000);
      } else {
        setTimeout(function(){
          $('.card').removeClass('rotate');
        }, 700);
      }
      flipped = 0;
    }
  }

  function start(){
    addImages();
    startTimer();
  }

  function startTimer(){
    var counter = 60;
    setInterval(function(){
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
