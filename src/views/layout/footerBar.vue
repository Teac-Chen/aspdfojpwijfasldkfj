<template>
  <div class="footer-container">Dcits &copy; 2015-2020</div>
</template>

<script>
  export default {
    name: 'FooterBar',
    data() {
      return {
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  .footer-container {
    height: 36px;
    padding: 10px 20px;
    border-top: 1px solid #e7eaec;
    border-left: 1px solid #e7eaec;
    background-color: #fff;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    font-size: 14px;
  }

</style>
