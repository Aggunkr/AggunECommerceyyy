(async function(){
  const res = await fetch('/api/orders', {
    headers:{ 'Authorization':'Bearer '+localStorage.getItem('token') }
  });
  const orders = await res.json();
  document.getElementById('ordersList').innerHTML = orders.map(o=>`
    <li class="list-group-item">
      Sipariş #${o._id} — Toplam: ${o.total}₺ — ${new Date(o.createdAt).toLocaleString()}
    </li>
  `).join('');
})();
