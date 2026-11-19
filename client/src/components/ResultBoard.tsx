export const ResultBoard = ({status}:{ status: "WIN" | "DRAW"; }) =>{

    return (
        <div className="px-4">
            {status === "WIN" && <div className="text-center rounded-sm bg-[oklch(0.84_0.13_143.55)]">We have a winner!!!</div>}
            {status === "DRAW" && <div className="text-center rounded-sm bg-[#f0d1d1]">It's a Draw!!!</div>}
        </div>        
    )
}