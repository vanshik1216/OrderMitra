const token = localStorage.getItem("token");

if (!token) {
    alert("Please login first.");
    window.location.href = "login.html";
}

// ------------------------------
// LOAD RESTAURANT INFO
// ------------------------------
document.addEventListener("DOMContentLoaded", async () => {
    const res = await fetch("http://localhost:6789/api/restaurant/me", {
        headers: {
            "Authorization": "Bearer " + token
        }
    });

    const result = await res.json();
    console.log("Restaurant Profile:", result);

    if (result.success) {
        document.getElementById("name").value = result.restaurant.name || "";
        document.getElementById("email").value = result.restaurant.email || "";
        document.getElementById("address").value = result.restaurant.address || "";
        document.getElementById("phone").value = result.restaurant.phone || "";
    } else {
        alert(result.message);
    }
});


// ------------------------------
// UPDATE RESTAURANT PROFILE
// ------------------------------
document.getElementById("restaurantProfileForm")
.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const address = document.getElementById("address").value.trim();
    const phone = document.getElementById("phone").value.trim();

    if (!name || !email || !password || !address || !phone) {
        return alert("All fields are required!");
    }

    const res = await fetch("http://localhost:6789/api/restaurant/update", {
        method: "PUT",
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email, password, address, phone })
    });

    const result = await res.json();
    console.log("Update Response:", result);

    if (result.success) {
        alert("Restaurant profile updated!");

        setTimeout(() => {
            window.location.href = "RestaurantDashboard.html";
        }, 800);

    } else {
        alert(result.message);
    }
});
