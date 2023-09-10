import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";

const NameHeader = () => {
  const imagePath = `${process.env.PUBLIC_URL}/logoTals.png`;

  return (
    <CardHeader
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        backgroundColor: "lightyellow",
        "&:hover": {
          color: "black",
        },
      }}
      title={
        <Typography
          variant="h4"
          component="div"
          style={{
            /*   textShadow: "2px 2px 4px rgba(0, 0, 0, 0.8)", */
            fontFamily: "Pangolin",
            fontWeight: "bold",
            letterSpacing: ".1rem",
            color: "black",
            fontSize: "3rem",
            display: "flex", // Add this to display the elements in a row
            alignItems: "center", // Add this to vertically align the elements
          }}
        >
          <img
            src={imagePath}
            alt="Tal's Jewelry"
            style={{ width: "50px", height: "50px", marginRight: "10px" }}
          />
          <div>
            Tal's Jewelry
            <div style={{ fontSize: "1rem" }}>*RAMAT HASHARON-HANEVEEM*</div>
          </div>
        </Typography>
      }
    />
  );
};

export default NameHeader;
