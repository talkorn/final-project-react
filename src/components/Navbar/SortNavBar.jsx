import React, { useState } from "react";
import Select from "@mui/material/Select";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";

const SortHeader = ({
  onNumAscending,
  onNumDescending,
  onStrAscending,
  onStrDescending,
}) => {
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(""); // State to manage the selected value

  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value); // Update the selected value in the state

    switch (event.target.value) {
      case "numAscending":
        onNumAscending();
        break;
      case "numDescending":
        onNumDescending();
        break;
      case "strAscending":
        onStrAscending();
        break;
      case "strDescending":
        onStrDescending();
        break;
      default:
        break;
    }

    setOpen(false); // Close the dropdown manually after selecting an item
  };

  const handleSelectOpen = () => {
    setOpen(true);
  };

  const handleSelectClose = () => {
    setOpen(false);
  };

  return (
    <CardHeader
      sx={{
        height: "100%",
        backgroundColor: "white",
        "&:hover": {
          color: "black",
        },
        textAlign: "left",
      }}
      title={
        <Typography
          variant="h4"
          style={{
            fontFamily: "monospace",
            color: "black",
            fontSize: "1.2rem",
          }}
        >
          {"sort:"}
          <Select
            open={open}
            onClose={handleSelectClose}
            onOpen={handleSelectOpen}
            onChange={handleSelectChange}
            value={selectedValue} // Set the value of the Select component
          >
            <MenuItem value="numAscending">{"price low to high"}</MenuItem>
            <MenuItem value="numDescending">{"price high to low"}</MenuItem>
            <MenuItem value="strAscending">{"a-b"}</MenuItem>
            <MenuItem value="strDescending">{"b-a"}</MenuItem>
          </Select>
        </Typography>
      }
    />
  );
};

export default SortHeader;
