import React from "react";


class BaseField extends React.Component {
  constructor(props) {
    super(props);
    this.name = props.name;
    this.config = props.config;
    this.errros = props.errros;
    this.onChangeHandler = props.onChangeHandler.bind(this);
    this.formatHandler = this.formatHandler.bind(this);
    this.state = {
      errors: [],
      initialValue: props.initialValue
    }
  }

  formatHandler(event){
    this.onChangeHandler({
      name: event.target.name,
      value: event.target.value
    })
  }

  componentDidUpdate(prevProps) {
    if (prevProps.errors !== this.props.errors) {
      this.setState({
        errors: this.props.errors
      });
    }
    if (prevProps.initialValue !== this.props.initialValue){
      this.setState({
        initialValue: this.props.initialValue
      });
    }
  }
}


export default BaseField;