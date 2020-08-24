
var mysql = require('mysql');
var express = require('express');

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
       console.log(data);

        return res.json({data: data})
    })
});

// verifyUserCredentials
app.get('/verifyUser', (req, res) => {

    const email = req.param('email')
    const pwd = req.param('pwd')

    var sql = `SELECT * from users WHERE email=${email} AND password=${pwd}`
    console.log(sql);

    conn.query(sql, function(err, result) {
        if (err) {
            throw err;
        };

        var data = result[0];
        console.log(data);

        return res.json({data: data})
    })
})

app.post('/registerUser', (req, res) => {
    
    const fname = req.param('fname')
    const email = req.param('email')
    const pwd = req.param('pwd')

    console.log('here')

    var sql = `INSERT INTO users (fname, email, password) VALUES (${fname}, ${email}, ${pwd})`
    console.log(sql)
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
    var sql = `INSERT INTO lists (name, idusers) VALUES ('${listName}', '${idusers}')`
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
    console.log(sql)
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
    console.log(sql)
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
    console.log(sql)
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

    console.log('here');
    var idusers = req.param('idusers');
    var idlists = req.param('idlists');

    var sql = `SELECT * FROM listitems WHERE idusers=${idusers} AND idlists=${idlists}`
    console.log('GETTING LIST ITEMS')
    console.log(sql)
    conn.query(sql, function(err, result) {
        if (err) {
            throw err;
        };
        console.log(result)
        var listitems = result;
  
        return res.json({listitems: listitems})
    })
})


// create a new list item
app.post('/createNewListItem', (req, res) => {

    console.log('1. CREATE NEW LIST ITEM')
    var title = req.param('title')
    var idusers = req.param('idusers')
    var idlists = req.param('idlists')

    var sql = `INSERT INTO listitems (idusers, idlists, title) VALUES ('${idusers}', '${idlists}', '${title}')`
    console.log('2. ' + sql);
    conn.query(sql, function(err, result) {
        if (err) {
            throw err;
        };
        res.json({success: 1});
    })
});

app.post('/updateListItem', (req, res) => {

    var listItemTitle = req.param('title')
    var idlistitems = req.param('idlistitems')
    
    var sql = `UPDATE listitems SET title = '${listItemTitle}' WHERE idlistitems = ${idlistitems}`
    console.log("===================== SQL ======================")
    console.log(sql)
    conn.query(sql, function(err, result) {
        if (err) {
            throw err;
        };
        res.json({success: 1});
    })
})