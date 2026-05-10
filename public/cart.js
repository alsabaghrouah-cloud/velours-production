let cart = JSON.parse(localStorage.getItem("cart")) || [];

/* ================= SAVE CART ================= */

function saveCart() {

  localStorage.setItem("cart", JSON.stringify(cart));
}

/* ================= QUANTITY ================= */

function increase(i) {

  cart[i].qty++;

  saveCart();

  location.reload();
}

function decrease(i) {

  if (cart[i].qty > 1) {

    cart[i].qty--;
  }

  saveCart();

  location.reload();
}

/* ================= REMOVE ITEM ================= */

function removeItem(i) {

  cart.splice(i, 1);

  saveCart();

  location.reload();
}

/* ================= RENDER CART ================= */

let html = "";

let total = 0;

cart.forEach((p, i) => {

  total += p.price * p.qty;

  html += `

    <div class="card">

      <h3>${p.name}</h3>

      <p>Size: ${p.size}</p>

      <p>Color: ${p.color}</p>

      <p class="price">${p.price}$</p>

      <div style="margin-top:10px;">

        <button onclick="decrease(${i})">
          -
        </button>

        <span style="margin:0 10px;">
          ${p.qty}
        </span>

        <button onclick="increase(${i})">
          +
        </button>

      </div>

      <br>

      <button onclick="removeItem(${i})">
        Remove
      </button>

    </div>

  `;
});

html += `

  <h2 style="text-align:center;">
    Total: ${total}$
  </h2>

`;

document.getElementById("cart").innerHTML = html;

/* ================= CHECKOUT ================= */

function openCheckout() {

  document.getElementById("checkoutModal").style.display = "flex";
}

/* ================= SUBMIT ORDER ================= */

function submitOrder() {

  const name = document.getElementById("name").value;

  const phone = document.getElementById("phone").value;

  const address = document.getElementById("address").value;

  if (!name || !phone || !address) {

    alert("Please fill all fields");

    return;
  }

  fetch("http://localhost:3000/orders", {

    method: "POST",

    headers: {
      "Content-Type": "application/json"
    },

    body: JSON.stringify({

      items: cart,

      name,

      phone,

      address
    })
  })

  .then(res => res.json())

  .then(() => {

    alert("Order Sent 🚀");

    localStorage.removeItem("cart");

    window.location.href = "/";
  });
}