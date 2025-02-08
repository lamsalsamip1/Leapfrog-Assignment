export const addCategory = async (category_name) => {
  try {
    const response = await fetch("http://localhost:5000/api/category", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ category_name }),
    });

    const data = await response.json();
    if (response.ok) {
      return { success: true, data };
    } else {
      return { success: false, message: data.msg };
    }
  } catch (error) {
    console.error("Error adding category:", error);
    return { success: false, message: "Error adding category" };
  }
};

export const deleteCategory = async (category_id) => {
  try {
    const response = await fetch(
      `http://localhost:5000/api/category/${category_id}`,
      {
        method: "DELETE",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      }
    );

    if (response.ok) {
      return { success: true };
    } else {
      const data = await response.json();
      return { success: false, message: data.msg };
    }
  } catch (error) {
    console.error("Error deleting category:", error);
    return { success: false, message: "Error deleting category" };
  }
};
