import { renderChart } from './renderChart.js';
import { renderChartTop3 } from './renderChart.js';
import { renderGroupedChart } from './renderChart.js';

export function renderFullTable(data) {
  const grid = document.getElementById('data-grid');
  grid.innerHTML = '';
  data.forEach(row => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${row.Col001}</td>
      <td>${row.Col005}</td>
      <td>${row.Col002}</td>
      <td>${row.Col003}</td>
    `;
    grid.appendChild(tr);
  });
}




export function renderSummarizedTable(data) {
  const gridBody = document.getElementById('data-grid');
  gridBody.innerHTML = '';

  const groupedData = {};

  data.forEach(row => {
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

  renderChart(groupedData);
}




export function renderTop3Questions(data) {
  const grid = document.getElementById('data-grid');
  grid.innerHTML = '';

  const questionStats = {};

  data.forEach(row => {
    const question = row.Col005;
    const answer = row.Col002;
    const count = row.Col003;

    if (!questionStats[question]) {
      questionStats[question] = {
        total: 0,
        answers: {}
      };
    }

    questionStats[question].total += count;

    if (!questionStats[question].answers[answer]) {
      questionStats[question].answers[answer] = 0;
    }

    questionStats[question].answers[answer] += count;
  });

  
  const top3 = Object.entries(questionStats)
    .sort((a, b) => b[1].total - a[1].total)
    .slice(0, 3);


  top3.forEach(([question, stats]) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${question}</td>
      <td>${stats.total}</td>
      <td>${Object.entries(stats.answers).map(([ans, cnt]) => `${ans} (${cnt})`).join(', ')}</td>
    `;
    grid.appendChild(tr);
  });

  renderChartTop3(top3);
}




export function renderBottom3Questions(data) {
  const grid = document.getElementById('data-grid');
  grid.innerHTML = '';

  const questionStats = {};

  data.forEach(row => {
    const question = row.Col005;
    const answer = row.Col002;
    const count = row.Col003;

    if (!questionStats[question]) {
      questionStats[question] = {
        total: 0,
        answers: {}
      };
    }

    questionStats[question].total += count;

    if (!questionStats[question].answers[answer]) {
      questionStats[question].answers[answer] = 0;
    }

    questionStats[question].answers[answer] += count;
  });

  
  const bottom3 = Object.entries(questionStats)
    .sort((a, b) => a[1].total - b[1].total)
    .slice(0, 3);

  
  bottom3.forEach(([question, stats]) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${question}</td>
      <td>${stats.total}</td>
      <td>${Object.entries(stats.answers).map(([ans, cnt]) => `${ans} (${cnt})`).join(', ')}</td>
    `;
    grid.appendChild(tr);
  });

  renderGroupedChart(bottom3, 'Bottom 3 Questions – Answer Breakdown');
}




export function renderExpandableAnswersTable(data) {
  const tbody = document.getElementById('data-grid');
  tbody.innerHTML = '';

  const questionStats = {};

  // Групиране по въпроси и отговори
  data.forEach(row => {
    const question = row.Col005;
    const answer = row.Col002;
    const count = row.Col003;

    if (!questionStats[question]) {
      questionStats[question] = { total: 0, answers: {} };
    }

    if (!questionStats[question].answers[answer]) {
      questionStats[question].answers[answer] = 0;
    }

    questionStats[question].answers[answer] += count;
    questionStats[question].total += count;
  });

  Object.entries(questionStats).forEach(([question, stat], index) => {
    const entries = Object.entries(stat.answers);
    const total = stat.total;
    const [topAnswer, topCount] = entries.sort((a, b) => b[1] - a[1])[0];
    const topPercent = ((topCount / total) * 100).toFixed(2);

    // Основен ред
    const mainRow = document.createElement('tr');
    mainRow.classList.add('main-row');
    mainRow.innerHTML = `
      <td>${question}</td>
      <td>${topAnswer}<br><small>${topPercent}%</small></td>
      <td>${total} <span class="toggle-arrow" data-target="details-${index}">▼</span></td>
    `;
    tbody.appendChild(mainRow);

    // Детайлен ред
    const detailRow = document.createElement('tr');
    detailRow.classList.add('detail-row');
    detailRow.id = `details-${index}`;
    detailRow.style.display = 'none';

    let detailsTable = `
      <table class="inner-table">
        <thead>
          <tr><th>Answer</th><th>Percentage</th><th>Count</th></tr>
        </thead>
        <tbody>
    `;

    entries.forEach(([answer, count]) => {
      const percent = ((count / total) * 100).toFixed(2);
      const isTop = answer === topAnswer;
      detailsTable += `
        <tr class="${isTop ? 'top-answer' : ''}">
          <td>${isTop ? '<span class="flag">TOP</span> ' : ''}${answer}</td>
          <td>${percent}%</td>
          <td>${count}</td>
        </tr>
      `;
    });

    detailsTable += '</tbody></table>';
    detailRow.innerHTML = `<td colspan="3">${detailsTable}</td>`;
    tbody.appendChild(detailRow);
  });

  // Добавяме toggle функционалност
  document.querySelectorAll('.toggle-arrow').forEach(el => {
    el.addEventListener('click', () => {
      const target = document.getElementById(el.dataset.target);
      target.style.display = target.style.display === 'none' ? '' : 'none';
      el.textContent = el.textContent === '▼' ? '▲' : '▼';
    });
  });
}

