import express = require('express');
import http = require('http');
import path = require('path');
var bodyParser = require('body-parser');
var logger = require('morgan');
var app = express();
var multer = require('multer');
import stylus = require('stylus');

import bookController = require('./controllers/bookKartController');
import orderController = require('./controllers/orderController');
import routes = require('./routes/index');

//var configurestorage = multer.diskStorage({
//    destination: function (req, file, cb) {
//        cb(null, 'app-data/upload');
//    }, filename: function (req, file, cb) {
//        cb(null, file.originalname);
//        console.log(file);
//    }
//})
//var multerMidleLayer = multer({ storage: configurestorage });
//// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(stylus.middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('dev'));
// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}


app.get('/', routes.index);
app.get('/listofbooks', bookController.getListOfBooks);
app.get('/bookById', bookController.getBooksDeatilsById);
app.get('/authorList', bookController.getListOfAuthors);
app.get('/authorsByBooksId', bookController.getAuthorsOfbook);
app.get('/addtoCart', orderController.addBookToCart);
app.get('/cartDetails', orderController.getCartDetails);
app.get('/deleteselectedCartItem', orderController.deleteCartItem);
app.get('/customerOrders', orderController.getCustomerOders);
app.get('/customerAddressdetails', orderController.getcustomerOrderAdress);
app.get('/customerOrderItems', orderController.getOrdredItems);

app.post('/addbook', bookController.addnewBook);
app.post('/addAuthor', bookController.addNewAuthor);
app.post('/placeOrder', orderController.placeOrder);


http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
