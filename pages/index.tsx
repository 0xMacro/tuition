import Layout from "components/Layout";
import Payments from "components/Payments/Payments";
import { Box } from "@chakra-ui/react";
import SeaBackground from "components/SeaBackground";

const Home = () => {
  return (
    <>
      <Layout>
        <Box>
          <Payments />
        </Box>
      </Layout>
      <SeaBackground />
    </>
  );
};

export default Home;
