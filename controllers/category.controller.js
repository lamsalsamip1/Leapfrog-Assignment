import CategoryService from "../services/category.service.js";

async function createCategory(req, res, next) {
  try {
    const { category_name } = req.body;
    const user_id = req.user.id;
    const Category = await CategoryService.createCategory(
      category_name,
      user_id
    );

    // If everything is fine, respond with the created Category
    res.status(201).json(Category);
  } catch (error) {
    // If an error occurs, pass it to the error-handling middleware
    if (error.name === "SequelizeUniqueConstraintError") {
      error.message = "Category already exists";
      error.status = 409;
    }
    next(error);
  }
}

async function getAllCategories(req, res, next) {
  try {
    const user_id = req.user.id;
    const Categories = await CategoryService.getAllCategories(user_id);

    res.status(200).json(Categories);
  } catch (error) {
    next(error);
  }
}

async function getCategoryById(req, res, next) {
  try {
    const { id } = req.params;
    const user_id = req.user.id;
    const Category = await CategoryService.getCategoryById(id, user_id);

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
    const user_id = req.user.id;

    // check if rq.user.id is the same as the user_id of the category
    const cat = await CategoryService.getCategoryById(id, user_id);

    if (!cat) {
      const error = new Error(`Category with id ${id} not found`);
      error.status = 404;
      return next(error); // Pass the error to the next middleware
    }
    if (cat.user_id !== user_id) {
      const error = new Error(`You are not authorized to update this category`);
      error.status = 401;
      return next(error); // Pass the error to the next middleware
    }
    const Category = await CategoryService.updateCategory(
      id,
      category_name,
      user_id
    );

    res.status(200).json(Category);
  } catch (error) {
    next(error);
  }
}

async function deleteCategory(req, res, next) {
  try {
    const { id } = req.params;
    const user_id = req.user.id;
    const cat = await CategoryService.getCategoryById(id, user_id);
    if (!cat) {
      const error = new Error(`Category with id ${id} not found`);
      error.status = 404;
      return next(error); // Pass the error to the next middleware
    }
    // check if rq.user.id is the same as the user_id of the category
    if (cat.user_id !== user_id) {
      const error = new Error(`You are not authorized to delete this category`);
      error.status = 401;
      return next(error); // Pass the error to the next middleware
    }

    await CategoryService.deleteCategory(id, user_id);

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
