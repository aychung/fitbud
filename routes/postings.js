var express = require('express');
var router = express.Router();
var db = require('../database/index.js');

const multer  = require('multer')

const storage = multer.diskStorage({
  destination: './client/public/pic/event',
  filename(req, file, cb) {
    var fname = '';

    for (var i = 0; i < req.user.name.length; i++) {
      if (req.user.name.charAt(i) === ' ') {
        fname += '_';
      } else {
        fname += req.user.name.charAt(i);
      }
    }
    fname += '-_-';
    for (var i = 0; i < req.body.title.length; i++) {
      if (req.body.title.charAt(i) === ' ') {
        fname += '_';
      } else {
        fname += req.body.title.charAt(i);
      }
    }
    cb(null, fname);
  },
});
const upload = multer({ storage });

// /postings
router.get('/', (req, res) => {
  var id = req.user ? req.user.id : null;

  db.getWorkouts(id, (result) => {
    res.status(200).json(result);
  });
});


router.post('/', (req, res) => {
  console.log('session id in workout', req.user.id);
  var workoutObj = {
    title: req.body.title,
    location: req.body.location,
    date: req.body.date,
    duration: req.body.duration,
    details: req.body.details,
    meetup_spot: req.body.meetup_point,
    buddies: req.body.buddies,
    userId: req.user.id,
    private: req.body.private,
    currentEvent: req.body.currentEvent,
    currentLevel: req.body.currentLevel,
    // imgPath: req.body.imgPath,
  };

  db.createWorkout(workoutObj, (err, dbResult) => {
    res.status(201).send(dbResult);
  });  
});

router.post('/pic', upload.single('file'), (req, res) => {
  console.log('title:', req.body.title);
  db.updateEventPic(req.body.title, req.user.name)
    .then(result => {
      res.send('ok');
    });
});


router.get('/:id', (req, res) => {
  //console.log('workout req query', req.params.id);
  db.getSingleWorkout(req.params.id, (result) => {
    //console.log('result of the get for a single workout', result);
    res.status(200).json(result);
  });
});

router.get('/requests/:id', (req, res) => {
  db.getRequestsByPostingId(req.params.id, (result) => {
    //console.log('result of the get for a single workout', result);
    res.status(200).json(result);
  });
});

router.post('/:id', (req, res) => {
  //console.log('workout req query', req.params.id);
  var id = req.user.id;
  var reqObj = {
    postingId: req.params.id,
    userId: id,
    status: 'pending'
  }
  db.createRequest(reqObj, (result) => {
    //console.log('request created in the table', result);
    res.status(200).send('request created');
  });
});

router.patch('/accept/:id', (req, res) => {
  // console.log('workout req query', req.params.id);
  var id = req.params.id;
  db.updateRequest(id, (result) => {
    //console.log('request created in the table', result);
    res.status(200).send('request accepted');
  });
});

module.exports = router;
