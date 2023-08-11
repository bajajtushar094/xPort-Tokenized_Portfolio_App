import 'react-notifications/lib/notifications.css';
import { Box, SimpleGrid } from "@chakra-ui/react";
import { NavLink, useHistory } from "react-router-dom";
import { useDispatch, connect } from "react-redux";
import {
	Flex,
	Progress,
	Table,
	Tbody,
	Td,
	Text,
	Th,
	Thead,
	Tr,
	useColorModeValue,
	Button,
	Checkbox,
	FormControl,
	FormLabel,
	Heading,
	Icon,
	Input,
	InputGroup,
	InputRightElement,
} from "@chakra-ui/react";
import Card from "components/card/Card";
import React, { useState, useEffect } from "react";

import illustration from "assets/img/auth/auth.png";
import { FcGoogle } from "react-icons/fc";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { RiEyeCloseLine } from "react-icons/ri";
import { registerUserAPI, loginUserAPI, addPortfolioAPI } from "actions/action";

import {NotificationContainer, NotificationManager} from 'react-notifications';


const Settings = () => {
	// Chakra Color Mode


	const dispatch = useDispatch();
	const history = useHistory();
	// const textColor = useColorModeValue("navy.700", "white");
	const [show, setShow] = React.useState(false);
	const handleClick = () => setShow(!show);


	const textColor = useColorModeValue("secondaryGray.900", "white");
	const iconColor = useColorModeValue("secondaryGray.500", "white");
	const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");


	const [assets, setAssets] = useState([]);
	const [assetName, setAssetName] = useState("");
	const [assetValue, setAssetValue] = useState("");
	const [assetType, setAssetType] = useState("");

	const addAsset = ()=>{
		var addedAsset = {
			asset_name: assetName,
			asset_value: assetValue,
			asset_type: assetType
		}

		setAssets([...assets, addedAsset]);
		setAssetName("");
		setAssetType("");
		setAssetValue("");
	}

	const addPortfolio = async () => {
		const portfolioData = {
			name: portfolioName,
			tagline: portfolioTagline,
			num_assets: noOfAsstes,
			valuation: valuation,
			assets: assets
		};

		const response = await addPortfolioAPI(portfolioData, dispatch);

		if(response.status==200){
			console.log("Response from react page add portflio: ", response);
			NotificationManager.success('Title', "Portflio Added");
		}
	}

	const [portfolioName, setPortfolioName] = useState("");
	const [portfolioTagline, setPortfolioTagline] = useState("");
	const [noOfAsstes, setNoOfAssets] = useState("");
	const [valuation, setValuation] = useState("");

	return (
		<>
		<Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
			<SimpleGrid
				mb="20px"
				columns={{ sm: 1, md: 1 }}
				spacing={{ base: "20px", xl: "20px" }}
			>
				<Card
					direction='column'
					w='100%'
					px='0px'
					overflowX={{ sm: "scroll", lg: "hidden" }}>
					<Flex px='25px' justify='space-between' align='center'>
						<Flex justifyContent="space-between" align="center" mb="24px">
							<FormControl display="flex" flexDirection="column">
								<FormLabel
									htmlFor="remember-login"
									mb="0"
									fontWeight="normal"
									color={textColor}
									fontSize="sm"
								>
									Portfolio Name
								</FormLabel>
								<Input
									isRequired={true}
									variant="auth"
									fontSize="sm"
									type="email"
									placeholder=""
									mb="24px"
									fontWeight="500"
									size="lg"
									onChange={(event) => {
										setPortfolioName(event.target.value);
									}}
								/>
							</FormControl>
						</Flex>
						<Flex justifyContent="space-between" align="center" mb="24px">
							<FormControl display="flex" flexDirection="column">
								<FormLabel
									htmlFor="remember-login"
									mb="0"
									fontWeight="normal"
									color={textColor}
									fontSize="sm"
								>
									Portfolio Tagline
								</FormLabel>
								<Input
									isRequired={true}
									variant="auth"
									fontSize="sm"
									type="email"
									placeholder=""
									mb="24px"
									fontWeight="500"
									size="lg"
									onChange={(event) => {
										setPortfolioTagline(event.target.value);
									}}
								/>
							</FormControl>
						</Flex>
						<Flex justifyContent="space-between" align="center" mb="24px">
							<FormControl display="flex" flexDirection="column">
								<FormLabel
									htmlFor="remember-login"
									mb="0"
									fontWeight="normal"
									color={textColor}
									fontSize="sm"
								>
									Number of Assets
								</FormLabel>
								<Input
									isRequired={true}
									variant="auth"
									fontSize="sm"
									type="email"
									placeholder=""
									mb="24px"
									fontWeight="500"
									size="lg"
									onChange={(event) => {
										setNoOfAssets(event.target.value);
									}}
								/>
							</FormControl>
						</Flex>

						<Flex justifyContent="space-between" align="center" mb="24px">
							<FormControl display="flex" flexDirection="column">
								<FormLabel
									htmlFor="remember-login"
									mb="0"
									fontWeight="normal"
									color={textColor}
									fontSize="sm"
								>
									Valuation
								</FormLabel>
								<Input
									isRequired={true}
									variant="auth"
									fontSize="sm"
									type="email"
									placeholder=""
									mb="24px"
									fontWeight="500"
									size="lg"
									onChange={(event) => {
										setValuation(event.target.value);
									}}
								/>
							</FormControl>
						</Flex>
					</Flex>
				</Card>
				<Flex px='25px' justify='space-between' mb='20px' align='center'>
					<Text
						color={textColor}
						fontSize='22px'
						fontWeight='700'
						lineHeight='100%'>
						Portfolio Assets
					</Text>
					{/* <Menu /> */}
				</Flex>
				{assets.map((asset) => (
				<Card
					direction='column'
					w='100%'
					px='0px'
					mb="25px"
					overflowX={{ sm: "scroll", lg: "hidden" }}>
					<Flex px='25px' justify='space-between' align='center' w="100%">
						<Flex justifyContent="space-between" align="center" >
							<FormControl display="flex" flexDirection="column">
								<FormLabel
									htmlFor="remember-login"
									mb="0"
									fontWeight="normal"
									color={textColor}
									fontSize="sm"
								>
									Asset Name
								</FormLabel>
								<Text color={textColor} fontSize='sm' fontWeight='700'>
									{asset.asset_name}
								</Text>
							</FormControl>
						</Flex>
						<Flex justifyContent="space-between" align="center" mb="24px">
							<FormControl display="flex" flexDirection="column">
								<FormLabel
									htmlFor="remember-login"
									mb="0"
									fontWeight="normal"
									color={textColor}
									fontSize="sm"
								>
									Asset Valutation
								</FormLabel>
								<Text color={textColor} fontSize='sm' fontWeight='700'>
									{asset.asset_value}
								</Text>
							</FormControl>
						</Flex>
						<Flex justifyContent="space-between" align="center" mb="24px">
							<FormControl display="flex" flexDirection="column">
								<FormLabel
									htmlFor="remember-login"
									mb="0"
									fontWeight="normal"
									color={textColor}
									fontSize="sm"
								>
									Asset Type
								</FormLabel>
								<Text color={textColor} fontSize='sm' fontWeight='700'>
									{asset.asset_type}
								</Text>
							</FormControl>
						</Flex>
					</Flex>
				</Card>))}
				<Flex px='25px' flexDirection="column" align="end" justify="end">
					<Card
						direction='column'
						w='100%'
						px='0px'
						mb="25px"
						overflowX={{ sm: "scroll", lg: "hidden" }}>
						<Flex px='25px' justify='space-between' align='center' w="100%">
							<Flex justifyContent="space-between" align="center" >
								<FormControl display="flex" flexDirection="column">
									<FormLabel
										htmlFor="remember-login"
										mb="0"
										fontWeight="normal"
										color={textColor}
										fontSize="sm"
									>
										Asset Name
									</FormLabel>
									<Input
										isRequired={true}
										variant="auth"
										fontSize="sm"
										ms={{ base: "0px", md: "0px" }}
										type="email"
										placeholder=""
										mb="24px"
										fontWeight="500"
										size="lg"
										value={assetName}
										onChange={(event) => {
											setAssetName(event.target.value);
										}}
									/>
								</FormControl>
							</Flex>
							<Flex justifyContent="space-between" align="center" mb="24px">
								<FormControl display="flex" flexDirection="column">
									<FormLabel
										htmlFor="remember-login"
										mb="0"
										fontWeight="normal"
										color={textColor}
										fontSize="sm"
									>
										Asset Valutation
									</FormLabel>
									<Input
										isRequired={true}
										variant="auth"
										fontSize="sm"
										ms={{ base: "0px", md: "0px" }}
										type="email"
										placeholder=""
										mb="24px"
										fontWeight="500"
										size="lg"
										value={assetValue}
										onChange={(event) => {
											setAssetValue(event.target.value);
										}}
									/>
								</FormControl>
							</Flex>
							<Flex justifyContent="space-between" align="center" mb="24px">
								<FormControl display="flex" flexDirection="column">
									<FormLabel
										htmlFor="remember-login"
										mb="0"
										fontWeight="normal"
										color={textColor}
										fontSize="sm"
									>
										Asset Type
									</FormLabel>
									<Input
										isRequired={true}
										variant="auth"
										fontSize="sm"
										ms={{ base: "0px", md: "0px" }}
										type="email"
										placeholder=""
										mb="24px"
										fontWeight="500"
										size="lg"
										value={assetType}
										onChange={(event) => {
											setAssetType(event.target.value);
										}}
									/>
								</FormControl>
							</Flex>
						</Flex>
					</Card>
					<Flex px='25px' flexDirection="column" align="end" justify="end">
						<Button
							fontSize="sm"
							variant="brand"
							fontWeight="500"
							w="100%"
							h="50"
							mb="24px"
							onClick={() => {
								addAsset()
							}}
						>
							Add Asset
						</Button>
					</Flex>
				</Flex>
				<Flex px='25px' w="20%" flexDirection="row" align="start" justify="start">
				<Button
							fontSize="sm"
							colorScheme="messenger"
							fontWeight="500"
							w="100%"
							h="50"
							mb="24px"
							onClick={() => {
								addPortfolio();
							}}
						>
							Add Portfolio
						</Button>
				</Flex>

			</SimpleGrid>
		</Box>
		<NotificationContainer/>
		</>
	);
}


export default Settings;