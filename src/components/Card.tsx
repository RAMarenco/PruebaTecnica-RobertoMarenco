interface CardProps {
	children: React.ReactNode;
}

const Card = ({children} : CardProps) => {
	return (
		<div className="min-w-[16rem] flex flex-col lg:flex-row gap-2 justify-between p-4 border border-gray-300 rounded mb-4">
			{children}
		</div>
	)
}

export default Card;