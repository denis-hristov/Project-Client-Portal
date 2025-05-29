let allData = [];

// content loader
document.addEventListener("DOMContentLoaded", () => {
	// ui navigation
  	const path = window.location.pathname;
  	if (path.includes("index.html")) {
  	  	document.getElementById("nav-dashboard")?.classList.add("active");
  	} else if (path.includes("report.html")) {
  	  	document.getElementById("nav-report")?.classList.add("active");
  	}

	// load data
	fetch('../data/data.json')
	  	.then(res => res.json())
	  	.then(json => {
	  	  allData = json.data.flat();
		
	  	  populateClientDropdown(allData);
		
	  	  const selectedClient = localStorage.getItem('selectedClient') || 'All';
	  	  renderFilteredData(selectedClient);
	  	})
	  	.catch(err => console.error('Error JSON:', err));

});


// create drop-down menu
function populateClientDropdown(data) {
  	const dropdown = document.getElementById('clientFilterDropdown');
  	const uniqueClients = [...new Set(data.map(row => row.Col006).filter(c => c && c.trim() !== ''))];

  	uniqueClients.forEach(client => {
  	  	const option = document.createElement('option');
  	  	option.value = client;
  	  	option.textContent = client;
  	  	dropdown.appendChild(option);
  	});

  	const savedClient = localStorage.getItem('selectedClient');
  	if (savedClient && uniqueClients.includes(savedClient)) {
  	  	dropdown.value = savedClient;
  	} else {
  	  	dropdown.value = 'All';
  	}

  	dropdown.addEventListener('change', () => {
  	  	const selectedClient = dropdown.value;
  	  	localStorage.setItem('selectedClient', selectedClient);
  	  	renderFilteredData(selectedClient);
  	});
}


// filter data
function renderFilteredData(client) {
  	const filtered = client === 'All'
  	  ? allData
  	  : allData.filter(row => row.Col006 === client);

  	const grouped = {};

  	filtered.forEach(entry => {
  	  	const question = entry.Col005;
  	  	const answer = entry.Col002;
  	  	const count = entry.Col003;
		
  	  	if (!grouped[question]) grouped[question] = {};
  	  	if (!grouped[question][answer]) grouped[question][answer] = 0;
		
  	  	grouped[question][answer] += count;
  	});

  	const formatted = Object.entries(grouped).map(([question, answers]) => ({question, answers}));

  	renderReportingTable(formatted);
}


// table create
function renderReportingTable(data) {
  	const tbody = document.getElementById('report-body');
  	tbody.innerHTML = '';

  	data.forEach((item, index) => {
  	  	const total = Object.values(item.answers).reduce((a, b) => a + b, 0);
  	  	const sorted = Object.entries(item.answers)
		
		
  	  	let topAnswer = null;
  	  	let topCount = -Infinity;
		
  	  	sorted.forEach(([answer, count]) => {
  	  	  	if (count > topCount) {
  	  	  	  	topCount = count;
  	  	  	  	topAnswer = answer;
  	  	  	}
  	  	});


		const topPercent = total ? ((topCount / total) * 100).toFixed(2) : '0.00';

		// table main row
  	  	const mainRow = document.createElement('tr');
  	  	mainRow.classList.add('main-row');
  	  	mainRow.innerHTML = `
  	  	  	<td>${item.question}</td>
  	  	  	<td>${topAnswer}<br><small>${topPercent}%</small></td>
  	  	  	<td>${total}</td>
		`;


		// show/hide (checkbox)
  	  	mainRow.addEventListener('click', () => {
  	  	  	const detailRow = document.getElementById(`detail-${index}`);
  	  	  	const exclusiveMode = document.getElementById('exclusiveToggle').checked;
			
  	  	  	if (exclusiveMode) {
  	  	  	  	const allDetails = document.querySelectorAll('.detail-row');
  	  	  	  	allDetails.forEach(row => {
  	  	  	  	  	if (row !== detailRow) row.style.display = 'none';
  	  	  	  	});
  	  	  	}
		  
  	  	  	detailRow.style.display = detailRow.style.display === 'table-row' ? 'none' : 'table-row';
  	  	});



  	  	const detailRow = document.createElement('tr');
  	  	detailRow.id = `detail-${index}`;
  	  	detailRow.classList.add('detail-row');


		// drop-down details table
  	  	let inner = `
  	  	  	<table class="inner-table">
  	  	    	<thead>
  	  	    	  	<tr><th>Answer</th><th>Percentage</th><th>Count</th></tr>
  	  	    	</thead>
  	  	    <tbody>
  	  	`;



		sorted.forEach(([answer, count]) => {
  	    	const percentValue = total ? (count / total) * 100 : 0;
			const percent = percentValue.toFixed(2);

			// ui color by %
			let percentClass = '';
			if (percentValue >= 90) {
			  	percentClass = 'percent-green';
			} else if (percentValue >= 60) {
			  	percentClass = 'percent-orange';
			} else {
			  	percentClass = 'percent-red';
			}

			// details table row
  	    	const isTop = answer === topAnswer;
  	    	inner += `
  	    	  	<tr class="${isTop ? 'top-answer' : ''}">
  	    	  	  	<td>
  	    	  	  	  	${answer}
  	    	  	  	  	${isTop ? `
  	    	  	  	    <span class="tooltip-wrapper">
  	    	  	  	      	<div class="tooltip-inside"><i class="fa-solid fa-arrow-left"></i> TOP</div>
  	    	  	  	    </span>` : ''}
  	    	  	  	</td>
  	    	  	  	<td class="${percentClass}">${percent}%</td>
  	    	  	  	<td>${count}</td>
  	    	  	</tr>
  	    	`;
  	  	});



  	  	inner += '</tbody></table>';
  	  	detailRow.innerHTML = `<td colspan="3">${inner}</td>`;
		
		
		
  	  	tbody.appendChild(mainRow);
  	  	tbody.appendChild(detailRow);

		// arrow disappearance
		const newTooltips = detailRow.querySelectorAll('.tooltip-wrapper');
		newTooltips.forEach(wrapper => {
		  	wrapper.addEventListener('click', function () {
		  	  	const tooltip = wrapper.querySelector('.tooltip-inside');
		  	  	tooltip.classList.add('hide-tooltip');
				
		  	  	setTimeout(() => {
		  	  	  	tooltip.classList.remove('hide-tooltip');
		  	  	}, 3000);
		  	});
		});
  	});
}	
