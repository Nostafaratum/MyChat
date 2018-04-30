function showError(container, errorMessage) {
    container.style.color = "red";
    container.previousElementSibling.style.border = "2px solid red";
    container.innerHTML = errorMessage;
  }
  
  function resetError(container, helpMessage) {
    container.style.color = "";
    container.previousElementSibling.style.border = "";
    container.innerHTML = helpMessage;
  }
  
  $(document.forms["login"]).on("submit", function() {
    let countError = 0;
    let form = $(this);
    let username = document.getElementsByName('username')[0];
    let password = document.getElementsByName('password')[0];
  
    resetError(username.nextElementSibling, "Input youre username in chat");
    if (!username.value) {
      countError++;
      showError(username.nextElementSibling, " Specify a user name.");
    }
  
    resetError(password.nextElementSibling, "Input youre password");
  
    if (!password.value) {
      countError++;
      showError(password.nextElementSibling, " Specify a password.");
    }
  
    if(countError > 0)
      return false;
  
    $(".error", form).html("");
    $.ajax({
      url: "/login",
      method: "POST",
      data: form.serialize(),
      statusCode: {
        200: () => {
          window.location.href = "/";
        },
        404: () => {
          showError(document.getElementById("usernameHelp"), "User not found");
        }
      }
    });
    return false;
  });