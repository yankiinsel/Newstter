<template>
  <div id="posts">
    <div class="posts">
      <p>{{ topics }}</p>
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
<style lang = "scss">


#posts {
  display: grid;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  // mobile
  grid-template: 1fr 100px / 1fr;

  grid-template-areas:
    "results"
    "link";

  // tablet + small deskt0p
  @media (min-width: 769px) {
    grid-template: 1fr 100px / 1fr 769px 1fr;
    grid-template-areas:
      ".  results ."
      ".  link    .";
  }

  // large deskt0p
  @media (min-width: 1240px) {
    grid-template: 1fr 100px / 1fr 1240px 1fr;
    grid-template-areas:
      ".  results ."
      ".  link    .";
  }
}

</style>
