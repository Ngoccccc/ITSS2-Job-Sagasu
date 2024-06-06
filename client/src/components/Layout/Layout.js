import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import { Helmet } from "react-helmet";
import { Grid, Container, Box } from "@mui/material/";
import { Toaster } from "react-hot-toast";

const Layout = ({
  children,
  title,
  description,
  keywords,
  author,
  backgroundColor,
}) => {
  return (
    <Box sx={{ backgroundColor }}>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <title>{title}</title>
        <meta name="keywords" content={keywords} />
      </Helmet>
      <Header />
      <main style={{ minHeight: "10vh" }}>
        <Container maxWidth="lg" sx={{ mt: 13, mb: 3 }}>
          <Grid
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
          >
            <Toaster />
            {children}
          </Grid>
        </Container>
      </main>
      <Footer />
    </Box>
  );
};

Layout.defaultProps = {
  title: "Chào các chứng thủ",
  description: "mern stack project",
  keywords: "mern,react,node,mongodb",
  backgroundColor: "#ffffff",
};

export default Layout;
