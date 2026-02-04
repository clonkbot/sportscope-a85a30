import { useState, useMemo } from 'react';
import './styles.css';

interface SportEvent {
  id: string;
  sport: string;
  event: string;
  date: string;
  time: string;
  location: string;
  country: string;
  venue: string;
  month: string;
}

const sportsData: SportEvent[] = [
  // Football/Soccer
  { id: '1', sport: 'Football', event: 'UEFA Champions League Final', date: '2025-05-31', time: '20:00', location: 'Munich', country: 'Germany', venue: 'Allianz Arena', month: 'May' },
  { id: '2', sport: 'Football', event: 'FA Cup Final', date: '2025-05-17', time: '15:00', location: 'London', country: 'United Kingdom', venue: 'Wembley Stadium', month: 'May' },
  { id: '3', sport: 'Football', event: 'Copa America Final', date: '2025-07-14', time: '19:00', location: 'Miami', country: 'United States', venue: 'Hard Rock Stadium', month: 'July' },
  { id: '4', sport: 'Football', event: 'Serie A Derby della Madonnina', date: '2025-02-02', time: '20:45', location: 'Milan', country: 'Italy', venue: 'San Siro', month: 'February' },
  { id: '5', sport: 'Football', event: 'El Clasico', date: '2025-03-23', time: '21:00', location: 'Madrid', country: 'Spain', venue: 'Santiago Bernabeu', month: 'March' },

  // Tennis
  { id: '6', sport: 'Tennis', event: 'Australian Open Final', date: '2025-01-26', time: '19:30', location: 'Melbourne', country: 'Australia', venue: 'Rod Laver Arena', month: 'January' },
  { id: '7', sport: 'Tennis', event: 'French Open Final', date: '2025-06-08', time: '15:00', location: 'Paris', country: 'France', venue: 'Roland Garros', month: 'June' },
  { id: '8', sport: 'Tennis', event: 'Wimbledon Final', date: '2025-07-13', time: '14:00', location: 'London', country: 'United Kingdom', venue: 'Centre Court', month: 'July' },
  { id: '9', sport: 'Tennis', event: 'US Open Final', date: '2025-09-07', time: '16:00', location: 'New York', country: 'United States', venue: 'Arthur Ashe Stadium', month: 'September' },

  // Basketball
  { id: '10', sport: 'Basketball', event: 'NBA Finals Game 1', date: '2025-06-05', time: '20:30', location: 'Boston', country: 'United States', venue: 'TD Garden', month: 'June' },
  { id: '11', sport: 'Basketball', event: 'EuroLeague Final Four', date: '2025-05-23', time: '21:00', location: 'Abu Dhabi', country: 'UAE', venue: 'Etihad Arena', month: 'May' },
  { id: '12', sport: 'Basketball', event: 'NBA All-Star Game', date: '2025-02-16', time: '20:00', location: 'San Francisco', country: 'United States', venue: 'Chase Center', month: 'February' },

  // Formula 1
  { id: '13', sport: 'Formula 1', event: 'Monaco Grand Prix', date: '2025-05-25', time: '15:00', location: 'Monte Carlo', country: 'Monaco', venue: 'Circuit de Monaco', month: 'May' },
  { id: '14', sport: 'Formula 1', event: 'British Grand Prix', date: '2025-07-06', time: '15:00', location: 'Silverstone', country: 'United Kingdom', venue: 'Silverstone Circuit', month: 'July' },
  { id: '15', sport: 'Formula 1', event: 'Italian Grand Prix', date: '2025-09-07', time: '15:00', location: 'Monza', country: 'Italy', venue: 'Autodromo Nazionale Monza', month: 'September' },
  { id: '16', sport: 'Formula 1', event: 'Abu Dhabi Grand Prix', date: '2025-12-07', time: '17:00', location: 'Abu Dhabi', country: 'UAE', venue: 'Yas Marina Circuit', month: 'December' },

  // Golf
  { id: '17', sport: 'Golf', event: 'The Masters', date: '2025-04-13', time: '14:00', location: 'Augusta', country: 'United States', venue: 'Augusta National', month: 'April' },
  { id: '18', sport: 'Golf', event: 'The Open Championship', date: '2025-07-20', time: '12:00', location: 'Royal Portrush', country: 'United Kingdom', venue: 'Royal Portrush Golf Club', month: 'July' },
  { id: '19', sport: 'Golf', event: 'US Open', date: '2025-06-15', time: '13:00', location: 'Oakmont', country: 'United States', venue: 'Oakmont Country Club', month: 'June' },

  // Boxing
  { id: '20', sport: 'Boxing', event: 'Heavyweight Championship', date: '2025-03-08', time: '22:00', location: 'Las Vegas', country: 'United States', venue: 'T-Mobile Arena', month: 'March' },
  { id: '21', sport: 'Boxing', event: 'Middleweight Title Fight', date: '2025-05-03', time: '21:00', location: 'London', country: 'United Kingdom', venue: 'O2 Arena', month: 'May' },

  // Rugby
  { id: '22', sport: 'Rugby', event: 'Six Nations Final', date: '2025-03-15', time: '17:00', location: 'Dublin', country: 'Ireland', venue: 'Aviva Stadium', month: 'March' },
  { id: '23', sport: 'Rugby', event: 'Rugby World Cup Final', date: '2025-11-15', time: '18:00', location: 'Sydney', country: 'Australia', venue: 'Stadium Australia', month: 'November' },

  // Cricket
  { id: '24', sport: 'Cricket', event: 'IPL Final', date: '2025-05-26', time: '19:30', location: 'Mumbai', country: 'India', venue: 'Wankhede Stadium', month: 'May' },
  { id: '25', sport: 'Cricket', event: 'The Ashes Test 1', date: '2025-11-21', time: '10:30', location: 'Brisbane', country: 'Australia', venue: 'The Gabba', month: 'November' },

  // MMA
  { id: '26', sport: 'MMA', event: 'UFC 300', date: '2025-04-12', time: '22:00', location: 'Las Vegas', country: 'United States', venue: 'T-Mobile Arena', month: 'April' },
  { id: '27', sport: 'MMA', event: 'UFC Fight Night London', date: '2025-03-22', time: '20:00', location: 'London', country: 'United Kingdom', venue: 'O2 Arena', month: 'March' },

  // Baseball
  { id: '28', sport: 'Baseball', event: 'World Series Game 1', date: '2025-10-24', time: '20:00', location: 'New York', country: 'United States', venue: 'Yankee Stadium', month: 'October' },
  { id: '29', sport: 'Baseball', event: 'MLB All-Star Game', date: '2025-07-15', time: '19:00', location: 'Atlanta', country: 'United States', venue: 'Truist Park', month: 'July' },

  // Cycling
  { id: '30', sport: 'Cycling', event: 'Tour de France Final Stage', date: '2025-07-27', time: '16:00', location: 'Paris', country: 'France', venue: 'Champs-Elysees', month: 'July' },
];

const sports = ['All', 'Football', 'Tennis', 'Basketball', 'Formula 1', 'Golf', 'Boxing', 'Rugby', 'Cricket', 'MMA', 'Baseball', 'Cycling'];
const months = ['All', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const countries = ['All', ...Array.from(new Set(sportsData.map(e => e.country))).sort()];

const sportIcons: Record<string, string> = {
  'Football': '\u26BD',
  'Tennis': '\uD83C\uDFBE',
  'Basketball': '\uD83C\uDFC0',
  'Formula 1': '\uD83C\uDFCE\uFE0F',
  'Golf': '\u26F3',
  'Boxing': '\uD83E\uDD4A',
  'Rugby': '\uD83C\uDFC9',
  'Cricket': '\uD83C\uDFCF',
  'MMA': '\uD83E\uDD4B',
  'Baseball': '\u26BE',
  'Cycling': '\uD83D\uDEB4',
};

function App() {
  const [selectedSport, setSelectedSport] = useState('All');
  const [selectedMonth, setSelectedMonth] = useState('All');
  const [selectedCountry, setSelectedCountry] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredEvents = useMemo(() => {
    return sportsData.filter(event => {
      const matchesSport = selectedSport === 'All' || event.sport === selectedSport;
      const matchesMonth = selectedMonth === 'All' || event.month === selectedMonth;
      const matchesCountry = selectedCountry === 'All' || event.country === selectedCountry;
      const matchesSearch = searchQuery === '' ||
        event.event.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.venue.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.location.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesSport && matchesMonth && matchesCountry && matchesSearch;
    }).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [selectedSport, selectedMonth, selectedCountry, searchQuery]);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  return (
    <div className="app">
      <div className="grain-overlay"></div>

      <header className="header">
        <div className="header-deco header-deco-left"></div>
        <div className="header-deco header-deco-right"></div>
        <div className="header-content">
          <div className="logo-section">
            <div className="logo-icon">
              <span className="logo-diamond"></span>
            </div>
            <h1 className="logo-text">SPORTSCOPE</h1>
            <p className="tagline">The World&apos;s Premier Sports Calendar</p>
          </div>
          <div className="header-line"></div>
        </div>
      </header>

      <main className="main">
        <section className="filters-section">
          <div className="filters-header">
            <span className="filters-label">REFINE SELECTION</span>
            <div className="filters-line"></div>
          </div>

          <div className="filters-grid">
            <div className="filter-group">
              <label className="filter-label">DISCIPLINE</label>
              <select
                value={selectedSport}
                onChange={(e) => setSelectedSport(e.target.value)}
                className="filter-select"
              >
                {sports.map(sport => (
                  <option key={sport} value={sport}>{sport}</option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label className="filter-label">PERIOD</label>
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="filter-select"
              >
                {months.map(month => (
                  <option key={month} value={month}>{month}</option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label className="filter-label">NATION</label>
              <select
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                className="filter-select"
              >
                {countries.map(country => (
                  <option key={country} value={country}>{country}</option>
                ))}
              </select>
            </div>

            <div className="filter-group filter-group-search">
              <label className="filter-label">SEARCH</label>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Event, venue, city..."
                className="filter-input"
              />
            </div>
          </div>
        </section>

        <section className="events-section">
          <div className="events-header">
            <h2 className="events-title">UPCOMING FIXTURES</h2>
            <span className="events-count">{filteredEvents.length} Events</span>
          </div>

          {filteredEvents.length === 0 ? (
            <div className="no-events">
              <div className="no-events-icon">
                <span className="no-events-diamond"></span>
              </div>
              <p>No events match your criteria</p>
              <span className="no-events-hint">Try adjusting your filters</span>
            </div>
          ) : (
            <div className="events-grid">
              {filteredEvents.map((event, index) => (
                <article
                  key={event.id}
                  className="event-card"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className="event-card-corner event-card-corner-tl"></div>
                  <div className="event-card-corner event-card-corner-tr"></div>
                  <div className="event-card-corner event-card-corner-bl"></div>
                  <div className="event-card-corner event-card-corner-br"></div>

                  <div className="event-sport-badge">
                    <span className="event-sport-icon">{sportIcons[event.sport]}</span>
                    <span className="event-sport-name">{event.sport}</span>
                  </div>

                  <h3 className="event-title">{event.event}</h3>

                  <div className="event-details">
                    <div className="event-detail">
                      <span className="detail-label">DATE</span>
                      <span className="detail-value">{formatDate(event.date)}</span>
                    </div>
                    <div className="event-detail">
                      <span className="detail-label">TIME</span>
                      <span className="detail-value">{event.time}</span>
                    </div>
                  </div>

                  <div className="event-location">
                    <div className="location-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                        <circle cx="12" cy="10" r="3"/>
                      </svg>
                    </div>
                    <div className="location-text">
                      <span className="location-venue">{event.venue}</span>
                      <span className="location-place">{event.location}, {event.country}</span>
                    </div>
                  </div>

                  <div className="event-card-line"></div>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>

      <footer className="footer">
        <div className="footer-line"></div>
        <div className="footer-content">
          <span className="footer-text">Requested by @jinchurikifx &middot; Built by @clonkbot</span>
        </div>
      </footer>
    </div>
  );
}

export default App;
