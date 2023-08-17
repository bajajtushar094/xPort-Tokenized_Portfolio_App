import React, { useState, useEffect } from "react";
import { useDispatch, connect } from "react-redux";
// Chakra imports
import {
  Box,
  Button,
  Flex,
  Grid,
  Link,
  Text,
  useColorModeValue,
  SimpleGrid,
  Icon,
} from "@chakra-ui/react";

// Custom components
import Banner from "views/admin/marketplace/components/Banner";
import TableTopCreators from "views/admin/marketplace/components/TableTopCreators";
import HistoryItem from "views/admin/marketplace/components/HistoryItem";
import NFT from "components/card/NFT";
import Card from "components/card/Card.js";

// Assets
import Nft1 from "assets/img/nfts/Nft1.png";
import Nft2 from "assets/img/nfts/Nft2.png";
import Nft3 from "assets/img/nfts/Nft3.png";
import Nft4 from "assets/img/nfts/Nft4.png";
import Nft5 from "assets/img/nfts/Nft5.png";
import Nft6 from "assets/img/nfts/Nft6.png";
import Avatar1 from "assets/img/avatars/avatar1.png";
import Avatar2 from "assets/img/avatars/avatar2.png";
import Avatar3 from "assets/img/avatars/avatar3.png";
import Avatar4 from "assets/img/avatars/avatar4.png";
import tableDataTopCreators from "views/admin/marketplace/variables/tableDataTopCreators.json";
import { tableColumnsTopCreators } from "views/admin/marketplace/variables/tableColumnsTopCreators";

import { registerUserAPI, loginUserAPI, getAllPortfolioAPI } from "actions/action";
import { IoHeart, IoHeartOutline } from "react-icons/io5";
import { NavLink, useHistory } from "react-router-dom";

const Marketplace = (props) => {
  // Chakra Color Mode
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const textColorBrand = useColorModeValue("brand.500", "white");
  const dispatch = useDispatch();
  const [portfolios, setPortfolios] = useState([]);

  // const { image, name, author, bidders, download, currentbid } = props;
  const [like, setLike] = useState(false);
  const textColorNFT = useColorModeValue("navy.700", "white");
  const textColorBid = useColorModeValue("brand.500", "white");
  const history = useHistory();
  // const [portfolioSelected, setPortfolioSelected] = useState({});

  const portfolioInsights = () => {
    history.push("/admin/portfolio-insights");
  }

  useEffect(() => {
    const fetchPortfolios = async () => {
      const response = await getAllPortfolioAPI(
        dispatch
      );

      console.log("Data from portfolio API: ", response.data);
      // setPortfolios([...response.data.data]);
      console.log(response.data.data);

      var dummyArray = response.data.data;

      setPortfolios(dummyArray);

      console.log(portfolios);
    }

    fetchPortfolios();

    // setPortfolios([...array]);
  }, []);


  return (
    <Box pt={{ base: "180px", md: "80px", xl: "80px" }}>
      {/* Main Fields */}
      <Grid
        mb='20px'
        gridTemplateColumns={{ xl: "repeat(1, 1fr)", "2xl": "1fr 0.46fr" }}
        gap={{ base: "20px", xl: "20px" }}
        display={{ base: "block", xl: "grid" }}>
        <Flex
          flexDirection='column'
          gridArea={{ xl: "1 / 1 / 2 / 3", "2xl": "1 / 1 / 2 / 2" }}>
          <Banner />
          <Flex direction='column'>
            <Flex
              mt='45px'
              mb='20px'
              justifyContent='space-between'
              direction={{ base: "column", md: "row" }}
              align={{ base: "start", md: "center" }}>
              <Text color={textColor} fontSize='2xl' ms='24px' fontWeight='700'>
                Trending Portfolios
              </Text>
              <Flex
                align='center'
                me='20px'
                ms={{ base: "24px", md: "0px" }}
                mt={{ base: "20px", md: "0px" }}>
                <Link
                  color={textColorBrand}
                  fontWeight='500'
                  me={{ base: "34px", md: "44px" }}
                  to='#art'>
                  Stocks
                </Link>
                <Link
                  color={textColorBrand}
                  fontWeight='500'
                  me={{ base: "34px", md: "44px" }}
                  to='#music'>
                  High Return
                </Link>
                <Link
                  color={textColorBrand}
                  fontWeight='500'
                  me={{ base: "34px", md: "44px" }}
                  to='#collectibles'>
                  Low Volatile
                </Link>
                <Link color={textColorBrand} fontWeight='500' to='#sports'>
                  All Weather
                </Link>
              </Flex>
            </Flex>
            <SimpleGrid columns={{ base: 1, md: 3 }} gap='20px'>
              {portfolios.map((portfolio) => (
                //   <NFT
                //   name={portfolio.name}
                //   author={portfolio.tagline}
                //   bidders={[]}
                //   image={Nft1}
                //   currentbid={portfolio.valuation}
                //   download='#'
                // />
                <Card p='20px'>
                  <Flex direction={{ base: "column" }} justify='center'>
                    <Box mb={{ base: "20px", "2xl": "20px" }} position='relative'>
                      <Button
                        position='absolute'
                        bg='white'
                        _hover={{ bg: "whiteAlpha.900" }}
                        _active={{ bg: "white" }}
                        _focus={{ bg: "white" }}
                        p='0px !important'
                        top='14px'
                        right='14px'
                        borderRadius='50%'
                        minW='36px'
                        h='36px'
                        onClick={() => {
                          setLike(!like);
                        }}>
                        <Icon
                          transition='0.2s linear'
                          w='20px'
                          h='20px'
                          as={like ? IoHeart : IoHeartOutline}
                          color='brand.500'
                        />
                      </Button>
                    </Box>
                    <Flex flexDirection='column' justify='space-between' h='100%'>
                      <Flex
                        justify='space-between'
                        direction={{
                          base: "row",
                          md: "column",
                          lg: "row",
                          xl: "column",
                          "2xl": "row",
                        }}
                        mb='auto'>
                        <Flex direction='column'>
                          <Text
                            color={textColorNFT}
                            fontSize={{
                              base: "xl",
                              md: "lg",
                              lg: "lg",
                              xl: "lg",
                              "2xl": "md",
                              "3xl": "lg",
                            }}
                            mb='5px'
                            fontWeight='bold'
                            me='14px'>
                            {portfolio.name}
                          </Text>
                          <Text
                            color='secondaryGray.600'
                            fontSize={{
                              base: "sm",
                            }}
                            fontWeight='400'
                            me='14px'>
                            {portfolio.tagline}
                          </Text>
                        </Flex>
                      </Flex>
                      <Flex
                        align='start'
                        justify='space-between'
                        direction={{
                          base: "row",
                          md: "column",
                          lg: "row",
                          xl: "column",
                          "2xl": "row",
                        }}
                        mt='25px'>
                        <Text fontWeight='700' fontSize='sm' color={textColorBid}>
                          Current Valuation: {portfolio.valuation}
                        </Text>
                          <Button
                            variant='darkBrand'
                            color='white'
                            fontSize='sm'
                            fontWeight='500'
                            borderRadius='70px'
                            px='24px'
                            py='5px'
                            onClick={() => {
                              // setPortfolioSelected(portfolio);
                              dispatch({
                                type: "PORTFOLIO_INSIGHTS",
                                portfolioInsight: portfolio
                              })
                              portfolioInsights();
                            }}>
                            Explore Portfolio
                          </Button>
                      </Flex>
                    </Flex>
                  </Flex>
                </Card>
              ))}
            </SimpleGrid>
          </Flex>
        </Flex>
      </Grid>
      {/* Delete Product */}
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

export default connect(mapStateToProps, null)(Marketplace);