import React from 'react';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';

function TrendingText({ topics = [], loading }) {
  return (
    <Card className='p-3'>
      <Form.Label htmlFor="trending_now">Trending Now</Form.Label>
      <Form.Control
        id='trending_now'
        as="textarea"
        rows={20}
        value={loading ? "Loading..." : (topics.length > 0 ? topics.join('\n') : "No trending topics available.")}
        readOnly
      />
    </Card>
  );
}

export default TrendingText;
