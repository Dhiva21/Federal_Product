import React from 'react'
import { useState } from 'react';
import {Container } from "react-bootstrap";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import TrendingSelect from '../components/TrendingSelect';
// import { TrendingBtn } from '../components/TrendingBtn';
// import TrendingText from '../components/TrendingText';
import '../css/Trending.css'
import IndiaMap from '../components/IndiaMap';


export const Trending = () => {
    const [selectedState, setSelectedState] = useState(null);

  
  const handleStateSelect = (state) => {
    setSelectedState(state);
  };
  return (
      <Container>
            <Row>
              <Col xs={12}>
                   <div className='trendingTitle'>
                      <h1>Google Trends - Trending Now</h1>
                      <p>Select a state/region to view the trending topics. The data is sourced from Google Trends RSS feeds.</p>
                  </div>
              </Col>
      </Row>
       <Row>
              <Col xs={12}>                               
                      <div>
                          <TrendingSelect selectedState={selectedState} />
                      </div>
              </Col>
      
      </Row>
        <Row>
              <Col xs={12}>                               
                      <div>
                         <IndiaMap onStateSelect={handleStateSelect} />
                      </div>
              </Col>
      
      </Row>
    </Container>
  )
}
