import { BrowserRouter,Switch,Route,Link } from "react-router-dom";
import LoginForm from "./LoginForm";
import UserList from "./UserList";
function AppRouter() {
  return (
    <>
      <BrowserRouter>
      <div className="row">
          <Link className="btn btn-dark col m-3" to="/login">Login</Link>
          <Link className="btn btn-dark col m-3"  to="/users">show users</Link>
      </div>
        <Switch>
            <Route path="/login">
                <LoginForm/>
            </Route>
            <Route path={["/users",""]}>
                <UserList/>
            </Route>
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default AppRouter;
