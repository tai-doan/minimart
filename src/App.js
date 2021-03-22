import React, { Suspense } from 'react';
import { Routers } from './routes/index';
import './App.css';

const App = () => {
  return (
    <div className="trinhatslution-app">
      <Suspense fallback={''}>
        <Routers />
      </Suspense>
    </div>
  );
};

export default App;
