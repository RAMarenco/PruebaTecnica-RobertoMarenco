import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";
import CategorySelect from "./CategorySelect";
import { useState } from "react";
import useEvents from "../hooks/useEvents";
import type { Event } from "../types/Event";
import Button from "./Button";
import { toast } from "sonner";

interface EventModalProps {
	title: string;
	data?: Event;
	setShowModal: (show: boolean) => void;
}

const EventModal = ({title, data, setShowModal} : EventModalProps) => {
	const [eventData, setEventData] = useState<Event>(data || {
		id: Date.now(),
		eventName: "",
		eventCategory: "",
		eventPrice: 0,
		eventDate: new Date(),
		eventPetsAllowed: false,
	});
	
	const {addEvent, updateEvent} = useEvents();

	const handleClose = () => {
		setShowModal(false);
	}

	const handleInputChange = (e) => {
		setEventData({
			...eventData,
			[e.target.name]: e.target.name === "eventPetsAllowed" ? e.target.checked : e.target.value,
		});
	}

	const handleDateChange = (date) => {
		setEventData({
			...eventData,
			eventDate: date.toISOString(),
		})
	}

	const validateEventData = () => {
		if (eventData.eventPrice <= 0 || eventData.eventName === "" || eventData.eventCategory === "") {
			return false;
		}
		return true;
	}

	const handleSave = () => {
		if (!validateEventData()) {
			toast.error("Por favor, complete todos los campos requeridos y asegúrese de que el precio sea mayor a 0.");
			return;
		}
		if (data) {
			updateEvent(eventData);
		} else {
			addEvent(eventData)
		}

		setShowModal(false);
	}
	
	return (
		<div className="fixed inset-0 flex items-center justify-center bg-black/50">
			<div className="max-w-[30rem] w-full flex flex-col gap-4 p-4 bg-white shadow-2xl rounded-xl">
				<div className="flex flex-row justify-between">
					<h2 className="text-xl font-bold">
						{title}
					</h2>
					<Button className="!rounded-full !bg-gray-400 w-8 h-8 text-white" title="X" handleClick={handleClose}/>
				</div>
				<div className="flex flex-col gap-4">
					<label className="flex flex-col gap-2">
						<p>Nombre del Evento <span className="text-orange-600">*</span></p>
						<input
							defaultValue={data?.eventName || ""}
							name="eventName"
							type="text"
							className="w-full p-2 border bg-white border-gray-400 rounded"
							placeholder="Ingrese el nombre del evento"
							onChange={handleInputChange}/>
					</label>
					<CategorySelect 
						name="eventCategory" 
						defaultValue={data?.eventCategory || "-"}
						handleChange={handleInputChange}
					/>
					<label className="flex flex-col gap-2">
						<p>Precio <span className="text-orange-600">*</span></p>
						<input
							defaultValue={data?.eventPrice || ""}
							name="eventPrice"
							type="number"
							className="w-full p-2 border bg-white border-gray-400 rounded"
							placeholder="$0.00"
							onChange={handleInputChange}/>
					</label>
					<label className="flex flex-col gap-2">
						<p>Fecha del evento <span className="text-orange-600">*</span></p>
						<DatePicker 
							selected={new Date(eventData.eventDate)}
							minDate={new Date()}
							onChange={handleDateChange}
							className="w-full p-2 border bg-white border-gray-400 rounded"
						/>
					</label>
					<label className="flex flex-row justify-between gap-2">
						¿Admite Mascotas?
						<input
							defaultChecked={data?.eventPetsAllowed || false}
							name="eventPetsAllowed"
							type="checkbox"
							className="w-6 h-6"
							onChange={handleInputChange}/>
					</label>
				</div>
				<Button className="w-full" title="Crear Evento" handleClick={handleSave}/>
				<p className="text-center text-sm text-orange-600">Los campos marcados con * son de obligatorios</p>
			</div>
		</div>
		
	)
}

export default EventModal;