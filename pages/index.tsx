import Layout from "components/Layout";
import { Box } from "@chakra-ui/react";
import Landing from "components/Landing";

const Home = () => {
  return (
    <>
      <Layout>
        <Box>
          <Landing />
        </Box>
      </Layout>
    </>
  );
};

export default Home;
