import Home from '../components/front/Home';
import About from '../components/front/About';
import Contact from '../components/front/Contact';
import Register from '../components/front/Auth/Register';
import Login from '../components/front/Auth/Login';
import ShowCategory from '../components/front/collections/ShowCategory';
import ShowProduct from '../components/front/collections/ShowProduct';
import ProductDetails from '../components/front/collections/ProductDetails';
import Cart from '../components/front/Cart';


const PublicRouteList = [
    {path:'/', exact: true, name:'Home',component:Home},
    {path:'/about', exact: true, name:'About', component: About},
    {path:'/contact', exact: true, name:'Contact', component: Contact},
    {path:'/login', exact: true, name:'Login',component:Login},
    {path:'/register', exact: true, name:'Register',component:Register},
    {path:'/collections', exact: true, name:'ShowCategory',component:ShowCategory},
    {path:'/collections/:slug', exact: true, name:'ShowProduct',component:ShowProduct},
    {path:'/collections/:category/:product', exact: true, name:'ProductDetails',component:ProductDetails},
    {path:'/cart', exact: true, name:'Cart',component:Cart},
];
export default PublicRouteList;