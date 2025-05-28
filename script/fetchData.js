export function fetchData(callback) {
  fetch('data/data.json')
    .then(response => {
      if (!response.ok) throw new Error("Failed to load data.json");
      return response.json();
    })
    .then(data => callback(data.data[0]))
    .catch(error => console.error('Error loading or parsing JSON:', error));
}


export function populateClientDropdown(data) {
  const dropdown = document.getElementById('clientFilterDropdown');
  const clients = [...new Set(data.map(row => row.Col006))];
  clients.forEach(client => {
    const option = document.createElement('option');
    option.value = client;
    option.textContent = client;
    dropdown.appendChild(option);
  });
}
