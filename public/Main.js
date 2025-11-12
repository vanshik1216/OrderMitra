document.querySelector('.btn-getstarted').addEventListener('click', () => {
    alert('Get Started clicked!');
  });
  document.querySelector('.btn-signin').addEventListener('click', () => {
    alert('Sign In clicked!');
  });
  document.querySelector('.btn-primary').addEventListener('click', () => {
    alert('Order Now clicked!');
  });
  document.querySelector('.btn-outline').addEventListener('click', () => {
    alert('Browse Menu clicked!');
  });
  document.querySelector('.btn-cta').addEventListener('click', () => {
    alert('Start Ordering Now clicked!');
  });
  async function searchRestaurants() {
  const location = document.getElementById("locationInput").value.trim();
  const token = localStorage.getItem("token"); // <-- get JWT from login

  if (!token) {
    alert("Please log in first!");
    return;
  }

  try {
    const res = await fetch(`/api/restaurants?location=${encodeURIComponent(location)}`, {
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    });

    if (!res.ok) {
      const errData = await res.json();
      throw new Error(errData.message || "Failed to fetch restaurants");
    }

    const data = await res.json();
    const container = document.getElementById("restaurants");

    if (data.restaurants.length === 0) {
      container.innerHTML = `<p>No restaurants found in "${location}".</p>`;
    } else {
      container.innerHTML = data.restaurants.map(r => `
        <div class="restaurant-card">
          <h3>${r.name}</h3>
          <p>${r.address}</p>
        </div>
      `).join('');
    }

  } catch (err) {
    console.error(err);
    alert("Error: " + err.message);
  }
}
