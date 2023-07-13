import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
const NameHeader = () => {
  return (
    <CardHeader
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        backgroundColor: "black",
        "&:hover": {
          color: "black",
        },
      }}
      title={
        <Typography
          variant="h4"
          component="div"
          style={{
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.8)",
            fontFamily: "monospace",
            fontWeight: "bold",
            letterSpacing: ".1rem",
            color: "gold",
            fontSize: "3rem",
          }}
        >
          <CardGiftcardIcon />
          Tal's Jewelry
        </Typography>
      }
    />
    /* <CardHeader
      title=" Tal's Jewelry"
      sx={{
        textAlign: "center",
        fontFamily: "monospace",
        fontWeight: "bold",
        letterSpacing: ".1rem",
        color: "gold",
        textDecoration: "none",
        fontSize: "6rem",
        "&:hover": {
          color: "black",
        },
      }} 
    />*/
  );
};
export default NameHeader;