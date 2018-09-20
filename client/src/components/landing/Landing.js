import React from 'react';
import { Link } from 'react-router-dom';
import getImg from '../../common/getImg';
import ReactSVG from 'react-svg';

const Landing = () => {
  return (
    <div className="landing-view">
      <div className="landing-view__scroll">
        <ReactSVG
          src={getImg('phil')}
          className="mx-auto d-flex justify-content-center"
          svgClassName="phil round-img"
        />
        <div className="col-12 col-md-8 col-lg-6 mx-auto">
          <div className="card-panel">
            <h1 className="mt-0">Hello Friends!</h1>
            <p>If you&rsquo;ve found this, then welcome!</p>
            <p>
              My name is Phil Mayfield, and I made this! ThereYouBee is a
              straight forward place tracker built around the Google Maps and
              Google Places APIs. It is designed to be fully responsive, and
              easily usable from a mobile device.
            </p>
            <p>This web app was developed to serve two main purposes.</p>
            <ol>
              <li>
                To further apply my knowledge of React, and Redux. Along with a
                custom back end built on MongoDB all running on an Express Node
                server.
              </li>
              <li>
                My wife and I love to get out, hike around, and see new places.
                We thought it would be neat to keep track of these places as we
                check them out. Undoubtedly there are a million location
                tracking over time apps out there. But I thought it would be a
                fun opportunity to write something that catered to what we
                wanted and would actually use.
              </li>
            </ol>
            <p>
              Go ahead and play with it! You{' '}
              <Link to="/register"> can create a login</Link> (no email or
              anything is required) or just{' '}
              <Link to="/login">use a tester account</Link> with these
              credentials&hellip;
            </p>
            <p className="center-align">
              <strong>Login:</strong> tester
              <strong className="ml-3">Password:</strong> tester
            </p>
            <p>
              Please understand that this is not a commercial product by any
              means, and is not intended to be used as such. Just a personal
              project for me to nerd out on.
            </p>
            <p>
              If you feel like spooling up your own version, feel free to{' '}
              <a
                href="https://github.com/philmayfield/thereyoubee"
                target="_blank"
                rel="noopener noreferrer"
              >
                check out the repo on GitHub
              </a>
              .
            </p>

            <small className="d-block center-align mt-5 mb-3">Built With</small>
            <div className="tech-logos d-flex flex-wrap justify-content-around">
              <a
                href="https://expressjs.com/"
                title="Express"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ReactSVG className="tech-icon" src={getImg('express')} />
              </a>
              <a
                href="https://git-scm.com/"
                title="Git"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ReactSVG className="tech-icon" src={getImg('git')} />
              </a>
              <a
                href="https://www.heroku.com/"
                title="Heroku"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ReactSVG className="tech-icon" src={getImg('heroku')} />
              </a>
              <a
                href="https://www.ecma-international.org/"
                title="JavaScript"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ReactSVG className="tech-icon" src={getImg('js')} />
              </a>
              <a
                href="https://www.mongodb.com/"
                title="mongoDB"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ReactSVG className="tech-icon" src={getImg('mongo')} />
              </a>
              <a
                href="https://nodejs.org/"
                title="Node.js"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ReactSVG className="tech-icon" src={getImg('node')} />
              </a>
              <a
                href="https://reactjs.org/"
                title="React"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ReactSVG className="tech-icon" src={getImg('react')} />
              </a>
              <a
                href="https://redux.js.org/"
                title="Redux"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ReactSVG className="tech-icon" src={getImg('redux')} />
              </a>
              <a
                href="https://sass-lang.com/"
                title="Sass"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ReactSVG className="tech-icon" src={getImg('sass')} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
