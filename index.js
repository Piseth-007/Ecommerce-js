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

  prd.slice(0, 8).forEach((element, index) => {
    container.innerHTML += `
      <div class="col-12 col-sm-6 col-md-4 col-lg-3">
        <div class="card h-100 border-0 product-card">

          <img src="${element.image}" class="card-img-top" alt=".." />

          <div class="card-body d-flex flex-column">

            <h5 class="card-title">${element.name}</h5>

            <p class="card-text text-muted small">
              ${element.discription}
            </p>

            <h6 class="text-primary mb-3">$${element.price}</h6>

            <button onclick="AddtoCard(${index})"
              class="btn btn-primary mt-auto w-100">

              <i class="bi bi-cart-plus"></i> Add To Cart
            </button>

          </div>
        </div>
      </div>
    `;
  });
};
const AddtoCard = (index) => {
  const product = Product_array[index];

  cart.push(product);

  console.log(cart);

  document.getElementById("cart_count").innerText = cart.length;

  renderCart();
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
                </div>

                <button class="btn btn-sm btn-danger"
                    onclick="removeFromCart(${index})">
                    <i class="bi bi-trash"></i>
                </button>

            </div>
        `;
  });
}
