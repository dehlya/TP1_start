import React, { useEffect, useState } from 'react';
import Header from './header';
import Footer from './footer';
import axios from 'axios';
import '../css/style.css';

function Logbook() {
  const [pageContent, setPageContent] = useState(null);

  useEffect(() => {
    axios
      .get('https://your-wordpress-site.com/wp-json/wp/v2/pages')
      .then(response => {
        // Assuming the logbook page has a specific slug, you can filter the response to find it
        const logbook = response.data.find(page => page.slug === 'logbook');

        if (logbook) {
          setPageContent(logbook.content.rendered);
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

export default Logbook;
