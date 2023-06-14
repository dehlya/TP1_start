import React, { useEffect, useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import axios from 'axios';
import './css/style.css';
import './css/font.css';
import { Game } from '../game/Game.js';
import { Helmet } from "react-helmet";

/*


    <main>
      <!-- Here is the starting point for the page content -->
      <section id="articles">
        <article>
          <header>
            <h2>Game Page</h2>
            <p>By Group D the 31/03/2023 at 00:00</p>
          </header>
          <div>
            <body>
              <div id="canvas"></div>
              <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js" type="text/javascript"></script>
              <script type="module" src="../../game/script.js"></script>
            </body>
          </div>
        </article>
      </section>
    </main>
*/

function GamePage() {
  const [pageContent, setPageContent] = useState('');

  useEffect(() => {
    axios
      .get('https://dev-mewebdevtest.pantheonsite.io/wp-json/wp/v2/pages/')
      .then(response => {
        // filter the response to find the slug
        const gamePage = response.data.find(page => page.slug === 'game');

        if (gamePage) {
          setPageContent(gamePage.content.rendered);
          console.log(gamePage.content.rendered)
        }
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <Header />
      <main>
        <section id="articles">
          <article>
            {pageContent ? (
              <div dangerouslySetInnerHTML={{ __html: pageContent }} />
            ) : (
              <p>Loading...</p>
            )}
          </article>
        </section>
        <div id="canvas"></div>
        <Helmet>
          <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js" type="text/javascript"></script>
          <script type="module" src="../../game/script.js"></script>
        </Helmet>
      </main>
      <Footer />
    </div>
  );
}

export default GamePage;
