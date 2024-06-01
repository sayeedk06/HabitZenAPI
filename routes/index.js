var express = require('express');
var router = express.Router();
var authorize = require('../middleware/auth')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.json({ unit: "IFN666" });
});


router.get('/api/habits/', function (req, res, next) {
  const idhabits = req.query.idhabits;

  if (idhabits) {
    const query = req.db.from('habits').select('*').where('idhabits', '=', idhabits)
    return query.then(result => res.json(result)
    )
  } else {
    const query = req.db.from("habits").select("*")
    return query.then(result => {
      res.json(result);
    })
  }

});

// router.get('/api/habits/', function(req, res, next) {
//   const query = req.db.from("habits").select("*")
//   return query.then(result => {
//     res.json(result);
//   })

// });


router.get('/api/habits/:userId', function (req, res, next) {

  const userId = req.params.userId;

  if (!userId) {
    res.status(400).json({
      error: true,
      message: "Request body incomplete - please check the missing input field"
    });
    return;
  }

  const query = req.db.from("habits").select("*").where("userId", "=", userId)
  return query.then(result => {
    res.json(result);
  })

});



router.post("/api/habits", function (req, res, next) {

  const name = req.body.name
  const description = req.body.description;
  const category = req.body.category;
  const goals = req.body.goals;
  const period = req.body.period;
  const tags = req.body.tags;
  const startTerm = req.body.startTerm;
  const endTerm = req.body.endTerm;
  const userId = req.body.userId;

  console.log('name ' + name)
  console.log('description ' + description)
  console.log('cat ' + category)
  console.log('goals ' + goals)
  console.log('tags ' + tags)
  console.log('start ' + startTerm)
  console.log('end ' + endTerm)
  console.log('userid ' + userId)

  if (!name || !category || !goals || !period || !tags || !startTerm || !endTerm || !userId) {
    res.status(400).json({
      error: true,
      message: "Request body incomplete - please check the missing input field"
    });
    return;
  }

  return req.db.from("habits").insert({ name, description, category, goals, period, tags, startTerm, endTerm, userId }).then(function (result) {
    console.log(result)
    res.json({ success: true, message: 'Successfully executed' })
  })
  return;
});


// router.post("/api/habits/delete/:habitId", function(req, res, next) {

//   const habitId = req.body.habitId;
//   if (!habitId) {
//     res.status(400).json( {
//       error: true,
//       message: "Request body incomplete - please check the missing input field"
//     });
//     return;
//   }
//   return req.db.from("habits").where("idhabits", "=", habitId).del()

// });

router.delete("/api/habits/delete/:habitId", function (req, res, next) {

  const habitId = req.params.habitId;
  if (!habitId) {
    res.status(400).json({
      error: true,
      message: "Request body incomplete - please check the missing input field"
    });
    return;
  }
  return req.db.from("habits").where("idhabits", "=", habitId).del().then(function (result) {
    console.log(result)
    res.json({ success: true, message: 'Successfully executed' })
  })
}

)

router.put("/api/habits/update/:habitId", function (req, res, next) {
  const habitId = req.params.habitId;
  const name = req.body.name
  const description = req.body.description;
  const category = req.body.category;
  const goals = req.body.goals;
  const period = req.body.period;
  const tags = req.body.tags;
  const startTerm = req.body.startTerm;
  const endTerm = req.body.endTerm;

  if (!habitId) {
    res.status(400).json({
      error: true,
      message: "Request body incomplete - please check the missing input field"
    });
    return;
  }
  return req.db.from("habits").where("idhabits", "=", habitId).update({
    name: name,
    description: description,
    category: category,
    goals: goals,
    period: period,
    tags: tags,
    startTerm: startTerm,
    endTerm: endTerm

  }).then(function (result) {
    console.log(result)
    res.json({ success: true, message: 'Successfully executed' })
  })
});
module.exports = router;
