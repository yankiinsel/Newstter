<template>
  <div class="posts">
    <p>{{ posts }}</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Posts',
  data() {
    return {
      posts: [],
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
      });
      this.posts = res.data;
    }).catch((err) => {
      this.posts = [err];
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
