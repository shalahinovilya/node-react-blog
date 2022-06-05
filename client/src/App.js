import {BrowserRouter as Router} from "react-router-dom";
import "materialize-css"
import {useRoutes} from "./routes";
import './index.css'
import {useAuth} from "./hooks/auth.hook";
import {AuthContext} from "./context/AuthContext";
import NavBar from "./components/NavBar";
import Loader from "./components/Loader";


function App() {
    const {token, userId, login, logout, ready} = useAuth()
    const isAuth = !!token
    const routes = useRoutes(isAuth)

    if (!ready) {
        return <Loader/>
    }

    return (
        <AuthContext.Provider value={{
            token, userId, login, logout, isAuth
        }}>
            <Router>
                {isAuth && <NavBar/>}
                <div className="container">
                    {routes}
                </div>
            </Router>
        </AuthContext.Provider>
    );
}

export default App;
