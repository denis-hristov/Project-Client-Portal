function loadSummarizedData() {
  fetch('data/data.json')
    .then(response => {
      if (!response.ok) throw new Error("Failed to load data.json");
      return response.json();
    })
    .then(jsonData => {
      const gridBody = document.getElementById('data-grid');
      gridBody.innerHTML = '';

      const groupedData = {};

      jsonData.data[0].forEach(row => {
        const id = row.Col001;
        if (!groupedData[id]) {
          groupedData[id] = {
            Col001: row.Col001,
            Col005: row.Col005,
            answers: [],
            totalResponses: 0
          };
        }

        groupedData[id].answers.push(row.Col002);
        groupedData[id].totalResponses += row.Col003;
      });

      
      Object.values(groupedData).forEach(group => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${group.Col001}</td>
          <td>${group.Col005}</td>
          <td>${group.answers.join(', ')}</td>
          <td>${group.totalResponses}</td>
        `;
        gridBody.appendChild(tr);
      });

      // Създаваме графика с Highcharts
      const categories = [];
      const data = [];

      Object.values(groupedData).forEach(group => {
        categories.push(group.Col005); // Или group.Col001
        data.push(group.totalResponses);
      });

      Highcharts.chart('chart-container', {
        chart: {
          type: 'column'
        },
        title: {
          text: 'Total responses by group'
        },
        xAxis: {
          categories: categories,
          title: {
            text: 'Group'
          }
        },
        yAxis: {
          title: {
            text: 'Number of answers'
          }
        },
        series: [{
          name: 'Answers',
          data: data
        }]
      });
    })
    .catch(error => console.error('Error loading or parsing JSON:', error));
}

document.addEventListener("DOMContentLoaded", () => {
  const chart1Btn = document.getElementById("chart1");
  if (chart1Btn) {
    chart1Btn.addEventListener("click", loadSummarizedData);
  }
});
