// const http = require('http');

// const hostname = '127.0.0.1';
// const port = 3000;

// const server = http.createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/plain');
//   res.end('Hello World');
// });

// server.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`);
// });

const mongodb = require('mongodb')
const mongoClient = mongodb.MongoClient

const connectionUrl = 'mongodb://127.0.0.1:27017'
const databaseName = 'to-do' 

mongoClient.connect(connectionUrl, { useNewUrlParser: true }, (error, client) => {
    if(error) {
        return console.log('Unable to connect to database');
    }

    const db = client.db(databaseName)

    db.collection('users').insertOne({
        name: 'Iago',
        age: 25
    })
})