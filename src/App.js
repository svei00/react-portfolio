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
      <title>Ivan E. Villanueva | Fullstack Developer | JavaScript | Freelancer</title>
      <meta 
        name='description'
        content='Hire Professional Freelancer  &amp; Software Engineer &amp; San Bernardino &amp; Riverside &amp; Inland Empire &amp; Rialto &amp; Fontana &amp; Ontario   &amp; Software Engineer &amp; San Bernardino &amp; Riverside &amp; Inland Empire &amp; Rialto &amp; Fontana &amp; Ontario  &amp; React Developer. Building animations and interactive experiences, hi-end solutions, website maintenance &amp; security, webpack'
      />
    
      <meta
        property="og:title"
        content="Fullstack Developer | JavaScript | Freelancer"
      />
      <meta
        property="og:description"
        content="Hire Professional Freelancer  &amp; Software Engineer &amp; San Bernardino &amp; Riverside &amp; Inland Empire &amp; Rialto &amp; Fontana &amp; Ontario   &amp; Software Engineer &amp; San Bernardino &amp; Riverside &amp; Inland Empire &amp; Rialto &amp; Fontana &amp; Ontario  &amp; React Developer. Building animations and interactive experiences, hi-end solutions, website maintenance &amp; security, webpack"
      />
      <meta
        property="og:site_name"
        content="Fullstack Developer | JavaScript | Freelancer"
      />
      <meta name="twitter:card" content="summary" />
      <meta
        name="twitter:description"
        content="Hire Professional Freelancer  &amp; Software Engineer &amp; San Bernardino &amp; Riverside &amp; Inland Empire &amp; Rialto &amp; Fontana &amp; Ontario   &amp; Software Engineer &amp; San Bernardino &amp; Riverside &amp; Inland Empire &amp; Rialto &amp; Fontana &amp; Ontario  &amp; React Developer. Building animations and interactive experiences, hi-end solutions, website maintenance &amp; security, webpack"
      />
      <meta
        name="twitter:title"
        content="Fullstack Developer | JavaScript | Freelancer"
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
