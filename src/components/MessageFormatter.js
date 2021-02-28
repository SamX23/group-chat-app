import ReactTextFormat from "react-text-format";
import PropTypes from "prop-types";

export default function MessageFormatter({ children }) {
  const customLinkDecorator = (decoratedHref, decoratedText, key) => (
    <a href={decoratedHref} key={key} rel="noopener">
      {decoratedText}
    </a>
  );

  const customImageDecorator = (decoratedURL) => (
    <div>
      <img src={decoratedURL} rel="noopener" width="150" alt={decoratedURL} />
    </div>
  );

  return (
    <ReactTextFormat
      allowedFormats={["URL", "Email", "Image", "Phone"]}
      terms={["Link", "image", "email", "phone"]}
      imageDecorator={customImageDecorator}
      linkDecorator={customLinkDecorator}
    >
      {children}
    </ReactTextFormat>
  );
}

MessageFormatter.propTypes = {
  children: PropTypes.node,
};
