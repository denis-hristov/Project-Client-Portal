fetch("../data/data.json")
  .then(response => {
    if (!response.ok) {
      throw new Error("Error loading JSON");
    }
    return response.json();
  })
  .then(json => {
    
    const flatData = json.responses.flat();
    const processed = processData(flatData);
    renderChartData(processed);
  })
  .catch(error => {
    console.error("Error:", error);
  });


function processData(data) {
  const grouped = {};

  data.forEach(row => {
    if (!grouped[row.Col005] || grouped[row.Col005].Col003 < row.Col003) {
      grouped[row.Col005] = row;
    }
  });

  return Object.values(grouped);
}

function renderChartData(processedData) {
  const container = document.getElementById("chart-container");
  container.innerHTML = "";

  processedData.forEach(item => {
    const percent = ((item.Col003 / item.total) * 100).toFixed(1);
    const block = document.createElement("div");
    block.classList.add("chart-block");
    block.innerHTML = `
      <h3>${item.Col005}</h3>
      <p><strong>${item.Col002}</strong> – ${percent}%</p>
      <p>Брой отговори: ${item.Col003}</p>
      <hr/>
    `;
    container.appendChild(block);
  });
}
