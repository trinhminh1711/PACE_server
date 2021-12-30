var mysql = require('mysql');
var express = require('express');
var cors = require('cors');
var CryptoJS = require("crypto-js");
var app = express();
app.use(cors())
app.get("/", (req, res) => {
    res.json({ message: "API is running." });
  });
app.listen(5000,function(){
    console.log('Node server running ')
});


var con = mysql.createConnection({
    host: "localhost",
    user: "hcst_db",
    password: "Security1234!@#$",
    database: "hcst_db"
  });
  
  app.get('/key/:p/:g/:a' , function(req,res)
  {
    console.log('p:', req.params.p);
    console.log('g:', req.params.g);
    console.log('A:', req.params.a);
    /* Chọn b = 15 
    Tính g^b mod q =  5^15 mod 23 = 19
    Tính 8^15 mod 23 = 35,184,372,088,832 mod 23
    s =2 ;
    */
    var s = 2;
   res.send("19")
  });



  app.get('/T/:t' , function(req,res)
  {
    console.log('Tr:', req.params.t);
    T = CryptoJS.HmacSHA256(2, "secret").toString(CryptoJS.enc.Hex);
    TR = CryptoJS.HmacSHA256('hvktmm', "secret").toString(CryptoJS.enc.Hex);
    res.send(TR)
  });


  app.get('/user/:id/:s', function (req, res) {
    console.log('ID:', req.params.id);
    console.log('S:', req.params.s);
    var bytes  = CryptoJS.AES.decrypt(req.params.s, 'secret key 123');
    var originalText = bytes.toString(CryptoJS.enc.Utf8);
    console.log(originalText);
    /*
      Thỏa thuận khóa :
      p=23 , g=5
      chọn b = 15 -> Tính
      B = 5^15 mod 23
      B = 30,517,578,125 mod 23
      B = 19
      => Chuyển cho client 19
      + Nhận 8 từ client -> TÍnh s = 8^15 mod 23 = 2
      => Khóa chia sẻ 2
    */
    var sql = `SELECT * FROM Users Where epassport_number = "${req.params.id}";`
    con.query(sql, function(err, results) {
      if (err) throw err;
      res.send(results);
    });
  });
  
  