import React from "react";
import { MotionFlex } from "components/MotionComponents";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { Text } from "@chakra-ui/react";
import { useTheme } from "@chakra-ui/react";

const ThankYou = ({ itemVariant }: any) => {
  const theme = useTheme();
  return (
    <MotionFlex
      mt={{ base: 5, md: 0 }}
      flexDirection={{ base: "column", sm: "row" }}
      justifyContent={{ base: "center", sm: "flex-start" }}
      alignItems="center"
      variants={itemVariant}
    >
      <AiOutlineCheckCircle size={60} color={theme.colors.green[500]} />
      <Text
        ml={{ base: 0, md: 5 }}
        fontWeight="bold"
        fontSize="2xl"
        textAlign="center"
        color={theme.colors.gray[900]}
      >
        Thank you for your contribution.
      </Text>
    </MotionFlex>
  );
};

export default ThankYou;
