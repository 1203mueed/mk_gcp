import React, { createContext, useContext, useReducer, useEffect, useCallback } from 'react';
import api from '../config/api';
import toast from 'react-hot-toast';

// Initial state
const initialState = {
  user: null,
  isAuthenticated: false,
  loading: true,
  error: null
};

// Action types
const ActionTypes = {
  LOGIN_START: 'LOGIN_START',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_FAILURE: 'LOGIN_FAILURE',
  REGISTER_START: 'REGISTER_START',
  REGISTER_SUCCESS: 'REGISTER_SUCCESS',
  REGISTER_FAILURE: 'REGISTER_FAILURE',
  LOGOUT: 'LOGOUT',
  SET_LOADING: 'SET_LOADING',
  CLEAR_ERROR: 'CLEAR_ERROR'
};

// Reducer
function authReducer(state, action) {
  switch (action.type) {
    case ActionTypes.LOGIN_START:
    case ActionTypes.REGISTER_START:
      return {
        ...state,
        loading: true,
        error: null
      };
    case ActionTypes.LOGIN_SUCCESS:
    case ActionTypes.REGISTER_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        isAuthenticated: true,
        loading: false,
        error: null
      };
    case ActionTypes.LOGIN_FAILURE:
    case ActionTypes.REGISTER_FAILURE:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        loading: false,
        error: action.payload
      };
    case ActionTypes.LOGOUT:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        loading: false,
        error: null
      };
    case ActionTypes.SET_LOADING:
      return {
        ...state,
        loading: action.payload
      };
    case ActionTypes.CLEAR_ERROR:
      return {
        ...state,
        error: null
      };
    default:
      return state;
  }
}

// Create context
const AuthContext = createContext();

// Auth provider component
export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Set up authentication
  useEffect(() => {
    // Logout function
    const logout = (showMessage = true) => {
      // Remove token from localStorage
      localStorage.removeItem('waste_patrol_token');
      dispatch({ type: ActionTypes.LOGOUT });
      if (showMessage) {
        toast.success('Logged out successfully', { duration: 1500 });
      }
    };

    // Verify token validity
    const verifyToken = async () => {
      try {
        const response = await api.get('/api/auth/profile');
        dispatch({
          type: ActionTypes.LOGIN_SUCCESS,
          payload: { user: response.data.user }
        });
      } catch (error) {
        console.error('Token verification failed:', error);
        logout(false); // Don't show logout message for token verification failures
      }
    };

    const token = localStorage.getItem('waste_patrol_token');
    if (token) {
      // Verify token validity
      verifyToken();
    } else {
      dispatch({ type: ActionTypes.SET_LOADING, payload: false });
    }
  }, []);

  // Login function
  const login = useCallback(async (email, password) => {
    dispatch({ type: ActionTypes.LOGIN_START });
    
    try {
      const response = await api.post('/api/auth/login', {
        email,
        password
      });

      const { token, user } = response.data;
      
      // Store token in localStorage
      localStorage.setItem('waste_patrol_token', token);
      
      dispatch({
        type: ActionTypes.LOGIN_SUCCESS,
        payload: { user }
      });
      
      toast.success('Login successful!', { duration: 2000 });
      return { success: true };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Login failed. Please try again.';
      dispatch({
        type: ActionTypes.LOGIN_FAILURE,
        payload: errorMessage
      });
      
      toast.error(errorMessage, { duration: 3000 });
      return { success: false, error: errorMessage };
    }
  }, []);

  // Register function
  const register = useCallback(async (userData) => {
    dispatch({ type: ActionTypes.REGISTER_START });
    
    try {
      const response = await api.post('/api/auth/register', userData);

      const { token, user } = response.data;
      
      // Store token in localStorage
      localStorage.setItem('waste_patrol_token', token);
      
      dispatch({
        type: ActionTypes.REGISTER_SUCCESS,
        payload: { user }
      });
      
      toast.success('Registration successful!', { duration: 2000 });
      return { success: true };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Registration failed. Please try again.';
      dispatch({
        type: ActionTypes.REGISTER_FAILURE,
        payload: errorMessage
      });
      
      toast.error(errorMessage, { duration: 3000 });
      return { success: false, error: errorMessage };
    }
  }, []);

  // Logout function
  const logout = useCallback((showMessage = true) => {
    localStorage.removeItem('waste_patrol_token');
    dispatch({ type: ActionTypes.LOGOUT });
    if (showMessage) {
      toast.success('Logged out successfully', { duration: 1500 });
    }
  }, []);

  // Clear error function
  const clearError = useCallback(() => {
    dispatch({ type: ActionTypes.CLEAR_ERROR });
  }, []);

  const value = {
    ...state,
    login,
    register,
    logout,
    clearError
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export default AuthContext;
