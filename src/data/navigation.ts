export interface NavItem {
  title: string;
  href: string;
  items?: NavItem[];
}

export interface NavSection {
  title: string;
  items: NavItem[];
  collapsed?: boolean;
}

export const docsNavigation: NavSection[] = [
  {
    title: "GETTING STARTED",
    items: [
      { title: "Overview", href: "/docs/getting-started/overview" },
      { title: "Authentication", href: "/docs/getting-started/authentication" },
      { title: "Quick Start", href: "/docs/getting-started/quickstart" },
    ],
  },
  {
    title: "CORE CONCEPTS",
    items: [
      { title: "Organizations", href: "/docs/concepts/organizations" },
      { title: "Wallets", href: "/docs/concepts/wallets" },
      { title: "Templates", href: "/docs/concepts/templates" },
      { title: "Objects", href: "/docs/concepts/objects" },
      { title: "Actions", href: "/docs/concepts/actions" },
      { title: "Faces", href: "/docs/concepts/faces" },
    ],
  },
  {
    title: "GUIDES",
    items: [
      { title: "Architecture Decisions", href: "/docs/guides/architecture-decisions" },
      { title: "Data Modelling", href: "/docs/guides/data-modelling" },
      { title: "Code Samples", href: "/docs/guides/code-samples" },
      { title: "Sandbox & Environments", href: "/docs/guides/sandbox" },
    ],
  },
  {
    title: "API REFERENCE",
    items: [
      { title: "Payments", href: "/docs/api/payments" },
      { title: "Support", href: "/docs/api/support" },
      { title: "Organizations", href: "/docs/api/organizations" },
      { title: "Wallets", href: "/docs/api/wallets" },
      { title: "API Keys", href: "/docs/api/apikeys" },
      { title: "Templates", href: "/docs/api/templates" },
      { title: "Objects", href: "/docs/api/objects" },
      { title: "Faces", href: "/docs/api/faces" },
      { title: "Event Bus", href: "/docs/api/ebus" },
      { title: "Storage", href: "/docs/api/storage" },
      { title: "Notifications", href: "/docs/api/notifications" },
      { title: "Webhooks", href: "/docs/api/webhooks" },
      { title: "Sequencer", href: "/docs/api/sequencer" },
      { title: "Public API", href: "/docs/api/indexer" },
    ],
  },
  {
    title: "INFRASTRUCTURE",
    items: [
      { title: "Sequencer", href: "/docs/infrastructure/sequencer" },
      { title: "ZK Rollup", href: "/docs/infrastructure/zk-rollup" },
      { title: "Smart Contracts", href: "/docs/infrastructure/smart-contracts" },
    ],
  },
  {
    title: "DEVELOPER TOOLS",
    items: [
      { title: "Overview", href: "/docs/developer-kit" },
      { title: "TypeScript SDK", href: "/docs/developer-kit/sdk" },
      { title: "CLI Tool", href: "/docs/developer-kit/cli" },
      { title: "Postman Collection", href: "/docs/developer-kit/postman" },
      { title: "OpenAPI Reference", href: "/docs/developer-kit/api-reference" },
      { title: "Migration Guide", href: "/docs/developer-kit/migration" },
      { title: "Error Reference", href: "/docs/developer-tools/error-reference" },
      { title: "Rate Limits", href: "/docs/developer-tools/rate-limits" },
    ],
  },
  {
    title: "AI TOOLS",
    items: [
      { title: "Overview", href: "/docs/ai-tools" },
      { title: "MCP Server", href: "/docs/developer-kit/mcp" },
      { title: "MCP Setup Guide", href: "/docs/developer-kit/mcp-guide" },
      { title: "Claude Plugins", href: "/docs/plugins" },
    ],
  },
  {
    title: "AI TUTORIALS",
    items: [
      { title: "AI Agent with MCP", href: "/docs/tutorials/ai-agent-mcp" },
      { title: "Token Classification", href: "/docs/tutorials/ai-token-classifier" },
      { title: "Conversational Assistant", href: "/docs/tutorials/ai-chatbot-integration" },
      { title: "Webhook Automation", href: "/docs/tutorials/ai-webhook-responder" },
      { title: "Semantic Search", href: "/docs/tutorials/ai-semantic-search" },
      { title: "Safety & Guardrails", href: "/docs/tutorials/ai-guardrails" },
    ],
  },
  {
    title: "TUTORIALS",
    items: [
      { title: "All Tutorials", href: "/docs/tutorials" },
      { title: "Create Your First Template", href: "/docs/tutorials/create-first-template" },
      { title: "Mint & Transfer Objects", href: "/docs/tutorials/mint-transfer-objects" },
      { title: "Build a Web Face", href: "/docs/tutorials/build-web-face" },
      { title: "Set Up Webhooks", href: "/docs/tutorials/setup-webhooks" },
      { title: "Integrate Payments", href: "/docs/tutorials/integrate-payments" },
      { title: "Batch Actions & Event Bus", href: "/docs/tutorials/batch-actions" },
      { title: "Roles & Permissions", href: "/docs/tutorials/org-roles-permissions" },
      { title: "Search & Filter Objects", href: "/docs/tutorials/search-filter-objects" },
      { title: "Querying the Public API", href: "/docs/tutorials/public-api-indexer" },
      { title: "Build a Real Estate App", href: "/docs/tutorials/build-real-estate-app" },
    ],
  },
  {
    title: "LEARN",
    items: [
      { title: "Learn DUAL", href: "/docs/learn" },
    ],
  },
  {
    title: "RESOURCES",
    items: [
      { title: "Support", href: "/docs/support" },
      { title: "Updates & Changelog", href: "/docs/updates" },
    ],
  },
];
