const params = new URLSearchParams(window.location.search);
const id = params.get("id");

/* ================= LOAD PRODUCT ================= */

fetch(API + "/products")

.then(res => res.json())

.then(data => {

  const product = data.find(p => String(p._id) === String(id));

  if (!product) {

    document.getElementById("product").innerHTML = `
      <h2>Product Not Found</h2>
    `;

    return;
  }

  /* ================= SIZES ================= */

  let sizesHTML = "";

  product.sizes?.forEach(size => {

    sizesHTML += `
      <button class="option-btn" onclick="selectSize('${size}')">
        ${size}
      </button>
    `;
  });

  /* ================= COLORS ================= */

  let colorsHTML = "";

  product.colors?.forEach(color => {

    colorsHTML += `
      <button class="option-btn" onclick="selectColor('${color}')">
        ${color}
      </button>
    `;
  });

  /* ================= PAGE ================= */

  document.getElementById("product").innerHTML = `

    <div class="card">

      <h1>${product.name}</h1>

      <h3>${product.price}$</h3>

      <p>${product.description || ""}</p>

      <br>

      <a href="${product.instagramLink}" target="_blank">
        📸 مشاهدة صور المنتج
      </a>

      <br><br>

      <h3>Sizes</h3>

      <div>
        ${sizesHTML}
      </div>

      <h3>Colors</h3>

      <div>
        ${colorsHTML}
      </div>

      <br>

      <button class="main-btn" onclick="addToCart()">
        Add To Cart
      </button>

    </div>

  `;

  window.currentProduct = product;
});

/* ================= SELECT SIZE ================= */

let selectedSize = "";

function selectSize(size) {

  selectedSize = size;

  alert("Selected Size: " + size);
}

/* ================= SELECT COLOR ================= */

let selectedColor = "";

function selectColor(color) {

  selectedColor = color;

  alert("Selected Color: " + color);
}

/* ================= ADD TO CART ================= */

function addToCart() {

  if (!selectedSize || !selectedColor) {

    alert("Please select size and color");

    return;
  }

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  cart.push({

    ...window.currentProduct,

    size: selectedSize,

    color: selectedColor,

    qty: 1

  });

  localStorage.setItem("cart", JSON.stringify(cart));

  alert("Added To Cart 🛒");
}