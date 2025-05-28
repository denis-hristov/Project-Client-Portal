let currentChart = null;

// chart group
export function renderChart(groupedData) {
  	const categories = [];
  	const data = [];

  	destroyCurrentChart();

  	Object.values(groupedData).forEach(group => {
  	  	categories.push(group.Col005);
  	  	data.push(group.totalResponses);
  	});

  	currentChart = Highcharts.chart('chart-container', {
  	  	chart: { type: 'column' },
  	  	title: { text: 'Total responses by group' },
  	  	xAxis: {
  	  	  	categories: categories,
  	  	  	title: { text: 'Group' }
  	  	},
  	  	yAxis: {
  	  	  	title: { text: 'Number of answers' }
  	  	},
  	  	series: [{
  	  	  	name: 'Answers',
  	  	  	data: data
  	  	}]
  	});
}	



// chart top 3 
export function renderChartTop3(top3Data) {
  	const categories = top3Data.map(([question]) => question);
  	const answersSet = new Set();

  	destroyCurrentChart();

  	top3Data.forEach(([_, stats]) => {
  	  	Object.keys(stats.answers).forEach(ans => answersSet.add(ans));
  	});

  	const answerList = Array.from(answersSet);


  	const series = answerList.map(answer => ({
  	  	name: answer,
  	  	data: top3Data.map(([_, stats]) => stats.answers[answer] || 0)
  	}));

  	currentChart = Highcharts.chart('chart-container', {
  	  	chart: { type: 'column' },
  	  	title: { text: 'Top 3 Questions - Answer Breakdown' },
  	  	xAxis: {
  	  	  	categories: categories,
  	  	  	title: { text: 'Questions' }
  	  	},
  	  	yAxis: {
  	  	  	min: 0,
  	  	  	title: { text: 'Number of Responses' },
  	  	  	stackLabels: {
  	  	  	  	enabled: true,
  	  	  	  	style: {
  	  	  	  	  	fontWeight: 'bold'
  	  	  	  	}
  	  	  	}
  	  	},
  	  	tooltip: {
  	  	  	shared: true,
  	  	  	valueSuffix: ' responses'
  	  	},
  	  	plotOptions: {
  	  	  	column: {
  	  	  	  	stacking: 'normal'
  	  	  	}
  	  	},
  	  	series: series
  	});
}



// chart creator
export function renderGroupedChart(questionsData, chartTitle = 'Grouped Chart') {
  	const categories = questionsData.map(([question]) => question);
  	const answersSet = new Set();

  	destroyCurrentChart();

  	questionsData.forEach(([_, stats]) => {
  	  	Object.keys(stats.answers).forEach(ans => answersSet.add(ans));
  	});

  	const answerList = Array.from(answersSet);

  	const series = answerList.map(answer => ({
  	  	name: answer,
  	  	data: questionsData.map(([_, stats]) => stats.answers[answer] || 0)
  	}));

  	currentChart = Highcharts.chart('chart-container', {
  	  	chart: { type: 'column' },
  	  	title: { text: chartTitle },
  	  	xAxis: {
  	    	categories: categories,
  	    	title: { text: 'Questions' }
  	  	},
  	  	yAxis: {
  	  	  min: 0,
  	  	  title: { text: 'Number of Responses' },
  	  	  stackLabels: {
  	  	    enabled: true,
  	  	    style: {
  	  	      fontWeight: 'bold'
  	  	    }
  	  	  }
  	  	},
  	  	tooltip: {
  	  	  	shared: true,
  	  	  	valueSuffix: ' responses'
  	  	},
  	  	plotOptions: {
  	  	  	column: {
  	  	  	  	stacking: 'normal'
  	  	  	}
  	  	},
  	  	series: series
  	});
}


// delete chart
export function destroyCurrentChart() {
  	if (currentChart) {
  	  	currentChart.destroy();
  	  	currentChart = null;
  	}
}
