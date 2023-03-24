import { Box, Button } from '@chakra-ui/react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../../contexts/user';

export default function HeaderLinks() {
  const style = {
	variant: 'ghost',
	color: 'white',
	_hover: { color: 'grey' }
  };
  const { isLogged, userLevel } = useContext(UserContext);
  return (
    <>
      <Button {...style} textAlign="center">
        <Link to="/">Home</Link>
      </Button>
      <Button {...style} textAlign="center">
        <Link to="/history">Histórico</Link>
      </Button>
      <Button {...style} textAlign="center">
        <Link to="/favorites">Favoritos</Link>
      </Button>
      <Button {...style} textAlign="center">
        <Link to="/catalogue">Todos os produtos</Link>
      </Button>
      {isLogged && (
        <Button {...style} textAlign="center">
          <Link to="/profile">Minha conta</Link>
        </Button>
      )}
    </>
  );
}
