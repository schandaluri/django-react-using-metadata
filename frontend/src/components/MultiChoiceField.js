import React from "react";
import Form from "react-bootstrap/Form"
import BaseField from './BaseField'

class MultiChoiceField extends BaseField{

  formatHandler(event){
    let selected=[];//will be selected option in select
    let selected_opt=(event.target.selectedOptions);
    for (let i = 0; i < selected_opt.length; i++){
      selected.push(parseInt(selected_opt.item(i).value))
    }
    console.log(selected)
    this.onChangeHandler({
      name: event.target.name,
      value: selected
    })
  }

  render() {
    return (
      <Form.Group>
        <Form.Label>{this.config.label}</Form.Label>
        <Form.Control
          as="select"
          name={this.name}
          multiple
          value={this.state.initialValue}
          required={this.config.required}
          readOnly={this.config.read_only}
          plaintext={this.config.read_only}
          isInvalid={!!this.state.errors.length}
          onChange={this.formatHandler}
        >
        {this.config.choices.map((row) =>
          <option key={row.value} value={row.value}>{row.display_name}</option>
        )}
        </Form.Control>
      <Form.Control.Feedback type="invalid">{this.state.errors}</Form.Control.Feedback>
      </Form.Group>
    );
  }
}

export default MultiChoiceField;
