import { renderMarkdown } from "../content";

export default function Markdown({ content }) {
  return (
    <div
      className="md-content"
      dangerouslySetInnerHTML={{ __html: renderMarkdown(content) }}
    />
  );
}