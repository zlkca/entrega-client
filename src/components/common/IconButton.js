import { IconButton } from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';

export function PrevIconButton({onClick}){
  return (
      <IconButton
          aria-label="add"
          color="primary"
          onClick={onClick}
    >
      <NavigateBeforeIcon />
    </IconButton>
  )
}

export function NextIconButton({onClick}){
  return (
      <IconButton
          aria-label="add"
          color="primary"
          onClick={onClick}
    >
      <NavigateNextIcon />
    </IconButton>
  )
}

export function AddIconButton({onClick}){
    return (
        <IconButton
            aria-label="add"
            color="primary"
            onClick={onClick}
      >
        <AddIcon />
      </IconButton>
    )
}
export function DeleteIconButton({onClick}){
    return (
        <IconButton
            aria-label="delete"
            color="primary"
            onClick={onClick}
      >
        <DeleteIcon />
      </IconButton>
    )
}

export function EditIconButton({onClick}){
    return (
        <IconButton
            aria-label="edit"
            color="primary"
            onClick={onClick}
      >
        <EditIcon />
      </IconButton>
    )
}