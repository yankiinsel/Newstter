<template>
<div id="mapchart">
  <h2 id="title">1. Select A Country.</h2>
  <div class="chartwrapper">
    <div id="chartdiv"></div>
  </div>
</div>

</template>

<script>
import * as am4core from '@amcharts/amcharts4/core';
import * as am4maps from '@amcharts/amcharts4/maps';
import am4geodataWorldLow from '@amcharts/amcharts4-geodata/worldLow';
import { mapMutations } from 'vuex';

export default {
  name: 'MapChart',

  async created() {
    this.drawMap();
  },

  methods: {
    ...mapMutations([
      'selectCountry',
    ]),

    drawMap() {
      // High detail map
      const chart = am4core.create('chartdiv', am4maps.MapChart);
      chart.geodata = am4geodataWorldLow;
      chart.projection = new am4maps.projections.Miller();
      const polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());
      polygonSeries.useGeodata = true;
      polygonSeries.mapPolygons.template.events.on('hit', (ev) => {
        chart.zoomToMapObject(ev.target);
      });

      // Configure series
      const polygonTemplate = polygonSeries.mapPolygons.template;
      polygonTemplate.tooltipText = '{name}';
      polygonTemplate.fill = am4core.color('#74B266');

      // Create hover state and set alternative fill color
      const hs = polygonTemplate.states.create('hover');
      hs.properties.fill = am4core.color('#367B25');

      polygonTemplate.events.on('hit', (ev) => {
        // zoom to an object
        ev.target.series.chart.zoomToMapObject(ev.target);

        // get object info
        this.selectCountry(this.getCountryByName(ev.target.dataItem.dataContext.name));
      });

      // Exclude Antiarctica
      polygonSeries.exclude = ['AQ'];

      chart.zoomControl = new am4maps.ZoomControl();
    },

    getCountryByName(countryName) {
      if (countryName === 'Turkey') {
        return { id: 23424969, code: 'tr-tr' };
      }
      return '';
    },
  },

};

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang = "scss">

#chartdiv {
  color: #30303d;
  background-color: #fff;
  margin: 0 auto;
  position: absolute;
  width: 100%;
  height: 100%;
}

.chartwrapper {
  width: 100%;
  position: relative;
  padding-bottom: 50%;
  box-sizing: border-box;
  grid-area: map;

}

</style>
