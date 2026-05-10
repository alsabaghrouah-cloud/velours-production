function login() {

  const user = document.getElementById("user").value;
  const pass = document.getElementById("pass").value;

  if (user === "admin" && pass === "1234") {

    document.getElementById("login").style.display = "none";

    document.getElementById("panel").style.display = "block";

    loadProducts();

    loadOrders();
  }
}

/* ================= ADD PRODUCT ================= */

function addProduct() {

  const name = document.getElementById("name").value;

  const price = document.getElementById("price").value;

  const desc = document.getElementById("desc").value;

  const instagramLink = document.getElementById("instagramLink").value;

  const inputs = document.querySelectorAll("input[type=checkbox]");

  let sizes = [];

  let colors = [];

  inputs.forEach(c => {

    if (c.checked) {

      if (["S", "M", "L", "XL", "XXL"].includes(c.value)) {

        sizes.push(c.value);

      } else {

        colors.push(c.value);
      }
    }
  });

  fetch("http://localhost:3000/products", {

    method: "POST",

    headers: {
      "Content-Type": "application/json"
    },

    body: JSON.stringify({

      name,

      price,

      description: desc,

      sizes,

      colors,

      instagramLink
    })
  })

  .then(res => res.json())

  .then(data => {

    console.log(data);

    alert("Product Added ✅");

    loadProducts();
  })

  .catch(err => {

    console.log(err);

    alert("Failed");
  });
}

/* ================= LOAD PRODUCTS ================= */

function loadProducts() {

  fetch("http://localhost:3000/products")

  .then(res => res.json())

  .then(data => {

    let html = "";

    data.forEach(p => {

      html += `

        <div class="card">

          <h3>${p.name}</h3>

          <p>${p.price}$</p>

          <button onclick="deleteProduct('${p._id}')">
            Delete
          </button>

        </div>

      `;
    });

    document.getElementById("list").innerHTML = html;
  });
}

/* ================= DELETE PRODUCT ================= */

function deleteProduct(id) {

  const confirmDelete = confirm("Delete this product?");

  if (!confirmDelete) return;

  fetch("http://localhost:3000/products/" + id, {

    method: "DELETE"
  })

  .then(() => {

    alert("Deleted ✅");

    loadProducts();
  });
}

/* ================= LOAD ORDERS ================= */

function loadOrders() {

  fetch("http://localhost:3000/orders")

  .then(res => res.json())

  .then(data => {

    let html = "";

    data.forEach(o => {

      html += `

        <div class="card" onclick="openOrder('${o._id}')">

          <h3>${o.name}</h3>

          <p>${o.phone}</p>

          <button onclick="deleteOrder(event, '${o._id}')">
            Delete Order
          </button>

        </div>

      `;
    });

    document.getElementById("orders").innerHTML = html;
  });
}

/* ================= OPEN ORDER ================= */

function openOrder(id) {

  window.location.href = "order.html?id=" + id;
}

/* ================= DELETE ORDER ================= */

function deleteOrder(event, id) {

  event.stopPropagation();

  const confirmDelete = confirm("Delete this order?");

  if (!confirmDelete) return;

  fetch("http://localhost:3000/orders/" + id, {

    method: "DELETE"
  })

  .then(() => {

    alert("Order Deleted ✅");

    loadOrders();
  });
}