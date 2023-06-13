import React, { useEffect, useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import axios from 'axios';
import './css/style.css';
import './css/font.css';

function Flow() {
  const [pageContent, setPageContent] = useState('');

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
            {pageContent ? (
              <div dangerouslySetInnerHTML={{ __html: pageContent }} />
            ) : (
              <p>Loading...</p>
            )}
          </article>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default Flow;
