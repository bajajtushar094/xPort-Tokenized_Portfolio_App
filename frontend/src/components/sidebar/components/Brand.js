import React from "react";

// Chakra imports
import { Flex, useColorModeValue, Box, HStack, Text} from "@chakra-ui/react";

// Custom components
import { HorizonLogo } from "components/icons/Icons";
import { HSeparator } from "components/separator/Separator";

export function SidebarBrand() {
  //   Chakra color mode
  let logoColor = useColorModeValue("navy.700", "white");
  let activeColor = useColorModeValue("gray.700", "white");
  let inactiveColor = useColorModeValue(
    "secondaryGray.600",
    "secondaryGray.600"
  );
  let activeIcon = useColorModeValue("brand.500", "white");
  let textColor = useColorModeValue("secondaryGray.500", "white");
  let brandColor = useColorModeValue("brand.500", "brand.400");

  return (
    <Flex align="center" direction="column">
      {/* <HorizonLogo h='26px' w='175px' my='32px' color={logoColor} />
      <HSeparator mb='20px' /> */}
      <Text
        fontSize={"42px"}
        color={activeColor}
        fontWeight="bold"
        mx="auto"
        ps={{
          sm: "20px",
          xl: "26px",
        }}
        pt="18px"
        pb="12px"
      >
        xPort
      </Text>
    </Flex>
  );
}

export default SidebarBrand;
