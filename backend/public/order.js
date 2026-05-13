const params = new URLSearchParams(window.location.search);

const id = params.get("id");

/* ================= LOAD ORDER ================= */

fetch(API + "/orders/" + id)

.then(res => res.json())

.then(order => {

  let itemsHTML = "";

  order.items.forEach(i => {

    itemsHTML += `

      <div class="card">

        <h3>${i.name}</h3>

        <p>Size: ${i.size}</p>

        <p>Color: ${i.color}</p>

        <p>Quantity: ${i.qty}</p>

      </div>

    `;
  });

  document.getElementById("order").innerHTML = `

    <h2>Order Details</h2>

    ${itemsHTML}

    <hr>

    <h3>Customer Info</h3>

    <p><strong>Name:</strong> ${order.name}</p>

    <p><strong>Phone:</strong> ${order.phone}</p>

    <p><strong>Address:</strong> ${order.address}</p>

  `;
})

.catch(err => {

  console.log(err);

  document.getElementById("order").innerHTML = `
    <h2>Failed To Load Order</h2>
  `;
});