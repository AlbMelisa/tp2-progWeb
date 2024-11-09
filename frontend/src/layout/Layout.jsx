import { Outlet, NavLink, useLocation } from 'react-router-dom';
import './layout.css';

/*const Layout = () => {
  return (
    <div className='layout-root'>
      <div className='layout-menu'>
        <h3>Trabajo Prático N°2</h3>
        <nav>
          <ul>
            <li>
              <NavLink
                to={ '/' }
                className={ ({ isActive }) => ( isActive ? 'menu-selected' : 'option1' ) }
              >
                Página Principal
              </NavLink>
            </li>
            <li>
              <NavLink
                to={ '/students' }
                className={ ({ isActive }) => ( isActive ? 'menu-selected-stu' : 'option2' ) }
              >
                Alumnos
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
      <div className='layout-main-content'>
        <Outlet />
      </div>
    </div>
  );
};*/



const Layout = () => {
  const location = useLocation();

  return (
    <div className='layout-root'>
      <div className='layout-menu'>
        <h3>Trabajo Práctico N°2</h3>
        <nav>
          <ul>
            <li className={location.pathname === '/' ? 'menu-selected' : 'option1'}>
              <NavLink to='/'>
                Página Principal
              </NavLink>
            </li>
            <li className={location.pathname === '/students' ? 'menu-selected-stu' : 'option2'}>
              <NavLink to='/students'>
                Alumnos
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
      <div className='layout-main-content'>
        <Outlet />
      </div>
    </div>
  );
};




export default Layout;
