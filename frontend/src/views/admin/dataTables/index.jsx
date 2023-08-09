import { Box, SimpleGrid } from "@chakra-ui/react";
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
} from "@chakra-ui/react";
import Card from "components/card/Card";
import { AndroidLogo, AppleLogo, WindowsLogo } from "components/icons/Icons";
import Menu from "components/menu/MainMenu";
import DevelopmentTable from "views/admin/dataTables/components/DevelopmentTable";
import CheckTable from "views/admin/dataTables/components/CheckTable";
import ColumnsTable from "views/admin/dataTables/components/ColumnsTable";
import ComplexTable from "views/admin/dataTables/components/ComplexTable";
import {
	columnsDataDevelopment,
	columnsDataCheck,
	columnsDataColumns,
	columnsDataComplex,
} from "views/admin/dataTables/variables/columnsData";
import tableDataDevelopment from "views/admin/dataTables/variables/tableDataDevelopment.json";
import tableDataCheck from "views/admin/dataTables/variables/tableDataCheck.json";
import tableDataColumns from "views/admin/dataTables/variables/tableDataColumns.json";
import tableDataComplex from "views/admin/dataTables/variables/tableDataComplex.json";
import React, { useMemo } from "react";

import {
	useGlobalFilter,
	usePagination,
	useSortBy,
	useTable,
} from "react-table";

const Settings = () => {
	// Chakra Color Mode

	return (
		<Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
			<SimpleGrid
				mb="20px"
				columns={{ sm: 1, md: 1 }}
				spacing={{ base: "20px", xl: "20px" }}
			>
				<DevelopmentTable
					columnsData={columnsDataDevelopment}
					tableData={tableDataDevelopment}
        />
				{/* <CheckTable columnsData={columnsDataCheck} tableData={tableDataCheck} /> */}
				{/* <ColumnsTable
          columnsData={columnsDataColumns}
          tableData={tableDataColumns}
        />
        <ComplexTable
          columnsData={columnsDataComplex}
          tableData={tableDataComplex}
        /> */}
			</SimpleGrid>
		</Box>
	);
}


export default Settings;