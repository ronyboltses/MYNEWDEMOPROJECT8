import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { AdminSettings, Resource, Feedback } from '../types';
import { defaultSettings } from '../settings/defaultSettings';

interface AdminStore {
  settings: AdminSettings;
  updateSettings: (settings: Partial<AdminSettings>) => void;
  addResource: (resource: Omit<Resource, 'id' | 'dateAdded'>) => void;
  removeResource: (id: string) => void;
  addFeedback: (feedback: Omit<Feedback, 'id' | 'dateAdded'>) => void;
  isAuthenticated: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  updateCredentials: (username: string, password: string) => void;
}

export const useAdminStore = create<AdminStore>()(
  persist(
    (set) => ({
      settings: defaultSettings as AdminSettings,
      isAuthenticated: false,
      updateSettings: (newSettings) =>
        set((state) => ({
          settings: {
            ...state.settings,
            ...newSettings,
            assumptions: {
              ...state.settings.assumptions,
              ...(newSettings.assumptions || {}),
              locationFactors: {
                ...state.settings.assumptions.locationFactors,
                ...(newSettings.assumptions?.locationFactors || {})
              },
              qualityFactors: {
                ...state.settings.assumptions.qualityFactors,
                ...(newSettings.assumptions?.qualityFactors || {})
              }
            },
          },
        })),
      addResource: (resource) =>
        set((state) => ({
          settings: {
            ...state.settings,
            resources: [
              ...state.settings.resources,
              {
                ...resource,
                id: crypto.randomUUID(),
                dateAdded: new Date().toISOString(),
              },
            ],
          },
        })),
      removeResource: (id) =>
        set((state) => ({
          settings: {
            ...state.settings,
            resources: state.settings.resources.filter((r) => r.id !== id),
          },
        })),
      addFeedback: (feedback) =>
        set((state) => ({
          settings: {
            ...state.settings,
            feedback: [
              ...state.settings.feedback,
              {
                ...feedback,
                id: crypto.randomUUID(),
                dateAdded: new Date().toISOString(),
              },
            ],
          },
        })),
      login: (username, password) => {
        const state = useAdminStore.getState();
        if (
          username === state.settings.adminCredentials.username && 
          password === state.settings.adminCredentials.password
        ) {
          set({ isAuthenticated: true });
          return true;
        }
        return false;
      },
      logout: () => set({ isAuthenticated: false }),
      updateCredentials: (username, password) =>
        set((state) => ({
          settings: {
            ...state.settings,
            adminCredentials: { username, password },
          },
        })),
    }),
    {
      name: 'admin-settings',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        settings: state.settings,
        isAuthenticated: state.isAuthenticated
      }),
    }
  )
);