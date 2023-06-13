import React, { useEffect, useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import axios from 'axios';
import '../css/style.css';

function Mockup() {
  const [pageContent, setPageContent] = useState('');

  useEffect(() => {
    axios
      .get('https://your-wordpress-site.com/wp-json/wp/v2/pages')
      .then(response => {
        // Assuming the mockup page has a specific slug, you can filter the response to find it
        const mockup = response.data.find(page => page.slug === 'mockup');

        if (mockup) {
          setPageContent(mockup.content.rendered);
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
              <h2>Mockup of your project</h2>
              <p>By Group D the 31/03/2023 at 00:00</p>
            </header>
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

export default Mockup;
