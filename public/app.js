fetch("http://localhost:3000/products")
.then(res => res.json())
.then(data => {

  let html = "";

  data.forEach(product => {

    html += `
      <div class="card">

        <h3>${product.name}</h3>

        <p class="price">${product.price}$</p>

        <p>${product.description || ""}</p>

        <a href="product.html?id=${product._id}">
          👁 عرض المنتج
        </a>

      </div>
    `;
  });

  document.getElementById("products").innerHTML = html;
});