import Chart from 'chart.js'

export const run = ({ state, element }) => {
	let { numBuckets, inputData } = state
  numBuckets = numBuckets || 12
  
  // create the canvas
  const c = document.createElement('canvas')
  c.width = element.clientWidth
  c.height = c.width * 0.75
  const ctx = c.getContext('2d')
  element.appendChild(c)
  
  // do some styling
  Chart.defaults.global.defaultFontColor = '#c4cecf'
	Chart.defaults.global.defaultFontFamily = '"IBM Plex Sans Condensed",sans-serif'
  element.style.backgroundColor = 'transparent'
  
  // Get the range
  let min = inputData[0]
  let max = inputData[0]
  for(var i=1; i<inputData.length; i++) {
    if(inputData[i] < min) min = inputData[i]
    if(inputData[i] > max) max = inputData[i]
  }
  const range = max - min
  const bucketSize = range / numBuckets
  
  // Create the data
  const xTicks = []
  const data = new Array(numBuckets)
  data.fill(0)
  for(var i=0; i<numBuckets; i++) {
		const bucketMin = min + i * bucketSize
    const bucketMax = bucketMin + bucketSize
    xTicks.push(`${bucketMin.toFixed(2)} - ${bucketMax.toFixed(2)}`)
    inputData.forEach(point => {
      if(point >= bucketMin && point < bucketMax) {
       	data[i] += 1
      }
    })
  }
  
  // create the chart
  state.chart = new Chart(ctx, {
    type: 'line',
    data: {
			labels: xTicks,
      datasets: [{
				label: 'Input Frequency',
        data,
        borderColor: '#188da4',
        backgroundColor: 'rgba(255,255,255,0.05)',
        fill: true
      }]
    },
    options: {
			responsive: true,
      scales: {
        xAxes: [{
          display: true,
          scaleLabel: {
            display: true,
            labelString: 'Input Value'
          },
          gridLines: {
            color: 'rgba(255,255,255,0.05)' 
          }
        }],
        yAxes: [{
          display: true,
          scaleLabel: {
            display: true,
            labelString: 'Frequency'
          },
          gridLines: {
            color: 'rgba(255,255,255,0.05)' 
          }
        }]
      }
    }
  })
}
