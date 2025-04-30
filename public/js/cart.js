(async function(){
  const res = await fetch('/api/cart', {
    headers:{ 'Authorization':'Bearer '+localStorage.getItem('token') }
  });
  const cart = await res.json();
  const ul = document.getElementById('cartItems');
  ul.innerHTML = cart.items.map(i=>`
    <li class="list-group-item d-flex justify-content-between">
      ${i.product.name} x${i.qty}
      <button data-id="${i.product._id}" class="btn btn-sm btn-danger remove">Sil</button>
    </li>
  `).join('');
  document.querySelectorAll('.remove').forEach(btn=>{
    btn.onclick = async ()=> {
      await fetch(`/api/cart/${btn.dataset.id}`, {
        method:'DELETE',
        headers:{ 'Authorization':'Bearer '+localStorage.getItem('token') }
      });
      location.reload();
    };
  });
  document.getElementById('placeOrder').onclick = async ()=>{
    await fetch('/api/orders', {
      method:'POST',
      headers:{ 'Authorization':'Bearer '+localStorage.getItem('token') }
    });
    alert('Sipariş oluşturuldu');
    location.href='orders.html';
  };
})();
