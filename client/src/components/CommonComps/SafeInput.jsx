import DOMPurify from "dompurify";

export default function SafeInput({ onChange, value, ...props }) {
  const handleChange = (e) => {
    const rawValue = e.target.value;

    // XSS 방지 + 특수문자 필터
    const clean = DOMPurify.sanitize(rawValue, {
      ALLOWED_TAGS: [],
      ALLOWED_ATTR: [],
    }).replace(/[<>="'`]/g, "");

    onChange({ target: { value: clean } });
  };

  return <input value={value} onChange={handleChange} {...props} />;
}