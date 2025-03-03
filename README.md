# Web App Instructions

## Analysis

This React web application is built with TypeScript and includes a `TaskForm` component, which handles task creation by managing form state and using controlled components. The form features include:

- **Controlled Inputs:** The component uses the useState hook to control form inputs for task fields like name, start date, end date, comments, and assigned team.
- **Native Date Pickers:** HTML5 date input components provide a built-in calendar for date selection.
- **Modal Design:** The component is rendered inside a modal view whose CSS positions the close button (with class `cb`) on the top-right with a red background.
- **Functional Logic:** Simple logic handles form submission by calling the provided `onSubmit` prop with the task data, followed by `onClose` to close the modal.

## Running the App in Microsoft Edge

### 1. Install Dependencies
Open your terminal and navigate to your project directory, then run:

```
npm install
```

This installs all necessary dependencies using npm.

### 2. Start the Development Server
In your terminal, run:

```
npm start
```

This command starts the React development server on `http://localhost:3000`.

### 3. Open in Microsoft Edge
With the development server running, open Microsoft Edge and navigate to:

```
http://localhost:3000
```

Alternatively, you can run this command in your terminal in Windows (it will open Edge if it is your default browser for this command):

```
start microsoft-edge:http://localhost:3000
```

### Summary
By following the above steps, your React app should be up and running in Microsoft Edge. The app includes a functional modal with a close button, date picker controls, and task management functionality. If you encounter any issues, check your terminal for errors and ensure your environment is set up correctly. 