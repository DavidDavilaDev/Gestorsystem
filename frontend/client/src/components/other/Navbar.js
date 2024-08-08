import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../actions/auth';
import Avatar from '@material-ui/core/Avatar';
import Tooltip from '@material-ui/core/Tooltip';
import getInitials from '../../utils/getInitials'; // Asegúrate de importar la función getInitials adecuadamente


const Navbar = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user); // Obtener la información del usuario autenticado
  const dispatch = useDispatch();

  if (!isAuthenticated) {
    return '';
  }

  return (
    <nav className='navbar'>
      <Link to='/dashboard'>Home</Link>
      <Link to='/dashboard'>Gestor de Proyectos</Link>
              {user && (
                <Tooltip title={user.name}>
                  <Avatar className='avatar.narvar'>{getInitials(user.name)}</Avatar>
                </Tooltip>
              )}
              <Link to='/' onClick={() => dispatch(logout())}>
                Cerrar Sesion
              </Link>
    </nav>
  );
};

export default Navbar;
