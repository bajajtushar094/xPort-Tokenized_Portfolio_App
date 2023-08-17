import {
  Avatar,
  Box,
  Flex,
  FormLabel,
  Icon,
  Select,
  SimpleGrid,
  useColorModeValue,
  Text
} from "@chakra-ui/react";
// Assets
import Usa from "assets/img/dashboards/usa.png";
// Custom components
import MiniCalendar from "components/calendar/MiniCalendar";
import MiniStatistics from "components/card/MiniStatistics";
import IconBox from "components/icons/IconBox";
import React, { useState, useEffect } from "react";
import { useDispatch, connect } from "react-redux";
import {
  MdAddTask,
  MdAttachMoney,
  MdBarChart,
  MdFileCopy,
} from "react-icons/md";
import CheckTable from "views/admin/portfolio-insight/components/CheckTable";
import ComplexTable from "views/admin/portfolio-insight/components/ComplexTable";
import DailyTraffic from "views/admin/portfolio-insight/components/DailyTraffic";
import PieCard from "views/admin/portfolio-insight/components/PieCard";
import Tasks from "views/admin/portfolio-insight/components/Tasks";
import TotalSpent from "views/admin/portfolio-insight/components/TotalSpent";
import WeeklyRevenue from "views/admin/portfolio-insight/components/WeeklyRevenue";
import {
  columnsDataCheck,
  columnsDataComplex,
} from "views/admin/portfolio-insight/variables/columnsData";
import tableDataCheck from "views/admin/portfolio-insight/variables/tableDataCheck.json";
import tableDataComplex from "views/admin/portfolio-insight/variables/tableDataComplex.json";

const PortfolioInsight = (props) => {
  // Chakra Color Mode

  console.log("Props from User Reports: ", props);
  const portfolio = props.state.portfolioInsight?props.state.portfolioInsight:{};
  const brandColor = useColorModeValue("brand.500", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  const textColor = useColorModeValue("secondaryGray.900", "white");
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 3, "2xl": 6 }}
        // gap='20px'
        mb='20px'
        display="flex"
        flexDirection="column">
          <Text
						color={textColor}
						fontSize='26px'
						fontWeight='700'>
						{portfolio.name}
					</Text>
          <Text
						color={brandColor}
						fontSize='14px'
						fontWeight='700'>
						{portfolio.tagline}
					</Text>
        </SimpleGrid>
      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 3, "2xl": 6 }}
        gap='20px'
        mb='20px'>
        <MiniStatistics
          startContent={
            <IconBox
              w='56px'
              h='56px'
              bg={boxBg}
              icon={
                <Icon w='32px' h='32px' as={MdBarChart} color={brandColor} />
              }
            />
          }
          name='Valuation'
          value={portfolio.valuation}
        />
        <MiniStatistics
          startContent={
            <IconBox
              w='56px'
              h='56px'
              bg={boxBg}
              icon={
                <Icon w='32px' h='32px' as={MdAttachMoney} color={brandColor} />
              }
            />
          }
          name='No Of Assets'
          value={portfolio.num_assets}
        />
        <MiniStatistics growth='+23%' name='Sales' value='$574.34' />
        <MiniStatistics
          endContent={
            <Flex me='-16px' mt='10px'>
              <FormLabel htmlFor='balance'>
                <Avatar src={Usa} />
              </FormLabel>
              <Select
                id='balance'
                variant='mini'
                mt='5px'
                me='0px'
                defaultValue='usd'>
                <option value='usd'>USD</option>
                <option value='eur'>EUR</option>
                <option value='gba'>GBA</option>
              </Select>
            </Flex>
          }
          name='Your balance'
          value='$1,000'
        />
        <MiniStatistics
          startContent={
            <IconBox
              w='56px'
              h='56px'
              bg='linear-gradient(90deg, #4481EB 0%, #04BEFE 100%)'
              icon={<Icon w='28px' h='28px' as={MdAddTask} color='white' />}
            />
          }
          name='New Tasks'
          value='154'
        />
        <MiniStatistics
          startContent={
            <IconBox
              w='56px'
              h='56px'
              bg={boxBg}
              icon={
                <Icon w='32px' h='32px' as={MdFileCopy} color={brandColor} />
              }
            />
          }
          name='Total Projects'
          value='2935'
        />
      </SimpleGrid>

      <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap='20px' mb='20px'>
        <TotalSpent />
        <WeeklyRevenue />
      </SimpleGrid>
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

export default connect(mapStateToProps, null)(PortfolioInsight);
