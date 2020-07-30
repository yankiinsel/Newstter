<template>
 <div class="newsList" id="mynews">
    <h2 id="title">3. Read The News</h2>
    <ul class="news">
        <li class="newsCell" v-for="newsItem in news" :key="newsItem.title">
        <a :href="newsItem.url" class="newsTitle"> {{ newsItem.title }} </a>
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
        console.log(res.data.articles);
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
}

.news {
  display: grid;
  grid-area: news;
  grid-auto-rows: auto;
  grid-gap: 20px;
}

ul.news li {
  margin-left: 32px;
  margin-right: 32px;
  padding: 8px;
  background-color: #fff;
}

ul.news li a { margin: 24px; display: block; width: 100%; height: 100%; }

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
  width: 80%;
  height: auto;
  margin: 24px;
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
