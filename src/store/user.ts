import { create } from 'zustand';
import { Viewer } from '../types/user';

export type ViewerState = {
  viewer: Viewer;
};

export type ViewerAction = {
  setSession: (session: ViewerState) => void;
  clearSession: () => void;
};

export const useViewerStore = create<ViewerAction & ViewerState>((set) => ({
  viewer: null,
  setSession: (viewer: ViewerState) => set(() => viewer),
  clearSession: () => set(() => ({ viewer: null })),
}));

export const getToken = () => localStorage.getItem('token');

export const setToken = (token: string) => localStorage.setItem('token', token);

export const deleteToken = () => localStorage.removeItem('token');
