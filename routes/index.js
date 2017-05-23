var express = require('express');
var router = express.Router();
var gpiozero = require('js-gpiozero');
const LED = gpiozero.LED;
var ledActivity = new LED(47, false);

/* GET home page. */
router.get('/', function(req, res, next) {
  ledActivity.blink();
  res.render('index', { title: 'LED now blinking' });
});

router.post('/', function(req, res, next) {
  ledActivity.off();
  if (ledActivity.is_lit())
    ledActivity.toggle();
  res.render('index', { title: 'LED now off' });
});

module.exports = router;
