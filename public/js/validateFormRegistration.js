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

$(document.forms["registration"]).on("submit", function() {
  let countError = 0;
  let form = $(this);
  let username = document.getElementsByName('username')[0];
  let password = document.getElementsByName('password')[0];
  let password_confirm = document.getElementsByName('password_confirm')[0];

  resetError(username.nextElementSibling, "Username can contain any letters or numbers, without spaces");
  if (!username.value) {
    countError++;
    showError(username.nextElementSibling, " Specify a user name.");
  }

  resetError(password.nextElementSibling, "Password should be at least 4 characters");
  resetError(password_confirm.nextElementSibling, "Please confirm password");

  if (!password.value) {
    countError++;
    showError(password.nextElementSibling, " Specify a password.");
  } else if (password.value.length < 4) {
    countError++;
    showError(password.nextElementSibling, " Length password < 4.");
  } else if (password.value != password_confirm.value) {
    countError++;
    showError(password_confirm.nextElementSibling, " Passwords do not match.");
  }

  if(countError > 0)
    return false;

  $(".error", form).html("");
  $.ajax({
    url: "/registration",
    method: "POST",
    data: form.serialize(),
    statusCode: {
      200: () => {
        window.location.href = "/chat";
      },
      403: () => {
        showError(document.getElementById("usernameHelp"), "User already exists");
      }
    }
  });
  return false;
});