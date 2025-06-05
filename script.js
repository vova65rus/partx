const tg = window.Telegram.WebApp;
tg.expand(); // Расширить Mini App

function searchParts() {
  const query = document.getElementById('searchInput').value.trim();
  if (!query) return;

  document.getElementById('results').innerHTML = '⏳ Ищем...';

  fetch(`https://script.google.com/macros/s/AKfycbxBtQU_L6UJZN1_SyXiTIxjZnOE-8eClEgOQQsE2fFzWuid21SX-1pxuxFhq2b_YyjS/exec?query=${encodeURIComponent(query)}`)
    .then(res => res.json())
    .then(data => {
      const resultsDiv = document.getElementById('results');
      resultsDiv.innerHTML = '';

      if (!data || data.length === 0) {
        resultsDiv.innerHTML = '😔 Ничего не найдено';
        return;
      }

      data.forEach(part => {
        const card = document.createElement('div');
        card.className = 'card' + (part.premium ? ' premium' : '');

        card.innerHTML = `
          <strong>📦 ${part.name} (${part.part})</strong><br>
          🚗 ${part.model}, кузов: ${part.body}<br>
          💰 ${part.price}₽ — ${part.availability}<br>
          🏬 ${part.store} — ${part.city}<br>
        `;

        resultsDiv.appendChild(card);
      });
    });
}
