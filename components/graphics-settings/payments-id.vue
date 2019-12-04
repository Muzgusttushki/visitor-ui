<script>
export default {
  graphic_activity: {
    common: {
      chart: {
        toolbar: { show: false }
      },
      dataLabels: { enabled: false },
      stroke: { curve: "smooth" },
      tooltip: {
        fixed: { enabled: false }
      }
    }
  },

  graphic_transitions: {
    chart: {
      type: "donut",
      toolbar: { show: false }
    },
    plotOptions: {
      pie: {
        donut: {
          size: "57%",
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
    legend: { show: false },
    tooltip: { enabled: false }
  },
  
  probality_action: {
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
    colors: ['#4BDCA3'],
    labels: ['70%']
  },

  probality_nextbuy: {
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
    colors: ['#4BDCA3'],
    labels: ['70%']
  },

  probality_failure: {
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
    colors: ['#4BDCA3'],
    labels: ['70%']
  }
}
</script>