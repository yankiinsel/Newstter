<template>
<div id="home">
    <h2 id="title1">1. Select A Country.</h2>
    <map-chart></map-chart>
    <h2 id="title2">2. Select A Topic.</h2>
</div>
</template>

<script>
import { mapState } from 'vuex';
import MapChart from './MapChart.vue';

export default {
  components: { MapChart },

  computed: mapState({
    country: 'selectedCountry',
  }),
};

</script>

<style>

#home {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template: " title1   " auto
                 " map-chart " auto
                 " title2 " auto
                 / auto;
  text-align: left;
}

#title1 {
    grid-area: title1;
}

#title2 {
    grid-area: title2;
}

map-chart {
    grid-area: mapchart;
}

h2 {
  margin-top: 50px;
  margin-bottom: 50px;
}
</style>
