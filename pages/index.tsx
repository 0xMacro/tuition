import Layout from "components/Layout";
import { Box } from "@chakra-ui/react";
import SeaBackground from "components/SeaBackground";
import Landing from "components/Landing";

const Home = () => {
  return (
    <>
      <Layout>
        <Box>
          <Landing />
        </Box>
      </Layout>
      <SeaBackground />
    </>
  );
};

export default Home;
