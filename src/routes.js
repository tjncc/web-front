import HomePage from './components/HomePage.vue'
import SearchBar from './components/SearchBar.vue'
import SideBar from './components/SideBar.vue'
import RegisterBar from './components/Register.vue'
import LoginBar from './components/Login.vue'
import BuyerProfile from './components/BuyerProfile.vue'
import ArticleView from './components/ArticleView.vue'
import AdminProfile from './components/AdminProfile'
import ArticleListAdmin from './components/ArticleListAdmin'
import AllArticles from './components/AllArticles'
import SellerProfile from './components/SellerProfile'
import AddArticle from './components/AddArticle'

export default[
    { path:'/', components: {default: HomePage, header: SearchBar, side: SideBar }},
    { path: '/register', component: RegisterBar },
    { path: '/login', component: LoginBar },
    { path: '/buyer-profile', component: BuyerProfile },
    { path: '/articleinfo/:id', name: 'name', component: ArticleView },
    { path: '/admin-profile', components: {default: AdminProfile, side: SideBar} },
    { path: '/article-list', component: ArticleListAdmin },
    { path: '/all-articles', components: {default: AllArticles, header: SearchBar, side: SideBar} },
    { path: '/seller-profile', component: SellerProfile },
    { path: '/add-article', component: AddArticle }
]