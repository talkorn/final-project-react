import React, { useState, useEffect } from "react";

import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";

import Button from "@mui/material/Button";
import TableRowsIcon from "@mui/icons-material/TableRows";
import DashboardCustomizeIcon from "@mui/icons-material/DashboardCustomize";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledSelect = styled(Select)(({ theme }) => ({
  "& .MuiSelect-root": {
    color: "blue", // Set the text color to blue
  },
  "& .MuiSelect-icon": {
    color: "blue", // Set the icon color to blue
  },
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "blue !important", // Set the border color to blue
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "blue !important", // Set the border color to blue on hover
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "blue !important", // Set the border color to blue when focused
  },
}));

const SortHeader = ({
  onNumAscending,
  onNumDescending,
  onStrAscending,
  onStrDescending,
  onChangeTableToCards,
  onChangeCardsToTable,
}) => {
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(""); // State to manage the selected value
  const [TabletSize, setTabletSize] = useState(false);
  const selectStyles = {
    "& .MuiOutlinedInput-root": {
      borderColor: "blue",
    },
    "& .MuiSelect-icon": {
      color: "blue",
    },
    color: "blue",
  };
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
  useEffect(() => {
    const handleResize = () => {
      setTabletSize(window.innerWidth <= 600);
    };

    // Initial check on component mount
    handleResize();

    // Add event listener to listen for window resize
    window.addEventListener("resize", handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      style={{
        backgroundColor: "white",
        display: "flex",
        /*  justifyContent: "space-between",
        alignItems: "center", */
        textAlign: "left",
        "&:hover": {
          color: "black",
        },
      }}
    >
      <Typography
        variant="h4"
        style={{
          fontFamily: "monospace",
          color: "black",
          fontSize: "1.2rem",
        }}
      >
        {"sort:"}
      </Typography>
      <FormControl variant="outlined">
        <StyledSelect
          open={open}
          onClose={handleSelectClose}
          onOpen={handleSelectOpen}
          onChange={handleSelectChange}
          value={selectedValue}
          label="Select"
          sx={{ color: "blue" }}
        >
          {" "}
          <MenuItem value="numAscending">{"price low to high"}</MenuItem>
          <MenuItem value="numDescending">{"price high to low"}</MenuItem>
          <MenuItem value="strAscending">{"a-b"}</MenuItem>
          <MenuItem value="strDescending">{"b-a"}</MenuItem>
        </StyledSelect>
      </FormControl>

      {/*  <Select
        open={open}
        onClose={handleSelectClose}
        onOpen={handleSelectOpen}
        onChange={handleSelectChange}
        value={selectedValue}
        sx={{ fontSize: "0.9rem", margin: 0 }}
      >
        <MenuItem value="numAscending">{"price low to high"}</MenuItem>
        <MenuItem value="numDescending">{"price high to low"}</MenuItem>
        <MenuItem value="strAscending">{"a-b"}</MenuItem>
        <MenuItem value="strDescending">{"b-a"}</MenuItem>
      </Select> */}
      {!TabletSize && (
        <div style={{ display: "flex", alignItems: "center" }}>
          <Button size="small" onClick={onChangeTableToCards}>
            <TableRowsIcon sx={{ color: "blue" }} />
          </Button>
          <Button size="small" onClick={onChangeCardsToTable}>
            <DashboardCustomizeIcon sx={{ color: "blue" }} />
          </Button>
        </div>
      )}
    </div>
  );
};

export default SortHeader;
