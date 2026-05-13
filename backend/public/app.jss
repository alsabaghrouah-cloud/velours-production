fetch("http://localhost:3000/products")
.then(res => res.json())
.then(data => {
  let html = "";

  data.forEach(p => {
    html += `
      <div class="card">
        <img src="${p.image}">
        <h3>${p.name}</h3>
        <p class="price">${p.price}$</p>
      </div>
    `;
  });

  document.getElementById("products").innerHTML = html;
});