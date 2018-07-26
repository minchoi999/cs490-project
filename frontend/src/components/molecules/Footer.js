/*----------------------
    FOOTER COMPONENT:
    shows footer
------------------------*/

import React from 'react';

const Footer = () => {
  return (
    <nav className="footer navbar-dark bg-dark static-bottom text-center">
      <div className="social-icons">
        <a href="https://www.linkedin.com/in/bang-chi-duong-6857969a/" target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin social-icons" aria-hidden="true" /></a>
        <a href="https://github.com/duongch4" target="_blank" rel="noopener noreferrer"><i className="fab fa-github-square social-icons" aria-hidden="true" /></a>
        <a href="mailto:bangchi.duong.20193@outlook.com?Subject=Hello%20there!" target="_top"><i className="fas fa-envelope-square social-icons" aria-hidden="true" /></a>
      </div>
      
      <div className="navbar-text">
        MERN project - Bang Chi Duong © {new Date().getFullYear()}
      </div>
    </nav>
  );
}

export default Footer;
