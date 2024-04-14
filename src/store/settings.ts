import { create } from 'zustand';
import { SettingsType } from '../types/settings';

export type SettingsState = {
  settings: SettingsType;
};

export type SettingsAction = {
  setSettings: (settings: SettingsType) => void;
};

export const useSettingsStore = create<SettingsAction & SettingsState>((set) => ({
  settings: {
    GETTING_PERCENT_BONUSES: 0,
    GIFT_BONUSES_USER_BIRTHDAY: 0,
    LIMITED_BONUSES_TIMEOUT_DAYS: 0,
    MAX_BONUSES_PER_PURCHASE_PERCENT: 0,
  },
  setSettings: (settings: SettingsType) => set(() => ({ settings })),
}));
