import { useState } from 'react';
import SunFilter from './SunFilter';
import './Header.css';

function Header({
  selectedDate,
  onDateChange,
  selectedHour,
  onHourChange,
  sunPosition,
  weatherInfo,
  onSearch,
  sunFilters,
  onFiltersChange,
  terraceCounts
}) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    onSearch(value);
  };

  const formatHour = (hour) => {
    const h = Math.floor(hour);
    const m = Math.round((hour - h) * 60);
    return m > 0 ? `${h}h${String(m).padStart(2, '0')}` : `${h}h`;
  };

  return (
    <header className="header">
      <div className="logo">
        <svg viewBox="0 0 32 32" fill="none" width="32" height="32">
          {/* Martini glass */}
          <polygon points="6,4 26,4 16,18" fill="#A8D8F0" stroke="#5BAED6" strokeWidth="1.2" strokeLinejoin="round"/>
          <line x1="16" y1="18" x2="16" y2="27" stroke="#5BAED6" strokeWidth="1.8" strokeLinecap="round"/>
          <line x1="11" y1="27" x2="21" y2="27" stroke="#5BAED6" strokeWidth="2" strokeLinecap="round"/>
          {/* Olive */}
          <circle cx="16" cy="10" r="2.2" fill="#7CB87A" stroke="#4A8A48" strokeWidth="0.8"/>
          <circle cx="16" cy="10" r="0.8" fill="#D44"/>
          {/* Cocktail stick */}
          <line x1="10" y1="6" x2="22" y2="14" stroke="#C8A050" strokeWidth="1" strokeLinecap="round"/>
        </svg>
        <h1>Un verre au soleil ?</h1>
      </div>

      <div className="search-wrap">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8"/>
          <line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
        <input
          type="text"
          placeholder="Rechercher une terrasse, rue, quartier..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>

      {weatherInfo && (
        <div className="weather-indicator">
          <span className="weather-icon">{weatherInfo.icon}</span>
          <span className="weather-label">{weatherInfo.label} · {Math.round(weatherInfo.temperature)}°C</span>
        </div>
      )}

      <div className="time-controls">
        <input
          type="date"
          className="date-input"
          value={selectedDate}
          onChange={(e) => onDateChange(e.target.value)}
        />

        <div className="hour-control">
          <input
            type="range"
            className="hour-slider"
            min="6"
            max="22"
            step="0.25"
            value={selectedHour}
            onChange={(e) => onHourChange(parseFloat(e.target.value))}
          />
          <div className="hour-display">{formatHour(selectedHour)}</div>
        </div>

        <SunFilter
          activeFilters={sunFilters}
          onChange={onFiltersChange}
          terraceCounts={terraceCounts}
          compact={true}
        />
      </div>
    </header>
  );
}

export default Header;
