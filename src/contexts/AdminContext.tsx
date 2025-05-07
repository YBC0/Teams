import { createContext, useContext, useReducer, ReactNode } from 'react';
import { AdminState, AdminUser, Notification } from '../types/admin';
import { Language } from '../types/common';

type AdminAction =
  | { type: 'SET_USER'; payload: AdminUser | null }
  | { type: 'SET_LANGUAGE'; payload: Language }
  | { type: 'TOGGLE_DARK_MODE' }
  | { type: 'TOGGLE_SIDEBAR' }
  | { type: 'ADD_NOTIFICATION'; payload: Omit<Notification, 'id' | 'createdAt'> }
  | { type: 'REMOVE_NOTIFICATION'; payload: string };

const initialState: AdminState = {
  currentUser: null,
  currentLanguage: 'en',
  isDarkMode: false,
  isSidebarCollapsed: false,
  notifications: [],
};

function adminReducer(state: AdminState, action: AdminAction): AdminState {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        currentUser: action.payload,
      };
    case 'SET_LANGUAGE':
      return {
        ...state,
        currentLanguage: action.payload,
      };
    case 'TOGGLE_DARK_MODE':
      return {
        ...state,
        isDarkMode: !state.isDarkMode,
      };
    case 'TOGGLE_SIDEBAR':
      return {
        ...state,
        isSidebarCollapsed: !state.isSidebarCollapsed,
      };
    case 'ADD_NOTIFICATION':
      return {
        ...state,
        notifications: [
          ...state.notifications,
          {
            ...action.payload,
            id: Math.random().toString(36).substr(2, 9),
            createdAt: new Date().toISOString(),
          },
        ],
      };
    case 'REMOVE_NOTIFICATION':
      return {
        ...state,
        notifications: state.notifications.filter((n) => n.id !== action.payload),
      };
    default:
      return state;
  }
}

const AdminContext = createContext<{
  state: AdminState;
  dispatch: React.Dispatch<AdminAction>;
} | null>(null);

export function AdminProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(adminReducer, initialState);

  return (
    <AdminContext.Provider value={{ state, dispatch }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
} 