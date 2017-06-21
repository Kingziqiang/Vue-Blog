import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/components/home'
import Articles from '@/components/Articles'
import Article from '@/components/Article'
import Index from '@/components/Index'
import AboutMe from '@/components/AboutMe'

import Login from '@/components/Login' 
import Admin from '@/components/Admin'
import Amend from '@/components/Amend'
import Editor from '@/components/Editor'
import AddArticle from '@/components/AddArticle'
import Acount from '@/components/Acount'


Vue.use(Router)


  export default new Router({
    routes:[
      {
        path: '/',
        redirect: '/home',
        component: Index,
        children: [
          {path: 'home', name: 'Home', component: Home},
          {path: 'articles', name: 'articles', component: Articles},
          {path: 'aboutMe', name: 'AboutMe', component: AboutMe},
          {path: 'article/:aid', name: 'article', component: Article},
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
          {path: 'addArticle',name: 'addArticle',component: AddArticle},
          {path: 'editor/:aid',name: 'editor',component: Editor},
          {path: 'acount',name: 'acount',component: Acount}
        ]
      }
    ]
  })
