import React, { useEffect, useRef, useState, useMemo } from 'react';
import * as d3 from 'd3';

const IndiaMap = ({ onStateSelect }) => {
  const svgRef = useRef(null);
  const [selectedState, setSelectedState] = useState(null);  
  
    
  console.log(selectedState)



    
    
  // Memoize the map to prevent unnecessary re-renders
  const renderMap = useMemo(() => {
    return async () => {
      try {
        if (!svgRef.current) return;

        // Fetch and wait for the GeoJSON data
        const response = await fetch('/map/india.json');
        // URL= https://raw.githubusercontent.com/Subhash9325/GeoJson-Data-of-Indian-States/refs/heads/master/Indian_States
        const geoData = await response.json();

        // Setup D3
        const width = 800;
        const height = 600;

        const svg = d3.select(svgRef.current)
          .attr('width', width)
          .attr('height', height);

        // Clear any existing content
        svg.selectAll('*').remove();

        // Create projection
        const projection = d3.geoMercator()
          .center([78.9629, 22.5937]) // Center of India
          .scale(1000)
          .translate([width / 2, height / 2]);

        // Create path generator
        const pathGenerator = d3.geoPath().projection(projection);

        // Create group for map
        const g = svg.append('g');

        // Tooltip div
        const tooltip = d3.select('body')
          .append('div')
          .attr('class', 'tooltip')
          .style('position', 'absolute')
          .style('background-color', '#fff')
          .style('border', '1px solid #ccc')
          .style('padding', '5px')
          .style('border-radius', '4px')
            .style('visibility', 'hidden')
            .style('z-index', '1000');

        // Draw the map
        g.selectAll('path')
          .data(geoData.features)
          .enter()
          .append('path')
          .attr('d', pathGenerator)
          .attr('class', 'state')
          .style('fill', '#cbd5e0')
          .style('stroke', '#2d3748')
          .style('stroke-width', '0.5')
          .style('cursor', 'pointer')
          .on('mouseover', function(event, d) {
            // Change color only if the state is not selected
            if (d.properties.NAME_1 !== selectedState) {
              d3.select(this).style('fill', '#4299e1');
            }

            // Show tooltip
            tooltip
              .style('visibility', 'visible')
              .text(d.properties.NAME_1);

            // Calculate mouse position relative to the SVG container
            const [x, y] = d3.pointer(event);

            // Set tooltip position
            tooltip
              .style('left', `${x + 10}px`) // Adjust as needed for offset
              .style('top', `${y - 25}px`); // Adjust for vertical alignment
          })
          .on('mouseout', function(event, d) {
            // Reset color only if the state is not selected
            if (d.properties.NAME_1 !== selectedState) {
              d3.select(this).style('fill', '#cbd5e0');
            }

            // Hide tooltip
            tooltip.style('visibility', 'hidden');
          })
          .on('click', function(event, d) {
            const clickedState = d.properties.NAME_1;
            if (clickedState === selectedState) {
             onStateSelect(null);
              setSelectedState(null);
            } else {
              // Otherwise, update the selected state
                setSelectedState(clickedState);
                 onStateSelect(clickedState);
            }

            // Change the color of the clicked state
            d3.select(this).style('fill', '#ff6347');
            console.log('Selected state:', clickedState);
          });

        // After map is drawn, ensure selected state keeps the color
        g.selectAll('path')
          .style('fill', function(d) {
            return d.properties.NAME_1 === selectedState ? '#ff6347' : '#cbd5e0';
          });

      } catch (error) {
        console.error('Error loading or rendering map:', error);
      }
    };
  }, [selectedState, onStateSelect]);

  useEffect(() => {
    renderMap(); 
  }, [renderMap]);

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="p-4">
        <svg 
          ref={svgRef}
          className="w-full h-auto"
          style={{ backgroundColor: '#f0f9ff' }}
        />
      </div>
    </div>
  );
};

export default IndiaMap;
