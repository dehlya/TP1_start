import React, { useEffect, useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import axios from 'axios';
import './css/style.css';
import './css/font.css';

function Description() {
  const [pageContent, setPageContent] = useState('');

  useEffect(() => {
    axios
      .get('https://dev-mewebdevtest.pantheonsite.io/wp-json/wp/v2/pages/')
      .then(response => {
        // filter the response to find the slug
        const descriptionPage = response.data.find(page => page.title.rendered === 'Description');

        if (descriptionPage) {
          setPageContent(descriptionPage.content.rendered);
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
            {/* Render the fetched content */}
            <div dangerouslySetInnerHTML={{ __html: pageContent }}></div>
          </article>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default Description;
