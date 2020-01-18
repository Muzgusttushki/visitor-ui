
export const activity_settings = {
  chart: {
    toolbar: { show: false }
  },
  legend: {
    offsetY: -10
  },
  dataLabels: { enabled: false },
  stroke: { curve: "smooth" },
  tooltip: {
    fixed: { enabled: false }
  },
  responsive: [{
    breakpoint: 1200,
    options: {
      chart: {
        height: 270
      }
    }
  },{
    breakpoint: 1400,
    options: {
      chart: {
        height: 180
      }
    }
  },{
    breakpoint: 1600,
    options: {
      chart: {
        height: 220
      }
    }
  },{
    breakpoint: 2000,
    options: {
      chart: {
        height: 260
      }
    }
  },{
    breakpoint: 10000,
    options: {
      chart: {
        height: 240
      }
    }
  }]
}

export const devices_settings = {
  dataLabels: {
    style: {
      colors: ['#333333'],
      fontSize: '17px' 
    },
    dropShadow: {
      opacity: 0.1
    }
  },
  plotOptions: {
    pie: {
      customScale: 1.1,
      dataLabels: {
        offset: -35
      }
    }
  },
  responsive: [{
    breakpoint: 10000,
    options: {
      chart: {
        height: 500
      }
    }
  }]
}

export const transitions_settings = {
  chart: {
    type: "donut",
    toolbar: { show: false }
  },
  plotOptions: {
    pie: {
      donut: {
        size: "65%",
        labels: {
          show: true
        }
      },
      // dataLabels: { offset: 33 }
    }
  },
  responsive: [
    {
      breakpoint: 1200,
      options: {
        plotOptions: {
          pie: {
            // dataLabels: { offset: 40 }
          }
        }
      }
    }
  ],
  dataLabels: {
    style: { fontSize: "16px" },
    dropShadow: { enabled: false },
    formatter(value, options) {
      return value.toFixed(0) + "%";
    }
  },
  // legend: { show: false },
  // tooltip: { enabled: false }
}

export const possibility_settings = {
  chart: { type: 'radialBar' },
  plotOptions: {
    radialBar: {
      hollow: { size: '60%' },
      dataLabels: {
        value: { show: false },
        name: { offsetY: 5 }
      }
    }
  },
  labels: ['70%']
}