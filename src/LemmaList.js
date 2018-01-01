import React, { Component } from 'react';
import lemmatise from './lib/lemmatise';
import './LemmaList.css';

class LemmaList extends Component {
  displayLemmas(text = '') {
    if (!text) {
      return null;
    }

    const lemmas = lemmatise(text)
      .filter((lemma) => lemma[0].length);

    if (!lemmas.length) {
      return null;
    }

    return lemmas.map((lemma, id) => {
      let displayedLemma = lemma[1];
      let className = 'default';
      if (displayedLemma) {
        displayedLemma = displayedLemma.join(', ');
      } else {
        displayedLemma = 'verbum ignotum';
        className = 'unknown';
      }

      return (
        <li key={`${id}-${lemma[0]}`}>
          <span className="lemmatised-word">{`${lemma[0]}: `}</span>
          <span className={className}>{displayedLemma}</span>
        </li>
      );
    });
  }

  render() {
    if (!this.props.value) {
      return null;
    }

    const lemmaNodes = this.displayLemmas(this.props.value);

    if (!lemmaNodes) {
      return null;
    }

    return (
      <div className="lemma-list">
        <h2>Verba</h2>
        <div className="scrollable">
          <ul>{lemmaNodes}</ul>
        </div>
      </div>
    );
  }
}

export default LemmaList;
