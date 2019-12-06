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
  },

  graphic_transitions: {
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
    tooltip: { enabled: false }
  },
  
  probability: {
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
}
</script>