<script>
import { Bar } from 'vue-chartjs'
export default {
  extends: Bar,
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  mounted () {
    setTimeout(() => {
      this.renderChart({
        labels: this.data.label,
        datasets: [
          {
            label: 'Active',
            backgroundColor: 'lightblue',
            borderColor: 'blue',
            borderWidth: 1,
            data: this.data && this.data.dataset[0].data
          },
          {
            label: 'Completed',
            backgroundColor: 'lightgreen',
            borderColor: 'green',
            borderWidth: 1,
            data: this.data && this.data.dataset[1].data
          }
        ]
      },
      {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ]
        }
      })
    }, 500)
  },
  watch: {
    data () {
      this.renderChart({
        labels: this.data.label,
        datasets: [
          {
            label: 'Active',
            backgroundColor: 'lightblue',
            borderColor: 'blue',
            borderWidth: 1,
            data: this.data && this.data.dataset[0].data
          },
          {
            label: 'Completed',
            backgroundColor: 'lightgreen',
            borderColor: 'green',
            borderWidth: 1,
            data: this.data && this.data.dataset[1].data
          }
        ]
      },
      {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ]
        }
      })
    }
  },
  name: 'BarGraph'
}
</script>
