<template>
  <v-container grid-list-md>
    <v-alert
      :value="!users.length"
      type="warning"
    >
      데이터가 없습니다
    </v-alert>

    <v-layout row wrap>
      <v-flex xs12 sm6 md4 v-for="user in users" :key="user._id">
        <v-card height="100%">
          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">{{user.id}}</h3>
            </div>
          </v-card-title>
          <v-divider light></v-divider>
          <v-card-title primary-title>
            <div>
              <div>이름: {{user.name}}</div>
              <div>권한: {{user.lv}}</div>
              <div>나이: {{user.age}}</div>
              <div>로그인 횟수: {{user.inCnt}}</div>
              <div>소금(_id): {{user._id}}</div>
              <div>비밀번호: {{user.pwd}}</div>
            </div>
          </v-card-title>
          <v-divider light></v-divider>
          <v-card-actions>
            <v-btn flat color="orange" @click="editUser(user)">수정</v-btn>
            <v-btn flat color="error" @click="delUser(user._id)">삭제</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
    <!--
    -->
    <v-dialog v-model="dialog" persistent max-width="500px">
     <v-card>
       <v-card-title>
         <span class="headline">User Profile</span>
       </v-card-title>
       <v-card-text>
         <v-container grid-list-md>
           <v-layout wrap>
             <v-flex xs12 sm6 md4>
               <v-text-field
                 label="이름"
                 hint="홍길동"
                 persistent-hint
                 required
                 v-model="userInfo.name"
               ></v-text-field>
             </v-flex>
             <v-flex xs12 sm6>
               <v-select
                 :items="userLvs"
                 label="권한"
                 required
                 v-model="userInfo.lv"
               ></v-select>
             </v-flex>
             <v-flex xs12 sm6>
               <v-select
                 :items="userAges"
                 label="나이"
                 required
                 v-model="userInfo.age"
               ></v-select>
             </v-flex>
           </v-layout>
         </v-container>
       </v-card-text>
       <v-card-actions>
         <v-spacer></v-spacer>
         <v-btn color="blue darken-1" flat @click="putUser">수정</v-btn>
         <v-btn color="blue darken-1" flat @click.native="dialog = false">닫기</v-btn>
       </v-card-actions>
     </v-card>
   </v-dialog>
   <!--
   -->
   <v-snackbar
      v-model="snackbar"
    >
      {{ snackbarMsg }}
      <v-btn
        color="pink"
        flat
        @click="snackbar = false"
      >
        Close
      </v-btn>
    </v-snackbar>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    users: [],
    dialog: false,
    snackbar: false,
    snackbarMsg: "",
    userAges: [],
    userLvs: [],
    userId: "",
    userInfo: {
      age: 0,
      lv: 0,
      name: ""
    }
  }),
  mounted () {
    for (let i = 10; i < 40; i++) this.userAges.push(i);
    for (let i = 0; i < 4; i++) this.userLvs.push(i);
    //this.$axios.defaults.headers.common['Authorization'] = this.$store.state.token;
    this.getUsers();
  },
  methods: {
    getUsers() {
      this.$axios.get(`${this.$apiRootPath}manage/user`)
        .then((res) => {
          if (res.data.success) {
            this.users = res.data.users;
          } else {
            this.popMsg(res.data.msg);
          }
        })
        .catch((err) => {
          this.popMsg(err.message);
        });
    },
    editUser(user) {
      this.userId = user._id;
      this.dialog = true;
      this.userInfo.name = user.name;
      this.userInfo.lv = user.lv;
      this.userInfo.age = user.age;

    },
    putUser() {
      this.dialog = false;
      this.$axios.put(`${this.$apiRootPath}manage/user/${this.userId}`, {
        name: this.userInfo.name, lv: this.userInfo.lv, age: this.userInfo.age
      })
        .then((res) => {
          console.log(res);
          if(res.data.success) {
            this.popMsg("사용자 수정 완료");
            this.getUsers();
          } else {
            this.popMsg(res.data.msg);
          }
        })
        .catch((err) => {
          this.popMsg(err.message);
        });
    },
    delUser(id) {

      this.$confirm('Do you really want to delete tihs user?', {title: 'Warning'}).then(res => {
        if(res) {
          this.$axios.delete(`${this.$apiRootPath}manage/user/${id}`)
            .then((res) => {
              if(res.data.success) {
                this.popMsg('사용자 삭제 완료')
                this.getUsers();
              } else {
                this.popMsg(res.data.msg);
              }
            })
            .catch((err) => {
              this.popMsg(err.message);
            })
        }
      });

    },
    popMsg (msg) {
      this.snackbar = true
      this.snackbarMsg = msg
    }
  }
}
</script>
