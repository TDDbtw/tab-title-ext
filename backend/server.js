require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./database');
const Profile = require('./models/Profile');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

sequelize.sync().then(() => {
    console.log('Database synced');
}).catch((err) => {
    console.error('Failed to sync database:', err);
});

app.post('/profiles', async (req, res) => {
    try {
        const { name, url, about, bio, location, follower_count, connection_count } = req.body;
        const profile = await Profile.create({
            name,
            url,
            about,
            bio,
            location,
            follower_count,
            connection_count
        });
        res.status(201).json(profile);
    } catch (error) {
        console.error('Error saving profile:', error);
        res.status(500).json({ error: 'Failed to save profile' });
    }
});

app.get('/profiles', async (req, res) => {
    try {
        const profiles = await Profile.findAll();
        res.json(profiles);
    } catch (error) {
        console.error('Error fetching profiles:', error);
        res.status(500).json({ error: 'Failed to fetch profiles' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

