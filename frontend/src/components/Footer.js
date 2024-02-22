// Footer.js
import React from 'react';
import './Footer.css';
function Footer() {
  return (
    <footer class="footer_section">
    <div class="container">
      <div class="row">
        <div class="col-md-4 footer-col">
          <div class="footer_contact">
            <h4>
              Contact Us
            </h4>
            <div class="contact_link_box">
              <a href="/">
                <i class="fa fa-map-marker" aria-hidden="true"></i>
                <span>
                  Location
                </span>
              </a>
              <a href="/">
                <i class="fa fa-phone" aria-hidden="true"></i>
                <span>
                  Call +01 1234567890
                </span>
              </a>
              <a href="/">
                <i class="fa fa-envelope" aria-hidden="true"></i>
                <span>
                  test@gmail.com
                </span>
              </a>
            </div>
          </div>
        </div>
        <div class="col-md-4 footer-col">
          <div class="footer_detail">
            <a href="/" class="footer-logo">
              Home Chef
            </a>
            <p>
              This is a sample text about the website. This is a sample text about the website. This is a sample text about the website
            </p>
            <div class="footer_social">
              <a href="/">
                <i class="fa fa-facebook" aria-hidden="true"></i>
              </a>
              <a href="/">
                <i class="fa fa-twitter" aria-hidden="true"></i>
              </a>
              <a href="/">
                <i class="fa fa-linkedin" aria-hidden="true"></i>
              </a>
              <a href="/">
                <i class="fa fa-instagram" aria-hidden="true"></i>
              </a>
              <a href="/">
                <i class="fa fa-pinterest" aria-hidden="true"></i>
              </a>
            </div>
          </div>
        </div>
        <div class="col-md-4 footer-col">
          <h4>
            Opening Hours
          </h4>
          <p>
            Everyday
          </p>
          <p>
            10.00 Am -10.00 Pm
          </p>
        </div>
      </div>
    </div>
  </footer>
  );
}

export default Footer;
