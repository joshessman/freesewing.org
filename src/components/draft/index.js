import React from "react";
import LoginRequired from "../login-required";
import SelectPatternPage from "./select-pattern";
import SelectModelPage from "./select-model";
import DraftPage from "./draft";

const DraftIndex = props => {
  let main = null;
  let chunks = [];
  if (props.slug === "/draft" || props.slug === "/draft/") {
    main = <SelectPatternPage app={props.app} />
  } else {
    chunks = props.slug.split('/');
    if (chunks.length === 3) {
      main = <SelectModelPage app={props.app} pattern={chunks[2]} />
    }
    else if (chunks.length === 5 && chunks[3] === "for") {
      main = <DraftPage app={props.app} model={chunks[4]} pattern={chunks[2]} />
    }
  }

  return (
    <LoginRequired page={props.slug}>
      {main}
    </LoginRequired>
  );
}

export default DraftIndex;