var express = require('express');
var router = express.Router();

var controller = require('../controllers/employeecontroller');

/* GET home page. */

//localhost:3000/api
router.get('/',

    function(req, res, next) {
      res.send('welcome to the api!!!');
    }

);

//localhost:3000/api/actors
router.route('/employees')
    .get(controller.index)
    .post(controller.store);

router.route('/employees/:id')
    .get(controller.show)
    .put(controller.update)
    .delete(controller.destroy);


module.exports = router;
