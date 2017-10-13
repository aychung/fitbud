var express = require('express');
var router = express.Router();
var db = require('../database/index.js');


const multer  = require('multer')

const storage = multer.diskStorage({
  destination: './client/public/pic/usr',
  filename(req, file, cb) {
    var fname = '';

    for (var i = 0; i < req.user.name.length; i++) {
      if (req.user.name.charAt(i) === ' ') {
        fname += '_';
      } else {
        fname += req.user.name.charAt(i);
      }
    }
    console.log(fname);
    cb(null, fname);
  },
});
const upload = multer({ storage });

router.get('/', (req, res) => {
  // res.send('RENDER profile page');
  console.log('user profile', req.user);
  if (req.user) {
    res.json(req.user);
  } else {
    res.json({});
  }
});

router.post('/', (req, res) => {

  //console.log('user from request', req.session.passport.user);
  var id = req.session.passport.user;
  var profileObj = {
    gender: req.body.gender,
    activity: req.body.activity,
    userId: id
  };
  
  db.createProfile(profileObj, (result) => {
    //console.log('created profile');
    
    res.redirect('/postings');
  });
});

router.post('/pic', upload.single('file'), (req, res) => {
  console.log('here');
  console.log('file file:', req.file);
  db.updateProfilePic(req.user.name)
    .then(result => {
      res.send('ok');
    });
});

// router.get('/pic', (req, res) => {
//   console.log('here!!!!!!!!!');
//   var filePath = '../database/usr/a.jpg';
//   res.sendFile(filePath);
// });

module.exports = router;


