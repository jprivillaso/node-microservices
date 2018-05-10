<template>
  <div>
    <h1> Delivery System Data </h1>
    <vue-good-table
      :columns="columns"
      :rows="$store.state.orders"
      :search-options="{
        enabled: true
      }"
      :pagination-options="{
        enabled: true,
        perPage: 20
      }"
      styleClass='vgt-table striped bordered'/>
  </div>
</template>

<script>

import { mapActions } from 'vuex';

export default {
  name: 'App',
  async beforeMount() {
    await this.fetchOrders();
  },
  data() {
    return {
      columns: [
        {
          label: 'id',
          field: 'id',
          type: 'number'
        },
        {
          label: 'User',
          field: 'user_name'
        },
        {
          label: 'Email',
          field: 'user_email'
        },
        {
          label: 'Created On',
          field: 'timestamp',
          type: 'date',
          dateInputFormat: 'YYYY-MM-DD',
          dateOutputFormat: 'MMM Do YY'
        },
        {
          label: 'Status',
          field: 'status'
        }
      ],
      rows: []
    };
  },
  methods: {
    ...mapActions(['fetchOrders'])
  }
};
</script>
