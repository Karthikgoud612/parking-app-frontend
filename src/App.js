import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [areas, setAreas] = useState([]);

  useEffect(() => {
    fetchAreas();
  }, []);

  const fetchAreas = async () => {
    const res = await axios.get('https://parking-backend-pepg.onrender.com/api/parking-areas');
 // replace with deployed URL later
    setAreas(res.data);
  };

  const handleBook = async (parkingAreaId) => {
    try {
     
    const res = await axios.post('https://parking-backend-pepg.onrender.com/api/bookings', {
  userId: 'dummyUser123',
  parkingAreaId,
});

      alert('✅ Spot booked!');
      fetchAreas(); // refresh data to show updated available spots
    } catch (err) {
      console.error(err);
      alert('❌ Booking failed: ' + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>🅿 Parking Spot Finder</h2>
      <ul>
        {areas.map((area) => (
          <li key={area._id}>
            <strong>{area.name}</strong> - Total Spots: {area.totalSpots}, Available: {area.availableSpots}
            <button
              style={{ marginLeft: '10px' }}
              onClick={() => handleBook(area._id)}
            >
              Book Spot
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
