import Dashboard from '../components/admin/Dashboard';
import Profile from '../components/admin/Profile';
import Category from '../components/admin/Category';
import ShowCategory from '../components/admin/ShowCategory';
import ShowCategory from '../components/admin/EditCategory';


const Routes = [

    {path:'/admin', exact: true, name:'Admin'},
    {path:'/admin/dashboard', exact: true, name:'Dashboard', component: Dashboard},
    {path:'/admin/profile', exact: true, name:'Profile', component: Profile},
    {path:'/admin/show-category', exact: true, name:'ShowCategory', component: ShowCategory},
    {path:'/admin/edit-category/:id', exact: true, name:'EditCategory', component: EditCategory},
    {path:'/admin/add-category', exact: true, name:'Category', component: Category},


];
export default Routes;
