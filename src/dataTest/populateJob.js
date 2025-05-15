import mongoose from 'mongoose';
import Job from '../models/Job.js';
import 'dotenv/config';


// Detailed IT Jobs
// const itJobs = [
//   {
//     title: "Frontend Developer",
//     company: "TechCorp",
//     description: "Seeking a React.js specialist with 3+ years experience building responsive UIs using Redux, TypeScript, and Material-UI. You'll develop our customer dashboard with real-time data visualization using D3.js.",
//     requirements: [
//       "Proficiency in React, Redux, and TypeScript",
//       "Experience with RESTful APIs and GraphQL",
//       "Strong CSS/Sass skills with responsive design",
//       "Knowledge of Jest/React Testing Library"
//     ]
//   },
//   {
//     title: "Backend Engineer",
//     company: "DataSystems",
//     description: "Build scalable microservices with Node.js, NestJS, and Docker. Optimize MongoDB queries and implement our new authentication service using JWT and OAuth 2.0. Experience with Kafka event streaming required.",
//     requirements: [
//       "Expertise in Node.js and Express/NestJS",
//       "MongoDB schema design and optimization",
//       "Redis caching implementation",
//       "AWS Lambda and API Gateway"
//     ]
//   },
//   {
//     title: "DevOps Engineer",
//     company: "CloudNine",
//     description: "Implement CI/CD pipelines using GitHub Actions and ArgoCD. Manage our Kubernetes clusters on AWS EKS and optimize infrastructure costs using Terraform modules. On-call rotation for production incidents.",
//     requirements: [
//       "3+ years with Kubernetes and Docker",
//       "Infrastructure as Code (Terraform/Pulumi)",
//       "Monitoring with Prometheus/Grafana",
//       "Linux system administration"
//     ]
//   },
//   {
//     title: "Data Scientist",
//     company: "AI Innovations",
//     description: "Develop computer vision models using PyTorch for our medical imaging SaaS. Clean and preprocess DICOM datasets, implement MLOps pipelines with MLflow, and present findings to stakeholders.",
//     requirements: [
//       "PhD in Computer Science or related field",
//       "Publications in CVPR/NeurIPS preferred",
//       "Python (NumPy, Pandas, Scikit-learn)",
//       "SQL and big data tools (Spark, Hadoop)"
//     ]
//   },
//   {
//     title: "Cybersecurity Analyst",
//     company: "SecureNet",
//     description: "Conduct penetration testing using Burp Suite and Metasploit. Monitor SIEM alerts (Splunk), investigate incidents with MITRE ATT&CK framework, and harden our AWS infrastructure against Zero-Day vulnerabilities.",
//     requirements: [
//       "CEH or OSCP certification required",
//       "Network security protocols (TLS, IPSec)",
//       "Static code analysis (SonarQube)",
//       "NIST Cybersecurity Framework"
//     ]
//   },
//   // 10 more IT jobs...
// ];

// // Detailed Business Jobs
// const businessJobs = [
//   {
//     title: "Financial Analyst",
//     company: "Capital Investments",
//     description: "Prepare quarterly reports using advanced Excel modeling and Power BI. Analyze portfolios with Bloomberg Terminal and develop forecasting models for our wealth management division.",
//     requirements: [
//       "CFA or CPA certification preferred",
//       "Advanced Excel (VBA, Power Query)",
//       "3+ years financial modeling experience",
//       "Knowledge of GAAP standards"
//     ]
//   },
//   {
//     title: "Marketing Manager",
//     company: "Brand Masters",
//     description: "Lead digital campaigns across Google Ads and Meta. Analyze HubSpot data and optimize $500k/month ad spend using conversion rate optimization techniques.",
//     requirements: [
//       "5+ years managing paid social campaigns",
//       "Google Analytics 4 certification",
//       "A/B testing and landing page optimization",
//       "Marketing automation tools"
//     ]
//   },
//   {
//     title: "HR Business Partner",
//     company: "TalentFinders",
//     description: "Implement Workday HCM modules for our 500-employee org. Lead talent acquisition strategy, conduct compensation benchmarking, and resolve complex employee relations cases.",
//     requirements: [
//       "PHR/SPHR certification preferred",
//       "Workday or BambooHR experience",
//       "Knowledge of ADA/FMLA regulations",
//       "Workforce analytics (Tableau)"
//     ]
//   },
//   // 12 more Business jobs...
// ];
const itJobs = [
  {
    title: "Cloud Solutions Architect",
    company: "AzureMasters",
    description: "Design and implement multi-cloud architectures using AWS, Azure, and GCP. Develop infrastructure blueprints for Fortune 500 clients and lead cloud migration projects with Terraform.",
    requirements: [
      "AWS/Azure/GCP certifications required",
      "5+ years designing cloud-native apps",
      "Expertise in serverless architectures",
      "Kubernetes CKA certification preferred"
    ]
  },
  {
    title: "Blockchain Developer",
    company: "ChainInnovate",
    description: "Build smart contracts using Solidity for our DeFi platform. Optimize gas fees and implement zero-knowledge proofs for private transactions on Ethereum L2 solutions.",
    requirements: [
      "3+ years Solidity development",
      "Experience with Hardhat/Truffle",
      "Understanding of Merkle trees",
      "Previous DeFi project experience"
    ]
  },
  {
    title: "Site Reliability Engineer",
    company: "AlwaysUp",
    description: "Maintain 99.99% uptime for our global e-commerce platform. Implement chaos engineering practices with Gremlin and automate incident response with PagerDuty workflows.",
    requirements: [
      "SLO/SLI definition experience",
      "Python/Go scripting skills",
      "Istio service mesh knowledge",
      "On-call rotation participation"
    ]
  },
  {
    title: "AI Prompt Engineer",
    company: "LLM Labs",
    description: "Design and optimize prompts for our enterprise GPT-4 implementation. Develop RAG architectures and fine-tune embeddings for domain-specific knowledge retrieval.",
    requirements: [
      "Experience with LangChain",
      "Python NLP libraries",
      "Understanding of transformer architectures",
      "Portfolio of effective prompts"
    ]
  },
  {
    title: "Game Developer (Unity)",
    company: "MetaVerse Games",
    description: "Develop multiplayer VR experiences using Unity's XR toolkit. Optimize 3D assets for Quest 3 and implement photorealistic shaders with Shader Graph.",
    requirements: [
      "Shipped 2+ Unity titles",
      "C# DOTS/ECS experience",
      "VR performance optimization",
      "Photon/Netcode for GameObjects"
    ]
  },
  {
    title: "Quantum Computing Researcher",
    company: "Qubit Systems",
    description: "Develop quantum algorithms for protein folding simulations using Qiskit. Research error correction techniques for our 128-qubit superconducting processor.",
    requirements: [
      "PhD in Quantum Physics",
      "Published papers in Nature Quantum",
      "Q#/Cirq experience",
      "Understanding of topological qubits"
    ]
  },
  {
    title: "Embedded Systems Engineer",
    company: "IoT Solutions",
    description: "Develop firmware for our industrial IoT sensors using FreeRTOS. Optimize power consumption for 5-year battery life and implement LoRaWAN communication protocols.",
    requirements: [
      "ARM Cortex-M experience",
      "BLE/WiFi 6 Low Power",
      "Oscilloscope proficiency",
      "MISRA C compliance"
    ]
  },
  {
    title: "AR/VR UX Designer",
    company: "Immersive Tech",
    description: "Design spatial interfaces for our enterprise AR platform. Conduct user studies with HoloLens 2 and prototype interactions in Figma/Unity.",
    requirements: [
      "3+ years XR design",
      "Spatial UI principles",
      "Figma prototyping",
      "Understanding of vergence-accommodation conflict"
    ]
  },
  {
    title: "Bioinformatics Engineer",
    company: "Genome Analytics",
    description: "Develop pipelines for CRISPR analysis using Python/R. Optimize genome alignment algorithms and visualize results in custom Dash/Plotly interfaces.",
    requirements: [
      "Next-Gen Sequencing experience",
      "Bioconductor proficiency",
      "AWS Batch pipeline development",
      "Single-cell RNA-seq analysis"
    ]
  },
  {
    title: "Technical Writer (API Docs)",
    company: "DevHub",
    description: "Create developer documentation for our GraphQL API. Generate code samples in 5 languages and maintain OpenAPI specifications with Redocly.",
    requirements: [
      "Swagger/OpenAPI expertise",
      "Markdown/MkDocs proficiency",
      "Basic GraphQL knowledge",
      "Postman/Insomnia testing"
    ]
  }
];

const businessJobs = [
  {
    title: "Private Equity Associate",
    company: "BlackStone Capital",
    description: "Analyze LBO models for middle-market acquisitions. Conduct due diligence on target companies and prepare investment committee memos with 10-year DCF projections.",
    requirements: [
      "2+ years IB/PE experience",
      "Advanced LBO modeling",
      "Bloomberg Terminal mastery",
      "Series 79 license"
    ]
  },
  {
    title: "Supply Chain Analyst",
    company: "Global Logistics",
    description: "Optimize our international freight network using AnyLogistix. Reduce lead times by 20% through nearshoring analysis and implement digital twin technology.",
    requirements: [
      "SAP S/4HANA experience",
      "Python for supply chain optimization",
      "Incoterms 2020 knowledge",
      "Six Sigma Green Belt"
    ]
  },
  {
    title: "ESG Reporting Specialist",
    company: "GreenFuture",
    description: "Prepare GRI/SASB-compliant sustainability reports. Calculate Scope 3 emissions and develop carbon offset strategies for our manufacturing division.",
    requirements: [
      "Sustainability accounting degree",
      "CDP reporting experience",
      "Life Cycle Assessment tools",
      "TCFD framework knowledge"
    ]
  },
  {
    title: "M&A Integration Manager",
    company: "MegaCorp",
    description: "Lead post-merger integration for $1B+ acquisitions. Develop 100-day plans and harmonize ERP systems across merged entities while retaining key talent.",
    requirements: [
      "5+ deals closed",
      "Change management certification",
      "Workday/SAP migration experience",
      "Cross-cultural team leadership"
    ]
  },
  {
    title: "Pricing Strategist",
    company: "PriceSmart",
    description: "Implement dynamic pricing algorithms using PROS software. Conduct conjoint analysis to determine price elasticity and optimize our $200M product portfolio.",
    requirements: [
      "MBA in Quantitative Marketing",
      "R/Python for pricing models",
      "Retail pricing experience",
      "Competitive intelligence tools"
    ]
  },
  {
    title: "Corporate Development Analyst",
    company: "Fortune 500",
    description: "Identify and evaluate acquisition targets in the SaaS sector. Build integrated financial models and coordinate cross-functional due diligence teams.",
    requirements: [
      "Top-tier consulting background",
      "3-statement modeling expertise",
      "TAM/SAM/SOM analysis",
      "CIM redflag identification"
    ]
  },
  {
    title: "Customer Success Manager (Enterprise)",
    company: "SaaSScale",
    description: "Manage relationships with 20+ Fortune 500 accounts. Drive product adoption through QBRs and achieve 120% NRR through expansion plays.",
    requirements: [
      "7+ years in CSM roles",
      "MEDDIC certification",
      "Salesforce dashboards",
      "Technical product demos"
    ]
  },
  {
    title: "Regulatory Affairs Specialist",
    company: "PharmaGlobal",
    description: "Prepare FDA/EMA submissions for our oncology pipeline. Lead interactions with health authorities and ensure GMP compliance across 5 manufacturing sites.",
    requirements: [
      "PharmD degree",
      "eCTD submission experience",
      "21 CFR Part 11 knowledge",
      "Clinical trial documentation"
    ]
  },
  {
    title: "Real Estate Asset Manager",
    company: "Skyline Properties",
    description: "Manage $750M commercial portfolio. Analyze NOI improvements, negotiate NNN leases, and oversee CapEx projects across 3M sq ft of Class A office space.",
    requirements: [
      "Argus Enterprise certification",
      "5+ years CRE experience",
      "Debt restructuring knowledge",
      "Local zoning regulations"
    ]
  },
  {
    title: "Chief of Staff",
    company: "StartUp Ventures",
    description: "Act as force multiplier for the CEO. Prepare board materials, run OKR processes, and spearhead special projects from market expansion to fundraising.",
    requirements: [
      "Ex-consultant or VC associate",
      "MBA from top program",
      "Deck storytelling skills",
      "80-hour workweek tolerance"
    ]
  }
];

// Generate embeddings (replace with real implementation)
function generateEmbedding() {
  return Array(384).fill(0).map(() => (Math.random() * 2) - 1);
}

async function populateJobs() {
  try {
    await Job.deleteMany({});

    const allJobs = [...itJobs, ...businessJobs].map(job => ({
      ...job,
      location: job.title.includes('Developer') ? 'Remote' : 'New York, NY',
      embedding: generateEmbedding(),
      createdAt: new Date()
    }));

    await Job.insertMany(allJobs);
    console.log(`Inserted ${allJobs.length} jobs with detailed descriptions`);
  } catch (err) {
    console.error("Population failed:", err);
  } finally {
    mongoose.disconnect();
  }
}

try {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('Connected to MongoDB');
  populateJobs();
} catch (err) {
  console.error(err);
}