import { IconRefresh } from "@tabler/icons-react"


interface ButtonRestProps {
    onClick: () => void
}

export const ResetButton = ({onClick}:ButtonRestProps) => {

    return (
        <>
            <button onClick={onClick} aria-label="Reset" className="bg-white border rounded-md border-gray-200 px-1 cursor-pointer">
                <IconRefresh size={18} stroke={2} />
            </button>        
        </>
    )
}