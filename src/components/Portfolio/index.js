import React, { useEffect, useState } from "react"
import Loader from "react-loaders"
import AnimatedLetters from "../AnimatedLetters"
import "./index.scss"
import windowLogo from "../../assets/images/LogoExcelWindow.png"
import { getDocs, collection } from "firebase/firestore"
import { db } from "../../firebase"
import { Link } from "react-router-dom"
import { Helmet } from "react-helmet"

const Portfolio = () => {
  const [letterClass, setLetterClass] = useState("text-animate")
  const [portfolio, setPortfolio] = useState([])

  // Animate letters on page load
  useEffect(() => {
    const timer = setTimeout(() => {
      setLetterClass("text-animate-hover")
    }, 3000)

    return () => {
      clearTimeout(timer)
    }
  }, [])

  // Fetch portfolio data from Firebase
  useEffect(() => {
    const getPortfolio = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "portfolio"))
        setPortfolio(querySnapshot.docs.map((doc) => doc.data()))
      } catch (error) {
        console.error("Error fetching portfolio data: ", error)
      }
    }
    getPortfolio()
  }, [])

  const handleViewButtonClick = (url) => {
    window.open(url, "_blank")
  }

  const renderPortfolio = () => (
    <div className="images-container">
      <Helmet>
        <title>Portfolio | Ivan E. Villanueva</title>
        <meta name="description" content="Bilingual Software Engineer" />
        <meta
          name="keywords"
          content="Software Engineer, Bilingual, English, Spanish"
        />
      </Helmet>
      {portfolio.map((port, idx) => (
        <div className="image-box" key={idx}>
          <img
            src={port.image}
            className="portfolio-image"
            alt={port.name || "portfolio"}
            loading="lazy" // Lazy loading for better performance
            onError={(e) => (e.target.src = "/path/to/fallback-image.png")} // Fallback image in case of error
          />
          <div className="content">
            <p className="title">{port.name}</p>
            <h4 className="description">{port.description}</h4>
            <button
              className="btn"
              onClick={() => handleViewButtonClick(port.url)}
            >
              View
            </button>
          </div>
        </div>
      ))}
      <Link to="/dashboard">
        <img
          className="loginDashboard"
          src={windowLogo}
          alt="Excel SolutionsV"
        />
      </Link>
    </div>
  )

  return (
    <>
      <div className="container portfolio-page">
        <h1 className="page-title">
          <AnimatedLetters
            letterClass={letterClass}
            strArray={"Portfolio".split("")}
            idx={15}
          />
        </h1>
        <div>{renderPortfolio()}</div>
      </div>
      <Loader type="pacman" />
    </>
  )
}

export default Portfolio
