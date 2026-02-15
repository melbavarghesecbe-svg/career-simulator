let selectedInterests = [];
let skill = "";

const defaultProfile = {
	name: "",
	age: "",
	education: "",
	experience: "explorer",
	skills: [],
	hobbies: [],
	interests: [],
	rawSkills: "",
	rawHobbies: "",
	rawInterests: "",
	personalityPulse: "",
};

let userProfile = { ...defaultProfile };
let lastResumeText = "";
let badgeSet = [];

const hobbyChallenges = {
	gaming: [
		"Draft a game-inspired onboarding flow for your favorite app.",
		"Sketch a quest system that motivates people to learn a new skill.",
		"Stream a 10-minute demo explaining how a game mechanic solves a real problem.",
	],
	reading: [
		"Summarize a book chapter into a five-slide insight deck.",
		"Map three quotes from your latest read to career experiments.",
		"Host a 15-minute micro-club to discuss a theme tied to your interests.",
	],
	art: [
		"Create a mood board for the product or industry you selected.",
		"Redesign a complex dashboard to feel calmer and more human.",
		"Run a quick user test with friends and capture three insights.",
	],
	public: [
		"Record a 90-second pitch explaining your impact vision.",
		"Moderate a short roundtable with peers about future careers.",
		"Write an agenda for a community event that supports your track.",
	],
	building: [
		"Ship a one-day prototype aligned with your top career card.",
		"Document a build log with blockers, learnings, and next steps.",
		"Automate a repetitive task using a no-code or scripting tool.",
	],
	wellness: [
		"Design a weekly routine that balances deep work and recovery.",
		"Interview someone about how they recharge after intense projects.",
		"Prototype a wellness check-in workflow for your future team.",
	],
	volunteering: [
		"Match a local community challenge with your strongest skill.",
		"Write a short proposal for a nonprofit collaboration.",
		"Host a micro-mentoring session for someone two steps behind you.",
	],
	default: [
		"Create a one-page project brief aligned to your spotlight career.",
		"Reach out to a professional for a 15-minute coffee chat.",
		"Share a progress update online to attract collaborators.",
	],
};

const mentorshipTips = [
	{ title: "Define Your Ask", tip: "Write one specific question before contacting a mentor so the conversation stays focused." },
	{ title: "Share Your Wins", tip: "Send a short note every month summarising progress; mentors engage when they see momentum." },
	{ title: "Trade Value", tip: "Offer to document meetings or share research nuggets to keep the relationship reciprocal." },
	{ title: "Stack Micro-Mentors", tip: "Build a small council of specialists instead of relying on one person for everything." },
	{ title: "Reflect Quickly", tip: "After each chat, jot down the next action and ship it within 48 hours to keep trust high." },
];

const skillResourceMap = {
	"system design": "roadmapFullStack",
	"cloud architecture": "cloudTrail",
	"api strategy": "roadmapFullStack",
	"team leadership": "leadershipPlaybook",
	"ml ops": "cloudTrail",
	observability: "cloudTrail",
	"cloud automation": "cloudTrail",
	storytelling: "communicationMastery",
	"community building": "communicationMastery",
	"statistical modeling": "dataPlaybook",
	"data storytelling": "dataPlaybook",
	python: "dataPlaybook",
	"experiment design": "dataPlaybook",
	"user research": "uxResearch",
	"interaction design": "designSystem",
	"rapid prototyping": "designSystem",
	"product strategy": "productGuide",
	"threat modeling": "cyberDefense",
	"incident response": "cyberDefense",
	"security automation": "cyberLab",
	reporting: "communicationMastery",
	"product discovery": "productGuide",
	roadmapping: "productGuide",
	"stakeholder alignment": "communicationMastery",
	"literature review": "edtechLab",
	"technical writing": "communicationMastery",
	"control systems": "roboticsStarter",
	simulation: "roboticsSim",
	"health workflows": "healthUX",
	"data ethics": "healthTech",
	"climate analytics": "climateAnalytics",
	"systems thinking": "climateAnalytics",
	"partnership building": "communicationMastery",
	"financial modeling": "fintechInsights",
	"risk analysis": "fintechRisk",
	compliance: "fintechRisk",
	"learning science": "edtechLab",
	"content strategy": "edtechLab",
	"ux research": "uxResearch",
	"technical mentorship": "leadershipPlaybook",
};

const resourceCatalog = {
	roadmapFullStack: {
		title: "Full-Stack Engineering Roadmap",
		url: "https://roadmap.sh/full-stack",
		note: "Step-by-step blueprint from fundamentals to frameworks.",
	},
	dataPlaybook: {
		title: "Kaggle Data Science Playbook",
		url: "https://www.kaggle.com/learn/overview",
		note: "Hands-on notebooks, competitions, and peer review.",
	},
	designSystem: {
		title: "Design Systems Essentials",
		url: "https://www.figma.com/community/file/832147599581077970",
		note: "Ready-to-use components for rapid prototyping.",
	},
	cyberLab: {
		title: "TryHackMe Interactive Labs",
		url: "https://tryhackme.com/paths",
		note: "Practical security scenarios for defenders and breakers.",
	},
	productGuide: {
		title: "Product Discovery Guide",
		url: "https://svpg.com/articles/",
		note: "Battle-tested product frameworks from SVPG.",
	},
	cloudTrail: {
		title: "AWS Skill Builder",
		url: "https://explore.skillbuilder.aws/learn",
		note: "Hands-on cloud labs built by AWS instructors.",
	},
	healthTech: {
		title: "Digital Health Innovation Hub",
		url: "https://www.healthit.gov/topic/scientific-initiatives/innovation",
		note: "Federal programmes shaping the future of health tech.",
	},
	roboticsStarter: {
		title: "Modern Robotics Specialisation",
		url: "https://www.coursera.org/specializations/modernrobotics",
		note: "Math, control, and motion planning for robotics pros.",
	},
	fintechInsights: {
		title: "FinTech Insider Briefings",
		url: "https://11fs.com/insights",
		note: "Weekly breakdowns of financial innovation trends.",
	},
	edtechLab: {
		title: "Learning Experience Design Toolkit",
		url: "https://lxldesign.co/resources/",
		note: "Frameworks for crafting engaging education journeys.",
	},
	aiProduct: {
		title: "AI Product Manager Nanodegree",
		url: "https://www.udacity.com/course/ai-product-manager-nanodegree--nd088",
		note: "Build responsible AI products with measurable outcomes.",
	},
	uxResearch: {
		title: "UX Research Field Guide",
		url: "https://www.nngroup.com/articles/ux-research-cheat-sheet/",
		note: "Quick reference for planning high-impact studies.",
	},
	cyberDefense: {
		title: "Threat Intelligence Foundations",
		url: "https://www.cybrary.it/course/threat-intelligence/",
		note: "Hands-on labs for defenders and incident responders.",
	},
	healthUX: {
		title: "Designing Healthcare Experiences",
		url: "https://designlab.com/resources/articles/designing-for-healthcare-ux/",
		note: "Principles for humane, compliant healthcare products.",
	},
	roboticsSim: {
		title: "Robotics: Aerial Mobility",
		url: "https://www.coursera.org/learn/robotics-flight",
		note: "Simulation-first approach to control and autonomy.",
	},
	fintechRisk: {
		title: "FinTech Risk Transformation",
		url: "https://cfte.education/fintech-risk-transformation-specialisation/",
		note: "Navigate regulation, compliance, and risk analytics.",
	},
	climateAnalytics: {
		title: "Climate Analytics with Machine Learning",
		url: "https://www.edx.org/course/solving-the-climate-crisis-with-machine-learning",
		note: "Use data science to accelerate sustainability outcomes.",
	},
	communicationMastery: {
		title: "Duarte Communication Academy",
		url: "https://www.duarte.com/academy/",
		note: "Craft persuasive narratives that move stakeholders.",
	},
	leadershipPlaybook: {
		title: "Re:Work Leadership Guides",
		url: "https://rework.withgoogle.com/guides/",
		note: "Manager playbooks grounded in evidence-based research.",
	},
};

const videoCatalog = {
	careerOverview: { id: "pQDJkcewsQw", title: "Designing Your Career", url: "https://www.youtube.com/watch?v=pQDJkcewsQw" },
	softwareSystems: { id: "lBzniU8I6Y8", title: "Designing Scalable Systems", url: "https://www.youtube.com/watch?v=lBzniU8I6Y8" },
	dataJourney: { id: "ua-CiDNNj30", title: "Data Science in 5 Minutes", url: "https://www.youtube.com/watch?v=ua-CiDNNj30" },
	designCraft: { id: "TlBiLzCPSjA", title: "Design Workflow in Figma", url: "https://www.youtube.com/watch?v=TlBiLzCPSjA" },
	cyberPath: { id: "V3fpxkY2Q_w", title: "Intro to Ethical Hacking", url: "https://www.youtube.com/watch?v=V3fpxkY2Q_w" },
	productLeadership: { id: "wyw2K9Z7qH4", title: "Product Thinking Masterclass", url: "https://www.youtube.com/watch?v=wyw2K9Z7qH4" },
	cloudOps: { id: "bpTF1--DdsI", title: "DevOps Roadmap", url: "https://www.youtube.com/watch?v=bpTF1--DdsI" },
	healthImpact: { id: "u9pP_2M-s1w", title: "Digital Health Innovation", url: "https://www.youtube.com/watch?v=u9pP_2M-s1w" },
	roboticsFuture: { id: "QCJ1PnZkDWk", title: "Future of Robotics", url: "https://www.youtube.com/watch?v=QCJ1PnZkDWk" },
	fintechWave: { id: "tMBJ6FSz_Xk", title: "FinTech Trends", url: "https://www.youtube.com/watch?v=tMBJ6FSz_Xk" },
};

const motivationalQuotes = [
	{ text: "Your potential is defined by the questions you dare to explore.", author: "Priya Parker" },
	{ text: "Success is liking yourself, liking what you do, and liking how you do it.", author: "Maya Angelou" },
	{ text: "The future depends on what you do today.", author: "Mahatma Gandhi" },
	{ text: "Courage starts with showing up and letting ourselves be seen.", author: "Brene Brown" },
	{ text: "Discipline is the bridge between goals and accomplishment.", author: "Jim Rohn" },
	{ text: "Innovation is seeing what everybody has seen and thinking what nobody has thought.", author: "Dr. Albert Szent-Gyorgyi" },
];

const careerLibrary = {
	software: {
		industry: "Software Platforms",
		requiredSkills: ["System Design", "Cloud Architecture", "API Strategy", "Team Leadership"],
		courses: ["roadmapFullStack", "cloudTrail", "leadershipPlaybook"],
		video: "softwareSystems",
		primary: {
			label: "Spotlight Match",
			title: "Software Architect",
			subtitle: "Shape reliable platforms end to end",
			description: "Architect high-impact systems, mentor engineers, and keep services resilient.",
			salary: "USD 110K-170K",
			skills: ["System Design", "API Strategy", "Technical Mentorship"],
			icon: "&#128187;",
			applyUrl: "https://www.linkedin.com/jobs/search/?keywords=Software%20Architect",
			learnUrl: "https://roadmap.sh/full-stack",
			industry: "Software Platforms",
		},
		trending: {
			label: "Trending Role",
			title: "AI Platform Engineer",
			subtitle: "Operationalise machine learning at scale",
			description: "Own deployment pipelines, observability, and rapid iteration loops for ML products.",
			salary: "USD 125K-185K",
			skills: ["ML Ops", "Observability", "Cloud Automation"],
			icon: "&#9889;",
			applyUrl: "https://www.linkedin.com/jobs/search/?keywords=AI%20Platform%20Engineer",
			learnUrl: "https://www.deeplearning.ai/ai-engineering/",
			industry: "Machine Intelligence",
		},
		hiddenGem: {
			label: "Hidden Gem",
			title: "Developer Advocate",
			subtitle: "Translate complex tools into community success",
			description: "Blend storytelling with engineering to inspire builders and gather product feedback.",
			salary: "USD 90K-135K",
			skills: ["Storytelling", "API Strategy", "Community Building"],
			icon: "&#128227;",
			applyUrl: "https://www.linkedin.com/jobs/search/?keywords=Developer%20Advocate",
			learnUrl: "https://www.purelyfunctional.tv/courses/developer-advocate/",
			industry: "Developer Relations",
		},
	},
	data: {
		industry: "Analytics & AI",
		requiredSkills: ["Statistical Modeling", "Data Storytelling", "Python", "Experiment Design"],
		courses: ["dataPlaybook", "aiProduct", "communicationMastery"],
		video: "dataJourney",
		primary: {
			label: "Spotlight Match",
			title: "Data Scientist",
			subtitle: "Turn messy data into confident direction",
			description: "Design experiments, build models, and partner with teams to deliver insight at speed.",
			salary: "USD 105K-165K",
			skills: ["Python", "Experiment Design", "Data Storytelling"],
			icon: "&#128200;",
			applyUrl: "https://www.linkedin.com/jobs/search/?keywords=Data%20Scientist",
			learnUrl: "https://www.kaggle.com/learn/overview",
			industry: "Analytics & AI",
		},
		trending: {
			label: "Trending Role",
			title: "Analytics Engineer",
			subtitle: "Ship reliable data products for decision-makers",
			description: "Model warehouse layers, manage dbt pipelines, and deliver trustworthy dashboards.",
			salary: "USD 95K-150K",
			skills: ["SQL Modeling", "Data Storytelling", "Automation"],
			icon: "&#128202;",
			applyUrl: "https://www.linkedin.com/jobs/search/?keywords=Analytics%20Engineer",
			learnUrl: "https://www.getdbt.com/learn/",
			industry: "Analytics & AI",
		},
		hiddenGem: {
			label: "Hidden Gem",
			title: "Responsible AI Researcher",
			subtitle: "Align intelligent systems with human values",
			description: "Audit models, build fairness toolkits, and guide ethical deployment playbooks.",
			salary: "USD 100K-155K",
			skills: ["Data Ethics", "Experiment Design", "Stakeholder Alignment"],
			icon: "&#128187;",
			applyUrl: "https://www.linkedin.com/jobs/search/?keywords=Responsible%20AI",
			learnUrl: "https://www.coursera.org/specializations/ai-ethics",
			industry: "Responsible AI",
		},
	},
	design: {
		industry: "Product Experience",
		requiredSkills: ["User Research", "Interaction Design", "Rapid Prototyping", "Product Strategy"],
		courses: ["designSystem", "uxResearch", "communicationMastery"],
		video: "designCraft",
		primary: {
			label: "Spotlight Match",
			title: "Product Designer",
			subtitle: "Craft intuitive journeys that delight",
			description: "Run discovery, prototype fast, and deliver cohesive product stories end to end.",
			salary: "USD 95K-150K",
			skills: ["User Research", "Rapid Prototyping", "Product Strategy"],
			icon: "&#127912;",
			applyUrl: "https://www.linkedin.com/jobs/search/?keywords=Product%20Designer",
			learnUrl: "https://www.figma.com/community",
			industry: "Product Experience",
		},
		trending: {
			label: "Trending Role",
			title: "Design Operations Lead",
			subtitle: "Scale design systems across teams",
			description: "Build tooling, rituals, and metrics that keep design and engineering in sync.",
			salary: "USD 100K-155K",
			skills: ["Design Systems", "Automation", "Stakeholder Alignment"],
			icon: "&#128736;",
			applyUrl: "https://www.linkedin.com/jobs/search/?keywords=Design%20Operations",
			learnUrl: "https://www.designbetter.co/designops-handbook",
			industry: "Product Experience",
		},
		hiddenGem: {
			label: "Hidden Gem",
			title: "Service Designer",
			subtitle: "Orchestrate end-to-end experiences across channels",
			description: "Map complex ecosystems, connect teams, and build services people trust.",
			salary: "USD 85K-135K",
			skills: ["Journey Mapping", "Systems Thinking", "Facilitation"],
			icon: "&#128206;",
			applyUrl: "https://www.linkedin.com/jobs/search/?keywords=Service%20Designer",
			learnUrl: "https://www.interaction-design.org/courses/service-design",
			industry: "Experience Strategy",
		},
	},
	cyber: {
		industry: "Security & Trust",
		requiredSkills: ["Threat Modeling", "Incident Response", "Security Automation", "Reporting"],
		courses: ["cyberLab", "cyberDefense", "communicationMastery"],
		video: "cyberPath",
		primary: {
			label: "Spotlight Match",
			title: "Security Analyst",
			subtitle: "Defend systems by thinking like an attacker",
			description: "Hunt threats, triage incidents, and brief stakeholders with clarity and calm.",
			salary: "USD 95K-145K",
			skills: ["Threat Modeling", "Incident Response", "Reporting"],
			icon: "&#128274;",
			applyUrl: "https://www.linkedin.com/jobs/search/?keywords=Security%20Analyst",
			learnUrl: "https://tryhackme.com/paths",
			industry: "Security & Trust",
		},
		trending: {
			label: "Trending Role",
			title: "Security Automation Engineer",
			subtitle: "Automate response playbooks to stay ahead",
			description: "Codify detection logic, orchestrate tools, and shorten dwell time dramatically.",
			salary: "USD 110K-165K",
			skills: ["Security Automation", "Scripting", "DevSecOps"],
			icon: "&#9881;",
			applyUrl: "https://www.linkedin.com/jobs/search/?keywords=Security%20Automation",
			learnUrl: "https://www.pluralsight.com/paths/security-automation",
			industry: "Security Engineering",
		},
		hiddenGem: {
			label: "Hidden Gem",
			title: "Privacy Engineer",
			subtitle: "Embed trust and compliance into products",
			description: "Partner with product teams to design respectful, compliant data experiences.",
			salary: "USD 105K-160K",
			skills: ["Data Ethics", "Risk Analysis", "Stakeholder Alignment"],
			icon: "&#128274;",
			applyUrl: "https://www.linkedin.com/jobs/search/?keywords=Privacy%20Engineer",
			learnUrl: "https://www.dataprivacymanager.net/privacy-engineering-guide/",
			industry: "Privacy & Compliance",
		},
	},
	product: {
		industry: "Product Leadership",
		requiredSkills: ["Product Discovery", "Roadmapping", "Stakeholder Alignment", "Data Storytelling"],
		courses: ["productGuide", "aiProduct", "leadershipPlaybook"],
		video: "productLeadership",
		primary: {
			label: "Spotlight Match",
			title: "Product Manager",
			subtitle: "Rally teams around a compelling vision",
			description: "Define strategy, align partners, and launch lovable products that move metrics.",
			salary: "USD 110K-170K",
			skills: ["Product Discovery", "Roadmapping", "Stakeholder Alignment"],
			icon: "&#128736;",
			applyUrl: "https://www.linkedin.com/jobs/search/?keywords=Product%20Manager",
			learnUrl: "https://svpg.com/articles/",
			industry: "Product Leadership",
		},
		trending: {
			label: "Trending Role",
			title: "AI Product Strategist",
			subtitle: "Translate model capability into customer value",
			description: "Balance responsible AI practices with bold bets that ship measurable outcomes.",
			salary: "USD 120K-185K",
			skills: ["AI Strategy", "Experiment Design", "Stakeholder Alignment"],
			icon: "&#129302;",
			applyUrl: "https://www.linkedin.com/jobs/search/?keywords=AI%20Product%20Manager",
			learnUrl: "https://www.udacity.com/course/ai-product-manager-nanodegree--nd088",
			industry: "AI Products",
		},
		hiddenGem: {
			label: "Hidden Gem",
			title: "Product Ops Lead",
			subtitle: "Scale rituals that keep teams learning fast",
			description: "Instrument product reviews, streamline feedback loops, and enable rapid discovery.",
			salary: "USD 95K-145K",
			skills: ["Operations", "Analytics", "Change Management"],
			icon: "&#128295;",
			applyUrl: "https://www.linkedin.com/jobs/search/?keywords=Product%20Operations",
			learnUrl: "https://productledalliance.com/what-is-product-operations/",
			industry: "Product Leadership",
		},
	},
	research: {
		industry: "Innovation & Academia",
		requiredSkills: ["Literature Review", "Experiment Design", "Data Analysis", "Technical Writing"],
		courses: ["dataPlaybook", "edtechLab", "communicationMastery"],
		video: "careerOverview",
		primary: {
			label: "Spotlight Match",
			title: "Research Scientist",
			subtitle: "Discover insights at the frontier",
			description: "Frame hypotheses, run experiments, and publish findings that influence strategy.",
			salary: "USD 90K-140K",
			skills: ["Experiment Design", "Data Analysis", "Technical Writing"],
			icon: "&#128218;",
			applyUrl: "https://www.linkedin.com/jobs/search/?keywords=Research%20Scientist",
			learnUrl: "https://www.coursera.org/specializations/statistics-with-python",
			industry: "Innovation & Academia",
		},
		trending: {
			label: "Trending Role",
			title: "Research Program Manager",
			subtitle: "Orchestrate studies across diverse teams",
			description: "Coordinate recruiting, ops, and reporting so researchers can stay in the zone.",
			salary: "USD 95K-145K",
			skills: ["Program Management", "Stakeholder Alignment", "Measurement"],
			icon: "&#128221;",
			applyUrl: "https://www.linkedin.com/jobs/search/?keywords=Research%20Program%20Manager",
			learnUrl: "https://www.atlassian.com/team-playbook/plays",
			industry: "Innovation & Academia",
		},
		hiddenGem: {
			label: "Hidden Gem",
			title: "Insight Communicator",
			subtitle: "Turn research into adoption-ready stories",
			description: "Build clarity decks, facilitate readouts, and coach teams through implementation.",
			salary: "USD 80K-125K",
			skills: ["Storytelling", "Workshop Design", "Change Management"],
			icon: "&#128172;",
			applyUrl: "https://www.linkedin.com/jobs/search/?keywords=Insight%20Manager",
			learnUrl: "https://www.duarte.com/academy/",
			industry: "Insights Enablement",
		},
	},
	cloud: {
		industry: "Cloud & Infrastructure",
		requiredSkills: ["Cloud Architecture", "Observability", "Automation", "Incident Response"],
		courses: ["cloudTrail", "roadmapFullStack", "leadershipPlaybook"],
		video: "cloudOps",
		primary: {
			label: "Spotlight Match",
			title: "Cloud Solutions Architect",
			subtitle: "Design resilient, observable cloud experiences",
			description: "Plan architectures, guide implementation, and keep systems performant.",
			salary: "USD 115K-180K",
			skills: ["Cloud Architecture", "Observability", "Automation"],
			icon: "&#9729;",
			applyUrl: "https://www.linkedin.com/jobs/search/?keywords=Cloud%20Solutions%20Architect",
			learnUrl: "https://explore.skillbuilder.aws/learn",
			industry: "Cloud & Infrastructure",
		},
		trending: {
			label: "Trending Role",
			title: "Site Reliability Engineer",
			subtitle: "Balance velocity with reliability across services",
			description: "Automate operations, enhance telemetry, and drive blameless postmortems.",
			salary: "USD 120K-185K",
			skills: ["Observability", "Incident Response", "Automation"],
			icon: "&#9881;",
			applyUrl: "https://www.linkedin.com/jobs/search/?keywords=Site%20Reliability%20Engineer",
			learnUrl: "https://sre.google/workbook/",
			industry: "Cloud & Infrastructure",
		},
		hiddenGem: {
			label: "Hidden Gem",
			title: "FinOps Analyst",
			subtitle: "Optimise spend without slowing experimentation",
			description: "Model usage patterns, negotiate commitments, and champion sustainable cloud use.",
			salary: "USD 90K-135K",
			skills: ["Cost Modelling", "Automation", "Stakeholder Alignment"],
			icon: "&#128181;",
			applyUrl: "https://www.linkedin.com/jobs/search/?keywords=FinOps",
			learnUrl: "https://learn.finops.org/",
			industry: "Cloud Economics",
		},
	},
	robotics: {
		industry: "Robotics & Hardware",
		requiredSkills: ["Robotics Fundamentals", "Control Systems", "Simulation", "Python"],
		courses: ["roboticsStarter", "roboticsSim", "cloudTrail"],
		video: "roboticsFuture",
		primary: {
			label: "Spotlight Match",
			title: "Robotics Engineer",
			subtitle: "Bring machines to life with precise control loops",
			description: "Prototype hardware, tune control systems, and integrate sensors for autonomy.",
			salary: "USD 105K-170K",
			skills: ["Control Systems", "Simulation", "Python"],
			icon: "&#129302;",
			applyUrl: "https://www.linkedin.com/jobs/search/?keywords=Robotics%20Engineer",
			learnUrl: "https://www.coursera.org/specializations/modernrobotics",
			industry: "Robotics & Hardware",
		},
		trending: {
			label: "Trending Role",
			title: "Autonomy Test Engineer",
			subtitle: "Validate self-driving systems safely",
			description: "Design test harnesses, monitor telemetry, and accelerate iteration cycles.",
			salary: "USD 100K-155K",
			skills: ["Simulation", "Data Analysis", "Scenario Design"],
			icon: "&#128640;",
			applyUrl: "https://www.linkedin.com/jobs/search/?keywords=Autonomy%20Engineer",
			learnUrl: "https://selfdrivingcars.mit.edu/",
			industry: "Autonomy & Mobility",
		},
		hiddenGem: {
			label: "Hidden Gem",
			title: "Robotics Product Evangelist",
			subtitle: "Help developers succeed with robotics platforms",
			description: "Create demos, content, and communities that accelerate adoption.",
			salary: "USD 85K-135K",
			skills: ["Storytelling", "Prototyping", "Community Building"],
			icon: "&#128227;",
			applyUrl: "https://www.linkedin.com/jobs/search/?keywords=Robotics%20Advocate",
			learnUrl: "https://www.udacity.com/course/robotics-software-engineer--nd209",
			industry: "Developer Relations",
		},
	},
	health: {
		industry: "Digital Health",
		requiredSkills: ["Health Workflows", "Data Ethics", "UX Research", "Stakeholder Communication"],
		courses: ["healthTech", "healthUX", "productGuide"],
		video: "healthImpact",
		primary: {
			label: "Spotlight Match",
			title: "Digital Health Analyst",
			subtitle: "Connect patient empathy with smart healthcare tools",
			description: "Bridge clinicians, data, and design to unlock better health outcomes.",
			salary: "USD 90K-145K",
			skills: ["Health Workflows", "Data Ethics", "Stakeholder Communication"],
			icon: "&#127973;",
			applyUrl: "https://www.linkedin.com/jobs/search/?keywords=Digital%20Health%20Analyst",
			learnUrl: "https://designlab.com/resources/articles/designing-for-healthcare-ux/",
			industry: "Digital Health",
		},
		trending: {
			label: "Trending Role",
			title: "Clinical Product Specialist",
			subtitle: "Translate clinical insights into product decisions",
			description: "Support go-lives, gather feedback, and align roadmaps to clinical impact.",
			salary: "USD 95K-150K",
			skills: ["Stakeholder Alignment", "Training", "Process Design"],
			icon: "&#128138;",
			applyUrl: "https://www.linkedin.com/jobs/search/?keywords=Clinical%20Product%20Specialist",
			learnUrl: "https://www.coursera.org/learn/medical-technology",
			industry: "Digital Health",
		},
		hiddenGem: {
			label: "Hidden Gem",
			title: "Health UX Researcher",
			subtitle: "Design humane experiences across care journeys",
			description: "Run longitudinal studies, map journeys, and advocate for accessibility.",
			salary: "USD 95K-145K",
			skills: ["UX Research", "Accessibility", "Data Ethics"],
			icon: "&#128104;",
			applyUrl: "https://www.linkedin.com/jobs/search/?keywords=Healthcare%20UX",
			learnUrl: "https://designlab.com/resources/articles/designing-for-healthcare-ux/",
			industry: "Experience Design",
		},
	},
	climate: {
		industry: "Climate & Sustainability",
		requiredSkills: ["Climate Analytics", "Systems Thinking", "Partnership Building", "Data Storytelling"],
		courses: ["climateAnalytics", "dataPlaybook", "productGuide"],
		video: "careerOverview",
		primary: {
			label: "Spotlight Match",
			title: "Climate Tech Analyst",
			subtitle: "Blend innovation with impact to protect the planet",
			description: "Model emissions, scope opportunities, and align stakeholders on climate action.",
			salary: "USD 90K-145K",
			skills: ["Climate Analytics", "Systems Thinking", "Data Storytelling"],
			icon: "&#127758;",
			applyUrl: "https://www.linkedin.com/jobs/search/?keywords=Climate%20Analyst",
			learnUrl: "https://www.edx.org/course/solving-the-climate-crisis-with-machine-learning",
			industry: "Climate & Sustainability",
		},
		trending: {
			label: "Trending Role",
			title: "Carbon Product Manager",
			subtitle: "Scale solutions that cut emissions at speed",
			description: "Coordinate partners, measure impact, and launch data-informed interventions.",
			salary: "USD 105K-165K",
			skills: ["Product Strategy", "Partnership Building", "Climate Analytics"],
			icon: "&#9889;",
			applyUrl: "https://www.linkedin.com/jobs/search/?keywords=Carbon%20Product%20Manager",
			learnUrl: "https://www.terradu.com/courses",
			industry: "Climate & Sustainability",
		},
		hiddenGem: {
			label: "Hidden Gem",
			title: "Impact Partnership Strategist",
			subtitle: "Mobilise communities and capital for climate action",
			description: "Broker partnerships, design pilots, and measure community-level outcomes.",
			salary: "USD 85K-135K",
			skills: ["Partnership Building", "Storytelling", "Grant Design"],
			icon: "&#127793;",
			applyUrl: "https://www.linkedin.com/jobs/search/?keywords=Impact%20Partnership",
			learnUrl: "https://climatebase.org/",
			industry: "Impact Partnerships",
		},
	},
	fintech: {
		industry: "Financial Innovation",
		requiredSkills: ["Financial Modeling", "Risk Analysis", "Product Discovery", "Compliance"],
		courses: ["fintechInsights", "fintechRisk", "productGuide"],
		video: "fintechWave",
		primary: {
			label: "Spotlight Match",
			title: "FinTech Product Analyst",
			subtitle: "Translate complex finance into bold digital products",
			description: "Blend customer research with financial rigor to craft inclusive financial tools.",
			salary: "USD 105K-160K",
			skills: ["Financial Modeling", "Risk Analysis", "Product Discovery"],
			icon: "&#128179;",
			applyUrl: "https://www.linkedin.com/jobs/search/?keywords=FinTech%20Product%20Analyst",
			learnUrl: "https://11fs.com/insights",
			industry: "Financial Innovation",
		},
		trending: {
			label: "Trending Role",
			title: "Blockchain Strategist",
			subtitle: "Build trusted digital asset experiences",
			description: "Design token models, navigate regulation, and launch responsible products.",
			salary: "USD 110K-175K",
			skills: ["Compliance", "Product Strategy", "Risk Analysis"],
			icon: "&#128273;",
			applyUrl: "https://www.linkedin.com/jobs/search/?keywords=Blockchain%20Product%20Manager",
			learnUrl: "https://www.edx.org/professional-certificate/uc-berkeley-blockchain-fundamentals",
			industry: "Digital Assets",
		},
		hiddenGem: {
			label: "Hidden Gem",
			title: "FinOps Coach",
			subtitle: "Help startups scale responsible financial systems",
			description: "Stand up risk dashboards, design controls, and mentor early teams.",
			salary: "USD 95K-140K",
			skills: ["Risk Analysis", "Compliance", "Stakeholder Alignment"],
			icon: "&#128181;",
			applyUrl: "https://www.linkedin.com/jobs/search/?keywords=FinOps%20Consultant",
			learnUrl: "https://www.cfte.education/blog/fintech-risk/",
			industry: "Financial Operations",
		},
	},
	edtech: {
		industry: "Education Technology",
		requiredSkills: ["Learning Science", "Content Strategy", "UX Research", "Community Building"],
		courses: ["edtechLab", "designSystem", "communicationMastery"],
		video: "careerOverview",
		primary: {
			label: "Spotlight Match",
			title: "Learning Experience Designer",
			subtitle: "Choreograph learning adventures that stick",
			description: "Apply learning science, craft narratives, and launch data-informed experiences.",
			salary: "USD 85K-135K",
			skills: ["Learning Science", "Content Strategy", "UX Research"],
			icon: "&#127891;",
			applyUrl: "https://www.linkedin.com/jobs/search/?keywords=Learning%20Experience%20Designer",
			learnUrl: "https://lxldesign.co/resources/",
			industry: "Education Technology",
		},
		trending: {
			label: "Trending Role",
			title: "Community Learning Lead",
			subtitle: "Grow vibrant learning communities around products",
			description: "Design cohorts, facilitate events, and measure learner momentum.",
			salary: "USD 80K-125K",
			skills: ["Community Building", "Content Strategy", "Facilitation"],
			icon: "&#128101;",
			applyUrl: "https://www.linkedin.com/jobs/search/?keywords=Learning%20Community%20Manager",
			learnUrl: "https://orbit.love/blog/community-builders-toolkit",
			industry: "Learning Communities",
		},
		hiddenGem: {
			label: "Hidden Gem",
			title: "Educational Product Ops",
			subtitle: "Keep course launches on time and learner-centric",
			description: "Standardise playbooks, coordinate instructors, and track learning outcomes.",
			salary: "USD 75K-115K",
			skills: ["Operations", "Measurement", "Stakeholder Alignment"],
			icon: "&#128197;",
			applyUrl: "https://www.linkedin.com/jobs/search/?keywords=Education%20Program%20Manager",
			learnUrl: "https://productledalliance.com/product-ops-handbook/",
			industry: "Education Operations",
		},
	},
};

const careerRules = [
	{
		track: "software",
		matches: ({ interests, skill }) => interests.includes("software") && skill === "logic",
		best: "Software Architect",
		alt: "Platform Engineer",
		blurb: "You love building resilient systems that scale effortlessly.",
		video: "softwareSystems",
	},
	{
		track: "data",
		matches: ({ interests, skill }) => interests.includes("data") && ["math", "analysis"].includes(skill),
		best: "Data Scientist",
		alt: "Machine Learning Engineer",
		blurb: "You turn patterns into actionable insights for the people around you.",
		video: "dataJourney",
	},
	{
		track: "design",
		matches: ({ interests, skill }) => interests.includes("design") && ["creative", "storytelling"].includes(skill),
		best: "Product Designer",
		alt: "Design Strategist",
		blurb: "You craft intuitive journeys that delight every persona.",
		video: "designCraft",
	},
	{
		track: "cyber",
		matches: ({ interests, skill }) => interests.includes("cyber") && ["logic", "analysis"].includes(skill),
		best: "Security Analyst",
		alt: "Threat Intelligence Lead",
		blurb: "You safeguard systems by thinking like an attacker.",
		video: "cyberPath",
	},
	{
		track: "product",
		matches: ({ interests, skill, personality }) =>
			interests.includes("product") && ["leadership", "communication", "storytelling"].includes(skill) && personality !== "introvert",
		best: "Product Manager",
		alt: "Innovation Strategist",
		blurb: "You rally teams around a compelling product vision.",
		video: "productLeadership",
	},
	{
		track: "cloud",
		matches: ({ interests, skill }) => interests.includes("cloud") && ["analysis", "logic"].includes(skill),
		best: "Cloud Solutions Architect",
		alt: "Site Reliability Engineer",
		blurb: "You engineer reliable, observable cloud experiences.",
		video: "cloudOps",
	},
	{
		track: "health",
		matches: ({ interests, skill, hobby }) => interests.includes("health") && ["empathy", "communication"].includes(skill) && hobby === "reading",
		best: "Digital Health Analyst",
		alt: "Clinical Product Specialist",
		blurb: "You connect patient empathy with smart healthcare tools.",
		video: "healthImpact",
	},
	{
		track: "robotics",
		matches: ({ interests, skill }) => interests.includes("robotics") && ["math", "logic", "analysis"].includes(skill),
		best: "Robotics Engineer",
		alt: "Autonomous Systems Developer",
		blurb: "You bring machines to life with precise control loops.",
		video: "roboticsFuture",
	},
	{
		track: "fintech",
		matches: ({ interests, skill, personality }) => interests.includes("fintech") && ["math", "analysis"].includes(skill) && personality === "ambivert",
		best: "FinTech Product Analyst",
		alt: "Blockchain Strategist",
		blurb: "You translate complex finance into bold digital products.",
		video: "fintechWave",
	},
	{
		track: "edtech",
		matches: ({ interests, skill }) => interests.includes("edtech") && ["empathy", "storytelling"].includes(skill),
		best: "Learning Experience Designer",
		alt: "Instructional Technologist",
		blurb: "You choreograph learning adventures that stick.",
		video: "careerOverview",
	},
	{
		track: "climate",
		matches: ({ interests, skill }) => interests.includes("climate") && ["analysis", "creative"].includes(skill),
		best: "Climate Tech Analyst",
		alt: "Sustainability Solutions Designer",
		blurb: "You blend innovation with impact to protect the planet.",
		video: "careerOverview",
	},
	{
		track: "research",
		matches: ({ interests, skill }) => interests.includes("research") && ["analysis", "math", "communication"].includes(skill),
		best: "Research Scientist",
		alt: "Insight Communicator",
		blurb: "You frame brave questions and surface the stories behind the data.",
		video: "careerOverview",
	},
];

const defaultCareer = {
	track: "software",
	best: "Full-Stack Innovator",
	alt: "Tech Consultant",
	blurb: "You flex across disciplines to ship end-to-end experiences.",
	video: "careerOverview",
};

function parseList(value) {
	if (!value) {
		return [];
	}
	return value
		.split(/[\n,]/)
		.map(item => item.trim())
		.filter(item => item.length > 0);
}

function dedupeList(values) {
	const seen = new Set();
	return values
		.map(item => (item || "").trim())
		.filter(item => {
			if (!item) {
				return false;
			}
			const key = item.toLowerCase();
			if (seen.has(key)) {
				return false;
			}
			seen.add(key);
			return true;
		});
}

function applySelectionsToCheckboxes(boxes, selections, customField, rawText) {
	const nodes = Array.from(boxes);
	const lookup = new Map();
	nodes.forEach(node => {
		node.checked = false;
		lookup.set(node.value.toLowerCase(), node);
	});

	const extras = [];
	(selections || []).forEach(item => {
		const key = (item || "").toLowerCase();
		const target = lookup.get(key);
		if (target) {
			target.checked = true;
		} else if (item) {
			extras.push(item);
		}
	});

	if (customField) {
		if (typeof rawText === "string" && rawText.trim().length > 0) {
			customField.value = rawText;
		} else if (extras.length) {
			customField.value = extras.join(", ");
		} else {
			customField.value = "";
		}
	}
}

function normalizeSkill(value) {
	return (value || "").trim().toLowerCase();
}

function capitalize(value) {
	if (!value) {
		return "";
	}
	return value.charAt(0).toUpperCase() + value.slice(1);
}

function formatTrackName(trackKey) {
	const mapping = {
		software: "Software Engineering",
		data: "Data & AI",
		design: "Design & Product",
		cyber: "Cybersecurity",
		product: "Product Leadership",
		research: "Research & Insight",
		cloud: "Cloud & DevOps",
		robotics: "Robotics & Hardware",
		health: "Healthcare Tech",
		climate: "Climate & Sustainability",
		fintech: "FinTech & Blockchain",
		edtech: "EdTech & Learning",
	};
	return mapping[trackKey] || capitalize(trackKey);
}

function escapeHtml(value) {
	return (value || "")
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&#39;");
}

function resolveResource(id) {
	return resourceCatalog[id] || null;
}

function collectProfile() {
	const nameField = document.getElementById("profileName");
	if (!nameField) {
		return true;
	}

	const ageField = document.getElementById("profileAge");
	const educationField = document.getElementById("profileEducation");
	const experienceField = document.getElementById("profileExperience");
	const skillsField = document.getElementById("profileSkills");
	const hobbiesField = document.getElementById("profileHobbies");
	const interestsField = document.getElementById("profileInterests");

	const name = nameField.value.trim();
	const ageValue = ageField ? ageField.value.trim() : "";
	const education = educationField ? educationField.value.trim() : "";
	const experience = experienceField ? experienceField.value : "explorer";

	if (!name || !education || !ageValue) {
		alert("Please complete your name, age, and education details.");
		return false;
	}

	const ageNumber = Number(ageValue);
	if (!Number.isFinite(ageNumber) || ageNumber < 13) {
		alert("Enter an age of 13 or above to continue.");
		return false;
	}

	const selectedSkillNodes = Array.from(document.querySelectorAll('[data-profile-skill]:checked'));
	const selectedHobbyNodes = Array.from(document.querySelectorAll('[data-profile-hobby]:checked'));
	const selectedInterestNodes = Array.from(document.querySelectorAll('[data-profile-interest]:checked'));

	const customSkillsRaw = skillsField ? skillsField.value.trim() : "";
	const customHobbiesRaw = hobbiesField ? hobbiesField.value.trim() : "";
	const customInterestsRaw = interestsField ? interestsField.value.trim() : "";

	const skills = dedupeList([
		...selectedSkillNodes.map(node => node.value),
		...parseList(customSkillsRaw),
	]);
	const hobbies = dedupeList([
		...selectedHobbyNodes.map(node => node.value),
		...parseList(customHobbiesRaw),
	]);
	const interests = dedupeList([
		...selectedInterestNodes.map(node => node.value),
		...parseList(customInterestsRaw),
	]);

	userProfile = {
		name,
		age: ageNumber,
		education,
		experience,
		skills,
		hobbies,
		interests,
		rawSkills: customSkillsRaw,
		rawHobbies: customHobbiesRaw,
		rawInterests: customInterestsRaw,
		personalityPulse: userProfile.personalityPulse,
	};

	if (!skills.length && skill) {
		userProfile.skills.push(capitalize(skill));
	}
	userProfile.skills = dedupeList(userProfile.skills);

	localStorage.setItem("userName", name);

	if (typeof AUTH_STORAGE_KEY !== "undefined") {
		try {
			const storedRaw = localStorage.getItem(AUTH_STORAGE_KEY);
			const storedProfile = storedRaw ? JSON.parse(storedRaw) : {};
			const updatedProfile = {
				...storedProfile,
				name,
				age: ageNumber,
				education,
				experience,
				skills,
				hobbies,
				interests,
				rawSkills: customSkillsRaw,
				rawHobbies: customHobbiesRaw,
				rawInterests: customInterestsRaw,
			};
			localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(updatedProfile));
		} catch (error) {
			console.warn("Unable to persist profile details", error);
		}
	}

	return true;
}

function resetProfile() {
	userProfile = { ...defaultProfile };
	const nameField = document.getElementById("profileName");
	if (!nameField) {
		return;
	}

	const ageField = document.getElementById("profileAge");
	const educationField = document.getElementById("profileEducation");
	const experienceField = document.getElementById("profileExperience");
	const skillsField = document.getElementById("profileSkills");
	const hobbiesField = document.getElementById("profileHobbies");
	const interestsField = document.getElementById("profileInterests");
	const pulseResult = document.getElementById("pulseResult");

	nameField.value = "";
	if (ageField) ageField.value = "";
	if (educationField) educationField.value = "";
	if (experienceField) experienceField.value = "explorer";
	if (skillsField) skillsField.value = "";
	if (hobbiesField) hobbiesField.value = "";
	if (interestsField) interestsField.value = "";
	if (pulseResult) pulseResult.innerText = "";

	document.querySelectorAll('[data-profile-skill]').forEach(node => {
		node.checked = false;
	});
	document.querySelectorAll('[data-profile-hobby]').forEach(node => {
		node.checked = false;
	});
	document.querySelectorAll('[data-profile-interest]').forEach(node => {
		node.checked = false;
	});

	document.querySelectorAll('input[name^="quizQ"]').forEach(input => {
		input.checked = false;
	});

	lastResumeText = "";
	badgeSet = [];

	if (typeof AUTH_STORAGE_KEY !== "undefined") {
		try {
			const storedRaw = localStorage.getItem(AUTH_STORAGE_KEY);
			if (storedRaw) {
				const storedProfile = JSON.parse(storedRaw);
				userProfile = {
					...defaultProfile,
					name: storedProfile.name || "",
					age: storedProfile.age || "",
					education: storedProfile.education || "",
					experience: storedProfile.experience || "explorer",
					skills: Array.isArray(storedProfile.skills) ? storedProfile.skills : [],
					hobbies: Array.isArray(storedProfile.hobbies) ? storedProfile.hobbies : [],
					interests: Array.isArray(storedProfile.interests) ? storedProfile.interests : [],
					rawSkills: typeof storedProfile.rawSkills === "string" ? storedProfile.rawSkills : (Array.isArray(storedProfile.skills) ? storedProfile.skills.join(", ") : ""),
					rawHobbies: typeof storedProfile.rawHobbies === "string" ? storedProfile.rawHobbies : (Array.isArray(storedProfile.hobbies) ? storedProfile.hobbies.join(", ") : ""),
					rawInterests: typeof storedProfile.rawInterests === "string" ? storedProfile.rawInterests : (Array.isArray(storedProfile.interests) ? storedProfile.interests.join(", ") : ""),
					personalityPulse: "",
				};

				nameField.value = userProfile.name;
				if (ageField && userProfile.age) ageField.value = userProfile.age;
				if (educationField) educationField.value = userProfile.education;
				if (experienceField) experienceField.value = userProfile.experience;
				if (skillsField) skillsField.value = userProfile.rawSkills;
				if (hobbiesField) hobbiesField.value = userProfile.rawHobbies;
				if (interestsField) interestsField.value = userProfile.rawInterests;

				applySelectionsToCheckboxes(document.querySelectorAll('[data-profile-skill]'), userProfile.skills, skillsField, userProfile.rawSkills);
				applySelectionsToCheckboxes(document.querySelectorAll('[data-profile-hobby]'), userProfile.hobbies, hobbiesField, userProfile.rawHobbies);
				applySelectionsToCheckboxes(document.querySelectorAll('[data-profile-interest]'), userProfile.interests, interestsField, userProfile.rawInterests);
			}
		} catch (error) {
			console.warn("Unable to load saved profile", error);
		}
	}

	const storedName = localStorage.getItem("userName");
	if (storedName && !nameField.value) {
		nameField.value = storedName;
		userProfile.name = storedName;
	}
}

function toggleInterest(value) {
	const index = selectedInterests.indexOf(value);
	if (index > -1) {
		selectedInterests.splice(index, 1);
	} else {
		if (selectedInterests.length < 3) {
			selectedInterests.push(value);
		} else {
			alert("You can select up to 3 interests");
		}
	}

	const label = document.getElementById("chosenInterest");
	if (label) {
		const display = selectedInterests.length ? selectedInterests.map(formatTrackName).join(", ") : "None";
		label.innerText = "Selected: " + display;
	}

	document.querySelectorAll(".interest-btn").forEach(btn => {
		const btnValue = btn.dataset.interest;
		btn.classList.toggle("active", selectedInterests.includes(btnValue));
	});
}

function selectSkill(value, el) {
	skill = value;
	const label = document.getElementById("chosenSkill");
	if (label) {
		label.innerText = "Selected: " + value.toUpperCase();
	}
	document.querySelectorAll(".skill-btn").forEach(btn => {
		const btnValue = btn.dataset.skill;
		const isActive = btn === el || (btnValue && btnValue === value);
		btn.classList.toggle("active", isActive);
	});
}

function calculatePulsePersonality() {
	const resultEl = document.getElementById("pulseResult");
	if (!resultEl) {
		return;
	}

	const answers = ["quizQ1", "quizQ2", "quizQ3"]
		.map(name => {
			const checked = document.querySelector(`input[name="${name}"]:checked`);
			return checked ? checked.value : "";
		})
		.filter(Boolean);

	if (!answers.length) {
		resultEl.innerText = "Answer at least one question to reveal your pulse.";
		return;
	}

	const tally = answers.reduce((acc, value) => {
		acc[value] = (acc[value] || 0) + 1;
		return acc;
	}, {});

	const topKey = Object.keys(tally).sort((a, b) => tally[b] - tally[a])[0];
	const mapping = {
		visionary: { value: "visionary", label: "Visionary" },
		analytical: { value: "analytical", label: "Analytical" },
		grounded: { value: "grounded", label: "Grounded" },
		extrovert: { value: "extrovert", label: "Extrovert" },
		ambivert: { value: "ambivert", label: "Ambivert" },
		introvert: { value: "introvert", label: "Introvert" },
	};

	const selected = mapping[topKey] || mapping.ambivert;
	const personalitySelect = document.getElementById("personality");
	if (personalitySelect) {
		const hasOption = Array.from(personalitySelect.options).some(opt => opt.value === selected.value);
		personalitySelect.value = hasOption ? selected.value : "ambivert";
	}

	userProfile.personalityPulse = selected.value;
	resultEl.innerText = "Pulse suggests you lean " + selected.label + ".";
}

function simulateCareer() {
	const hobbyEl = document.getElementById("hobby");
	const personalityEl = document.getElementById("personality");

	const hobbyValue = hobbyEl ? hobbyEl.value : (userProfile.hobbies[0] ? normalizeSkill(userProfile.hobbies[0]) : "gaming");
	const hobby = hobbyChallenges[hobbyValue] ? hobbyValue : "default";

	let personality = personalityEl ? personalityEl.value : "ambivert";
	if (userProfile.personalityPulse) {
		personality = userProfile.personalityPulse;
	}

	const displayName = userProfile.name || localStorage.getItem("userName") || "Trailblazer";

	const context = {
		interests: selectedInterests.slice(),
		skill,
		personality,
		hobby,
		experience: userProfile.experience,
	};

	const matchedRule = careerRules.find(rule => rule.matches(context));
	const career = matchedRule || defaultCareer;
	const trackKey = (matchedRule && matchedRule.track) || career.track || (selectedInterests[0] || "software");
	const blueprint = careerLibrary[trackKey] || careerLibrary.software;
	const trackName = formatTrackName(trackKey);

	const requiredSkills = blueprint.requiredSkills || [];
	const normalizedSkillSet = new Set(userProfile.skills.map(normalizeSkill));
	if (skill) {
		normalizedSkillSet.add(normalizeSkill(skill));
	}

	const matchedSkills = requiredSkills.filter(item => normalizedSkillSet.has(normalizeSkill(item)));
	const skillGaps = requiredSkills.filter(item => !normalizedSkillSet.has(normalizeSkill(item)));

	let skillMatchPercent = requiredSkills.length ? Math.round((matchedSkills.length / requiredSkills.length) * 100) : 60;
	if (!Number.isFinite(skillMatchPercent)) {
		skillMatchPercent = 60;
	}
	const progressWidth = Math.max(10, Math.min(100, skillMatchPercent));

	const recommendedIds = new Set(blueprint.courses || []);
	skillGaps.forEach(item => {
		const resourceId = skillResourceMap[normalizeSkill(item)];
		if (resourceId) {
			recommendedIds.add(resourceId);
		}
	});
	const recommendedCourses = Array.from(recommendedIds)
		.map(resolveResource)
		.filter(Boolean)
		.slice(0, 6);

	const coursePillsHtml = recommendedCourses.length
		? recommendedCourses
				.map(course => `<a class="course-pill" href="${course.url}" target="_blank" rel="noopener" title="${escapeHtml(course.note)}">${escapeHtml(course.title)}</a>`)
				.join("")
		: "<p>Keep experimenting with projects to stretch your range.</p>";

	const skillGapHtml = skillGaps.length
		? `<div class="skill-gap-list">${skillGaps.map(item => `<span class="skill-gap-item">${escapeHtml(item)}</span>`).join("")}</div>`
		: "<p>You already cover the core focus skills. Consider mentoring others to deepen mastery.</p>";

	const challengeList = hobbyChallenges[hobby] || hobbyChallenges.default;
	const challengeHtml = `<ul class="challenge-list">${challengeList.map(task => `<li>${escapeHtml(task)}</li>`).join("")}</ul>`;

	const quote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
	const videoKey = blueprint.video || career.video || defaultCareer.video;
	const video = videoCatalog[videoKey] || videoCatalog.careerOverview;
	const videoUrl = video.url || (`https://www.youtube.com/watch?v=${video.id}`);

	badgeSet = [];
	if (selectedInterests.length >= 3) {
		badgeSet.push({ icon: "&#128205;", label: "Explorer" });
	}
	if (skill === "leadership" || userProfile.skills.some(item => normalizeSkill(item).includes("lead"))) {
		badgeSet.push({ icon: "&#128101;", label: "People Catalyst" });
	}
	if (userProfile.experience === "pivot") {
		badgeSet.push({ icon: "&#10227;", label: "Bold Pivot" });
	}
	if (["data", "climate"].includes(trackKey)) {
		badgeSet.push({ icon: "&#128161;", label: "Insight Wizard" });
	}
	if (["cyber", "cloud"].includes(trackKey)) {
		badgeSet.push({ icon: "&#128274;", label: "Shield Keeper" });
	}
	if (hobby === "volunteering" || userProfile.hobbies.some(item => normalizeSkill(item) === "volunteering")) {
		badgeSet.push({ icon: "&#127793;", label: "Impact Maker" });
	}
	if ((userProfile.skills.length + selectedInterests.length) >= 5) {
		badgeSet.push({ icon: "&#11088;", label: "Multi-Potentialite" });
	}
	badgeSet = badgeSet.filter((badge, index, array) => index === array.findIndex(item => item.label === badge.label));

	const badgeHtml = badgeSet.length
		? badgeSet.map(badge => `<span class="badge-item">${badge.icon}<span>${escapeHtml(badge.label)}</span></span>`).join("")
		: '<span class="badge-item">&#128214; Keep exploring to earn badges</span>';

	const basePoints = 220;
	const interestPoints = selectedInterests.length * 35;
	const skillPoints = skill ? 55 : 0;
	const badgePoints = badgeSet.length * 25;
	const quizPoints = userProfile.personalityPulse ? 20 : 0;
	const totalPoints = basePoints + interestPoints + skillPoints + badgePoints + quizPoints;
	const passionScore = Math.min(99, 70 + selectedInterests.length * 6 + (skill ? 8 : 0) + badgeSet.length * 3);

	const careerCards = [blueprint.primary, blueprint.trending, blueprint.hiddenGem].filter(Boolean);
	const careerCardsHtml = careerCards
		.map(card => `
			<div class="career-card">
				<div class="career-card-header">
					<span class="career-icon">${card.icon || "&#11088;"}</span>
					<div>
						<h4>${escapeHtml(card.title)}</h4>
						<p>${escapeHtml(card.subtitle || card.label || "")}</p>
					</div>
				</div>
				<div class="career-meta">
					${card.label ? `<span>${escapeHtml(card.label)}</span>` : ""}
					${card.salary ? `<span>Salary ${escapeHtml(card.salary)}</span>` : ""}
					<span>${escapeHtml(card.industry || blueprint.industry || trackName)}</span>
				</div>
				<p>${escapeHtml(card.description || "")}</p>
				${card.skills && card.skills.length ? `<div class="career-meta">${card.skills.map(item => `<span>${escapeHtml(item)}</span>`).join("")}</div>` : ""}
				<div class="card-actions">
					${card.learnUrl ? `<a class="course-pill" href="${card.learnUrl}" target="_blank" rel="noopener">Learn path</a>` : ""}
					${card.applyUrl ? `<a class="course-pill" href="${card.applyUrl}" target="_blank" rel="noopener">Explore roles</a>` : ""}
				</div>
			</div>
		`)
		.join("");

	const experienceLabels = {
		explorer: "Student / Explorer",
		junior: "Early Career (0-2 yrs)",
		mid: "Mid-Level (3-5 yrs)",
		senior: "Senior (6+ yrs)",
		pivot: "Career Switch / Pivot",
	};

	const resumeLines = [
		(displayName || "Your Name").toUpperCase(),
		"Age: " + (userProfile.age || "n/a") + " | Experience: " + (experienceLabels[userProfile.experience] || "Explorer"),
		"Education: " + (userProfile.education || "Add your education or certifications"),
		"Core Strength: " + (skill ? capitalize(skill) : "Curious Generalist"),
		"Focus Tracks: " + (selectedInterests.length ? selectedInterests.map(formatTrackName).join(", ") : trackName),
		"Career Spotlight: " + (careerCards[0] ? careerCards[0].title : career.best),
		"Supporting Move: " + career.alt,
		"Key Skills Today: " + (userProfile.skills.length ? userProfile.skills.join(", ") : (matchedSkills.join(", ") || "Add skills here")),
		"Growth Targets: " + (skillGaps.length ? skillGaps.join(", ") : "Keep deepening your differentiators"),
		"Next 30 Days: Launch a project in " + trackName + ", share learnings publicly, and connect with a mentor.",
	];
	lastResumeText = resumeLines.join("\n");

	if (typeof showPage === "function") {
		showPage("page6");
	}

	const summaryBox = document.getElementById("resultSummary");
	const detailBox = document.getElementById("resultDetail");
	if (!summaryBox || !detailBox) {
		return;
	}

	summaryBox.innerHTML = `
		<h3>Hey ${escapeHtml(displayName)}, your personalised career lab is ready.</h3>
		<p>${escapeHtml(career.blurb)}</p>
		<div class="points-banner">
			<span>Career Points: ${totalPoints}</span>
			<span>Career Energy Index: ${passionScore}%</span>
		</div>
		<div class="progress-wrapper">
			<strong>Skill Alignment</strong>
			<div class="progress-bar"><div class="progress-bar-fill" style="width:${progressWidth}%"></div></div>
			<small>Matching ${matchedSkills.length} of ${requiredSkills.length} focus skills for ${escapeHtml(trackName)}</small>
		</div>
		<div class="badge-deck">${badgeHtml}</div>
		<div class="career-grid">${careerCardsHtml}</div>
		<p class="section-subtitle" style="margin-top:20px;">Ready for deeper actions? Jump to the next page for resources and challenges.</p>
	`;

	detailBox.innerHTML = `
		<div class="skill-builder">
			<h3>Skill & Passion Builder</h3>
			<p>Mind the gap and level up with curated resources.</p>
			${skillGapHtml}
			<div>${coursePillsHtml}</div>
			<div>
				<strong>Mini Challenge Deck</strong>
				${challengeHtml}
			</div>
		</div>
		<div class="result-extras">
			<div class="quote-card">
				"${escapeHtml(quote.text)}"
				<span>- ${escapeHtml(quote.author)}</span>
			</div>
			<div>
				<h4 style="color:#38bdf8; margin-bottom:10px;">Watch: ${escapeHtml(video.title)}</h4>
				<div class="video-embed">
					<iframe src="https://www.youtube.com/embed/${video.id}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen title="${escapeHtml(video.title)}"></iframe>
				</div>
				<a class="btn secondary" style="margin-top:12px; display:inline-block;" href="${videoUrl}" target="_blank" rel="noopener">Open on YouTube</a>
			</div>
			<div class="potential-game">
				<h4>Potential Finder Mini-Game</h4>
				<p>Select the statements that feel true right now, then reveal your superpower.</p>
				<div class="game-options">
					<label><input type="checkbox" data-game-option="visionary"> I sketch ideas that reimagine how people live or work.</label>
					<label><input type="checkbox" data-game-option="builder"> I love turning rough concepts into polished products.</label>
					<label><input type="checkbox" data-game-option="connector"> I energise teams and spark collaboration fast.</label>
					<label><input type="checkbox" data-game-option="analyst"> I spot patterns and experiment until the puzzle clicks.</label>
					<label><input type="checkbox" data-game-option="guardian"> I protect systems and people from risk.</label>
				</div>
				<button class="btn primary" type="button" onclick="runPotentialGame()">Reveal Strength Zone</button>
				<p id="gameResult" class="game-result"></p>
			</div>
			<div class="resume-block">
				<h4>Resume Snapshot Builder</h4>
				<button class="btn secondary" type="button" onclick="copyResume()">Copy snapshot</button>
				<pre id="resumeSnapshot">${escapeHtml(lastResumeText)}</pre>
			</div>
			<div class="mentorship-tip" id="mentorshipTip">
				<strong>Mentorship Insight</strong>
				<p id="mentorshipTipBody">Tap the button for a mentor-ready action.</p>
				<button class="btn secondary" type="button" onclick="showMentorshipTip()">Another insight</button>
			</div>
		</div>
	`;

	showMentorshipTip(true);
}

function runPotentialGame() {
	const optionNodes = Array.from(document.querySelectorAll("#resultDetail [data-game-option]"));
	const gameResult = document.getElementById("gameResult");
	if (!gameResult || optionNodes.length === 0) {
		return;
	}

	const selections = optionNodes.filter(node => node.checked).map(node => node.dataset.gameOption);
	if (selections.length === 0) {
		gameResult.innerText = "Pick at least one statement to unlock your talent signal.";
		return;
	}

	const archetypes = {
		visionary: { title: "Visionary Navigator", message: "You imagine future states and rally others toward bold missions." },
		builder: { title: "Builder of Momentum", message: "You iterate fast and craft experiences people can feel." },
		connector: { title: "Collaboration Catalyst", message: "You spark trust, align teams, and remove blockers early." },
		analyst: { title: "Insight Alchemist", message: "You experiment, quantify, and transform data into foresight." },
		guardian: { title: "Systems Guardian", message: "You safeguard platforms and ensure long-term resilience." },
	};

	const scoreMap = selections.reduce((acc, key) => {
		acc[key] = (acc[key] || 0) + 1;
		return acc;
	}, {});

	const topKey = Object.keys(scoreMap).sort((a, b) => scoreMap[b] - scoreMap[a])[0];
	const profile = archetypes[topKey] || archetypes.visionary;
	gameResult.innerText = profile.title + ": " + profile.message;
}

function showMentorshipTip(force = false) {
	const tipBody = document.getElementById("mentorshipTipBody");
	if (!tipBody) {
		return;
	}

	if (!force && mentorshipTips.length === 0) {
		tipBody.innerText = "Keep sharing progress to invite mentors into your journey.";
		return;
	}

	const tip = mentorshipTips[Math.floor(Math.random() * mentorshipTips.length)];
	tipBody.innerHTML = `<strong>${escapeHtml(tip.title)}:</strong> ${escapeHtml(tip.tip)}`;
}

function copyResume() {
	if (!lastResumeText) {
		alert("Generate a career simulation first.");
		return;
	}

	if (navigator.clipboard && navigator.clipboard.writeText) {
		navigator.clipboard.writeText(lastResumeText).then(() => {
			alert("Resume snapshot copied. Paste it into your doc to keep iterating.");
		}).catch(() => {
			alert("Unable to access the clipboard. Copy the text manually from the block.");
		});
	} else {
		alert("Clipboard access is unavailable. Copy the text manually from the block.");
	}
}

resetProfile();
