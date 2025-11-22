// --- DEPARTMENT & DOCTOR DATA ---
const doctorsByDepartment = {
    "General Medicine": ["Dr. A Sharma", "Dr. B Singh"],
    "General Surgery": ["Dr. C Gupta", "Dr. D Patel"],
    "Emergency Medicine": ["Dr. E Rao"],
    "Pediatrics": ["Dr. F Mehta", "Dr. G Kumar"],
    "Obstetrics & Gynecology": ["Dr. H Joshi"],
    "Orthopedics": ["Dr. I Verma"],
    "Dermatology": ["Dr. J Jain"],
    "ENT": ["Dr. K Roy"],
    "Ophthalmology": ["Dr. L Das"],
    "Psychiatry": ["Dr. M Kapoor"],
    "Neurology": ["Dr. N Agarwal"],
    "Neurosurgery": ["Dr. O Mishra"],
    "Cardiology": ["Dr. P Reddy"],
    "Cardiothoracic Surgery": ["Dr. Q Sinha"],
    "Pulmonology": ["Dr. R Chatterjee"],
    "Gastroenterology": ["Dr. S Nair"],
    "Nephrology": ["Dr. T Menon"],
    "Urology": ["Dr. U Saxena"],
    "Endocrinology": ["Dr. V Tripathi"],
    "Rheumatology": ["Dr. W Bhatt"],
    "Hematology": ["Dr. X Singh"],
    "Oncology": ["Dr. Y Gupta"],
    "Infectious Disease": ["Dr. Z Khan"],
    "Plastic & Reconstructive Surgery": ["Dr. AA Sharma"],
    "Vascular Surgery": ["Dr. BB Singh"],
    "Radiology": ["Dr. CC Gupta"],
    "Pathology & Lab Medicine": ["Dr. DD Patel"],
    "Pharmacy": ["Dr. EE Rao"],
    "Physiotherapy / Rehabilitation": ["Dr. FF Mehta"],
    "Anesthesiology": ["Dr. GG Kumar"],
    "Critical Care / ICU": ["Dr. HH Joshi"]
};

// --- INITIAL DASHBOARD VALUES ---
let travelTime = 45; // Minutes
let doctorStatus = "Available";

// --- PAGE LOAD: Populate Departments & Initial Values ---
window.onload = function() {
    // Populate departments
    const deptSelect = document.getElementById('department-select');
    if (deptSelect) {
        Object.keys(doctorsByDepartment).forEach(dept => {
            const opt = document.createElement('option');
            opt.value = dept;
            opt.textContent = dept;
            deptSelect.appendChild(opt);
        });
    }
    // Set initial doctor status and travel time
    const docStatusEl = document.getElementById('doc-status');
    if (docStatusEl) docStatusEl.textContent = doctorStatus;
    const travelTimeEl = document.getElementById('travel-time');
    if (travelTimeEl) travelTimeEl.textContent = travelTime;
};

// --- Populate Doctors When Department Changes ---
const deptSelectEl = document.getElementById('department-select');
if (deptSelectEl) {
    deptSelectEl.addEventListener('change', function() {
        const dept = this.value;
        const doctorSelect = document.getElementById('doctor-select');
        doctorSelect.innerHTML = '<option value="">-- Choose Doctor --</option>';
        if (doctorsByDepartment[dept]) {
            doctorsByDepartment[dept].forEach(doc => {
                const opt = document.createElement('option');
                opt.value = doc;
                opt.textContent = doc;
                doctorSelect.appendChild(opt);
            });
        }
    });
}

// --- Book Appointment Handler ---
function bookAppointment() {
    const dept = document.getElementById('department-select').value;
    const doctor = document.getElementById('doctor-select').value;
    const time = document.getElementById('appt-time').value;
    const msgEl = document.getElementById('appointment-message');
    if (!dept || !doctor || !time) {
        msgEl.textContent = "Please select department, doctor, and time.";
        msgEl.style.color = "red";
        return;
    }
    msgEl.textContent = `Appointment booked with ${doctor} (${dept}) at ${time}.`;
    msgEl.style.color = "green";
    // Show success animation if present
    if (document.getElementById('success-screen')) {
        document.getElementById('success-screen').style.display = 'block';
        setTimeout(() => {
            document.getElementById('success-screen').style.display = 'none';
        }, 2500);
    }
}

// --- MOBILE NUMBER LOGIN SYSTEM ---
let generatedOTP = null;

function sendOTP() {
    const mobile = document.getElementById('mobile-input').value;
    const loginMsg = document.getElementById('login-message');
    if (/^\d{10}$/.test(mobile)) {
        generatedOTP = Math.floor(100000 + Math.random() * 900000).toString();
        document.getElementById('otp-area').style.display = 'block';
        loginMsg.innerText = `OTP sent! (Demo OTP: ${generatedOTP})`;
        loginMsg.style.color = "#007bff";
    } else {
        loginMsg.innerText = 'Enter a valid 10-digit mobile number.';
        loginMsg.style.color = "red";
    }
}



function verifyOTP() {
    const otp = document.getElementById('otp-input').value;
    const loginMsg = document.getElementById('login-message');
    if (otp === generatedOTP) {
        loginMsg.innerText = 'Login successful!';
        loginMsg.style.color = "green";
        document.getElementById('login-section').style.display = 'none';
        document.getElementById('dashboard').classList.remove('hidden');
        showMedicalRecords();
    } else {
        loginMsg.innerText = 'Invalid OTP. Try again.';
        loginMsg.style.color = "red";
    }
}

// --- SIMULATION BUTTONS ---
function simulateTraffic() {
    travelTime += 15;
    document.getElementById('travel-time').textContent = travelTime;
    document.getElementById('notification-area').textContent = "Traffic jam detected! Travel time increased.";
}
function simulateDoctorDelay() {
    doctorStatus = "Delayed";
    document.getElementById('doc-status').textContent = doctorStatus;
    document.getElementById('notification-area').textContent = "Doctor is delayed!";
}
function simulateArrival() {
    document.getElementById('checkin-status').textContent = "Arrived!";
    document.getElementById('checkin-status').classList.remove('pending');
    document.getElementById('checkin-status').classList.add('arrived');
}
function resetDemo() {
    travelTime = 45;
    doctorStatus = "Available";
    document.getElementById('travel-time').textContent = travelTime;
    document.getElementById('doc-status').textContent = doctorStatus;
    document.getElementById('notification-area').textContent = "";
    document.getElementById('checkin-status').textContent = "Waiting for arrival...";
    document.getElementById('checkin-status').classList.remove('arrived');
    document.getElementById('checkin-status').classList.add('pending');
}

// --- GOOGLE MAPS DIRECTIONS API INTEGRATION ---
// Replace with your hospital's latitude and longitude
const hospitalLat = 28.6139;
const hospitalLng = 77.2090;

async function getLocationAndShowRoute() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const patientLat = position.coords.latitude;
            const patientLng = position.coords.longitude;
            const origin = `${patientLat},${patientLng}`;
            const destination = `${hospitalLat},${hospitalLng}`;
            document.getElementById('travel-info').innerText = "Fetching route and travel time...";

            // Show loading animation if present
            if (document.getElementById('loading-screen')) {
                document.getElementById('loading-screen').style.display = 'block';
            }

            try {
                const response = await fetch('http://localhost:3000/api/directions', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ origin, destination })
                });
                const data = await response.json();
                if (document.getElementById('loading-screen')) {
                    document.getElementById('loading-screen').style.display = 'none';
                }
                if (data.routes && data.routes.length > 0) {
                    const leg = data.routes[0].legs[0];
                    const duration = leg.duration.text;
                    const distance = leg.distance.text;
                    document.getElementById('travel-info').innerText =
                        `Estimated travel time: ${duration}, Distance: ${distance}`;
                    // Show Google Maps route in iframe
                    const directionsUrl = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&travelmode=driving`;
                    document.getElementById('map').innerHTML = `<iframe width="100%" height="300" frameborder="0" style="border:0"
                        src="${directionsUrl}" allowfullscreen></iframe>`;
                    // Update dashboard travel time
                    document.getElementById('travel-time').textContent = duration;
                } else {
                    document.getElementById('travel-info').innerText = "No route found.";
                }
            } catch (err) {
                if (document.getElementById('loading-screen')) {
                    document.getElementById('loading-screen').style.display = 'none';
                }
                document.getElementById('travel-info').innerText = "Error fetching directions.";
            }
        }, showLocationError);
    } else {
        document.getElementById('travel-info').innerText = "Geolocation is not supported by this browser.";
    }
}

function showLocationError(error) {
    document.getElementById('travel-info').innerText = "Unable to retrieve your location.";
}

// Show upload modal for a document
function showUpload(docName) {
    document.getElementById('upload-title').innerText = "Upload: " + docName;
    document.getElementById('upload-modal').classList.remove('hidden');
    document.getElementById('upload-status').innerText = "";
    document.getElementById('file-input').value = "";
}

// Close upload modal
function closeUpload() {
    document.getElementById('upload-modal').classList.add('hidden');
}

// Simulate file upload
function uploadFile() {
    const fileInput = document.getElementById('file-input');
    if (fileInput.files.length === 0) {
        document.getElementById('upload-status').innerText = "Please select a file.";
        return;
    }
    document.getElementById('upload-status').innerText = "File uploaded successfully!";
    setTimeout(closeUpload, 1200);
}

// After login, show medical records dashboard
function showMedicalRecords() {
    document.getElementById('medical-records').classList.remove('hidden');
}

// In your verifyOTP function, after showing dashboard, also call showMedicalRecords():
// document.getElementById('dashboard').classList.remove('hidden');
// showMedicalRecords();

const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(express.json());

// Storage config for uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const dir = path.join(__dirname, 'uploads', req.body.docName);
        fs.mkdirSync(dir, { recursive: true });
        cb(null, dir);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage: storage });

// Upload endpoint
app.post('/upload', upload.single('file'), (req, res) => {
    res.json({ success: true, filename: req.file.filename });
});

// List files for a document
app.get('/files/:docName', (req, res) => {
    const dir = path.join(__dirname, 'uploads', req.params.docName);
    if (!fs.existsSync(dir)) return res.json([]);
    const files = fs.readdirSync(dir);
    res.json(files);
});

// Download/view file
app.get('/download/:docName/:filename', (req, res) => {
    const filePath = path.join(__dirname, 'uploads', req.params.docName, req.params.filename);
    res.sendFile(filePath);
});

const PORT = 3001;
app.listen(PORT, () => console.log(`File server running on port ${PORT}`));

let currentDocName = "";

function showUpload(docName) {
    currentDocName = docName;
    document.getElementById('upload-title').innerText = "Upload: " + docName;
    document.getElementById('upload-modal').classList.remove('hidden');
    document.getElementById('upload-status').innerText = "";
    document.getElementById('file-input').value = "";
    listFiles(docName);
}

function closeUpload() {
    document.getElementById('upload-modal').classList.add('hidden');
    document.getElementById('uploaded-files').innerHTML = "";
}

function uploadFile() {
    const fileInput = document.getElementById('file-input');
    if (fileInput.files.length === 0) {
        document.getElementById('upload-status').innerText = "Please select a file.";
        return;
    }
    const formData = new FormData();
    formData.append('file', fileInput.files[0]);
    formData.append('docName', currentDocName);

    fetch('http://localhost:3001/upload', {
        method: 'POST',
        body: formData
    })
    .then(res => res.json())
    .then(data => {
        if (data.success) {
            document.getElementById('upload-status').innerText = "File uploaded successfully!";
            listFiles(currentDocName);
        } else {
            document.getElementById('upload-status').innerText = "Upload failed.";
        }
    })
    .catch(() => {
        document.getElementById('upload-status').innerText = "Upload error.";
    });
}

function listFiles(docName) {
    fetch(`http://localhost:3001/files/${encodeURIComponent(docName)}`)
        .then(res => res.json())
        .then(files => {
            const filesDiv = document.getElementById('uploaded-files');
            if (files.length === 0) {
                filesDiv.innerHTML = "<em>No files uploaded yet.</em>";
                return;
            }
            filesDiv.innerHTML = files.map(filename =>
                `<div>
                    <a href="http://localhost:3001/download/${encodeURIComponent(docName)}/${encodeURIComponent(filename)}" target="_blank">${filename}</a>
                </div>`
            ).join('');
        });
}