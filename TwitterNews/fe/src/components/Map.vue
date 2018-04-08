<template>
  <div id="map">

    <div class="topics">

      <div class="buttons">
        <input type="radio" id="one" value=23424969 v-model="picked" v-on:click="update">
        <label for="one">Turkey</label>
        <br>
        <input type="radio" id="two" value=23424775 v-model="picked" v-on:click="update">
        <label for="two">Canada</label>
        <br>
        <span>Picked: {{ picked }}</span>
      </div>

      <p class="trending">{{ topics }}</p>

      <p class="posts">{{ posts }}</p>

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
      picked: 23424775,
    };
  },

  async created() {
    await this.getAvailablePlaces();
    this.getWoeids();
    this.getTopics();
  },

  methods: {

    update() {
      this.getWoeids();
      this.getTopics();
    },

    async getAvailablePlaces() {
      this.posts = [];
      await axios.get('http://localhost:3001/trends/available').then((res) => {
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

    async getWoeids() {
      const woeids = [];
      for (let i = 0, len = this.posts.length; i < len; i += 1) {
        const place = this.posts[i];
        if (place.parentid === this.picked && !this.woeids.includes(place.woeid)) {
          woeids.push(place.woeid);
        }
      }
      this.woeids = woeids;
    },

    async getTopics() {
      const topics = [];
      for (let i = 0, len = this.woeids.length; i < len; i += 1) {
        const woeid = this.woeids[i];
        axios.get(`http://localhost:3001/trends/place/${woeid}`)
          .then((res) => {
            res.data.forEach((topic) => {
              if (!topics.includes(topic.trends[0].name)) {
                topics.push(topic.trends[0].name);
              }
            });
            this.topics = topics;
          });
      }
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
                  " trending  " 200px
                  " posts   " 1fr
                  / 1fr

}
.trending {
  grid-area: trending;
}

.buttons {
  grid-area: buttons;
}

.posts {
  grid-area: posts;
}

</style>
