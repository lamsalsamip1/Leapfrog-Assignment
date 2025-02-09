# Notes Application

## Engineering Decisions

### Tech Stack

React, Node and MySQL was chosen as it was mentioned in the assignment. On top of these, the following things were used:

1. Express was used for more organized development as it simplifies server setup, has support for middlewares and other features that make building REST APIs easier.
2. An ORM called 'Sequelize' was used. Upon doing some research, I found that writing raw SQL queries gives better performance for applications that require complex retrievals. But, for general CRUD applications an ORM is preferred as performance gap is negligible and ORM makes development more organized and systematic, without having to hardcode SQL syntax for each operation.

### Authentication

- **Authentication**: JWT (JSON Web Tokens) was used for authentication. Initially, I had used bearer method but upon further research I found that it is vulnerable to cross side scripting attacks. Therefore, I moved to Http only cookie method with JWT which made the token inaccessible to client side javascript. In this process, the backend stored the token in the Http only cookie of the browser upon successful login. Additional features like email verification and two factor auth were implemented using nodemailer and speakeasy.

### Data Validation

- **Frontend Validation**: Validation for user input was implemented using native html attributes and react states. Validation was implemented in passwords, emails, categories to avoid duplication and meet certain conditions.
- **Backend Validation**: Validation was also performed at backend and the database whereable applicable.

### Pagination & Filters

- Pagination and filters were implemented in the backend to serve only required data. For notes, the number was passed along with the API which determined how many notes to fetch. This was implemented as a dropdown list in frontend. A different API was developed for returning notes belonging only to the given category.
- Sorting was implemented in the frontend, on top of the data which was already filtered from the backend. Sorting was based on creation data and updated data, which are automatically stored and updated by the MySQL database as it is defined in the schema.

### Database Design

- The database schema includes tables for users, notes, and categories. The relationships between notes and categories are managed via a junction table (`note_categories`) as they have a many to many relationship. Users have a one to many relationship with both notes and categories.
- Each user has different categories of notes. Initially, it is empty for a new user.

- **Normalization**: The database design follows normalization principles to minimize data redundancy. With a junction table, there are only atomic values for notes and categories which ensures 1NF. Similary, in the notes and categories table only the primary key uniquely determines the non-key attributes, putting the database in 2NF form. There are also no transitive dependencies.

## Setup Instructions

1. Clone the repository:

   ```bash
   git clone <repository-url>
   ```

2. Install the dependencies

   ```bash
   npm install
   cd client
   npm install
   ```

3. Create a .env file in the root. It should contain the following:

   ```bash
   PORT=5000
   DB_NAME=
   DB_USER=
   DB_PASS=
   JWT_EXPIRY=
   JWT_EMAIL_EXPIRY=
   JWT_SECRET=
   EMAIL_USER=
   EMAIL_PASS= use app password
   BASE_URL=http://localhost:5000
   ```

   APIs have been called in frontend with port 5000 although backend is dynamic based on env variable.

4. Start the backend
   ```bash
   npm run dev
   ```
5. Start the frontend
   ```bash
   cd client
   npm run dev
   ```

Swagger can be accessed from /api-docs
