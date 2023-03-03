// import logo from './logo.svg';
import './App.css';

import React, {useState} from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './components/layout';
import NoPage from './components/404';
import Genres from './components/genres';
import AddGenres from './components/add-genres';
import Movie from './components/movie';
import Movies from './components/movies';
import AddMovie from './components/add-movie';
import Register from './components/register';
import Login from './components/login';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Genres />} />
          <Route path="add-genres" element={<AddGenres />} />
          <Route path="catalog/:id" element={<Movies />} />
          <Route path="catalog/movies/:id" element={<Movie />} />
          <Route path="add-movie" element={<AddMovie />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
