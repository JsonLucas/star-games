import { Fragment, useEffect, useState } from "react";
import {
    BoxField,
    Container,
    NavbarLink,
    RowBottom,
    RowLinks,
    RowTop,
    SearchField,
    SignUser,
    SignUserButtons,
    UserWelcome,
} from "./styles";
import { Link } from "react-router-dom";
import { IoIosSearch, IoIosLogIn, IoIosLogOut } from "react-icons/io";

export default function Header() {
    const [focus, setFocus] = useState<boolean>(false);
    const [logged, setLogged] = useState<boolean>(false);
    const logout = () => {
        try{
            localStorage.removeItem('token');
            window.location.reload();
        }catch(e: any){
            console.log(e);
            alert(e.message);
        }
    }
    useEffect(() => {
        (async () => {
            try {
                const auth = localStorage.getItem("token");
                if (auth) {
                    setLogged(true);
                }
            } catch (e: any) {
                console.log(e);
            }
        })();
    }, []);
    return (
        <Container>
            <RowTop>
                {!logged && (
                    <UserWelcome>
                        Ainda não tem uma conta? <Link to='/sign-up'><span>Cadastre-se!</span></Link>
                    </UserWelcome>
                )}
                {logged && (
                    <UserWelcome>
                        Bem vindo <span>Fulano</span>!
                    </UserWelcome>
                )}
                <BoxField isFocused={focus}>
                    <SearchField
                        type="search"
                        name="search"
                        placeholder={`Buscar por: `}
                        onClick={() => {
                            setFocus(true);
                        }}
                        onBlur={() => {
                            setFocus(false);
                        }}
                    />
                    <IoIosSearch size={25} color="black" />
                </BoxField>
                <SignUser>
                    {logged && <Fragment>
                        <SignUserButtons onClick={logout}>Sair</SignUserButtons>
                        <SignUserButtons>
                            <IoIosLogOut size={21} color="white" />
                        </SignUserButtons>
                    </Fragment>
                    }{!logged && <Fragment>
                        <Link to="/login">
                            <SignUserButtons>Entrar</SignUserButtons>
                        </Link>
                        <SignUserButtons>
                            <IoIosLogIn size={21} color="white" />
                        </SignUserButtons>
                    </Fragment>
                    }
                </SignUser>
            </RowTop>
            <RowBottom>
                <RowLinks>
                    <NavbarLink>
                        <Link to="/">Home</Link>
                    </NavbarLink>
                    <NavbarLink>Histórico</NavbarLink>
                    <NavbarLink>Mais comprados</NavbarLink>
                    <NavbarLink>Recomendações diárias</NavbarLink>
                    {logged && <NavbarLink>Minha conta</NavbarLink>}
                </RowLinks>
            </RowBottom>
        </Container>
    );
}
