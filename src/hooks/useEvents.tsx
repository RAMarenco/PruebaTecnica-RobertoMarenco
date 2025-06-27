import { useEffect } from "react";
import type { Event } from "../types/Event";
import { useEventContext } from "../context/EventContext";
import { toast } from "sonner";

const useEvents = () => {	
	const {events, setEvents, filterCategory, filterPetsAllowed } = useEventContext();

	useEffect(() => {
		setEvents(getEvents());
	}, []);

	useEffect(() => {
		handleFilter();
	}, [filterCategory])

	const updateLocalStorage = (events: Event[]) => {
		localStorage.setItem("eventData", JSON.stringify(events));
	}

  const getEvents = () => {
		const storedEvents = localStorage.getItem("eventData");
		if (!storedEvents) {
			toast.info("No hay eventos disponibles. Por favor, agregue un evento.", {
				id: "no-events",
			});
		}
		return storedEvents ? JSON.parse(storedEvents) : [];
	}

	const addEvent = (newEvent : Event) => {
		const updatedEvents = [...events, newEvent];
		setEvents(updatedEvents);
		updateLocalStorage(updatedEvents);
		toast.success(`Evento agregado exitosamente!`);
	}

	const updateEvent = (updatedEvent: Event) => {
		const updatedEvents = events.map(event =>
			event.id === updatedEvent.id ? updatedEvent : event
		);
		setEvents(updatedEvents);
		updateLocalStorage(updatedEvents);
		toast.success(`Evento actualizado exitosamente!`);
	}
	
	const handleDelete = (id: number) => {
		const updatedEvents = events.filter(event => event.id !== id);
		setEvents(updatedEvents);
		updateLocalStorage(updatedEvents);
		toast.success("Evento eliminado exitosamente!");
	}

	const handleFilter = () => {
		return events.filter(event => {
			const matchesCategory = filterCategory ? filterCategory === "-" ? true : event.eventCategory === filterCategory : true;
			const matchesPetsAllowed = filterPetsAllowed ? event.eventPetsAllowed : !event.eventPetsAllowed;
			return matchesCategory && matchesPetsAllowed;
		})
	}


	return {
		events,
		getEvents,
		addEvent,
		updateEvent,
		handleFilter,
		handleDelete,
	}
}

export default useEvents;