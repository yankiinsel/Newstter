<template>
 <div class="newsList" id="mynews">
    <h2 class="title">3. Read The News</h2>
    <ul v-if="success" class="news">
        <li class="newsCell" v-for="newsItem in news" :key="newsItem.title">
          <h2  class="newsTitle">
            <a :href="newsItem.url"
                rel="noopener noreferrer"
                target="_blank">{{ newsItem.title }}</a>
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
    <p v-else class="news">{{error}}</p>
    <pagination v-if="news.length > 0" class="pagination"
                v-bind:pageCount="pageCount"
                v-bind:currentPage="currentPage"
                @goToPage="goToPage"
    ></pagination>
</div>
</template>

<script>
import { mapState } from 'vuex';
import newsService from '../services/NewsService';
import Pagination from './Pagination.vue';


export default {

  components: { Pagination },

  name: 'NewsListView',

  data() {
    return {
      news: [],
      pageCount: 0,
      currentPage: 1,
      error: '',
      success: true,
    };
  },

  watch: {
    trendingTopic() {
      this.currentPage = 1;
      this.getNews();
    },
  },

  computed: mapState([
    'trendingTopic',
  ]),

  methods: {
    goToPage(page) {
      this.currentPage = page;
      this.getNews();
    },

    getNews() {
      newsService.getNews(this.trendingTopic.name, this.currentPage, (res) => {
        if (res.data.status === 'nok') {
          this.news = [];
          this.error = res.data.error.message;
          this.success = false;
          return;
        }
        this.success = true;
        this.news = res.data.articles;
        this.pageCount = Math.ceil(res.data.totalResults / 20);
      });
    },
  },

};
</script>

<style>

.newsList {
  background-color: #f0f0f0;
  display: grid;
  grid-template: " title      title      title      " auto
                 " .          news       .          " auto
                 " pagination pagination pagination " auto
                 / 1fr        2fr        1fr;
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

.pagination {
  grid-area: pagination;
}

</style>
