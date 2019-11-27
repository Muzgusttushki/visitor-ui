<script>
export default {
  // ------------------ГРАФИК ПЕРЕХОДОВ-------------------- //
  transitions: {
    chart: {
      type: 'donut',
      toolbar: {
        show: false
      }
    },
    plotOptions: {
      pie: {
        donut: {
          size: '60%',
          labels: {
            show: true,
            value: {
              show: false
            }
          }
        },
        dataLabels: {
          offset: 33
        }
      }
    },
    responsive: [
      {
        breakpoint: 1200,
        options: {
          plotOptions: {
            pie: {
              dataLabels: {
                offset: 40
              }
            }
          }
        }
      }
    ],
    labels: ['Social', 'Direct', 'App', 'Search'],
    dataLabels: {
      style: {
        colors: [''],
        fontSize: '16px'
      },
      formatter(value, options) {
        return value.toFixed(0) + '%';
      },
      dropShadow: {
        enabled: false
      }
    },
    legend: {
      show: false
    },
    tooltip: {
      enabled: false
    }
  }
}
</script>