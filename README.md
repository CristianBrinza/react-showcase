
# 🌟 **React Showcase** 🌟

Welcome to **React Showcase**, a portfolio project that demonstrates various technical skills using React, TypeScript, and modern development techniques! 🚀

Explore the live demo: [React Showcase](https://reactshowcase.pages.dev/) 🌐

---

## 🛠️ **Project Overview**

This project is a showcase of my **React** development skills. Each page demonstrates a unique feature, functionality, or implementation approach to solving common front-end challenges.

The main features include:

- 📊 **Tabulation**: Explore advanced table features with pagination, sorting, filtering, and more.
- 🖱️ **Drag-and-Drop**: Interact with a drag-and-drop interface built from scratch, demonstrating component-based design and React hooks.
- 🛠️ **Custom Tools**: More technical showcases coming soon!

---

## 🎯 **Key Features**

- **Dynamic Routing**: Routes and navigation links are dynamically generated from a `pages.json` file for easy scalability and maintainability.
- **Responsive Design**: Every component is fully responsive and adapts to mobile, tablet, and desktop screens. 📱💻
- **TypeScript**: TypeScript is used across the project to ensure type safety and improve code quality. 🛡️
- **Custom Styling**: Styled using CSS modules to ensure isolated, clean, and maintainable styles. 🎨
- **Best Practices**: Implements React hooks, reusable components, and custom hooks to demonstrate clean, reusable code.

---

## ⚙️ **Installation and Setup**

To run the project locally:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/CristianBrinza/react-showcase.git
   cd react-showcase
   ```

2. **Install dependencies**:
   ```bash
   yarn install
   ```

3. **Run the development server**:
   ```bash
   yarn start
   ```

4. Open your browser and navigate to `http://localhost:3000` to explore the React Showcase locally. 🌍

---

## 📁 **Project Structure**

```plaintext
react-showcase/
├── src/
│   ├── pages/
│   │   ├── Home.tsx        # The main landing page
│   │   └── Home.module.css # Styling for the home page
│   ├── showcase/
│   │   ├── tabulation/     # Tabulation showcase folder
│   │   │   ├── Tabulation.tsx
│   │   │   └── Tabulation.module.css
│   │   ├── drag-and-drop/  # Drag-and-Drop showcase folder
│   │   │   ├── DragAndDrop.tsx
│   │   │   └── DragAndDrop.module.css
│   │   └── ...
│   │   
│   ├── App.tsx             # The main app component
│   ├── pages.json          # JSON file for dynamic routing
│   └── index.tsx           # Entry point of the app
├── public/
│   └── index.html
├── package.json            # Project metadata and scripts
└── tsconfig.json           # TypeScript configuration
```

---

## 📚 **How It Works**

- **Dynamic Routing**: All the routes and links are automatically generated from the `pages.json` file, making it super easy to add new showcases without modifying the main code structure.

Simply add a new entry in `pages.json`, and the app will handle the rest! 🔥

  Example:
  ```json
  {
    "path": "/new-feature",
    "name": "New Feature",
    "description": "Explore the newly added feature.",
    "component": "NewFeatureComponent"
  }
  ```

- **Components**: The project follows a component-based architecture, with each feature encapsulated in its own folder (e.g., `tabulation`, `drag-and-drop`), ensuring clean and maintainable code.

- **Styling**: The project uses **CSS Modules** to keep the styles scoped to their respective components. This avoids conflicts and makes styling more modular and maintainable.

---

## ✨ **Features Showcased**

### 📊 **Tabulation Component**
A feature-rich table with:
- Pagination 🔢
- Sorting (by columns) 🔀
- Filtering (by search) 🔍

### 🖱️ **Drag-and-Drop Component**
A custom-built drag-and-drop interface showcasing:
- React hooks (`useState`, `useRef`, `useEffect`)
- Smooth drag-and-drop interactions 🎛️
- State management and reordering of items

---

## 🔮 **Future Plans**

I plan to keep adding more technical showcases to this project, including:
- ⚙️ **Form Validation**
- 🖼️ **Image Gallery with Lazy Loading**
- 📦 **State Management with Context API**
- 🎨 **Theme Switcher (Dark/Light Mode)**

---

## 💡 **Contributing**

Contributions are welcome! If you'd like to contribute:

1. **Fork the repository**.
2. **Create a new branch** for your feature:
   ```bash
   git checkout -b my-new-feature
   ```
3. **Commit your changes**:
   ```bash
   git commit -m 'Add some feature'
   ```
4. **Push to the branch**:
   ```bash
   git push origin my-new-feature
   ```
5. **Open a pull request**. 🎉

---

## 👨‍💻 **Contact Information**

- **Portfolio**: [cristianbrinza.com](https://cristianbrinza.com)
- **Email**: [inbox@cristianbrinza.com](mailto:inbox@cristianbrinza.com)

---

## 🌟 **License**

This project is licensed under the MIT License. Feel free to use it for your own projects! ✨

---
Enjoy coding! 💻✨

Have fun exploring my **React Showcase** and feel free to reach out if you have any questions or suggestions! 💬😊



