"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint("Categories", {
      fields: ["user_id", "category_name"],
      type: "unique",
      name: "unique_user_category_name",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint(
      "Categories",
      "unique_user_category_name"
    );
  },
};
