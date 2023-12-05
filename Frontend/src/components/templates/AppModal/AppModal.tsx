import { modalMapper } from ".";
import { Suspense } from "react";
import { Box, Modal } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { modalActions } from "redux/slices/modal";
import CircleLoader from "components/atoms/CircleLoader";
import { useAppDispatch, useAppSelector } from "redux/hooks";

function AppModal() {
  const dispatch = useAppDispatch();
  const type = useAppSelector((state) => state.modal.type);
  const open = useAppSelector((state) => state.modal.open);
  const width = useAppSelector((state) => state.modal.width);
  const loading = useAppSelector((state) => state.modal.loading);

  return (
    <Modal
      open={open}
      onClose={(_, reason) => {
        if (reason !== "backdropClick") dispatch(modalActions.closeModal());
      }}
      sx={{
        padding: "16px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        className="app-modal-body"
        sx={{
          p: 4,
          width: "100%",
          boxShadow: 24,
          border: "none",
          maxWidth: width,
          maxHeight: "90vh",
          overflowY: "scroll",
          bgcolor: "#2f2f2f",
        }}
      >
        <div style={{ minHeight: "123px", position: "relative" }}>
          {/* <CloseIcon
            style={{
              position: "absolute",
              top: "-20px",
              right: "-26px",
              cursor: "pointer",
            }}
            onClick={() => dispatch(modalActions.closeModal())}
          /> */}
          {loading && <CircleLoader />}

          <Suspense fallback={<CircleLoader />}>
            {type && modalMapper[type]}
          </Suspense>
        </div>
      </Box>
    </Modal>
  );
}
export default AppModal;
