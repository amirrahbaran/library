var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

var id = 0;
var books = {};

app.get('/books', function (req, res) {
    res.json(Object.keys(books).map(function (id) {
        return books[id];
    }));
});

app.get('/books/:id', function (req, res){
    var id = parseInt(req.params.id, 10);
    res.json(books[id]);
});

app.post('/books', function (req, res){
    var book = req.body;
    book._id = ++id;
    books[book._id] = book;
    res.json(book);
});

app.put('/books/:id', function (req, res) {
    var id = parseInt(req.params.id, 10);
    books[id] = req.body;
    res.json(books[id]);
});

app.delete('/books/:id', function (req, res) {
    var id = parseInt(req.params.id, 10);
    delete books[id];
    res.json(null);
});

app.get('*', function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
}); 

app.listen(4000);