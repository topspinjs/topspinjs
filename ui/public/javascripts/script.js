var socket = io.connect('http://localhost:3000');

function update() {
  $.getJSON( "/api/games/current", function (data) {
    $('.left').html(data.score_left);
    $('.right').html(data.score_right);
  });
}

socket.on('point', function (data) {
  update();
});

update();
