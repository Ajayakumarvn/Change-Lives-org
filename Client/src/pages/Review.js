import * as React from "react";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

const products = [
  {
    name: "Donated",
    desc: "Charity",
    amount: "₹10000",
  },
];

export default function Review() {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Invoice
      </Typography>
      <List disablePadding>
        {products.map((don) => (
          <ListItem key={don.name} sx={{ py: 1, px: 0 }}>
            <ListItemText primary={don.name} secondary={don.desc} />
            <Typography variant="body2">{don.amount}</Typography>
          </ListItem>
        ))}
      </List>
    </React.Fragment>
  );
}
