import React from 'react';
import './App.css'; // Importa el archivo CSS global
import Scene from './Scene';
import Menu from './Menu';
import Footer from './Footer';

const Home = () => {
  return (
    <div className="home">
      <Menu />
      <Scene />
      <Footer />
    </div>
  );
};

export default Home;
