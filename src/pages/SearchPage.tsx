import { useState } from 'react';
import type { SearchParams } from '../App';
import '../styles/SearchPage.css';

const CITIES = [
  { code: 'BJS', name: '北京', pinyin: 'beijing' },
  { code: 'SHA', name: '上海', pinyin: 'shanghai' },
  { code: 'CAN', name: '广州', pinyin: 'guangzhou' },
  { code: 'CTU', name: '成都', pinyin: 'chengdu' },
  { code: 'CKG', name: '重庆', pinyin: 'chongqing' },
  { code: 'XIY', name: '西安', pinyin: 'xian' },
  { code: 'PVG', name: '浦东', pinyin: 'pudong' },
  { code: 'NKG', name: '南京', pinyin: 'nanjing' },
  { code: 'HGH', name: '杭州', pinyin: 'hangzhou' },
  { code: 'WUH', name: '武汉', pinyin: 'wuhan' },
  { code: 'SZX', name: '深圳', pinyin: 'shenzhen' },
  { code: 'CIQ', name: '长沙', pinyin: 'changsha' },
  { code: 'KMG', name: '昆明', pinyin: 'kunming' },
  { code: 'NNG', name: '南宁', pinyin: 'nanning' },
  { code: 'FOE', name: '佛山', pinyin: 'foshan' },
];

const POPULAR_ROUTES = [
  { from: 'BJS', to: 'SHA', price: 299 },
  { from: 'SHA', to: 'CAN', price: 349 },
  { from: 'BJS', to: 'CAN', price: 399 },
  { from: 'CTU', to: 'SHA', price: 279 },
  { from: 'CKG', to: 'BJS', price: 329 },
];

interface SearchPageProps {
  onSearch: (params: SearchParams) => void;
}

export default function SearchPage({ onSearch }: SearchPageProps) {
  const [tripType, setTripType] = useState<'oneway' | 'roundtrip'>('oneway');
  const [departure, setDeparture] = useState('BJS');
  const [arrival, setArrival] = useState('SHA');
  const [departDate, setDepartDate] = useState(
    new Date().toISOString().split('T')[0]
  );
  const [returnDate, setReturnDate] = useState(
    new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  );
  const [passengers, setPassengers] = useState(1);
  const [showDepartureList, setShowDepartureList] = useState(false);
  const [showArrivalList, setShowArrivalList] = useState(false);
  const [searchDeparture, setSearchDeparture] = useState('');
  const [searchArrival, setSearchArrival] = useState('');

  const filteredDepartureCities = CITIES.filter(city =>
    city.name.includes(searchDeparture) ||
    city.pinyin.includes(searchDeparture) ||
    city.code.includes(searchDeparture.toUpperCase())
  );

  const filteredArrivalCities = CITIES.filter(city =>
    city.name.includes(searchArrival) ||
    city.pinyin.includes(searchArrival) ||
    city.code.includes(searchArrival.toUpperCase())
  );

  const handleSearch = () => {
    onSearch({
      departure,
      arrival,
      departDate,
      returnDate: tripType === 'roundtrip' ? returnDate : undefined,
      passengers,
      tripType,
    });
  };

  const handleSwapCities = () => {
    const temp = departure;
    setDeparture(arrival);
    setArrival(temp);
  };

  const getDepartureCity = () => CITIES.find(c => c.code === departure);
  const getArrivalCity = () => CITIES.find(c => c.code === arrival);

  return (
    <div className="search-page">
      <div className="search-container">
        {/* Trip Type Toggle */}
        <div className="trip-type-toggle">
          <button
            className={`toggle-btn ${tripType === 'oneway' ? 'active' : ''}`}
            onClick={() => setTripType('oneway')}
          >
            单程
          </button>
          <button
            className={`toggle-btn ${tripType === 'roundtrip' ? 'active' : ''}`}
            onClick={() => setTripType('roundtrip')}
          >
            往返
          </button>
        </div>

        {/* City Selection */}
        <div className="city-selection">
          <div className="city-input-wrapper">
            <div
              className="city-input"
              onClick={() => setShowDepartureList(!showDepartureList)}
            >
              <div className="city-label">出发地</div>
              <div className="city-value">{getDepartureCity()?.name}</div>
            </div>
            {showDepartureList && (
              <div className="city-dropdown">
                <input
                  type="text"
                  placeholder="搜索城市..."
                  value={searchDeparture}
                  onChange={(e) => setSearchDeparture(e.target.value)}
                  className="city-search"
                />
                <div className="city-list">
                  {filteredDepartureCities.map(city => (
                    <div
                      key={city.code}
                      className="city-item"
                      onClick={() => {
                        setDeparture(city.code);
                        setShowDepartureList(false);
                        setSearchDeparture('');
                      }}
                    >
                      <div className="city-name">{city.name}</div>
                      <div className="city-code">{city.code}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <button className="swap-btn" onClick={handleSwapCities}>
            ⇄
          </button>

          <div className="city-input-wrapper">
            <div
              className="city-input"
              onClick={() => setShowArrivalList(!showArrivalList)}
            >
              <div className="city-label">目的地</div>
              <div className="city-value">{getArrivalCity()?.name}</div>
            </div>
            {showArrivalList && (
              <div className="city-dropdown">
                <input
                  type="text"
                  placeholder="搜索城市..."
                  value={searchArrival}
                  onChange={(e) => setSearchArrival(e.target.value)}
                  className="city-search"
                />
                <div className="city-list">
                  {filteredArrivalCities.map(city => (
                    <div
                      key={city.code}
                      className="city-item"
                      onClick={() => {
                        setArrival(city.code);
                        setShowArrivalList(false);
                        setSearchArrival('');
                      }}
                    >
                      <div className="city-name">{city.name}</div>
                      <div className="city-code">{city.code}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Date Selection */}
        <div className="date-selection">
          <div className="date-input-wrapper">
            <label>出发日期</label>
            <input
              type="date"
              value={departDate}
              onChange={(e) => setDepartDate(e.target.value)}
              className="date-input"
            />
          </div>

          {tripType === 'roundtrip' && (
            <div className="date-input-wrapper">
              <label>返回日期</label>
              <input
                type="date"
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
                className="date-input"
              />
            </div>
          )}
        </div>

        {/* Passenger Selection */}
        <div className="passenger-selection">
          <label>乘客数量</label>
          <div className="passenger-control">
            <button
              onClick={() => setPassengers(Math.max(1, passengers - 1))}
              className="passenger-btn"
            >
              −
            </button>
            <span className="passenger-count">{passengers}</span>
            <button
              onClick={() => setPassengers(Math.min(9, passengers + 1))}
              className="passenger-btn"
            >
              +
            </button>
          </div>
        </div>

        {/* Search Button */}
        <button className="search-btn" onClick={handleSearch}>
          搜索机票
        </button>
      </div>

      {/* Popular Routes */}
      <div className="popular-routes">
        <h3>热门路线</h3>
        <div className="routes-grid">
          {POPULAR_ROUTES.map((route, idx) => {
            const fromCity = CITIES.find(c => c.code === route.from);
            const toCity = CITIES.find(c => c.code === route.to);
            return (
              <div
                key={idx}
                className="route-card"
                onClick={() => {
                  setDeparture(route.from);
                  setArrival(route.to);
                  setTripType('oneway');
                }}
              >
                <div className="route-info">
                  <div className="route-cities">
                    {fromCity?.name} → {toCity?.name}
                  </div>
                  <div className="route-price">¥{route.price} 起</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
