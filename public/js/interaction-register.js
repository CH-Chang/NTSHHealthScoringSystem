$("#register-page-registerBox-form-img").click(function () {
  alert("目前尚未提供照片更改的服務");
});

$("#register-page-registerBox-submit").click(function () {
  username = $("#register-page-registerBox-form-username").val();
  password = $("#register-page-registerBox-form-password").val();
  name = $("#register-page-registerBox-form-name").val();
  sex = null;
  $('#register-page-registerBox-form p input[type="radio"]:checked').each(
    function () {
      sex = $(this).val();
    }
  );
  address = $("#register-page-registerBox-form-address").val();
  permission = $("#register-page-registerBox-form-permission").val();
  idnum = $("#register-page-registerBox-form-idnum").val();

  publicKey =
    "MIIBITANBgkqhkiG9w0BAQEFAAOCAQ4AMIIBCQKCAQBXhtCa687RtGdXujOE1+3UmZ27uCgu0Zz+BcU3kASIC4flcFkIDCOGdYwZESTfAhQ7bHCNdJPSm7TcqzrzYrzVVTD0BfL4VOqjeMFienV0ZuM/HkV1inB/XAEqJx687649X+4ZegSxI9QQYKkdz35YlQ6WP0g7D/bWZr3IF0pA0hk4m40YIQtic+XINgx5meWIUxL4i7Su9yqLhf9jlF/SvApw1/OvZeScB+mOnApjZq8l0hi5gEd5aVjOyyGdpa1H/STiF5vh1t4ru9KmXJVxm07Muie2WKOfafSsUd4pjrzP/2X8Cx/fPANlpLwv8cYYfGmG7zApa+Yyqpi1ZmrBAgMBAAE=";

  encryptedUsername = RSAEncrypt(publicKey, username);
  encryptedPassword = RSAEncrypt(publicKey, password);
  encryptedName = RSAEncrypt(publicKey, name);
  encryptedSex = RSAEncrypt(publicKey, sex);
  encryptedAddress = RSAEncrypt(publicKey, address);
  encryptedPermission = RSAEncrypt(publicKey, permission);
  encryptedIdNum = RSAEncrypt(publicKey, idnum);

  $.ajax({
    type: "POST",
    url: "/dashboard/register/query",
    data: {
      username: encryptedUsername,
      password: encryptedPassword,
      name: encryptedName,
      sex: encryptedSex,
      address: encryptedAddress,
      roleName: encryptedPermission,
      idnum: encryptedIdNum,
    },
    success: function (data) {
      location.href = data["url"];
    },
    error: function (data) {
      $("register-page-registerBox-status").val("發生網路錯誤，請重試");
    },
  });
  return false;
});

function RSAEncrypt(key, text) {
  RSAHelper = new JSEncrypt();
  RSAHelper.setPublicKey(key);
  return RSAHelper.encrypt(text);
}
