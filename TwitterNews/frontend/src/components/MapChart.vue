<template>
<div id="mapchart">
  <h2 id="title">1. Select A Country.</h2>
  <div id="chartwrapper">
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

  data() {
    return {
      selectedCountry: '',
    };
  },

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
      chart.chartContainer.wheelable = false;
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

      // Create active state
      const as = polygonTemplate.states.create('active');
      as.properties.fill = am4core.color('#7B3625');

      polygonTemplate.events.on('hit', (ev) => {
        // zoom to an object
        ev.target.series.chart.zoomToMapObject(ev.target, 3, true, 500);
        this.highlightCountry(ev.target);

        // get object info
        this.selectCountry(this.getCountryById(ev.target.dataItem.dataContext.id));
      });

      // Exclude Antiarctica
      polygonSeries.exclude = ['AQ'];

      chart.zoomControl = new am4maps.ZoomControl();
      chart.zoomControl.slider.height = 100;
    },

    highlightCountry(country) {
      if (this.selectedCountry.isActive) {
        this.selectedCountry.isActive = false;
      }
      this.selectedCountry = country;
      this.selectedCountry.isActive = true;
    },

    getCountryById(countryId) {
      let picked = null;
      if (countryId === 'TR') {
        picked = { id: 23424969, code: 'tr-tr' };
      } if (countryId === 'CA') { // canada
        picked = { id: 23424775, code: 'en-ca' };
      } else if (countryId === 'US') { // usa
        picked = { id: 23424775, code: 'en-us' };
      } else if (countryId === 'World') { // worldwide
        picked = { id: 0, code: 'en-us' };
      } else if (countryId === 'GB') { // great britain
        picked = { id: 23424975, code: 'en-gb' };
      } else if (countryId === 'MX') { // mexico
        picked = { id: 23424900, code: 'es-mx' };
      } else if (countryId === 'IE') { // ireland
        picked = { id: 23424803, code: 'en-ie' };
      } else if (countryId === 'FR') { // france
        picked = { id: 23424819, code: 'fr-fr' };
      } else if (countryId === 'DE') { // germany
        picked = { id: 23424829, code: 'de-de' };
      } else if (countryId === 'IT') { // ialy
        picked = { id: 23424829, code: 'it-it' };
      } else if (countryId === 'NL') { // netherlands
        picked = { id: 23424829, code: 'nl-nl' };
      } else if (countryId === 'ES') { // spain
        picked = { id: 23424950, code: 'es-es' };
      } else if (countryId === 'RU') { // russia
        picked = { id: 23424936, code: 'ru-ru' };
      } else if (countryId === 'AU') { // australia
        picked = { id: 23424748, code: 'en-au' };
      } else if (countryId === 'JP') { // japan
        picked = { id: 23424856, code: 'ja-jp' };
      } else if (countryId === 'KR' || countryId === 'KP') { // korea
        picked = { id: 23424868, code: 'ko-kr' };
      } else if (countryId === 'IN') { // india
        picked = { id: 23424848, code: 'en-in' };
      } else if (countryId === 'EG') { // egypt
        picked = { id: 23424802, code: 'ar-sa' };
      } else if (countryId === 'SA') { // saudi
        picked = { id: 23424938, code: 'ar-sa' };
      } else if (countryId === 'BR') { // brazil
        picked = { id: 23424768, code: 'pt-br' };
      } else if (countryId === 'ID') { // indonesia
        picked = { id: 23424846, code: 'en-id' };
      }
      return picked;
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

#chartwrapper {
  position: relative;
  padding-bottom: 50%;
  grid-area: map;
  width: 100%;
  justify-content: center;
  display: flex;
  }

</style>
