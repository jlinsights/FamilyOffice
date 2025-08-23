import { useState, useEffect, useCallback } from 'react';

interface PopupManagerHookOptions {
  enableDualPopup?: boolean;
  maxConcurrentPopups?: number;
  debugMode?: boolean;
}

interface PopupState {
  activePopups: string[];
  dismissedPopups: string[];
  performanceMetrics: Record<string, any>;
}

export const usePopupManager = (options: PopupManagerHookOptions = {}) => {
  const [state, setState] = useState<PopupState>({
    activePopups: [],
    dismissedPopups: [],
    performanceMetrics: {},
  });

  const showPopup = useCallback((popupId: string) => {
    setState(prev => ({
      ...prev,
      activePopups: [...prev.activePopups, popupId],
    }));
  }, []);

  const dismissPopup = useCallback((popupId: string) => {
    setState(prev => ({
      ...prev,
      activePopups: prev.activePopups.filter(id => id !== popupId),
      dismissedPopups: [...prev.dismissedPopups, popupId],
    }));
  }, []);

  const getPopupMetrics = useCallback(() => {
    return state.performanceMetrics;
  }, [state.performanceMetrics]);

  return {
    ...state,
    showPopup,
    dismissPopup,
    getPopupMetrics,
  };
};