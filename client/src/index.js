import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Routes } from './routes/Route';
import 'antd/dist/antd.css';
import './index.css';

ReactDOM.render(
  <>
    <Routes />
  </>,
  document.getElementById('root')
);