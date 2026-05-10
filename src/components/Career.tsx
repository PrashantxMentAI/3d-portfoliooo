import { LuBriefcase } from "react-icons/lu";
import { HiSparkles, HiCodeBracket } from "react-icons/hi2";
import { MdRocketLaunch, MdCloud } from "react-icons/md";
import { FaXmark } from "react-icons/fa6";
import "./styles/Career.css";

const experiences = [
  {
    id: 0,
    title: "TEDx Organizer",
    role: "TEDxCGC Mohali 2026",
    subtitle: "TEDx Event",
    date: "June 2026",
    duration: "Present",
    description: "Leading the planning and execution of TEDx events, managing speaker curation, logistics, and community engagement to spread innovative ideas.",
    icon: <FaXmark />,
    color: "#eb0028" // TED Red
  },
  {
    id: 1,
    title: "Campus Ambassador & Open Source Contributor",
    role: "GSSoC 2026",
    subtitle: "GSSoC 2026",
    date: "Apr 2026",
    duration: "Present",
    description: "Contributing to open-source projects under GirlScript Summer of Code, collaborating with developers and leading campus initiatives.",
    icon: <HiCodeBracket />,
    color: "#22d3ee" // Cyan
  },
  {
    id: 2,
    title: "Google Gemini",
    role: "Student Ambassador",
    subtitle: "GSA 2026",
    date: "Mar 2026",
    duration: "Present",
    description: "Serving as a Student Ambassador, representing Google Gemini on campus and evangelizing generative AI technologies.",
    icon: <HiSparkles />,
    color: "#a855f7" // Purple
  },
  {
    id: 3,
    title: "Google Innovation TechSprint 2025",
    role: "Google Developers Group",
    subtitle: "GDG TechSprint",
    date: "Dec 2025",
    duration: "Feb 2026",
    description: "Participated in the GDG TechSprint, building innovative solutions and solving complex technical challenges.",
    icon: <MdRocketLaunch />,
    color: "#f43f5e" // Rose
  },
  {
    id: 4,
    title: "Google Cloud Study Jams Achiever",
    role: "Google Cloud Skills Boost",
    subtitle: "Tier 3 Achiever",
    date: "Sep 2025",
    duration: "Nov 2025",
    description: "Completed the Tier 3 achievements in Google Cloud Study Jams, demonstrating proficiency in cloud infrastructure and GCP tools.",
    icon: <MdCloud />,
    color: "#3b82f6" // Blue
  }
];

const Career = () => {
  return (
    <section className="career-section section-container" id="experience">
      <div className="career-header">
        <LuBriefcase className="header-icon" />
        <h2 className="header-title">EXPERIENCE</h2>
        <div className="header-line"></div>
      </div>

      <div className="career-container">
        <div className="career-timeline-line"></div>

        <div className="career-items">
          {experiences.map((exp) => (
            <div className="career-item" key={exp.id}>
              <div className="career-date-container">
                <span className="career-month">{exp.date.split(' ')[0]}</span>
                <span className="career-year">{exp.date.split(' ')[1]}</span>
                <span className="career-duration">— {exp.duration}</span>
              </div>

              <div className="career-dot-container">
                <div className="career-dot"></div>
              </div>

              <div className="career-card">
                <div className="card-icon-wrapper" style={{ '--icon-color': exp.color } as any}>
                  <div className="card-icon">{exp.icon}</div>
                </div>

                <div className="card-content">
                  <div className="card-header-info">
                    <h3 className="card-title">{exp.title}</h3>
                    <h4 className="card-role">{exp.role}</h4>
                    <h5 className="card-subtitle">{exp.subtitle}</h5>
                  </div>

                  <p className="card-description">{exp.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Career;
