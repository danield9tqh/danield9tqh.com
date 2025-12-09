import "./ZK.css";

export interface ResourceCard {
    title: string;
    description: string;
    link: string;
    category: string;
    timeTags: ("minutes" | "hours" | "days" | "weeks")[];
    keywords?: string[];
}

const RESOURCE_CARDS: ResourceCard[] = [
    {
        title: "Error Correcting Codes",
        description: "A YouTube playlist with interesting videos on entropy, information theory, compression, Hamming codes, Huffman trees, and Reed-Solomon encoding. The playlist is ordered for sequential learning.",
        link: "https://www.youtube.com/playlist?list=PLs30LnaQkMInqLujr2xc_L6KKEDLvmPZ7",
        category: "Error Correcting Codes",
        timeTags: ["minutes", "hours"],
        keywords: ["Entropy", "Information Theory", "Compression", "Hamming Codes", "Huffman Trees", "Reed-Solomon Encoding"]
    },
    {
        title: "Polynomials",
        description: "A YouTube playlist with videos on polynomial roots. Feel free to jump around as the playlist is not strictly ordered.",
        link: "https://www.youtube.com/playlist?list=PLs30LnaQkMIm4yj16QWcIDMKmvwXl2NeG",
        category: "Polynomials",
        timeTags: ["minutes", "hours"],
        keywords: ["Polynomial Roots"]
    },
    {
        title: "Dan Boneh Stanford Cryptography",
        description: "An in-depth Coursera/Stanford course introduction to cryptography. More involved than the other playlists, covering hash functions, PRF (Pseudo-Random Function), and PRP (Pseudo-Random Permutations).",
        link: "https://www.youtube.com/watch?v=1bSjcU2GeG0&list=PL58C6Q25sEEHXvACYxiav_lC2DqSlC7Og",
        category: "Cryptography",
        timeTags: ["hours", "weeks"],
        keywords: ["Hash functions", "PRF", "PRP", "Pseudo-Random Function", "Pseudo-Random Permutations"]
    },
    {
        title: "Cryptography Course Channel",
        description: "Another cryptography course channel with comprehensive content. I've taken a few videos from this but haven't completed the entire course.",
        link: "https://www.youtube.com/channel/UC1usFRN4LCMcfIV7UjHNuQg",
        category: "Cryptography",
        timeTags: ["hours", "weeks"],
        keywords: ["Hash functions", "PRF", "PRP"]
    },
    {
        title: "Socratica Abstract Algebra",
        description: "A good introductory course explaining basic vocabulary in an easy to understand way. Abstract Algebra can be very abstract, so this provides grounding motivation for learning more.",
        link: "https://www.youtube.com/playlist?list=PLi01XoE8jYoi3SgnnGorR_XOW3IcK-TP6",
        category: "Abstract Algebra / Group Theory",
        timeTags: ["minutes", "hours"]
    },
    {
        title: "Galois Fields Videos",
        description: "A collection of videos on Galois Fields and Galois history, covering foundational concepts in abstract algebra and their applications.",
        link: "https://www.youtube.com/watch?v=Ct2fyigNgPY&t=345s&ab_channel=MathVisualized",
        category: "Abstract Algebra / Group Theory",
        timeTags: ["hours"],
        keywords: ["Galois Fields", "Galois History"]
    },
    {
        title: "Euclid's GCD Algorithm",
        description: "An interactive explanation I designed for understanding Euclid's GCD algorithm, a fundamental concept in number theory.",
        link: "https://whimsical.com/euclid-gcd-NrAmXeSaJ36fP2ZNPn89SH",
        category: "Complexity Theory / Number Theory",
        timeTags: ["minutes"],
        keywords: ["GCD", "Euclid", "Number Theory"]
    },
    {
        title: "Linear Combinations of GCD",
        description: "Another interactive explanation I designed for understanding linear combinations using the GCD algorithm.",
        link: "https://whimsical.com/linear-combinations-of-gcd-MNxbknCcM3KErBLxoXZ1WQ",
        category: "Complexity Theory / Number Theory",
        timeTags: ["minutes"],
        keywords: ["GCD", "Linear Combinations", "Number Theory"]
    },
    {
        title: "Interactive Proofs (Part I)",
        description: "A good introduction to interactive proofs. This is one of the more complex sections and may require some previous knowledge since it's very close to ZK proofs themselves.",
        link: "https://www.youtube.com/watch?v=2XrOdfYviwA&ab_channel=SimonsInstitute",
        category: "Interactive Proofs",
        timeTags: ["hours"],
        keywords: ["Interactive Proofs"]
    },
    {
        title: "Foundations of Probabilistic Proofs",
        description: "A course by Alessandro Chiesa, one of the leading researchers on ZK Proofs, teaching at Berkeley. Lays the foundations for interactive proofs and other ZK topics. More in-depth and great for tying other topics together.",
        link: "https://www.youtube.com/watch?v=yWD_1WK3DNU&list=PLGkwtcB-DfpzST-medFVvrKhinZisfluC&ab_channel=AlessandroChiesa",
        category: "Interactive Proofs",
        timeTags: ["hours", "weeks"],
        keywords: ["Interactive Proofs", "Probabilistic Proofs", "ZK Proofs"]
    }
];

function getTimeTagWeight(tag: "minutes" | "hours" | "days" | "weeks"): number {
    const weights = {
        minutes: 1,
        hours: 2,
        days: 3,
        weeks: 4,
    };
    return weights[tag];
}

function getMaxTimeTagWeight(card: ResourceCard): number {
    return Math.max(...card.timeTags.map(getTimeTagWeight));
}

function ResourceCardComponent({ card }: { card: ResourceCard }) {
    return (
        <a
            href={card.link}
            target="_blank"
            rel="noopener noreferrer"
            className="zk-card"
        >
            <div className="zk-card-header">
                <h3 className="zk-card-title">{card.title}</h3>
                <div className="zk-time-tags">
                    {card.timeTags.map((tag, idx) => (
                        <span key={idx} className={`zk-time-tag zk-time-tag-${tag}`}>{tag}</span>
                    ))}
                </div>
            </div>
            <p className="zk-card-description">{card.description}</p>
            {card.keywords && card.keywords.length > 0 && (
                <div className="zk-card-keywords">
                    {card.keywords.map((keyword, idx) => (
                        <span key={idx} className="zk-keyword-tag">{keyword}</span>
                    ))}
                </div>
            )}
        </a>
    );
}

export function ZK() {
    const sortedCards = [...RESOURCE_CARDS].sort((a, b) => {
        return getMaxTimeTagWeight(a) - getMaxTimeTagWeight(b);
    });

    return (
        <div className="zk-container">
            <div className="zk-wrapper">
                <header className="zk-header">
                    <h1 className="zk-title">Zero Knowledge Study Materials</h1>
                    <p className="zk-subtitle">
                        A curated collection of resources for learning the foundations of zero knowledge proofs
                    </p>
                </header>

                <section className="zk-intro-section">
                    <div className="zk-intro-block">
                        <h2 className="zk-intro-title">Motivation</h2>
                        <p>
                            Zero Knowledge Proofs seem to be at the intersection of so many different areas of math and computer science that learning about them straight on seems impossible. In my journey to understanding (which is still limited relatively) I've had to learn countless other smaller concepts to have a chance of grasping the big picture. When I read an explanation that is way over my head and there are too many concepts mentioned that I don't know, it can be demotivating. I'm using this page to compile these smaller concepts as a fallback.
                        </p>
                        <p>
                            If you still want to make progress on the mission of understanding ZK but don't currently have the mental capacity to take it head on, these can be used as tangential quick wins. I've tried to pick topics that are still very interesting all on their own so that you still get the feeling of fully understanding a new concept. I think that is very important for sustaining motivation.
                        </p>
                    </div>

                    <div className="zk-intro-block">
                        <h2 className="zk-intro-title">Format</h2>
                        <p>
                            I've added topic cards below with links and descriptions. Each card includes keywords associated with the subject and a time commitment range. The times range anywhere from <strong>minutes</strong> to <strong>hours</strong> to <strong>days</strong> to <strong>weeks.</strong> If a time range is given, the first one means that's how little time you could spend and the last one is how long it would take to complete it entirely.
                        </p>
                        <p>
                            This list is still very much a work in progress. If you are using this and have suggestions for changes or additions, please email to{" "}
                            <a href="mailto:danield9tqh@gmail.com">danield9tqh@gmail.com</a> — I'd be happy to update it.
                        </p>
                    </div>
                </section>

                <section className="zk-gallery">
                    {sortedCards.map((card, index) => (
                        <ResourceCardComponent key={index} card={card} />
                    ))}
                </section>
            </div>
        </div>
    );
}

