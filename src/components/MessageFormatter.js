import ReactTextFormat from "react-text-format";

export default function MessageFormatter({ children }) {
  const customLinkDecorator = (decoratedHref, decoratedText, key) => {
    return (
      <a href={decoratedHref} key={key} target="_blank" rel="noopener">
        {decoratedText}
      </a>
    );
  };

  const customImageDecorator = (decoratedURL: string): React.Node => {
    return (
      <div>
        <img src={decoratedURL} rel="noopener" width="150" />
      </div>
    );
  };

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
