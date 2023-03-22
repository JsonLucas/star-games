import { useContext, useState } from "react";
import { BoxLevelData, Container, MainRow, NavBarLink, SearchBox, SignOptionsBox, SignOptionsText, StarLevel, StarLevelText } from "./styles";
import { Link } from "react-router-dom";
import { IoIosSearch, IoIosLogIn, IoIosLogOut, IoIosStar, IoIosCart } from "react-icons/io";
import ProgressBar from "@ramonak/react-progress-bar";
import ModalCart from "../Modals/ModalCart";
import { UserContext } from "../../contexts/user";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { useToast } from "../../hooks/useToast";
import { Box, Flex, IconButton, Input, InputGroup, InputRightElement, Stack, Text } from "@chakra-ui/react";
import HeaderLinks from "./HeaderLinks";

export default function Header() {
	const [focus, setFocus] = useState<boolean>(false);
	const { isLogged, userLevel } = useContext(UserContext);
	const { removeAuth } = useLocalStorage();
	const { genericToast } = useToast();
	const [open, setOpen] = useState<boolean>(false);
	const logout = () => {
		try {
			removeAuth();
			window.location.reload();
		} catch (e: any) {
			console.log(e);
			genericToast({ message: e.message, type: 'error' });
		}
	}
	return (
		<Stack {...Container}>
			<Flex w='100%' h='50%' justifyContent='space-around' alignItems='center' bgColor='transparent'>
				{!isLogged && (
					<Box fontSize='18px' color='white'>
						Ainda não tem uma conta?
						<Link to='/sign-up'><Text fontSize='20px' fontWeight='bold'>Cadastre-se!</Text></Link>
					</Box>
				)}
				{isLogged && userLevel && (
					<Flex bgColor='transparent' justifyContent='space-between' alignItems='center'>
						<Box h='100%' w='30px' display='flex' justifyContent='center' alignItems='center' bgColor='transparent' fontSize='33px' position='relative'>
							<IoIosStar color="yellow" />
							<Text position='absolute' m='0 auto' fontSize='15px' fontWeight='bold'>{userLevel.id}</Text>
						</Box>
						<Box textAlign='center' color='white'>
							<ProgressBar completed={userLevel.totalScore}
								maxCompleted={userLevel.totalPoints} width='200px' height="15px"
								bgColor="grey" baseBgColor="white" isLabelVisible={false} />
							{userLevel.name}
						</Box>
						<Box h='100%' w='30px' display='flex' justifyContent='center' alignItems='center' bgColor='transparent' fontSize='33px' position='relative'>
							<IoIosStar color="yellow" />
							<Text position='absolute' m='0 auto' fontSize='15px' fontWeight='bold'>
								{userLevel.id + 1}
							</Text>
						</Box>
					</Flex>
				)}
				<Flex justifyContent='space-around' bgColor='white' alignItems='center' borderRadius='5px' _focus={{outlineStyle: 'solid', outlineWidth: '3px', outlineColor: 'blue'}}>
					<InputGroup>
						<Input p='8px' w='100%' border='none' borderRadius='5px' _focus={{ outline: 0 }}
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
						<InputRightElement pointerEvents='none' children={<IoIosSearch size={25} color="black" />} />
					</InputGroup>
				</Flex>
				<Box position='absolute' right='20px' top='20px' display='flex' w='90px' justifyContent='space-around' bgColor='transparent' cursor='pointer'>
					{isLogged && <Flex alignItems='center' color='white' fontSize='20px' fontWeight='bold'>
						<Text onClick={logout}>Sair</Text>
						<Text>
							<IoIosLogOut size={21} color="white" />
						</Text>
					</Flex>
					}{!isLogged && <Flex alignItems='center' color='white' fontSize='20px' fontWeight='bold'>
						<Link to="/login">
							<Text>Entrar</Text>
						</Link>
						<Text>
							<IoIosLogIn size={21} color="white" />
						</Text>
					</Flex>
					}
				</Box>
			</Flex>
			<Flex w='100%' bgColor='transparent' justifyContent='space-between' alignItems='center' position='relative'>
				<Flex w='calc(90% - 25px)' justifyContent='space-around'>
					<HeaderLinks />
				</Flex>
				<IconButton aria-label='Carrinho' fontSize='25px' colorScheme='lightgrey' color='white' mr='10px' cursor='pointer' onClick={() => setOpen(true)} variant='ghost' icon={<IoIosCart />} _hover={{ bgColor: 'lightgrey', color: 'black' }} />
				<ModalCart open={open} setOpen={setOpen} />
			</Flex>
		</Stack>
	);
}
