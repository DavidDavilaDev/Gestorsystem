import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100vh',
    maxWidth: '100vw',
    padding: '20px',
    background: 'linear-gradient(90deg, rgba(96,99,110,1) 5%, rgba(163,129,214,1) 46%, rgba(8,110,194,1) 98%)'
  },
  paper: {
    marginTop: theme.spacing(23),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    background: '#eeeeee76',
    maxWidth: '500px',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(2),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default useStyles;
