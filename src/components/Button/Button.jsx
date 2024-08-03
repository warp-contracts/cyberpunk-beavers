import './Button.css';

function Button(props) {
  return (
    <div className={`button ${props.color}`} onClick={props.handleClick}>
      {props.children}
    </div>
  );
}

export default Button;
