
const API_URL = `http://localhost:8080/v1/task`;

export const fetchData = async () => {
  try {
    const response = await fetch(API_URL);
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

export const postData = async (data) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
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

// Function to update an existing task
export const updateTask = async (Task_code, newData) => {
  try {
    const response = await fetch(`${API_URL}/${Task_code}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newData),
    });
    if (!response.ok) {
      throw new Error("Failed to update task");
    }
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error updating task:", error);
    throw error;
  }
};

// Function to delete a task
export const deleteTask = async (Task_code) => {
  try {
    const response = await fetch(`${API_URL}/${Task_code}`, {
      method: "DELETE",
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
