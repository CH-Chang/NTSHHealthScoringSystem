const PersonnelModel = require('../models/personnelModel');
const RoleModel = require('../models/roleModel');
const AccountModel = require('../models/accountModel');
const RecordTotalModel = require('../models/recordTotalModel');
const RecordModel = require('../models/recordModel');
const RaterModel = require('../models/raterModel');
const ClassModel = require('../models/classModel');
const RatingItemsModel = require('../models/ratingItemModel');
const NodeRSA = require('node-rsa');
const moment = require('moment');

exports.my = async (req, res, next) => {
  let data;
  let username = req.user.username;
  try {
    await PersonnelModel.getPersonnelByUsername(username).then(([row]) => {
      data = row;
    });
  } catch (err) {}
  res.render('accountEdit', {
    title_zhtw: '個人資料維護與管理',
    title_en: 'Personal Data MainTenance',
    username: username,
    data: data,
    type: 0
  });
};

exports.logout = function(req, res, next) {
  res.clearCookie('token');
  res.redirect('/');
};

exports.accountUpdate = async (req, res, next) => {
  var nodeRSA = new NodeRSA(
    'MIIEogIBAAKCAQBXhtCa687RtGdXujOE1+3UmZ27uCgu0Zz+BcU3kASIC4flcFkIDCOGdYwZESTfAhQ7bHCNdJPSm7TcqzrzYrzVVTD0BfL4VOqjeMFienV0ZuM/HkV1inB/XAEqJx687649X+4ZegSxI9QQYKkdz35YlQ6WP0g7D/bWZr3IF0pA0hk4m40YIQtic+XINgx5meWIUxL4i7Su9yqLhf9jlF/SvApw1/OvZeScB+mOnApjZq8l0hi5gEd5aVjOyyGdpa1H/STiF5vh1t4ru9KmXJVxm07Muie2WKOfafSsUd4pjrzP/2X8Cx/fPANlpLwv8cYYfGmG7zApa+Yyqpi1ZmrBAgMBAAECggEAO1//HzkcIfIJsN9ll5aLhg93iyKQT8Juh3wOn3SZPljkJWcjXmwtpUcUdOTGaGoWo4EakTsmFFcASDn4UacHhoi2HrPycTfZvG9scIu2JfKt8eFtKSFy01Lsj1XeajkFsCjlcm7tw+UUNM/9qXVatmjXbmEbdMWNo0ArOhNikbmpkrS7YKQZ/Kb8J4B0JmxxqzmOVNa30WDD2p5UPmMkpaBVuNO8wW+AF9I/QY8KSuXWJYCbcaj6sFD0OK3eyXuix/jQatlIcLsNZx9vjk0VPejr/vjLXFD0umurUyFJPzeOde2RAtHGRkVUTdRKRunve5oiCxjA+MTdCLxw7rOtyQKBgQCcAWlBqEQDyQVPApiiOgT88noq3iyO/eRJu/lLDUlTqvjcbt+YzXeA9fxmIT+uBZk7M/mz7S20oN627v+5yCHCHZMSvl3SbLLp38uBHKjPJX9h2zyCxIYXJzBdJBhm+sOABTS50r3D13o+iCmQwEqKV7xnlV9R0vmlt2l6+uhCMwKBgQCPoNvFVMGvmPc6OP6+LOvqQdPUl4D3pfIJngEwUcg/r+qL/K/rMFtlQNj+8VCjS/xddPHUBdhQBQ4IR+oieVW8aTdQwbL5KKaenOr4kCLjZ79qBkYEjFB2xrIuujywIQEIaBhhXvzOj77xtCUhHziL0XZxO1rka89xxjrOl5UzOwKBgBPZrh33nifpJS7HgsppnYbeB6N6v6q2LZ0gOPlOyHzH7YCG7xaPVlxncGVCZ8rp1XSOCYDWdhFcwtn+ETX/fCQqBTPGW0PSJvXRTyCvl987wzidX9a30OQTTXkchapc0BFzGCFo6lKIEXrxcnCDtzhhL4zymb1cnf1zGA3Y7UK3AoGADj/hTfSYurksXgRlkayXQ0iAoajeTLOUDcw1Rfv3KApl9Ll/IpBLoQIMBU8ftvPE9+iwTV6/FUFLIRsxaXYsQWMW79Yn0Xxs+3OKBFsYewNCBFzW+YCKQx53cxdbCgZcOd9J++8Wmc+9G/HJdT3JuGVxoM5IuDzR+fG2x+RWEx0CgYEAgOyKckb3aus4Y8heDT+JtLSYtMweqDkU8isFdrevNLV5zq9psQvLtts/9oZG20a37HdbMm1VuTnydlsmPk3bV4leU7wIDSCNR1ogP48WHbqfDOaguyhgH/RbZU3PXTF+sNwaspTUsa1ahfJAfq4l+QaB8riDwvfSM4mXXyCK+mk',
    'private'
  );
  nodeRSA.setOptions({ encryptionScheme: 'pkcs1' });
  req.body.username = nodeRSA.decrypt(req.body.username, 'utf-8');
  req.body.idnum = nodeRSA.decrypt(req.body.idnum, 'utf-8');
  req.body.role = nodeRSA.decrypt(req.body.role, 'utf-8');
  req.body.name = nodeRSA.decrypt(req.body.name, 'utf-8');
  req.body.sex = Number(nodeRSA.decrypt(req.body.sex, 'utf-8'));
  req.body.address = nodeRSA.decrypt(req.body.address, 'utf-8');

  try {
    //先做權限檢查

    await PersonnelModel.getPersonnelByUsername(req.body.username).then(
      ([row]) => {
        if (row[0].role == '評分人員' && req.body.role != '評分人員') {
        }
        if (row[0].role != '評分人員' && req.body.role == '評分人員') {
          //特別做rater表的更新
        }
      }
    );

    await RoleModel.getRoleIdByRoleName(req.body.role).then(([row]) => {
      req.body.role = Number(row[0].id);
    });

    await PersonnelModel.updatePersonnelByIdNum(req).then(([row]) => {});

    if (req.body.username == req.user.username) {
      res.json({ url: '/dashboard/my' });
    } else {
      res.json({ url: '/dashboard/accountManagement' });
    }
  } catch (err) {
    console.log(err);
  }
};

exports.passwordUpdate = async (req, res, next) => {
  var nodeRSA = new NodeRSA(
    'MIIEogIBAAKCAQBXhtCa687RtGdXujOE1+3UmZ27uCgu0Zz+BcU3kASIC4flcFkIDCOGdYwZESTfAhQ7bHCNdJPSm7TcqzrzYrzVVTD0BfL4VOqjeMFienV0ZuM/HkV1inB/XAEqJx687649X+4ZegSxI9QQYKkdz35YlQ6WP0g7D/bWZr3IF0pA0hk4m40YIQtic+XINgx5meWIUxL4i7Su9yqLhf9jlF/SvApw1/OvZeScB+mOnApjZq8l0hi5gEd5aVjOyyGdpa1H/STiF5vh1t4ru9KmXJVxm07Muie2WKOfafSsUd4pjrzP/2X8Cx/fPANlpLwv8cYYfGmG7zApa+Yyqpi1ZmrBAgMBAAECggEAO1//HzkcIfIJsN9ll5aLhg93iyKQT8Juh3wOn3SZPljkJWcjXmwtpUcUdOTGaGoWo4EakTsmFFcASDn4UacHhoi2HrPycTfZvG9scIu2JfKt8eFtKSFy01Lsj1XeajkFsCjlcm7tw+UUNM/9qXVatmjXbmEbdMWNo0ArOhNikbmpkrS7YKQZ/Kb8J4B0JmxxqzmOVNa30WDD2p5UPmMkpaBVuNO8wW+AF9I/QY8KSuXWJYCbcaj6sFD0OK3eyXuix/jQatlIcLsNZx9vjk0VPejr/vjLXFD0umurUyFJPzeOde2RAtHGRkVUTdRKRunve5oiCxjA+MTdCLxw7rOtyQKBgQCcAWlBqEQDyQVPApiiOgT88noq3iyO/eRJu/lLDUlTqvjcbt+YzXeA9fxmIT+uBZk7M/mz7S20oN627v+5yCHCHZMSvl3SbLLp38uBHKjPJX9h2zyCxIYXJzBdJBhm+sOABTS50r3D13o+iCmQwEqKV7xnlV9R0vmlt2l6+uhCMwKBgQCPoNvFVMGvmPc6OP6+LOvqQdPUl4D3pfIJngEwUcg/r+qL/K/rMFtlQNj+8VCjS/xddPHUBdhQBQ4IR+oieVW8aTdQwbL5KKaenOr4kCLjZ79qBkYEjFB2xrIuujywIQEIaBhhXvzOj77xtCUhHziL0XZxO1rka89xxjrOl5UzOwKBgBPZrh33nifpJS7HgsppnYbeB6N6v6q2LZ0gOPlOyHzH7YCG7xaPVlxncGVCZ8rp1XSOCYDWdhFcwtn+ETX/fCQqBTPGW0PSJvXRTyCvl987wzidX9a30OQTTXkchapc0BFzGCFo6lKIEXrxcnCDtzhhL4zymb1cnf1zGA3Y7UK3AoGADj/hTfSYurksXgRlkayXQ0iAoajeTLOUDcw1Rfv3KApl9Ll/IpBLoQIMBU8ftvPE9+iwTV6/FUFLIRsxaXYsQWMW79Yn0Xxs+3OKBFsYewNCBFzW+YCKQx53cxdbCgZcOd9J++8Wmc+9G/HJdT3JuGVxoM5IuDzR+fG2x+RWEx0CgYEAgOyKckb3aus4Y8heDT+JtLSYtMweqDkU8isFdrevNLV5zq9psQvLtts/9oZG20a37HdbMm1VuTnydlsmPk3bV4leU7wIDSCNR1ogP48WHbqfDOaguyhgH/RbZU3PXTF+sNwaspTUsa1ahfJAfq4l+QaB8riDwvfSM4mXXyCK+mk',
    'private'
  );
  nodeRSA.setOptions({ encryptionScheme: 'pkcs1' });
  req.body.username = nodeRSA.decrypt(req.body.username, 'utf-8');
  req.body.newPassword = nodeRSA.decrypt(req.body.newPassword, 'utf-8');

  await AccountModel.updatePasswordByUsername(req).then(([row]) => {});
};

exports.accountManagement = async (req, res, next) => {
  let data;
  try {
    await PersonnelModel.getAllPersonnel().then(([row]) => {
      data = row;
      data.forEach(elem => {
        elem.time = moment(elem.time).format('YYYY-MM-DD hh:mm:ss');
      });
    });
  } catch (err) {}
  res.render('accountManagement', { data: data });
};

exports.accountEdit = async (req, res, next) => {
  let data, username;
  let id = req.params.id;
  try {
    await PersonnelModel.getPersonnelById(id).then(([row]) => {
      data = row;
    });

    await AccountModel.getAccountByPersonnel(id).then(([row]) => {
      username = row[0].username;
    });
  } catch (err) {}

  if (username == req.user.username) {
    res.redirect('/dashboard/my');
  } else {
    res.render('accountEdit', {
      title_zhtw: '他人帳戶資料維護與管理',
      title_en: 'Others Account Management',
      username: username,
      data: data,
      type: 1
    });
  }
};

exports.accountDelete = async (req, res, next) => {
  try {
    await PersonnelModel.deletePersonnelById(req.params.id).then(([row]) => {});
    res.redirect('/dashboard/accountManagement');
  } catch (err) {
    console.log(err);
  }
};

exports.scoreManagement = async (req, res, next) => {
  let data;
  try {
    await RecordTotalModel.getAllTotalRecord().then(([row]) => {
      data = row;
      data.forEach(elem => {
        elem.time = moment(elem.date).format('YYYY-MM-DD');
      });
    });
    res.render('scoreManagement', { data: data });
  } catch (err) {
    console.log(err);
  }
};

exports.register = async (req, res, next) => {
  res.render('register');
};

exports.queryregister = async (req, res, next) => {
  try {
    var nodeRSA = new NodeRSA(
      'MIIEogIBAAKCAQBXhtCa687RtGdXujOE1+3UmZ27uCgu0Zz+BcU3kASIC4flcFkIDCOGdYwZESTfAhQ7bHCNdJPSm7TcqzrzYrzVVTD0BfL4VOqjeMFienV0ZuM/HkV1inB/XAEqJx687649X+4ZegSxI9QQYKkdz35YlQ6WP0g7D/bWZr3IF0pA0hk4m40YIQtic+XINgx5meWIUxL4i7Su9yqLhf9jlF/SvApw1/OvZeScB+mOnApjZq8l0hi5gEd5aVjOyyGdpa1H/STiF5vh1t4ru9KmXJVxm07Muie2WKOfafSsUd4pjrzP/2X8Cx/fPANlpLwv8cYYfGmG7zApa+Yyqpi1ZmrBAgMBAAECggEAO1//HzkcIfIJsN9ll5aLhg93iyKQT8Juh3wOn3SZPljkJWcjXmwtpUcUdOTGaGoWo4EakTsmFFcASDn4UacHhoi2HrPycTfZvG9scIu2JfKt8eFtKSFy01Lsj1XeajkFsCjlcm7tw+UUNM/9qXVatmjXbmEbdMWNo0ArOhNikbmpkrS7YKQZ/Kb8J4B0JmxxqzmOVNa30WDD2p5UPmMkpaBVuNO8wW+AF9I/QY8KSuXWJYCbcaj6sFD0OK3eyXuix/jQatlIcLsNZx9vjk0VPejr/vjLXFD0umurUyFJPzeOde2RAtHGRkVUTdRKRunve5oiCxjA+MTdCLxw7rOtyQKBgQCcAWlBqEQDyQVPApiiOgT88noq3iyO/eRJu/lLDUlTqvjcbt+YzXeA9fxmIT+uBZk7M/mz7S20oN627v+5yCHCHZMSvl3SbLLp38uBHKjPJX9h2zyCxIYXJzBdJBhm+sOABTS50r3D13o+iCmQwEqKV7xnlV9R0vmlt2l6+uhCMwKBgQCPoNvFVMGvmPc6OP6+LOvqQdPUl4D3pfIJngEwUcg/r+qL/K/rMFtlQNj+8VCjS/xddPHUBdhQBQ4IR+oieVW8aTdQwbL5KKaenOr4kCLjZ79qBkYEjFB2xrIuujywIQEIaBhhXvzOj77xtCUhHziL0XZxO1rka89xxjrOl5UzOwKBgBPZrh33nifpJS7HgsppnYbeB6N6v6q2LZ0gOPlOyHzH7YCG7xaPVlxncGVCZ8rp1XSOCYDWdhFcwtn+ETX/fCQqBTPGW0PSJvXRTyCvl987wzidX9a30OQTTXkchapc0BFzGCFo6lKIEXrxcnCDtzhhL4zymb1cnf1zGA3Y7UK3AoGADj/hTfSYurksXgRlkayXQ0iAoajeTLOUDcw1Rfv3KApl9Ll/IpBLoQIMBU8ftvPE9+iwTV6/FUFLIRsxaXYsQWMW79Yn0Xxs+3OKBFsYewNCBFzW+YCKQx53cxdbCgZcOd9J++8Wmc+9G/HJdT3JuGVxoM5IuDzR+fG2x+RWEx0CgYEAgOyKckb3aus4Y8heDT+JtLSYtMweqDkU8isFdrevNLV5zq9psQvLtts/9oZG20a37HdbMm1VuTnydlsmPk3bV4leU7wIDSCNR1ogP48WHbqfDOaguyhgH/RbZU3PXTF+sNwaspTUsa1ahfJAfq4l+QaB8riDwvfSM4mXXyCK+mk',
      'private'
    );
    nodeRSA.setOptions({ encryptionScheme: 'pkcs1' });

    req.body.username = nodeRSA.decrypt(req.body.username, 'utf-8');
    req.body.password = nodeRSA.decrypt(req.body.password, 'utf-8');
    req.body.name = nodeRSA.decrypt(req.body.name, 'utf-8');
    req.body.sex = Number(nodeRSA.decrypt(req.body.sex, 'utf-8'));
    req.body.address = nodeRSA.decrypt(req.body.address, 'utf-8');
    req.body.idnum = nodeRSA.decrypt(req.body.idnum, 'utf-8');
    req.body.roleName = nodeRSA.decrypt(req.body.roleName, 'utf-8');
  } catch (err) {
    console.log(err);
  }

  try {
    await RoleModel.getRoleIdByRoleName(req.body.roleName).then(([row]) => {
      req.body.role = row[0].id;
    });
    await PersonnelModel.registerPersonnel(req).then(([row]) => {});

    let personnelId;
    await PersonnelModel.getPersonnelByIdNum(req.body.idnum).then(([row]) => {
      personnelId = row[0].id;
    });

    await AccountModel.registerAccount(req, personnelId).then(([row]) => {});

    if (req.body.role == 2) {
      await RaterModel.registerRater(personnelId, '隊員').then(([row]) => {});
    }

    res.json({ url: '/dashboard/accountManagement' });
  } catch (err) {}
};

exports.scoreEdit = async (req, res, next) => {
  let ratingitems;
  await RecordModel.getRecordByDateWithClass(req).then(([row]) => {
    ratingitems = row;
    ratingitems.forEach(elem => {
      elem.date = moment(elem.date).format('YYYY-MM-DD');
    });
  });
  await res.render('scoreEdit', {
    editable: 1,
    title_en: 'Score Edit',
    title_zhtw: '成績資料更改',
    data: ratingitems
  });
};

exports.scoreDelete = async (req, res, next) => {
  try {
    await ClassModel.getClassIdByGradeWithClass(
      req.params.year,
      req.params.classes
    ).then(([row]) => {
      req.params.classId = row[0].id;
    });

    await RecordModel.deleteRecord(
      req.params.classId,
      req.params.time
    ).then(([row]) => {});

    res.redirect('/dashboard/scoreManagement');
  } catch (err) {}
};

exports.getClasses = async (req, res, next) => {
  try {
    await ClassModel.getClassesByGrade(req.body.year).then(([row]) => {
      res.json({ classes: row });
    });
  } catch (err) {
    console.log(err);
  }
};

exports.queryScoreEdit = async (req, res, next) => {
  temp = JSON.parse(req.body.data);
  req.body.data = temp;

  try {
    await ClassModel.getClassIdByGradeWithClass(
      req.body.year,
      req.body.classes
    ).then(([row]) => {
      req.body.classId = row[0].id;
    });

    for (let i = 0; i < req.body.data.length; i++) {
      let itemId;
      await RatingItemsModel.getIdbyName(req.body.data[i].itemname).then(
        ([row]) => {
          itemId = row[0].id;
        }
      );

      await RecordModel.updateRecord(
        req.body.data[i].itemGrade,
        req.body.data[i].itemDetail,
        req.body.date,
        req.body.classId,
        itemId
      ).then(([row]) => {});
    }
    res.json({ url: '../../dashboard/scoreManagement' });
  } catch (err) {}
};
exports.newScore = async (req, res, next) => {
  try {
    let ratingitems;
    await RatingItemsModel.getAllRatingItem().then(([row]) => {
      ratingitems = row;
    });
    res.render('scoreAdd', {
      ratingitems: ratingitems
    });
  } catch (err) {
    console.log(err);
  }
};

exports.queryScoreAdd = async (req, res, next) => {
  temp = JSON.parse(req.body.data);
  req.body.data = temp;

  await ClassModel.getClassIdByGradeWithClass(
    req.body.year,
    req.body.classes
  ).then(([row]) => {
    req.body.classId = row[0].id;
  });

  let exists = false;
  await RecordModel.getCountByDateWithClass(req).then(([row]) => {
    if (row[0].count != 0) exists = true;
  });

  if (!exists) {
    for (let i = 0; i < req.body.data.length; i++) {
      let itemId;
      await RatingItemsModel.getIdbyName(req.body.data[i].itemname).then(
        ([row]) => {
          itemId = row[0].id;
        }
      );

      await RecordModel.addRecord(
        req.body.data[i].itemGrade,
        req.body.data[i].itemDetail,
        req.body.date,
        req.body.classId,
        itemId,
        null //之後進行其他帳戶開發時再寫入
      ).then(([row]) => {});
    }
    res.json({ res: 0, msg: '成功', url: '../../dashboard/scoreManagement' });
  } else {
    res.json({
      res: -1,
      msg: '資料庫已存在該日評分資料，請以修改方式進入修改'
    });
  }
};
