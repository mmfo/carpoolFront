{/* <MuiAutocomplete
id="country-select-demo"
sx={{ width: 300 }}
options={{
  types: ["address"],
  componentRestrictions: { country: "il" },
}}
autoHighlight */}
// getOptionLabel={(option) => option.label}
// renderOption={(props, option) => (
// <Box
//     component="li"
//     sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
//     {...props}
// >
//     <img
//         loading="lazy"
//         width="20"
//         src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
//         srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
//         alt=""
//     />
//     {option.label} ({option.code}) +{option.phone}
// </Box>
// )}

// renderInput={(params) => (
//   <TextField
//     {...params}
//     label="Choose a Location"
//     inputProps={{
//       ...params.inputProps,
//       autoComplete: "new-password", // disable autocomplete and autofill
//     }}
//   />
// )}
// />