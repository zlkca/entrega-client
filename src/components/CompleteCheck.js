import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

export default function CompleteCheck({checked, onChange}) {
  return (
    <div>
      <Checkbox
        {...label}
        icon={<RadioButtonUncheckedIcon />}
        checkedIcon={<WorkspacePremiumIcon />}
        checked={checked}
        onChange={onChange}
      />
    </div>
  );
}
