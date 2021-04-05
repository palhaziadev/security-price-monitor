import Vue from 'vue';
import Vuex from 'vuex';
import { properyMapper } from '~/lib/helpers'
const axios = require('axios');

const MUTATION_TYPES = {
  SET_SEARCH_SUGGESTIONS: 'SET_SEARCH_SUGGESTIONS',
  SET_CHART_DATA: 'SET_CHART_DATA',
  SET_COMPANY_DATA: 'SET_COMPANY_DATA'
}

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    suggestions: [],
    chartData: [],
    companyData: null
  },
  mutations: {
    [MUTATION_TYPES.SET_SEARCH_SUGGESTIONS] (state, payload) {
      state.suggestions = payload
    },
    [MUTATION_TYPES.SET_CHART_DATA] (state, payload) {
      state.chartData = payload
    },
    [MUTATION_TYPES.SET_COMPANY_DATA] (state, payload) {
      state.companyData = payload
    }
  },
  actions: {
    async search ({ commit }, searchTerm) {
      try {
        const response = await axios.get(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${searchTerm}&apikey=${process.env.API_KEY}`)
        commit(MUTATION_TYPES.SET_SEARCH_SUGGESTIONS, properyMapper(response.data?.bestMatches))
      } catch (error) {
        console.error(error);
      }
    },
    async fetchChartData ({commit}, symbol) {
      try {
        const response = await axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${process.env.API_KEY}`)
        const series = response.data?.['Time Series (Daily)']

        const mappedSeries = []
        for(const prop in series) {
          mappedSeries.unshift({
            time: prop,
            ...series[prop]
          })
        }
        commit(MUTATION_TYPES.SET_CHART_DATA, properyMapper(mappedSeries.slice(-30)))
      } catch (error) {
        console.error(error);
      }
    },
    async getCompanyOverview ({commit}, symbol) {
      try {
        const response = await axios.get(`https://www.alphavantage.co/query?function=OVERVIEW&symbol=${symbol}&apikey=${process.env.API_KEY}`)
        commit(MUTATION_TYPES.SET_COMPANY_DATA, response?.data ?? null)
      } catch (error) {
        console.error(error);
      }
    }
  },
  modules: {},
});
