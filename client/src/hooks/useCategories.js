import { useState, useEffect } from "react";

const useCategories = () => {
  const [noteCategories, setNoteCategories] = useState([
    { category_id: 0, category_name: "All" },
  ]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/category", {
          method: "GET",
          credentials: "include", // Allows cookies to be included
          headers: { "Content-Type": "application/json" },
        });

        const data = await response.json();
        console.log(data);
        // Map the response to maintain both id and name
        const formattedCategories = data.map((category) => ({
          category_id: category.category_id,
          category_name: category.category_name,
        }));

        // Ensure "All" is always the first category
        setNoteCategories([
          { category_id: 0, category_name: "All" },
          ...formattedCategories,
        ]);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  return noteCategories;
};

export default useCategories;
