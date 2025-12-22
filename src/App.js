import './App.scss';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Portfolio from './components/Portfolio';
import Skills from './components/Skills';
import { Helmet } from 'react-helmet';

function App() {
  return (
    <>
    <Helmet>
      <title>Ivan E. Villanueva | Fullstack Developer | JavaScript | Freelancer</title>
      <meta
        name='description'
        content='Fullstack software engineer in the Inland Empire, California, building React web apps, animations and interactive experiences.'
      />

      <meta
        property="og:title"
        content="Fullstack Developer | JavaScript | Freelancer"
      />
      <meta
        property="og:description"
        content="Fullstack software engineer in the Inland Empire, California, building React web apps, animations and interactive experiences."
      />
      <meta
        property="og:site_name"
        content="Fullstack Developer | JavaScript | Freelancer"
      />
      <meta name="twitter:card" content="summary" />
      <meta
        name="twitter:description"
        content="Fullstack software engineer in the Inland Empire, California, building React web apps, animations and interactive experiences."
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
      </Route >
    </Routes>
    </>
  )
}

export default App;
