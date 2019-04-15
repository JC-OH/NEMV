<template>

  <v-container grid-list-md>
    <v-alert
      :value="!sites.length"
      type="warning"
    >
      데이터가 없습니다
    </v-alert>
    <v-layout row wrap>
      <v-flex xs12 sm6 md4 v-for="site in sites" :key="site._id">
        <v-card>
          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">{{site.title}}</h3>
            </div>
          </v-card-title>
          <v-divider light></v-divider>
          <v-card-title primary-title>
            <div>
              <div>하단: {{site.copyright}}</div>
              <div>색상: {{site.dark}}</div>
            </div>
          </v-card-title>
          <v-divider light></v-divider>
          <v-card-actions>
            <v-btn flat color="orange" @click="editDialog(site)">수정</v-btn>
            <v-btn flat color="error" @click="delSite(site._id)">삭제</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>

    <v-dialog v-model="dialog" persistent max-width="500px">
       <v-card>
         <v-card-title>
           <span class="headline">사이트 수정</span>
         </v-card-title>
         <v-card-text>
           <v-container grid-list-md>
             <v-layout wrap>
               <v-flex xs12 sm6 md4>
                 <v-text-field
                   label="사이트 이름"
                   hint="아무거나"
                   persistent-hint
                   required
                   v-model="site.title"
                 ></v-text-field>
               </v-flex>
               <v-flex xs12 sm6>
                 <v-text-field
                   label="사이트 하단"
                   hint="아무거나"
                   persistent-hint
                   required
                   v-model="site.copyright"
                 ></v-text-field>
               </v-flex>
               <v-flex xs12 sm6>
                 <v-switch
                   label="다크모드"
                   v-model="site.dark"
                 ></v-switch>
               </v-flex>
             </v-layout>
           </v-container>
         </v-card-text>
         <v-card-actions>
           <v-spacer></v-spacer>
           <v-btn color="blue darken-1" flat @click="putSite">수정</v-btn>
           <v-btn color="blue darken-1" flat @click.native="dialog = false">Close</v-btn>
         </v-card-actions>
       </v-card>
     </v-dialog>
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
  data() {
    return {
      sites: [],
      dialog: false,
      snackbar: false,
      snackbarMsg: '',
      site: {
        title: "",
        copyright: "",
        dark: false
      },
      selectedId: ''
    }
  },
  mounted() {
    this.getSites();
  },
  methods: {
    getSites() {
      this.$axios.get('manage/site')
        .then(res => {
          this.sites = res.data.sites;
        })
        .catch(err => {
          this.popMsg(err.message);
        })
    },
    editDialog(site) {
      this.selectedId = site._id
      this.site.title = site.title
      this.site.copyright = site.copyright
      this.site.dark = site.dark
      this.dialog = true
    },
    putSite() {
      this.dialog = false;

      this.$axios.put(`manage/site/${this.selectedId}`, {
        title: this.site.title, copyright: this.site.copyright, dark: this.site.dark
      })
        .then(res => {
          if (res.data.success) {
            this.popMsg('페이지 수정 완료')
            this.getSites()
          } else {
            this.popMsg(res.msg)
          }
        })
        .catch(err => {
          this.popMsg(err.message)
        });
    },
    delSite(id) {
      console.log(id);
    },
    popMsg (msg) {
      this.snackbar = true
      this.snackbarMsg = msg
    }
  }
}
</script>
