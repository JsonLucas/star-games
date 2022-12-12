import { Fragment, useContext, useState } from "react";
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
import { IoIosSearch, IoIosLogIn, IoIosLogOut, IoIosStar, IoIosCart } from "react-icons/io";
import ProgressBar from "@ramonak/react-progress-bar";
import ModalCart from "../Modals/ModalCart";
import { UserLevel } from "../../types/levels";
import { UserContext } from "../../contexts/user";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { useToast } from "../../hooks/useToast";

interface Props{
	levelData?: UserLevel
}

export default function Header({ levelData }: Props) {
    const [focus, setFocus] = useState<boolean>(false);
	const { isLogged } = useContext(UserContext);
	const { removeAuth } = useLocalStorage();
	const { genericToast } = useToast();
    const [open, setOpen] = useState<boolean>(false);
    const logout = () => {
        try{
			removeAuth();
            window.location.reload();
        }catch(e: any){
            console.log(e);
            genericToast({message: e.message, type: 'error'});
        }
    }
    return (
        <Container>
            <RowTop>
                {!isLogged && (
                    <UserWelcome>
                        Ainda não tem uma conta? <Link to='/sign-up'><span>Cadastre-se!</span></Link>
                    </UserWelcome>
                )}
                {isLogged && levelData && (
                    <RowUserProgress>
                        <BoxStar>
                            <IoIosStar color="yellow" />
                            <p>{levelData.id}</p>
                        </BoxStar>
                        <RowProgressBar>
                            <ProgressBar completed={levelData.totalScore} 
                            maxCompleted={levelData.totalPoints} width='200px' height="15px" 
                            bgColor="grey" baseBgColor="white" isLabelVisible={false} />
                            {levelData.name}
                        </RowProgressBar>
                        <BoxStar>
                            <IoIosStar color="yellow" />
                            <p>{levelData.id + 1}</p>
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
                    {isLogged && <Fragment>
                        <SignUserButtons onClick={logout}>Sair</SignUserButtons>
                        <SignUserButtons>
                            <IoIosLogOut size={21} color="white" />
                        </SignUserButtons>
                    </Fragment>
                    }{!isLogged && <Fragment>
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
                    </NavbarLink>{/*
                    <NavbarLink>
                        <Link to='/favorites'>Favoritos</Link></NavbarLink>*/}
                    <NavbarLink>
                        <Link to='/catalogue'>Todos os produtos</Link>
                    </NavbarLink>
                    {isLogged && <NavbarLink>
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
