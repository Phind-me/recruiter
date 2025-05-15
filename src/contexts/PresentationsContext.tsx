import React, { createContext, useContext, useState, useEffect } from 'react';
import { Presentation } from '../types';
import { presentations as mockPresentations } from '../data/mockData';

interface PresentationsContextType {
  presentations: Presentation[];
  activePresentation: Presentation | null;
  activePresentationId: string | null;
  setActivePresentationId: (id: string | null) => void;
  createPresentation: (presentation: Omit<Presentation, 'id'>) => void;
  updatePresentation: (id: string, updates: Partial<Presentation>) => void;
  deletePresentation: (id: string) => void;
}

const PresentationsContext = createContext<PresentationsContextType | undefined>(undefined);

export const PresentationsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [presentations, setPresentations] = useState<Presentation[]>([]);
  const [activePresentationId, setActivePresentationId] = useState<string | null>(null);
  const [activePresentation, setActivePresentation] = useState<Presentation | null>(null);

  useEffect(() => {
    fetchPresentations();
  }, []);

  useEffect(() => {
    const active = presentations.find(p => p.id === activePresentationId) || null;
    setActivePresentation(active);
  }, [activePresentationId, presentations]);

  const fetchPresentations = async () => {
    // In a real app, this would be an API call
    setPresentations(mockPresentations);
  };

  const createPresentation = (presentationData: Omit<Presentation, 'id'>) => {
    const newPresentation: Presentation = {
      ...presentationData,
      id: crypto.randomUUID()
    };
    setPresentations(prev => [...prev, newPresentation]);
  };

  const updatePresentation = (id: string, updates: Partial<Presentation>) => {
    setPresentations(prev => 
      prev.map(presentation => 
        presentation.id === id ? { ...presentation, ...updates } : presentation
      )
    );
  };

  const deletePresentation = (id: string) => {
    setPresentations(prev => prev.filter(presentation => presentation.id !== id));
    if (activePresentationId === id) {
      setActivePresentationId(null);
    }
  };

  return (
    <PresentationsContext.Provider value={{
      presentations,
      activePresentation,
      activePresentationId,
      setActivePresentationId,
      createPresentation,
      updatePresentation,
      deletePresentation
    }}>
      {children}
    </PresentationsContext.Provider>
  );
};

export { PresentationsContext }