import "./table-banner.css";

export default function TableBanner({ heading, children }: any) {
  return (
    <div className="table-banner">
      <h3>{heading}</h3>
      {children}
    </div>
  );
}
