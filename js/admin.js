/**
 * FITNESS & NUTRITION CLINIC
 * Admin Dashboard JavaScript
 * Handles: Login, Products CRUD, Navigation
 */

// ===== DOM ELEMENTS =====
const loginScreen = document.getElementById('loginScreen');
const adminDashboard = document.getElementById('adminDashboard');
const loginForm = document.getElementById('loginForm');
const loginError = document.getElementById('loginError');
const logoutBtn = document.getElementById('logoutBtn');
const pageTitle = document.getElementById('pageTitle');

// Modal Elements
const productModal = document.getElementById('productModal');
const deleteModal = document.getElementById('deleteModal');
const productForm = document.getElementById('productForm');
const imagePreview = document.getElementById('imagePreview');

// ===== CREDENTIALS (JavaScript-based authentication) =====
const ADMIN_CREDENTIALS = {
    username: 'admin',
    password: 'admin123'
};

// ===== LOCAL STORAGE KEY =====
const STORAGE_KEY = 'fitnessClinicProducts';

// ===== SESSION MANAGEMENT =====

function isLoggedIn() {
    return sessionStorage.getItem('adminLoggedIn') === 'true';
}

function login(username) {
    sessionStorage.setItem('adminLoggedIn', 'true');
    sessionStorage.setItem('adminUsername', username);
}

function logout() {
    sessionStorage.removeItem('adminLoggedIn');
    sessionStorage.removeItem('adminUsername');
    showLoginScreen();
}

function showLoginScreen() {
    loginScreen.style.display = 'flex';
    adminDashboard.style.display = 'none';
}

function showDashboard() {
    loginScreen.style.display = 'none';
    adminDashboard.style.display = 'flex';

    // Update admin name
    const username = sessionStorage.getItem('adminUsername') || 'Admin';
    document.getElementById('adminName').textContent = username;
    document.querySelector('.admin-avatar').textContent = username.charAt(0).toUpperCase();

    // Load initial data
    updateStats();
    renderProductsTable();
    renderRecentProducts();
}

// ===== LOGIN HANDLER =====

function handleLogin(e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
        loginError.classList.remove('show');
        login(username);
        showDashboard();
        showNotification('Welcome back, Admin!', 'success');
    } else {
        loginError.classList.add('show');
    }
}

// ===== NAVIGATION =====

function initNavigation() {
    const navLinks = document.querySelectorAll('.admin-nav a[data-section]');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();

            // Update active state
            document.querySelectorAll('.admin-nav a').forEach(l => l.classList.remove('active'));
            link.classList.add('active');

            // Show corresponding section
            const sectionId = link.dataset.section;
            showSection(sectionId);
        });
    });
}

function showSection(sectionId) {
    // Hide all sections
    const sections = ['dashboard', 'products', 'orders', 'customers', 'settings'];
    sections.forEach(section => {
        const el = document.getElementById(`${section}Section`);
        if (el) el.style.display = 'none';
    });

    // Show target section
    const targetSection = document.getElementById(`${sectionId}Section`);
    if (targetSection) {
        targetSection.style.display = 'block';
    }

    // Update page title
    const titles = {
        dashboard: 'Dashboard',
        products: 'Products',
        orders: 'Orders',
        customers: 'Customers',
        settings: 'Settings'
    };
    pageTitle.textContent = titles[sectionId] || 'Dashboard';
}

// ===== PRODUCTS MANAGEMENT =====

function getProducts() {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
}

function saveProducts(products) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
}

function generateId() {
    return Date.now() + Math.random().toString(36).substr(2, 9);
}

function updateStats() {
    const products = getProducts();
    document.getElementById('totalProducts').textContent = products.length;
}

function renderProductsTable() {
    const products = getProducts();
    const tbody = document.getElementById('productsTableBody');

    if (!tbody) return;

    if (products.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="5" style="text-align: center; padding: 40px; color: var(--text-muted);">
                    No products found. Click "Add New Product" to get started.
                </td>
            </tr>
        `;
        return;
    }

    tbody.innerHTML = products.map(product => `
        <tr data-id="${product.id}">
            <td>
                <img src="${product.image}" alt="${product.name}" onerror="this.src='https://via.placeholder.com/60?text=No+Image'">
            </td>
            <td><strong>${product.name}</strong></td>
            <td>${capitalizeFirst(product.category || 'Uncategorized')}</td>
            <td>$${product.price.toFixed(2)}</td>
            <td>
                <div class="table-actions">
                    <button class="btn-edit" onclick="editProduct('${product.id}')">Edit</button>
                    <button class="btn-delete" onclick="confirmDelete('${product.id}')">Delete</button>
                </div>
            </td>
        </tr>
    `).join('');
}

function renderRecentProducts() {
    const products = getProducts().slice(0, 5);
    const container = document.getElementById('recentProductsTable');

    if (!container) return;

    if (products.length === 0) {
        container.innerHTML = `
            <p style="text-align: center; padding: 40px; color: var(--text-muted);">
                No products yet. Add your first product to get started!
            </p>
        `;
        return;
    }

    container.innerHTML = `
        <table class="admin-table">
            <thead>
                <tr>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                ${products.map(product => `
                    <tr>
                        <td>
                            <img src="${product.image}" alt="${product.name}" onerror="this.src='https://via.placeholder.com/60?text=No+Image'">
                        </td>
                        <td><strong>${product.name}</strong></td>
                        <td>$${product.price.toFixed(2)}</td>
                        <td>
                            <div class="table-actions">
                                <button class="btn-edit" onclick="editProduct('${product.id}')">Edit</button>
                            </div>
                        </td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
}

// ===== MODAL MANAGEMENT =====

let currentEditId = null;
let deleteProductId = null;

function openModal(isEdit = false) {
    productModal.classList.add('active');
    document.getElementById('modalTitle').textContent = isEdit ? 'Edit Product' : 'Add New Product';

    if (!isEdit) {
        productForm.reset();
        currentEditId = null;
        imagePreview.innerHTML = '<span class="image-preview-placeholder">Image Preview</span>';
    }
}

function closeModal() {
    productModal.classList.remove('active');
    productForm.reset();
    currentEditId = null;
    imagePreview.innerHTML = '<span class="image-preview-placeholder">Image Preview</span>';
}

function editProduct(id) {
    const products = getProducts();
    const product = products.find(p => p.id == id);

    if (!product) {
        showNotification('Product not found', 'error');
        return;
    }

    currentEditId = id;

    // Fill form
    document.getElementById('productId').value = product.id;
    document.getElementById('productImage').value = product.image || '';
    document.getElementById('productName').value = product.name || '';
    document.getElementById('productCategory').value = product.category || '';
    document.getElementById('productPrice').value = product.price || 0;
    document.getElementById('productDescription').value = product.description || '';

    // Update preview
    if (product.image) {
        imagePreview.innerHTML = `<img src="${product.image}" alt="Preview" onerror="this.src='https://via.placeholder.com/150?text=Invalid+URL'">`;
    }

    openModal(true);
}

function handleProductSubmit(e) {
    e.preventDefault();

    const formData = {
        id: currentEditId || generateId(),
        name: document.getElementById('productName').value.trim(),
        category: document.getElementById('productCategory').value,
        price: parseFloat(document.getElementById('productPrice').value),
        description: document.getElementById('productDescription').value.trim(),
        image: document.getElementById('productImage').value.trim()
    };

    // Validate
    if (!formData.name || !formData.category || !formData.price) {
        showNotification('Please fill in all required fields', 'error');
        return;
    }

    const products = getProducts();

    if (currentEditId) {
        // Update existing
        const index = products.findIndex(p => p.id == currentEditId);
        if (index !== -1) {
            products[index] = formData;
            showNotification('Product updated successfully!', 'success');
        }
    } else {
        // Add new
        products.push(formData);
        showNotification('Product added successfully!', 'success');
    }

    saveProducts(products);
    closeModal();
    updateStats();
    renderProductsTable();
    renderRecentProducts();
}

// ===== DELETE CONFIRMATION =====

function confirmDelete(id) {
    deleteProductId = id;
    deleteModal.classList.add('active');
}

function closeDeleteModal() {
    deleteModal.classList.remove('active');
    deleteProductId = null;
}

function handleDelete() {
    if (!deleteProductId) return;

    const products = getProducts();
    const filtered = products.filter(p => p.id != deleteProductId);

    saveProducts(filtered);
    closeDeleteModal();

    showNotification('Product deleted successfully!', 'success');
    updateStats();
    renderProductsTable();
    renderRecentProducts();
}

// ===== IMAGE PREVIEW =====

function handleImageUrlChange() {
    const url = document.getElementById('productImage').value;

    if (url) {
        imagePreview.innerHTML = `<img src="${url}" alt="Preview" onerror="this.src='https://via.placeholder.com/150?text=Invalid+URL'">`;
    } else {
        imagePreview.innerHTML = '<span class="image-preview-placeholder">Image Preview</span>';
    }
}

// ===== NOTIFICATIONS =====

function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();

    // Create notification
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button onclick="this.parentElement.remove()">×</button>
    `;

    // Style
    Object.assign(notification.style, {
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        background: type === 'success' ? 'linear-gradient(135deg, #22C55E 0%, #16A34A 100%)' :
            type === 'error' ? 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)' :
                'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
        color: 'white',
        padding: '15px 25px',
        borderRadius: '12px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
        display: 'flex',
        alignItems: 'center',
        gap: '15px',
        zIndex: '9999',
        fontFamily: 'Poppins, sans-serif'
    });

    notification.querySelector('button').style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0;
        line-height: 1;
    `;

    document.body.appendChild(notification);

    // Auto remove after 4 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 4000);
}

// ===== UTILITIES =====

function capitalizeFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// ===== INITIALIZE =====

document.addEventListener('DOMContentLoaded', function () {
    // Check login status
    if (isLoggedIn()) {
        showDashboard();
    } else {
        showLoginScreen();
    }

    // Event listeners
    loginForm.addEventListener('submit', handleLogin);
    logoutBtn.addEventListener('click', (e) => {
        e.preventDefault();
        logout();
        showNotification('You have been logged out', 'info');
    });

    // Navigation
    initNavigation();

    // Product modal
    document.getElementById('addProductBtn')?.addEventListener('click', () => openModal(false));
    document.getElementById('quickAddProduct')?.addEventListener('click', () => openModal(false));
    document.getElementById('closeModal').addEventListener('click', closeModal);
    document.getElementById('cancelBtn').addEventListener('click', closeModal);
    productForm.addEventListener('submit', handleProductSubmit);

    // Image preview
    document.getElementById('productImage').addEventListener('input', handleImageUrlChange);

    // Delete modal
    document.getElementById('closeDeleteModal').addEventListener('click', closeDeleteModal);
    document.getElementById('cancelDelete').addEventListener('click', closeDeleteModal);
    document.getElementById('confirmDelete').addEventListener('click', handleDelete);

    // Close modals on outside click
    productModal.addEventListener('click', (e) => {
        if (e.target === productModal) closeModal();
    });
    deleteModal.addEventListener('click', (e) => {
        if (e.target === deleteModal) closeDeleteModal();
    });

    console.log('Admin Dashboard - Initialized');
});
