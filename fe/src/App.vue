<template>
   <!--
   ==================================================================================
   == [S] v-app
   ==================================================================================
   -->
  <div id="app">
   <v-app id="inspire">
    <!--
    ----------------------------------------------------------------------------------
    -- [E] v-navigation-drawer
    ----------------------------------------------------------------------------------
    -->
    <v-navigation-drawer
       fixed
       v-model="drawer"
       app
    >

        <v-list>
          <v-list-tile>
            <v-list-tile-action>
              <v-icon>home</v-icon>
            </v-list-tile-action>
            <v-list-tile-title>Home</v-list-tile-title>
          </v-list-tile>
          <v-list-group
            v-for="item in items"
            :key="item.title"
            v-model="item.active"
            :prepend-icon="item.action"
            :append-icon=" (item.items) ? $vuetify.icons.expand : ''"
            no-action
          >
            <template v-slot:activator>
              <v-list-tile
                :to="item.link"
              >
                <v-list-tile-content>
                  <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </template>
            <v-list-tile
              v-for="subItem in item.items"
              :key="`${item.title}-${subItem.title}`"
              :to="subItem.link"
            >
              <v-list-tile-content>
                <v-list-tile-title>{{ subItem.title }}</v-list-tile-title>
              </v-list-tile-content>

              <v-list-tile-action>
                <v-icon>{{ subItem.action }}</v-icon>
              </v-list-tile-action>
            </v-list-tile>
          </v-list-group>
        </v-list>

    </v-navigation-drawer>
    <!--
    ----------------------------------------------------------------------------------
    -- [S] v-navigation-drawer
    ----------------------------------------------------------------------------------
    -->

     <!--
     ----------------------------------------------------------------------------------
     -- [S] v-toolbar
     ----------------------------------------------------------------------------------
     -->
    <v-toolbar color="indigo" dark fixed app>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>Application</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-menu bottom left>
          <v-btn icon slot="activator">
            <v-icon>more_vert</v-icon>
          </v-btn>
          <v-list>
            <!-- v-if=”!$store.state.token” 으로 토큰이 없을때는 로그인 있을때는 로그아웃이 처리되었습니다. -->
            <v-list-tile v-if="!$store.state.token" @click="$router.push('signin')">
              <v-list-tile-title>로그인</v-list-tile-title>
            </v-list-tile>
            <v-list-tile v-else @click="signOut">
              <v-list-tile-title>로그아웃</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
      </v-toolbar-items>

    </v-toolbar>
     <!--
     ----------------------------------------------------------------------------------
     -- [E] v-toolbar
     ----------------------------------------------------------------------------------
     -->

    <!--
    ----------------------------------------------------------------------------------
    -- [S] v-content
    ----------------------------------------------------------------------------------
    -->
    <v-content>
      <v-container fluid fill-height>
        <v-layout
          justify-center
          align-center
        >
          <router-view/>
        </v-layout>
      </v-container>
    </v-content>
    <!--
    ----------------------------------------------------------------------------------
    -- [E] v-content
    ----------------------------------------------------------------------------------
    -->

    <!--
    ----------------------------------------------------------------------------------
    -- [S] v-footer
    ----------------------------------------------------------------------------------
    -->
    <v-footer color="indigo" app inset>
    <span class="white--text">&copy; 2017 - {{$store.state.token}}</span>
    </v-footer>
    <!--
    ----------------------------------------------------------------------------------
    -- [E] v-footer
    ----------------------------------------------------------------------------------
    -->
  </v-app>
   <!--
   ==================================================================================
   == [E] v-app
   ==================================================================================
   -->
</div>
</template>

<script>

export default {
  name: 'App',
  data () {
    return {
      drawer: null,
      items: [
          {
            action: 'portrait',
            title: 'About',
            link:"/About"
          },
          // {
          //   action: 'account_circle',
          //   title: 'Sign-in',
          //   link: '/Signin'
          // },
          {
            action: 'group',
            title: 'User',
            link: '/User'
          },
          {
            action: 'folder',
            title: 'page',
            link: '/Page'
          },
          {
            action: 'folder_open',
            title: 'Pages',
            items: [
              { title: 'lv 0', action: 'web', link:"/Pages" },
              { title: 'lv 1', action: 'web', link:"/Pages/lv1" },
              { title: 'lv 2', action: 'web', link:"/Pages/lv2" },
              { title: 'lv 3', action: 'web', link:"/Pages/lv3" }
            ]
          },
          {
            action: 'computer',
            title: 'Test',
            items: [
              { title: 'CRUD', action: 'work_outline', link:"/Test" },
              { title: 'User', action: 'person', link:"/Test/User" },
              { title: 'Header', action: 'info', link:"/Test/Header" }
            ]
          }
        ]

    }
  },
  methods: {
    signOut() {
      // 로그아웃(signOut)함수에서 토큰을 지워버리고 로그인 페이지로 보냅니다.

      //localStorage.removeItem('token');
      //로그아웃에 delToken 변이를 호출해서 토큰 값을 지우는 것이 확인되었습니다.
      this.$store.commit('delToken');
      this.$router.push('/');
    }
  }
}
</script>
