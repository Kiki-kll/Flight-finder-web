import type { Flight } from '../App';
import '../styles/FavoritesPage.css';

interface FavoritesPageProps {
  favorites: Flight[];
  onSelectFlight: (flight: Flight) => void;
  onRemoveFavorite: (id: string) => void;
  onViewDetails: (flight: Flight) => void;
}

export default function FavoritesPage({
  favorites,
  
  onRemoveFavorite,
  onViewDetails,
}: FavoritesPageProps) {
  if (favorites.length === 0) {
    return (
      <div className="favorites-page">
        <div className="empty-state">
          <div className="empty-icon">🎫</div>
          <h2>还没有收藏任何机票</h2>
          <p>搜索机票时点击❤️按钮，将便宜的航班保存到这里</p>
        </div>
      </div>
    );
  }

  return (
    <div className="favorites-page">
      <div className="favorites-header">
        <h2>我的收藏</h2>
        <p>{favorites.length} 个已保存的机票</p>
      </div>

      <div className="favorites-list">
        {favorites.map(flight => {
          const cheapestPrice = Math.min(...flight.platforms.map(p => p.price));
          const currentPrice = flight.price;
          const priceChange = cheapestPrice - currentPrice;
          const isPriceDown = priceChange < 0;

          return (
            <div
              key={flight.id}
              className="favorite-card"
              onClick={() => onViewDetails(flight)}
            >
              <div className="card-header">
                <div className="airline-info">
                  <h3>{flight.airline}</h3>
                  <p>{flight.flightNumber}</p>
                </div>
                <button
                  className="remove-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemoveFavorite(flight.id);
                  }}
                >
                  ✕
                </button>
              </div>

              <div className="card-times">
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

              <div className="card-footer">
                <div className="price-info">
                  <div className="label">保存时价格</div>
                  <div className="price">¥{currentPrice}</div>
                </div>

                {priceChange !== 0 && (
                  <div className={`price-change ${isPriceDown ? 'down' : 'up'}`}>
                    <div className="label">当前价格</div>
                    <div className="price">¥{cheapestPrice}</div>
                    <div className="change">
                      {isPriceDown ? '↓' : '↑'} ¥{Math.abs(priceChange)}
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
