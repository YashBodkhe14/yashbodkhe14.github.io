// ─────────────────────────────────────────────────────────────
//  ALL SITE CONTENT LIVES HERE. Source: Yash's resume (SDE 1, revised).
// ─────────────────────────────────────────────────────────────

export type LogEntry = {
  kind: 'work' | 'edu' | 'award'
  from: string
  to: string
  org: string
  role: string
  where?: string
  points: string[]
}

export type Project = {
  name: string
  year: string
  context: string
  blurb: string
  tags: string[]
  url?: string
  repo?: string
}

export const site = {
  first: 'YASH',
  last: 'BODKHE',
  role: 'SDE 1 · Platform & Payments',
  company: 'Bajaj Finserv',
  location: 'Pune, India',
  timezone: 'Asia/Kolkata',
  status: 'Building at Bajaj Finserv',
  email: 'yashbodkhe10@gmail.com',
  resumeUrl: './resume.pdf',
  socials: [{ label: 'LinkedIn', url: 'https://www.linkedin.com/in/yashbodkhe25/' }],
  // lede: plain, emphasised, plain
  lede: ['Platform and backend engineer in Pune. I run the Kubernetes, pipelines and payment APIs behind ', '~3M transactions a day', '.'],
  manifesto:
    'I work on the parts of a payments company nobody sees until they break: service meshes, private networks, release pipelines, logging that costs less and answers faster. I like taking a system that works and making it safer, cheaper and boring to deploy.',
  stats: [
    { n: 150, suffix: '+', label: 'microservices moved to Istio' },
    { n: 22, suffix: '', label: 'private AKS clusters' },
    { n: 60, suffix: '%', label: 'cut in logging costs' },
    { n: 3, suffix: 'M', label: 'payment transactions a day' },
  ],
}

export const log: LogEntry[] = [
  {
    kind: 'work',
    from: 'JUL 2024',
    to: 'NOW',
    org: 'Bajaj Finserv',
    role: 'SDE 1',
    where: 'Pune',
    points: [
      'Led the migration of 150+ microservices across 22 private AKS clusters from NGINX Ingress to Istio, with reusable Helm templates for routing and mTLS.',
      'Cut third-party logging costs by 60% and log-processing latency by 35% by moving ELK from VMs to AKS and routing logs through Logstash to Azure Data Explorer.',
      'Replaced Redis with Aerospike, improving cache read/write performance by 30%.',
      "Owned card lifecycle APIs in a 3-engineer team for Bajaj Pay's 13-service NCMC/RuPay platform: around 80–100 REST APIs across 6 channels, with Kafka and Azure Event Hubs workflows.",
      'Integrated payment aggregators with the Java 17 / Spring Boot gateway for UPI, cards and prepaid instruments across 25+ merchants.',
      'Removed public access to AKS API servers and Azure Container Registry with Private Link, and moved credentials into Azure Key Vault.',
      'Run Azure DevOps CI/CD for a payments ecosystem doing about 3M transactions a day: zero-downtime rolling releases, KEDA autoscaling, AKS upgrades.',
    ],
  },
  {
    kind: 'work',
    from: 'JAN 2024',
    to: 'JUN 2024',
    org: 'Bajaj Finserv',
    role: 'Software Engineer Intern',
    where: 'Pune',
    points: [
      'Automated builds, tests and deployments for UAT and production in Azure Pipelines, with GitHub Advanced Security scans for vulnerabilities and leaked secrets.',
      'Enabled dynamic file and path inputs across 75+ connector tools (S3, Snowflake, Databricks) with React and Angular components on Spring Boot APIs.',
      'Worked across 4+ teams to standardise parameter overrides and dataset naming; built reusable inputs, workflow-aware dialogs and conditional validation.',
    ],
  },
  {
    kind: 'award',
    from: '2026',
    to: '',
    org: "Prodigy'26",
    role: 'Bajaj Finserv',
    points: ['Outstanding Contribution to DevOps.'],
  },
  {
    kind: 'edu',
    from: '2024',
    to: '',
    org: 'PICT, Pune',
    role: 'B.E. E&TC · Honors in Data Science',
    points: [
      "SCTR's Pune Institute of Computer Technology. B.E. in Electronics and Telecommunication Engineering with Honors in Data Science. CGPA 8.65.",
      'Microsoft Certified: Azure Fundamentals (AZ-900).',
    ],
  },
]

export const projects: Project[] = [
  {
    name: 'Private LLM on Kubernetes',
    year: '2026',
    context: 'Side project',
    blurb: 'Private Llama 3.1 8B inference on NVIDIA T4 GPUs in AKS with Ollama, Qdrant and ArcadeDB. Local GGUF loading and Azure Files storage for nodes with no internet.',
    tags: ['AKS', 'Ollama', 'Qdrant', 'GPU'],
  },
  {
    name: 'Istio at scale',
    year: '',
    context: 'Bajaj Finserv',
    blurb: '150+ microservices across 22 private clusters moved from NGINX Ingress to Istio, with Helm templates teams reuse for routing and mTLS.',
    tags: ['Istio', 'Helm', 'mTLS', 'AKS'],
  },
  {
    name: 'Cheaper, faster logs',
    year: '',
    context: 'Bajaj Finserv',
    blurb: 'ELK moved from VMs onto AKS, with logs routed through Logstash into Azure Data Explorer. 60% lower cost, 35% lower latency.',
    tags: ['ELK', 'Logstash', 'ADX'],
  },
  {
    name: 'Bajaj Pay card APIs',
    year: '',
    context: 'Bajaj Finserv',
    blurb: 'Card lifecycle for a 13-service NCMC/RuPay platform: around 80–100 REST APIs across 6 channels on Kafka and Event Hubs.',
    tags: ['Java 17', 'Spring Boot', 'Kafka'],
  },
  {
    name: 'Release timeline',
    year: '',
    context: 'Bajaj Finserv',
    blurb: 'A Bash webhook that publishes Azure DevOps release events to a central monitoring API, so engineers share one deployment timeline for root-cause analysis.',
    tags: ['Azure DevOps', 'Bash', 'Observability'],
  },
]

export const stack: Record<string, string[]> = {
  cloud: ['Azure', 'AKS', 'ACR', 'Private Link', 'Key Vault', 'API Management', 'Terraform', 'AWS', 'Linux'],
  platform: ['Kubernetes', 'Docker', 'Helm', 'Istio', 'KEDA', 'Azure DevOps', 'GitHub Actions', 'Argo CD', 'Prometheus', 'Grafana', 'ELK'],
  backend: ['Java 17', 'Spring Boot', 'Python', 'Node.js', 'PostgreSQL', 'Kafka', 'Event Hubs', 'Redis', 'Aerospike', 'Bash'],
  security: ['Spring Security', 'JWT', 'RBAC', 'mTLS', 'GitHub Advanced Security', 'JUnit', 'Postman', 'JMeter', 'OpenAPI'],
  frontend: ['React', 'Angular', 'Axios', 'Git', 'Jira'],
}
