import React, { useCallback, ReactNode } from 'react';

import Button from '@material-ui/core/Button';
import MaterialDialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

interface IButtons {
  onClick: () => void;
  text: string;
  color?: 'default' | 'inherit' | 'primary' | 'secondary' | undefined;
}

interface IDialog {
  children?: ReactNode;
  open: boolean;
  onClose: () => void;
  buttons?: IButtons[];
  title?: string;
}

const Dialog: React.FC<IDialog> = ({
  children,
  open,
  onClose,
  buttons,
  title,
}: IDialog) => {
  return (
    <MaterialDialog open={open} onClose={onClose}>
      {title && <DialogTitle id="dialog-title">{title}</DialogTitle>}

      {children && <DialogContent>{children}</DialogContent>}

      {buttons && buttons.length && (
        <DialogActions>
          {buttons.map(button => (
            <Button
              key={button.text}
              onClick={button.onClick}
              color={button.color}
            >
              {button.text}
            </Button>
          ))}
        </DialogActions>
      )}
    </MaterialDialog>
  );
};

export default Dialog;
