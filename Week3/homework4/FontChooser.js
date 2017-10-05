class FontChooser extends React.Component {

  constructor(props) {
    super(props);
    var defMin = function(){
      if (this.props.min > 0) {
        return Number(this.props.min);
      } else {
        return 1;
      }
    }.bind(this);

    var defMax = function(){
      if (this.props.min > this.props.max) {
        return Number(this.props.min);
      } else {
        return Number(this.props.max)
      }
    }.bind(this);

    var defSize = function(){
      var min = defMin();
      var max = defMax();
      if (this.props.size < min) {
        return min;
      } else if (this.props.size > max){
        return max;
      } else {
        return Number(this.props.size);
      }
    }.bind(this);

    this.state = {
      bold : this.props.bold === true ? true : false ,
      hidden : true,
      color : 'black',
      min : defMin(),
      max : defMax(),
      size : defSize(),
    };
  };
  toggleHidden() {
    this.setState( {hidden : !this.state.hidden} );
  };
  toggleBold() {
    this.setState( {bold : !this.state.bold} );
  };
  increaseSize() {
    if (this.state.size < this.props.max) {
      this.setState( {size : this.state.size + 1});
      this.changeColor();
    };
  };
  decreaseSize() {
    if (this.state.size > this.props.min) {
      this.setState( {size : this.state.size - 1});
      this.changeColor();
    };
  };
  changeColor() {
    if ((this.state.size == this.state.min + 1) || (this.state.size == this.state.max -1)) {
      this.setState( {color: 'red'});
    } else {
      this.setState( {color: 'black'});
    };
  };
  resetSize() {
    this.setState( {size: Number(this.props.size), color: 'black'})
  }

  render() {
    var weight = this.state.bold ? 'bold' : 'normal' ;
    var size = String(this.state.size) + 'px';
    var color = this.state.color;
    return(
      <div>
      <input type="checkbox" id="boldCheckbox" hidden={this.state.hidden}
        onChange={this.toggleBold.bind(this)}/>
      <button id="decreaseButton" hidden={this.state.hidden}
        onClick={this.decreaseSize.bind(this)}>-</button>
      <span id="fontSizeSpan" hidden={this.state.hidden}>{this.state.size}</span>
      <button id="increaseButton" hidden={this.state.hidden}
        onClick={this.increaseSize.bind(this)}>+</button>
      <span id="textSpan" style={{fontWeight:weight, fontSize:size, color:color}}
        onClick={this.toggleHidden.bind(this)}
        onDoubleClick={this.resetSize.bind(this)}
        >{this.props.text}</span>
      </div>
    );
  }
}
