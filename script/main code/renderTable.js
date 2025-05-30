import { renderChart } from './renderChart.js';
import { renderChartTop3 } from './renderChart.js';
import { renderGroupedChart } from './renderChart.js';

// all data table
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



// group table
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



// top 3 table
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
  	  	  	  	answers: {},
				idRow: row.Col001
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
			<td>${stats.idRow}</td>
  	  	  	<td>${question}</td>
  	  	  	<td>${stats.total}</td>
  	  	  	<td>${Object.entries(stats.answers).map(([ans, cnt]) => `${ans} (${cnt})`).join(', ')}</td>
  	  	`;
  	  	grid.appendChild(tr);
  	});

  	renderChartTop3(top3);
}



// bottom 3 table
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
  	  	  	  	answers: {},
				idRow: row.Col001
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
			<td>${stats.idRow}</td>
  	  	  	<td>${question}</td>
  	  	  	<td>${stats.total}</td>
  	  	  	<td>${Object.entries(stats.answers).map(([ans, cnt]) => `${ans} (${cnt})`).join(', ')}</td>
  	  	`;
  	  	grid.appendChild(tr);
  	});

  	renderGroupedChart(bottom3, 'Bottom 3 Questions - Answer Breakdown');
}
