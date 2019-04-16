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
              <v-checkbox
                v-model="form.remember"
                label="암호 기억하기(최대 7일간 보관 됩니다.)"
              ></v-checkbox>
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
// [로그인 시간 제한하기 - 토큰 갱신]
// 로그인창에 기억하기 체크박스를 만든다.
// 기억하기 체크박스를 켜고 로그인 하면 서버는 7일 아닐 경우 5분 기한의 토큰을 보낸다.
// 서버는 토큰을 받을 때 유효시간을 판단해서 2분 이하로 남았으면 7일 혹은 5분 기한의 토큰을 보낸다.
// 클라이언트는 최종 2분안에 클릭만 한다면 갱신토큰을 받아서 항상 로그인 상태가 유지된다.
// 5분동안 아무 입력이 없다면 토큰 기간이 만료되어 로그인 페이지로 안내한다.

export default {
  data() {
    return {
      form: {
        id: "",
        pwd: "",
        //이제 form.remember가 같이 날라갑니다.
        remember: false
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
