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
import SellerView from './components/SellerView'
import AddCategory from './components/AddCategory'
import Category from './components/Category'
import ArticleCategory from './components/SelectArticlesCategory'

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
    { path: '/add-article', component: AddArticle },
    { path: '/edit-article/:id', name: 'edit', component: AddArticle },
    { path: '/seller-view/:id', name: 'sellerName', component: SellerView },
    { path: '/add-category', component: AddCategory },
    { path: '/category/:id', name: 'categoryName', components: {default: Category, side: SideBar} },
    { path: '/edit-category/:id', name: 'editCat', component: AddCategory },
    { path: '/add-category-articles', component: ArticleCategory }

]