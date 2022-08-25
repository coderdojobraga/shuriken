export default function withCustomLayout(WrappedComponent) {
  // eslint-disable-next-line react/display-name
  return (props) => {
    // Use the layout defined at the page level, if available
    const getLayout = WrappedComponent.getLayout ?? ((page) => page);

    return getLayout(<WrappedComponent {...props} />);
  };
}
