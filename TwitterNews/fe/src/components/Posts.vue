<template>
  <div class="posts">
    <p>{{ topics }}</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Posts',
  data() {
    return {
      posts: [],
      woeids: [],
      topics: [],
    };
  },
  async created() {
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
        if (place.parentid === 23424775 && !this.woeids.includes(place.woeid)) {
          this.woeids.push(place.woeid);
        }
      });
      // this.posts = res.data;
    }).catch((err) => {
      this.posts = [err];
    });
    this.woeids.forEach((woeid) => {
      axios.get(`http://localhost:3001/trends/place/${woeid}`)
        .then((res) => {
          res.data.forEach((topic) => {
            if (!this.topics.includes(topic.trends[0].name)) {
              this.topics.push(topic.trends[0].name);
            }
          });
        });
    });
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
