import { useState } from "react";
import EventModal from "./components/EventModal";
import CategorySelect from "./components/CategorySelect";
import EventsCards from "./components/EventsCards";
import Button from "./components/Button";
import { useEventContext } from "./context/EventContext";
import { Toaster } from "sonner";

function App() {
  const [showModal, setShowModal] = useState(false);
  const {setFilterCategory, setFilterPetsAllowed} = useEventContext();

  const handleCategoryChange = (e) => {
    setFilterCategory(e.target.value)
  }

  const handlePetsAllowedChange = (e) => {
    setFilterPetsAllowed(e.target.checked);
  }

  return (
    <>
      <Toaster richColors/>
      <div className="flex flex-row gap-4">
        <div className="flex flex-col gap-4 w-1/6 bg-gray-200 h-dvh p-4 shadow-lg">
          <CategorySelect name="filterCategory" noLabel all handleChange={handleCategoryChange}/>
              <label className="flex flex-row justify-between gap-2">
                ¿Admite Mascotas?
                <input
                  type="checkbox"
                  className="w-6 h-6"
                  onChange={handlePetsAllowedChange}/>
              </label>
        </div>
        <div className="flex flex-col gap-4 w-full p-4">
          <div className="flex flex-row gap-4 items-center justify-between">
            <h1 className="text-2xl font-bold">Eventos</h1>
            <div className="flex flex-row gap-4">
              <Button className="py-1 px-3 !bg-blue-300 rounded text-white text-2xl" title="+" handleClick={() => setShowModal(true)}/>
            </div>
          </div>
          <EventsCards/>
          {showModal && <EventModal title="Crear Evento Nuevo" setShowModal={setShowModal}/>}
        </div>
      </div>
    </>
  )
}

export default App
