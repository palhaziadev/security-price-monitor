<template>
  <div class="overview">
    <div
      v-for="(prop, key) in data"
      :key="key"
      class="overview__item"
    >
      <span class="overview__item-key">{{ key }}:</span>{{ prop }}
    </div>
  </div>
</template>

<script>

export default {
  name: 'Overview',
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  }
}
</script>

<style scoped lang="scss">
.overview {
  border: 1px solid $gray-400;
  padding: 5px;
  width: 100%;
  height: 100%;
  &__item-key {
    font-weight: bold;
  }
}
</style>