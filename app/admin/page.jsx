'use client'
import { useEffect, useState } from "react";
export default function AdminDashboard() {
  const [rsvps, setRsvps] = useState([]);
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [isLoading, setIsLoading] = useState(false);

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
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Admin Access</h1>
            <p className="text-gray-600">Enter password to view RSVPs</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Wedding RSVP Dashboard</h1>
              <p className="text-gray-600">Real-time updates of guest responses</p>
              <p className="text-sm text-green-600 mt-2">
                ✅ Live Data - All guest responses are stored centrally
              </p>
            </div>
            <div className="flex gap-4 mt-4 md:mt-0">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{totalYes}</div>
                <div className="text-sm text-gray-600">Attending</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">{totalNo}</div>
                <div className="text-sm text-gray-600">Not Attending</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{totalGuests}</div>
                <div className="text-sm text-gray-600">Total Guests</div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex space-x-4">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              All Responses ({rsvps.length})
            </button>
            <button
              onClick={() => setActiveTab('yes')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'yes'
                  ? 'bg-green-600 text-white'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Attending ({totalYes})
            </button>
            <button
              onClick={() => setActiveTab('no')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'no'
                  ? 'bg-red-600 text-white'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Not Attending ({totalNo})
            </button>
          </div>
        </div>

        {/* RSVP List */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {isLoading ? (
            <div className="p-8 text-center text-gray-500">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <p className="mt-2">Loading RSVPs...</p>
            </div>
          ) : filteredRsvps.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              No RSVPs yet. Check back later!
              <p className="text-sm mt-2">Ask guests to submit RSVPs through the main invitation page.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Guests
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Message
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredRsvps.map((rsvp) => (
                    <tr key={rsvp.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-gray-900">{rsvp.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                        {rsvp.email || '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            rsvp.attending === 'yes'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {rsvp.attending === 'yes' ? 'Attending' : 'Not Attending'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                        {rsvp.attending === 'yes' ? rsvp.guests : '-'}
                      </td>
                      <td className="px-6 py-4 text-gray-600 max-w-xs">
                        {rsvp.message ? (
                          <div className="truncate" title={rsvp.message}>
                            {rsvp.message}
                          </div>
                        ) : (
                          '-'
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(rsvp.timestamp).toLocaleDateString()} at{' '}
                        {new Date(rsvp.timestamp).toLocaleTimeString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex gap-4 justify-center flex-wrap">
          <button
            onClick={() => {
              const csv = [
                ['Name', 'Email', 'Status', 'Guests', 'Message', 'Date'],
                ...rsvps.map(rsvp => [
                  rsvp.name,
                  rsvp.email || '',
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
            className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
          >
            Export to CSV
          </button>

          <button
            onClick={loadRSVPs}
            disabled={isLoading}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {isLoading ? 'Refreshing...' : 'Refresh Data'}
          </button>

          <button
            onClick={() => setIsAuthenticated(false)}
            className="bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors"
          >
            Logout
          </button>
        </div>

        {/* Important Note */}
        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-xl">
          <h3 className="font-semibold text-green-800 mb-2">✅ Live Data System</h3>
          <p className="text-green-700 text-sm">
            All RSVP data is stored centrally and updates in real-time. You can see responses from all guests 
            as they submit them. Data is automatically saved to a file on the server.
          </p>
        </div>
      </div>
    </div>
  );
}