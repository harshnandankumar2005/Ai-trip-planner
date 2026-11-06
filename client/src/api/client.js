// API client helper for TripWise

const getAuthToken = () => {
  return localStorage.getItem('tripwise_token') || '';
};

export async function apiRequest(endpoint, options = {}) {
  const token = getAuthToken();
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const config = {
    ...options,
    headers,
  };

  try {
    const response = await fetch(endpoint, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'API request failed');
    }

    return data;
  } catch (error) {
    console.error(`API Error [${endpoint}]:`, error);
    throw error;
  }
}

export const api = {
  // Auth
  register: (body) => apiRequest('/api/auth/register', { method: 'POST', body: JSON.stringify(body) }),
  login: (body) => apiRequest('/api/auth/login', { method: 'POST', body: JSON.stringify(body) }),
  getMe: () => apiRequest('/api/auth/me', { method: 'GET' }),

  // AI Planner
  generatePlan: (params) => apiRequest('/api/ai/generate-plan', { method: 'POST', body: JSON.stringify(params) }),

  // Trips
  saveTrip: (tripData) => apiRequest('/api/trips', { method: 'POST', body: JSON.stringify(tripData) }),
  getTrips: (userId) => apiRequest(`/api/trips${userId ? `?userId=${userId}` : ''}`, { method: 'GET' }),
  getTripById: (id) => apiRequest(`/api/trips/${id}`, { method: 'GET' }),
  deleteTrip: (id) => apiRequest(`/api/trips/${id}`, { method: 'DELETE' }),
};
