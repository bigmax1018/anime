import Button from "components/atoms/Button";
import { modalActions } from "redux/slices/modal";
import { useAppDispatch, useAppSelector } from "redux/hooks";

export default function ConfirmationModal() {
	const dispatch = useAppDispatch();
	const data = useAppSelector((state) => state.modal.data);

	return (
		<div>
			{data === "remove" ? (
				<>
					<h3>Remove card</h3>
					<p>Do you really want to remove this card?</p>
				</>
			) : (
				<>
					<h3>Make Default</h3>
					<p>Do you really want to make this card default?</p>
				</>
			)}
			<Button
				variant="outlined"
				onClick={() => dispatch(modalActions.closeModal())}
				sx={{ marginRight: "10px" }}
			>
				No
			</Button>
			<Button
				variant="contained"
				onClick={() => dispatch(modalActions.closeModal())}
			>
				Yes
			</Button>
		</div>
	);
}
