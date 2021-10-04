import React from 'react';
import { Link } from 'react-router-dom';
import './Menu.css'

function MenuBar() {

  const [cookie, setCookie] = React.useState()

  function getCookie() {
    let myCookie = document.cookie.match("(^|;)\\s*" + 'super-duper-mega-ultra-secret-cookie' + "\\s*=\\s*([^;]+)")
    return myCookie ? myCookie.pop() : ""
  }

  React.useEffect(() => {
    if(getCookie()){
      setCookie(true)
    } else {
      setCookie(false)
    }
  }, [])

  return (
    <div>
      <ul id='menu'>
        <li id='menuTitle'><Link to='/'>Cecil Thomas</Link></li>
        <li id='menuItem'><Link to='/movies'>Movie Reviews</Link></li>
        <li id='menuItem'><Link to='/marathon/'>Movie Marathons</Link></li>
        {/* <li id='menuItem'><Link to='/minecraft'>Minecraft Server</Link></li> */}
        <li id='menuItem'><Link to='/resume'>Resume</Link></li>
        <li id='menuItem'><a href='https://toolring.cecil-thomas.com' rel='external' target='__blank'>ToolRing</a></li>
        {/* <li id='menuItem'><a href='/bucketlist'>Bucket List</a></li> */}
        {/* <li id='menuItem'><a href='/gas_tracker'>Gas Tracker</a></li> */}
        {/* <li id='menuItem'><a href='/blog'>Blog</a></li> */}
        {
          cookie ?
          <>
            <li id='menuItem'><Link to='/____admin'>Admin</Link></li>
            <li id='menuItem'><Link to='/____admin/movie'>Admin Movies</Link></li>
          </>
          : null
        }
      </ul>
    </div>
  )
}

export default MenuBar;