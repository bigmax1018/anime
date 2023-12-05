import { useEffect, useState } from "react";
import Button from "components/atoms/Button";
import { modalActions } from "redux/slices/modal";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import SubscriptionService from "services/subscription.service";
import Input from "components/atoms/Input/Input";

export default function ConfirmationForm() {
  const dispatch = useAppDispatch();
  const [value, setValue] = useState("");
  const data = useAppSelector((state) => state.modal.data);

  useEffect(() => {
    return () => {
      SubscriptionService.unsubscribe();
    };
  }, []);


  const onClickYes = () => {
    dispatch(modalActions.closeModal());
  };

  return (
    <div>
      <h3>{data.heading}</h3>
      <p>{data.message}</p>
      <Input
        variant="filled"
        name="email"
        label="Email"
        onChange={(e) => setValue(e.target.value)}
      />
      
      <Button variant="contained" onClick={onClickYes}>
        Submit
      </Button>
    </div>
  );
}
