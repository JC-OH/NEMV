<template>
  <v-container>
    <v-btn @click="apiWithToken">토큰과 함께 전송</v-btn>
    <v-btn @click="apiWithTrash">이상한 문자와 함께 전송</v-btn>
  </v-container>
</template>
<script>
import axios from 'axios'

export default {
  methods: {
    apiWithToken () {
      const token = localStorage.getItem('token')
      axios.get(`${this.$apiRootPath}test`, { headers: { Authorization: token } })
        .then(res => console.log(res.data))
        .catch(err => console.log(err.message))
    },
    apiWithTrash () {
      axios.get(`${this.$apiRootPath}test`, { headers: { Authorization: 'abcdefghijk' } })
        .then(res => console.log(res.data))
        .catch(err => console.log(e.message))
    }
  }
}
</script>
