fetch('../data/data.json')
  .then(res => res.json())
  .then(json => {
    const flat = json.data.flat();
    const grouped = {};

    
    flat.forEach(entry => {
      const question = entry.Col005;
      const answer = entry.Col002;
      const count = entry.Col003;

      if (!grouped[question]) {
        grouped[question] = {};
      }

      if (!grouped[question][answer]) {
        grouped[question][answer] = 0;
      }

      grouped[question][answer] += count;
    });


    const formatted = Object.entries(grouped).map(([question, answers]) => ({
      question,
      answers
    }));

    renderReportingTable(formatted);
  })
  .catch(err => console.error('Грешка при зареждане на JSON:', err));

function renderReportingTable(data) {
  const tbody = document.getElementById('report-body');
  tbody.innerHTML = '';

  data.forEach((item, index) => {
    const total = Object.values(item.answers).reduce((a, b) => a + b, 0);
    const sorted = Object.entries(item.answers).sort((a, b) => b[1] - a[1]);
    const [topAnswer, topCount] = sorted[0];
    const topPercent = total ? ((topCount / total) * 100).toFixed(2) : '0.00';

    const mainRow = document.createElement('tr');
    mainRow.classList.add('main-row');
    mainRow.innerHTML = `
      <td>${item.question}</td>
      <td>${topAnswer}<br><small>${topPercent}%</small></td>
      <td>${total}</td>
    `;
    


 mainRow.addEventListener('click', () => {
  const detailRow = document.getElementById(`detail-${index}`);
  const exclusiveMode = document.getElementById('exclusiveToggle').checked;

  if (exclusiveMode) {
    const allDetails = document.querySelectorAll('.detail-row');
    allDetails.forEach(row => {
      if (row !== detailRow) {
        row.style.display = 'none';
      }
    });
  }

  detailRow.style.display = detailRow.style.display === 'table-row' ? 'none' : 'table-row';
});








    const detailRow = document.createElement('tr');
    detailRow.id = `detail-${index}`;
    detailRow.classList.add('detail-row');

    let inner = `
      <table class="inner-table">
        <thead>
          <tr><th>Answer</th><th>Percentage</th><th>Count</th></tr>
        </thead>
        <tbody>
    `;

    sorted.forEach(([answer, count]) => {
      const percent = total ? ((count / total) * 100).toFixed(2) : '0.00';
      const isTop = answer === topAnswer;
      inner += `
        <tr class="${isTop ? 'top-answer' : ''}">
          <td>
          ${answer}
            ${isTop ? `
                <span class="tooltip-wrapper">
                    <div class="tooltip-inside"><i class="fa-solid fa-arrow-left"></i> TOP</div>
                </span>
            ` : ''}</td>
          <td>${percent}%</td>
          <td>${count}</td>
        </tr>
      `;
    });

    inner += '</tbody></table>';
    detailRow.innerHTML = `<td colspan="3">${inner}</td>`;

    tbody.appendChild(mainRow);
    tbody.appendChild(detailRow);
  });
}
