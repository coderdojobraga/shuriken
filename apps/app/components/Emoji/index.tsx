import React, {
  CSSProperties,
  ClassAttributes,
  PropsWithChildren,
} from "react";

interface Props {
  style?: CSSProperties;
  className?: any;
  label: string;
}

const Emoji = ({
  label,
  style,
  className,
  children,
}: PropsWithChildren<Props>) => (
  <span role="img" aria-label={label} className={className} style={style}>
    {children}
  </span>
);

export default Emoji;
