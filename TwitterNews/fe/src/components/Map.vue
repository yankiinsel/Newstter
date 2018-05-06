<template>
  <div id="map">

    <div class="topics">

      <div class="buttons">
        <input type="radio" id="one" value=23424969 v-model="picked">
        <label for="one">Turkey</label>
        <br>
        <input type="radio" id="two" value=23424775 v-model="picked">
        <label for="two">Canada</label>
        <br>
        <span>Picked: {{ picked }}</span>
      </div>

      <div class="ammap">
        <div id="mapdiv" style="width: 1000px; height: 450px;"></div>
        <div style="width: 1000px; font-size: 70%; padding: 5px 0; text-align: center; background-color: #535364; margin-top: 1px; color: #B4B4B7;"><a href="https://www.amcharts.com/visited_countries/" style="color: #B4B4B7;">Create your own visited countries map</a> or check out the <a href="https://www.amcharts.com/" style="color: #B4B4B7;">JavaScript Charts</a>.</div>
      </div>

      <ul class="trending">
        <li v-for="topic in topics" :key="topic">
          <a v-on:click="getNews(topic)">{{ topic }}</a>
          <br>
        </li>
      </ul>

      <ul class="news">
        <li class="newsCell" v-for="newItem in news" :key="newItem">
          <p class="title"> {{ newItem.name }} </p>
          <p class="description"> {{ newItem.description }} </p>
          <div>
            <img v-if="newItem.image !== undefined"
                :src="newItem.image.thumbnail.contentUrl"
                :alt="newItem.name"
                class="thumbnail">
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

export default {
  name: 'Map',
  data() {
    return {
      posts: [],
      woeids: [],
      topics: [],
      news: [],
      selectedTopic: '',
      picked: 23424775,
    };
  },

  watch: {
    /* eslint-disable */
    picked: async function() {
      this.getWoeids();
      await this.getTopics();
    },
    /* eslint-enable */
  },

  async created() {
    await this.getAvailablePlaces();
    this.getWoeids();
    await this.getTopics();
    this.drawMap();
  },

  methods: {

    drawMap() {
      /* global AmCharts */
      AmCharts.theme = AmCharts.themes.light;

      // build map
      const map = new AmCharts.AmMap();

      map.type = 'map';
      map.theme = 'light';
      map.projection = 'miller';

      map.dataProvider = {
        map: 'worldLow',
        getAreasFromMap: true,
      };
      map.areasSettings = {
        autoZoom: true,
        selectedColor: '#C0000',
      };
      map.smallMap = {};
      map.export = {
        enabled: true,
        position: 'bottom right',
      };
      map.write('mapdiv');
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
        this.posts = [err];
      });
    },

    getWoeids() {
      const woeids = [];
      for (let i = 0, len = this.posts.length; i < len; i += 1) {
        const post = this.posts[i];
        if (post.parentid === parseInt(this.picked, 10) && !woeids.includes(post.woeid)) {
          woeids.push(post.woeid);
        }
      }
      this.woeids = woeids;
    },

    async searchTopics(woeid) {
      const topics = [];

      await axios.get(`http://localhost:3001/topics/${woeid}`)
        .then((res) => {
          res.data.forEach((place) => {
            for (let i = 0, len = place.trends.length; i < len; i += 1) {
              if (!topics.includes(place.trends[i].name)) {
                topics.push(place.trends[i].name);
              }
            }
            this.topics = topics;
          });
        })
        .catch((err) => {
          this.topics = [err];
        });
    },

    async getTopics() {
      this.topics = [];
      const promises = this.woeids.map(this.searchTopics);
      await Promise.all(promises);
    },

    getNews(topic) {
      this.news = [];
      const term = topic
        .replace(/([A-Z])/g, ' $1')
        .replace(/#/g, '')
        .toLowerCase();
      console.log('Searched for: '.concat(term));
      axios.get(`http://localhost:3001/news/${term}`).then((res) => {
        const news = res.data.value;
        console.log('Found items: '.concat(news.length));
        news.forEach((newsItem) => {
          this.news.push(newsItem);
        });
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
  grid-template:  " buttons   " 100px
                  " ammap     " auto
                  " trending  " auto
                  " news      " auto
                  / 1fr

}
.trending {
  grid-area: trending;
}

.ammap {
  width: 100%;
  height: 500px;
  grid-area: ammap;
}

.buttons {
  grid-area: buttons;
}

.news {
  display: grid;
  grid-area: news;
  grid-auto-rows: 200px;
  grid-gap: 20px;
}

.newsCell {
  display: grid;
  grid-template: " thumbnail  title       " 50px
                 " thumbnail  description " 150px
                 / 200px      1fr
}

.thumbnail {
  grid-area: thumbnail;
}

img {
   object-fit: fill;
}

.title {
  grid-area: title;
}

.description {
  grid-area: description;
}

</style>
