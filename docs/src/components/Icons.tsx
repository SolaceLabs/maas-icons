import React from "react";
import * as maasicons from "@solacedev/maas-icons";
import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  IconButton,
  Radio,
  RadioGroup,
  Snackbar,
  SnackbarCloseReason,
  Stack,
  Typography,
} from "@mui/material";

export default function Icons() {
  const allIconsMap = {};
  const [filter, setFilter] = React.useState("all");
  const [showCopied, setShowCopied] = React.useState(false);

  const allIcons = Object.keys(maasicons)
    .sort((a, b) => a.localeCompare(b))
    .map((importName) => {
      const name = importName;

      const icon = {
        importName,
        name,
        Component: maasicons[importName],
      };
      if (importName !== "default") {
        allIconsMap[importName] = icon;
      }
      return icon;
    });

  console.log(allIconsMap);

  const getIcons = () => {
    let filteredIcons = allIcons;
    if (filter !== "all") {
      filteredIcons = allIcons.filter((icon) => {
        return icon.name.includes(filter);
      });
    }

    return filteredIcons.map((icon) => {
      if (icon.name !== "default")
        return (
          <Grid item xs={2} textAlign={"center"} key={icon.importName}>
            <IconButton
              onClick={() => {
                navigator.clipboard
                  .writeText(`import { ${icon.importName} } from "@SolaceDev/maas-icons";
`);
                setShowCopied(true);
              }}
            >
              <icon.Component sx={{ fontSize: "45px" }} />
            </IconButton>
            <Typography>{icon.name}</Typography>
          </Grid>
        );
    });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilter((event.target as HTMLInputElement).value);
  };

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setShowCopied(false);
  };

  return (
    <Stack alignItems={"center"} spacing={2}>
      <Snackbar
        open={showCopied}
        autoHideDuration={6000}
        message="Import statement copied!!"
        onClose={handleClose}
      />
      <Typography>Click to copy the import statement</Typography>
      <Box display={"flex"} justifyContent={"space-between"} minWidth={"100%"}>
        <FormControl sx={{ mr: 4 }}>
          <FormLabel>Filter By Size</FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            name="radio-buttons-group"
            value={filter}
            onChange={handleChange}
          >
            <FormControlLabel value="all" control={<Radio />} label="All" />
            <FormControlLabel value="16" control={<Radio />} label="16px" />
            <FormControlLabel value="24" control={<Radio />} label="24px" />
            <FormControlLabel value="32" control={<Radio />} label="32px" />
            <FormControlLabel value="40" control={<Radio />} label="40px" />
          </RadioGroup>
        </FormControl>
        <Grid container spacing={2}>
          {getIcons()}
        </Grid>
      </Box>
    </Stack>
  );
}
