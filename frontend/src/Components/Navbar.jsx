import React from 'react'
import {  useState } from 'react'
import '../css/Navbar.css'
import { Link } from 'react-router-dom'
function Navbar({role}) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleToggle = () => {
        setIsMenuOpen((prev) => !prev);
    };
  return (
    <nav className="navbar">
    <div className="navbar-container">
        <a href="/" className="navbar-logo">PDF Extractor</a>
        
        <button className="navbar-toggle" onClick={handleToggle}>
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
        </button>
        <ul className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
        { role!==""?
         <li><Link to="/" className='navbar-link'>Home</Link></li>: 
         <li></li>
        }

        { role!==""?
            <li><Link to="/tools" className='navbar-link'>tools</Link></li>: <li></li>
        }
            <li><Link to="/AboutPage" className='navbar-link'>About</Link></li>
            <li><Link to="/Real_time" className='navbar-link'>Editor</Link></li>
            {role==="" ? 
            <li><Link to="/login" className='navbar-link'>Login</Link></li> :
            <li><Link to="/logout" className='navbar-link'>Logout</Link></li>
            }
            {role==="" ? 
            <li><Link to="/register" className='navbar-link'>Register</Link></li>:
            <li></li>
            }
            
            
        </ul>
    </div>
</nav>
  )
}



// Agar koye gadbad lage to use kar lenge code yesme condition nhi lage

// import React from 'react'
// import {  useState } from 'react'
// import '../css/Navbar.css'
// import { Link } from 'react-router-dom'
// function Navbar({role}) {
//     const [isMenuOpen, setIsMenuOpen] = useState(false);

//     const handleToggle = () => {
//         setIsMenuOpen((prev) => !prev);
//     };
//   return (
//     <nav className="navbar">
//     <div className="navbar-container">
//         <a href="/" className="navbar-logo">PDF Extractor</a>
        
//         <button className="navbar-toggle" onClick={handleToggle}>
//             <span className="bar"></span>
//             <span className="bar"></span>
//             <span className="bar"></span>
//         </button>
//         <ul className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
        
//          <li><Link to="/" className='navbar-link'>Home</Link></li>
//             <li><Link to="/tools" className='navbar-link'>tools</Link></li>
//             <li><Link to="/AboutPage" className='navbar-link'>About</Link></li>
//             {role==="" ? 
//             <li><Link to="/login" className='navbar-link'>Login</Link></li> :
//             <li><Link to="/logout" className='navbar-link'>Logout</Link></li>
//             }
//             {role==="" ? 
//             <li><Link to="/register" className='navbar-link'>Register</Link></li>:
//             <li></li>
//             }
            
            
//         </ul>
//     </div>
// </nav>
//   )
// }

// export default Navbar



export default Navbar

