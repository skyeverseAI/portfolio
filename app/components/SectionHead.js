export default function SectionHead({ slug, num }) {
  return (
    <div className="sec-head">
      <span className="sec-slug">{slug}</span>
      <span className="sec-rule" />
      <span className="sec-num">{num}</span>
    </div>
  );
}
