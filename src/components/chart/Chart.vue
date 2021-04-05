<template>
  <div class="chart">
    <div
      ref="chart"
      class="chart__element"
    />
  </div>
</template>

<script>
import { createChart } from 'lightweight-charts'

export default {
  name: 'Chart',
  props: {
    data: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      isLoading: false,
      chart: null,
      series: null
    };
  },
  watch: {
    data(newVal) {
      if (newVal.length && !this.chart) {
        this.createChart(newVal);
      } else if (newVal.length && this.chart) {
        this.updateChart(newVal);
      }
    },
  },
  mounted() {
    this.isLoading = true;
    this.createChart(this.data);
  },
  methods: {
    createChart(data) {
      if (!this.$refs.chart) return;
      const size = this.$refs.chart.getBoundingClientRect();
      this.chart = createChart(this.$refs.chart, {
        width: size.width,
        height: size.height,
      });
      this.series = this.chart.addCandlestickSeries();
      this.updateChart(data);
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - 60);
      this.chart.timeScale().setVisibleRange({
        from: startDate.getTime() / 1000,
        to: new Date().getTime() / 1000,
      });
      this.attachObserver();
    },
    updateChart(data) {
      this.series.setData(data);
      this.isLoading = false;
    },
    attachObserver() {
      const resizeObserver = new ResizeObserver((entries) => {
        for (let entry of entries) {
          const size = entry.target.getBoundingClientRect();
          this.chart.applyOptions({ width: size.width, height: size.height });
        }
      });
      resizeObserver.observe(this.$refs.chart);
    },
  },
};
</script>

<style scoped lang="scss">
.chart {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  min-height: 100%;
  flex: 1;
  &__element {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    min-height: 100%;
    flex: 1;
  }
}
</style>
