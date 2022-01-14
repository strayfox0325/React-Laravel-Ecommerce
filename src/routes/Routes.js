import Dashboard from '../components/admin/Dashboard';
import Profile from '../components/admin/Profile';

import Category from '../components/admin/category/Category';
import ShowCategory from '../components/admin/category/ShowCategory';
import EditCategory from '../components/admin/category/EditCategory';

import Product from '../components/admin/product/Product';
import ShowProduct from '../components/admin/product/ShowProduct';
import EditProduct from '../components/admin/product/EditProduct';

import Order from '../components/admin/order/Order';
const Routes = [

    //Auth Routes
    {path:'/admin', exact: true, name:'Admin'},
    {path:'/admin/dashboard', exact: true, name:'Dashboard', component: Dashboard},
    {path:'/admin/profile', exact: true, name:'Profile', component: Profile},
    //Category Routes
    {path:'/admin/show-category', exact: true, name:'ShowCategory', component: ShowCategory},
    {path:'/admin/edit-category/:id', exact: true, name:'EditCategory', component: EditCategory},
    {path:'/admin/add-category', exact: true, name:'Category', component: Category},
    //Product Routes
    {path:'/admin/show-product', exact: true, name:'ShowProduct', component: ShowProduct},
    {path:'/admin/edit-product/:id', exact: true, name:'EditProduct', component: EditProduct},
    {path:'/admin/add-product', exact: true, name:'Product', component: Product},
    {path:'/admin/orders', exact: true, name:'Order', component: Order},

];
export default Routes;
