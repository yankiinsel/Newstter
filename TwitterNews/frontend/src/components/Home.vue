<template>
<div>
 <h2>1. Select A Country.</h2>
      <map-chart></map-chart>
</div>
</template>

<script>
import MapChart from './MapChart.vue';

export default {
  components: { MapChart },
};

</script>

<style>

h2 {
  margin-top: 50px;
  margin-bottom: 50px;
}
</style>
