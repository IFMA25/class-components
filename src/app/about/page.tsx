import Image from 'next/image';
import styles from './about.module.css';

function About() {
  return (
    <>
      <div className="container">
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
      <div className={styles.rssLogo}>
        <a
          href="https://rs.school/courses/reactjs"
          className={styles.rssLink}
          target="_blank"
          rel="noreferrer"
        >
          <Image
            src="https://rs.school/_next/static/media/rss-logo.c19ce1b4.svg"
            alt="RSSchool Logo"
            width={50}
            height={50}
          />
        </a>
        <p>RSSchool React</p>
      </div>
    </>
  );
}

export default About;
