interface HighlightTextProps {
	text: string;
	highlight: string;
}

export default function HighlightText({
	text,
	highlight,
}: HighlightTextProps) {
	let highlights = highlight
		.replaceAll("(", "")
		.replaceAll(")", "")
		.replaceAll("{", "")
		.replaceAll("}", "")
		.replaceAll("[", "")
		.replaceAll("]", "");

	const words = text.split(new RegExp(`(${highlights})`, "gi"));

	return (
		<span>
			{words.map((word, index) => (
				<span key={index}>
					{word.toLowerCase() === highlight.toLowerCase() ? (
						<b>{word}</b>
					) : (
						word
					)}
				</span>
			))}
		</span>
	);
}
