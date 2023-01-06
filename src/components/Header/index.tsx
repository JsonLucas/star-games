import { useContext, useState } from "react";
import { BoxLevelData, Container, MainRow, NavBarLink, SearchBox, SignOptionsBox, SignOptionsText, StarLevel, StarLevelText } from "./styles";
import { Link } from "react-router-dom";
import { IoIosSearch, IoIosLogIn, IoIosLogOut, IoIosStar, IoIosCart } from "react-icons/io";
import ProgressBar from "@ramonak/react-progress-bar";
import ModalCart from "../Modals/ModalCart";
import { UserContext } from "../../contexts/user";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { useToast } from "../../hooks/useToast";
import { Box, Input, Text } from "@chakra-ui/react";

export default function Header() {
    const [focus, setFocus] = useState<boolean>(false);
	const { isLogged, userLevel } = useContext(UserContext);
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
        <Box {...Container}>
            <Box {...MainRow} position='relative'>
                {!isLogged && (
                    <Box position='absolute' top='20px' left='20px' fontSize='18px' color='white'>
                        Ainda não tem uma conta? 
						<Link to='/sign-up'><Text fontSize='20px' fontWeight='bold'>Cadastre-se!</Text></Link>
                    </Box>
                )}
                {isLogged && userLevel && (
                    <Box {...BoxLevelData} position='absolute'>
                        <Box {...StarLevel} position='relative'>
                            <IoIosStar color="yellow" />
                            <Text position='absolute' {...StarLevelText}>{userLevel.id}</Text>
                        </Box>
                        <Box textAlign='center' color='white'>
                            <ProgressBar completed={userLevel.totalScore} 
                            maxCompleted={userLevel.totalPoints} width='200px' height="15px" 
                            bgColor="grey" baseBgColor="white" isLabelVisible={false} />
                            {userLevel.name}
                        </Box>
                        <Box {...StarLevel} position='relative'>
                            <IoIosStar color="yellow" />
                            <Text position='absolute' {...StarLevelText}>
								{userLevel.id + 1}
							</Text>
                        </Box>
                    </Box>
                )}
                <Box {...SearchBox}>
                    <Input p='8px' w='90%' border='none' borderRadius='5px' _focus={{outline: 0}}
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
                </Box>
                <Box position='absolute' {...SignOptionsBox}>
                    {isLogged && <>
                        <Text {...SignOptionsText} onClick={logout}>Sair</Text>
                        <Text {...SignOptionsText}>
                            <IoIosLogOut size={21} color="white" />
                        </Text>
                    </>
                    }{!isLogged && <>
                        <Link to="/login">
                            <Text {...SignOptionsText}>Entrar</Text>
                        </Link>
                        <Text {...SignOptionsText}>
                            <IoIosLogIn size={21} color="white" />
                        </Text>
                    </>
                    }
                </Box>
            </Box>
            <Box w='100%' h='50%' bgColor='transparent' display='flex' justifyContent='center' alignItems='center' position='relative'>
                <Box h='75%' w='650px' display='flex' justifyContent='space-between'>
                    <Box {...NavBarLink} textAlign='center'>
                        <Link to="/">Home</Link>
                    </Box>
                    <Box {...NavBarLink} textAlign='center'>
                        <Link to='/history'>Histórico</Link>
                    </Box>
                    <Box {...NavBarLink} textAlign='center'>
                        <Link to='/favorites'>Favoritos</Link>
					</Box>
                    <Box {...NavBarLink} textAlign='center'>
                        <Link to='/catalogue'>Todos os produtos</Link>
                    </Box>
                    {isLogged && <Box {...NavBarLink} textAlign='center'>
                        <Link to='/profile'>Minha conta</Link>
                    </Box>}
                </Box>
                <Box position='absolute' top='15px' right='30px' fontSize='25px' color='white' cursor='pointer' 
				onClick={() => setOpen(true)}>
                    <IoIosCart />
                </Box>
                <ModalCart open={open} setOpen={setOpen} />
            </Box>
        </Box>
    );
}
