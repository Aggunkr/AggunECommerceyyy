(async function(){
  const params = new URLSearchParams(location.search);
  const id = params.get('id');
  if(!id) return location.href='products.html';

  const [pRes, rRes] = await Promise.all([
    fetch(`/api/products/${id}`),
    fetch(`/api/products/${id}/reviews`)
  ]);
  const product = await pRes.json();
  document.getElementById('productDetail').innerHTML = `
    <div class="row">
      <div class="col-md-6"><img src="${product.imageUrl}" class="w-100"></div>
      <div class="col-md-6">
        <h2>${product.name}</h2>
        <p>${product.description}</p>
        <h4>${product.price}₺</h4>
        <button id="addFav" class="btn btn-outline-warning">Favoriye Ekle</button>
        <button id="addCart" class="btn btn-success">Sepete Ekle</button>
      </div>
    </div>
  `;

  // yorumlar
  const reviews = await rRes.json();
  document.getElementById('reviews').innerHTML = reviews.map(r=>`
    <div class="border p-2 mb-2">
      <strong>${r.user.username}</strong>: ${r.comment}
    </div>
  `).join('');

  // favori & sepete ekle
  document.getElementById('addFav').onclick = async ()=>{
    await fetch('/api/users/favorites', {
      method:'POST', headers:{
        'Content-Type':'application/json',
        'Authorization':'Bearer '+localStorage.getItem('token')
      },
      body: JSON.stringify({ productId:id })
    });
    alert('Favorilere eklendi');
  };
  document.getElementById('addCart').onclick = async ()=>{
    await fetch('/api/cart', {
      method:'POST', headers:{
        'Content-Type':'application/json',
        'Authorization':'Bearer '+localStorage.getItem('token')
      },
      body: JSON.stringify({ productId:id, qty:1 })
    });
    alert('Sepete eklendi');
  };

  // yeni yorum
  document.getElementById('reviewForm').onsubmit = async e=>{
    e.preventDefault();
    const comment = e.target.comment.value;
    await fetch(`/api/products/${id}/reviews`, {
      method:'POST', headers:{
        'Content-Type':'application/json',
        'Authorization':'Bearer '+localStorage.getItem('token')
      },
      body: JSON.stringify({ comment })
    });
    location.reload();
  };
})();
