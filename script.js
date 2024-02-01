// serverless/api/songs.js

const { MongoClient } = require('mongodb');

async function handler(req, res) {
    const connection_string = process.env.MONGODB_URI; // Use the environment variable

    try {
        const client = new MongoClient(connection_string, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();

        const db = client.db('music_player');
        const collection = db.collection('songs');

        if (req.method === 'GET') {
            // Retrieve songs
            const songs = await collection.find().toArray();
            res.status(200).json({ songs });
        } else if (req.method === 'POST') {
            // Upload a new song
            const { title, artist } = req.body;
            const file = req.files.file;

            // Save the file to your storage system (e.g., AWS S3, Azure Blob Storage, etc.)
            // Then, save the song information to MongoDB
            const result = await collection.insertOne({ title, artist, fileUrl: 'your_file_url' });

            if (result.insertedCount === 1) {
                res.status(200).json({ success: true });
            } else {
                res.status(500).json({ success: false, error: 'Failed to upload song' });
            }
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    } finally {
        client.close();
    }
}

module.exports = handler;
