import Form from 'react-bootstrap/Form';
import React from "react";
import BaseField from './BaseField'

class EmailField extends BaseField{

  render() {
    return(
      <Form.Group>
        <Form.Label>{this.config.label}</Form.Label>
        <Form.Control
          type="email"
          name={this.name}
          value={this.state.initialValue}
          max_length={this.config.max_length}
          required={this.config.required}
          readOnly={this.config.read_only}
          plaintext={this.config.read_only}
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
    )
  }
}


export default EmailField;