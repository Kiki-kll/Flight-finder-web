import type { Flight } from '../App';
import '../styles/DetailsPage.css';

interface DetailsPageProps {
  flight: Flight;
  onBack: () => void;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

export default function DetailsPage({
  flight,
  onBack,
  isFavorite,
  onToggleFavorite,
}: DetailsPageProps) {
  const cheapestPlatform = flight.platforms.reduce((prev, current) =>
    prev.price < current.price ? prev : current
  );

  return (
    <div className="details-page">
      <div className="details-header">
        <button className="back-btn" onClick={onBack}>
          ← 返回
        </button>
        <button
          className={`favorite-btn ${isFavorite ? 'active' : ''}`}
          onClick={onToggleFavorite}
        >
          {isFavorite ? '❤️ 已收藏' : '🤍 收藏'}
        </button>
      </div>

      {/* Flight Info */}
      <div className="flight-info-card">
        <div className="airline-header">
          <h2>{flight.airline}</h2>
          <p>{flight.flightNumber}</p>
        </div>

        <div className="flight-timeline">
          <div className="timeline-item">
            <div className="time-large">{flight.departure.time}</div>
            <div className="airport-code">{flight.departure.airport}</div>
            <div className="airport-name">出发地</div>
          </div>

          <div className="timeline-divider">
            <div className="line"></div>
            <div className="duration">{flight.duration}</div>
          </div>

          <div className="timeline-item">
            <div className="time-large">{flight.arrival.time}</div>
            <div className="airport-code">{flight.arrival.airport}</div>
            <div className="airport-name">目的地</div>
          </div>
        </div>

        <div className="flight-details">
          <div className="detail-row">
            <span className="label">舱位类型</span>
            <span className="value">经济舱</span>
          </div>
          <div className="detail-row">
            <span className="label">行李额度</span>
            <span className="value">20kg</span>
          </div>
          <div className="detail-row">
            <span className="label">飞行时长</span>
            <span className="value">{flight.duration}</span>
          </div>
        </div>
      </div>

      {/* Price Comparison */}
      <div className="price-comparison">
        <h3>价格对比</h3>
        <div className="price-table">
          {flight.platforms.map((platform, idx) => (
            <div
              key={idx}
              className={`price-row ${
                platform.price === cheapestPlatform.price ? 'cheapest' : ''
              }`}
            >
              <div className="platform-name">{platform.name}</div>
              <div className="price-info">
                <div className="price">¥{platform.price}</div>
                {platform.price === cheapestPlatform.price && (
                  <span className="badge">最便宜</span>
                )}
              </div>
              <a
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                className="view-btn"
              >
                查看
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Purchase Button */}
      <div className="purchase-section">
        <a
          href={cheapestPlatform.url}
          target="_blank"
          rel="noopener noreferrer"
          className="purchase-btn"
        >
          在 {cheapestPlatform.name} 购买 (¥{cheapestPlatform.price})
        </a>
      </div>

      {/* Important Info */}
      <div className="important-info">
        <h4>重要提示</h4>
        <ul>
          <li>价格信息仅供参考，实际价格以航空公司官网为准</li>
          <li>点击"查看"按钮会跳转到相应平台，请谨慎核实价格</li>
          <li>建议提前预订以获得更优惠的价格</li>
          <li>不同平台可能有不同的退改规则，购买前请仔细阅读</li>
        </ul>
      </div>
    </div>
  );
}
