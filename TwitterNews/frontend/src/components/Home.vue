<template>
<div id="home">
    <h2 id="title1">1. Select A Country.</h2>
    <map-chart></map-chart>
    <h2 id="title2">2. Select A Topic.</h2>
    <trending-topics-view></trending-topics-view>
    <h2 id="title3">3. Read The News</h2>
    <news-list-view></news-list-view>
</div>
</template>

<script>
import { mapState } from 'vuex';
import NewsListView from './NewsListView.vue';
import TrendingTopicsView from './TrendingTopicsView.vue';
import MapChart from './MapChart.vue';

export default {
  components: { MapChart, TrendingTopicsView, NewsListView },


  computed: mapState({
    country: 'selectedCountry',
    topic: 'trendingTopic',
  }),
};

</script>

<style>

#home {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template: " title1   " auto
                 " mapchart " auto
                 " title2 " auto
                 " trending  " auto
                 " title3  " auto
                 " news  " auto
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

trending-topics {
    grid-area: trending;
}

news-list {
  grid-area: news;
}

h2 {
  margin-top: 50px;
  margin-bottom: 50px;
}
</style>
