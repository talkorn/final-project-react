<!-- # Tal's Card Web

Tal's Card Web is a web application built using React, Redux, Joi, Hooks, MongoDB, and Material-UI (MUI). It provides users with a platform to create and manage their digital business cards. This README provides an overview of the application's features, installation instructions, and usage guidelines.

# Features

User Registration and Authentication: Users can create an account and log in securely to access their personalized business card dashboard.
Create and Customize Business Cards: Users can design their digital business cards by adding their contact information, profile picture, social media links, and other relevant details.
Validation with Joi: The application utilizes the Joi library for validating user input, ensuring that the entered information meets the specified criteria.
Responsive Design: The web application is built with a responsive layout, enabling optimal viewing and interaction across different devices and screen sizes.
Material-UI Components: Tal's Card Web incorporates Material-UI (MUI) components and styling for a polished and intuitive user interface.
Data Persistence with MongoDB: User data and business card details are stored in a MongoDB database, ensuring efficient data management and retrieval.

Ensure you have MongoDB installed and running locally or provide the appropriate connection details in the project's configuration files.
Install the required packages by running the command `npm install`
Start the development server:`npm start`
Open your browser and visit http://localhost:3000 to access the application.

Note: Make sure you have Node.js and npm (Node Package Manager) installed on your machine.

Usage
Upon launching the application, you will be presented with the homepage. If you already have an account, click on the "Login" button to access your business card dashboard. Otherwise, click on "Sign Up" to create a new account.

Once logged in, you can proceed to create and customize your business card. Choose a template that suits your style and preferences, and fill in the necessary details such as your name, contact information, profile picture, and social media links.

Ensure that the entered information meets the validation criteria enforced by the application, which is powered by the Joi library. Any invalid input will be flagged and must be corrected before saving.

The application leverages Material-UI (MUI) components and styling to provide a visually appealing and user-friendly experience. The UI components such as buttons, forms, and cards follow MUI design principles.

You can update and modify your business card at any time by accessing the dashboard. Additionally, you can delete your card if needed.

Remember to log out when you are done using the application to ensure the security of your account.

Contributing
Contributions to Tal's Card Web are welcome! If you find any bugs, have feature suggestions, or would like to contribute in any other way, please feel free to open an issue or submit a pull request.

Before making contributions, please review the project's guidelines and code of conduct, which are provided in the repository.

Contact
If you have any questions, suggestions, or need further

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

### Link to slides

[Click here](https://docs.google.com/presentation/d/1Nof_WWcg-Tg_jncJvnNKR7JJ9GIfZ7U-kgOvqQzeKj8/edit?usp=sharing)
 -->

# Tal's Jewelry Online Shop

Welcome to Tal's Jewelry, an online shop built with React, Redux, Joi, Hooks, MongoDB, and Material-UI (MUI). This platform allows users to browse and purchase jewelry items, save their favorite pieces, edit their profiles, and enables business and admin users to manage cards, jewelry inventory, and user accounts.

## Features

### User Features

1. **User Authentication**: Users can create accounts and log in securely to access their personalized shopping experience.

2. **Browse Jewelry**: Users can view a wide selection of jewelry items, complete with detailed descriptions and images.

3. **Favorite Jewelry**: Users can mark their favorite jewelry items and view them in a dedicated "Favorites" page.

4. **Edit Profile**: Users can update their profile information, including their name, email, and picture.

### Business User Features

5. **Add Cards**: Business users have the ability to add new jewelry cards to the shop, specifying details such as name, description, price, and images.

### Admin User Features

6. **Manage Cards**: Admin users can add, edit, and delete jewelry cards, ensuring an up-to-date inventory.

7. **Edit Users**: Admins can manage user accounts, including updating user information and roles.

8. **View Inventory**: Admins can access a detailed overview of the jewelry inventory, including the number of times each item has been marked as a favorite.

## Installation

To run this project locally, follow these steps:

1. Clone the repository:

   ```
   git clone https://github.com/your-username/tals-jewelry.git
   ```

2. Navigate to the project directory:

   ```
   cd tals-jewelry
   ```

3. Install dependencies:

   ```
   npm install
   ```

4. Create a `.env` file in the project root and add your MongoDB connection string:

   ```
   MONGODB_URI=your-mongodb-uri
   ```

5. Start the development server:

   ```
   npm start
   ```

The application should now be running locally on http://localhost:3000.

## Usage

1. **User Registration**: Register as a user to access the shopping features.

2. **Browse Jewelry**: Explore the catalog, click on items to view details, and add favorites.

3. **Profile Editing**: Update your profile information as needed.

4. **Business Users**: For business users, navigate to the "MyCards" page to add new jewelry items.

5. **Admin Users**: Admins can manage cards, users, and view inventory from the admin dashboard.

## Technologies Used

- React
- Redux for state management
- Joi for validation
- Hooks for component logic
- MongoDB for database storage
- Material-UI (MUI) for the user interface
- Jwt-decode

## Contributing

Contributions are welcome! If you would like to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature: `git checkout -b feature-name`.
3. Make your changes and commit them: `git commit -m "Add new feature"`.
4. Push your changes to your forked repository: `git push origin feature-name`.
5. Create a pull request to the main repository.

## License

This project is licensed under the MIT License. See the Tal's Jewelry 2023(LICENSE) file for details.

## Contact

If you have any questions or feedback, please contact us at Sandor_tal@yahoo.com.

Thank you for using Tal's Jewelry Online Shop! We hope you enjoy your shopping experience.
