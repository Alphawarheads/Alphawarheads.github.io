import React from 'react';
import ReactDOM from 'react-dom/client';
import './src/index.css';  // 导入全局CSS
import App from './src/App';
import {TransactionsProvider} from "./src/context/TransactionContext";  // 导入App组件

const root = ReactDOM.createRoot(document.getElementById('root'));  // 获取根元素
root.render(
  <React.StrictMode>
    <TransactionsProvider>
    <App />
  </TransactionsProvider>, {/* 渲染App组件 */}
  </React.StrictMode>
);
