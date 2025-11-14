const form = document.getElementById("updateProfileForm");
const token = localStorage.getItem("token");

if (!token) {
    window.location.href = "login.html";
}

document.addEventListener("DOMContentLoaded", loadCustomerData);

async function loadCustomerData() {
    const res = await fetch("http://localhost:6789/api/customer/me", {
        headers: { "Authorization": "Bearer " + token }
    });

    const result = await res.json();

    if (result.success) {
        document.getElementById("email").value = result.user.email;
        document.getElementById("name").value = result.user.name || "";
        document.getElementById("address").value = result.user.address || "";
        document.getElementById("phone").value = result.user.phone || "";
    }
}

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const userData = {
        name: document.getElementById("name").value.trim(),
        email: document.getElementById("email").value.trim(),
        password: document.getElementById("password").value.trim(),
        address: document.getElementById("address").value.trim(),
        phone: document.getElementById("phone").value.trim(),
    };

    const res = await fetch("http://localhost:6789/api/customer/update", {
        method: "PUT",
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
    });

    const result = await res.json();

    if (result.success) {
        localStorage.setItem("customerAddress", userData.address);
        window.location.href = "CustomerDashboard.html";
    } else {
        alert(result.message);
    }
});
