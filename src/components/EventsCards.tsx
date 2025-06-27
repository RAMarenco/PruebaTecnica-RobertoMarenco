import { useEffect, useState } from "react";
import useEvents from "../hooks/useEvents";
import Card from "./Card";
import EventModal from "./EventModal";
import type { Event } from "../types/Event";
import Button from "./Button";
import { categories } from "../consts";

const EventsCards = () => {
	const {handleFilter, handleDelete} = useEvents();
	const [showModal, setShowModal] = useState(false);
	const [eventData, setEventData] = useState<Event>();

	const handleEditEvent = (event: Event) => {
		setShowModal(true);
		setEventData(event);
	}

	useEffect(() => 
		{
			if (!showModal) {
				setEventData(undefined);
			}
		}, [showModal]
	)

	return (
		<div className="flex justify-center flex-row flex-wrap gap-4">
			{handleFilter().length > 0 && handleFilter().map((event) => (
				<Card key={event.id}>
					<div className="flex flex-col gap-2">
						<h2 className="text-xl font-bold">{event.eventName}</h2>
						<p><strong>Precio:</strong> ${event.eventPrice}</p>
						<p><strong>Categoria:</strong> {categories.find(category => event.eventCategory == category.key)?.label}</p>
						<p><strong>Fecha:</strong> {new Date(event.eventDate).toLocaleDateString()}</p>
						<p><strong>Pet Friendly:</strong> {event.eventPetsAllowed ? "Si" : "No"}</p>
					</div>
					<div className="flex flex-row gap-2 items-center">
						<Button className="sm:w-full" handleClick={() => handleEditEvent(event)} title="Edit"/>
						<Button className="!bg-red-500 text-white sm:w-full" handleClick={() => handleDelete(event.id)} title="Delete"/>
					</div>
				</Card>
			))}
			{showModal && <EventModal title="Editar Evento" setShowModal={setShowModal} data={eventData}/>}
		</div>
	)
}

export default EventsCards;