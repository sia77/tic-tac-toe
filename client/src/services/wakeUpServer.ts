
const baseUrl = import.meta.env.VITE_BASE_URL;
export const wakeUpServer = async() => {

    try{
        const response = await fetch(`${baseUrl}/api/health`, {
            method:"GET",
            headers:{ "Content-Type": "application/json" } 
        });

        if(!response.ok){
            const errorBody = await response.json().catch(() => ({}));
            throw new Error(errorBody.detail || `HTTP ${response.status}`);
        }

        const data = await response.json();
        return data;

    }catch(err:unknown){
        console.error("Error sending message:", err);
        throw err;
    }
}
