import { useState } from 'react';
import type { Flight, SearchParams } from '../App';
import '../styles/ResultsPage.css';

interface ResultsPageProps {
  searchParams: SearchParams;
  onSelectFlight: (flight: Flight) => void;
  onBack: () => void;
  favorites: Flight[];
  onToggleFavorite: (flight: Flight) => void;
}

// Mock flight data
const generateMockFlights = (params: SearchParams): Flight[] => {
  const flights: Flight[] = [];
  const airlines = ['国航', '东航', '南航', '海航', '川航', '春秋', '吉祥'];
  const platforms = ['携程', '飞猪', '去哪儿', '同程', '途牛'];

  for (let i = 0; i < 12; i++) {
    const basePrice = 200 + Math.random() * 400;
    const platformPrices = platforms.map(name => ({
      name,
      price: Math.round(basePrice + (Math.random() - 0.5) * 100),
      url: `https://www.${name}.com`,
    }));

    flights.push({
      id: `flight-${i}`,
      airline: airlines[Math.floor(Math.random() * airlines.length)],
      flightNumber: `${Math.random().toString(36).substring(2, 5).toUpperCase()}${Math.floor(Math.random() * 1000)}`,
      departure: {
        time: `${String(Math.floor(Math.random() * 24)).padStart(2, '0')}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}`,
        airport: params.departure,
        city: params.departure,
      },
      arrival: {
        time: `${String(Math.floor(Math.random() * 24)).padStart(2, '0')}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}`,
        airport: params.arrival,
        city: params.arrival,
      },
      duration: `${Math.floor(Math.random() * 4) + 2}h ${Math.floor(Math.random() * 60)}m`,
      price: Math.round(Math.min(...platformPrices.map(p => p.price))),
      platforms: platformPrices,
    });
  }

  return flights.sort((a, b) => a.price - b.price);
};

export default function ResultsPage({
  searchParams,
  onSelectFlight,
  onBack,
  favorites,
  onToggleFavorite,
}: ResultsPageProps) {
  const flights = generateMockFlights(searchParams);
  const [sortBy, setSortBy] = useState<'price' | 'time'>('price');
  const [sortedFlights, setSortedFlights] = useState(flights);

  const handleSort = (type: 'price' | 'time') => {
    setSortBy(type);
    let sorted = [...flights];
    if (type === 'price') {
      sorted.sort((a, b) => a.price - b.price);
    } else {
      sorted.sort((a, b) => a.departure.time.localeCompare(b.departure.time));
    }
    setSortedFlights(sorted);
  };

  const isFavorite = (flightId: string) => {
    return favorites.some(f => f.id === flightId);
  };

  return (
    <div className="results-page">
      <div className="results-header">
        <button className="back-btn" onClick={onBack}>
          ← 返回
        </button>
        <div className="route-info">
          <h2>搜索结果</h2>
          <p>{searchParams.departure} → {searchParams.arrival}</p>
          <p className="date-info">{searchParams.departDate}</p>
        </div>
      </div>

      <div className="sort-controls">
        <button
          className={`sort-btn ${sortBy === 'price' ? 'active' : ''}`}
          onClick={() => handleSort('price')}
        >
          按价格排序
        </button>
        <button
          className={`sort-btn ${sortBy === 'time' ? 'active' : ''}`}
          onClick={() => handleSort('time')}
        >
          按时间排序
        </button>
      </div>

      <div className="flights-list">
        {sortedFlights.map(flight => (
          <div
            key={flight.id}
            className="flight-card"
            onClick={() => onSelectFlight(flight)}
          >
            <div className="flight-header">
              <div className="airline-info">
                <h3>{flight.airline}</h3>
                <p>{flight.flightNumber}</p>
              </div>
              <button
                className={`favorite-btn ${isFavorite(flight.id) ? 'active' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleFavorite(flight);
                }}
              >
                {isFavorite(flight.id) ? '❤️' : '🤍'}
              </button>
            </div>

            <div className="flight-times">
              <div className="time-info">
                <div className="time">{flight.departure.time}</div>
                <div className="airport">{flight.departure.airport}</div>
              </div>

              <div className="duration">
                <div className="line"></div>
                <div className="text">{flight.duration}</div>
              </div>

              <div className="time-info">
                <div className="time">{flight.arrival.time}</div>
                <div className="airport">{flight.arrival.airport}</div>
              </div>
            </div>

            <div className="flight-footer">
              <div className="price">
                <div className="label">最低价格</div>
                <div className="amount">¥{flight.price}</div>
              </div>
              <div className="platforms">
                {flight.platforms.slice(0, 3).map((p, idx) => (
                  <span key={idx} className="platform-tag">
                    {p.name} ¥{p.price}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
