<template>
  <div class="relative">
    <t-input
      ref="input"
      v-bind="$attrs"
      :type="showHiddenPassword ? 'password' : 'text'"
      x-model="password"
    />
    <div
      class="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
    >
      <FontAwesomeIcon
        class="text-gray-500"
        :icon="showHiddenPassword ? 'eye' : 'eye-slash'"
        :title="showHiddenPassword ? 'Show Password' : 'Hide Password'"
        @click="showHiddenPassword = !showHiddenPassword"
      />
    </div>
  </div>
</template>
<script lang="ts">
export default defineComponent({
  setup() {
    const showHiddenPassword = ref(true)

    return {
      showHiddenPassword,
    }
  },
})
</script>
