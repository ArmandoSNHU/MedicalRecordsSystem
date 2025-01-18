const form = document.getElementById('patientForm');
const recordsContainer = document.getElementById('patientRecords');

let patients = [];

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const dob = document.getElementById('dob').value;
    const address = document.getElementById('address').value;
    const history = document.getElementById('history').value;

    const patient = { name, dob, address, history };
    patients.push(patient);
    displayRecords();
    form.reset();
});

function displayRecords() {
    recordsContainer.innerHTML = '';
    patients.forEach((patient, index) => {
        const record = document.createElement('div');
        record.innerHTML = `
            <h3>${patient.name}</h3>
            <p>DOB: ${patient.dob}</p>
            <p>Address: ${patient.address}</p>
            <p>Medical History: ${patient.history}</p>
        `;
        recordsContainer.appendChild(record);
    });
}
