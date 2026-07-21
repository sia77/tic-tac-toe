

export const ButtonGroup = ({gridSize}:{gridSize:number}) => {

    return (
        <>
            <div className="flex gap-1 py-1 px-1 rounded-md border border-gray-200 bg-white">
                <button className={`${gridSize === 3 ? 'bg-gray-100':'bg-white'} cursor-pointer px-1 hover:bg-gray-100 hover:rounded-sm hover:px-1`}>3x3</button>
                <button className={`${gridSize === 4 ? 'bg-gray-100':'bg-white'} cursor-pointer px-1 hover:bg-gray-100 hover:rounded-sm hover:px-1`}>4x4</button>
                <button className={`${gridSize === 5 ? 'bg-gray-100':'bg-white'} cursor-pointer px-1 hover:bg-gray-100 hover:rounded-sm hover:px-1`}>5x5</button>
            </div>
        </>
    )

}