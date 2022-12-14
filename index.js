const express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var cors = require('cors'); // desabilitar bloqueios ao rodar local

const app = express();
app.use(bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
app.use(cors());
const port = 8080;

var connection = mysql.createConnection({
    host     : 'us-cdbr-east-06.cleardb.net',
    database : 'heroku_407f94f031393c6',
    user     : 'b86f19c80eeddf',
    password : '92833bd7',
});





app.get('/login', (req, res) => {
    const { user, pass } = req.query;

    connection.query(`SELECT * FROM cliente WHERE email='${user}' AND senha='${pass}'`, function (error, results, fields) {
        if (error) throw error;
    
        results.length > 0 ? res.send('ok') : res.send('nok');
        
    });

    
})

app.post('/register', (req, res) => {
    const { nome, email, senha} = req.body;

    const cliente  = { nome, email, senha };
    connection.query('INSERT INTO cliente SET ?', cliente, function (error, results, fields) {
        if (error) throw error;
        
    });

    res.send('ok')
})

app.get('/products', (req, res) => {

    var pizzas = [];
    
    connection.query('SELECT * FROM pizza', function (error, results, fields) {
        if (error) throw error;
    
        results.forEach(result => {
            pizzas.push(result);
        });

        res.send(pizzas)
        
    });
})

app.post('/checkout', (req, res) => {
    const { qtdProds, valorTotal} = req.body;

    const pedido  = { qtdProds, valorTotal };
    connection.query('INSERT INTO pedido SET ?', pedido, function (error, results, fields) {
        if (error) throw error;
        
    });

    res.send('ok')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})