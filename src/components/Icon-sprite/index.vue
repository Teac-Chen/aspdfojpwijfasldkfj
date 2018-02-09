<template>
  <span
    :class="'myicon ' + iconName"
    :style="iconStyle"
  ></span>
</template>

<script>
  export default {
    name: 'DIconSprite',
    props: {
      iconName: {
        type: String,
        required: true
      },
      iconStyle: {
        type: String
      }
    }
  }
</script>
