import React from "react";
import Form from "react-bootstrap/Form";
import BaseField from "./BaseField";

class CheckBoxField extends BaseField{

  formatHandler(event){
    debugger
    this.onChangeHandler({
      name: event.target.name,
      value: event.target.checked
    })
  }

  render() {
    return(
       <Form.Group>
        <Form.Check
          type="checkbox"
          name={this.name}
          checked={this.state.initialValue}
          label={this.config.label}
          required={this.config.required}
          readOnly={this.config.read_only}
          // plaintext={this.config.read_only}
          isInvalid={!!this.state.errors.length}
          onChange={this.formatHandler}
        />
        { this.config.help_text ?
          <Form.Text className="text-muted">
          {this.config.help_text}
          </Form.Text>: null
        }
        <Form.Control.Feedback type="invalid">{this.state.errors}</Form.Control.Feedback>
      </Form.Group>
    );
  }
}

export default CheckBoxField;