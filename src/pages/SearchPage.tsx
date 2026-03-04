import { useState } from 'react';
import type { SearchParams } from '../App';
import '../styles/SearchPage.css';

const CITIES = [
  // 国内主要城市
  { code: 'BJS', name: '北京', pinyin: 'beijing', region: '华北' },
  { code: 'SHA', name: '上海', pinyin: 'shanghai', region: '华东' },
  { code: 'CAN', name: '广州', pinyin: 'guangzhou', region: '华南' },
  { code: 'SZX', name: '深圳', pinyin: 'shenzhen', region: '华南' },
  { code: 'CTU', name: '成都', pinyin: 'chengdu', region: '西南' },
  { code: 'CKG', name: '重庆', pinyin: 'chongqing', region: '西南' },
  { code: 'XIY', name: '西安', pinyin: 'xian', region: '西北' },
  { code: 'PVG', name: '浦东', pinyin: 'pudong', region: '华东' },
  { code: 'NKG', name: '南京', pinyin: 'nanjing', region: '华东' },
  { code: 'HGH', name: '杭州', pinyin: 'hangzhou', region: '华东' },
  { code: 'WUH', name: '武汉', pinyin: 'wuhan', region: '华中' },
  { code: 'CIQ', name: '长沙', pinyin: 'changsha', region: '华中' },
  { code: 'ZUH', name: '郑州', pinyin: 'zhengzhou', region: '华中' },
  { code: 'NGB', name: '宁波', pinyin: 'ningbo', region: '华东' },
  { code: 'KMG', name: '昆明', pinyin: 'kunming', region: '西南' },
  { code: 'NNG', name: '南宁', pinyin: 'nanning', region: '华南' },
  { code: 'FOE', name: '佛山', pinyin: 'foshan', region: '华南' },
  { code: 'CGQ', name: '长春', pinyin: 'changchun', region: '东北' },
  { code: 'SHE', name: '沈阳', pinyin: 'shenyang', region: '东北' },
  { code: 'HRB', name: '哈尔滨', pinyin: 'harbin', region: '东北' },
  { code: 'TYN', name: '太原', pinyin: 'taiyuan', region: '华北' },
  { code: 'KHH', name: '南昌', pinyin: 'nanchang', region: '华中' },
  { code: 'FUO', name: '福州', pinyin: 'fuzhou', region: '华东' },
  { code: 'XMN', name: '厦门', pinyin: 'xiamen', region: '华东' },
  { code: 'WNZ', name: '温州', pinyin: 'wenzhou', region: '华东' },

  { code: 'URC', name: '乌鲁木齐', pinyin: 'wulumuqi', region: '西北' },
  { code: 'LZH', name: '兰州', pinyin: 'lanzhou', region: '西北' },
  { code: 'XIH', name: '西宁', pinyin: 'xining', region: '西北' },
  { code: 'KMG', name: '昆明', pinyin: 'kunming', region: '西南' },
  { code: 'LJG', name: '丽江', pinyin: 'lijiang', region: '西南' },
  { code: 'DLC', name: '大连', pinyin: 'dalian', region: '东北' },
  { code: 'TAO', name: '青岛', pinyin: 'qingdao', region: '华东' },
  { code: 'WXH', name: '无锡', pinyin: 'wuxi', region: '华东' },
  { code: 'SJW', name: '苏州', pinyin: 'suzhou', region: '华东' },
  { code: 'HFE', name: '合肥', pinyin: 'hefei', region: '华中' },
  
  // 国际城市 - 亚洲
  { code: 'HKG', name: '香港', pinyin: 'hongkong', region: '国际' },
  { code: 'MFM', name: '澳门', pinyin: 'macau', region: '国际' },
  { code: 'TPE', name: '台北', pinyin: 'taipei', region: '国际' },
  { code: 'BKK', name: '曼谷', pinyin: 'bangkok', region: '国际' },
  { code: 'SIN', name: '新加坡', pinyin: 'singapore', region: '国际' },
  { code: 'KUL', name: '吉隆坡', pinyin: 'kualalumpur', region: '国际' },
  { code: 'NRT', name: '东京', pinyin: 'tokyo', region: '国际' },
  { code: 'KIX', name: '大阪', pinyin: 'osaka', region: '国际' },
  { code: 'ICN', name: '首尔', pinyin: 'seoul', region: '国际' },
  { code: 'HAN', name: '河内', pinyin: 'hanoi', region: '国际' },
  { code: 'SGN', name: '胡志明市', pinyin: 'hochiminh', region: '国际' },
  { code: 'MNL', name: '马尼拉', pinyin: 'manila', region: '国际' },
  { code: 'CGK', name: '雅加达', pinyin: 'jakarta', region: '国际' },
  { code: 'DPS', name: '巴厘岛', pinyin: 'bali', region: '国际' },
  { code: 'BOM', name: '孟买', pinyin: 'mumbai', region: '国际' },
  { code: 'DEL', name: '新德里', pinyin: 'newdelhi', region: '国际' },
  { code: 'PNH', name: '金边', pinyin: 'phnom penh', region: '国际' },
  
  // 国际城市 - 欧洲
  { code: 'LHR', name: '伦敦', pinyin: 'london', region: '国际' },
  { code: 'CDG', name: '巴黎', pinyin: 'paris', region: '国际' },
  { code: 'FRA', name: '法兰克福', pinyin: 'frankfurt', region: '国际' },
  { code: 'AMS', name: '阿姆斯特丹', pinyin: 'amsterdam', region: '国际' },
  { code: 'ZRH', name: '苏黎世', pinyin: 'zurich', region: '国际' },
  { code: 'FCO', name: '罗马', pinyin: 'rome', region: '国际' },
  { code: 'MXP', name: '米兰', pinyin: 'milan', region: '国际' },
  { code: 'VCE', name: '威尼斯', pinyin: 'venice', region: '国际' },
  { code: 'MAD', name: '马德里', pinyin: 'madrid', region: '国际' },
  { code: 'BCN', name: '巴塞罗那', pinyin: 'barcelona', region: '国际' },
  { code: 'AGP', name: '马拉加', pinyin: 'malaga', region: '国际' },
  { code: 'DUB', name: '都柏林', pinyin: 'dublin', region: '国际' },
  { code: 'BRU', name: '布鲁塞尔', pinyin: 'brussels', region: '国际' },
  { code: 'VIE', name: '维也纳', pinyin: 'vienna', region: '国际' },
  { code: 'PRG', name: '布拉格', pinyin: 'prague', region: '国际' },
  { code: 'BUD', name: '布达佩斯', pinyin: 'budapest', region: '国际' },
  { code: 'WAW', name: '华沙', pinyin: 'warsaw', region: '国际' },
  { code: 'IST', name: '伊斯坦布尔', pinyin: 'istanbul', region: '国际' },
  { code: 'ATH', name: '雅典', pinyin: 'athens', region: '国际' },
  
  // 国际城市 - 北美
  { code: 'JFK', name: '纽约', pinyin: 'newyork', region: '国际' },
  { code: 'LAX', name: '洛杉矶', pinyin: 'losangeles', region: '国际' },
  { code: 'ORD', name: '芝加哥', pinyin: 'chicago', region: '国际' },
  { code: 'DFW', name: '达拉斯', pinyin: 'dallas', region: '国际' },
  { code: 'DEN', name: '丹佛', pinyin: 'denver', region: '国际' },
  { code: 'SFO', name: '旧金山', pinyin: 'sanfrancisco', region: '国际' },
  { code: 'SEA', name: '西雅图', pinyin: 'seattle', region: '国际' },
  { code: 'YVR', name: '温哥华', pinyin: 'vancouver', region: '国际' },
  { code: 'YYZ', name: '多伦多', pinyin: 'toronto', region: '国际' },
  { code: 'MEX', name: '墨西哥城', pinyin: 'mexicocity', region: '国际' },
  
  // 国际城市 - 大洋洲
  { code: 'SYD', name: '悉尼', pinyin: 'sydney', region: '国际' },
  { code: 'MEL', name: '墨尔本', pinyin: 'melbourne', region: '国际' },
  { code: 'BNE', name: '布里斯班', pinyin: 'brisbane', region: '国际' },
  { code: 'AKL', name: '奥克兰', pinyin: 'auckland', region: '国际' },
];

const POPULAR_ROUTES = [
  { from: 'BJS', to: 'SHA', price: 299 },
  { from: 'SHA', to: 'CAN', price: 349 },
  { from: 'BJS', to: 'CAN', price: 399 },
  { from: 'CTU', to: 'SHA', price: 279 },
  { from: 'CKG', to: 'BJS', price: 329 },
  { from: 'CGQ', to: 'BJS', price: 459 },
  { from: 'NRT', to: 'CGQ', price: 1299 },
  { from: 'NRT', to: 'SHA', price: 899 },
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
    city.name.toLowerCase().includes(searchDeparture.toLowerCase()) ||
    city.pinyin.toLowerCase().includes(searchDeparture.toLowerCase()) ||
    city.code.toLowerCase().includes(searchDeparture.toLowerCase())
  );

  const filteredArrivalCities = CITIES.filter(city =>
    city.name.toLowerCase().includes(searchArrival.toLowerCase()) ||
    city.pinyin.toLowerCase().includes(searchArrival.toLowerCase()) ||
    city.code.toLowerCase().includes(searchArrival.toLowerCase())
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
                  {filteredDepartureCities.length > 0 ? (
                    filteredDepartureCities.map(city => (
                      <div
                        key={city.code}
                        className="city-item"
                        onClick={() => {
                          setDeparture(city.code);
                          setShowDepartureList(false);
                          setSearchDeparture('');
                        }}
                      >
                        <div className="city-info">
                          <div className="city-name">{city.name}</div>
                          <div className="city-region">{city.region}</div>
                        </div>
                        <div className="city-code">{city.code}</div>
                      </div>
                    ))
                  ) : (
                    <div className="city-item no-result">
                      <div className="city-name">未找到城市</div>
                    </div>
                  )}
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
                  {filteredArrivalCities.length > 0 ? (
                    filteredArrivalCities.map(city => (
                      <div
                        key={city.code}
                        className="city-item"
                        onClick={() => {
                          setArrival(city.code);
                          setShowArrivalList(false);
                          setSearchArrival('');
                        }}
                      >
                        <div className="city-info">
                          <div className="city-name">{city.name}</div>
                          <div className="city-region">{city.region}</div>
                        </div>
                        <div className="city-code">{city.code}</div>
                      </div>
                    ))
                  ) : (
                    <div className="city-item no-result">
                      <div className="city-name">未找到城市</div>
                    </div>
                  )}
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
