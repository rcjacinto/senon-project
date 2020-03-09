<script>
import { Line } from 'vue-chartjs'
export default {
  extends: Line,
  mounted () {
    this.renderChart({
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      datasets: [
        {
          label: 'Active',
          fill: false,
          backgroundColor: '#4bc0c0',
          borderColor: '#4bc0c0',
          lineTension: 0,
          data: [1, 2, 3, 4, 7, 0, 1, 2]
        },
        {
          label: 'Inactive',
          fill: false,
          backgroundColor: '#c9cbcf',
          borderColor: '#c9cbcf',
          lineTension: 0,
          data: [2, 5, 1, 6, 3, 2, 5]
        },
        {
          label: 'Due',
          fill: false,
          backgroundColor: '#ff6384',
          borderColor: '#ff6384',
          lineTension: 0,
          data: [9, 2, 1, 3]
        }
      ]
    },
    {
      responsive: true,
      maintainAspectRatio: false
    })
  },
  name: 'BarGraph'
}
</script>
