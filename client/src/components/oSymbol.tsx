const styleSizes = {
    default: "h-15 w-15 border-10",
    compact: "h-4 w-4 border-3"
}

interface OSymbolProps {
    size : 'default' | 'compact' 
}

export const OSymbol = ({size='default'}:OSymbolProps) => {

    const style = styleSizes[size];

    return (
        <div className={`${style} rounded-full border-blue-500 box-border animate-[bounce_0.3s_ease-out]`}></div>
    )
}