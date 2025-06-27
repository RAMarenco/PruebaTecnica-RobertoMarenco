import { createContext, useContext, useState, type ReactNode } from "react";
import type { Event } from "../types/Event";

interface EventContextType {
  events: Event[];
  setEvents: (events: Event[]) => void;
  filterCategory: string;
  setFilterCategory: (category: string) => void;
  filterPetsAllowed: boolean;
  setFilterPetsAllowed: (allowed: boolean) => void;
}

const EventContext = createContext<EventContextType | undefined>(undefined);

export const EventProvider = ({ children }: { children: ReactNode }) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [filterCategory, setFilterCategory] = useState<string>("-");
  const [filterPetsAllowed, setFilterPetsAllowed] = useState<boolean>(false);

  return (
    <EventContext.Provider value={{ events, setEvents, filterCategory, setFilterCategory, filterPetsAllowed, setFilterPetsAllowed }}>
      {children}
    </EventContext.Provider>
  )
}

export const useEventContext = () => {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error("useEventContext must be used within an EventProvider");
  }
  return context;
}