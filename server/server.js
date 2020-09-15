
var mysql = require('mysql');
var express = require('express');
var moment = require('moment');

/* moment.format()
 */
var conn = mysql.createConnection({
    host: '',
    user: '',
    password: '',
    database: '',
    port: ''
})

if (conn.state === 'disconnected') {
    conn.connect(function (err) {
        if (err) throw err;
        console.log("DB Connection Success");
    });
}

const app = express();
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));



//---------------------------------------------------------
//------------------ USER OPERATIONS ----------------------
//---------------------------------------------------------

// getUserName
app.get('/getUserName', (req, res) => {

    var sql = "SELECT * FROM users WHERE idusers=1"

    conn.query(sql, function(err, result) {
        if (err) {
            throw err;
        };
        var data = result[0];

        return res.json({data: data})
    })
});

// verifyUserCredentials
app.get('/verifyUser', (req, res) => {

    const email = req.param('email')
    const pwd = req.param('pwd')

    var sql = `SELECT * from users WHERE email=${email} AND password=${pwd}`

    conn.query(sql, function(err, result) {
        if (err) {
            throw err;
        };

        var data = result[0];

        return res.json({data: data})
    })
})

app.post('/registerUser', (req, res) => {
    
    const fname = req.param('fname')
    const email = req.param('email')
    const pwd = req.param('pwd')


    var sql = `INSERT INTO users (fname, email, password) VALUES (${fname}, ${email}, ${pwd})`
    conn.query(sql, function(err, result) {
        if (err) {
            throw err;
        };
        res.json({success: 1});
    })

})


//---------------------------------------------------------
// ------------------ LIST OPERATIONS ---------------------
//---------------------------------------------------------



app.post('/createList', (req, res) => {

    var listName = req.param('listname')
    var idusers = req.param('idusers')
    var color = req.param('color')
    var sql = `INSERT INTO lists (name, idusers, color) VALUES ('${listName}', '${idusers}', '${color}')`
    conn.query(sql, function(err, result) {
        if (err) {
            throw err;
        };
        res.json({success: 1});
    })
})

app.get('/getLists', (req, res) => {

    var idusers = req.param('idusers')

    var sql = `SELECT * FROM lists WHERE idusers=${idusers}`
    conn.query(sql, function(err, result) {
        if (err) {
            throw err;
        };
        var lists = result;
  
        return res.json({lists: lists})
    })
})

app.post('/updateList', (req, res) => {

    var listName = req.param('listname')
    var idlists = req.param('idlists')
    
    var sql = `UPDATE lists SET name ='${listName}' WHERE idlists = ${idlists}`
    conn.query(sql, function(err, result) {
        if (err) {
            throw err;
        };
        res.json({success: 1});
    })
})

app.post('/deleteList', (req, res) => {

    var idlists = req.param('idlists')
    
    var sql = `DELETE FROM lists WHERE idlists=${idlists}`
    conn.query(sql, function(err, result) {
        if (err) {
            throw err;
        };
        res.json({success: 1});
    })
})



//--------------------------------------------------------------
// ------------------ LIST ITEM OPERATIONS ---------------------
//--------------------------------------------------------------

app.post('/deleteListItem', (req, res) => {

    var idlistitems = req.param('idlistitems')
    
    var sql = `DELETE FROM listitems WHERE idlistitems=${idlistitems}`

    conn.query(sql, function(err, result) {
        if (err) {
            throw err;
        };
        res.json({success: 1});
    })
})

app.post('/toggleListItem', (req, res) => {

    var idlistitems = req.param('idlistitems')
    var completed = req.param('value')

    var sql = `UPDATE listitems SET completed = ${completed} WHERE idlistitems = ${idlistitems}`
    conn.query(sql, function(err, result) {
        if (err) {
            throw err;
        };
        res.json({success: 1});
    })
})

app.get('/getListItems', (req, res) => {

    var idusers = req.param('idusers');
    var idlists = req.param('idlists');

    var sql = `SELECT * FROM listitems WHERE idusers=${idusers} AND idlists=${idlists}`

    conn.query(sql, function(err, result) {
        if (err) {
            throw err;
        };

        var listitems = result;
  
        return res.json({listitems: listitems})
    })
})

app.get('/getDailyListItems', (req, res) => {

    var idusers = req.param('idusers');
    var sql = `SELECT * FROM listitems WHERE idusers=${idusers} AND scheduledcompletion IS NOT NULL`

    conn.query(sql, function(err, result) {
        if (err) {
            throw err;
        };

        let datetime = new Date();
        datetime = datetime.toISOString().slice(0, 19).replace('T', ' ');

        // take only the tasks that are scheduled for today
        let listitems = result.filter(task => 
            moment(task.scheduledcompletion).format('L')  == moment(datetime).format('L')
        );
  
        return res.json({scheduledlistitems: listitems})
    })


})


// create a new list item
app.post('/createNewListItem', (req, res) => {

    var title = req.param('title')
    var idusers = req.param('idusers')
    var idlists = req.param('idlists')

    let datetime = new Date();
    datetime = datetime.toISOString().slice(0, 19).replace('T', ' ');
  
    if (idlists == 'undefined') {
        var sql = `INSERT INTO listitems (idusers, idlists, title, datecreated, scheduledcompletion) VALUES ('${idusers}', 'null', '${title}', '${datetime}', '${datetime}')`
    } else {
        var sql = `INSERT INTO listitems (idusers, idlists, title, datecreated) VALUES ('${idusers}', '${idlists}', '${title}', '${datetime}')`

    }

    conn.query(sql, function(err, result) {
        if (err) {
            throw err;
        };

        res.json({success: 1});
    })
    console.log('NEW ITEM ADDED')
});



app.post('/updateListItem', (req, res) => {

    var listItemTitle = req.param('title')
    var idlistitems = req.param('idlistitems')
    
    var sql = `UPDATE listitems SET title = '${listItemTitle}' WHERE idlistitems = ${idlistitems}`

    conn.query(sql, function(err, result) {
        if (err) {
            throw err;
        };
        res.json({success: 1});
    })
})