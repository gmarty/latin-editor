import React from 'react';
import ReactDOM from 'react-dom';
import Editor from './Editor';
import './index.css';

const sample = 'Gallia est omnis divisa in partes tres, quarum unam incolunt ' +
  'Belgae, aliam Aquitani, tertiam qui ipsorum lingua Celtae, nostra Galli ' +
  'appellantur.';

ReactDOM.render(
  <Editor default={sample}/>,
  document.querySelector('section')
);
