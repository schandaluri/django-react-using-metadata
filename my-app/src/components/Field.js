import React from "react";
import InputField from "./InputField";
import EmailField from "./EmailField";
import CheckBoxField from "./CheckBoxField";
import MultiChoiceField from "./MultiChoiceField";

class Field extends React.Component {
  constructor(props) {
    super(props);
    this.props = props
    this.type = props.config.type
  }


  render() {
    if (this.type === "string"){
      return <InputField {...this.props} />;
    }
    else if (this.type === "email"){
      return <EmailField {...this.props} />
    }
    else if (this.type === "boolean"){
      return <CheckBoxField {...this.props} />
    }
    else if (this.type === "multiple choice"){
      return <MultiChoiceField {...this.props} />
    }
    return null;
  }
}

export default Field;