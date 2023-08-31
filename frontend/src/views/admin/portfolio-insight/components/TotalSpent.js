// Chakra imports
import {
  Box,
  Button,
  Flex,
  Icon,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
// Custom components
import Card from "components/card/Card.js";
import LineChart from "components/charts/LineChart";
import React, { useState, useEffect }  from "react";
import { IoCheckmarkCircle } from "react-icons/io5";
import { MdBarChart, MdOutlineCalendarToday } from "react-icons/md";
// Assets
import { RiArrowUpSFill } from "react-icons/ri";
import {
  lineChartDataTotalSpent,
  lineChartOptionsTotalSpent,
} from "variables/charts";
import { useDispatch, connect } from "react-redux";
import { registerUserAPI, loginUserAPI, getAllPortfolioAPI, getChartValuesAPI} from "actions/action";

const TotalSpent = (props) => {
  const { ...rest } = props;
  // console.log("Props from Total Spent: ", props);
  // const [xAxis, setXAxis] = useState(props.x_axis?props.x_axis:[]);
  // const [openData, setOpenData] = useState(props.open_data?props.open_data:[]);
  // const [closeData, setCloseData] = useState(props.close_data?props.close_data:[]);
  const portfolio = props?.state?.portfolioInsight?props.state.portfolioInsight:{};

  const [dataLoaded, setDataLoaded] = useState(false);


  const [xAxis, setXAxis] = useState([]);
  const [openData, setOpenData] = useState([]);
  const [closeData, setCloseData] = useState([]);
  const [totalData, setTotalData] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    const getChartValues = async () => {
      const data = {"portfolio_id":portfolio._id};

      const response = await getChartValuesAPI(
        data, dispatch
      );

      if(response.status==200){
        console.log("Data from portfolio API: ", response.data.data.x_axis);
        setXAxis(response.data.data.x_axis);
        setOpenData(response.data.data.open_data);
        setCloseData(response.data.data.close_data);
        setTotalData(response.data.data.total_data);
        setDataLoaded(true);
      

      //   setChartData({
      //     labels: response.data.data.x_axis,
      //     // datasets is an array of objects where each object represents a set of data to display corresponding to the labels above. for brevity, we'll keep it at one object
      //     datasets: [
      //         {
      //           label: 'Popularity of colours',
      //           data: response.data.data.close_data,
      //           // you can set indiviual colors for each bar
      //           backgroundColor: [
      //             'rgba(255, 255, 255, 0.6)',
      //             'rgba(255, 255, 255, 0.6)',
      //             'rgba(255, 255, 255, 0.6)'
      //           ],
      //           borderWidth: 1,
      //         }
      //     ]
      // });
      }
    }

    getChartValues();

    // setPortfolios([...array]);
  }, []);

  const lineChartDataTotalSpent = [
    {
      name: "Open",
      data: openData
    },
    {
      name: "Close",
      data: closeData,
    },
  ];
  
  const lineChartOptionsTotalSpent = {
    chart: {
      toolbar: {
        show: false,
      },
      dropShadow: {
        enabled: true,
        top: 13,
        left: 0,
        blur: 10,
        opacity: 0.1,
        color: "#4318FF",
      },
    },
    colors: ["#4318FF", "#39B8FF"],
    markers: {
      size: 0,
      colors: "white",
      strokeColors: "#7551FF",
      strokeWidth: 3,
      strokeOpacity: 0.9,
      strokeDashArray: 0,
      fillOpacity: 1,
      discrete: [],
      shape: "circle",
      radius: 2,
      offsetX: 0,
      offsetY: 0,
      showNullDataPoints: true,
    },
    tooltip: {
      theme: "dark",
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      type: "line",
    },
    xaxis: {
      type: "numeric",
      categories: xAxis,
      labels: {
        style: {
          colors: "#A3AED0",
          fontSize: "12px",
          fontWeight: "500",
        },
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      show: false,
    },
    legend: {
      show: false,
    },
    grid: {
      show: false,
      column: {
        color: ["#7551FF", "#39B8FF"],
        opacity: 0.5,
      },
    },
    color: ["#7551FF", "#39B8FF"],
  };


  // Chakra Color Mode

  const textColor = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = useColorModeValue("secondaryGray.600", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  const iconColor = useColorModeValue("brand.500", "white");
  const bgButton = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  const bgHover = useColorModeValue(
    { bg: "secondaryGray.400" },
    { bg: "whiteAlpha.50" }
  );
  const bgFocus = useColorModeValue(
    { bg: "secondaryGray.300" },
    { bg: "whiteAlpha.100" }
  );
  return (
    <Card
      justifyContent='center'
      align='center'
      direction='column'
      w='100%'
      mb='0px'
      {...rest}>
      <Flex justify='space-between' ps='0px' pe='20px' pt='5px'>
        <Flex align='center' w='100%'>
          <Button
            bg={boxBg}
            fontSize='sm'
            fontWeight='500'
            color={textColorSecondary}
            borderRadius='7px'>
            <Icon
              as={MdOutlineCalendarToday}
              color={textColorSecondary}
              me='4px'
            />
            This month
          </Button>
          <Button
            ms='auto'
            align='center'
            justifyContent='center'
            bg={bgButton}
            _hover={bgHover}
            _focus={bgFocus}
            _active={bgFocus}
            w='37px'
            h='37px'
            lineHeight='100%'
            borderRadius='10px'
            {...rest}>
            <Icon as={MdBarChart} color={iconColor} w='24px' h='24px' />
          </Button>
        </Flex>
      </Flex>
      <Flex w='100%' flexDirection={{ base: "column", lg: "row" }}>
        {/* <Flex flexDirection='column' me='20px' mt='28px'>
          <Text
            color={textColor}
            fontSize='34px'
            textAlign='start'
            fontWeight='700'
            lineHeight='100%'>
            $37.5K
          </Text>
          <Flex align='center' mb='20px'>
            <Text
              color='secondaryGray.600'
              fontSize='sm'
              fontWeight='500'
              mt='4px'
              me='12px'>
              Total Spent
            </Text>
            <Flex align='center'>
              <Icon as={RiArrowUpSFill} color='green.500' me='2px' mt='2px' />
              <Text color='green.500' fontSize='sm' fontWeight='700'>
                +2.45%
              </Text>
            </Flex>
          </Flex>

          <Flex align='center'>
            <Icon as={IoCheckmarkCircle} color='green.500' me='4px' />
            <Text color='green.500' fontSize='md' fontWeight='700'>
              On track
            </Text>
          </Flex>
        </Flex> */}
        <Box minH='360px' minW='100%' mt='auto'>
          {(dataLoaded==true)&&(<LineChart
            chartData={lineChartDataTotalSpent}
            chartOptions={lineChartOptionsTotalSpent}
          />)}
        </Box>
      </Flex>
    </Card>
  );
}

const mapStateToProps = (state) => {
  // console.log("State:", state);
  return {
    // To get the list of employee details from store
    state: state,
  };
};

export default connect(mapStateToProps, null)(TotalSpent);
