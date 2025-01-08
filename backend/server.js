import express from 'express';
import axios from 'axios';
import cors from 'cors';
const app = express();
const port = 5000;

// Enable CORS for all requests
app.use(cors());

app.get('/', async (req, res) => {
  try {
    const regionCode = req.query.region;
    
    if (!regionCode) {
      return res.status(400).send('Region code is required');
    }

    const response = await axios.get(`https://trends.google.com/trending/rss?geo=${regionCode}`);
    res.send(response.data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).send('Error fetching data');
  }
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
