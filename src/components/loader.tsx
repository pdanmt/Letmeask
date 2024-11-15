import { Box, useTheme } from "@chakra-ui/react";
import { ClipLoader } from "react-spinners";

export function SpinLoader() {
    const theme = useTheme()

    return (
        <Box pos='fixed' top='50%' left='50%' transform='translate(-50% -50%)'>
            <ClipLoader color={theme.colors.black} size={32} />
        </Box>
    )
}