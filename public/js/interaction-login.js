$("#login-page-loginBox-form").submit(function () {
  publicKey =
    "MIIBITANBgkqhkiG9w0BAQEFAAOCAQ4AMIIBCQKCAQBXhtCa687RtGdXujOE1+3UmZ27uCgu0Zz+BcU3kASIC4flcFkIDCOGdYwZESTfAhQ7bHCNdJPSm7TcqzrzYrzVVTD0BfL4VOqjeMFienV0ZuM/HkV1inB/XAEqJx687649X+4ZegSxI9QQYKkdz35YlQ6WP0g7D/bWZr3IF0pA0hk4m40YIQtic+XINgx5meWIUxL4i7Su9yqLhf9jlF/SvApw1/OvZeScB+mOnApjZq8l0hi5gEd5aVjOyyGdpa1H/STiF5vh1t4ru9KmXJVxm07Muie2WKOfafSsUd4pjrzP/2X8Cx/fPANlpLwv8cYYfGmG7zApa+Yyqpi1ZmrBAgMBAAE=";

  password = $("#login-page-loginBox-password").val();
  username = $("#login-page-loginBox-username").val();
  encryptedUsername = RSAEncrypt(publicKey, username);
  encryptedPassword = RSAEncrypt(publicKey, password);

  $.ajax({
    type: "POST",
    url: "/login/query",
    data: {
      username: encryptedUsername,
      password: encryptedPassword,
    },
    success: function (data) {
      if (data["res"] == 0) {
        location.href = data["url"];
      } else {
        $("#login-page-loginBox-status").html("帳號或密碼錯誤，請重試");
      }
    },
    error: function (data) {
      $("#login-page-loginBox-status").html("網路連接錯誤，請重試");
    },
  });

  return false;
});

function RSAEncrypt(key, text) {
  RSAHelper = new JSEncrypt();
  RSAHelper.setPublicKey(key);
  return RSAHelper.encrypt(text);
}
