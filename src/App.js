import './App.scss';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Portfolio from './components/Portfolio';
import Dashboard from './components/Dashboard';
import Skills from './components/Skills';
import { Helmet } from 'react-helmet';

function App() {
  return (
    <>
    <Helmet>
      <title>Ivan E. Villanueva | Portfolio</title>
      <meta 
        name='description'
        content='Hire Professional Freelancer &amp; React Developer. Building animations and interactive experiences, hi-end solutions, website maintenance &amp; security'
      />
      <meta 
        name='keywords'
        content='Portfolio, React Developer, Java, Android Studio, Javascript'
      />
    </Helmet>
    <Routes>
      <Route path='/' element={<Layout />} >
        <Route index element={<Home />} />
        <Route path='about' element={<About />} />
        <Route path='portfolio' element={<Portfolio />} />
        <Route path='skills' element={<Skills />} />
        <Route path='contact' element={<Contact />} />
        <Route path='dashboard' element={<Dashboard />} />
      </Route >
    </Routes>
    </>
  )
}

export default App;
