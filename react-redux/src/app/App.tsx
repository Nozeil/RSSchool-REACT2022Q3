import useAppContext from './AppContext';
import Form from 'components/Form/Form';
import Layout from 'components/Layout/Layout';
import CardPage from 'components/CardPage/CardPage';
import About from 'pages/About';
import Home from 'pages/Home/Home';
import NotFound from 'pages/NotFound';
import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

const App = () => {
  const { appState } = useAppContext();
  const cardPagePath = `cardPage/${appState.cardPageData.id || '*'}`;
  const cardPageElement = appState.cardPageData.id ? <CardPage /> : <Navigate to="/" replace />;

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="404" element={<NotFound />} />
        <Route path="forms" element={<Form />} />
        <Route path={cardPagePath} element={cardPageElement} />
        <Route path="*" element={<Navigate to="404" replace />} />
      </Route>
    </Routes>
  );
};

export default App;
