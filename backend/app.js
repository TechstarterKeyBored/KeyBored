require('dotenv').config();

const express = require('express');

const app = express();
const API_KEY = process.env.MUSIXMATCH_API_KEY;
const port = 3000;

app.use(express.json());

app.listen(port, () => {
    console.log(`Server running on port http://localhost:${port}`);
});

app.get('/lyrics', async (req, res) => {
    const lyrics = await getLyrics(req.query.track_id);
    res.json({ lyrics });
});


const getLyrics = async () => {
    const response = await fetch(`https://api.musixmatch.com/ws/1.1/track.lyrics.get?commontrack_id=70685934&apikey=${API_KEY}`);
    const data = await response.json();
    console.log(data);
    return data.message.body.lyrics.lyrics_body;
};