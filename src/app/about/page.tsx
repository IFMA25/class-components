import './about.module.css';

function About() {
  return (
    <>
      <div>
        <h1>About app </h1>
        <h3>
          This is an application for searching information about countries
          around the world.
        </h3>
        <p>Application author: Inna Fedorova</p>
        <p>About the author: Author from Odessa, Ukraine</p>
        <p>Graduated from stage 2 of RSSchool in July 2025</p>
        <p>Currently actively studying on the React course.</p>
      </div>
      <div className="rss-logo">
        <a
          href="https://rs.school/courses/reactjs"
          className="rss-link"
          target="_blank"
          rel="noreferrer"
        >
          <img
            src="https://rs.school/_next/static/media/rss-logo.c19ce1b4.svg"
            alt="RSSchool Logo"
          />
        </a>
        <p>RSSchool React</p>
      </div>
    </>
  );
}

export default About;
