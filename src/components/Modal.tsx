import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

type ModalProps = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    header: string;
    content: string;
    handler: () => void;
};

const Modal = (props: ModalProps) => {
    return (
        <React.Fragment>
            <Dialog
                open={props.open}
                onClose={() => props.setOpen(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{props.header}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">{props.content}</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => props.setOpen(false)}>Disagree</Button>
                    <Button
                        onClick={() => {
                            props.handler();
                            props.setOpen(false);
                        }}
                    >
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
};

export default Modal;
