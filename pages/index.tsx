import Layout from "components/Layout";
import Payments from "components/Payments/Payments";
import { Center } from "@chakra-ui/react";

const Home = () => {
  return (
    <Layout>
      <Center h="60vh">
        <Payments />
      </Center>
    </Layout>
  );
};

export default Home;
