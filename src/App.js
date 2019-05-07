import React from 'react';
import Card from 'components/card/Card.jsx'
import 'App.css';

// const Card = props => {
//   var {name, job, email, website, linkedin} = props;
//   return (
//     <div className="root">
//       <Card  />
//       <div className="card">
//         <div className="front">
//           <h1 className="title">{name}</h1>
//         </div>
//         <div className="back">
//           <h2 className="name">{name}</h2>
//           <p className="subtitle">{job}</p>
//           <div className="contacts">
//             <p><span className="contact-label">E-mail:</span> <a href={"mailto:" + email}>{email}</a></p>
//             <p><span className="contact-label">Web:</span> <a href={website}>{website}</a></p>
//             <p><span className="contact-label">Linkedin:</span> <a href={"https://www.linkedin.com/in/" + linkedin}>Profile</a></p>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// };

function App() {
  return (<Card name="Filip Andrei Muresan" linkedin="filip-andrei-muresan" email="info@pilif.eu" website="pilif.eu" job="FULL STACK DEVELOPER"/>);
}

export default App;
