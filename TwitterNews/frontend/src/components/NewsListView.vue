<template>
 <div class="newsList" id="mynews">
    <h2 id="title">3. Read The News</h2>
    <ul class="news">
        <li class="newsCell" v-for="newsItem in news" :key="newsItem">
        <a :href="newsItem.url" class="newsTitle"> {{ newsItem.name }} </a>
        <p class="description"> {{ newsItem.description }} </p>
        <div class="thumbnail">
            <img v-if="newsItem.image !== undefined"
                :src="newsItem.image.thumbnail.contentUrl"
                :alt="newsItem.name">
        </div>
        <br>
        </li>
    </ul>
</div>
</template>

<script>

export default {
  name: 'NewsListView',

  data() {
    return {
      news: [{ url: '123', name: 'Hello', description: 'World' }],
    };
  },

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
  grid-template: " thumbnail  newsTitle   " auto
                 " thumbnail  description " auto
                 / auto         1fr;
  text-align: left;
}

.thumbnail {
  grid-area: thumbnail;
  overflow: hidden;
  object-fit: cover;
 }

.thumbnail img {
  width: 128px;
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
