import React, { useState } from 'react';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import { TrendingBtn } from './TrendingBtn'; 
import TrendingText from './TrendingText'; 

function TrendingSelect() {
  const [region, setRegion] = useState('India');
  const [trendingTopics, setTrendingTopics] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const map_data = {
    "India": "IN",
    "Tamil Nadu": "IN-TN",
    "Karnataka": "IN-KA",
    "Andhra Pradesh": "IN-AP",
    "Telangana": "IN-TG",
    "Delhi": "IN-DL",
    "Maharashtra": "IN-MH",
    "West Bengal": "IN-WB",
    "Uttar Pradesh": "IN-UP",
    "Kerala": "IN-KL",
    "Rajasthan": "IN-RJ",
    "Gujarat": "IN-GJ",
    "Punjab": "IN-PB",
    "Haryana": "IN-HR",
    "Bihar": "IN-BR",
    "Madhya Pradesh": "IN-MP",
    "Chhattisgarh": "IN-CT",
    "Odisha": "IN-OR",
    "Assam": "IN-AS",
    "Jharkhand": "IN-JH",
    "Himachal Pradesh": "IN-HP",
    "Uttarakhand": "IN-UT",
    "Goa": "IN-GA",
    "Jammu and Kashmir": "IN-JK",
    "Tripura": "IN-TR",
    "Meghalaya": "IN-ML",
    "Manipur": "IN-MN",
    "Nagaland": "IN-NL",
    "Arunachal Pradesh": "IN-AR",
    "Mizoram": "IN-MZ",
    "Sikkim": "IN-SK"
  };

  const fetchTrending = async () => {
    setLoading(true);
    try {
      const regionCode = map_data[region];
      if (!regionCode) {
        console.error('No region code found for the selected region');
        return;
      }

      const response = await axios.get(`http://localhost:5000/?region=${regionCode}`, { responseType: 'text' });

      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(response.data, "application/xml");

      const titles = xmlDoc.getElementsByTagName("title");
      const topics = [];
      for (let i = 0; i < titles.length; i++) {
        topics.push(titles[i].textContent);
      }

      setTrendingTopics(topics);
    } catch (error) {
      console.error('Error fetching data:', error);
      setTrendingTopics(['Error fetching trends']);
    }
    setLoading(false);
  };

  const handleSubmit = () => {
    setSubmitted(true);
    fetchTrending();
  };

  const handleClear = () => {
    setSubmitted(false);
    setTrendingTopics([]);
  };

  return (
      <>
            <Row>
              <Col xs={6}>                               
                      <div>
                          <Card className='p-3'>
        <Form.Label htmlFor="state">Select State/Region</Form.Label>
        <Form.Select
          aria-label="Default select example"
          id='state'
          onChange={(e) => setRegion(e.target.value)}
          value={region}
        >
          {Object.keys(map_data).sort().map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </Form.Select>
      </Card>

      <TrendingBtn onSubmit={handleSubmit} onClear={handleClear} />
                      </div>
              </Col>
              <Col xs={6}>
                  <div>          
                 <TrendingText topics={submitted && trendingTopics.length > 0 ? trendingTopics : []} loading={loading} />

                  </div></Col>
      </Row>
     

     
    </>
  );
}

export default TrendingSelect;
