const express = require('express')
const mongodb = require('mongodb');
const { callWithErrorHandling } = require('vue');


const router = express.Router();

//Get Assignments
router.get('/', async (req, res) => {
    const assignments = await loadAssignmentsCollection();
    res.send(await assignments.find({}).toArray());
});

//Add Assignment
router.post('/', async (req, res) => {
    const assignments = await loadAssignmentsCollection();
    await assignments.insertOne({
        text: req.body.text,
        file: req.body.file,
        createdAt: new Date()
    });
    res.status(201).send();
});


//Delete Assignment
router.delete('/:id', async (req, res) => {
    const assignments = await loadAssignmentsCollection();
    await assignments.deleteOne({_id: new mongodb.ObjectId(req.params.id)});
    res.status(200).send();
});

async function loadAssignmentsCollection() {
    const client = await mongodb.MongoClient.connect(
        'mongodb+srv://abc123:abc12345@cluster0.sabav.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
        {useNewUrlParser: true}
    );
    return client.db('Cluster0').collection('Assignments');
}

module.exports = router;