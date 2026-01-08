import React from 'react'

function Footer({length}) {
    const year = new Date();
  return (
    //in-line style
    <footer style={{color : "lime"}}>{length} List {length === 1 ? "item" :
    "items"} available <br />Copyright &copy; {year.getFullYear()} Dilukshan</footer>
    // 2 {} used in style 1 to indicate this s a JS expression other to indicate we pass the style as an
  )
}


export default Footer
