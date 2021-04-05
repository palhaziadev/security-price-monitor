<template>
  <div class="home">
    <search
      class="search"
      @on-search="onSearchChange"
    />
    <div class="result">
      <div
        v-if="!chartData.length && !companyData && !isLoading"
        class="result__placeholder"
      >
        {{ $t('chart.placeholder') }}
      </div>
      <div
        v-else-if="isLoading"
        class="result__loading"
      >
        <b-spinner
          variant="success"
          label="Spinning"
        />
      </div>
      <div
        v-else
        class="result__info-wrapper"
      >
        <div class="result__chart-wrapper">
          <chart
            :data="chartData"
          />
        </div>
        <div class="result__overview-wrapper">
          <overview
            class="result__overview"
            :data="companyData"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Chart from '~/components/chart/Chart.vue'
import Search from '~/components/search/Search.vue'
import Overview from '~/components/company/Overview.vue'
import { BSpinner } from 'bootstrap-vue';

export default {
  name: "Home",
  components: {
    Chart,
    Search,
    Overview,
    BSpinner
  },
  data () {
    return {
      isLoading: false
    }
  },
  computed: {
    ...mapState([
      'chartData',
      'companyData'
    ])
  },
  methods: {
    async onSearchChange ($event) {
      if ($event) {
        this.isLoading = true
        await this.$store.dispatch('fetchChartData', $event)
        await this.$store.dispatch('getCompanyOverview', $event)
        this.isLoading = false
      }
    }
  }
};
</script>

<style scoped lang="scss">
.search {
  margin: 20px auto;
  margin-top: 0;
  @include media-breakpoint-up(md) {
    margin-top: 20px;
    width: 300px;
  }
}
.result {
  width: 100vw;
  max-width: calc(100vw - 20px);
  margin-left: 10px;
  @include media-breakpoint-up(lg) {
    height: 80vh;
    max-height: 80vh;
  }
  &__chart-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
    height: 70vh;
    overflow: auto;
    width: 100%;
    @include media-breakpoint-up(lg) {
      height: 100%;
    }
  }
  &__overview-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
    height: 100%;
  }
  &__overview {
    overflow: auto;
  }
  &__info-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    max-width: inherit;
    @include media-breakpoint-up(lg) {
      flex-direction: row;
      height: 80vh;
    }
  }
  &__loading, &__placeholder {
    display: flex;
    align-items: center;
    justify-content: center;
    height: calc(100vh - 51px);
    @include media-breakpoint-up(md) {
      height: calc(100vh - 71px);
    }
  }
}
</style>