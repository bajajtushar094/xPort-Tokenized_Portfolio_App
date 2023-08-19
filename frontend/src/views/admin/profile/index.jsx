import { Box, Grid } from "@chakra-ui/react";

import Card from "components/card/Card.js";

// Custom components
import Banner from "views/admin/profile/components/Banner";
import General from "views/admin/profile/components/General";
import Notifications from "views/admin/profile/components/Notifications";
import Projects from "views/admin/profile/components/Projects";
import Storage from "views/admin/profile/components/Storage";
import Upload from "views/admin/profile/components/Upload";

// Assets
import banner from "assets/img/auth/banner.png";
import avatar from "assets/img/avatars/avatar4.png";
import React, { useState, useEffect } from "react";

import {
	// Box,
	Button,
	Checkbox,
	Flex,
	FormControl,
	FormLabel,
	Heading,
	Icon,
	Input,
	InputGroup,
	InputRightElement,
	Text,
	useColorModeValue,
} from "@chakra-ui/react";

import illustration from "assets/img/auth/auth.png";
import { FcGoogle } from "react-icons/fc";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { RiEyeCloseLine } from "react-icons/ri";

import { registerUserAPI, loginUserAPI, additionalUserInfoAPI } from "actions/action";
import { useDispatch, connect } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";

const Overview = (props) => {
	console.log("Props from profile page: ", props);
	const dispatch = useDispatch();
	const history = useHistory();
	const textColor = useColorModeValue("navy.700", "white");
	const textColorSecondary = "gray.400";
	const textColorDetails = useColorModeValue("navy.700", "secondaryGray.600");
	const textColorBrand = useColorModeValue("brand.500", "white");
	const brandStars = useColorModeValue("brand.500", "brand.400");

	const [mobile, setMobile] = useState("");
	const [password, setPassword] = useState("");

	const userDetails = props.state?.user?.userDetail;

	console.log("User Details: ", userDetails);

	const [name, setName] = useState(userDetails?.name);
	const [pancard, setPancard] = useState(userDetails?.pancard);
	const [aadharCard, setAadharCard] = useState(userDetails?.aadhar_card);
	const [email, setEmail] = useState(userDetails?.email);

	const [show, setShow] = React.useState(false);
	const handleClick = () => setShow(!show);

	// const signInUser = async () => {
	// 	const response = await loginUserAPI(
	// 		{ mobile, password },
	// 		dispatch
	// 	);

	// 	if (response.status == 200) {
	// 		history.push("/admin/portfolio-marketplace");
	// 	}
	// }


	const additionalUserInfo = async () => {
		const response = await additionalUserInfoAPI(
			{ name, pancard, aadhar_card:aadharCard, email },
			dispatch
		);

		if(response.status == 200) {
			console.log("User info added");
		}
	}


	return (
		<Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
			{/* Main Fields */}
			<Grid
				templateColumns={{
					base: "1fr",
					lg: "1fr",
				}}
				templateRows={{
					base: "repeat(2, 1fr)",
					lg: "1fr",
				}}
				gap={{ base: "20px", xl: "20px" }}>
				<Banner
					gridArea='1 / 1 / 2 / 2'
					banner={banner}
					avatar={avatar}
					name={userDetails?.name}
					job='Product Designer'
					posts={userDetails?.pancard}
					followers={userDetails?.aadhar_card}
					following={userDetails?.email}
				/>
				<Flex display="flex" alignItems="center" justifyContent="center">
					<Card w='45%' mb={{ base: "0px", lg: "20px" }} align='center' display="flex" alignItems="center">
						<Flex
							zIndex="2"
							direction="column"
							w={{ base: "100%", md: "420px" }}
							maxW="100%"
							background="transparent"
							borderRadius="15px"
							mx={{ base: "auto", lg: "unset" }}
							me="auto"
							mb={{ base: "20px", md: "auto" }}
						>
							<FormControl>
								<FormLabel
									display="flex"
									ms="4px"
									fontSize="sm"
									fontWeight="500"
									color={textColor}
									mb="8px"
								>
									Name
								</FormLabel>
								<Input
									isRequired={true}
									variant="auth"
									fontSize="sm"
									ms={{ base: "0px", md: "0px" }}
									type="text"
									placeholder={name}
									mb="24px"
									fontWeight="500"
									size="lg"
									onChange={(event) => {
										setName(event.target.value);
									}}
								/>
								<FormLabel
									ms="4px"
									fontSize="sm"
									fontWeight="500"
									color={textColor}
									display="flex"
								>
									Pancard No.
								</FormLabel>
								<InputGroup size="md">
									<Input
										isRequired={true}
										fontSize="sm"
										placeholder={pancard}
										mb="24px"
										size="lg"
										type="text"
										variant="auth"
										onChange={(event) => {
											setPancard(event.target.value);
										}}
									/>
								</InputGroup>
								<FormLabel
									ms="4px"
									fontSize="sm"
									fontWeight="500"
									color={textColor}
									display="flex"
								>
									Aadhar Card No.
								</FormLabel>
								<InputGroup size="md">
									<Input
										isRequired={true}
										fontSize="sm"
										placeholder={aadharCard}
										mb="24px"
										size="lg"
										type="text"
										variant="auth"
										onChange={(event) => {
											setAadharCard(event.target.value);
										}}
									/>
								</InputGroup>
								<FormLabel
									ms="4px"
									fontSize="sm"
									fontWeight="500"
									color={textColor}
									display="flex"
								>
									Email ID
								</FormLabel>
								<InputGroup size="md">
									<Input
										isRequired={true}
										fontSize="sm"
										placeholder={email}
										mb="24px"
										size="lg"
										type="text"
										variant="auth"
										onChange={(event) => {
											setEmail(event.target.value);
										}}
									/>
								</InputGroup>

								<Button
									fontSize="sm"
									variant="brand"
									fontWeight="500"
									w="100%"
									h="50"
									mb="24px"
									onClick={() => {
										additionalUserInfo();
									}}
								>
									Submit
								</Button>
							</FormControl>
						</Flex>
					</Card>
				</Flex>
				<Projects
					gridArea='1 / 2 / 2 / 2'
					banner={banner}
					avatar={avatar}
					name='Adela Parkson'
					job='Product Designer'
					posts='17'
					followers='9.7k'
					following='274'
				/>
			</Grid>
		</Box>
	);
}


const mapStateToProps = (state) => {
	// console.log("State:", state);
	return {
	  // To get the list of employee details from store
	  state: state,
	};
  };
  
export default connect(mapStateToProps, null)(Overview);

