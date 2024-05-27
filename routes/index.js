var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({unit: "IFN666"});
});

router.get('/api/habits', function(req, res, next) {
  const query = req.db.from("habits").select("*")
  return query.then(result => {
    res.json(result);
  })
   
});
router.post("/api/habits", function(req, res, next) {

  const name = req.body.name
  const description = req.body.description;
  const category = req.body.category;
  const goals = req.body.goals;
  const period = req.body.period;
  const tags = req.body.tags;
  const startTerm = req.body.startTerm;
  const endTerm = req.body.endTerm;
  
  console.log(req.body)
  if (!name || !description || !category || !goals || !period || !tags || !startTerm || !endTerm) {
      res.status(400).json( {
        error: true,
        message: "Request body incomplete - please check the missing input field"
      });
      return;
  }

  console.log(req.body);
  return req.db.from("habits").insert({name, description, category, goals, period, tags, startTerm, endTerm}).then(function (result) {
    console.log(result)
  res.json({success: true, message: 'Successfully executed'})
  })
  return;
});




module.exports = router;
