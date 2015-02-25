var socket = io.connect();

function update() {
  $.getJSON( "/api/games/current")
  .done(function (data) {
    $('.left').html(data.score_left);
    $('.right').html(data.score_right);
  })
  .fail(function (data) {
    $('.left, .right').html('?');
  });
}

socket.on('point', function (data) {
  update();
});

update();
