<template>
  <v-card>
    <!-- 수정모드를 만들어서 토글합니다.(template v-if v-else) -->
    <template v-if="!edit">
      <v-card-title primary-title>
        <h3 class="headline mb-0">{{board.name}}</h3>
      </v-card-title>
      <v-divider light></v-divider>
      <v-card-text>
        <div>권한: {{board.lv}}</div>
        <div>설명: {{board.rmk}}</div>
      </v-card-text>

      <v-divider light></v-divider>
      <v-card-actions>
        <v-btn flat color="orange" @click="modeChange(board)">수정</v-btn>
        <v-btn flat color="error" @click="ca=true">삭제</v-btn>
      </v-card-actions>
    </template>
      <!-- 수정모드를 만들어서 토글합니다.(template v-if v-else) -->
    <template v-else>
      <v-card-title>
        <span class="headline">게시판 수정</span>
      </v-card-title>
      <v-card-text>
        <v-form>
        <v-text-field
          label="게시판 이름"
          :hint="form.name ? '' : '야구모임'"
          persistent-hint
          required
          v-model="form.name"
        ></v-text-field>

        <v-text-field
          label="게시판 설명"
          :hint="form.rmk ? '' : '야구를 좋아하는 사람'"
          persistent-hint
          required
          v-model="form.rmk"
        ></v-text-field>

        <v-select
          :items="lvs"
          label="권한"
          required
          v-model="form.lv"
        ></v-select>
      </v-form>

      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" flat @click="mod(board)">확인</v-btn>
        <v-btn color="error darken-1" flat @click.native="edit = false">취소</v-btn>
      </v-card-actions>
    </template>

    <v-card-text v-if="ca">
      <v-alert v-model="ca" type="warning">
        <h4>정말 진행 하시겠습니까?</h4>
        <v-btn color="error" @click="del(board)">확인</v-btn>
        <v-btn color="secondary" @click="ca=false">취소</v-btn>
      </v-alert>
    </v-card-text>
    <!-- 스낵바(v-snackbar) 대신에 알럿(v-alert)를 이용해 카드 하단에 각종 내용을 뿌립니다. -->
    <v-card-text v-if="ma.act">
      <v-alert v-model="ma.act" :type="ma.type" dismissible>{{ma.msg}}</v-alert>
    </v-card-text>
  </v-card>
</template>
<script>

// 자식이 할 수 있는 일은 최대한 자식 혼자 하는 것이 좋습니다.(부모와 자식간에 통신 여러번 하면 안쓰는 것이 낫습니다.)
// - 수정모드를 만들어서 토글합니다.(template v-if v-else)
// - 스낵바(v-snackbar) 대신에 알럿(v-alert)를 이용해 카드 하단에 각종 내용을 뿌립니다.
export default {
  props: [ 'board' ],
  data () {
    return {
      ca: false,
      ma: {
        act: false,
        msg: '',
        type: 'error'
      },
      lvs: [0, 1, 2, 3],
      form: {
        name: '',
        lv: 0,
        rmk: ''
      },
      edit: false
    }
  },
  methods: {
    modeChange (b) {
      this.edit = true
      this.form = {
        name: b.name,
        lv: b.lv,
        rmk: b.rmk
      }
    },
    mod (board) {
      if (board.name === this.form.name && board.rmk === this.form.rmk && board.lv === this.form.lv) return this.pop('변경한 것이 없습니다.', 'warning')
      this.$axios.put(`manage/board/${board._id}`, this.form)
        .then((r) => {
          if (!r.data.success) throw new Error(r.data.msg)
          board.name = this.form.name
          board.rmk = this.form.rmk
          board.lv = this.form.lv
          this.edit = false
        })
        .catch((e) => {
          this.pop(e.message, 'error')
        })
    },
    del (board) {
      this.$axios.delete(`manage/board/${board._id}`)
        .then((r) => {
          if (!r.data.success) throw new Error(r.data.msg)
          // 부모로 보낼 때는 삭제하고 난 후 목록 갱신(this.$emit(‘list’)) 정도 입니다.
          this.$emit('list')
        })
        .catch((e) => {
          this.pop(e.message, 'error')
        })
    },
    pop (m, t) {
      if (this.ma.act) return
      this.ma.act = true
      this.ma.msg = m
      this.ma.type = t
      setTimeout(() => {
        this.ma.act = false
      }, 6000)
    }
  }
}
</script>
