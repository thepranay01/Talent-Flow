// API Base URL
const API_BASE_URL = "http://localhost:8080";

// Global state
let employees = [];
let deleteEmployeeId = null;
let isEditing = false;

// Initialize app
document.addEventListener("DOMContentLoaded", () => {
  loadEmployees();
  setupEventListeners();
});

// Setup event listeners
function setupEventListeners() {
  // Search functionality
  document.getElementById("search-input").addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      searchEmployees();
    }
  });

  // Close modals when clicking outside
  document.getElementById("modal-container").addEventListener("click", (e) => {
    if (e.target === document.getElementById("modal-container")) {
      closeCreateModal();
    }
  });

  document.getElementById("delete-modal").addEventListener("click", (e) => {
    if (e.target === document.getElementById("delete-modal")) {
      closeDeleteModal();
    }
  });
}

// Fetch all employees
async function loadEmployees() {
  showLoading(true);
  try {
    const response = await fetch(`${API_BASE_URL}/employees`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    employees = await response.json();
    renderEmployees(employees);
    updateStats();
    showToast("Success", "Employees loaded successfully", "success");
  } catch (error) {
    console.error("Error loading employees:", error);
    showToast(
      "Error",
      "Failed to load employees. Please check if the server is running.",
      "error"
    );
    renderEmptyState();
  } finally {
    showLoading(false);
  }
}

// Render employees in table
function renderEmployees(employeeList) {
  const tableBody = document.getElementById("employee-table-body");

  if (employeeList.length === 0) {
    tableBody.innerHTML = `
            <tr class="text-center py-12">
                <td colspan="5" class="px-6 py-12">
                    <div class="flex flex-col items-center justify-center">
                        <i class="fas fa-inbox text-gray-400 text-5xl mb-4 bounce-animation"></i>
                        <p class="text-gray-500 text-lg font-semibold">No employees found</p>
                        <p class="text-gray-400 text-sm mt-2">Click "New Employee" to add your first employee</p>
                    </div>
                </td>
            </tr>
        `;
    return;
  }

  tableBody.innerHTML = employeeList
    .map(
      (emp, index) => `
        <tr class="hover:bg-gray-50 smooth-transition table-row-animation text-sm sm:text-base" style="animation-delay: ${
          index * 50
        }ms">
            <td class="px-3 sm:px-6 py-4 font-semibold text-gray-900">#${
              emp.id
            }</td>
            <td class="px-3 sm:px-6 py-4">
                <div class="flex items-center space-x-2">
                    <div class="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                        ${emp.name.charAt(0).toUpperCase()}
                    </div>
                    <div class="flex-1 min-w-0">
                        <span class="text-gray-900 font-medium block truncate">${
                          emp.name
                        }</span>
                        <span class="sm:hidden text-gray-500 text-xs truncate">${
                          emp.email
                        }</span>
                    </div>
                </div>
            </td>
            <td class="px-3 sm:px-6 py-4 hidden sm:table-cell">
                <div class="flex items-center space-x-2 text-gray-700">
                    <i class="fas fa-envelope text-blue-500"></i>
                    <a href="mailto:${
                      emp.email
                    }" class="hover:text-blue-600 smooth-transition truncate">${
        emp.email
      }</a>
                </div>
            </td>
            <td class="px-3 sm:px-6 py-4 hidden md:table-cell">
                <div class="flex items-center space-x-2 text-gray-700">
                    <i class="fas fa-phone text-green-500"></i>
                    <a href="tel:${
                      emp.phone
                    }" class="hover:text-green-600 smooth-transition">${
        emp.phone
      }</a>
                </div>
            </td>
            <td class="px-3 sm:px-6 py-4">
                <div class="flex justify-center gap-2 sm:gap-3">
                    <button 
                        onclick="editEmployee(${emp.id})" 
                        class="bg-primary hover:bg-secondary text-white px-2 sm:px-4 py-2 rounded-lg font-semibold smooth-transition flex items-center space-x-1 shadow-md hover:shadow-lg text-xs sm:text-sm"
                        title="Edit employee"
                    >
                        <i class="fas fa-edit"></i>
                        <span class="hidden sm:inline">Edit</span>
                    </button>
                    <button 
                        onclick="openDeleteModal(${emp.id})" 
                        class="bg-red-500 hover:bg-red-600 text-white px-2 sm:px-4 py-2 rounded-lg font-semibold smooth-transition flex items-center space-x-1 shadow-md hover:shadow-lg text-xs sm:text-sm"
                        title="Delete employee"
                    >
                        <i class="fas fa-trash"></i>
                        <span class="hidden sm:inline">Delete</span>
                    </button>
                </div>
            </td>
        </tr>
    `
    )
    .join("");
}

// Render empty state
function renderEmptyState() {
  const tableBody = document.getElementById("employee-table-body");
  tableBody.innerHTML = `
        <tr class="text-center py-12">
            <td colspan="5" class="px-6 py-12">
                <div class="flex flex-col items-center justify-center">
                    <i class="fas fa-exclamation-circle text-gray-400 text-5xl mb-4"></i>
                    <p class="text-gray-500 text-lg font-semibold">Unable to load employees</p>
                    <p class="text-gray-400 text-sm mt-2">Please ensure the backend server is running</p>
                </div>
            </td>
        </tr>
    `;
}

// Update statistics
function updateStats() {
  const totalCount = employees.length;
  document.getElementById("employee-count").textContent = totalCount;
  document.getElementById("total-stat").textContent = totalCount;
  document.getElementById("active-stat").textContent = totalCount;
}

// Open create modal
function openCreateModal() {
  isEditing = false;
  document.getElementById("modal-title").textContent = "Add New Employee";
  document.getElementById("employee-form").reset();
  document.getElementById("employee-id").value = "";
  document.getElementById("modal-container").classList.remove("hidden");
  document.body.style.overflow = "hidden";
}

// Close create modal
function closeCreateModal() {
  document.getElementById("modal-container").classList.add("hidden");
  document.body.style.overflow = "auto";
  document.getElementById("employee-form").reset();
}

// Open delete modal
function openDeleteModal(id) {
  deleteEmployeeId = id;
  document.getElementById("delete-modal").classList.remove("hidden");
  document.body.style.overflow = "hidden";
}

// Close delete modal
function closeDeleteModal() {
  document.getElementById("delete-modal").classList.add("hidden");
  document.body.style.overflow = "auto";
  deleteEmployeeId = null;
}

// Edit employee
async function editEmployee(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/employees/${id}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const employee = await response.json();

    // Populate form
    document.getElementById("employee-id").value = employee.id;
    document.getElementById("employee-name").value = employee.name;
    document.getElementById("employee-email").value = employee.email;
    document.getElementById("employee-phone").value = employee.phone;

    // Update modal
    document.getElementById(
      "modal-title"
    ).textContent = `Edit Employee - ${employee.name}`;
    isEditing = true;

    document.getElementById("modal-container").classList.remove("hidden");
    document.body.style.overflow = "hidden";
  } catch (error) {
    console.error("Error loading employee:", error);
    showToast("Error", "Failed to load employee details", "error");
  }
}

// Save employee (create or update)
async function saveEmployee(event) {
  event.preventDefault();

  const id = document.getElementById("employee-id").value;
  const name = document.getElementById("employee-name").value.trim();
  const email = document.getElementById("employee-email").value.trim();
  const phone = document.getElementById("employee-phone").value.trim();

  // Validation
  if (!name || !email || !phone) {
    showToast("Validation Error", "Please fill in all fields", "error");
    return;
  }

  if (!isValidEmail(email)) {
    showToast(
      "Validation Error",
      "Please enter a valid email address",
      "error"
    );
    return;
  }

  if (!isValidPhone(phone)) {
    showToast("Validation Error", "Please enter a valid phone number", "error");
    return;
  }

  showLoading(true);

  try {
    const employeeData = { name, email, phone };
    let url = `${API_BASE_URL}/employees`;
    let method = "POST";
    let successMessage = "Employee created successfully";

    if (id) {
      url = `${API_BASE_URL}/employees/${id}`;
      method = "PUT";
      successMessage = "Employee updated successfully";
    }

    const response = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(employeeData),
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(errorData || `HTTP error! status: ${response.status}`);
    }

    showToast("Success", successMessage, "success");
    closeCreateModal();
    loadEmployees();
  } catch (error) {
    console.error("Error saving employee:", error);
    showToast("Error", error.message || "Failed to save employee", "error");
  } finally {
    showLoading(false);
  }
}

// Delete employee
async function confirmDelete() {
  if (!deleteEmployeeId) return;

  showLoading(true);

  try {
    const response = await fetch(
      `${API_BASE_URL}/employees/${deleteEmployeeId}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(errorData || `HTTP error! status: ${response.status}`);
    }

    showToast("Success", "Employee deleted successfully", "success");
    closeDeleteModal();
    loadEmployees();
  } catch (error) {
    console.error("Error deleting employee:", error);
    showToast("Error", error.message || "Failed to delete employee", "error");
  } finally {
    showLoading(false);
  }
}

// Search employees
function searchEmployees() {
  const searchTerm = document
    .getElementById("search-input")
    .value.toLowerCase()
    .trim();

  if (!searchTerm) {
    renderEmployees(employees);
    return;
  }

  const filteredEmployees = employees.filter(
    (emp) =>
      emp.name.toLowerCase().includes(searchTerm) ||
      emp.email.toLowerCase().includes(searchTerm) ||
      emp.phone.includes(searchTerm)
  );

  if (filteredEmployees.length === 0) {
    document.getElementById("employee-table-body").innerHTML = `
            <tr class="text-center py-12">
                <td colspan="5" class="px-6 py-12">
                    <div class="flex flex-col items-center justify-center">
                        <i class="fas fa-search text-gray-400 text-5xl mb-4"></i>
                        <p class="text-gray-500 text-lg font-semibold">No results found</p>
                        <p class="text-gray-400 text-sm mt-2">Try adjusting your search terms</p>
                    </div>
                </td>
            </tr>
        `;
  } else {
    renderEmployees(filteredEmployees);
  }
}

// Reset search
function resetSearch() {
  document.getElementById("search-input").value = "";
  renderEmployees(employees);
}

// Show loading spinner
function showLoading(show) {
  const spinner = document.getElementById("loading-spinner");
  if (show) {
    spinner.classList.remove("hidden");
  } else {
    spinner.classList.add("hidden");
  }
}

// Show toast notification
function showToast(title, message, type = "success") {
  const toast = document.getElementById("toast");
  const toastIcon = document.getElementById("toast-icon");
  const toastMessage = document.getElementById("toast-message");
  const toastDetail = document.getElementById("toast-detail");

  toastMessage.textContent = title;
  toastDetail.textContent = message;

  // Set icon and color based on type
  if (type === "success") {
    toastIcon.className = "fas fa-check-circle text-green-500 text-xl mt-1";
  } else if (type === "error") {
    toastIcon.className = "fas fa-exclamation-circle text-red-500 text-xl mt-1";
  } else if (type === "warning") {
    toastIcon.className =
      "fas fa-exclamation-triangle text-yellow-500 text-xl mt-1";
  } else {
    toastIcon.className = "fas fa-info-circle text-blue-500 text-xl mt-1";
  }

  // Show toast
  toast.classList.remove("hidden");

  // Auto hide after 4 seconds
  setTimeout(() => {
    toast.classList.add("hidden");
  }, 4000);
}

// Email validation
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Phone validation
function isValidPhone(phone) {
  const phoneRegex = /^[\d\s\-\+\(\)]+$/;
  return phoneRegex.test(phone) && phone.replace(/\D/g, "").length >= 10;
}
