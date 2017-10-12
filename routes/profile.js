var express = require('express');
var router = express.Router();
var db = require('../database/index.js');


const multer  = require('multer')

const storage = multer.diskStorage({
  destination: './client/public/pic/usr',
  filename(req, file, cb) {
    var fname = req.user.name;
    // console.log(file.mimetype);
    // if(file.mimetype === 'image/jpeg') {
    //   fname += '.jpg';
    // } else if (file.mimtype === 'image/png') {
    //   fname += '.png';
    // }
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
  console.log('file body:', req.body.name, req.body.filename);
  console.log('file file:', req.file);
  // db.saveImageInfo();
  // models.saveFileInformation(req.body.username, req.body.roomname, req.file.filename)
  //   .then(data => {
  //     res.status(201).send();
  //   });
});

// router.get('/pic', (req, res) => {
//   console.log('here!!!!!!!!!');
//   var filePath = '../database/usr/a.jpg';
//   res.sendFile(filePath);
// });

module.exports = router;


