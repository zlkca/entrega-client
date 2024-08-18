import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function AlertDialog({open, title, description, onOk, onCancel}) {
//   const [open, setOpen] = React.useState(false);

//   const handleClickOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     // setOpen(false);
//   };
//   const handleOk = () => {
//     // setOpen(false);
//     onOk();
//   };
  return (
    // <React.Fragment>
    //   <Button variant="outlined" onClick={handleClickOpen}>
    //     Open alert dialog
    //   </Button>
      <Dialog
        open={open}
        onClose={onCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {description}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onCancel}>Cancel</Button>
          <Button onClick={onOk} autoFocus>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    // </React.Fragment>
  );
}
