import { Flex, useTheme } from "@chakra-ui/react";
import React from "react";
import ClipLoader from "react-spinners/ClipLoader";

interface LoadingProps {
  isLoading: boolean;
  children: React.ReactNode | undefined;
}

const Loading = ({ isLoading, children }: LoadingProps) => {
  const theme = useTheme();
  return (
    <div>
      {isLoading ? (
        <Flex justifyContent={{ base: "center", sm: "flex-start" }}>
          <ClipLoader color={theme.colors.blue[800]} size={80} />{" "}
        </Flex>
      ) : (
        children
      )}
    </div>
  );
};

export default Loading;
