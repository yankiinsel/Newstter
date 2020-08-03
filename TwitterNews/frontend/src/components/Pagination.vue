<template>
<div class="pagination">
    <b-button
            class="buttonlink"
            variant="'link'" v-on:click="goToFirstPage">First</b-button>
    <b-button
            class="buttonlink"
            variant="'link'" v-on:click="goToPreviousPage">Previous</b-button>
    <ul>
        <li v-for="page in pageCount" :key="page">
            <b-button
            class="buttonlink"
            variant="'link'" v-if="Math.abs(page-currentPage) < 4"
            v-on:click="goToPage(page)">{{ page }}</b-button>
        </li>
    </ul>
    <b-button
            class="buttonlink"
            variant="'link'" v-on:click="goToNextPage">Next</b-button>
    <b-button
            class="buttonlink"
            variant="'link'" v-on:click="goToLastPage">Last</b-button>
</div>
</template>

<script>

export default {

  name: 'Pagination',

  props: ['pageCount', 'currentPage'],

  data() {
    return {
    };
  },

  methods: {
    goToPage(page) {
      this.$emit('goToPage', page);
    },

    goToLastPage() {
      this.goToPage(this.pageCount);
    },

    goToFirstPage() {
      this.goToPage(1);
    },

    goToNextPage() {
      if (this.currentPage < this.pageCount) {
        this.goToPage(this.currentPage + 1);
      }
    },

    goToPreviousPage() {
      if (this.currentPage > 1) {
        this.goToPage(this.currentPage - 1);
      }
    },
  },
};

</script>

<style>
.pagination {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.buttonlink {
  color: #42b983 !important;
  margin-top: 1px;
  margin-bottom: 1px;
  background-color: transparent;
  border: none;
}

.buttonlink:focus {
  outline: none !important;
}
</style>
