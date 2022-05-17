import HomePage from './components/HomePage.vue'
import SignUp from './components/Auth/SignUp.vue'
import LogIn from './components/Auth/LogIn.vue'
import ForgotPass from './components/Auth/ForgotPass.vue'
import ResetPass from './components/Auth/ResetPass.vue'

const routes = [
  { path: '/', component: HomePage },
  { path: "/sign-up", component: SignUp },  // props: true will make the route dynamic and will be passed as a prop to the component
  { path: "/sign-in", component: LogIn },
  { path: "/forgot-password", component: ForgotPass },
  { path: "/reset-password/:token", component: ResetPass },

  { path: '*', redirect: '/' }

]
export default routes