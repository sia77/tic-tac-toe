import type { gridSizes } from "../interfaces/gamesInterfaces";

interface ButtonGroupProps{
    gridSize:gridSizes;
    onGrideSizeChange: (size:gridSizes) => void;
}


export const ButtonGroup = ({gridSize, onGrideSizeChange }:ButtonGroupProps) => {

    const sizes = [3,4,5];

    return (
        <>
            <div className="flex gap-1 py-1 px-1 rounded-md border border-gray-200 bg-white">
                {
                    sizes.map( (size:any) => (

                    <button
                        key={size}
                        onClick = {() => onGrideSizeChange(size)}
                        className={`${gridSize === size ? 'bg-gray-100':'bg-white'} cursor-pointer px-1 hover:bg-gray-100 hover:rounded-sm hover:px-1`}>{size}x{size}</button>

                    ))
                }
                {/* <button
                    onClick = {() => onGrideSizeChange(3)}
                    className={`${gridSize === 3 ? 'bg-gray-100':'bg-white'} cursor-pointer px-1 hover:bg-gray-100 hover:rounded-sm hover:px-1`}>3x3</button>
                <button className={`${gridSize === 4 ? 'bg-gray-100':'bg-white'} cursor-pointer px-1 hover:bg-gray-100 hover:rounded-sm hover:px-1`}>4x4</button>
                <button className={`${gridSize === 5 ? 'bg-gray-100':'bg-white'} cursor-pointer px-1 hover:bg-gray-100 hover:rounded-sm hover:px-1`}>5x5</button> */}
            </div>
        </>
    )
}