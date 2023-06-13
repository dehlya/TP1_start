import React, { useEffect, useState } from 'react';
import Header from './header';
import Footer from './footer';
import axios from 'axios';
import '../css/style.css';

function Flow() {
  const [pageContent, setPageContent] = useState(null);

  useEffect(() => {
    axios
      .get('https://dev-mewebdevtest.pantheonsite.io/wp-json/wp/v2/pages/')
      .then(response => {
        // Find the page with the title "Flow" from the response
        const flowPage = response.data.find(page => page.title.rendered === 'Flow');

        if (flowPage) {
          setPageContent(flowPage.content.rendered);
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
            <header>
              <h2>Flow and sitemap of your project</h2>
              <p>By Group D the 31/03/2023 at 00:00</p>
            </header>
            <h3>Flow</h3>
            {pageContent && <div dangerouslySetInnerHTML={{ __html: pageContent }} />}
            <h3>Sitemap</h3>
            <img id="sitemap" src="../../../ressources/site/Sitemap.png" alt="Sitemap" />
          </article>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default Flow;
