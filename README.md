# Medical Records System

The **Medical Records System** is a comprehensive web-based application designed to simplify and streamline the management of patient records. It allows clerks to search, view, add, edit, and manage patient data seamlessly. This project demonstrates a robust understanding of web development, database integration, and modern user interface design.

---

## 🌟 Features

1. **Search for Patients**
   - Search by patient name using a dynamic search bar.
   - View patient details and edit records directly from the search results.

2. **View Patient Information**
   - View detailed information for a specific patient, including:
     - Name
     - Date of Birth
     - Address
     - Phone Number

3. **Add New Patients**
   - Easily add new patient records via an intuitive form.

4. **Edit Existing Records**
   - Modify patient information directly from the application.

5. **Responsive Design**
   - A clean, user-friendly interface optimized for desktop and mobile use.

---

## 🚀 Technology Stack

1. **Frontend**
   - HTML5
   - CSS3
   - JavaScript (ES6+)

2. **Backend**
   - Node.js with Express.js

3. **Database**
   - SQLite for managing patient records.

4. **Version Control**
   - Git and GitHub for source code management.

---

## 🛠️ Installation Instructions

Follow these steps to set up and run the Medical Records System locally:

### Prerequisites
- [Node.js](https://nodejs.org/) installed on your system.
- [Git](https://git-scm.com/) for version control.

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/YourUsername/MedicalRecordsSystem.git
   cd MedicalRecordsSystem
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up the SQLite database:
   - Ensure the `medical_records.db` file is in the project directory (e.g., `D:/VSC/MedicalRecordsSystem/sqlite-dll-win-x64-3480000/medical_records.db`).
   - Run the following command to ensure the database schema is correct:
     ```sql
     CREATE TABLE IF NOT EXISTS Patients (
         PatientID INTEGER PRIMARY KEY AUTOINCREMENT,
         Name TEXT NOT NULL,
         DOB DATE NOT NULL,
         Address TEXT,
         PhoneNumber TEXT
     );
     ```

4. Start the server:
   ```bash
   node app.js
   ```

5. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

---

## 📂 Project Structure

```
MedicalRecordsSystem/
├── app.js              # Backend server and API endpoints
├── index.html          # Main frontend interface
├── style.css           # Stylesheet for the application
├── script.js           # JavaScript for frontend functionality
├── sqlite-dll-win-x64-3480000/
│   └── medical_records.db  # SQLite database
├── package.json        # Node.js project configuration
└── README.md           # Project documentation
```

---

## 🧩 API Endpoints

### 1. **Search Patients**
   - **Endpoint**: `/api/patients?name=<searchTerm>`
   - **Method**: `GET`
   - **Description**: Searches for patients whose name matches the provided term.

### 2. **Get Patient Details**
   - **Endpoint**: `/api/patients/:id`
   - **Method**: `GET`
   - **Description**: Fetches the details of a specific patient by ID.

### 3. **Add a New Patient**
   - **Endpoint**: `/api/patients`
   - **Method**: `POST`
   - **Request Body**:
     ```json
     {
       "name": "John Doe",
       "dob": "1990-01-01",
       "address": "123 Main St",
       "phone": "1234567890"
     }
     ```
   - **Description**: Adds a new patient to the database.

### 4. **Edit a Patient**
   - **Endpoint**: `/api/patients`
   - **Method**: `PUT`
   - **Request Body**:
     ```json
     {
       "id": 1,
       "name": "John Doe Updated",
       "dob": "1990-01-01",
       "address": "456 Elm St",
       "phone": "9876543210"
     }
     ```
   - **Description**: Updates the details of an existing patient.

---


## 📈 Future Improvements

1. Add **authentication** for secure access.
2. Implement **pagination** for large patient records.
3. Add support for **file uploads** (e.g., patient images, documents).
4. Enhance the UI with modern frameworks like **Bootstrap** or **Tailwind CSS**.

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add feature-name"
   ```
4. Push to your branch:
   ```bash
   git push origin feature-name
   ```
5. Submit a pull request.

---

## 📝 License

This project is licensed under the [MIT License](LICENSE).

---

## 🧑‍💻 Author

Armando Gomez  
- GitHub: [ArmandoSNHU](https://github.com/ArmandoSNHU)  
- Email: armandogom83@yahoo.com  

-
