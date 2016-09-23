import React, { Component } from 'react';
import LemmaList from './LemmaList';
import './Editor.css';

class Editor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: props.default || '',
    };

    this.textChangeHandler = this.textChangeHandler.bind(this);
  }

  textChangeHandler(evt) {
    const text = evt.target.value;
    this.setState({ text });
  }

  render() {
    return (
      <div className="editor">
        <textarea rows="4"
                  ref="editor"
                  placeholder="Hic aliquid scribe"
                  onChange={this.textChangeHandler}
                  value={this.state.text}/>
        <LemmaList text={this.state.text}/>
      </div>
    );
  }
}

export default Editor;
