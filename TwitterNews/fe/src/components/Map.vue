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

      <ul id="trending">
        <li v-for="topic in topics" :key="topic">
          <a v-on:click="getNews(topic)">{{ topic }}</a>
          <br>
        </li>
      </ul>

      <ul id="news">
        <li v-for="newItem in news" :key="newItem">
          <p> {{ newItem }} </p>
          <br>
        </li>
      </ul>

    </div>
  </div>
</template>

<script>
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
  },

  methods: {

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
          this.news.push(newsItem.name);
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
    ".  topics .";

}

.topics {
  display: grid;
  justify-content: center;
  align-items: center;
  grid-area: topics;
  grid-template:  " buttons " 100px
                  " trending  " auto
                  " news   " auto
                  / 1fr

}
.trending {
  grid-area: trending;
}

.buttons {
  grid-area: buttons;
}

.news {
  grid-area: news;
}

</style>
