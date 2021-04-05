<template>
  <div
    class="search-suggestion"
    @click="$emit('on-selected', suggestion)"
  >
    <span>{{ suggestion.symbol }}</span> - <span>{{ suggestion.name }}</span>
  </div>
</template>

<script>

export default {
  name: 'SearchSuggestion',
  props: {
    suggestion: {
      type: Object,
      default: () => {}
    }
  }
};
</script>

<style scoped lang="scss">
.search-suggestion {
  padding: 2px;
  min-height: 30px;
  cursor: pointer;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  &:hover {
    background-color: $gray-400;
  }
}
</style>
