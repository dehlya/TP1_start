import React, { useEffect, useState } from 'react';
import Header from './header';
import Footer from './footer';
import axios from 'axios';
import '../style.css';
import '../font.css';

function Description() {
  const [pages, setPages] = useState([]);

  useEffect(() => {
    axios.get('https://dev-mewebdevtest.pantheonsite.io/wp-json/wp/v2/pages/')
      .then(response => {
        setPages(response.data);
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
              <h2 className="custom-heading">Description</h2>
            </header>
            {/* Render the fetched pages */}
            <ul>
              {pages.map(page => (
                <li key={page.id}>{page.title.rendered}</li>
              ))}
            </ul>
          </article>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Description;
