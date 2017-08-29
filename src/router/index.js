import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/components/front/home'
import Archives from '@/components/front/Archives'
import Article from '@/components/front/Article'
import Index from '@/components/front/Index'
import AboutMe from '@/components/front/AboutMe'
import Articles from '@/components/front/Articles'
import Tags from '@/components/front/Tags'

import Login from '@/components/back/Login' 
import Admin from '@/components/back/Admin'
import Amend from '@/components/back/Amend'
import Editor from '@/components/back/Editor'
/*import AddArticle from '@/components/back/AddArticle'*/
import Acount from '@/components/back/Acount'
import Draft from '@/components/back/Draft'


Vue.use(Router)


  export default new Router({
    routes:[
      {
        path: '/',
        redirect: '/home',
        component: Index,
        children: [
          {path: 'home', name: 'Home', component: Home},
          {path: 'archives', name: 'archives', component: Archives},
          {path: 'tags', name: 'tags', component: Tags},
          {path: 'aboutMe', name: 'AboutMe', component: AboutMe},
          {path: 'article/:aid', name: 'article', component: Article},
          {path: 'articles', name: 'articles', component: Articles}
        ]
      },
      {
        path: '/login',
        name: 'login',
        component: Login
      },
      {
        path: '/admin',
        redirect: 'amend',
        component: Admin,
        children: [
          {path: 'amend',name: 'amend',component: Amend},
          {path: '编辑/:type',name: 'addArticle',component: Editor},
          {path: '编辑/:type/:aid',name: 'editor',component: Editor},
          {path: 'acount',name: 'acount',component: Acount},
          {path: 'draft',name: 'draft',component:Draft}
        ]
      }
    ]
  })
