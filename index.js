const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 4000;

// middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.zdula.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
console.log(uri)

const run = async () => {
    try {
        await client.connect();
        const database = client.db('bashundhara_jewellers');
        const productsCollection = database.collection('products')

        app.get('/products', async (req, res) => {
            const query = {};
            const cursor = productsCollection.find(query);
            const result = await cursor.toArray();
            res.send(result);
        })

    }
    finally {
        // await client.close();
    }
}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('Server is running')
})

app.listen(port, () => {
    console.log('Server is running', port, 'this port')
})
