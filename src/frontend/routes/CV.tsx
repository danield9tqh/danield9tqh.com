import "./CV.css";

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
                <span className="company-name">Iron Fish</span>
                <span className="position-title">— Senior Software Engineer</span>
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
                <span className="company-name">CFA Exam + Independent Study</span>
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