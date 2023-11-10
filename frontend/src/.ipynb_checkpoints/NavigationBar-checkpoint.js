import React from 'react';
// import './NavigationBar.css'; // You would create a separate CSS file for the navigation bar

function NavigationBar() {
  return (
    <nav className="NavigationBar">
      <ul>
        <li>Home</li>
        <li>Features</li>
        <li>Contact Us</li>
      </ul>
    </nav>
  );
}

export default NavigationBar;