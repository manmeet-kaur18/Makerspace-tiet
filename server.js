console.log('Server-side code running');

const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const app = express();

var nodemailer = require('nodemailer');
// serve files from the public directory
app.use(express.static('public'));

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// connect to the db and start the express server
let db;

// ***Replace the URL below with the URL for your database***
const url = 'mongodb://ThaparUser:Pass#123@ds227865.mlab.com:27865/makerspace';
// E.g. for option 2) above this will be:
// const url =  'mongodb://localhost:21017/databaseName';

MongoClient.connect(url, (err, database) => {
  if(err) {
    return console.log(err);
  }
  db=database;
  // start the express web server listening on 8080
  app.listen(process.env.PORT || 8080, () => {
    console.log('listening on deployed server');
  });
});
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
  });


  app.get('/contact', (req, res) => {
    res.sendFile(__dirname + '/contact.html');
  });

  app.get('/projectdetailes', (req, res) => {
    res.sendFile(__dirname + '/projectdetailes.html');
  });

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    secure: false,
    port: 25,
    auth: {
        user: 'GBM918211@gmail.com',
        pass: 'Pass#123!'
    },
    tls: {
        rejectUnauthorized: true
    }
  });
  // const port = 8080;
  // app.listen(port, () => console.log(`Server started on port ${port}`));
  app.post('/sendmessage', (req, res) => {
    console.log(req.body);
    var message = req.body;
  
    db.collection('eventquery').save(message, (err, result) => {
      if (err) {
        return console.log(err);
      }
  
      let HelperOptions = {
        from: 'GBM918211@gmail.com',
        to: 'GBM918211@gmail.com',
        subject: "Enquiry by" + message.name +"email id is " + message.email,
        text: message.message,
  
    };
    transporter.sendMail(HelperOptions, (error, info) => {
        if (error) {
            console.log(error);
        }
        else {
            console.log("message sent");
        }
    });
      console.log('click added to db');
      //res.sendStatus(201);
      res.send([{
        message: 'Message successfully sent.For further responses please check your email',
        status: true
      }])
    });
  });
  app.post('/sendprojectdetailes', (req, res) => {
    console.log(req.body);
    var message = req.body;
  
    db.collection('projectdetailes').save(message, (err, result) => {
      if (err) {
        return console.log(err);
      }
      console.log('click added to db');
      //res.sendStatus(201);
      res.send([{
        message: 'Project detailes have been successfully saved',
        status: true
      }])
    });
  });
  app.get('/getprojectdetailes', (req, res) => {
    db.collection('projectdetailes').find({}).toArray((err, result) => {
        if (err) {
            res.send(err);
        }
        else {
            res.send(result);
        }
      })
  });