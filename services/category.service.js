import db from "../models/index.js";

const Category = db.Category; // Get the Category model

const CategoryService = {
  // Create a new Category
  async createCategory(category_name) {
    return await Category.create({ category_name });
  },

  // Get all Categorys
  async getAllCategories() {
    return await Category.findAll({
      order: [["category_id", "ASC"]],
    });
  },

  // Get a single Category by ID
  async getCategoryById(id) {
    return await Category.findByPk(id);
  },

  // Update a Category
  async updateCategory(id, category_name) {
    const category = await Category.findByPk(id);
    if (!category) return null;
    return await category.update({ category_name });
  },

  // Delete a Category
  async deleteCategory(id) {
    const category = await Category.findByPk(id);
    if (!category) return false;
    await category.destroy();
    return true;
  },
};

export default CategoryService;
