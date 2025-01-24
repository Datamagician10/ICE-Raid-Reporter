const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

// In-memory database (use a real database in production)
const reports = [];

const app = express();
const PORT = 8000;

app.use(cors());
app.use(bodyParser.json());

// Serve static files from the current directory
app.use(express.static(path.join(__dirname)));

// Serve the index.html file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Endpoint to fetch all reports
app.get('/api/reports', (req, res) => {
    res.json(reports);
});

// Endpoint to submit a new report
app.post('/api/reports', (req, res) => {
    const { lat, lng, time, description } = req.body;

    if (!lat || !lng || !time || !description) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    const newReport = { lat, lng, time, description };
    reports.push(newReport);

    res.status(201).json({ message: 'Report added successfully' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
