<template>

  <v-container fluid grid-list-md>

    <v-layout row wrap>
      <v-flex xs12 sm6 md4 v-for="user in users">
        <v-card>
          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">{{user.name}}</h3>
              <div> {{ user.age }} </div>
            </div>
          </v-card-title>
          <v-card-actions>
            <v-btn flat color="orange" @click="putDialog(user)">수정</v-btn>
            <v-btn flat color="red" @click="delUser(user._id)">삭제</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>

    <v-layout row wrap>
      <!--[S] CRUD -->
      <v-flex xs12 sm6 md4>
        <v-card height="100%">
          <v-card-title primary-title>
            <div>
              <!-- <h3>Kangaroo Valley Safari</h3> -->
              <!-- <div> {{ card_text }} </div> -->
              <h3 class="headline mb-0">get</h3>
            </div>
          </v-card-title>
          <v-card-text>
           <v-textarea
             name="input-7-1"
             label="Default style"
             v-model=" getMd "
             hint=""
           ></v-textarea>
          </v-card-text>

          <v-card-actions>
            <!--flat: Removes card box shadow-->
             <v-btn flat color="orange" @click="getReq">submit</v-btn>
          </v-card-actions>
        </v-card>

      </v-flex>
      <!--[E] CRUD -->

        <!--[S] CRUD -->
        <v-flex xs12 sm6 md4>
          <v-card height="100%">
            <v-card-title primary-title>
              <div>
                <!-- <h3>Kangaroo Valley Safari</h3> -->
                <!-- <div> {{ card_text }} </div> -->
                <h3 class="headline mb-0">post</h3>
              </div>
            </v-card-title>
            <v-card-text>
             <v-textarea
               solo
               name="input-7-1"
               label="Default style"
               v-model=" postMd "
               hint=""
             ></v-textarea>
            </v-card-text>

            <v-card-actions>
              <!--flat: Removes card box shadow-->
               <v-btn flat color="orange" @click="postReq">submit</v-btn>
            </v-card-actions>
          </v-card>

        </v-flex>
        <!--[E] CRUD -->

       <!--[S] CRUD -->
       <v-flex xs12 sm6 md4>
        <v-card height="100%">
          <v-card-title primary-title>
            <div>
              <!-- <h3>Kangaroo Valley Safari</h3> -->
              <!-- <div> {{ card_text }} </div> -->
              <h3 class="headline mb-0">put</h3>
            </div>
          </v-card-title>
         <v-card-text>
           <v-textarea
            box
            name="input-7-1"
            label="Default style"
            v-model=" putMd "
            hint=""
           ></v-textarea>
         </v-card-text>
          <v-card-actions>
            <!--flat: Removes card box shadow-->
             <v-btn flat color="orange" @click="putReq">submit</v-btn>
             <v-spacer></v-spacer>
             <v-btn icon @click="show = !show">
               <v-icon>{{ show ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
             </v-btn>
          </v-card-actions>

          <v-slide-y-transition>
              <v-card-text v-show="show">
                I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for sleeping, soldier, not with all the bed making you'll be doing. Then we'll go with that data file! Hey, you add a one and two zeros to that or we walk! You're going to do his laundry? I've got to find a way to escape.
              </v-card-text>
            </v-slide-y-transition>
        </v-card>

       </v-flex>
       <!--[E] CRUD -->

        <!--[S] CRUD -->
        <v-flex xs12 sm6 md4>
          <v-card height="100%">
            <v-card-title primary-title>
              <div>
                <!-- <h3>Kangaroo Valley Safari</h3> -->
                <!-- <div> {{ card_text }} </div> -->
                  <h3 class="headline mb-0">delete</h3>

              </div>
            </v-card-title>

            <v-card-text>
             <v-textarea
                outline
                name="input-7-1"
                label="Default style"
                v-model=" delMd "
                hint=""
              ></v-textarea>
            </v-card-text>
            <v-card-actions>
              <!--flat: Removes card box shadow-->

               <v-btn flat color="orange" @click="delReq">submit</v-btn>
            </v-card-actions>
          </v-card>

        </v-flex>
        <!--[E] CRUD -->

        <v-btn
          absolute
          color="primary"
          fab
          bottom
          right
          dark
          @click="postDialog"
          >
          <v-icon>add</v-icon>
        </v-btn>
    </v-layout>

    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">User Profile</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md >
            <v-layout wrap row>
              <v-flex xs12 sm12 >
                <v-text-field
                  label="Legal first name*"
                  required
                  hint=""
                  persistent-hint
                  v-model="userName"
                ></v-text-field>
              </v-flex>

            </v-layout>

            <!-- <v-layout wrap row>
              <v-flex xs12>
                <v-text-field
                  label="Password*"
                  type="password"
                  required
                  v-model="userPassword"
                  ></v-text-field>
              </v-flex>
            </v-layout> -->
            <v-layout wrap row>
              <v-flex xs12 sm12>
                <v-select
                  :items="userAges"
                  label="Age*"
                  required
                  v-model="userAge"
                ></v-select>
              </v-flex>
            </v-layout>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" flat @click="postUser" v-if="!(this.userIdPut)">Save</v-btn>
          <v-btn color="blue darken-1" flat @click="putUser" v-if="(this.userIdPut)">Update</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-snackbar
      v-model="snackbar"
    >
      {{ snackbarMessage }}
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

import axios from 'axios'

export default {
  data() {
    return {
      show: false,
      dialog: false,
      snackbar: false,
      snackbarMessage: "",
      userAges: [],
      userName: "",
      userAge: 0,
      userPassword: "",
      userIdPut: "",
      userNamePut: "",
      userAgePut: 0,
      userPasswordPut: "",
      breakpoint: "",
      users: [],
      getMd: '',
      postMd: '',
      putMd: '',
      delMd: ''
    }
  },
  mounted () {
    for (let i=10; i<40; i++) this.userAges.push(i);
    this.getUsers();
  },
  methods: {
      getReq() {
        axios.get(`${this.$apiRootPath}crud`, {
          user: "getMan"
        }).then((res) => {
          this.getMd = JSON.stringify(res.data);
        }).catch((err) => {
          console.error(err.message);
        })
      },
      postReq() {
        axios.post(`${this.$apiRootPath}crud`, {
          user: "postMan"
        }).then((res) => {
          this.postMd = JSON.stringify(res.data);
        }).catch((err) => {
          console.log(err.message);
        })
      },
      putReq() {
        axios.put(`${this.$apiRootPath}crud`, {
          user: "putMan"
        }).then((res) => {
          this.putMd = JSON.stringify(res.data);
        }).catch((err) => {
          console.error(err.message);
        })
      },
      delReq() {
        axios.delete(`${this.$apiRootPath}crud`, {
          user: "delMan"
        }).then((res) => {
          this.delMd = JSON.stringify(res.data);
        }).catch((err) => {
          console.error(err.message);
        })
      },
      postDialog() {
        this.userIdPut = "";
        this.userName ="";
        this.userAge = 0,
        this.dialog = true;
      },
      putDialog(user) {
        this.userIdPut = user._id;
        this.userName = user.name,
        this.userAge = user.age,
        this.dialog = true;
      },
      postUser() {
        axios.post(`${this.$apiRootPath}user`, {
          name: this.userName, age: this.userAge
        }).then((res) => {
          this.pop("사용자 등록 완료");
          this.getUsers();
        }).catch((err) => {
          this.pop(err.message);
        })
        this.dialog = false;
      },
      getUsers() {
          axios.get(`${this.$apiRootPath}user`, {
          }).then((res) => {
            //console.log(res.data);
            this.users = res.data.users;
          }).catch((err) => {
            this.pop(err.message);
          })
      },
      putUser() {
          axios.put(`${this.$apiRootPath}user/${this.userIdPut}`, {
            name: this.userName, age: this.userAge
          }).then((res) => {
            this.pop("사용자 수정 완료");
            this.getUsers();
          }).catch((err) => {
            this.pop(err.message);
          })
          this.dialog = false;
      },
      delUser(id) {
          this.$confirm('Do you really want to exit?', {title: 'Warning'}).then(res => {
            if(res) {
              axios.delete(`${this.$apiRootPath}user/${id}`, {
              }).then((res) => {
                this.pop("사용자 삭제 완료");
                this.getUsers();
              }).catch((err) => {
                this.pop(err.message);
              })
            }

            this.dialog = false;

          })
      },
      pop(messsage) {
        this.snackbar = true;
        this.snackbarMessage = messsage;
      }
  }
}
</script>
