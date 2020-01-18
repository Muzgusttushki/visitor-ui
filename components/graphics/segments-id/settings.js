export const users_settings = {
  chart: {
    type: "donut"
  },
  responsive: [
    {
      breakpoint: 10000,
      options: {
        chart: {
          height: 240
        }
      }
    },
    {
      breakpoint: 1600,
      options: {
        chart: {
          height: 280
        }
      }
    }
  ],
  legend: {
    show: false
  },
  labels: ["Сегмент", "Всего"]
}

export const devices_settings = {
  chart: {
    type: "bar",
    toolbar: {
      show: false
    }
  },
  xaxis: {
    categories: ["Смартфон", "Компьютер"],
    axisBorder: {
      show: false
    },
    axisTicks: {
      show: false
    },
    labels: {
      style: {
        fontSize: "13px",
        fontFamily: "Rubik, sans-serif"
      }
    }
  },
  grid: {
    show: false
  },
  yaxis: {
    axisTicks: {
      show: false
    },
    labels: {
      show: false
    }
  },
  colors: ["#5AB6FE", "#4BDCA3", "#6382A7"],
  chartOptions: {
    dataLabels: {
      enabled: false
    }
  },
  plotOptions: {
    bar: {
      dataLabels: {
        position: "center" // top, center, bottom
      },
      distributed: true
    }
  },
  responsive: [
    {
      breakpoint: 10000,
      options: {
        chart: {
          height: 250
        }
      }
    }
  ]
}

export const locations_settings = {
  chart: {
    type: "bar",
    toolbar: {
      show: false
    }
  },
  plotOptions: {
    bar: {
      horizontal: true,
      colors: {
        backgroundBarColors: ["#4BDCA3", "#5AB6FE", "#6382A7"],
        backgroundBarOpacity: 0
      },
      distributed: true
    }
  },
  xaxis: {
    labels: {
      show: false
    },
    axisBorder: {
      show: false
    }
  }
}