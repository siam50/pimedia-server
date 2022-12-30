const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
const port = process.env.PORT || 5000;

const app = express();

// middleware
app.use(cors());
app.use(express.json());




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.1obyivv.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const postsCollection = client.db("pimedia").collection("posts")

        app.post('/posts', async (req, res) => {
            const post = req.body;
            const result = await postsCollection.insertOne(post);
            res.send(result)
        });

        app.get('/posts', async (req, res) => {
            const query = {}
            const posts = await postsCollection.find(query).toArray()
            res.send(posts)
        });

        // app.put('/posts/:id', async (req, res) => {
        //     const id = req.params.id;
        //     const query = posts.like;
        //     const parseQuery = parseInt(query);
        //     console.log(parseQuery)
        //     const sum = req.body;
        //     const sumParse = parseInt(sum);
        //     const filter = { _id: ObjectId(id) };
        //     const options = { upsert: true };
        //     const updateDoc = {
        //         $set: {
        //             like: parseQuery + 1
        //         },
        //     };
        //     const result = await postsCollection.updateOne(filter, updateDoc, options);
        //     res.send(result);
        // })


    }
    finally {

    }
}
run().catch(console.log)


app.get('/', async (req, res) => {
    res.send('pimedia server is running')
});

app.listen(port, () => console.log(`pimedia running on ${port}`))