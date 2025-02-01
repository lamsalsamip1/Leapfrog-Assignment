import CategoryService from "../services/category.service.js";

async function createCategory(req, res, next) {
  try {
    const { category_name } = req.body;
    console.log(typeof category_name);
    const Category = await CategoryService.createCategory(category_name);

    // If everything is fine, respond with the created Category
    res.status(201).json(Category);
  } catch (error) {
    // If an error occurs, pass it to the error-handling middleware
    next(error);
  }
}

async function getAllCategories(req, res, next) {
  try {
    const Categories = await CategoryService.getAllCategories();
    res.status(200).json(Categories);
  } catch (error) {
    next(error);
  }
}

async function getCategoryById(req, res, next) {
  try {
    const { id } = req.params;
    const Category = await CategoryService.getCategoryById(id);

    if (!Category) {
      const error = new Error(`Category with id ${id} not found`);
      error.status = 404;
      return next(error); // Pass the error to the next middleware
    }

    res.status(200).json(Category);
  } catch (error) {
    next(error);
  }
}

async function updateCategory(req, res, next) {
  try {
    const { id } = req.params;
    const { category_name } = req.body;
    const Category = await CategoryService.updateCategory(id, category_name);

    if (!Category) {
      const error = new Error(`Category with id ${id} not found`);
      error.status = 404;
      return next(error); // Pass the error to the next middleware
    }

    res.status(200).json(Category);
  } catch (error) {
    next(error);
  }
}

async function deleteCategory(req, res, next) {
  try {
    const { id } = req.params;
    const Category = await CategoryService.deleteCategory(id);

    if (!Category) {
      const error = new Error(`Category with id ${id} not found`);
      error.status = 404;
      return next(error); // Pass the error to the next middleware
    }

    res.status(204).send(); // Send a 204 No Content response for successful deletion
  } catch (error) {
    next(error);
  }
}

export {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
