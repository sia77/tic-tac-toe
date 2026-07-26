import type { GridSizes } from "../interfaces/gamesInterfaces";

interface ButtonGroupProps{
    gridSize:GridSizes;
    onGrideSizeChange: (size:GridSizes) => void;
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
            </div>
        </>
    )
}