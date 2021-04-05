<template>
  <div class="search">
    <b-input-group
      size="sm"
      class="search__input-wrapper"
    >
      <b-input-group-prepend
        is-text
        class="search__icon-wrapper"
      >
        <b-icon-search class="search__icon" />
      </b-input-group-prepend>
      <b-form-input
        v-model="text"
        class="search__input"
        autofocus
        debounce="500"
        type="search"
        :placeholder="$t('search.inputPlaceholder')"
        @update="onSearchChange"
        @blur="onBlurInput"
      />
    </b-input-group>
    <div
      v-if="showSuggestions"
      class="search__suggestion-wrapper"
    >
      <div
        v-if="!suggestions.length"
        class="search__no-result"
      >
        {{ $t('search.noResult') }}
      </div>
      <search-suggestion
        v-for="(suggestion, index) in suggestions"
        v-else
        :key="index"
        :suggestion="suggestion"
        @on-selected="onSelected"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { BFormInput, BInputGroupPrepend, BIconSearch } from 'bootstrap-vue';
import SearchSuggestion from '~/components/search/SearchSuggestion.vue';

export default {
  name: 'Search',
  components: {
    BFormInput,
    BIconSearch,
    BInputGroupPrepend,
    SearchSuggestion,
  },
  data() {
    return {
      text: '',
      showSuggestions: false,
    };
  },
  computed: {
    ...mapState([
      'suggestions'
    ]),
  },
  mounted() {},
  methods: {
    async onSearchChange($event) {
      if (!$event.length || this.searchTerm === $event) return;
      this.searchTerm = $event;
      await this.$store.dispatch('search', $event);
      this.setSuggestionsVisibility(true);
    },
    onSelected($event) {
      this.$emit('on-search', $event.symbol);
      this.text = $event.symbol;
      this.setSuggestionsVisibility(false);
    },
    setSuggestionsVisibility(shouldShow) {
      this.showSuggestions = shouldShow;
    },
    onBlurInput() {
      setTimeout(() => {
        this.setSuggestionsVisibility(false);
      }, 200);
    },
  },
};
</script>

<style scoped lang="scss">
.search {
  position: relative;
  &__input,
  &__icon-wrapper /deep/ .input-group-text {
    border-radius: 0 !important;
  }
  &__no-result {
    background-color: $gray-400;
  }
  &__suggestion-wrapper {
    display: flex;
    flex-direction: column;
    position: absolute;
    z-index: 10;
    background-color: $body-bg;
    width: 100%;
    border: 1px solid $gray-400;
    border-top: none;
    max-height: 300px;
    overflow-y: auto;
    overflow-x: hidden;
  }
}
</style>
