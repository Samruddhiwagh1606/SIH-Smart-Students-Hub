// Smart Student Hub - Application Logic

// Data structures
let appData = {
    colleges: [],
    users: [],
    activities: [],
    projects: [],
    currentUser: null
};

// Initialize application
function seed() {
    if (localStorage.getItem('ssh_initialized')) return;

    // Colleges data
    const colleges = [
        {id: 'sju', name: 'Sanjivani University'},
        {id: 'scoe', name: 'Sanjivani College of Engineering'}
    ];

    // Demo users
    const users = [
        {
            username: 'student1',
            password: 'pass',
            role: 'student',
            college: 'scoe',
            name: 'A. Student',
            prn: 'PRN1001',
            program: 'Computer Engineering',
            email: 'student1@scoe.edu'
        },
        {
            username: 'student2',
            password: 'pass',
            role: 'student',
            college: 'sju',
            name: 'Samruddhi Wagh',
            prn: '2124UCEF1056',
            program: 'Computer Engineering',
            email: 'student2@sju.edu'
        },
        {
            username: 'faculty1',
            password: 'pass',
            role: 'faculty',
            college: 'scoe',
            name: 'Prof. Meera',
            department: 'Computer Engineering',
            email: 'prof.meera@scoe.edu'
        },
        {
            username: 'faculty2',
            password: 'pass',
            role: 'faculty',
            college: 'sju',
            name: 'Prof. Sharma',
            department: 'Computer Engineering',
            email: 'prof.sharma@sju.edu'
        },
        {
            username: 'admin1',
            password: 'pass',
            role: 'admin',
            college: 'scoe',
            name: 'Admin - SCOE',
            email: 'admin@scoe.edu'
        },
        {
            username: 'admin2',
            password: 'pass',
            role: 'admin',
            college: 'sju',
            name: 'Admin - SJU',
            email: 'admin@sju.edu'
        }
    ];

    // Sample activities
    const activities = [
    {
        id: 'a1',
        studentId: 'student2',
        title: 'Developer Students Club - Design & Graphics Leader',
        type: 'Club',
        date: '2024-05-20',
        organizer: 'Sanjivani University - DSC',
        level: 'College',
        description: 'Served as Design and Graphics Leader in Developer Students Club.',
        status: 'Pending',
        points: 0,
        proofFile: 'dsc_leadership_certificate.pdf'
    },
    {
        id: 'a2',
        studentId: 'student2',
        title: '250 Questions Completed on CodeChef',
        type: 'Competition',
        date: '2024-04-05',
        organizer: 'CodeChef',
        level: 'National',
        description: 'Solved 250 coding problems on CodeChef.',
        status: 'Approved',
        points: 6,
        proofFile: 'codechef_certificate.pdf',
        approvedBy: 'faculty2',
        approvedDate: '2024-04-08'
    },
    
   {
    id: 'a4',
    studentId: 'student2',
    title: 'Eureka Pitching Competition',
    type: 'Competition',
    date: '2024-06-01',
    organizer: 'Eureka Startup Cell',
    level: 'National',
    description: 'Presented innovative project ideas to industry mentors.',
    status: 'Pending', // changed from 'Approved' to 'Pending'
    points: 8,
    proofFile: 'eureka_certificate.pdf',
    approvedBy: null,       // no faculty approval yet
    approvedDate: null       // no approved date yet
}

];

    // Sample projects
    const projects = [
        {
            id: 'p1',
            studentId: 'student1',
            title: 'Smart Campus Management System',
            type: 'Academic Project',
            startDate: '2024-01-01',
            endDate: '2024-05-30',
            description: 'Developed a comprehensive web application for campus management with features for student registration, course management, and fee tracking.',
            technologies: 'React, Node.js, MongoDB, Express.js',
            teamSize: '3-4',
            role: 'Full-Stack Developer',
            githubLink: 'https://github.com/student1/campus-management',
            demoLink: 'https://campus-mgmt-demo.netlify.app',
            mentor: 'Prof. Meera',
            status: 'Approved',
            points: 7,
            approvedBy: 'faculty1',
            approvedDate: '2024-06-01'
        },
        {
            id: 'p2',
            studentId: 'student2',
            title: 'AI-Powered Chatbot',
            type: 'Research Project',
            startDate: '2024-02-15',
            endDate: '2024-07-15',
            description: 'Created an intelligent chatbot using NLP techniques for customer support automation.',
            technologies: 'Python, TensorFlow, Flask, SQLite',
            teamSize: '2',
            role: 'AI Developer',
            githubLink: 'https://github.com/student2/ai-chatbot',
            mentor: 'Prof. Sharma',
            status: 'Approved',
            points: 8,
            approvedBy: 'faculty2',
            approvedDate: '2024-07-20'
        }
    ];

    // Save to localStorage
    saveData('colleges', colleges);
    saveData('users', users);
    saveData('activities', activities);
    saveData('projects', projects);
    
    localStorage.setItem('ssh_initialized', 'true');
}
// ================== STUDENT DASHBOARD LOGIC ==================

// ================== STUDENT DASHBOARD LOGIC ==================

// Get stats for a particular student
function getStudentStats(studentId) {
    const studentActivities = appData.activities.filter(a => a.studentId === studentId);

    const approved = studentActivities.filter(a => a.status === "Approved").length;
    const pending = studentActivities.filter(a => a.status === "Pending").length;
    const total = studentActivities.length;

    return { approved, pending, total };
}

// ================== GET CURRENT USER ==================
function getCurrentUser() {
    return JSON.parse(localStorage.getItem('currentUser'));
}

// ================== INIT STUDENT DASHBOARD ==================
function initStudentDashboard() {
    const currentUser = getCurrentUser();
    if (!currentUser) return;

    // ✅ Filter activities belonging to this student
    const activities = getData('activities').filter(
        a => a.studentId === currentUser.username
    );

    const approved = activities.filter(a => a.status === "Approved");
    const pending = activities.filter(a => a.status === "Pending");

    // Example: 5 points per approved activity
    const points = approved.length * 5;

    // ✅ Update profile info
    document.getElementById("studentName").textContent = currentUser.name;
    document.getElementById("studentPRN").textContent = currentUser.prn;
    document.getElementById("studentProgram").textContent = currentUser.program;
    document.getElementById("studentCollege").textContent = getCollegeName(currentUser.college);

    // ✅ Update stats
    document.getElementById("approvedCount").textContent = approved.length;
    document.getElementById("pendingCount").textContent = pending.length;
    document.getElementById("totalPoints").textContent = points;

    // ✅ Recent activities list
    const activitiesList = document.getElementById("activitiesList");
    activitiesList.innerHTML = "";
    activities.forEach(a => {
        const div = document.createElement("div");
        div.classList.add("activity-item");
        div.textContent = `${a.title} - ${a.status}`;
        activitiesList.appendChild(div);
    });
}

// Show Modals
function showAddFacultyModal() {
    document.getElementById("addFacultyModal").classList.remove("hidden");
}
function showAddStudentModal() {
    document.getElementById("addStudentModal").classList.remove("hidden");
}
function hideModal(id) {
    document.getElementById(id).classList.add("hidden");
}

// Add Faculty
function addFaculty() {
    const name = document.getElementById("facultyName").value;
    const email = document.getElementById("facultyEmail").value;
    const password = document.getElementById("facultyPassword").value;

    if (!name || !email || !password) {
        alert("Please fill all fields!");
        return;
    }

    const users = getData("users");
    users.push({
        username: email,   // login ID = email
        password: password,
        role: "faculty",
        name: name,
        email: email,
        college: "scoe"   // you can adjust to selected college
    });
    saveData("users", users);

    alert("Faculty added successfully!");
    hideModal("addFacultyModal");
    initAdminDashboard(); // refresh summary
}

// Add Student
function addStudent() {
    const name = document.getElementById("studentName").value;
    const email = document.getElementById("studentEmail").value;
    const password = document.getElementById("studentPassword").value;

    if (!name || !email || !password) {
        alert("Please fill all fields!");
        return;
    }

    const users = getData("users");
    users.push({
        username: email,   // login ID = email
        password: password,
        role: "student",
        name: name,
        email: email,
        prn: "PRN" + Math.floor(Math.random() * 10000), // auto PRN
        program: "Computer Engineering",  // default
        college: "scoe"
    });
    saveData("users", users);

    alert("Student added successfully!");
    hideModal("addStudentModal");
    initAdminDashboard(); // refresh summary
}


// Render student dashboard
function renderStudentDashboard(student) {
    const stats = getStudentStats(student.id); // student.id = "student2"

    document.getElementById("studentName").innerText = student.name;
    document.getElementById("studentPRN").innerText = student.prn;
    document.getElementById("studentDept").innerText = student.program;
    document.getElementById("studentCollege").innerText = getCollegeName(student.college);

    document.getElementById("approvedCount").innerText = stats.approved;
    document.getElementById("pendingCount").innerText = stats.pending;
    document.getElementById("totalCount").innerText = stats.total;
}





// Data management functions
function getData(key) {
    try {
        return JSON.parse(localStorage.getItem(`ssh_${key}`)) || [];
    } catch {
        return [];
    }
}

function saveData(key, data) {
    localStorage.setItem(`ssh_${key}`, JSON.stringify(data));
}

function getCurrentUser() {
    try {
        return JSON.parse(sessionStorage.getItem('ssh_currentUser'));
    } catch {
        return null;
    }
}

function setCurrentUser(user) {
    sessionStorage.setItem('ssh_currentUser', JSON.stringify(user));
}

// Authentication functions
function handleLogin(college, username, password) {
    const users = getData('users');
    const user = users.find(u => u.username === username && u.password === password);
    
    if (!user) {
        return {
            success: false,
            message: 'Invalid username or password. Please check your credentials.'
        };
    }
    
    if (user.college !== college) {
        const colleges = getData('colleges');
        const userCollege = colleges.find(c => c.id === user.college);
        return {
            success: false,
            message: `This user belongs to ${userCollege.name}. Please select the correct college and try again.`
        };
    }
    
    setCurrentUser(user);
    
    // Redirect based on role
    const redirects = {
        'student': 'student_dashboard.html',
        'faculty': 'faculty_dashboard.html',
        'admin': 'admin_dashboard.html'
    };
    
    return {
        success: true,
        redirect: redirects[user.role]
    };
}

function logout() {
    sessionStorage.removeItem('ssh_currentUser');
    window.location.href = 'index.html';
}

// Dashboard initialization functions
function initStudentDashboard() {
    const currentUser = getCurrentUser();
    if (!currentUser || currentUser.role !== 'student') {
        window.location.href = 'login.html';
        return;
    }
    
    // Update UI with user info
    document.getElementById('userWelcome').textContent = `Welcome, ${currentUser.name}`;
    document.getElementById('studentName').textContent = currentUser.name;
    document.getElementById('studentPRN').textContent = currentUser.prn;
    document.getElementById('studentProgram').textContent = currentUser.program;
    
    const colleges = getData('colleges');
    const college = colleges.find(c => c.id === currentUser.college);
    document.getElementById('studentCollege').textContent = college.name;
    
    // Load activities and calculate stats
    const activities = getData('activities').filter(a => a.studentId === currentUser.username);
    const projects = getData('projects').filter(p => p.studentId === currentUser.username);
    
    const approved = activities.filter(a => a.status === 'Approved');
    const pending = activities.filter(a => a.status === 'Pending');
    const totalPoints = approved.reduce((sum, a) => sum + (a.points || 0), 0) + 
                       projects.filter(p => p.status === 'Approved').reduce((sum, p) => sum + (p.points || 0), 0);
    const badge = computeBadge(totalPoints);
    
    document.getElementById('approvedCount').textContent = approved.length + projects.filter(p => p.status === 'Approved').length;
    document.getElementById('pendingCount').textContent = pending.length + projects.filter(p => p.status === 'Pending').length;
    document.getElementById('totalPoints').textContent = totalPoints;
    document.getElementById('currentBadge').textContent = badge;
    
    // Populate recent activities
    const allItems = [...activities, ...projects].sort((a, b) => new Date(b.date || b.startDate) - new Date(a.date || a.startDate));
    populateActivitiesList(allItems.slice(0, 5));
}

function initFacultyDashboard() {
    const currentUser = getCurrentUser();
    if (!currentUser || currentUser.role !== 'faculty') {
        window.location.href = 'login.html';
        return;
    }
    
    // Update UI with faculty info
    document.getElementById('facultyWelcome').textContent = `Welcome, ${currentUser.name}`;
    document.getElementById('facultyName').textContent = currentUser.name;
    document.getElementById('facultyDept').textContent = currentUser.department;
    
    const colleges = getData('colleges');
    const college = colleges.find(c => c.id === currentUser.college);
    document.getElementById('facultyCollege').textContent = college.name;
    
    // Load pending approvals
    const activities = getData('activities').filter(a => a.status === 'Pending');
    const projects = getData('projects').filter(p => p.status === 'Pending');
    const allPending = [...activities, ...projects];
    
    // Filter by college
    const users = getData('users');
    const collegePending = allPending.filter(item => {
        const student = users.find(u => u.username === item.studentId);
        return student && student.college === currentUser.college;
    });
    
    document.getElementById('pendingCount').textContent = collegePending.length;
    populatePendingList(collegePending);
    
    // Load students for management
    loadStudents();
}

function initAdminDashboard() {
    const currentUser = getCurrentUser();
    if (!currentUser || currentUser.role !== 'admin') {
        window.location.href = 'login.html';
        return;
    }
    
    // Update UI with admin info
    document.getElementById('adminWelcome').textContent = `Welcome, ${currentUser.name}`;
    document.getElementById('adminName').textContent = currentUser.name;
    
    const colleges = getData('colleges');
    const college = colleges.find(c => c.id === currentUser.college);
    document.getElementById('adminCollege').textContent = college.name;
    
    // Calculate institution stats
    const users = getData('users');
    const activities = getData('activities');
    
    const collegeUsers = users.filter(u => u.college === currentUser.college);
    const students = collegeUsers.filter(u => u.role === 'student');
    const faculty = collegeUsers.filter(u => u.role === 'faculty');
    
    const studentIds = students.map(s => s.username);
    const approvedActivities = activities.filter(a => 
        studentIds.includes(a.studentId) && a.status === 'Approved'
    );
    
    document.getElementById('totalStudents').textContent = students.length;
    document.getElementById('totalApprovedActivities').textContent = approvedActivities.length;
    document.getElementById('totalFaculty').textContent = faculty.length;
    
    // Populate users summary
    populateUsersSummary(collegeUsers);
}

// Activity and project management functions
function submitActivity(activity) {
    const currentUser = getCurrentUser();
    if (!currentUser || currentUser.role !== 'student') {
        return { success: false, message: 'Unauthorized access' };
    }
    
    const activities = getData('activities');
    const newActivity = {
        id: 'a' + Date.now(),
        studentId: currentUser.username,
        ...activity,
        status: 'Pending',
        points: 0,
        submitDate: new Date().toISOString()
    };
    
    activities.push(newActivity);
    saveData('activities', activities);
    
    return { success: true, message: 'Activity submitted successfully!' };
}

function submitProject(project) {
    const currentUser = getCurrentUser();
    if (!currentUser || currentUser.role !== 'student') {
        return { success: false, message: 'Unauthorized access' };
    }
    
    const projects = getData('projects');
    const newProject = {
        id: 'p' + Date.now(),
        studentId: currentUser.username,
        ...project,
        status: 'Pending',
        points: 0,
        submitDate: new Date().toISOString()
    };
    
    projects.push(newProject);
    saveData('projects', projects);
    
    return { success: true, message: 'Project submitted successfully!' };
}

function approveActivity(activityId) {
    const activities = getData('activities');
    const activity = activities.find(a => a.id === activityId);
    
    if (activity) {
        activity.status = 'Approved';
        activity.points = calculateActivityPoints(activity);
        activity.approvedBy = getCurrentUser().username;
        activity.approvedDate = new Date().toISOString();
        
        saveData('activities', activities);
        showNotification('Activity approved successfully!', 'success');
        location.reload();
    }
}

function approveProject(projectId) {
    const projects = getData('projects');
    const project = projects.find(p => p.id === projectId);
    
    if (project) {
        project.status = 'Approved';
        project.points = calculateProjectPoints(project);
        project.approvedBy = getCurrentUser().username;
        project.approvedDate = new Date().toISOString();
        
        saveData('projects', projects);
        showNotification('Project approved successfully!', 'success');
        location.reload();
    }
}

function rejectActivity(activityId) {
    const activities = getData('activities');
    const activity = activities.find(a => a.id === activityId);
    
    if (activity) {
        activity.status = 'Rejected';
        activity.points = 0;
        activity.rejectedBy = getCurrentUser().username;
        activity.rejectedDate = new Date().toISOString();
        
        saveData('activities', activities);
        showNotification('Activity rejected.', 'warning');
        location.reload();
    }
}

function rejectProject(projectId) {
    const projects = getData('projects');
    const project = projects.find(p => p.id === projectId);
    
    if (project) {
        project.status = 'Rejected';
        project.points = 0;
        project.rejectedBy = getCurrentUser().username;
        project.rejectedDate = new Date().toISOString();
        
        saveData('projects', projects);
        showNotification('Project rejected.', 'warning');
        location.reload();
    }
}

function askForProof(itemId) {
    showNotification('Request for additional proof sent to student.', 'success');
}

// Point calculation functions
function calculateActivityPoints(activity) {
    const pointsMap = {
        'Hackathon': { 'International': 10, 'National': 9, 'State': 7, 'University': 5, 'College': 4 },
        'Competition': { 'International': 8, 'National': 7, 'State': 6, 'University': 4, 'College': 3 },
        'Conference': { 'International': 6, 'National': 5, 'State': 4, 'University': 3, 'College': 2 },
        'Workshop': { 'International': 5, 'National': 4, 'State': 3, 'University': 2, 'College': 2 },
        'Internship': { 'International': 9, 'National': 8, 'State': 6, 'University': 4, 'College': 3 },
        'Club': { 'International': 4, 'National': 3, 'State': 2, 'University': 2, 'College': 1 },
        'Community Service': { 'International': 5, 'National': 4, 'State': 3, 'University': 2, 'College': 2 },
        'Volunteering': { 'International': 4, 'National': 3, 'State': 2, 'University': 2, 'College': 1 }
    };
    
    const typePoints = pointsMap[activity.type] || {};
    return typePoints[activity.level] || 5; // Default points
}

function calculateProjectPoints(project) {
    const pointsMap = {
        'Research Project': 8,
        'Industry Project': 7,
        'Academic Project': 6,
        'Capstone Project': 7,
        'Internship Project': 6,
        'Open Source': 5,
        'Personal Project': 4
    };
    
    return pointsMap[project.type] || 5; // Default points
}

function computeBadge(points, totalRequired = 100) {
    const percentage = (points / totalRequired) * 100;
    
    if (percentage >= 75) return 'Gold';
    if (percentage >= 50) return 'Silver';
    if (percentage >= 25) return 'Bronze';
    return 'None';
}

// UI helper functions
function populateActivitiesList(activities) {
    const listElement = document.getElementById('activitiesList');
    if (!listElement) return;
    
    if (activities.length === 0) {
        listElement.innerHTML = '<p style="text-align: center; color: #6b7280;">No activities found. Start by adding your first activity!</p>';
        return;
    }
    
    listElement.innerHTML = activities.map(item => {
        const isProject = item.title && item.startDate && !item.type?.includes('Hackathon'); // Simple project detection
        const date = isProject ? item.startDate : item.date;
        const type = isProject ? (item.type || 'Project') : item.type;
        
        return `
            <div class="activity-item ${item.status.toLowerCase()}">
                <div class="activity-info">
                    <h4>${item.title}</h4>
                    <p><strong>Type:</strong> ${type}</p>
                    <p><strong>Date:</strong> ${new Date(date).toLocaleDateString()}</p>
                    ${item.organizer ? `<p><strong>Organizer:</strong> ${item.organizer}</p>` : ''}
                    ${item.points > 0 ? `<p><strong>Points:</strong> ${item.points}</p>` : ''}
                </div>
                <div class="activity-status ${item.status.toLowerCase()}">${item.status}</div>
            </div>
        `;
    }).join('');
}

function populatePendingList(pendingItems) {
    const listElement = document.getElementById('pendingList');
    if (!listElement) return;
    
    if (pendingItems.length === 0) {
        listElement.innerHTML = '<p style="text-align: center; color: #6b7280;">No pending approvals at this time.</p>';
        return;
    }
    
    const users = getData('users');
    
    listElement.innerHTML = pendingItems.map(item => {
        const student = users.find(u => u.username === item.studentId);
        const isProject = item.startDate && !item.date;
        const date = isProject ? item.startDate : item.date;
        const type = isProject ? (item.type || 'Project') : item.type;
        
        return `
            <div class="pending-item">
                <div class="pending-header">
                    <div>
                        <h4>${item.title}</h4>
                        <p><strong>Student:</strong> ${student ? student.name : 'Unknown'} (${student ? student.prn : 'N/A'})</p>
                        <p><strong>Type:</strong> ${type}</p>
                        <p><strong>Date:</strong> ${new Date(date).toLocaleDateString()}</p>
                        ${item.organizer ? `<p><strong>Organizer:</strong> ${item.organizer}</p>` : ''}
                        ${item.description ? `<p><strong>Description:</strong> ${item.description}</p>` : ''}
                        ${item.facultyNote ? `<p><strong>Note:</strong> ${item.facultyNote}</p>` : ''}
                    </div>
                    <div class="pending-actions">
                        <button class="btn-approve" onclick="${isProject ? 'approveProject' : 'approveActivity'}('${item.id}')">Approve</button>
                        <button class="btn-reject" onclick="${isProject ? 'rejectProject' : 'rejectActivity'}('${item.id}')">Reject</button>
                        <button class="btn-ask-proof" onclick="askForProof('${item.id}')">Ask for Proof</button>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

function loadStudents() {
    const currentUser = getCurrentUser();
    const users = getData('users');
    const activities = getData('activities');
    const projects = getData('projects');
    
    const students = users.filter(u => u.role === 'student' && u.college === currentUser.college);
    const listElement = document.getElementById('studentsList');
    
    if (!listElement) return;
    
    listElement.innerHTML = students.map(student => {
        const studentActivities = activities.filter(a => a.studentId === student.username && a.status === 'Approved');
        const studentProjects = projects.filter(p => p.studentId === student.username && p.status === 'Approved');
        const totalPoints = studentActivities.reduce((sum, a) => sum + (a.points || 0), 0) + 
                           studentProjects.reduce((sum, p) => sum + (p.points || 0), 0);
        const badge = computeBadge(totalPoints);
        
        return `
            <div class="student-item">
                <div class="student-info">
                    <h4>${student.name}</h4>
                    <p><strong>PRN:</strong> ${student.prn}</p>
                    <p><strong>Points:</strong> ${totalPoints} | <strong>Badge:</strong> ${badge}</p>
                </div>
                <div class="student-actions">
                    <button class="btn-secondary" onclick="viewStudentPortfolio('${student.username}')">View Portfolio</button>
                    <button class="btn-accent" onclick="downloadStudentPortfolio('${student.username}')">Download PDF</button>
                </div>
            </div>
        `;
    }).join('');
}

function populateUsersSummary(users) {
    const summaryElement = document.getElementById('usersSummary');
    if (!summaryElement) return;
    
    const summary = users.reduce((acc, user) => {
        acc[user.role] = (acc[user.role] || 0) + 1;
        return acc;
    }, {});
    
    summaryElement.innerHTML = Object.entries(summary).map(([role, count]) => `
        <div class="user-summary-item">
            <h4>${count}</h4>
            <p>${role.charAt(0).toUpperCase() + role.slice(1)}s</p>
        </div>
    `).join('');
}

// Portfolio and resume functions
function generatePortfolio() {
    const currentUser = getCurrentUser();
    if (!currentUser) return;
    
    sessionStorage.setItem('ssh_portfolioUser', JSON.stringify(currentUser));
    window.open('portfolio.html', '_blank');
}

function generateResume() {
    const currentUser = getCurrentUser();
    if (!currentUser) return;
    
    sessionStorage.setItem('ssh_resumeUser', JSON.stringify(currentUser));
    window.open('resume.html', '_blank');
}

function viewStudentPortfolio(studentUsername) {
    const users = getData('users');
    const student = users.find(u => u.username === studentUsername);
    if (!student) return;
    
    sessionStorage.setItem('ssh_portfolioUser', JSON.stringify(student));
    window.open('portfolio.html', '_blank');
}

function downloadStudentPortfolio(studentUsername) {
    showNotification('Portfolio PDF generation initiated for student.', 'success');
    setTimeout(() => {
        showNotification('Student portfolio downloaded successfully!', 'success');
    }, 2000);
}

// Export functions
function downloadNBA() {
    const currentUser = getCurrentUser();
    const users = getData('users');
    const activities = getData('activities');
    
    const collegeStudents = users.filter(u => u.role === 'student' && u.college === currentUser.college);
    const studentIds = collegeStudents.map(s => s.username);
    const approvedActivities = activities.filter(a => 
        studentIds.includes(a.studentId) && a.status === 'Approved'
    );
    
    // Create CSV data
    const csvData = approvedActivities.map(activity => {
        const student = users.find(u => u.username === activity.studentId);
        return {
            'Student Name': student ? student.name : 'Unknown',
            'PRN': student ? student.prn : 'N/A',
            'Activity': activity.title,
            'Type': activity.type,
            'Level': activity.level,
            'Date': activity.date,
            'Points': activity.points,
            'Organizer': activity.organizer
        };
    });
    
    showNotification('NBA report generated successfully! Download initiated.', 'success');
    console.log('NBA Report Data:', csvData);
}

function downloadDeptReport() {
    showNotification('Department report generated successfully! Download initiated.', 'success');
}

function exportNAAC() {
    showNotification('NAAC report export initiated. This may take a few moments...', 'success');
    setTimeout(() => {
        showNotification('NAAC report exported successfully!', 'success');
    }, 3000);
}

function exportNBA() {
    showNotification('NBA report export initiated. This may take a few moments...', 'success');
    setTimeout(() => {
        showNotification('NBA report exported successfully!', 'success');
    }, 3000);
}

function exportInstitutionalSummary() {
    showNotification('Institutional summary export initiated.', 'success');
    setTimeout(() => {
        showNotification('Institutional summary exported successfully!', 'success');
    }, 2000);
}

// Modal functions
function showAddCollegeModal() {
    document.getElementById('addCollegeModal').classList.remove('hidden');
}

function hideModal(modalId) {
    document.getElementById(modalId).classList.add('hidden');
}

function showUploadUsersModal() {
    showNotification('CSV upload functionality would be implemented here.', 'success');
}

function showMapRulesModal() {
    showNotification('MAP rules upload functionality would be implemented here.', 'success');
}

function syncERP() {
    showNotification('ERP synchronization initiated...', 'success');
    setTimeout(() => {
        showNotification('ERP sync completed successfully!', 'success');
    }, 3000);
}

function simulatePayment() {
    showNotification('Processing payment...', 'success');
    setTimeout(() => {
        showNotification('Payment successful! College added to system.', 'success');
        hideModal('addCollegeModal');
    }, 2000);
}

// Utility functions
function showNotification(message, type = 'success') {
    const notification = document.getElementById('notification');
    if (!notification) return;
    
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.classList.remove('hidden');
    
    setTimeout(() => {
        notification.classList.add('hidden');
    }, 5000);
}

// Initialize page-specific functionality based on current page
function initPageSpecific() {
    const path = window.location.pathname;
    const page = path.substring(path.lastIndexOf('/') + 1);
    
    switch (page) {
        case 'student_dashboard.html':
            initStudentDashboard();
            break;
        case 'faculty_dashboard.html':
            initFacultyDashboard();
            break;
        case 'admin_dashboard.html':
            initAdminDashboard();
            break;
    }
}

// Export functions for global access
window.seed = seed;
window.getData = getData;
window.saveData = saveData;
window.handleLogin = handleLogin;
window.setCurrentUser = setCurrentUser;
window.getCurrentUser = getCurrentUser;
window.logout = logout;
window.initStudentDashboard = initStudentDashboard;
window.initFacultyDashboard = initFacultyDashboard;
window.initAdminDashboard = initAdminDashboard;
window.submitActivity = submitActivity;
window.submitProject = submitProject;
window.approveActivity = approveActivity;
window.approveProject = approveProject;
window.rejectActivity = rejectActivity;
window.rejectProject = rejectProject;
window.askForProof = askForProof;
window.generatePortfolio = generatePortfolio;
window.generateResume = generateResume;
window.viewStudentPortfolio = viewStudentPortfolio;
window.downloadStudentPortfolio = downloadStudentPortfolio;
window.downloadNBA = downloadNBA;
window.downloadDeptReport = downloadDeptReport;
window.exportNAAC = exportNAAC;
window.exportNBA = exportNBA;
window.exportInstitutionalSummary = exportInstitutionalSummary;
window.loadStudents = loadStudents;
window.showAddCollegeModal = showAddCollegeModal;
window.hideModal = hideModal;
window.showUploadUsersModal = showUploadUsersModal;
window.showMapRulesModal = showMapRulesModal;
window.syncERP = syncERP;
window.simulatePayment = simulatePayment;
window.showNotification = showNotification;
window.computeBadge = computeBadge;
window.calculateActivityPoints = calculateActivityPoints;
window.calculateProjectPoints = calculateProjectPoints;




