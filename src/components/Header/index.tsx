import { Fragment, useEffect, useState } from "react";
import {
    BoxCart,
    BoxField,
    BoxStar,
    Container,
    NavbarLink,
    RowBottom,
    RowLinks,
    RowProgressBar,
    RowTop,
    RowUserProgress,
    SearchField,
    SignUser,
    SignUserButtons,
    UserWelcome,
} from "./styles";
import { Link } from "react-router-dom";
import { Levels } from "../../types/users";
import { IoIosSearch, IoIosLogIn, IoIosLogOut, IoIosStar, IoIosCart } from "react-icons/io";
import ProgressBar from "@ramonak/react-progress-bar";
import ModalCart from "../Modals/ModalCart";

export default function Header() {
    const [focus, setFocus] = useState<boolean>(false);
    const [logged, setLogged] = useState<boolean>(false);
    const [levelData, setLevelData] = useState<Levels>(Object);
    const [open, setOpen] = useState<boolean>(false);
    const logout = () => {
        try{
            localStorage.removeItem('token');
            localStorage.removeItem('levelData');
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
                const level = localStorage.getItem('levelData');
                if (auth) {
                    setLogged(true);
                    if(level){
                        setLevelData(JSON.parse(level));
                    }
                }
            } catch (e: any) {
                console.log(e);
                alert(e.message);
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
                    <RowUserProgress>
                        <BoxStar>
                            <IoIosStar color="yellow" />
                            <p>{levelData.levelNumber}</p>
                        </BoxStar>
                        <RowProgressBar>
                            <ProgressBar completed={levelData.totalScore} 
                            maxCompleted={levelData.totalPoints} width='200px' height="15px" 
                            bgColor="black" baseBgColor="white" isLabelVisible={false} />
                            {levelData.name}
                        </RowProgressBar>
                        <BoxStar>
                            <IoIosStar color="yellow" />
                            <p>{levelData.levelNumber + 1}</p>
                        </BoxStar>
                    </RowUserProgress>
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
                    <NavbarLink>
                        <Link to='/history'>Histórico</Link>
                    </NavbarLink>
                    <NavbarLink>
                        <Link to='/favorites'>Favoritos</Link></NavbarLink>
                    <NavbarLink>
                        <Link to='/catalogue'>Todos os produtos</Link>
                    </NavbarLink>
                    {logged && <NavbarLink>
                        <Link to='/profile'>Minha conta</Link>
                    </NavbarLink>}
                </RowLinks>
                <BoxCart onClick={() => setOpen(true)}>
                    <IoIosCart />
                </BoxCart>
                <ModalCart open={open} setOpen={setOpen} />
            </RowBottom>
        </Container>
    );
}
