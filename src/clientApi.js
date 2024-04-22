export const getClients = async () => {
    try {
      const token = localStorage.getItem('Token')
  
      const response = await fetch(`http://localhost:8080/v1/client`, {
        method: "GET",
        headers: {
          'Authorization': `${token}`,
        }
      });
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  };
  
  // adding adding
  export const addClients = async (data, token) => {
    try {
      const token = localStorage.getItem('Token')
  
      const response = await fetch(`http://localhost:8080/v1/client`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // 'Authorization': `Bearer ${token}`,
          'Authorization': `${token}`,
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("Failed to post data");
      }
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      console.error("Error posting data:", error);
      throw error;
    }
  };