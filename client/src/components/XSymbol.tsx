
interface XSymbolProps {
    size: 'default' | 'compact'
}

const styleSizes = {
    default: "h-15 w-15 before:w-2.5 after:w-2.5 before:left-[calc(50%-5px)] after:left-[calc(50%-5px)]",
    compact :"h-5 w-5  before:w-1 after:w-1 before:left-[calc(50%-2px)] after:left-[calc(50%-2px)]"
}


export const XSymbol = ({size='default'}:XSymbolProps) =>{

    const style = styleSizes[size];

    return (
        <>
            <div className={`relative ${style} before:content-[''] before:absolute before:top-0 before:h-full before:bg-red-500 before:rounded before:rotate-45
            after:content-[''] after:absolute after:top-0 after:h-full after:bg-red-500 after:rounded after:-rotate-45 animate-[bounce_0.3s_ease-out]`}>
            </div>
        </>
    )

}