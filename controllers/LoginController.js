const NodeRSA = require("node-rsa");
const jwt = require("jsonwebtoken");

const Account = require("../models/accountModel");

exports.queryAccount = async (req, res, next) => {
  var nodeRSA = new NodeRSA(
    "MIIEogIBAAKCAQBXhtCa687RtGdXujOE1+3UmZ27uCgu0Zz+BcU3kASIC4flcFkIDCOGdYwZESTfAhQ7bHCNdJPSm7TcqzrzYrzVVTD0BfL4VOqjeMFienV0ZuM/HkV1inB/XAEqJx687649X+4ZegSxI9QQYKkdz35YlQ6WP0g7D/bWZr3IF0pA0hk4m40YIQtic+XINgx5meWIUxL4i7Su9yqLhf9jlF/SvApw1/OvZeScB+mOnApjZq8l0hi5gEd5aVjOyyGdpa1H/STiF5vh1t4ru9KmXJVxm07Muie2WKOfafSsUd4pjrzP/2X8Cx/fPANlpLwv8cYYfGmG7zApa+Yyqpi1ZmrBAgMBAAECggEAO1//HzkcIfIJsN9ll5aLhg93iyKQT8Juh3wOn3SZPljkJWcjXmwtpUcUdOTGaGoWo4EakTsmFFcASDn4UacHhoi2HrPycTfZvG9scIu2JfKt8eFtKSFy01Lsj1XeajkFsCjlcm7tw+UUNM/9qXVatmjXbmEbdMWNo0ArOhNikbmpkrS7YKQZ/Kb8J4B0JmxxqzmOVNa30WDD2p5UPmMkpaBVuNO8wW+AF9I/QY8KSuXWJYCbcaj6sFD0OK3eyXuix/jQatlIcLsNZx9vjk0VPejr/vjLXFD0umurUyFJPzeOde2RAtHGRkVUTdRKRunve5oiCxjA+MTdCLxw7rOtyQKBgQCcAWlBqEQDyQVPApiiOgT88noq3iyO/eRJu/lLDUlTqvjcbt+YzXeA9fxmIT+uBZk7M/mz7S20oN627v+5yCHCHZMSvl3SbLLp38uBHKjPJX9h2zyCxIYXJzBdJBhm+sOABTS50r3D13o+iCmQwEqKV7xnlV9R0vmlt2l6+uhCMwKBgQCPoNvFVMGvmPc6OP6+LOvqQdPUl4D3pfIJngEwUcg/r+qL/K/rMFtlQNj+8VCjS/xddPHUBdhQBQ4IR+oieVW8aTdQwbL5KKaenOr4kCLjZ79qBkYEjFB2xrIuujywIQEIaBhhXvzOj77xtCUhHziL0XZxO1rka89xxjrOl5UzOwKBgBPZrh33nifpJS7HgsppnYbeB6N6v6q2LZ0gOPlOyHzH7YCG7xaPVlxncGVCZ8rp1XSOCYDWdhFcwtn+ETX/fCQqBTPGW0PSJvXRTyCvl987wzidX9a30OQTTXkchapc0BFzGCFo6lKIEXrxcnCDtzhhL4zymb1cnf1zGA3Y7UK3AoGADj/hTfSYurksXgRlkayXQ0iAoajeTLOUDcw1Rfv3KApl9Ll/IpBLoQIMBU8ftvPE9+iwTV6/FUFLIRsxaXYsQWMW79Yn0Xxs+3OKBFsYewNCBFzW+YCKQx53cxdbCgZcOd9J++8Wmc+9G/HJdT3JuGVxoM5IuDzR+fG2x+RWEx0CgYEAgOyKckb3aus4Y8heDT+JtLSYtMweqDkU8isFdrevNLV5zq9psQvLtts/9oZG20a37HdbMm1VuTnydlsmPk3bV4leU7wIDSCNR1ogP48WHbqfDOaguyhgH/RbZU3PXTF+sNwaspTUsa1ahfJAfq4l+QaB8riDwvfSM4mXXyCK+mk",
    "private"
  );
  nodeRSA.setOptions({ encryptionScheme: "pkcs1" });

  req.body.username = nodeRSA.decrypt(req.body.username, "utf-8");
  req.body.password = nodeRSA.decrypt(req.body.password, "utf-8");

  try {
    await Account.queryAccount(req).then(([rows]) => {
      if (rows.length == 1) {
        var token = jwt.sign(
          { username: rows[0].username },
          "nwQXdZRMCt3MWrTDz77vpfGVDIzZR2L9",
          { expiresIn: "1 day" }
        );
        res.cookie("token", token, {
          maxAge: 86400000,
          httpOnly: true,
          signed: true,
        });
        res.json({ res: 0, url: "/dashboard/my" });
      } else {
        res.json({ res: -1 });
      }
    });
  } catch (err) {
    console.log(err);
  }
};

exports.login = function (req, res, next) {
  if (req.signedCookies.token) return res.redirect("/dashboard/my");
  res.render("login");
};
