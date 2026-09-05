import { ProjectCreationFormValues, ProjectIdea, ProjectBlueprint, ProjectRoadmap, RoadmapMilestone } from '../types/project';

export interface DomainTemplate {
  domain: string;
  defaultTech: string[];
  sampleProjects: Array<{
    title: string;
    problemStatement: string;
    shortDescription: string;
    difficulty: 'Beginner-Friendly' | 'Intermediate' | 'Advanced';
    requiredTechnologies: string[];
    innovationPotential: string;
    mainRisks: string[];
    mvpFeatures: string[];
    futureFeatures: string[];
    architectureSummary: string;
    objectives: string[];
    targetUsers: string;
    expectedOutcome: string;
  }>;
}

export const DOMAIN_KNOWLEDGE: Record<string, DomainTemplate> = {
  'Artificial Intelligence & Machine Learning': {
    domain: 'Artificial Intelligence & Machine Learning',
    defaultTech: ['Python', 'FastAPI', 'PyTorch', 'Gemini API', 'ChromaDB', 'React', 'Tailwind CSS'],
    sampleProjects: [
      {
        title: 'VeriScan: Multi-Modal Medical Report Analyzer & Clinical Triage Assistant',
        problemStatement: 'Underfunded rural clinics face long queues and delayed triage due to radiologist shortages, often leading to unaddressed critical lab anomalies.',
        shortDescription: 'A privacy-first medical assistance platform that ingests unstructured lab results and diagnostic images, generating structured clinical summaries and risk flags for attending doctors.',
        difficulty: 'Intermediate',
        requiredTechnologies: ['Python', 'FastAPI', 'Gemini 2.5 Flash', 'React', 'TypeScript', 'Tailwind CSS', 'PostgreSQL'],
        innovationPotential: 'Combines vision-language document intelligence with strict HL7/FHIR sanitization pipelines to ensure zero patient PII leakage.',
        mainRisks: ['False negative diagnostic suggestions requiring clear human-in-the-loop disclaimers', 'Varying hospital report formats'],
        mvpFeatures: [
          'Document OCR and structured blood test parameter extraction',
          'Automated out-of-range biomarker alerting with clinical literature citations',
          'Doctor review workspace with differential triage prioritization',
          'HIPAA-compliant on-device PII masking prior to cloud analysis'
        ],
        futureFeatures: [
          'Direct EHR integration via standard SMART on FHIR protocols',
          'Multilingual patient-facing discharge explanation generator'
        ],
        architectureSummary: 'React client communicating via secure REST API to FastAPI backend, orchestrating document parsing, Gemini multimodal analysis, and audit logging into PostgreSQL.',
        objectives: [
          'Reduce triage document review time by at least 65%',
          'Demonstrate zero PII transmission through client-side redaction',
          'Provide transparent reasoning traces for every flagged anomaly'
        ],
        targetUsers: 'Resident physicians, triage nurses, and medical clinic administrators',
        expectedOutcome: 'A deployable, audited web platform capable of processing 10+ standard lab panels in under 3 seconds per report.'
      },
      {
        title: 'AgenticCode: Multi-Agent Automated Test Generation & Security Hardening Tool',
        problemStatement: 'Final-year software projects and early-stage repositories often lack thorough integration tests and suffer from OWASP Top 10 vulnerabilities.',
        shortDescription: 'An autonomous agent framework that analyzes Git repositories, identifies untested edge cases, generates high-coverage unit tests, and patches security vulnerabilities.',
        difficulty: 'Advanced',
        requiredTechnologies: ['TypeScript', 'Node.js', 'Python', 'Tree-Sitter', 'Gemini 2.5 Flash', 'Docker', 'React'],
        innovationPotential: 'Uses dual competing agents (Attacker Agent finding flaws vs Defender Agent generating verified regression test suites).',
        mainRisks: ['Hallucinated non-existent library imports', 'Execution sandbox security for untrusted code'],
        mvpFeatures: [
          'Abstract Syntax Tree (AST) parsing of TypeScript and Python source files',
          'Automated boundary-value unit test suite generation with Jest/Pytest exports',
          'Static vulnerability scanning with automated remediation diffs',
          'Isolated Docker container execution to verify generated test pass rates'
        ],
        futureFeatures: [
          'GitHub Action PR bot with automated inline commentary',
          'Fuzz testing engine for API boundary fuzzing'
        ],
        architectureSummary: 'Microservice architecture with AST parser service, Gemini agent coordinator, isolated Docker test executor, and React IDE dashboard.',
        objectives: [
          'Achieve >80% test branch coverage on parsed repositories',
          'Demonstrate real-time Docker sandbox execution of generated suites',
          'Eliminate common SQL injection and XSS patterns automatically'
        ],
        targetUsers: 'Student developers, open-source maintainers, and junior QA engineers',
        expectedOutcome: 'A functional web-based audit suite that ingests a GitHub URL and outputs a verified pull request with tests.'
      },
      {
        title: 'EduLens: Adaptive Real-Time Lecture Companion with Concept Knowledge Graphs',
        problemStatement: 'Students in large lecture halls struggle to digest dense STEM presentations in real time, lacking personalized clarifications and dynamic prerequisite links.',
        shortDescription: 'A live interactive learning companion that transcribes live or recorded lectures, creates real-time interactive concept graphs, and resolves confusion on demand.',
        difficulty: 'Beginner-Friendly',
        requiredTechnologies: ['React', 'TypeScript', 'Tailwind CSS', 'Web Audio API', 'Gemini API', 'D3.js', 'Supabase'],
        innovationPotential: 'Dynamic graph clustering that visually illuminates prerequisite knowledge gaps based on the student’s specific confusion queries.',
        mainRisks: ['Background classroom noise impacting live audio transcription', 'Graph rendering performance on low-end mobile devices'],
        mvpFeatures: [
          'Live audio transcription and slide text extraction',
          'Interactive D3.js knowledge graph of core lecture concepts',
          'Click-to-clarify question workspace with contextual analogies',
          'Auto-generated spaced-repetition flashcards and concept summaries'
        ],
        futureFeatures: [
          'Collaborative student study rooms with peer doubt-clearing',
          'LMS synchronization with Canvas and Google Classroom'
        ],
        architectureSummary: 'Client-side Web Audio capture streaming to Gemini audio transcription, generating structured entity-relationship tuples stored in Supabase and visualized with D3.',
        objectives: [
          'Generate instant concept graph within 5 seconds of lecture segment finish',
          'Deliver contextual 2-sentence prerequisite explanations for struggling students',
          'Export formatted PDF study briefs ready for exam revision'
        ],
        targetUsers: 'University undergraduate students and academic teaching assistants',
        expectedOutcome: 'A high-performance responsive web app with lecture playback, dynamic graph inspection, and adaptive quiz generation.'
      }
    ]
  },
  'Cybersecurity & Privacy': {
    domain: 'Cybersecurity & Privacy',
    defaultTech: ['Go', 'Python', 'React', 'Tailwind CSS', 'Docker', 'eBPF', 'PostgreSQL'],
    sampleProjects: [
      {
        title: 'ZeroShield: Microservice Identity & Behavioral Anomaly Detection Engine',
        problemStatement: 'Modern distributed architectures suffer from lateral movement attacks when perimeter defenses are breached, because internal service-to-service calls lack continuous zero-trust verification.',
        shortDescription: 'A zero-trust observability platform that monitors service mesh traffic, builds baseline behavioral fingerprints, and enforces real-time token invalidation upon anomaly detection.',
        difficulty: 'Advanced',
        requiredTechnologies: ['Go', 'Docker', 'Redis', 'Python', 'Gemini API', 'React', 'Tailwind CSS'],
        innovationPotential: 'Uses lightweight behavioral telemetry combined with AI-driven threat classification to isolate compromised services in milliseconds.',
        mainRisks: ['High traffic volume impacting latency', 'False positives causing legitimate service throttling'],
        mvpFeatures: [
          'Service-to-service API telemetry capture and mTLS inspection',
          'Statistical anomaly scoring against rolling behavioral baselines',
          'AI-assisted incident root cause analysis and blast-radius visualization',
          'Automated isolation webhook trigger for compromised container instances'
        ],
        futureFeatures: [
          'Kubernetes admission controller integration',
          'Cryptographic zero-knowledge proof verification for tenant isolation'
        ],
        architectureSummary: 'High-throughput Go proxy agent forwarding telemetry to a processing engine, storing metrics in Redis/TimescaleDB, with an administrative React dashboard.',
        objectives: [
          'Detect synthetic credential stuffing and anomalous payloads within 200ms',
          'Maintain <3ms overhead per inspected HTTP/gRPC request',
          'Provide one-click remediation playbooks for SOC analysts'
        ],
        targetUsers: 'DevOps engineers, cloud security analysts, and computer science security researchers',
        expectedOutcome: 'A complete multi-container demo environment with simulated attacks (lateral pivoting, data exfiltration) and automated defense.'
      },
      {
        title: 'PhishGuard: Autonomous Multi-Stage Social Engineering Defense Platform',
        problemStatement: 'Spear phishing and AI-generated voice/text deception campaigns easily bypass static email filters by spoofing trusted corporate workflows.',
        shortDescription: 'An enterprise security simulator and real-time email defense extension that deconstructs deceptive psychological triggers and teaches employees through immediate contextual micro-lessons.',
        difficulty: 'Intermediate',
        requiredTechnologies: ['TypeScript', 'React', 'Node.js', 'Express', 'Gemini 2.5 Flash', 'SQLite'],
        innovationPotential: 'Deconstructs phishing vectors by emotional pressure metrics (urgency, authority, fear) rather than mere keyword filtering.',
        mainRisks: ['Accidental false labeling of urgent transactional emails', 'Browser extension permission scope'],
        mvpFeatures: [
          'Header analysis, domain lookalike/typosquatting detection, and SPF/DKIM verification',
          'AI sentiment and psychological manipulation trigger deconstruction',
          'Interactive browser banner explaining exact red flags to the user',
          'Departmental risk dashboard with scheduled educational simulation campaigns'
        ],
        futureFeatures: [
          'Integration with Microsoft 365 and Google Workspace APIs',
          'Voice deepfake audio sample verification portal'
        ],
        architectureSummary: 'Chrome Extension communicating with secure Node.js API, utilizing Gemini for deep linguistic threat analysis and SQLite for campaign analytics.',
        objectives: [
          'Identify 95% of synthetic spear phishing samples with zero false positives on known transactional receipts',
          'Provide clear, non-technical explanations of why an email is untrustworthy',
          'Demonstrate demonstrable reduction in simulated click-through rates'
        ],
        targetUsers: 'University IT departments, small-to-medium businesses, and remote workers',
        expectedOutcome: 'A working web dashboard with email inspector demo, phishing simulator, and interactive triage drill room.'
      }
    ]
  },
  'IoT & Smart Systems': {
    domain: 'IoT & Smart Systems',
    defaultTech: ['C++', 'Python', 'MQTT', 'React', 'Tailwind CSS', 'ESP32 / Raspberry Pi', 'InfluxDB'],
    sampleProjects: [
      {
        title: 'EcoGrid: Autonomous Solar Microgrid Load-Balancing & Predictive Storage Optimizer',
        problemStatement: 'Decentralized residential solar-battery installations suffer from suboptimal battery degradation and grid-feed curtailment due to unpredictable local consumption spikes.',
        shortDescription: 'An edge-enabled smart energy management system that combines weather forecasts, historical consumption patterns, and battery health models to autonomously optimize inverter switching.',
        difficulty: 'Intermediate',
        requiredTechnologies: ['Python', 'MQTT', 'React', 'TypeScript', 'Tailwind CSS', 'InfluxDB', 'Gemini API'],
        innovationPotential: 'Edge-calculating battery lifecycle preservation algorithms with cloud AI optimization for dynamic tariff arbitrage.',
        mainRisks: ['Hardware simulator fidelity', 'MQTT connection drops during storm simulations'],
        mvpFeatures: [
          'Virtual hardware emulator modeling solar PV, battery charge cycles, and household loads',
          'Real-time MQTT telemetry streaming to InfluxDB time-series database',
          'Dynamic battery charging schedule generation based on next-day solar irradiation',
          'Emergency grid islanding switch with visual load shedding priority controller'
        ],
        futureFeatures: [
          'Peer-to-peer neighborhood microgrid energy trading simulation',
          'Hardware-in-the-loop support for physical ESP32 and Modbus inverters'
        ],
        architectureSummary: 'Python telemetry simulation service streaming via Mosquitto MQTT broker to an InfluxDB backend, surfaced through a sleek React energy cockpit.',
        objectives: [
          'Reduce simulated peak electricity grid consumption by 40%',
          'Extend simulated lithium battery operational lifespan by minimizing micro-cycling',
          'Render real-time telemetry updates with <100ms latency'
        ],
        targetUsers: 'Renewable energy engineers, smart home enthusiasts, and sustainable campus facility managers',
        expectedOutcome: 'A functional IoT dashboard with interactive live sliders for weather and load, demonstrating autonomous load balancing.'
      }
    ]
  },
  'Web3 & FinTech': {
    domain: 'Web3 & FinTech',
    defaultTech: ['Solidity', 'TypeScript', 'Ethers.js', 'React', 'Tailwind CSS', 'Hardhat', 'Supabase'],
    sampleProjects: [
      {
        title: 'MicroCredit: Decentralized Credit Scoring & Fair Collateralized Lending Protocol',
        problemStatement: 'Unbanked gig-economy workers and student founders lack traditional credit bureau histories, locking them out of fair-rate micro-loans despite steady digital cashflows.',
        shortDescription: 'A transparent on-chain lending protocol that derives verifiable non-custodial reputation scores from recurring utility payments, freelance invoices, and multi-chain activity.',
        difficulty: 'Advanced',
        requiredTechnologies: ['Solidity', 'TypeScript', 'Hardhat', 'React', 'Tailwind CSS', 'Ethers.js', 'Gemini API'],
        innovationPotential: 'Zero-knowledge verification of off-chain bank statements allowing reputation calculation without revealing personal bank transactions.',
        mainRisks: ['Smart contract re-entrancy vulnerabilities', 'Default risk mitigation in decentralized lending pools'],
        mvpFeatures: [
          'ERC-20 smart contract for pool deposit, loan origination, and automated interest accrual',
          'Invoice and statement parser computing verifiable credit score metrics (0-1000)',
          'Automated collateral ratio adjustment based on borrower track record',
          'Student loan sandbox with risk simulation and faucet minting'
        ],
        futureFeatures: [
          'ZK-SNARK integration via Circom for private credit verification',
          'Cross-chain lending pool rebalancing via Chainlink CCIP'
        ],
        architectureSummary: 'Hardhat local blockchain / Sepolia testnet contracts connected via Ethers.js to a React frontend, with a Node.js verification oracle powered by AI document parsing.',
        objectives: [
          'Pass 100% of Slither static smart contract security audits',
          'Enable complete loan lifecycle from application to settlement in under 3 minutes on testnet',
          'Eliminate algorithmic discrimination in credit score weighting'
        ],
        targetUsers: 'Freelancers, international students, and DeFi protocol developers',
        expectedOutcome: 'A deployed testnet dApp with full smart contracts, verifiable unit tests, and live interactive credit evaluation.'
      }
    ]
  },
  'Healthcare & BioTech': {
    domain: 'Healthcare & BioTech',
    defaultTech: ['Python', 'FastAPI', 'React', 'Tailwind CSS', 'PostgreSQL', 'Docker'],
    sampleProjects: [
      {
        title: 'NeuroPath: Computer-Vision Early Parkinsonism & Tremor Screening Portal',
        problemStatement: 'Neurological motor disorders are often diagnosed too late because clinical tremor exams require specialized in-person neurologist appointments with multi-month waiting lists.',
        shortDescription: 'A browser-based tele-health screening application that utilizes standard webcams and digital stylus inputs to detect micro-tremors, spiral-drawing deviations, and facial rigidity.',
        difficulty: 'Intermediate',
        requiredTechnologies: ['TypeScript', 'Python', 'FastAPI', 'MediaPipe', 'OpenCV', 'React', 'Tailwind CSS'],
        innovationPotential: 'Runs clinical spiral drawing kinematics and landmark motion tracking directly in browser WebAssembly before transmitting encrypted kinematic vectors.',
        mainRisks: ['Variability in user webcam frame rates and room lighting conditions', 'Regulatory compliance clarity for non-diagnostic screening'],
        mvpFeatures: [
          'Browser-based MediaPipe hand landmark tracking measuring finger tapping frequency',
          'Archimedean spiral drawing test with kinematic velocity and curvature variance scoring',
          'Longitudinal tremor progression report for neurologist review',
          'Encrypted export of kinematic time-series data for clinical trials'
        ],
        futureFeatures: [
          'Voice acoustic jitter and shimmer phonation analysis',
          'Smartwatch accelerometer companion sync'
        ],
        architectureSummary: 'Client-side MediaPipe inference in React, sending kinematic metric arrays to FastAPI backend for statistical modeling and PDF report generation.',
        objectives: [
          'Capture hand kinematics at 30 FPS using consumer webcams',
          'Correlate digital spiral drawing curvature with clinical UPDRS motor scales',
          'Provide intuitive 3-minute self-test procedure with zero friction'
        ],
        targetUsers: 'Geriatric care clinics, tele-neurology researchers, and patient families',
        expectedOutcome: 'A complete responsive tele-screening portal with live video landmark overlay and objective kinematic metric graphs.'
      }
    ]
  },
  'Cloud & DevOps Engineering': {
    domain: 'Cloud & DevOps Engineering',
    defaultTech: ['Go', 'TypeScript', 'Docker', 'Kubernetes', 'Prometheus', 'React', 'Tailwind CSS'],
    sampleProjects: [
      {
        title: 'KubeCostGuard: Autonomous Cloud FinOps & Pod Right-Sizing Intelligence',
        problemStatement: 'Startups and university research clusters waste up to 45% of cloud budgets due to chronically over-provisioned Kubernetes resource requests and idle dev environments.',
        shortDescription: 'An automated FinOps controller that monitors container CPU/memory usage distributions, detects cost leaks, and recommends exact declarative resource patches.',
        difficulty: 'Intermediate',
        requiredTechnologies: ['Go', 'Kubernetes client-go', 'React', 'TypeScript', 'Tailwind CSS', 'Prometheus', 'Gemini API'],
        innovationPotential: 'Combines statistical percentile profiling with AI workload type classification to generate risk-free vertical autoscaling patches.',
        mainRisks: ['Recommending too-low limits that trigger OOMKills', 'Cluster permission configuration complexity'],
        mvpFeatures: [
          'Kubernetes metrics scraper tracking CPU/Memory utilization vs allocation',
          'Interactive cost burn rate visualizer broken down by namespace and label',
          'Automated PR generator with optimized YAML resource requests and limits',
          'Idle pod detection and scheduled dev-cluster hibernation controller'
        ],
        futureFeatures: [
          'Spot instance interruption risk predictor',
          'Cross-cloud pricing arbitrage between AWS, GCP, and Azure'
        ],
        architectureSummary: 'Go daemon controller scraping Prometheus metrics, generating optimization plans via Gemini, displayed in a high-density React operational console.',
        objectives: [
          'Demonstrate simulated monthly cost reduction of >30% on sample clusters',
          'Generate one-click kubectl patch commands with safety margins',
          'Alert operators to memory leak trajectories before out-of-memory crashes'
        ],
        targetUsers: 'Platform engineers, DevOps students, and engineering managers',
        expectedOutcome: 'A live demo dashboard connected to a simulated multi-node cluster demonstrating automated cost savings.'
      }
    ]
  }
};

export function generateCustomIdeasFromForm(values: ProjectCreationFormValues): ProjectIdea[] {
  // Find closest domain or fallback
  const domainKey = Object.keys(DOMAIN_KNOWLEDGE).find(k => 
    k.toLowerCase().includes(values.preferredDomain.toLowerCase()) ||
    values.preferredDomain.toLowerCase().includes(k.toLowerCase())
  ) || 'Artificial Intelligence & Machine Learning';

  const domainData = DOMAIN_KNOWLEDGE[domainKey] || DOMAIN_KNOWLEDGE['Artificial Intelligence & Machine Learning'];

  // Personalize each project idea using student's specific skills and constraints
  return domainData.sampleProjects.map((sample, idx) => {
    // Blend student's skills with required technologies
    const combinedTech = Array.from(new Set([
      ...sample.requiredTechnologies.slice(0, 3),
      ...values.skills.slice(0, 3),
      ...values.preferredTechnologies.slice(0, 2)
    ]));

    // Adjust difficulty based on experience
    let diff: 'Beginner-Friendly' | 'Intermediate' | 'Advanced' = sample.difficulty;
    if (values.experience === 'Beginner') {
      diff = 'Beginner-Friendly';
    } else if (values.experience === 'Advanced') {
      diff = 'Advanced';
    }

    const duration = Math.min(Math.max(values.availableTimeWeeks, 4), 24);

    return {
      id: `project-${domainKey.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${idx + 1}`,
      title: sample.title,
      domain: domainData.domain,
      problemStatement: sample.problemStatement,
      shortDescription: sample.shortDescription,
      whyItMatches: `Tailored for your interest in ${values.interests.slice(0, 2).join(' & ')} and expertise in ${values.skills.slice(0, 2).join(', ')}. Engineered for a team of ${values.teamSize} working within ${values.availableTimeWeeks} weeks under "${values.constraints}".`,
      difficulty: diff,
      estimatedDurationWeeks: duration,
      requiredTechnologies: combinedTech,
      innovationPotential: sample.innovationPotential,
      mainRisks: sample.mainRisks,
      mvpFeatures: sample.mvpFeatures,
      futureFeatures: sample.futureFeatures,
      architectureSummary: sample.architectureSummary,
      objectives: sample.objectives,
      targetUsers: sample.targetUsers,
      expectedOutcome: sample.expectedOutcome,
    };
  });
}

export function generateBlueprintForProject(project: ProjectIdea): ProjectBlueprint {
  const isAI = project.domain.toLowerCase().includes('intelligence') || project.requiredTechnologies.some(t => t.toLowerCase().includes('gemini') || t.toLowerCase().includes('python'));
  const isWeb3 = project.domain.toLowerCase().includes('web3') || project.requiredTechnologies.some(t => t.toLowerCase().includes('solidity'));

  return {
    projectId: project.id,
    projectTitle: project.title,
    architecture: {
      pattern: isAI ? 'Client-Server with Asynchronous AI Inference Pipeline' : isWeb3 ? 'Hybrid dApp with On-Chain Contracts & Off-Chain Indexer' : 'Layered Modular Microservice Architecture',
      diagramDescription: 'Frontend SPA communicates through an API Gateway to decoupled business services, utilizing event queues for heavy computational tasks and relational storage for persistent state.',
      components: [
        {
          name: 'Presentation Layer (Frontend)',
          purpose: 'Provides responsive, accessible user interfaces with real-time state synchronization and client-side input validation.',
          technologies: ['React 18/19', 'TypeScript', 'Tailwind CSS', 'Vite', 'Lucide Icons']
        },
        {
          name: 'Application API Gateway',
          purpose: 'Handles authentication, request routing, rate limiting, and input sanitization before delegating to core microservices.',
          technologies: ['Node.js / FastAPI', 'REST / gRPC', 'Zod / Pydantic']
        },
        {
          name: 'Core Domain Engine',
          purpose: 'Executes primary business algorithms, state transitions, and background asynchronous jobs.',
          technologies: [project.requiredTechnologies[0] || 'Python', 'Celery / BullMQ', 'Redis']
        },
        {
          name: 'Data Persistence Layer',
          purpose: 'Maintains transactional integrity, user profiles, audit logs, and domain records with automated migrations.',
          technologies: ['PostgreSQL / Supabase', 'Prisma / SQLAlchemy', 'Redis Cache']
        }
      ]
    },
    frontend: {
      framework: 'React with Strict TypeScript',
      styling: 'Tailwind CSS with Custom Dark Glass Theme',
      stateManagement: 'Zustand Store with LocalStorage Persistence',
      keyLibraries: ['react-router-dom', 'lucide-react', 'zod', 'react-hook-form', 'canvas-confetti']
    },
    backend: {
      runtime: isAI ? 'Python 3.11+' : 'Node.js 22 LTS',
      framework: isAI ? 'FastAPI' : 'Express / NestJS',
      apiType: 'RESTful JSON API with OpenAPI / Swagger Documentation',
      architectureStyle: 'Decoupled Service-Repository Pattern'
    },
    database: {
      primary: 'PostgreSQL 16 (Relational Schema)',
      caching: 'Redis 7 (Session Store & Telemetry Cache)',
      orm: isAI ? 'SQLAlchemy / Alembic' : 'Prisma ORM',
      dataModelSummary: 'Normalized schema with User, Project, Milestone, ExecutionLog, and Audit tables with foreign key cascades and indexed queries.'
    },
    apis: [
      { name: 'Health Check', purpose: 'Liveness and readiness probe for orchestration', method: 'GET', endpoint: '/api/health' },
      { name: 'Core Process Endpoint', purpose: 'Initiates project processing pipeline', method: 'POST', endpoint: '/api/v1/process' },
      { name: 'Result Query', purpose: 'Retrieves processed analytical outputs', method: 'GET', endpoint: '/api/v1/results/:id' },
      { name: 'Export Report', purpose: 'Generates PDF / JSON documentation bundle', method: 'POST', endpoint: '/api/v1/export' }
    ],
    aiComponents: {
      model: 'Google Gemini 2.5 Flash',
      role: 'Semantic parsing, contextual anomaly detection, and automated solution synthesis',
      pipelineDescription: 'Input data is sanitized and structured into compact prompt payloads, forwarded to Gemini via @google/genai SDK, and schema-validated before returning.',
      promptStrategy: 'Role-based system prompt with strict JSON output schemas and zero-shot few-example guidance'
    },
    authentication: {
      method: 'JWT Bearer Tokens with Refresh Rotation',
      provider: 'Firebase Authentication / Supabase Auth (Supporting Google Sign-In)',
      securityMeasures: [
        'HTTP-only Secure SameSite cookies for refresh tokens',
        'Strict CORS origin whitelisting',
        'Rate limiting per IP / User identifier',
        'Zero API secrets exposed to frontend bundle'
      ]
    },
    externalServices: [
      { service: 'Google Gemini API', purpose: 'Intelligent inference and automated synthesis' },
      { service: 'Firebase / Google Cloud', purpose: 'Authentication, cloud storage, and hosting' },
      { service: 'GitHub Actions', purpose: 'Continuous integration, testing, and automated deployment' }
    ],
    deploymentArchitecture: {
      hostingFrontend: 'Vercel / Firebase Hosting (Global Edge CDN)',
      hostingBackend: 'Google Cloud Run / Render (Containerized Docker)',
      ciCd: 'GitHub Actions with automated lint, test, and build workflows',
      monitoring: 'Structured JSON logging, Prometheus metrics, and Sentry error capture'
    },
    mvpFeatures: project.mvpFeatures.map((feat, i) => ({
      title: feat,
      priority: i === 0 ? 'Must Have' : 'Should Have',
      complexity: i % 2 === 0 ? 'Medium' : 'Low',
      description: `Core feature required for initial final-year project demonstration and evaluative defense.`
    })),
    futureFeatures: project.futureFeatures.map((feat, i) => ({
      title: feat,
      impact: i === 0 ? 'High' : 'Innovative',
      complexity: 'High',
      description: `Extended capability to explore post-MVP or during master-level project expansion.`
    })),
    generatedAt: new Date().toISOString()
  };
}

export function generateRoadmapForProject(project: ProjectIdea, totalWeeks: number = 8): ProjectRoadmap {
  const weeks = Math.min(Math.max(totalWeeks, 4), 24);
  const milestones: RoadmapMilestone[] = [];

  const stageTemplates = [
    {
      title: 'Problem Formulation, Literature Review & SRS',
      objective: 'Define formal problem statement, study 5+ related IEEE/ACM papers, and produce comprehensive Software Requirements Specification.',
      tasks: [
        { title: 'Draft formal problem statement and scope boundaries', hours: 6 },
        { title: 'Conduct comparative literature survey of existing systems', hours: 10 },
        { title: 'Construct functional and non-functional SRS document', hours: 8 },
        { title: 'Present preliminary project proposal to department guide', hours: 4 },
      ]
    },
    {
      title: 'System Architecture & Database Schema Design',
      objective: 'Design end-to-end component architecture, entity-relationship diagrams, and API specifications.',
      tasks: [
        { title: 'Create high-level architecture diagram and sequence flows', hours: 8 },
        { title: 'Design normalized relational database schema with migration scripts', hours: 8 },
        { title: 'Specify OpenAPI / Swagger REST contract definitions', hours: 6 },
        { title: 'Set up version control repository, branch rules, and CI pipelines', hours: 4 },
      ]
    },
    {
      title: 'Core Engine & Backend Foundation',
      objective: 'Implement server foundation, database connectivity, and core business logic services.',
      tasks: [
        { title: 'Initialize backend service with environment configuration and logging', hours: 8 },
        { title: 'Implement database models, repositories, and seed test data', hours: 10 },
        { title: 'Implement primary domain algorithm and API route handlers', hours: 14 },
        { title: 'Write unit tests covering backend business logic edge cases', hours: 8 },
      ]
    },
    {
      title: 'AI Integration & Intelligent Pipeline',
      objective: 'Integrate Google Gemini API or domain AI models with structured output validation and error resilience.',
      tasks: [
        { title: 'Configure @google/genai client with compact prompt schemas', hours: 8 },
        { title: 'Implement Zod schema validation for all AI responses', hours: 6 },
        { title: 'Build graceful fallback handling and rate-limit retries', hours: 6 },
        { title: 'Evaluate latency, token economy, and answer accuracy', hours: 6 },
      ]
    },
    {
      title: 'Frontend UI/UX & Responsive Workspace',
      objective: 'Develop modern responsive web interface with clean glassmorphic components and state management.',
      tasks: [
        { title: 'Build component design system (buttons, glass cards, inputs, modals)', hours: 10 },
        { title: 'Implement multi-step forms with client-side validation', hours: 8 },
        { title: 'Connect frontend to backend REST APIs using typed service layer', hours: 10 },
        { title: 'Verify responsive usability across mobile, tablet, and desktop', hours: 6 },
      ]
    },
    {
      title: 'Comprehensive Verification, Testing & Security Audit',
      objective: 'Execute end-to-end integration tests, address OWASP Top 10 vulnerabilities, and benchmark performance.',
      tasks: [
        { title: 'Execute Vitest suite and increase branch test coverage', hours: 10 },
        { title: 'Audit input sanitization, token security, and CORS policies', hours: 6 },
        { title: 'Conduct user acceptance walkthrough with simulated student personas', hours: 6 },
        { title: 'Optimize bundle size, asset loading, and Lighthouse scores', hours: 6 },
      ]
    },
    {
      title: 'Production Deployment & Cloud Infrastructure',
      objective: 'Deploy frontend and backend to production cloud hosting with automated monitoring.',
      tasks: [
        { title: 'Containerize backend service using multi-stage Dockerfile', hours: 6 },
        { title: 'Deploy frontend to global Edge CDN (Vercel / Firebase Hosting)', hours: 4 },
        { title: 'Configure custom domains, SSL certificates, and secret variables', hours: 4 },
        { title: 'Verify production uptime, health checks, and live telemetry', hours: 4 },
      ]
    },
    {
      title: 'Final Documentation, Viva Slides & Project Defense',
      objective: 'Prepare IEEE-format final year report, architecture poster, slide deck, and live demonstration sandbox.',
      tasks: [
        { title: 'Compile complete final report (Chapters 1-7 with test results)', hours: 14 },
        { title: 'Produce high-resolution system architecture and result diagrams', hours: 6 },
        { title: 'Prepare 15-minute defense presentation deck with key milestones', hours: 8 },
        { title: 'Rehearse live demonstration scenarios and defense Q&A answers', hours: 8 },
      ]
    }
  ];

  // Distribute across total weeks
  for (let w = 1; w <= weeks; w++) {
    const templateIndex = Math.floor(((w - 1) / weeks) * stageTemplates.length);
    const template = stageTemplates[templateIndex] || stageTemplates[stageTemplates.length - 1];

    milestones.push({
      id: `milestone-w${w}`,
      weekNumber: w,
      title: `Week ${w}: ${template.title}`,
      objective: template.objective,
      dependencies: w > 1 ? [`Week ${w - 1}`] : ['Project Approval'],
      tasks: template.tasks.map((task, tid) => ({
        id: `task-w${w}-${tid + 1}`,
        title: task.title,
        description: `Deliverable for Week ${w} milestones. Target completion: ${task.hours} hours.`,
        completed: false,
        estimatedHours: task.hours
      }))
    });
  }

  return {
    projectId: project.id,
    projectTitle: project.title,
    totalWeeks: weeks,
    milestones,
    generatedAt: new Date().toISOString()
  };
}
