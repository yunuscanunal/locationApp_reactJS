# Location App (ReactJS & Next.js)

📄 Available in: [English](README.md) | [Türkçe](README.tr.md)

This project is a web application that allows users to add, edit, delete locations on a map, and draw the shortest route based on these locations. The application is developed using modern web technologies such as Next.js, React, Chakra UI, and Leaflet.

**[Live Demo](https://location-app-react-js.vercel.app/)**

## Features

- **Add Location**: You can add new locations by clicking on the map or searching. You can assign a custom name and color to each location.
- **List Locations**: You can view all added locations in a list.
- **Edit Location**: You can update the name, color, and position on the map of existing locations.
- **Delete Location**: You can delete desired locations from the list.
- **Draw Route**: Starting from your current position, you can draw the shortest route to all saved locations on the map.
- **Data Persistence**: Added locations are stored in the browser's local storage, so data is not lost when the page is refreshed.

## Technologies Used

- **Next.js**: A React framework that offers server-side rendering and static site generation capabilities.
- **React**: A JavaScript library for building user interfaces.
- **Chakra UI**: A modular component library for creating fast and accessible React applications.
- **Leaflet**: An open-source JavaScript library for interactive maps.
- **Zustand**: A small, fast, and scalable state management solution.
- **TypeScript**: A language that adds static types to JavaScript.
- **Jest & React Testing Library**: Tools used for application testing.

## Installation and Setup

Follow the steps below to run the project on your local machine:

1.  **Clone the Project:**

    ```bash
    git clone [https://github.com/yunuscanunal/locationapp_reactjs.git](https://github.com/yunuscanunal/locationapp_reactjs.git)
    cd locationapp_reactjs
    ```

2.  **Install Dependencies:**

    ```bash
    npm install
    ```

3.  **Start the Development Server:**
    ```bash
    npm run dev
    ```
    The application will start running at `http://localhost:3000`.

## Available Scripts

- `npm run dev`: Starts the application in development mode.
- `npm run build`: Builds the application for production.
- `npm run start`: Runs the production build.
- `npm run lint`: Checks the code style and potential errors.
- `npm run test`: Runs the tests in interactive mode.
- `npm run test:ci`: Runs the tests for CI/CD environments.

## Tests

The project is tested using Jest and React Testing Library to ensure that components and functions work correctly. To run the tests:

```bash
npm test
```
