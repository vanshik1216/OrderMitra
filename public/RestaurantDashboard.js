const token = localStorage.getItem("token");

if (!token) {
    alert("Please login first.");
    window.location.href = "login.html";
}

// ------------------------------
// LOAD RESTAURANT PROFILE
// ------------------------------
async function loadRestaurantInfo() {
    try {
        const res = await fetch("http://localhost:6789/api/restaurant/me", {
            headers: { "Authorization": "Bearer " + token }
        });

        const result = await res.json();
        console.log("Restaurant Profile:", result);

        if (result.success) {
            const r = result.restaurant;
            document.getElementById("restName").innerText = r.name;
            document.getElementById("restEmail").innerText = r.email;
            document.getElementById("restAddress").innerText = r.address;
        } else {
            alert(result.message);
        }

    } catch (err) {
        console.error(err);
        alert("Failed to load restaurant information.");
    }
}

// ------------------------------
// LOAD MENU ITEMS
// ------------------------------
async function loadMenu() {
    const list = document.getElementById("menuList");
    list.innerHTML = "<li>Loading menu...</li>";

    try {
        const res = await fetch("http://localhost:6789/api/restaurant/menu", {
            headers: { "Authorization": "Bearer " + token }
        });

        const result = await res.json();
        console.log("Menu:", result);

        if (!result.success) {
            list.innerHTML = `<li>Error loading menu</li>`;
            return;
        }

        list.innerHTML = "";

        result.menu.forEach(item => {
            const li = document.createElement("li");
            li.innerHTML = `
                <strong>${item.name}</strong> - ₹${item.price}
                <button onclick="editMenuItem(${item.id}, '${item.name}', ${item.price})" class="small-btn">Edit</button>
                <button onclick="deleteMenuItem(${item.id})" class="small-btn danger">Delete</button>
            `;
            list.appendChild(li);
        });

    } catch (err) {
        console.error(err);
        list.innerHTML = `<li>Failed to load menu.</li>`;
    }
}

// ------------------------------
// ADD MENU ITEM
// ------------------------------
async function addMenuItem() {
    const name = document.getElementById("menuName").value;
    const price = document.getElementById("menuPrice").value;

    if (!name || !price) return alert("Please fill both fields");

    const res = await fetch("http://localhost:6789/api/restaurant/menu/add", {
        method: "POST",
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, price })
    });

    const result = await res.json();

    if (result.success) {
        alert("Item added!");
        document.getElementById("menuName").value = "";
        document.getElementById("menuPrice").value = "";
        loadMenu();
    } else {
        alert(result.message);
    }
}

// ------------------------------
// EDIT MENU ITEM
// ------------------------------
function editMenuItem(id, oldName, oldPrice) {
    const newName = prompt("New Name:", oldName);
    const newPrice = prompt("New Price:", oldPrice);

    if (!newName || !newPrice) return;

    updateMenuItem(id, newName, newPrice);
}

async function updateMenuItem(id, name, price) {
    const res = await fetch(`http://localhost:6789/api/restaurant/menu/update/${id}`, {
        method: "PUT",
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, price })
    });

    const result = await res.json();
    if (result.success) {
        alert("Menu item updated!");
        loadMenu();
    } else {
        alert(result.message);
    }
}

// ------------------------------
// DELETE MENU ITEM
// ------------------------------
async function deleteMenuItem(id) {
    if (!confirm("Delete this item?")) return;

    const res = await fetch(`http://localhost:6789/api/restaurant/menu/delete/${id}`, {
        method: "DELETE",
        headers: { "Authorization": "Bearer " + token }
    });

    const result = await res.json();

    if (result.success) {
        alert("Item deleted!");
        loadMenu();
    } else {
        alert(result.message);
    }
}

// ------------------------------
// LOAD ORDERS
// ------------------------------
async function loadOrders() {
    const list = document.getElementById("ordersList");
    list.innerHTML = "<li>Loading orders...</li>";

    const res = await fetch("http://localhost:6789/api/restaurant/orders", {
        headers: { "Authorization": "Bearer " + token }
    });

    const result = await res.json();
    console.log("Orders:", result);

    if (!result.success) {
        list.innerHTML = "<li>Error loading orders</li>";
        return;
    }

    list.innerHTML = "";

    result.orders.forEach(order => {
        const li = document.createElement("li");
        li.innerHTML = `
            <strong>Order #${order.id}</strong> - ${order.user.name}
            <br>Total Items: ${order.items.length}
            <hr>
        `;
        list.appendChild(li);
    });
}

// ------------------------------
// LOGOUT
// ------------------------------
document.getElementById("logoutBtn").onclick = () => {
    localStorage.removeItem("token");
    window.location.href = "login.html";
};

// Load everything
loadRestaurantInfo();
loadMenu();
loadOrders();
