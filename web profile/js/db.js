// Client-Side Simulated Database using localStorage

const DEFAULT_SKILLS = [
    { id: 1, skill_name: 'HTML', level_percent: 80 },
    { id: 2, skill_name: 'PHP', level_percent: 70 },
    { id: 3, skill_name: 'Python', level_percent: 80 },
    { id: 4, skill_name: 'MySQL', level_percent: 80 }
];

const DEFAULT_PROJECTS = [
    {
        id: 1,
        project_name: 'Warehouse Management Project',
        description: 'Hệ thống quản lý kho hàng trực quan hỗ trợ theo dõi hàng tồn kho, quản lý sản phẩm, đối tác và lịch sử nhập xuất kho.',
        technologies: 'PHP, MySQL, HTML, CSS, JavaScript',
        github_link: 'https://github.com/TCKhoa/Warehouse-Management-Project'
    }
];

class LocalDatabase {
    constructor() {
        this.init();
    }

    init() {
        // Auto-migrate: check if current storage has old skills
        const storedSkills = localStorage.getItem('portfolio_skills');
        if (!storedSkills || storedSkills.includes('Java') || storedSkills.includes('Spring Boot')) {
            localStorage.setItem('portfolio_skills', JSON.stringify(DEFAULT_SKILLS));
        }
        
        // Auto-migrate: check if current storage has old projects
        const storedProjects = localStorage.getItem('portfolio_projects');
        if (!storedProjects || storedProjects.includes('Blockchain Traceability') || storedProjects.includes('Heart Stroke Prediction')) {
            localStorage.setItem('portfolio_projects', JSON.stringify(DEFAULT_PROJECTS));
        }

        if (!localStorage.getItem('portfolio_contacts')) {
            localStorage.setItem('portfolio_contacts', JSON.stringify([]));
        }
        if (!localStorage.getItem('admin_username')) {
            localStorage.setItem('admin_username', 'admin');
        }
        if (!localStorage.getItem('admin_password')) {
            localStorage.setItem('admin_password', 'admin'); // Default password matching design
        }
    }

    // --- Skills Management ---
    getSkills() {
        return JSON.parse(localStorage.getItem('portfolio_skills')) || [];
    }

    addSkill(name, level) {
        const skills = this.getSkills();
        const nextId = skills.length > 0 ? Math.max(...skills.map(s => s.id)) + 1 : 1;
        const newSkill = {
            id: nextId,
            skill_name: name,
            level_percent: parseInt(level, 10) || 0
        };
        skills.push(newSkill);
        localStorage.setItem('portfolio_skills', JSON.stringify(skills));
        return newSkill;
    }

    deleteSkill(id) {
        let skills = this.getSkills();
        skills = skills.filter(s => s.id !== parseInt(id, 10));
        localStorage.setItem('portfolio_skills', JSON.stringify(skills));
        return true;
    }

    // --- Projects Management ---
    getProjects() {
        return JSON.parse(localStorage.getItem('portfolio_projects')) || [];
    }

    addProject(name, description, technologies, githubLink) {
        const projects = this.getProjects();
        const nextId = projects.length > 0 ? Math.max(...projects.map(p => p.id)) + 1 : 1;
        const newProject = {
            id: nextId,
            project_name: name,
            description: description || '',
            technologies: technologies || '',
            github_link: githubLink || ''
        };
        projects.push(newProject);
        localStorage.setItem('portfolio_projects', JSON.stringify(projects));
        return newProject;
    }

    editProject(id, name, description, technologies, githubLink) {
        const projects = this.getProjects();
        const index = projects.findIndex(p => p.id === parseInt(id, 10));
        if (index !== -1) {
            projects[index].project_name = name;
            projects[index].description = description || '';
            if (technologies !== undefined) projects[index].technologies = technologies;
            if (githubLink !== undefined) projects[index].github_link = githubLink;
            localStorage.setItem('portfolio_projects', JSON.stringify(projects));
            return projects[index];
        }
        return null;
    }

    deleteProject(id) {
        let projects = this.getProjects();
        projects = projects.filter(p => p.id !== parseInt(id, 10));
        localStorage.setItem('portfolio_projects', JSON.stringify(projects));
        return true;
    }

    // --- Contacts Management ---
    getContacts() {
        return JSON.parse(localStorage.getItem('portfolio_contacts')) || [];
    }

    addContact(name, email, message) {
        const contacts = this.getContacts();
        const nextId = contacts.length > 0 ? Math.max(...contacts.map(c => c.id)) + 1 : 1;
        const newContact = {
            id: nextId,
            name: name,
            email: email,
            message: message,
            created_at: new Date().toISOString()
        };
        contacts.unshift(newContact); // Most recent first
        localStorage.setItem('portfolio_contacts', JSON.stringify(contacts));
        return newContact;
    }

    // --- Auth Management ---
    checkLogin(username, password) {
        const correctUser = localStorage.getItem('admin_username');
        const correctPass = localStorage.getItem('admin_password');
        if (username === correctUser && password === correctPass) {
            sessionStorage.setItem('admin_logged_in', 'true');
            return true;
        }
        return false;
    }

    isLoggedIn() {
        return sessionStorage.getItem('admin_logged_in') === 'true';
    }

    logout() {
        sessionStorage.removeItem('admin_logged_in');
    }

    // --- Statistics ---
    getStats() {
        const projects = this.getProjects();
        const contacts = this.getContacts();
        return {
            projectsCount: projects.length,
            contactsCount: contacts.length
        };
    }

    // --- Assets Management ---
    getAvatar() {
        return localStorage.getItem('custom_avatar') || '../uploads/avt.jpg';
    }

    setAvatar(base64Data) {
        localStorage.setItem('custom_avatar', base64Data);
    }

    getCV() {
        return localStorage.getItem('custom_cv') || '../uploads/CV_Tran Minh Quang_Intern.pdf';
    }

    setCV(base64Data) {
        localStorage.setItem('custom_cv', base64Data);
    }
}

// Instantiate globally
window.db = new LocalDatabase();
