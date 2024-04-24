
// ************************* API for Clients **************************** //
export const getClients = async (includeInactive=true) => { // used " includeInactive=true " to filter inactive/active
    try {
      const token = localStorage.getItem('Token')
  
      const response = await fetch(`http://localhost:8080/v1/client?&filter_inactive=${includeInactive}`, { // after endpoint '?' + 'parameter' + '$' sign
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

  // ************************* API for rooms **************************** //

  export const getRooms = async (includeInactive=true) => { // used " includeInactive=true " to filter inactive/active
    try {
      const token = localStorage.getItem('Token')
  
      const response = await fetch(`http://localhost:8080/v1/room?&filter_inactive=${includeInactive}`, { // after endpoint '?' + 'parameter' + '$' sign
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
  
  // room adding
  export const addRooms = async (data, token) => {
    try {
      const token = localStorage.getItem('Token')
  
      const response = await fetch(`http://localhost:8080/v1/room`, {
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

  // ************************* API for position **************************** //

  export const getPosition = async (includeInactive=true) => { // used " includeInactive=true " to filter inactive/active
    try {
      const token = localStorage.getItem('Token')
  
      const response = await fetch(`http://localhost:8080/v1/position?filter_inactive=${includeInactive}`, { // after endpoint '?' + 'parameter' + '$' sign
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
  
  // position adding
  export const addPosition = async (data, token) => {
    try {
      const token = localStorage.getItem('Token')
  
      const response = await fetch(`http://localhost:8080/v1/position`, {
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

  // ************************* API for project **************************** //

  export const getProject = async (includeInactive=true) => { // used " includeInactive=true " to filter inactive/active
    try {
      const token = localStorage.getItem('Token')
  
      const response = await fetch(`http://localhost:8080/v1/project?filter_inactive=${includeInactive}`, { // you might need this *** 'client=BNZL&' *** for project by particuler clients
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
  
  //add project
  export const addProject = async (data, token) => {
    try {
      const token = localStorage.getItem('Token')
  
      const response = await fetch(`http://localhost:8080/v1/project`, {
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