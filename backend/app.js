require('dotenv').config();

const express = require('express');

const app = express();
const API_KEY = process.env.MUSIXMATCH_API_KEY;
const port = 3000;

app.use(express.json());

app.listen(port, () => {
    console.log(`Server running on port http://localhost:${port}`);
});

app.get('/search', async (req, res) => {
    const {artist, title} = req.query;
    const track_id = await searchTrack(artist, title);
    res.json({ track_id });
});

app.get('/lyrics/:track_id', async (req, res) => {
    const track_id = Number(req.params.track_id);
    const lyrics = await getLyrics(track_id);
    res.json({ lyrics });
});

const searchTrack = async (artist, title) => {
    const response = await fetch(`https://api.musixmatch.com/ws/1.1/track.search?q_artist=${artist}&q_track=${title}&apikey=${API_KEY}`);
    const data = await response.json();
    console.log(data);
    return data.message.body.track_list[0].track.commontrack_id;
};

const getLyrics = async (track_id) => {
    const response = await fetch(`https://api.musixmatch.com/ws/1.1/track.lyrics.get?commontrack_id=${track_id}&apikey=${API_KEY}`);
    const data = await response.json();
    console.log(data);
    return data.message.body.lyrics.lyrics_body;
};