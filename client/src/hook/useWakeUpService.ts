import { useState } from "react";
import { wakeUpServer } from "../services/wakeUpServer";

export const useWakeUpService = () => {
    const [isWaking, setIsWaking] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    const [response, setResponse] = useState("");

    const wakeServerUp = async() => {
        try{
            setIsWaking(true);
            setError(null);
            const result = await wakeUpServer();    
            setResponse(result?.message);            
        }catch(err:unknown){
            setError(err instanceof Error ? err : new Error("Something went wrong"));
            setIsWaking(false);
        }finally{
            setIsWaking(false);
        }
    }
    return {isWaking, error, wakeServerUp, response};
}