import React, { Component } from 'react';
import LemmaList from './LemmaList';
import './Editor.css';

class Editor extends Component {
  state = {
    value: this.props.value || '',
  };

  textChangeHandler = ({ target: { value } }) => {
    this.setState({ value });
  };

  render() {
    return (
      <div className="editor">
        <textarea rows="4"
                  ref="editor"
                  placeholder="Hic aliquid scribe"
                  onChange={this.textChangeHandler}
                  value={this.state.value}/>
        <LemmaList value={this.state.value}/>
      </div>
    );
  }
}

export default Editor;
