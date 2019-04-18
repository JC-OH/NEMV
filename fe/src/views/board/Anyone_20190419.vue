<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card>
          <v-img
            class="white--text"
            height="70px"
            src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg"
          >
            <v-container fill-height fluid>
              <v-layout fill-height>
                <v-flex xs6 align-end flexbox>
                  <span class="headline">{{board.name}}</span>
                </v-flex>
                <v-flex xs6 align-end flexbox>
                  <span>{{board.rmk}}</span>
                </v-flex>
              </v-layout>
            </v-container>
          </v-img>
        </v-card>
      </v-flex>
      <v-flex xs12 sm6 md4 v-for="article in articles" :key="article._id">
        {{article}}
      </v-flex>
      <v-flex xs12>
       <v-data-table
         :headers="headers"
         :items="articles"
         :loading="loading">
         <template slot="items" slot-scope="props">
           <td :class="headers[0].class">{{ id2date(props.item._id)}}</td>
           <!-- 글 제목에 링크를 걸어서 다이얼로그를 띄우게 했습니다. -->
           <!-- 게시물을 그대로 read(atc)넘깁니다. -->
           <td :class="headers[1].class"><a @click="read(props.item)"> {{ props.item.title }}</a></td>
           <td :class="headers[2].class">{{ props.item._user ? props.item._user.id : '손님' }}</td>
           <td :class="headers[3].class">{{ props.item.cnt.view }}</td>
           <td :class="headers[4].class">{{ props.item.cnt.like }}</td>



         </template>
       </v-data-table>
     </v-flex>
    </v-layout>

    <v-btn
      color="pink"
      dark
      small
      absolute
      bottom
      right
      fab
      @click="addDialog"
    >
      <v-icon>add</v-icon>
    </v-btn>

    <v-dialog v-model="dialog" persistent max-width="500px">
      <v-card v-if="!dlMode">
        <v-card-title>
          <span class="headline">{{selArticle.title}}</span>
        </v-card-title>
        <v-card-text>
          {{selArticle.content}}
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="warning darken-1" flat @click.native="modDialog()">수정</v-btn>
          <v-btn color="error darken-1" flat @click.native="ca=true">삭제</v-btn>
          <v-btn color="secondary darken-1" flat @click.native="dialog = false">닫기</v-btn>
        </v-card-actions>
        <v-card-text>
          <v-card-text v-if="ca">
            <!-- 삭제는 위험하기 때문에 확인창(v-alert)를 추가했습니다. -->
            <v-alert v-model="ca" type="warning">
              <h4>정말 진행 하시겠습니까?</h4>
              <v-btn color="error" @click="del()">확인</v-btn>
              <v-btn color="secondary" @click="ca=false">취소</v-btn>
            </v-alert>
          </v-card-text>
        </v-card-text>
      </v-card>
      <v-card v-else>
        <v-card-title>
          <span class="headline">글 {{(dlMode === 1) ? '작성' : '수정'}}</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field
                  label="제목"
                  persistent-hint
                  required
                  v-model="form.title"
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-textarea
                  label="내용"
                  persistent-hint
                  required
                  v-model="form.content"
                ></v-textarea>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat @click="(dlMode === 1) ? add() : mod()">확인</v-btn>
          <v-btn color="red darken-1" flat @click.native="dialog = false">취소</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-snackbar
      v-model="sb.act"
    >
      {{ sb.msg }}
      <v-btn
        :color="sb.color"
        flat
        @click="sb.act = false"
      >
        닫기
      </v-btn>
    </v-snackbar>
  </v-container>
</template>
<script>

export default {
  data () {
    return {
      board: {
        name: '로딩중...',
        rmk: '무엇?'
      },
      articles: [],
      // 상단에 표시될 필드(컬럼) 들을 바인드 합니다. 배열로 되어 있으며 배열 개수만큼 표시됩니다.
      // 데이터테이블의 핵심인 headers를 먼저 정의 해야합니다.
      // - value는 값의 키 입니다.
      // - text는 표시될 내용입니다.
      // - sortable은 클릭해서 정렬이 가능하게 합니다.
      // - class는 해당 컬럼에 스타일을 적용할 수 있습니다.(_id는 hidden-sm-and-down으로 태블릿 이하에서는 표시되지 않음)
      // - html td 에 class를 바인딩 해놓은 것을 확인 할 수 있습니다.
      headers: [
        { text: '날짜', value: '_id', sortable: true, class: 'hidden-sm-and-down' },
        { text: '제목', value: 'title', sortable: true },
        { text: '글쓴이', value: '_user', sortable: false },
        { text: '조회수', value: 'cnt.view', sortable: true },
        { text: '추천', value: 'cnt.like', sortable: true }
      ],
      loading: false,
      // dlMode(0: 읽기, 1: 쓰기, 2: 수정)로 다이얼로그를 재활용 했습니다.
      dlMode: 0, // 0: read, 1: write, 2: modify
      selArticle: {},
      ca: false,
      dialog: false,
      lvs: [0, 1, 2, 3],
      form: {
        title: '',
        content: ''
      },
      //dlRead: false,
      rd: {
        title: '',
        content: ''
      },
      sb: {
        act: false,
        msg: '',
        color: 'error'
      }
    }
  },
  mounted () {
    this.get()
  },
  methods: {
    addDialog () {
      this.dialog = true
      this.dlMode = 1
      this.form = {
        title: '',
        content: ''
      }
    },
    modDialog () {
      this.dlMode = 2
      this.form = {
        title: this.selArticle.title,
        content: this.selArticle.content
      }
    },
    get () {
      this.$axios.get('board/아무나')
        .then(({ data }) => {
          if (!data.success) throw new Error(data.msg)
          this.board = data.d
          this.list()
        })
        .catch((e) => {
          this.pop(e.message, 'error')
        })
    },
    add () {
      if (!this.form.title) return this.pop('제목을 작성해주세요', 'warning')
      if (!this.form.content) return this.pop('내용을 작성해주세요', 'warning')
      this.$axios.post(`article/${this.board._id}`, this.form)
        .then((r) => {
          this.dialog = false
          this.list()
        })
        .catch((e) => {
          this.pop(e.message, 'error')
        })
    },
    // list () {
    //   if (this.loading) return
    //   // loading이 true 이면 테이블 상단에 프로그레스바가 표시됩니다.
    //   // 요청하기 전에 true 로 놓고 응답을 받으면 false 로 놓으면 끝입니다.
    //   this.loading = true
    //   this.$axios.get(`article/${this.board._id}`)
    //     .then(({ data }) => {
    //       // 실제 데이터 입니다. 현재 articles를 받아서 바인드시켜놨습니다.
    //       this.articles = data.ds
    //       this.loading = false
    //     })
    //     .catch((e) => {
    //       this.pop(e.message, 'error')
    //       this.loading = false
    //     })
    // },
    list () {
      if (this.loading) return
      this.loading = true
      this.$axios.get(`article/list/${this.board._id}`)
        .then(({ data }) => {
          this.articles = data.ds
          this.loading = false
        })
        .catch((e) => {
          this.pop(e.message, 'error')
          this.loading = false
        })
    },
    read (atc) {
     this.selArticle = atc
     this.loading = true
     this.$axios.get(`article/read/${atc._id}`)
       .then(({ data }) => {
         if (!data.success) throw new Error(data.msg)
         this.dlMode = 0
         this.dialog = true
         this.selArticle.content = data.d.content
         this.selArticle.cnt.view = data.d.cnt.view
         this.loading = false
       })
       .catch((e) => {
         this.pop(e.message, 'error')
         this.loading = false
       })
   },
   mod () {
     if (!this.form.title) return this.pop('제목을 작성해주세요', 'warning')
     if (!this.form.content) return this.pop('내용을 작성해주세요', 'warning')
     if (this.selArticle.title === this.form.title && this.selArticle.content === this.form.content)
       return this.pop('변경된 내용이 없습니다', 'warning')
     this.$axios.put(`article/${this.selArticle._id}`, this.form)
       .then(({ data }) => {
         this.dialog = false
         if (!data.success) throw new Error(data.msg)
         this.selArticle.title = data.d.title
         this.selArticle.content = data.d.content
         // this.list()
       })
       .catch((e) => {
         this.pop(e.message, 'error')
       })
   },
   del () {
     this.$axios.delete(`article/${this.selArticle._id}`)
       .then(({ data }) => {
         this.dialog = false
         if (!data.success) throw new Error(data.msg)
         this.list()
       })
       .catch((e) => {
         this.pop(e.message, 'error')
       })
   },
    id2date (val) {
      if (!val) return '잘못된 시간 정보'
      return new Date(parseInt(val.substring(0, 8), 16) * 1000).toLocaleString()
    },
    pop (m, c) {
      this.sb.act = true
      this.sb.msg = m
      this.sb.color = c
    }
  }
}
</script>
