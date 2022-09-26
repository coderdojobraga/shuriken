interface IProps {
  visible: boolean;
  children: any;
}

const Visibility = ({ visible, children }: IProps) => (
  <div style={{ display: visible ? "block" : "none" }}>{children}</div>
);

export default Visibility;
