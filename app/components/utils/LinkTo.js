// Created by Zack Sheppard (@zackdotcomputer) on 1/19/2021
// Freely available under MIT License
// Workaround for https://github.com/vercel/next.js/issues/5533
import Link from "next/link";

/// A unified component for the next/link <Link> and a standard <a> anchor.
/// Will lift href and all other props from NextLinkProps up to the Link.
/// Will automatically make an <a> tag containing the children and pass it remaining props.
const LinkTo = ({
  children,
  href,
  as,
  replace,
  scroll,
  shallow,
  prefetch,
  locale,
  ...anchorProps
}) => {
  return (
    // These props are lifted up to the `Link` element. All others are passed to the `<a>`
    <Link {...{ href, as, replace, scroll, shallow, prefetch, locale }}>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <a {...anchorProps}>{children}</a>
    </Link>
  );
};

export default LinkTo;
