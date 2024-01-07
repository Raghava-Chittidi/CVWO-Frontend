import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import { Box, Typography } from "@mui/material";

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
                <DialogTitle id="alert-dialog-title">
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <WarningAmberIcon color="error" sx={{ mr: 0.5 }} />
                        <Typography sx={{ fontSize: 18, color: "#d32f2f" }}>{props.header}</Typography>
                    </Box>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">{props.content}</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button sx={{ textTransform: "none" }} onClick={() => props.setOpen(false)}>
                        Cancel
                    </Button>
                    <Button
                        variant="text"
                        color="error"
                        sx={{ textTransform: "none" }}
                        onClick={() => {
                            props.handler();
                            props.setOpen(false);
                        }}
                    >
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
};

export default Modal;
