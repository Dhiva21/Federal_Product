import React from 'react'
import {Container } from "react-bootstrap";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import TrendingSelect from '../components/TrendingSelect';
// import { TrendingBtn } from '../components/TrendingBtn';
// import TrendingText from '../components/TrendingText';
import '../css/Trending.css'


export const Trending = () => {
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
                          <TrendingSelect />
                      </div>
              </Col>
              {/* <Col xs={6}>
                  <div>
                      <TrendingText/>
                  </div></Col> */}
      </Row>
    </Container>
  )
}
