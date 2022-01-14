import React, {useContext, useState} from 'react'
import {GlobalState} from '../../GlobalState'
import Menu from './icon/menu.svg'
import Close from './icon/close.svg'
import History from './icon/history.svg'
import {Link} from 'react-router-dom'
import axios from 'axios'



function Header(){
    const state = useContext(GlobalState)
    const [isLogged] = state.userAPI.isLogged
    const [isAdmin] = state.userAPI.isAdmin
    const [history] = state.userAPI.history
    const [menu, setMenu] = useState(false)

    const logoutUser = async() =>{
        await axios.get('/user/logout')
        localStorage.removeItem('firstLogin')
        window.location.href ="/";
    }
   
        const adminRouter = () =>{
            return(
                <>
                
                <li><Link to="/create_service">CREATE NEW</Link></li>
                <li><Link to="/category">CATEGORIES</Link></li>
                </>
            )
        }
        const loggedRouter = () =>{
            return(
                <>
                <li><Link to="/history">HISTORY/REPORTS</Link></li>
                <li><Link to="/" onClick={logoutUser}>LOGOUT</Link></li>
                </>
            )
        }
        const toggleMenu = ()=>setMenu(!menu)
    const styleMenu  ={
        left: menu ? 0:"-100%"
    }
    
     
    return(
        <header>
        
    

            <div className="menu" onClick={()=>setMenu(!menu)}>
                <img src={Menu} alt="" width="30"/>
            </div>
            <div className="logo">
                <h1>
                    <Link to="/">{isAdmin ? 'ADMINISTRATOR SHOP' : 'OUR SHOP'}</Link>
                </h1>
            </div>
            <ul style={styleMenu}>
                <li><Link to="/">{isAdmin ? 'SERVICES' : 'SERVICES'}</Link></li>

                {isAdmin && adminRouter()}
                {
                    isLogged ? loggedRouter() : <li><Link to="/login">Login & Register</Link></li>
                }
               

                <li onClick={()=>setMenu(!menu)}>
                    <img src={Close} alt="" width="30" className="menu"/>
                </li>
                
            </ul>
            {
                isAdmin ? ''
                :<div className="history-icon">
                <span>{History.length}</span>
                <Link to="/history">
                    <img src={History} alt="" width="30"/>
                </Link>
            </div>
            }
          
        </header>
    )
}
export default Header