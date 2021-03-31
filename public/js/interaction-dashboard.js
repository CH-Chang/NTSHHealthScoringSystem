$('#myeditInformation-form').submit(function() {
  username = $('#myeditInformation-form-text-username').val();
  idnum = $('#myeditInformation-form-text-idnum').val();
  role = $('#myeditInformation-form-text-role').val();
  name = $('#myeditInformation-form-text-name').val();
  sex = null;
  $('#myeditInformation-form-text-sex input[type=radio]:checked').each(
    function() {
      sex = $(this).val();
    }
  );
  address = $('#myeditInformation-form-text-address').val();
  newpassword = $('#myeditInformation-form-text-newpassword').val();

  publicKey =
    'MIIBITANBgkqhkiG9w0BAQEFAAOCAQ4AMIIBCQKCAQBXhtCa687RtGdXujOE1+3UmZ27uCgu0Zz+BcU3kASIC4flcFkIDCOGdYwZESTfAhQ7bHCNdJPSm7TcqzrzYrzVVTD0BfL4VOqjeMFienV0ZuM/HkV1inB/XAEqJx687649X+4ZegSxI9QQYKkdz35YlQ6WP0g7D/bWZr3IF0pA0hk4m40YIQtic+XINgx5meWIUxL4i7Su9yqLhf9jlF/SvApw1/OvZeScB+mOnApjZq8l0hi5gEd5aVjOyyGdpa1H/STiF5vh1t4ru9KmXJVxm07Muie2WKOfafSsUd4pjrzP/2X8Cx/fPANlpLwv8cYYfGmG7zApa+Yyqpi1ZmrBAgMBAAE=';

  encryptedUsername = RSAEncrypt(publicKey, username);
  encryptedIdNum = RSAEncrypt(publicKey, idnum);
  encryptedRole = RSAEncrypt(publicKey, role);
  encryptedName = RSAEncrypt(publicKey, name);
  encryptedSex = RSAEncrypt(publicKey, sex);
  encryptedAddress = RSAEncrypt(publicKey, address);
  encryptedNewPassWord = RSAEncrypt(publicKey, newpassword);

  if (newpassword != '') {
    $.ajax({
      type: 'POST',
      url: '/dashboard/passwordUpdate',
      data: {
        username: encryptedUsername,
        newPassword: encryptedNewPassWord
      }
    });
  }

  $.ajax({
    type: 'POST',
    url: '/dashboard/accountUpdate',
    data: {
      username: encryptedUsername,
      idnum: encryptedIdNum,
      role: encryptedRole,
      name: encryptedName,
      sex: encryptedSex,
      address: encryptedAddress
    },
    success: function(data) {
      location.href = data['url'];
    },
    error: function(data) {
      $('#myeditInformation-form-status').html('發生未知錯誤，請重試');
    }
  });

  return false;
});

$('#myeditInformation-form-img-control-pick').click(function() {
  alert('目前尚未提供照片更改之服務');
  return false;
});

$('#myeditInformation-form-img-control-del').click(function() {
  alert('目前尚未提供照片更改之服務');
  return false;
});

function RSAEncrypt(key, text) {
  RSAHelper = new JSEncrypt();
  RSAHelper.setPublicKey(key);
  return RSAHelper.encrypt(text);
}

$('.editScore-infor-table-year-select').on('change', function(e) {
  selectedValue = this.value.split(' ')[0];
  $.ajax({
    type: 'POST',
    url: '/dashboard/scoreEdit/getClasses',
    data: {
      year: Number(selectedValue)
    },
    success: function(data) {
      $('.editScore-infor-table-classes-select').empty();
      data['classes'].forEach(elem => {
        $('.editScore-infor-table-classes-select').append(
          '<option value="' +
            elem.classes +
            '">' +
            elem.classes +
            ' 班</option>'
        );
      });
    }
  });
});

$('#editScore-submit').click(function() {
  year = $('.editScore-infor-table-year-select').val();
  classes = $('.editScore-infor-table-classes-select').val();
  date = $('.editScore-infor-table-date-input').val();

  itemName = $('.editScore-score-table-item-input');
  itemGrade = $('.editScore-score-table-score-input');
  itemDetail = $('.editScore-score-table-detail-input');

  res = [];
  for (let i = 0; i < itemName.length; i++) {
    res[i] = {
      itemname: $(itemName[i]).html(),
      itemGrade: $(itemGrade[i]).val(),
      itemDetail: $(itemDetail[i]).val()
    };
  }

  res = JSON.stringify(res);

  $.ajax({
    type: 'POST',
    url: '/dashboard/scoreEdit/query',
    data: {
      year: year,
      classes: classes,
      date: date,
      data: res
    },
    success: function(data) {
      location.href = data['url'];
    },
    error: function() {}
  });
});

$('#addScore-submit').click(function(e) {
  $('#addScore-status').html('');

  year = $('.editScore-infor-table-year-select').val();
  classes = $('.editScore-infor-table-classes-select').val();
  date = $('.editScore-infor-table-date-input').val();

  itemName = $('.editScore-score-table-item-input');
  itemGrade = $('.editScore-score-table-score-input');
  itemDetail = $('.editScore-score-table-detail-input');

  res = [];
  for (let i = 0; i < itemName.length; i++) {
    res[i] = {
      itemname: $(itemName[i])
        .html()
        .trim(),
      itemGrade: $(itemGrade[i]).val(),
      itemDetail: $(itemDetail[i]).val()
    };
  }

  res = JSON.stringify(res);

  if (date == '' || classes == '' || year == '') {
    $('#addScore-status').html('請確認表單填寫完整');
  } else {
    $.ajax({
      type: 'POST',
      url: '/dashboard/newScore/query',
      data: {
        year: year,
        classes: classes,
        date: date,
        data: res
      },
      success: function(data) {
        if (data['res'] == -1) {
          $('#addScore-status').html(data['msg']);
        } else {
          location.href = data['url'];
        }
      },
      error: function() {
        $('#addScore-status').html('發生網路錯誤，請重試');
      }
    });
  }
});
