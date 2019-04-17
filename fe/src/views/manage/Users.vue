<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex xs12 sm6 v-for="user in users" :key="user._id">
        <!--@sbOpen=”pop” 이부분이 핵심입니다. 자식과의 통로입니다.-->
        <!--sbOpen으로 전달 받아서 pop 함수를 실행 하는 것입니다.-->
        <!-- [케밥 케이스] html에서는 v-card로 사용합니다. 대소문자가 갈릴 때 - 를 넣어주는 것이죠-->
        <user-card :user="user" @sbOpen="pop"></user-card>
      </v-flex>
    </v-layout>
    <!-- 부모의 역할 샘플로 스낵바를 하나 만들었습니다. -->
    <v-snackbar v-model="sb.act">{{sb.msg}}</v-snackbar>
  </v-container>
</template>
<script>
// [카멜 케이스] 스크립트 내부에서는 대소문자 구분해서 vCard 로 사용합니다.
import userCard from '@/components/User'

export default {
  components: { userCard },
  data () {
    return {
      users: [],
      sb: {
        act: false,
        msg: 'xxxx'
      }
    }
  },
  mounted () {
    this.getUsers()
  },
  methods: {
    pop (msg) {
      this.sb.act = true
      this.sb.msg = msg
    },
    getUsers () {
      this.$axios.get('manage/user')
        .then((r) => {
          this.users = r.data.users
        })
        .catch((e) => {
          console.error(e.message)
        })
    }
  }
}
</script>
