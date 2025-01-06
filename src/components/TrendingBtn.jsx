import React from 'react';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
 
export const TrendingBtn = ({ onSubmit, onClear }) => {
  return (
    <>
      <Row className='mt-3'>
        <Col xs={6}>
          <div>
            <Button
              variant="primary"
              className='clearBtn BtnSize'
              onClick={onClear} 
            >
              Clear
            </Button>
          </div>
        </Col>
        <Col xs={6}>
          <Button
            variant="secondary"
            className='submitBtn BtnSize'
            onClick={onSubmit} // Trigger submit action
          >
            Submit
          </Button>
        </Col>
      </Row>
    </>
  );
};
