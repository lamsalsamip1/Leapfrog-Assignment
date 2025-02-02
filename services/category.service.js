import db from "../models/index.js";

const Category = db.Category; // Get the Category model

const CategoryService = {
  // Create a new Category
  async createCategory(category_name, user_id) {
    return await Category.create({
      category_name,
      user_id: user_id,
    });
  },

  // Get all Categorys
  async getAllCategories(user_id) {
    return await Category.findAll(
      { where: { user_id: user_id } },
      {
        order: [["category_id", "ASC"]],
      }
    );
  },

  // Get a single Category by ID
  async getCategoryById(id, user_id) {
    return await Category.findByPk(id, {
      where: { user_id: user_id },
    });
  },

  // Update a Category
  async updateCategory(id, category_name, user_id) {
    const category = await Category.findByPk(id, {
      where: { user_id: user_id },
    });
    if (!category) return null;
    return await category.update({ category_name });
  },

  // Delete a Category
  async deleteCategory(id, user_id) {
    const category = await Category.findByPk(id, {
      where: { user_id: user_id },
    });
    if (!category) return false;
    await category.destroy();
    return true;
  },
};

export default CategoryService;
