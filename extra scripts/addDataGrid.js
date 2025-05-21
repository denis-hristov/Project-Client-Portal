document.addEventListener("DOMContentLoaded", () => {
  fetch('data/data.json')
    .then(res => res.json())
    .then(data => {
      const grid = document.getElementById('data-grid');
      grid.innerHTML = '';
      data.data[0].forEach(row => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${row.Col001}</td>
          <td>${row.Col005}</td>
          <td>${row.Col002}</td>
          <td>${row.Col003}</td>
        `;
        grid.appendChild(tr);
      });
    })
    .catch(err => console.error('Error loading data:', err));
});
