<template>
  <div id="map">

    <div class="topics">

      <div class="ammap" id="mymap">
        <h2>Select A Country</h2>
        <div id="mapdiv" style="width: %100; height: 450px;"></div>
      </div>

      <ul class="trending" id="mytopics">
        <h2>Choose A Topic</h2>
        <li v-for="topic in topics" :key="topic">
          <b-button class="buttonlink" variant="'link'"
          :style="{ fontSize: 5*Math.log(parseInt(topic.tweet_volume)) / Math.log(7) + 'px'}"
              v-on:click="getNews(topic)">{{ topic.name }}</b-button>
          <br>
        </li>
      </ul>

      <ul class="news" id="mynews">
        <li class="newsCell" v-for="newItem in news" :key="newItem">
          <a :href="newItem.url" class="title"> {{ newItem.name }} </a>
          <p class="description"> {{ newItem.description }} </p>
          <div class="thumbnail">
            <img v-if="newItem.image !== undefined"
                :src="newItem.image.thumbnail.contentUrl"
                :alt="newItem.name">
          </div>
          <br>
        </li>
      </ul>

    </div>
  </div>
</template>

<script>
import 'amcharts3';
import 'amcharts3/amcharts/plugins/responsive/responsive';
import 'amcharts3/amcharts/serial';
import 'amcharts3/amcharts/themes/light';
import 'ammap3';
import 'ammap3/ammap/maps/js/worldLow';

import axios from 'axios';

const VueScrollTo = require('vue-scrollto');

export default {
  name: 'Map',
  data() {
    return {
      posts: [],
      woeids: [],
      topics: [],
      news: [],
      selectedTopic: '',
      picked: { id: 0, code: 'en-us' },
      map: '',
      selected: [],
      options: {
        easing: 'ease-in ',
        offset: 0,
      },
      colors: ['red', 'blue', 'green', 'black', 'gray'],
    };
  },

  watch: {
    /* eslint-disable */
    picked: async function() {
      this.getWoeids();
      await this.getTopics();
    },

    selected: function() {
      console.log(this.selected);
      const el = this.selected[0]
      if (el === 'TR') {//turkey
        this.picked = {id: 23424969, code: 'tr-tr'}
      } else if (el === 'CA') {//canada
        this.picked = {id: 23424775, code: 'en-ca'}
      } else if (el === 'US') {//usa
        this.picked = {id: 23424775, code: 'en-us'}
      }  else if (el === 'World') {//worldwide
        this.picked = {id: 0, code: 'en-us'}
      } else if (el === 'GB') {//great britain
        this.picked = {id: 23424975, code: 'en-gb'}
      } else if (el === 'MX') {//mexico
        this.picked = {id: 23424900, code: 'en-mx'}
      } else if (el === 'IE') {//ireland
        this.picked = {id: 23424803, code: 'en-ie'}
      } else if (el === 'FR') {//france
        this.picked = {id: 23424819, code: 'fr-fr'}
      } else if (el === 'DE') {//germany
        this.picked = {id: 23424829, code: 'de-de'}
      } else if (el === 'IT') {//ialy
        this.picked = {id: 23424829, code: 'it-it'}
      } else if (el === 'NL') {//netherlands
        this.picked = {id: 23424829, code: 'nl-nl'}
      } else if (el === 'ES') {//spain
        this.picked = {id: 23424950, code: 'es-es'}
      } else if (el === 'RU') {//russia
        this.picked = {id: 23424936, code: 'ru-ru'}
      }
    }
    /* eslint-enable */
  },

  async created() {
    await this.getAvailablePlaces();
    this.getWoeids();
    await this.getTopics();
    this.drawMap();
  },

  methods: {

    clearNews() {
      this.news = [];
    },

    drawMap() {
      /* global AmCharts */
      AmCharts.theme = AmCharts.themes.dark;

      // build map
      const map = new AmCharts.AmMap();
      this.map = map;
      this.map.type = 'map';
      this.map.theme = 'dark';
      this.map.projection = 'miller';
      this.map.color = 'white';
      this.map.dataProvider = {
        map: 'worldLow',
        getAreasFromMap: true,
      };
      this.map.areasSettings = {
        autoZoom: false,
        selectedColor: '#AAEE66',
        selectable: true,
        color: '#fff',
        outlineColor: '#30303d',
        outlineAlpha: 0.2,
      };
      this.map.zoomControl = {
        zoomControlEnabled: true,
      };
      this.map.listeners = [{
        event: 'clickMapObject',
        method: (e) => {
          // Ignore any click not on area
          if (e.mapObject.objectType !== 'MapArea') {
            return;
          }
          const area = e.mapObject;
          // Toggle showAsSelected
          // for (let i = 0; i < this.map.dataProvider.areas.length; i += 1) {
          //   this.map.dataProvider.areas[i].showAsSelected = false;
          // }
          // area.showAsSelected = true;
          area.showAsSelected = !area.showAsSelected;
          e.chart.returnInitialColor(area);
          // Update the list
          this.selected = this.getSelectedCountries();
        },
      }];
      this.map.export = {
        enabled: true,
        position: 'bottom right',
      };
      this.map.write('mapdiv');
    },

    getSelectedCountries() {
      const selected = [];
      for (let i = 0; i < this.map.dataProvider.areas.length; i += 1) {
        if (this.map.dataProvider.areas[i].showAsSelected) {
          selected.push(this.map.dataProvider.areas[i].id);
        }
      }
      return selected;
    },

    async getAvailablePlaces() {
      this.posts = [];
      await axios.get('http://localhost:3001/map').then((res) => {
        res.data.forEach((place) => {
          this.posts.push({
            name: place.name,
            url: place.url,
            parentid: place.parentid,
            country: place.country,
            woeid: place.woeid,
            countryCode: place.countryCode,
          });
        });
      }).catch((err) => {
        console.log(err);
      });
    },

    getWoeids() {
      const woeids = [];
      for (let i = 0, len = this.posts.length; i < len; i += 1) {
        const post = this.posts[i];
        if (post.parentid === parseInt(this.picked.id, 10) && !woeids.includes(post.woeid)) {
          woeids.push(post.woeid);
        }
      }
      this.woeids = woeids;
    },

    async searchTopics(woeid) {
      const topics = [];

      await axios.get(`http://localhost:3001/topics/${woeid}`)
        .then((res) => {
          if (res.data.error !== undefined) {
            this.topics = [];
            return;
          }
          res.data.forEach((place) => {
            for (let i = 0, len = place.trends.length; i < len; i += 1) {
              if (!topics.includes(place.trends[i])) {
                topics.push(place.trends[i]);
              }
            }
          });
          this.topics = topics;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    async getTopics() {
      this.topics = [];
      const promises = this.woeids.map(this.searchTopics);
      await Promise.all(promises);
      VueScrollTo.scrollTo('#mytopics', 500, this.options);
    },

    getNews(topic) {
      this.news = [];
      const term = topic.name
        .replace(/([A-Z])/g, ' $1')
        .replace(/#/g, '')
        .toLowerCase();
      console.log('Searched for: '.concat(term));
      axios.get(`http://localhost:3001/news/${term}/${this.picked.code}`).then((res) => {
        const news = res.data.value;
        console.log('Found items: '.concat(news.length));
        news.forEach((newsItem) => {
          this.news.push(newsItem);
        });
        VueScrollTo.scrollTo('#mynews', 500, this.options);
      }).catch((err) => {
        console.log(err);
      });
    },
  },
};

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang = "scss">

#map {
  display: grid;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;

  grid-template: 1fr / 1fr 80% 1fr;
  grid-template-areas:
    ".  topics ."
}

.topics {
  display: grid;
  justify-content: center;
  align-items: center;
  grid-area: topics;
  grid-template:  " ammap     " auto
                  " trending  " auto
                  " news      " auto
                  / 1fr

}
.trending {
  grid-area: trending;
}

#mapdiv {
  background-color: #30303d;
  color: #fff;
  grid-area: ammap;
  margin: 0 auto;
}

.news {
  display: grid;
  grid-area: news;
  grid-auto-rows: 200px;
  grid-gap: 20px;
  border-top: 1px solid green;

}

ul.news li { padding: 0px;   border-bottom: 1px solid green;
}

ul.news li a { margin: 24px; display: block; width: 100%; height: 100%; }

.newsCell {
  display: grid;
  grid-template: " thumbnail  title       " 48px
                 " thumbnail  description " 128px
                 / 176px      1fr;
  text-align: left;
}

.thumbnail {
  grid-area: thumbnail;
  overflow:hidden;
  object-fit: cover;
 }

.thumbnail img {
  width: 128px;
  height: auto;
  margin: 24px;
}

.buttonlink:hover {
    color: rgb(150, 219, 185) !important;
    text-decoration: none;
}

.buttonlink {
  color: #42b983;
  margin-top: 1px;
  margin-bottom: 1px;
}

.buttonlink:focus {
  outline: none !important;
}

.title {
  grid-area: title;
}

.description {
  grid-area: description;
}

h2 {
  margin-top: 50px;
  margin-bottom: 50px;
}

</style>
