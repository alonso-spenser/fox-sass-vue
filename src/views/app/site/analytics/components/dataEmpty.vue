<template>
    <div class="empty-text">
    {{$t('base.dataEmpty')}}
    </div>
</template>

<script>
export default {
  name: 'notData',
  data () {
    return {

    }
  }
}
</script>

<style scoped lang="scss">
.empty-text {
  display: flex;
  justify-content: center;
  align-items: center;
  color: #909399;
  font-size: 14px;
  height: 400px;
}
</style>
