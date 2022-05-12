const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// user: dbuser1
// pass: cgoFKzqXvW9EyKE7 


const uri = "mongodb+srv://dbuser1:cgoFKzqXvW9EyKE7@cluster0.buhg1.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try{
        await client.connect();
        const userCollection = client.db("foodExpress").collection("user");

        //3.POST user: add a now user (data reacive korar jonno)  
        app.post('/user', async(req, res) =>{
            const newUser = req.body;
            console.log('adding new user ', newUser);
            const result = await userCollection.insertOne(newUser);
            res.send(result);
        })
        // 5. GET user: mongodb theke data server site a lode korar jonno 
        app.get('/user', async(req,res) => {
            const query = {};
            const cursor = userCollection.find(query);
            const users = await cursor.toArray();
            res.send(users);
        })
    }
    finally{
        // await client.close();
    }
}
run().catch(console.dir);


/* client.connect(err => {
  const collection = client.db("foodExpress").collection("users");
  console.log('mongodb connected');
  // perform actions on the collection object
  client.close();
}); */


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
    // this function is optional
  console.log(`Example app listening on port ${port}`)
});