import { DisplayImageProps } from ".";
import profileStyles from "./DisplayImage.module.css";

export default function DisplayImage({ src, alt }: DisplayImageProps) {
	return (
		<div className={profileStyles.imageMain}>
			<div className={profileStyles.imageInner}>
				<img src={src} alt={alt} loading="lazy" />
			</div>
		</div>
	);
}
