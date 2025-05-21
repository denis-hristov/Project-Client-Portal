import { fetchData } from './fetchData.js';
import { renderFullTable, renderSummarizedTable,
    renderTop3Questions, renderBottom3Questions  } from './renderTable.js';
import { destroyCurrentChart } from './renderChart.js';

document.addEventListener("DOMContentLoaded", () => {
  const chart1Btn = document.getElementById("chart1");
  const chart2Btn = document.getElementById("chart2");
  const chart3Btn = document.getElementById("chart3");
  const chart4Btn = document.getElementById("chart4");

  if (chart1Btn) {
    chart1Btn.addEventListener("click", () => {
        destroyCurrentChart();
        fetchData(renderFullTable);
    });
  }

  if (chart2Btn) {
    chart2Btn.addEventListener("click", () => fetchData(renderSummarizedTable));
  }

  if (chart3Btn) {
    chart3Btn.addEventListener("click", () => fetchData(renderTop3Questions));
  }

  if (chart4Btn) {
    chart4Btn.addEventListener("click", () => fetchData(renderBottom3Questions));
  }
  
  fetchData(renderFullTable);
});
