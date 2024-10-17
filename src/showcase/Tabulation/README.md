## Tabulation Component Documentation

### Introduction
The Tabulation Component is a comprehensive React TypeScript component designed to showcase advanced data table functionalities. It demonstrates proficiency in state management, hooks, event handling, and styling. The component includes features such as dynamic pagination, sorting, filtering, and responsive design, all implemented without relying on external UI libraries.

### Features
- **Dynamic Pagination:** Custom pagination controls with page size selection and navigational buttons.
- **Sorting:** Clickable column headers for sorting data in ascending or descending order.
- **Filtering and Search:** Real-time search input to filter data based on user input.
- **Responsive Design:** Adapts to different screen sizes for optimal user experience.
- **Custom Styling:** Styled using CSS Modules to resemble Material UI aesthetics.
- **TypeScript Support:** Utilizes TypeScript interfaces and types for robust type safety.
- **Accessibility:** Includes proper semantic HTML and ARIA attributes where applicable.

### Usage
1. **Start the Development Server:**
```
yarn start
```

2. **Access the Component:**

Open your browser and navigate to `http://localhost:3000/tabulation`.

3. **Interact with the Interface:**

- Use the search bar to filter results.
- Click on column headers to sort data.
- Change the number of rows per page using the dropdown.
- Navigate through pages using the pagination controls.

### Code Explanation:
- Imports:
  - `useState`, `useEffect` from `React` for state and side-effect management.
  - data from `data.json` as the data source.
  - styles from the CSS module for styling.
- DataItem Interface:
  - Defines the structure of each data item with id, name, email, and age properties.
- Component State:
  - **searchTerm:** Holds the current search input value.
  - **sortField:** Indicates the field by which data is sorted.
  - **sortOrder:** Specifies the sorting order ('asc' or 'desc').
  - **pageSize:** Number of rows displayed per page.
  - **currentPage:** The current page number.
  - **filteredData:** The data after applying search and sort filters.
- useEffect Hook:
  - Watches for changes in searchTerm, sortField, and sortOrder.
  - Filters and sorts the data accordingly.
  - Resets currentPage to 1 whenever data changes.
- Pagination Logic:
  - Calculates totalPages based on filteredData and pageSize.
  - Uses generatePageNumbers to create an array of page numbers with ellipsis for large ranges.
  - `paginatedData` slices `filteredData` to get data for the current page.
- Event Handlers:
  - **handleSearch:** Updates searchTerm when the search input changes.
  - **handleSort:** Toggles sorting order or sets a new sortField.
  - **handlePageSizeChange:** Updates pageSize when a new value is selected.
  - **goToPage:** Updates currentPage when a pagination button is clicked.
- Rendering:
  - **Top Bar:** Includes search input, sort options, and page size selector.
  - **Table:** Displays the paginated data with clickable headers for sorting.
  - **Pagination Controls:** Provides navigation through pages with buttons and ellipsis. 

### State and Logic
- **Search Functionality:**
  - Filters data based on searchTerm matching name or email.
- **Sorting Mechanism:**
  - Sorts filteredData based on sortField and sortOrder.
- **Dynamic Pagination:**
  - Handles different scenarios for displaying page numbers, including ellipsis when appropriate.
- **TypeScript Generics and Type Safety:**
  - Ensures that state and functions are strongly typed for reliability and maintainability.


### Styling Details:

- **Container:**
  - Centers the content and sets a maximum width for readability.
  - Adds padding for spacing.
- **Heading:**
  - Centers the title with a modern font and neutral color.
- **Top Bar:**
  - Uses flexbox for layout, adjusts for responsiveness with flex-wrap.
  - Includes spacing and alignment for child elements.
- **Search Input:**
  - Styled with padding, border, and rounded corners.
  - Focus state changes border color for visual feedback.
- **Sort Options:**
  - Dropdowns and buttons are styled for consistency and usability.
  - Includes hover and focus effects.
- **Table:**
  - Uses box-shadow for subtle elevation effect.
  - Alternating row colors improve readability.
  - Hover effects on headers indicate interactivity.
- **Pagination Controls:**
  - Rounded buttons with spacing.
  - Active page is highlighted.
  - Ellipsis styled as non-interactive indicators.
- **Responsive Design:**
  - Media queries adjust layout on smaller screens.
  - Ensures usability across devices.


### Accessibility Considerations
- **Semantic HTML:**
  - Uses appropriate elements (`<table>`, `<th>`, `<tr>`, `<td>`) for data representation.
- **Interactive Elements:**
  - Table headers are clickable and indicate sorting functionality.
  - Inputs and buttons are accessible via keyboard navigation.
- **Labels and Placeholders:**
  - Inputs have placeholders and labels for clarity.
- **Focus States:**
  - Focus styles are applied to inputs and select elements for better accessibility. 

### Responsive Design
- **Flexbox Layouts:**
  - Utilizes flexbox for flexible and adaptive layouts.
- **Media Queries:**
  - Adjusts layout and spacing on screens smaller than 600px.
- **Mobile Usability:**
  - Ensures that inputs and buttons are easily tappable on touch devices.

### Advanced Techniques and Optimizations
- **Efficient State Management:**
  - Minimizes unnecessary re-renders by carefully structuring state dependencies.
- `useEffect` **Dependencies:**
  - Dependencies are accurately specified to ensure side effects run appropriately.
- **TypeScript Types:**
  - Uses interfaces and type annotations throughout for type safety.
- **Modular CSS:**
  - Employs CSS Modules to scope styles locally and avoid conflicts.
- **Dynamic Rendering:**
- Pagination and table data update dynamically based on state changes.

