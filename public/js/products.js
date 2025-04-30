(async function(){
  const res = await fetch('/api/products');
  const list = await res.json();
  document.getElementById('productList').innerHTML = list.map(p=>`
    <div class="col-md-4">
      <div class="card h-100 shadow-sm">
        <img src="${p.imageUrl}" class="card-img-top" alt="${p.name}">
        <div class="card-body d-flex flex-column">
          <h5>${p.name}</h5>
          <p class="flex-grow-1">${p.description}</p>
          <div class="d-flex justify-content-between align-items-center">
            <span class="text-primary">${p.price}₺</span>
            <a href="product.html?id=${p._id}" class="btn btn-sm btn-outline-primary">Detay</a>
          </div>
        </div>
      </div>
    </div>
  `).join('');
})();
