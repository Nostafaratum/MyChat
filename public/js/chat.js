let socket = io('/chat');

socket.on("chat message", msg => {
  $("#message").append($("<li>").text(msg));
});

socket.on("connected new user", username => {  
  $("#message").append(
    $('<li class="systemMessage">').text("system: Conected new user to chat " + username)
  );
});

$("form").submit(() => {
  socket.emit("chat message", $(".form-control").val());
  $(".form-control").val("");
  return false;
});