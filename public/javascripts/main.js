define(['jquery'],
  function($){
    var upvote = $('.upvote');

    upvote.click(function(){
      console.log('clickity click');
      $.get('/upvote/1', function (data){
        console.log('data ', data)
      })

      return false;
    });
  });