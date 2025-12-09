import "./CV.css";
import { Globe } from "lucide-react";
import { Link } from "@tanstack/react-router";

export function CV() {
  return (
    <div className="cv-container">
      <div className="cv-wrapper">
        <header className="cv-header">
          <h1 className="cv-name">Daniel Cogan</h1>
          <div className="cv-contact">
            <a href="mailto:danield9tqh@gmail.com">danield9tqh@gmail.com</a>
            <a href="https://github.com/danield9tqh" target="_blank" rel="noopener noreferrer">
              Github: @danield9tqh
            </a>
          </div>
        </header>

        <div className="cv-section">
          <h2 className="cv-section-title">Experience</h2>
          <div className="experience-item">
            <div className="experience-header">
              <div>
                <span className="company-name">
                  Raindrop.ai
                  <a
                    href="https://raindrop.ai"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="web-link"
                    aria-label="Visit Raindrop.ai"
                  >
                    <Globe className="web-icon" size={16} />
                  </a>
                </span>
                <span className="position-title">— Early Engineering Contributor (Contract)</span>
              </div>
              <span className="date-range">Sept 2025 - Nov 2025</span>
            </div>
            <div className="experience-description">
              <ul>
                <li>
                  Worked directly with the founders in an evaluation period for a potential early technical
                  leadership role.
                </li>
                <li>
                  Helped ship{" "}
                  <a
                    href="https://www.linkedin.com/posts/alexisgauba_were-excited-to-announce-raindrop-experiments-activity-7382156541791137792-ZU7G/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Experiments
                  </a>
                  <span className="external-link-arrow">↗</span> and{" "}
                  <a
                    href="https://www.raindrop.ai/docs/platform/signals"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Signals
                  </a>
                  <span className="external-link-arrow">↗</span> features across frontend and data pipeline
                  (event ingestion -&gt; clickhouse -&gt; AI labelling)
                </li>
                <li>Streamlined local dev and pre-prod infrastructure</li>
              </ul>
            </div>
          </div>

          <div className="experience-item">
            <div className="experience-header">
              <div>
                <span className="company-name">
                  chad-marketing.com
                  <a
                    href="https://chad-marketing.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="web-link"
                    aria-label="Visit chad-marketing.com"
                  >
                    <Globe className="web-icon" size={16} />
                  </a>
                  <a
                    href="https://github.com/danield9tqh/CHAD"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="github-link"
                    aria-label="GitHub repository"
                  >
                    <svg
                      className="github-icon"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
                    </svg>
                  </a>
                </span>
                <span className="position-title">— Creator / Solo Dev</span>
              </div>
              <span className="date-range">June 2025 - Aug 2025</span>
            </div>
            <div className="experience-description">
              <ul>
                <li>
                  Built an agent-driven system for founders to run authentic "direct-from-founder" Twitter/X
                  accounts
                </li>
                <li>
                  Implemented real-time voice + text LLM chat and ambient agents with tools for posting,
                  retrieval, and context search.
                </li>
                <li>
                  Deployed a production-grade stack with secure AuthN/AuthZ, Dockerized services, automated
                  staging/production environments, and CI/CD pipelines driven from GitHub.
                </li>
              </ul>
            </div>
          </div>

          <div className="experience-item">
            <div className="experience-header">
              <div>
                <span className="company-name">
                  Iron Fish
                  <a
                    href="https://ironfish.network"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="web-link"
                    aria-label="Visit Iron Fish"
                  >
                    <Globe className="web-icon" size={16} />
                  </a>
                </span>
                <span className="position-title">— Protocol Engineer</span>
              </div>
              <span className="date-range">April 2022 - Present</span>
            </div>
            <div className="experience-description">
              <ul>
                <li>
                  Worked on key features of our Layer 1 PoW Privacy chain to launch our mainnet. Some
                  key projects included: optimization peer network gossip to reduce node's network
                  bandwidth &gt; 75%, optimizing node's mempool to be able to handle 100k+ transactions,
                  building and running our ZK trusted setup process
                </li>
                <li>
                  Led project to transition IF to custom memory hard PoW hash function, coordinating
                  between "FishHash" developer, auditors, miners, and mining pools. Successfully led
                  implementation and execution of the first hardfork on mainnet ensuring no downtime or
                  security vulnerabilities
                </li>
                <li>
                  Led team to build a PoC for an EVM layer on Iron Fish with which users could use to
                  shield/unshield funds between Iron Fish's private layer and public EVM layer.
                </li>
              </ul>
            </div>
          </div>

          <div className="experience-item">
            <div className="experience-header">
              <div>
                <span className="company-name">
                  CFA Exam
                  <a
                    href="https://www.cfainstitute.org/programs/cfa-program/exam"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="web-link"
                    aria-label="Visit CFA Program"
                  >
                    <Globe className="web-icon" size={16} />
                  </a>
                  {" + Independent Study"}
                  <Link
                    to="/zk"
                    className="web-link"
                    aria-label="Visit Zero Knowledge Study Materials"
                  >
                    <Globe className="web-icon" size={16} />
                  </Link>
                </span>
              </div>
              <span className="date-range">April 2021 - April 2022</span>
            </div>
            <div className="experience-description">
              <ul>
                <li>
                  Passed CFA Level 1 exam while exploring finance fundamentals during a break from
                  engineering. After satisfying my finance curiosity, I returned to my technical
                  passion, diving into zero knowledge proofs, cryptography, and distributed systems to
                  prepare for blockchain opportunities.
                </li>
              </ul>
            </div>
          </div>

          <div className="experience-item">
            <div className="experience-header">
              <div>
                <span className="company-name">Coinbase, San Francisco CA</span>
                <span className="position-title">— Software Engineer, Identity</span>
              </div>
              <span className="date-range">December 2019 - February 2021</span>
            </div>
            <div className="experience-description">
              <ul>
                <li>
                  Architected and built the foundation for a new system to manage institutional identity
                  and integrate with institutional user roles and permissions
                </li>
                <li>
                  Led backend team of 3 to scale identity verification with external vendors. As of
                  leaving, the new system was processing identity verifications for &gt;2.5 million new
                  users per month
                </li>
                <li>
                  Completed successful database migration for ~15 million users across &gt;50 countries
                  with no issues or downtime. This was a high risk project given a mistake could impact
                  user funds on the platform
                </li>
              </ul>
            </div>
          </div>

          <div className="experience-item">
            <div className="experience-header">
              <div>
                <span className="company-name">Intuit, Mountain View CA</span>
                <span className="position-title">— Software Engineer</span>
              </div>
              <span className="date-range">July 2016 - October 2019</span>
            </div>
            <div className="experience-description">
              <ul>
                <li>
                  Built both REST and Graphql services and React/Redux/Apollo front end for application
                  servicing ~1 million unique users / month
                </li>
                <li>
                  Re-architecting legacy backend payroll systems to handle increased paycheck and tax
                  calculations by parallelizing paycheck calculation engine
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="cv-section">
          <h2 className="cv-section-title">Education</h2>
          <div className="education-item">
            <div className="education-header">
              <div>
                <div className="education-degree">
                  Claremont McKenna College — BA in Computer Science through Harvey Mudd College
                </div>
              </div>
              <span className="date-range">August 2012 - May 2016, Claremont CA</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
