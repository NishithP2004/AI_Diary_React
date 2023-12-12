import "./Container.css";

function Container(props) {
  return <div className="container glass">{props.children}</div>;
}

export default Container;
