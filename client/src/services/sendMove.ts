
const baseUrl = import.meta.env.VITE_BASE_URL;
export const sendMove = async( payload:any) => {

    try{
        const response = await fetch(`${baseUrl}/api/move`, {
            method: "POST",
            headers:{ "Content-Type": "application/json" },
            body:payload
        })

        if(!response.ok){
            const errorBody = await response.json().catch(() => ({}));
            throw new Error(errorBody.detail || `HTTP ${response.status}`);
        }

        const data = await response.json();
        return data;
    }catch(error:unknown){
        console.error("Error sending message:", error);
        throw error;
    }

}