"use client";

import { create } from "zustand";

interface SnowfallStore {
  isEnabled: boolean;
  toggle: () => void;
}

export const useSnowfallStore = create<SnowfallStore>((set) => ({
  isEnabled: true,
  toggle: () => set((state) => ({ isEnabled: !state.isEnabled })),
}));
