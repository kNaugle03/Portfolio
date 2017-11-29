
module.exports.index = function(req, res, next) {
    //connect to the db
    req.getConnection(function(err,connection){

        var query = connection.query('SELECT * FROM employees ORDER BY emp_no DESC LIMIT 0,25 ',
            function(err,rows) {
                if (err)
                    console.log("Error Selecting : %s ", err);
                res.json(rows);
            }
        );

        console.log(query.sql);

    });

};

module.exports.show = function(req, res, next) {
    //connect to the db
    req.getConnection(function(err,connection){
        var empno = req.params.id;
        var query = connection.query('SELECT * FROM employees WHERE emp_no = ?;',[empno],
            function(err,rows) {
                if (err)
                    console.log("Error Selecting : %s ", err);
                res.json(rows[0]);
            }
        );
        console.log(query.sql);
    });
};

module.exports.store = function(req, res, next) {

    //console.log(req);

    //connect to the db
    req.getConnection(function(err,connection){

        var birth_date = req.body.birth_date;
        var first_name = req.body.first_name.toUpperCase();
        var last_name = req.body.last_name.toUpperCase();
        var gender = req.body.gender.toUpperCase();
        var hire_date = req.body.hire_date;

        var query = connection.query('INSERT INTO employees (birth_date, first_name, last_name, gender, hire_date)' +
                                     'VALUES (?,?,?,?,?);',[birth_date,first_name,last_name,gender,hire_date],
            function(err,rows) {
                if (err)
                    console.log("Error Inserting : %s ", err);
                res.json({message: 'Employee successfully inserted'});
            }
        );

        console.log(query.sql);

    });

};

module.exports.update = function(req, res, next) {
    //connect to the db
    req.getConnection(function(err,connection){

        var empno = req.params.id;
        var first_name = req.body.first_name.toUpperCase();
        var last_name = req.body.last_name.toUpperCase();
        var gender = req.body.gender.toUpperCase();

        var query = connection.query('UPDATE employees SET first_name=?, last_name=?, gender=? ' +
                                     'WHERE emp_no=?;', [first_name, last_name, gender, empno],
            function(err,rows) {
                if (err)
                    console.log("Error Selecting : %s ", err);
                res.json({message: 'Employee successfully updated'});
            }
        );

        console.log(query.sql);

    });


};

module.exports.destroy = function(req, res, next) {
    //connect to the db
    req.getConnection(function(err,connection){

        var empno = req.params.id;


        var query = connection.query('DELETE FROM employees WHERE emp_no = ?;',[empno],
            function(err,rows) {
                if (err)
                    console.log("Error Selecting : %s ", err);
                res.json({message:'Actor successfully deleted'});
            }
        );

        console.log(query.sql);

    });


};