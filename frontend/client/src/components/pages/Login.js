import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../../actions/auth';

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Alert from '@material-ui/lab/Alert'; // Importar componente de alerta de Material-UI
import Snackbar from '@material-ui/core/Snackbar'; // Importar componente de Snackbar
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import useStyles from '../../utils/formStyles';

import { loadUser } from '../../actions/auth.js';

import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
} from '../../actions/types.js';

// Inicio Google
import { useGoogleLogin } from '@react-oauth/google';

const Login = () => {
  const classes = useStyles();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [openAlert, setOpenAlert] = useState(false); // Estado para controlar la visibilidad de la alerta
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  const { email, password } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch(login(email, password));
    setOpenAlert(true); // Mostrar la alerta después de iniciar sesión
  };

  const loginGoogle = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      console.log(tokenResponse);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: email,
      });

      //dispatch(loadUser());
  
    },
    onError: (error) => console.log('Login Failed:', error),
  });
  


  const handleCloseAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenAlert(false); // Cerrar la alerta
  };

  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  
  return (
    <Container component='main' maxWidth='xs' className={classes.container}>
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component='h1' variant='h4'>
          Gestor de Proyectos
        </Typography>
        <Typography component='h1' variant='h5'>
          Iniciar Sesion
        </Typography>
        <form className={classes.form} onSubmit={(e) => onSubmit(e)}>
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            label='Correo'
            name='email'
            autoComplete='email'
            autoFocus
            value={email}
            onChange={(e) => onChange(e)}
          />
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            name='password'
            label='Contraseña'
            type='password'
            autoComplete='current-password'
            value={password}
            onChange={(e) => onChange(e)}
          />
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
          >
            Iniciar Sesion
          </Button>


          <Button
            onClick={() => loginGoogle()}
            fullWidth
            variant='contained'
            color='secondary'
          >
            Iniciar Sesión con Google
          </Button>

          <Grid container justify='flex-end'>
            <Grid item>
              <Link href='/register' variant='body2'>
                No tienes cuenta? Registrarse
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Snackbar
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          open={openAlert}
          autoHideDuration={15000}
          onClose={handleCloseAlert}
        >
          <Alert
            onClose={handleCloseAlert}
            severity='success'
            variant='filled'
            action={
              <IconButton size='small' aria-label='close' color='inherit' onClick={handleCloseAlert}>
                <CloseIcon fontSize='small' />
              </IconButton>
            }
          >
            Inicio de sesión exitoso
          </Alert>
        </Snackbar>
      </Box>
    </Container>
  );
};

export default Login;
