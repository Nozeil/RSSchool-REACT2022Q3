import Form from 'components/Form/Form';
import Layout from 'components/Layout/Layout';
import About from 'pages/About';
import Home from 'pages/Home/Home';
import NotFound from 'pages/NotFound';
import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="404" element={<NotFound />} />
        <Route path="forms" element={<Form />} />
        <Route path="*" element={<Navigate to="404" replace />} />
      </Route>
    </Routes>
  );
};

export default App;
