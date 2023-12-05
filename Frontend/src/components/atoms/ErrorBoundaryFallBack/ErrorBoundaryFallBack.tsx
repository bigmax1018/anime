import Button from "../Button";
import { config } from "config";

export default function ErrorBoundaryFallBack(err: any) {
	return (
		<>
			<div style={{ textAlign: "center", padding: "20px" }}>
				<h2>Something went wrong.</h2>
				<p>
					{err.error.name}: {err.error.message}
				</p>
				<Button
					variant="contained"
					onClick={() => window.location.reload()}
				>
					Retry
				</Button>
				{config.NODE_ENV === "development" && (
					<details
						style={{
							cursor: "pointer",
							textAlign: "initial",
							whiteSpace: "pre-wrap",
						}}
					>
						<div
							style={{
								padding: "20px",
								wordWrap: "break-word",
							}}
						>
							{err.error.stack}
							<br />
							{err.componentStack}
						</div>
					</details>
				)}
			</div>
		</>
	);
}
