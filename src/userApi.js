

export const getUserlist = async () => {
  try {
    const token = localStorage.getItem('Token')

    const response = await fetch(`http://localhost:8080/v1/user/userlist?pageindex=1&pagesize=222222`,{
      method: "GET",
      headers:{
        'Authorization': `${token}`,
        // 'Authorization':'Bearer yTIgfbIDTnphChtiB6IpkswrIyVWeaau6HGlOb3Z64o='
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

export const AddOrUpdUser = async (data, token) => {
  try {
    const token = localStorage.getItem('Token')

    const response = await fetch(`http://localhost:8080/v1/user/addorupd`, {
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

// // Function to update an existing task
// export const updateTask = async (Task_code, newData, token) => {
//   try {

//     const token = localStorage.getItem('Token')

//     const response = await fetch(`${API_URL}/taskUpd/${Task_code}`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         // 'Authorization': `Bearer ${token}`,
//         'Authorization': `${token}`,
//       },
//       body: JSON.stringify(newData),
//     });
//     if (!response.ok) {
//       throw new Error("Failed to update task");
//     }
//     const responseData = await response.json();
//     return responseData;
//   } catch (error) {
//     console.error("Error updating task:", error);
//     throw error;
//   }
// };

// Function to delete a task
export const deleteUser = async (user_code, token) => {
  try {

    const token = localStorage.getItem('Token')

    // const response = await fetch(`${API_URL}/taskDel/${Task_code}`, {
      const response = await fetch(`http://localhost:8080/v1/user/delete?userCode=${user_code}`, {
      method: "DELETE",
      headers:{
        // 'Authorization': `Bearer ${token}`,
        'Authorization': `${token}`,
      }
    });
    if (!response.ok) {
      throw new Error("Failed to delete task");
    }
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error deleting task:", error);
    throw error;
  }
};


// // for recurrence
// // Function to update an existing task with recurrence
// export const updateRecTask = async (Task_code, newRecData, token) => {
//   try {

//     const token = localStorage.getItem('Token')

//     const response = await fetch(`${API_URL}/taskRecUpd/${Task_code}`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         // 'Authorization': `Bearer ${token}`,
//         'Authorization': `${token}`,
//       },
//       body: JSON.stringify(newRecData),
//     });
//     if (!response.ok) {
//       throw new Error("Failed to update recurrence");
//     }
//     const responseData = await response.json();
//     return responseData;
//   } catch (error) {
//     console.error("Error updating recurrence:", error);
//     throw error;
//   }
// };

// // Function to delete a task with recurrence
// export const deleteRecTask = async (Task_code, token) => {
//   try {

//     const token = localStorage.getItem('Token')

//     const response = await fetch(`${API_URL}/taskRecDel/${Task_code}`, {
//       method: "DELETE",
//       headers: {
//         // 'Authorization': `Bearer ${token}`,
//         'Authorization': `${token}`,
//       }
//     });
//     if (!response.ok) {
//       throw new Error("Failed to delete recurrence");
//     }
//     const responseData = await response.json();
//     return responseData;
//   } catch (error) {
//     console.error("Error deleting recurrence:", error);
//     throw error;
//   }
// };
