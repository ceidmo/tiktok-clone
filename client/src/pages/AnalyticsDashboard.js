import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const DashboardContainer = styled.div`
  padding: 2rem;
  background: #121212;
  color: white;
  min-height: 100vh;
`;

const EventCard = styled.div`
  background: #1e1e1e;
  border-radius: 12px;
  padding: 1rem;
  margin-bottom: 1rem;
  box-shadow: 0 0 8px rgba(255, 255, 255, 0.05);
`;

const EventTitle = styled.h3`
  margin: 0;
  color: #00ffc3;
`;

const EventDetails = styled.pre`
  font-size: 0.9rem;
  color: #ccc;
  margin-top: 0.5rem;
`;

const ClearButton = styled.button`
  background: #ff3b3b;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  margin-bottom: 2rem;

  &:hover {
    background: #ff1c1c;
  }
`;

const AnalyticsDashboard = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem('dev_events')) || [];
    setEvents(storedEvents.reverse());
  }, []);

  const clearEvents = () => {
    localStorage.removeItem('dev_events');
    setEvents([]);
  };

  return (
    <DashboardContainer>
      <h1>📊 Analytics Dashboard</h1>
      <ClearButton onClick={clearEvents}>Clear All Events</ClearButton>
      {events.length === 0 ? (
        <p>No events tracked yet.</p>
      ) : (
        events.map((event, idx) => (
          <EventCard key={idx}>
            <EventTitle>{event.name}</EventTitle>
            <EventDetails>{JSON.stringify(event.properties, null, 2)}</EventDetails>
            <small>{new Date(event.timestamp).toLocaleString()}</small>
          </EventCard>
        ))
      )}
    </DashboardContainer>
  );
};

export default AnalyticsDashboard;