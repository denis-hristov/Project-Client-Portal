import { fetchData, populateClientDropdown } from './fetchData.js';
import { renderFullTable, renderSummarizedTable,
    renderTop3Questions, renderBottom3Questions, } from './renderTable.js';
import { destroyCurrentChart } from './renderChart.js';

let selectedClient = 'All';


function setActiveButton(clickedBtn) {
  document.querySelectorAll('.chart-box').forEach(btn => btn.classList.remove('active'));
  clickedBtn.classList.add('active');
}

document.addEventListener("DOMContentLoaded", () => {
  const chart1Btn = document.getElementById("chart1");
  const chart2Btn = document.getElementById("chart2");
  const chart3Btn = document.getElementById("chart3");
  const chart4Btn = document.getElementById("chart4");

  if (chart1Btn) {
    chart1Btn.addEventListener("click", () => {
        setActiveButton(chart1Btn);
        destroyCurrentChart();
        fetchData(data => renderFullTable(filterByClient(data, selectedClient)));
    });
  }

  if (chart2Btn) {
    chart2Btn.addEventListener("click", () => {
      setActiveButton(chart2Btn);
      fetchData(data => renderSummarizedTable(filterByClient(data, selectedClient)));
    });
  }

  if (chart3Btn) {
    chart3Btn.addEventListener("click", () => {
      setActiveButton(chart3Btn);
      fetchData(data => renderTop3Questions(filterByClient(data, selectedClient)));
    });
  }

  if (chart4Btn) {
    chart4Btn.addEventListener("click", () => {
      setActiveButton(chart4Btn);
      fetchData(data => renderBottom3Questions(filterByClient(data, selectedClient)));
    });
  }
  
  fetchData((data) => {
    populateClientDropdown(data);
    renderFullTable(filterByClient(data, selectedClient));
  });
  
  document.getElementById('clientFilterDropdown').addEventListener('change', (e) => {
    selectedClient = e.target.value;
  
    localStorage.setItem('selectedClient', selectedClient);

    const activeTab = document.querySelector('.chart-box.active')?.id || 'chart1';
  
    fetchData((data) => {
      const filtered = filterByClient(data, selectedClient);
    
      switch (activeTab) {
        case 'chart1':
          destroyCurrentChart();
          renderFullTable(filtered);
          break;
        case 'chart2':
          renderSummarizedTable(filtered);
          break;
        case 'chart3':
          renderTop3Questions(filtered);
          break;
        case 'chart4':
          renderBottom3Questions(filtered);
          break;
      }
    });
  });
});



function filterByClient(data, clientName) {
  return clientName === 'All'
    ? data
    : data.filter(row => row.Col006 === clientName);
}