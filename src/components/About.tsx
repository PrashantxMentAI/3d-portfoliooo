import "./styles/About.css";

const About = () => {
  return (
    <section className="about-section" id="about">
      <div className="about-container">
        <div className="about-card">
          <div className="card-header">
            <span className="card-dot"></span>
            <span className="card-label">PROFILE</span>
          </div>
          <div className="about-content">
            <h2 className="title"> About me </h2>
            <p className="para">
              Second-year Robotics & AI student (SGPA: 8.73) with hands-on experience in Firebase, GCP, and open-source development. Proficient in Python and focused on building real-world AI solutions, with exposure to cloud infrastructure and robotics frameworks like ROS (Robot Operating System).
            </p>
          </div>
          <div className="card-footer">
            <div className="card-stat">
              <span className="stat-value">8.73</span>
              <span className="stat-label">SGPA</span>
            </div>
            <div className="card-stat">
              <span className="stat-value">2ND</span>
              <span className="stat-label">YEAR</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
