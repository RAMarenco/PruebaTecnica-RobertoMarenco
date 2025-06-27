import { categories } from "../consts"

interface CategorySelectProps {
  noLabel?: Boolean,
  all?: Boolean,
  defaultValue?: string,
  name: string,
  handleChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

const CategorySelect = ({noLabel = false, all = false, name, defaultValue = "-", handleChange} : CategorySelectProps) => {
  const categoriesMap = categories.map((category) => (
		<option key={category.key} value={category.key}>
			{category.label}
		</option>
	))

  return (
    <label className="flex flex-col gap-2">
      {!noLabel && <p>Categoria del Evento <span className="text-orange-600">*</span></p>}
      <select className="w-full p-2 border bg-white border-gray-400 rounded" name={name} onChange={handleChange} defaultValue={defaultValue}>
        {all ? <option value="-">Todas las Categorías</option> : <option disabled value={"-"}>Elije una opcion</option>}
        {categoriesMap}
      </select>
    </label>
  )
}

export default CategorySelect;