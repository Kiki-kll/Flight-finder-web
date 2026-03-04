import { useState } from 'react';
import './App.css';
import SearchPage from './pages/SearchPage';
import ResultsPage from './pages/ResultsPage';
import DetailsPage from './pages/DetailsPage';
import FavoritesPage from './pages/FavoritesPage';

export interface Flight {
  id: string;
  airline: string;
  flightNumber: string;
  departure: {
    time: string;
    airport: string;
    city: string;
  };
  arrival: {
    time: string;
    airport: string;
    city: string;
  };
  duration: string;
  price: number;
  platforms: Array<{
    name: string;
    price: number;
    url: string;
  }>;
}

export interface SearchParams {
  departure: string;
  arrival: string;
  departDate: string;
  returnDate?: string;
  passengers: number;
  tripType: 'oneway' | 'roundtrip';
}

type Page = 'search' | 'results' | 'details' | 'favorites';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('search');
  const [searchParams, setSearchParams] = useState<SearchParams | null>(null);
  const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null);
  const [favorites, setFavorites] = useState<Flight[]>(() => {
    const saved = localStorage.getItem('favorites');
    return saved ? JSON.parse(saved) : [];
  });

  const handleSearch = (params: SearchParams) => {
    setSearchParams(params);
    setCurrentPage('results');
  };

  const handleSelectFlight = (flight: Flight) => {
    setSelectedFlight(flight);
    setCurrentPage('details');
  };

  const handleAddFavorite = (flight: Flight) => {
    const exists = favorites.some(f => f.id === flight.id);
    let updated: Flight[];
    if (exists) {
      updated = favorites.filter(f => f.id !== flight.id);
    } else {
      updated = [...favorites, flight];
    }
    setFavorites(updated);
    localStorage.setItem('favorites', JSON.stringify(updated));
  };

  const isFavorite = (flightId: string) => {
    return favorites.some(f => f.id === flightId);
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <h1>✈️ Flight Finder</h1>
          <p>查询各大平台，找到最便宜的机票</p>
        </div>
        <nav className="nav-tabs">
          <button
            className={`nav-tab ${currentPage === 'search' ? 'active' : ''}`}
            onClick={() => setCurrentPage('search')}
          >
            搜索
          </button>
          <button
            className={`nav-tab ${currentPage === 'favorites' ? 'active' : ''}`}
            onClick={() => setCurrentPage('favorites')}
          >
            收藏 ({favorites.length})
          </button>
        </nav>
      </header>

      <main className="app-main">
        {currentPage === 'search' && (
          <SearchPage onSearch={handleSearch} />
        )}
        {currentPage === 'results' && searchParams && (
          <ResultsPage
            searchParams={searchParams}
            onSelectFlight={handleSelectFlight}
            onBack={() => setCurrentPage('search')}
            favorites={favorites}
            onToggleFavorite={handleAddFavorite}
          />
        )}
        {currentPage === 'details' && selectedFlight && (
          <DetailsPage
            flight={selectedFlight}
            onBack={() => setCurrentPage('results')}
            isFavorite={isFavorite(selectedFlight.id)}
            onToggleFavorite={() => handleAddFavorite(selectedFlight)}
          />
        )}
        {currentPage === 'favorites' && (
          <FavoritesPage
            favorites={favorites}
            onSelectFlight={handleSelectFlight}
            onRemoveFavorite={(id) => {
              const updated = favorites.filter(f => f.id !== id);
              setFavorites(updated);
              localStorage.setItem('favorites', JSON.stringify(updated));
            }}
            onViewDetails={(flight) => {
              setSelectedFlight(flight);
              setCurrentPage('details');
            }}
          />
        )}
      </main>
    </div>
  );
}

export default App;
