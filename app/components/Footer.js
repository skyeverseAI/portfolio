import site from "../../data/site.json";

export default function Footer() {
  const { footer } = site;

  return (
    <div className="sec-dark">
      <div className="wrap foot">
        <span>{footer.left}</span>
        <span>{footer.middle}</span>
        <span>{footer.right}</span>
      </div>
    </div>
  );
}
