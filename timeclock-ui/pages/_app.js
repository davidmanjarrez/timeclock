import "../styles/globals.css";
import Container from "@mui/material/Container";

const MyApp = ({ Component, pageProps }) => {
    return <Container><Component {...pageProps} /></Container>
}
export default MyApp