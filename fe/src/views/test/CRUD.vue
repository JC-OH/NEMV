<template>
<v-container fluid grid-list-md>
  <!--row: Sets flex direction to row-->
  <!--wrap: Allows children to wrap within the container if the elements use more than 100%. / 요소가 100 % 이상을 사용하는 경우 컨테이너에서 래핑 할 수 있습니다.-->
<v-layout row wrap>

    <v-textarea
      auto-grow

      name="breakpoint"
      v-model=" breakpoint "
    ></v-textarea>
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
 </v-layout>
</v-container>

</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      show: false,
      breakpoint: "",
      users: [],
      getMd: '',
      postMd: '',
      putMd: '',
      delMd: ''
    }
  },
  mounted () {
    this.breakpoint = JSON.stringify(this.$vuetify.breakpoint);
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
    }
  }
}
</script>
