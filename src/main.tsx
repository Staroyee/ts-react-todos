// Importing the ReactDOM library from 'react-dom/client'.
import ReactDOM from 'react-dom/client';

// Importing the main App component from the 'App.tsx' file.
import App from './App.tsx';

// Importing the styles from the 'index.css' file.
import './index.css';

// Using ReactDOM.createRoot to create a root for rendering the React application.
// The root element is obtained using document.getElementById('root').
// The '!' is used to assert that the element with the id 'root' exists.
// The render method is immediately called on the created root, rendering the main App component.
ReactDOM.createRoot(document.getElementById('root')!).render(
    <App />
);
