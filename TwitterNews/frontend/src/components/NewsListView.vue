<template>
 <div class="newsList" id="mynews">
    <h2 class="title">3. Read The News</h2>
    <ul class="news">
        <li class="newsCell" v-for="newsItem in news" :key="newsItem.title">
        <h2  class="newsTitle">
          <a :href="newsItem.url" rel="noopener noreferrer" target="_blank">{{ newsItem.title }}</a>
        </h2>
        <p class="description"> {{ newsItem.description }} </p>
        <div class="thumbnail">
            <img v-if="newsItem.urlToImage !== undefined"
                :src="newsItem.urlToImage"
                :alt="newsItem.title">
        </div>
        <br>
        </li>
    </ul>
</div>
</template>

<script>
import { mapState } from 'vuex';
import newsService from '../services/NewsService';

export default {

  name: 'NewsListView',

  data() {
    return {
      news: [],
    };
  },

  watch: {
    trendingTopic() {
      newsService.getNews(this.trendingTopic.name, (res) => {
        this.news = res.data.articles;
      });
    },
  },

  computed: mapState([
    'trendingTopic',
  ]),

  methods: {
  },

};
</script>

<style>

.newsList {
  background-color: #f0f0f0;
  display: grid;
  grid-template: " title title  title " auto
                 " .     news   .     " auto
                 / 1fr   2fr    1fr;
  justify-content: center;
  margin: 0 auto;
  width: 100%;
}

.title {
  grid-area: title;
}

.news {
  display: grid;
  grid-area: news;
  grid-auto-rows: auto;
  grid-gap: 20px;
  width: 768px;
}

ul.news li {
  margin-left: 32px;
  margin-right: 32px;
  background-color: rgba(255, 255, 255, 0.5);
}

.newsCell {
  display: grid;
  grid-template: " newsTitle   " auto
                 " thumbnail " auto
                 " description " auto
                 / auto         1fr;
  text-align: left;
}

.thumbnail {
  grid-area: thumbnail;
  overflow: hidden;
  object-fit: cover;
  justify-items: center;
 }

.thumbnail img {
  width: 100%;
  height: auto;
}

a {
  margin: 12px 12px;
  display: block;
  text-decoration: none;
  color: #191b1af8;
}
a:hover {
  color: rgba(92, 92, 92, 0.678);
  text-decoration: none;
}

.newsTitle {
  grid-area: newsTitle;
}

.description {
  grid-area: description;
  margin-left: 24px;
  margin-top: 24px;
}

</style>
