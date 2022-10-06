import Layout from 'components/Layout/Layout';
import About from 'pages/About';
import Home from 'pages/Home/Home';
import NotFound from 'pages/NotFound';
import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

class App extends React.Component {
  render() {
    return (
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="404" replace />} />
        </Route>
      </Routes>
    );
  }
}

export default App;
