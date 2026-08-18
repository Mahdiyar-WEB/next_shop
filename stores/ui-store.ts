"use client";
import { create } from "zustand";
type UiState = { isMobileMenuOpen: boolean; isCartDrawerOpen: boolean; toggleMobileMenu: () => void; toggleCartDrawer: () => void; closeOverlays: () => void };
export const useUiStore = create<UiState>((set) => ({ isMobileMenuOpen: false, isCartDrawerOpen: false, toggleMobileMenu: () => set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })), toggleCartDrawer: () => set((state) => ({ isCartDrawerOpen: !state.isCartDrawerOpen })), closeOverlays: () => set({ isMobileMenuOpen: false, isCartDrawerOpen: false }) }));
