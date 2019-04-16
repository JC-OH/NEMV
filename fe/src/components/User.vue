<template>
  <v-card>
    <v-card-title primary-title>
      <h3 class="headline mb-0">{{user.id}}</h3>
    </v-card-title>
    <v-divider light></v-divider>
    <v-card-text>
      <div>이름: {{user.name}}</div>
      <div>권한: {{user.lv}}</div>
      <div>나이: {{user.age}}</div>
      <div>로그인 횟수: {{user.inCnt}}</div>
    </v-card-text>
    <v-card-actions>
      <v-btn color="primary" @click="children">자식용</v-btn>
      <v-btn color="warning" @click="parent">부모용</v-btn>
    </v-card-actions>
    <v-card-text v-if="va">
      <v-alert v-model="va" dismissible>자식 혼자 떠들기</v-alert>
    </v-card-text>
  </v-card>
</template>
<script>
export default {
  props: [ 'user' ],
  data () {
    return {
      va: false,
    }
  },
  methods: {
    // children 이벤트는 혼자 할 수 있는 것을 표현해보려고 만든 것입니다.
    children () {
      // this.user.name 으로 쉽게 접근이 가능하니 추후에 수정/삭제는 자식 혼자 해도 됩니다.
      this.user.name = 'xxx'
      this.va = true
    },
    parent () {
      // parent 이벤트를 주목해야합니다. $emit으로 부모에게 알릴 때 sbOpen 이라는 함수명과 내용을 전달합니다.
      this.$emit('sbOpen', '부모에게 알림')
    }
  }
}
</script>
