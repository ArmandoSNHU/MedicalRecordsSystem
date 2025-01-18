const searchButton = document.getElementById('search-btn');
const addButton = document.getElementById('add-patient-btn');
const resultsDiv = document.getElementById('results');
const detailsSection = document.getElementById('details-section');
const searchSection = document.getElementById('search-section');
const patientInfoDiv = document.getElementById('patient-info');
const patientForm = document.getElementById('patient-form');
const patientIdInput = document.getElementById('patient-id');
const patientNameInput = document.getElementById('patient-name');
const patientDobInput = document.getElementById('patient-dob');
const patientAddressInput = document.getElementById('patient-address');
const patientPhoneInput = document.getElementById('patient-phone');

// Fetch and display patients
searchButton.addEventListener('click', () => {
    const searchInput = document.getElementById('search').value.trim().toLowerCase();

    if (!searchInput) {
        resultsDiv.innerHTML = '<p>Please enter a patient name to search.</p>';
        return;
    }

    fetch(`/api/patients?name=${searchInput}`)
        .then(response => response.json())
        .then(data => {
            if (data.length === 0) {
                resultsDiv.innerHTML = '<p>No matching patients found.</p>';
                return;
            }

            let html = '<ul>';
            data.forEach(patient => {
                html += `<li>
                    <strong>${patient.Name}</strong> (DOB: ${patient.DOB})
                    <button onclick="viewPatient(${patient.PatientID})">View</button>
                    <button onclick="editPatient(${patient.PatientID})">Edit</button>
                </li>`;
            });
            html += '</ul>';
            resultsDiv.innerHTML = html;
        })
        .catch(err => {
            resultsDiv.innerHTML = '<p>Error fetching records. Please try again later.</p>';
            console.error(err);
        });
});

// View patient details
window.viewPatient = (id) => {
    fetch(`/api/patients/${id}`)
        .then(response => response.json())
        .then(patient => {
            patientInfoDiv.innerHTML = `
                <p><strong>ID:</strong> ${patient.PatientID}</p>
                <p><strong>Name:</strong> ${patient.Name}</p>
                <p><strong>Date of Birth:</strong> ${patient.DOB}</p>
                <p><strong>Address:</strong> ${patient.Address}</p>
                <p><strong>Phone Number:</strong> ${patient.PhoneNumber}</p>
            `;
            searchSection.style.display = 'none';
            detailsSection.style.display = 'block';
        })
        .catch(err => {
            patientInfoDiv.innerHTML = `
                <p>Error loading patient details. Please try again later.</p>
            `;
            console.error(err);
        });
};

// Edit patient (form functionality)
window.editPatient = (id) => {
    fetch(`/api/patients/${id}`)
        .then(response => response.json())
        .then(patient => {
            patientIdInput.value = patient.PatientID;
            patientNameInput.value = patient.Name;
            patientDobInput.value = patient.DOB;
            patientAddressInput.value = patient.Address || '';
            patientPhoneInput.value = patient.PhoneNumber || '';

            searchSection.style.display = 'none';
            detailsSection.style.display = 'block';
        })
        .catch(err => {
            console.error('Error fetching patient details:', err);
        });
};
