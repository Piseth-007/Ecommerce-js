let Product_array = [];
let cart = [];

fetch(
  "https://thoenthonny.github.io/data-json-computer/?fbclid=IwY2xjawRe0G1leHRuA2FlbQIxMABicmlkETFTc0dicTM2MTI5VFV6cVJqc3J0YwZhcHBfaWQQMjIyMDM5MTc4ODIwMDg5MgABHtoOmF1hwBFdoK9WyNLhd-hqUKaGtjCVei2MzQ5gA3k9Cu6ILLEuG5HrtAxx_aem_moNiMGXFtdAPq0PdtBd5Fg",
)
  .then((res) => res.json())
  .then((product) => {
    Product_array = product;
    Display(Product_array);
  })
  .catch((err) => console.log(err));

const Display = (prd) => {
  const container = document.getElementById("show-product");
  container.innerHTML = "";

  prd.slice(0, 8).forEach((element) => {
    container.innerHTML += `
      <div class="col-12 col-sm-6 col-md-4 col-lg-3">
        <div class="card h-100 border-0 product-card">
          <img src="${element.image}" class="card-img-top" />
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">${element.name}</h5>
            <p class="card-text text-muted small">${element.discription}</p>
            <h6 class="text-primary mb-3">$${element.price}</h6>
            <button onclick="AddtoCart(${element.id})"
              class="btn btn-primary mt-auto w-100">
              <i class="bi bi-cart-plus"></i> Add To Cart
            </button>
          </div>
        </div>
      </div>
    `;
  });
};

const AddtoCart = (id) => {
  const product = Product_array.find((p) => p.id === id);
  const existing = cart.find((item) => item.id === id);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  Swal.fire({
    title: "Add " + product.name + " To cart",
    icon: "success",
  });

  renderCart();
  updateCartCount();
};

function renderCart() {
  const container = document.querySelector(
    "#offcanvasScrolling .offcanvas-body",
  );
  container.innerHTML = "";

  if (cart.length === 0) {
    container.innerHTML = `<p class="text-muted">Cart is empty</p>`;
    return;
  }

  cart.forEach((item, index) => {
    container.innerHTML += `
      <div class="cart-item d-flex align-items-center gap-3 p-2 border-bottom">
        <img src="${item.image}" class="cart-img">

        <div class="flex-grow-1">
          <h6 class="mb-1">${item.name}</h6>
          <small class="text-muted">$${item.price}</small>

          <div class="d-flex align-items-center gap-2 mt-1">
            <button class="btn btn-sm btn-outline-secondary" onclick="decreaseQty(${index})">−</button>
            <span>${item.quantity}</span>
            <button class="btn btn-sm btn-outline-secondary" onclick="increaseQty(${index})">+</button>
          </div>
        </div>

        <button class="btn btn-sm btn-danger" onclick="removeFromCart(${index})">
          <i class="bi bi-trash"></i>
        </button>
      </div>
    `;
  });

  let total = cart.reduce(
    (sum, item) => sum + Number(item.price) * item.quantity,
    0,
  );

  container.innerHTML += `
    <div class="mt-3">
      <button class="btn btn-dark w-100" onclick="checkout()">
        Check Out - $${total.toFixed(2)}
      </button>
    </div>
  `;
}

function increaseQty(index) {
  cart[index].quantity += 1;
  renderCart();
  updateCartCount();
}

function decreaseQty(index) {
  if (cart[index].quantity > 1) {
    cart[index].quantity -= 1;
  } else {
    cart.splice(index, 1);
  }
  renderCart();
  updateCartCount();
}

function removeFromCart(index) {
  cart.splice(index, 1);
  renderCart();
  updateCartCount();
}

function checkout() {
  const my_pass = 160107;
  let password;

  do {
    password = prompt("Enter Your password (numbers only):");
  } while (Number(password) !== my_pass);

  Swal.fire({
    title: "Check Out success!",
    icon: "success",
  });

  cart = [];
  renderCart();
  updateCartCount();
}

function updateCartCount() {
  const totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);
  document.getElementById("cart_count").innerHTML = totalQty;
}

document.getElementById("search").addEventListener("input", function (e) {
  const value = e.target.value.toLowerCase();

  if (value === "") {
    Display(Product_array);
    return;
  }

  const result = Product_array.filter((item) =>
    item.name.toLowerCase().includes(value),
  );

  if (result.length > 0) {
    Display(result);
  } else {
    document.getElementById("show-product").innerHTML =
      `<p class="text-center text-muted mt-4">No product found</p>`;
  }
});
