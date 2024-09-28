import Button from "@mui/material/Button";

export default function XButton(props) {
  return (
    <Button {...props} fullWidth>
      {props.children}
    </Button>
  );
}
