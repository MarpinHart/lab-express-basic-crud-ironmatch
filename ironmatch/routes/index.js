const express = require('express');
const router  = express.Router();
const Match = require('../models/Match.js')
/* GET home page */
router.get('/', (req, res, next) => {
  Match.find()
    .then(matches => res.render('index', { matches } )); //Here gets the array to show it
});

router.post('/', (req, res, next) => {
  console.log(req.body)
  const { player1, score1, score2, player2 } = req.body
  const newMatch = new Match({player1, score1, score2, player2});
  newMatch.save()
  .then((match) => {
    res.redirect('/');
  })
  .catch((error) => {
    console.log("Error! ", error);
    res.redirect('/');
  })
  console.log(req.body)
})
module.exports = router;

router.get('/matches/delete/:id', (req,res) => {
  Match.findByIdAndDelete(req.params.id)
    .then(() => res.redirect('/'))
    .catch(err => {
      console.log('An error happened', err)
      res.render('error')
    })
})