<template>
<div id="home">
    <map-chart></map-chart>
    <trending-topics-view></trending-topics-view>
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

<style lang="scss">

#home {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template: " mapchart  " auto
                 " trending  " auto
                 " news      " auto
                 / auto;
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
