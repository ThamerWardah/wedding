'use client'
import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [rsvps, setRsvps] = useState([]);
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRsvp, setSelectedRsvp] = useState(null);

  const ADMIN_PASSWORD = 'wedding2025';

  const loadRSVPs = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/rsvp');
      if (response.ok) {
        const data = await response.json();
        setRsvps(data);
      } else {
        console.error('Failed to load RSVPs');
      }
    } catch (error) {
      console.error('Error loading RSVPs:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!isAuthenticated) return;

    loadRSVPs();

    // Refresh every 10 seconds
    const interval = setInterval(loadRSVPs, 10000);
    return () => clearInterval(interval);
  }, [isAuthenticated]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
    } else {
      alert('Incorrect password');
    }
  };

  const filteredRsvps = rsvps.filter(rsvp => {
    if (activeTab === 'all') return true;
    return rsvp.attending === activeTab;
  });

  const totalGuests = rsvps
    .filter(rsvp => rsvp.attending === 'yes')
    .reduce((sum, rsvp) => sum + rsvp.guests, 0);

  const totalYes = rsvps.filter(rsvp => rsvp.attending === 'yes').length;
  const totalNo = rsvps.filter(rsvp => rsvp.attending === 'no').length;

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-6 max-w-md w-full">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-2xl">👑</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Admin Access</h1>
            <p className="text-gray-600 text-sm">Enter password to view RSVPs</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center"
              required
            />
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
            >
              Access Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-3">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-4 mb-4">
          <div className="flex flex-col space-y-4">
            <div className="text-center md:text-left">
              <h1 className="text-xl font-bold text-gray-800 mb-1">Wedding RSVP Dashboard</h1>
              <p className="text-gray-600 text-sm">Real-time guest responses</p>
              <p className="text-xs text-green-600 mt-1">
                ✅ Live Data - All responses stored centrally
              </p>
            </div>
            
            {/* Stats Cards */}
            <div className="grid grid-cols-3 gap-2">
              <div className="bg-green-50 rounded-lg p-3 text-center">
                <div className="text-lg font-bold text-green-600">{totalYes}</div>
                <div className="text-xs text-gray-600">Attending</div>
              </div>
              <div className="bg-red-50 rounded-lg p-3 text-center">
                <div className="text-lg font-bold text-red-600">{totalNo}</div>
                <div className="text-xs text-gray-600">Not Coming</div>
              </div>
              <div className="bg-blue-50 rounded-lg p-3 text-center">
                <div className="text-lg font-bold text-blue-600">{totalGuests}</div>
                <div className="text-xs text-gray-600">Total Guests</div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs - Mobile Friendly */}
        <div className="bg-white rounded-xl shadow-lg p-3 mb-4">
          <div className="flex space-x-1 overflow-x-auto pb-1">
            <button
              onClick={() => setActiveTab('all')}
              className={`flex-shrink-0 px-3 py-2 rounded-lg font-medium text-sm transition-colors ${
                activeTab === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:text-gray-800 bg-gray-100'
              }`}
            >
              All ({rsvps.length})
            </button>
            <button
              onClick={() => setActiveTab('yes')}
              className={`flex-shrink-0 px-3 py-2 rounded-lg font-medium text-sm transition-colors ${
                activeTab === 'yes'
                  ? 'bg-green-600 text-white'
                  : 'text-gray-600 hover:text-gray-800 bg-gray-100'
              }`}
            >
              Coming ({totalYes})
            </button>
            <button
              onClick={() => setActiveTab('no')}
              className={`flex-shrink-0 px-3 py-2 rounded-lg font-medium text-sm transition-colors ${
                activeTab === 'no'
                  ? 'bg-red-600 text-white'
                  : 'text-gray-600 hover:text-gray-800 bg-gray-100'
              }`}
            >
              Not Coming ({totalNo})
            </button>
          </div>
        </div>

        {/* RSVP List - Mobile Cards */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {isLoading ? (
            <div className="p-6 text-center text-gray-500">
              <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
              <p className="mt-2 text-sm">Loading RSVPs...</p>
            </div>
          ) : filteredRsvps.length === 0 ? (
            <div className="p-6 text-center text-gray-500">
              <div className="text-4xl mb-2">📝</div>
              <p className="text-sm">No RSVPs yet.</p>
              <p className="text-xs mt-1">Ask guests to submit through the invitation page.</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {filteredRsvps.map((rsvp) => (
                <div 
                  key={rsvp.id} 
                  className="p-4 hover:bg-gray-50 transition-colors"
                  onClick={() => setSelectedRsvp(rsvp)}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 text-base">{rsvp.name}</h3>
                    </div>
                    <span
                      className={`flex-shrink-0 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        rsvp.attending === 'yes'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {rsvp.attending === 'yes' ? 'Coming' : 'Not Coming'}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                    <div className="flex items-center">
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded mr-2">
                        👥 {rsvp.attending === 'yes' ? rsvp.guests : '0'} guests
                      </span>
                    </div>
                    <div className="text-right text-xs text-gray-500">
                      {new Date(rsvp.timestamp).toLocaleDateString()}
                    </div>
                  </div>
                  
                  {rsvp.message && (
                    <div className="mt-2">
                      <p className="text-sm text-gray-600 line-clamp-2">
                        "{rsvp.message}"
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Action Buttons - Mobile Optimized */}
        <div className="mt-4 flex flex-col gap-2">
          <button
            onClick={() => {
              const csv = [
                ['Name', 'Status', 'Guests', 'Message', 'Date'],
                ...rsvps.map(rsvp => [
                  rsvp.name,
                  rsvp.attending,
                  rsvp.attending === 'yes' ? rsvp.guests : 0,
                  rsvp.message || '',
                  new Date(rsvp.timestamp).toLocaleString()
                ])
              ].map(row => row.map(field => `"${field}"`).join(',')).join('\n');

              const blob = new Blob([csv], { type: 'text/csv' });
              const url = window.URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = 'wedding-rsvps.csv';
              a.click();
            }}
            className="bg-green-600 text-white px-4 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors text-sm flex items-center justify-center gap-2"
          >
            <span>📥</span>
            Export to CSV
          </button>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={loadRSVPs}
              disabled={isLoading}
              className="bg-blue-600 text-white px-4 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 text-sm flex items-center justify-center gap-2"
            >
              <span>🔄</span>
              {isLoading ? 'Refreshing...' : 'Refresh'}
            </button>

            <button
              onClick={() => setIsAuthenticated(false)}
              className="bg-gray-600 text-white px-4 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors text-sm flex items-center justify-center gap-2"
            >
              <span>🚪</span>
              Logout
            </button>
          </div>
        </div>

        {/* Important Note */}
        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-xl">
          <h3 className="font-semibold text-green-800 text-sm mb-1 flex items-center gap-1">
            <span>✅</span> Live Data System
          </h3>
          <p className="text-green-700 text-xs">
            All RSVP data updates in real-time. Responses are automatically saved to the server.
          </p>
        </div>
      </div>

      {/* RSVP Detail Modal */}
      {selectedRsvp && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full max-h-[80vh] overflow-y-auto">
            <div className="p-4 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">RSVP Details</h3>
                <button
                  onClick={() => setSelectedRsvp(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
            </div>
            
            <div className="p-4 space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-500">Name</label>
                <p className="text-gray-900 font-semibold">{selectedRsvp.name}</p>
              </div>
              
              <div>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-500">Status</label>
                <span
                  className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium mt-1 ${
                    selectedRsvp.attending === 'yes'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {selectedRsvp.attending === 'yes' ? 'Attending' : 'Not Attending'}
                </span>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-500">Number of Guests</label>
                <p className="text-gray-900">
                  {selectedRsvp.attending === 'yes' ? selectedRsvp.guests : '0'}
                </p>
              </div>
              
              {selectedRsvp.message && (
                <div>
                  <label className="text-sm font-medium text-gray-500">Message</label>
                  <p className="text-gray-900 mt-1 bg-gray-50 p-3 rounded-lg text-sm">
                    {selectedRsvp.message}
                  </p>
                </div>
              )}
              
              <div>
                <label className="text-sm font-medium text-gray-500">Submitted</label>
                <p className="text-gray-900 text-sm">
                  {new Date(selectedRsvp.timestamp).toLocaleDateString()} at{' '}
                  {new Date(selectedRsvp.timestamp).toLocaleTimeString()}
                </p>
              </div>
            </div>
            
            <div className="p-4 border-t border-gray-200">
              <button
                onClick={() => setSelectedRsvp(null)}
                className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}