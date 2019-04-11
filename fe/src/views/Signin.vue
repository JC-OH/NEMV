<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12">
          <v-toolbar dark color="primary">
            <v-toolbar-title>Login form</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field prepend-icon="person" v-model="form.id" label="아이디" type="text"></v-text-field>
              <v-text-field prepend-icon="lock" v-model="form.pwd" label="비밀번호" type="password"></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="signIn">로그인</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import axios from 'axios';

export default {
  data() {
    return {
      form: {
        id: "",
        pwd: ""
      }
    }
  },
  mounted() {

  },
  methods: {
    signIn() {
      axios.post(`${this.$apiRootPath}sign/in`, this.form)
        .then((res) => {
          if (!res.data.success) return console.error(res.data.msg);
          // 토큰 저장
          localStorage.setItem('token', res.data.token);
          // 토큰을 받고 로컬스토리지에 써놓은 다음에 변이 getToken을 이용해 state.token을 갱신했습니다.
          this.$store.commit('getToken');

          // 페이지 이동: 만들어 두었던 About.vue 로 갑니다.
          // this.$router.push 대신 location.href = ‘/header’ 로 해도 상관 없습니다.
          this.$router.push('/Test/Header');
          // // location.href = '/Test/Header'
        })
        .catch((err) => {
          console.error(err.message)
        })
    }
  }
}
</script>
