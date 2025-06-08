import React, { useState, useEffect } from 'react';

function AnalyticsDashboard() {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);

  const [eventNameFilter, setEventNameFilter] = useState('');
  const [userIdFilter, setUserIdFilter] = useState('');
  const [startDateFilter, setStartDateFilter] = useState('');
  const [endDateFilter, setEndDateFilter] = useState('');

  // Fetch all events on mount
  useEffect(() => {
    fetch('/api/events')
      .then(res => res.json())
      .then(data => {
        setEvents(data);
        setFilteredEvents(data);
      })
      .catch(err => console.error('Error fetching events:', err));
  }, []);

  // Get unique event names for dropdown options
  const eventNames = [...new Set(events.map(e => e.name))];

  // Filtering function
  useEffect(() => {
    let filtered = events;

    if (eventNameFilter) {
      filtered = filtered.filter(e => e.name === eventNameFilter);
    }

    if (userIdFilter.trim() !== '') {
      filtered = filtered.filter(e => e.properties.userId?.toLowerCase().includes(userIdFilter.toLowerCase()));
    }

    if (startDateFilter) {
      filtered = filtered.filter(e => new Date(e.timestamp) >= new Date(startDateFilter));
    }

    if (endDateFilter) {
      filtered = filtered.filter(e => new Date(e.timestamp) <= new Date(endDateFilter));
    }

    setFilteredEvents(filtered);
  }, [eventNameFilter, userIdFilter, startDateFilter, endDateFilter, events]);

  return (
    <div style={{ padding: 20, fontFamily: 'Arial, sans-serif', color: '#333' }}>
      <h2>Analytics Events Dashboard</h2>

      <div style={{ marginBottom: 20 }}>
        <label>
          Event Name:{' '}
          <select value={eventNameFilter} onChange={e => setEventNameFilter(e.target.value)}>
            <option value=''>All</option>
            {eventNames.map(name => (
              <option key={name} value={name}>{name}</option>
            ))}
          </select>
        </label>

        <label style={{ marginLeft: 20 }}>
          User ID:{' '}
          <input
            type="text"
            placeholder="Filter by user ID"
            value={userIdFilter}
            onChange={e => setUserIdFilter(e.target.value)}
          />
        </label>

        <label style={{ marginLeft: 20 }}>
          Start Date:{' '}
          <input
            type="date"
            value={startDateFilter}
            onChange={e => setStartDateFilter(e.target.value)}
          />
        </label>

        <label style={{ marginLeft: 20 }}>
          End Date:{' '}
          <input
            type="date"
            value={endDateFilter}
            onChange={e => setEndDateFilter(e.target.value)}
          />
        </label>
      </div>

      <table border="1" cellPadding="6" cellSpacing="0" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#f0f0f0' }}>
            <th>Timestamp</th>
            <th>Event Name</th>
            <th>User ID</th>
            <th>Properties</th>
          </tr>
        </thead>
        <tbody>
          {filteredEvents.length === 0 ? (
            <tr><td colSpan="4" style={{ textAlign: 'center' }}>No events found.</td></tr>
          ) : (
            filteredEvents.map(event => (
              <tr key={event._id || event.timestamp + event.name}>
                <td>{new Date(event.timestamp).toLocaleString()}</td>
                <td>{event.name}</td>
                <td>{event.properties.userId || '-'}</td>
                <td>
                  <pre style={{ whiteSpace: 'pre-wrap', margin: 0 }}>
                    {JSON.stringify(event.properties, null, 2)}
                  </pre>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AnalyticsDashboard;