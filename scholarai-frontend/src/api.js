const API_BASE_URL = "http://127.0.0.1:8000";

async function request(endpoint, options = {}) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });

  let data;

  try {
    data = await response.json();
  } catch {
    data = null;
  }

  if (!response.ok) {
    throw new Error(
      data?.detail || `Request failed with status ${response.status}`
    );
  }

  return data;
}


// ================================
// AUTHENTICATION
// ================================

export async function registerUser(userData) {
  return request("/api/auth/register", {
    method: "POST",
    body: JSON.stringify(userData),
  });
}


export async function loginUser(email, password) {
  const data = await request("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
    }),
  });

  // Save JWT
  localStorage.setItem("scholarai_token", data.access_token);

  return data;
}


// ================================
// AUTHENTICATED REQUEST
// ================================

export async function getCurrentUser() {
  const token = localStorage.getItem("scholarai_token");

  if (!token) {
    throw new Error("You are not logged in.");
  }

  return request("/api/users/me", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}


// ================================
// LOGOUT
// ================================

export function logoutUser() {
  localStorage.removeItem("scholarai_token");
}


// ================================
// CHECK LOGIN
// ================================

export function isLoggedIn() {
  return Boolean(localStorage.getItem("scholarai_token"));
}