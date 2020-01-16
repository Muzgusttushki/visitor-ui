export const buyers_map_settings = {
  dataLabels: {
    formatter (val) { return val.toFixed(0) + '%' }
  },
  chart: {
    type: 'donut'
  },
  plotOptions: {
    pie: {
      offsetX: 10,
      donut: {
        labels: {
          show: true,
          name: {
            show: true,
            fontFamily: 'Rubik, sans-serif'
          }
        }
      }
    }
  },
  responsive: [{
    breakpoint: 4000,
    options: {
      chart: {
        height: 360
      }
    }
  }, {
    breakpoint: 1400,
    options: {
      chart: {
        width: '100%',
        height: 300
      }
    }
  }, {
    breakpoint: 1100,
    options: {
      plotOptions: {
        pie: {
          offsetX: 40
        }
      }
    }
  }]
}

export const device_type_settings = {
  categories: [],
  legend: {
    show: false
  },
  xaxis: {
    categories: ['Смартфон', 'Компьютер', 'Другое'],
    axisBorder: {
      show: false
    },
    axisTicks: {
      show: false
    },
    labels: {
      style: {
        fontSize: '13px',
        fontFamily: 'Rubik, sans-serif'
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
  chart: {
    type: 'bar',
    toolbar: {
      show: false
    }
  },
  colors: ['#5AB6FE', '#4BDCA3', '#6382A7'],
  chartOptions: {
    dataLabels: {
      enabled: false
    }
  },
  plotOptions: {
    bar: {
      dataLabels: {
        position: 'center' // top, center, bottom
      },
      distributed: true
    }
  },
  responsive: [{
    breakpoint: 4000,
    options: {
      chart: {
        height: 280
      }
    }
  }, {
    breakpoint: 1400,
    options: {
      chart: {
        height: 220
      }
    }
  }]
}

export const old_new_buyers_settings = {
  labels: ['Всего покупателей', 'Новые за период'],
  dataLabels: {
    style: {
      fontSize: '14px'
    },
    formatter (val) { return val.toFixed(0) + '%' }
  },
  chart: {
    type: 'donut'
  },
  legend: {
    position: 'bottom'
  },
  responsive: [{
    breakpoint: 4000,
      options: {
        chart: {
          height: 370
        }
      }
    }, {
    breakpoint: 1400,
      options: {
        chart: {
          height: 280
        }
      }
    }, {
    breakpoint: 1200,
      options: {
        chart: {
          height: 300
        }
      }
    }, {
    breakpoint: 1600,
      options: {
        chart: {
          height: 330
        }
      }
  }]
}

export const sales_settings = {
  stroke: { curve: 'smooth' },
  chart: {
    toolbar: {
      show: false
    },
    animations: {
      enabled: true,
      easing: 'linear',
      animateGradually: {
        enabled: true,
        delay: 5000
      }
    }
  },
  dataLabels: {
    enabled: false
  },
  responsive: [{
    breakpoint: 1400,
    options: {
      chart: {
        height: 230
      }
    }
  }]
}

export const tickets_number_settings = {
  chart: {
    toolbar: {
      show: false
    }
  },
  legend: {
    show: false
  },
  dataLabels: {
    enabled: false
  },
  plotOptions: {
    bar: {
      dataLabels: {
        position: 'center'
      },
      distributed: true
    }
  },
  labels: ['1', '2', '3', '4', '5+'],
  xaxis: {
    labels: {
      show: true
    },
    axisBorder: {
      show: false
    }
  },
  colors: ['#4BDCA3', '#5AB6FE', '#6382A7', '#B3C0CE', '#B3C0CE'],
  yaxis: {
    labels: {
      show: false
    }
  },
  grid: {
    show: false
  },
  responsive: [{
    breakpoint: 1200,
    options: {
      chart: {
        height: 240
      }
    }
  }, {
    breakpoint: 1400,
    options: {
      chart: {
        height: 250
      }
    }
  }]
}