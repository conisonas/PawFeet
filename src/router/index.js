import { createRouter, createWebHashHistory } from 'vue-router'
import Login from '../components/Login.vue'
import Register from '../components/Register.vue'
import NavigationBar from '../components/NavigationBar.vue'
import Discovery from '../components/Discovery.vue'
import Release from '../components/Release.vue'
import Message from '../components/Message.vue'
import Find from '../components/Find.vue'
import Foster from '../components/Foster.vue'
import release1 from '../release/release1.vue'
import release2 from '../release/release2.vue'
import item from '../foster/item.vue'
import FindDetail from '../find/FindDetail.vue'
import foster1 from '../views/foster1.vue'
import favorite from '../views/favorite.vue'
import favoritefoster from '../views/favorite-foster.vue'
import favoritefind from '../views/favorite-find.vue'
import myfind from '../views/myfind.vue'
import profile from '../views/profile.vue'
// import { Toast } from 'vant';
const routes = [
  {
    path: '/Login',
    name: 'Login',
    component: Login,
    meta: {
      showNav: true
    }
  },
  {
    path: '/Register',
    name: 'Register',
    component: Register,
    meta: {
      showNav: true
    }
  },
  {
    path: '/NavigationBar',
    name: 'NavigationBar',
    component: NavigationBar,
  },
  {
    path: '/',
    name: 'Discovery',
    component: Discovery,
  },
  {
    path: '/Message',
    name: 'Message',
    component: Message
  },
  {
    path: '/Release',
    name: 'Release',
    component: Release
  },
  {
    path: '/Find',
    name: 'Find',
    component: Find,
    meta: {
      showNav: true
    }
  },
  {
    path: '/Foster',
    name: 'Foster',
    component: Foster,
    meta: {
      showNav: true
    }
  },
  {
    path: '/release1',
    name: 'release1',
    component: release1,
    meta: {
      showNav: true
    }
  },
  {
    path: '/release2',
    name: 'release2',
    component: release2,
    meta: {
      showNav: true,
      istoken:true
    },
  },
  {
    path: '/item',
    name: 'item',
    component: item,
    meta: {
      showNav: true
    }
  },
  {
    path: '/foster1',
    name: 'foster1',
    component: foster1,
    meta: {
      showNav: true
    }
  },
  {
    path: '/favorite',
    name: 'favorite',
    component: favorite,
    meta: {
      showNav: true
    },
    children: [
      {
        path: 'favoritefoster',
        component: favoritefoster,
      },
      {
        path: 'favoritefind',
        component: favoritefind,
      },
    ],
  },
  {
    path: '/FindDetail',
    name: 'FindDetail',
    component:FindDetail,
    meta: {
      showNav: true
    }
  },
  {
    path: '/myfind',
    name: 'myfind',
    component:myfind,
    meta: {
      showNav: true
    }
  },
  {
    path: '/profile',
    name: 'profile',
    component:profile,
    meta: {
      showNav: true
    }
  }
]
const router = createRouter({
  history: createWebHashHistory(),
  routes
})
router.beforeEach((to,from,next) => {
  // if(to.meta.istoken == true){
  //   Toast.fail('请先登录');
  //   return
  // }else{
     
  // }
   next()
})
export default router