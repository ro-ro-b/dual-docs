export interface ConceptPage {
  title: string;
  description: string;
  sectionLabel: string;
  sectionHref: string;
  content: string;
}

export const conceptPages: Record<string, ConceptPage> = {
  "getting-started/overview": {
    title: "Overview",
    description: "Step-by-step guide to getting started with the DUAL platform: from authentication to creating your first tokenized object.",
    sectionLabel: "Getting Started",
    sectionHref: "/docs/getting-started/overview",
    content: `
      <h2>What is DUAL?</h2>
      <p>DUAL is a tokenization engine for real-world assets. It provides modular blockchain infrastructure that enables secure digital interactions through a hybrid on-chain/off-chain architecture.</p>
      <p>The platform consists of several core services: a <strong>Gateway</strong> for API routing, an <strong>Event Bus</strong> for action processing, a <strong>Sequencer</strong> for batching and ordering, and an <strong>Indexer</strong> for querying on-chain state.</p>

      <h2>Architecture Overview</h2>
      <p>DUAL uses an optimistic ZK-rollup architecture. Actions are processed off-chain for speed, batched by the Sequencer, and anchored on-chain as fingerprints with a 4-hour fraud challenge window. Optional ZK proofs provide additional verification.</p>
      <p>All user requests are signed using <code>EIP-712</code> typed data signatures, providing cryptographic proof of intent without requiring on-chain transactions for every action.</p>

      <h2>Key Primitives</h2>
      <ul>
        <li><strong>Organizations</strong> — Multi-tenant workspaces with role-based access control</li>
        <li><strong>Wallets</strong> — Identity primitive for authentication and ownership</li>
        <li><strong>Templates</strong> — Define the structure and properties of tokenized objects</li>
        <li><strong>Objects</strong> — Instances of templates representing real-world or digital assets</li>
        <li><strong>Actions</strong> — Operations executed on objects via the Event Bus</li>
        <li><strong>Faces</strong> — Visual representations attached to templates (images, 3D, web views)</li>
      </ul>

      <h2>Next Steps</h2>
      <p>Head to <a href="/docs/getting-started/authentication">Authentication</a> to set up your API credentials, or jump to the <a href="/docs/getting-started/quickstart">Quick Start</a> to create your first object.</p>
    `,
  },
  "getting-started/authentication": {
    title: "Authentication",
    description: "How to authenticate with the DUAL API using JWT tokens and API keys.",
    sectionLabel: "Getting Started",
    sectionHref: "/docs/getting-started/overview",
    content: `
      <h2>Authentication Methods</h2>
      <p>The DUAL API supports two authentication methods that can be used independently or together:</p>

      <h3>Bearer JWT Token</h3>
      <p>Obtain a JWT token by calling the <code>POST /wallets/login</code> endpoint with your credentials. Include the token in subsequent requests via the <code>Authorization</code> header:</p>
      <pre><code>Authorization: Bearer eyJhbGciOiJIUzI1NiIs...</code></pre>

      <h3>API Key</h3>
      <p>Create an API key through the dashboard or via <code>POST /api-keys</code>. Include it in the <code>x-api-key</code> header:</p>
      <pre><code>x-api-key: your-api-key-here</code></pre>

      <h2>Security Model</h2>
      <p>DUAL implements a 5-layer security architecture:</p>
      <ul>
        <li><strong>Layer 1</strong> — EIP-712 typed data signatures for all state-changing requests</li>
        <li><strong>Layer 2</strong> — Hash chain integrity for action ordering</li>
        <li><strong>Layer 3</strong> — Batch fingerprinting for on-chain anchoring</li>
        <li><strong>Layer 4</strong> — ZK proof verification for dispute resolution</li>
        <li><strong>Layer 5</strong> — Smart contract enforcement on Ethereum</li>
      </ul>

      <h2>Rate Limits</h2>
      <p>API requests are rate-limited per organization. Contact support for higher limits.</p>
    `,
  },
  "getting-started/quickstart": {
    title: "Quick Start",
    description: "Create your first tokenized object in under 5 minutes.",
    sectionLabel: "Getting Started",
    sectionHref: "/docs/getting-started/overview",
    content: `
      <h2>Prerequisites</h2>
      <p>Before you begin, make sure you have:</p>
      <ul>
        <li>A registered wallet account (<code>POST /wallets/register</code>)</li>
        <li>An organization created (<code>POST /organizations</code>)</li>
        <li>An API key (<code>POST /api-keys</code>)</li>
      </ul>

      <h2>Step 1: Create a Template</h2>
      <p>Templates define the structure of your objects. Create one with <code>POST /templates</code>:</p>
      <pre><code>{
  "name": "io.example.product",
  "description": "A product token template",
  "private": {
    "serial_number": "",
    "manufacture_date": ""
  }
}</code></pre>

      <h2>Step 2: Create a Template Variation</h2>
      <p>Variations define specific configurations of a template. Use <code>POST /templates/{templateId}/variations</code>.</p>

      <h2>Step 3: Register a Face</h2>
      <p>Faces define how your objects are visually represented. Register one with <code>POST /faces</code>:</p>
      <pre><code>{
  "template": "io.example.product",
  "display_type": "image",
  "url": "https://example.com/product-image.png"
}</code></pre>

      <h2>Step 4: Register Actions</h2>
      <p>Actions define what operations can be performed on objects. Create action types with <code>POST /ebus/action-types</code>.</p>

      <h2>Step 5: Emit an Object</h2>
      <p>Finally, create (emit) an object instance by executing an emit action through the Event Bus: <code>POST /ebus/actions</code>.</p>
    `,
  },
  "concepts/organizations": {
    title: "Organizations",
    description: "Multi-tenant workspaces with role-based access control for managing teams and resources.",
    sectionLabel: "Core Concepts",
    sectionHref: "/docs/concepts/organizations",
    content: `
      <h2>What are Organizations?</h2>
      <p>Organizations are the top-level entity in DUAL's multi-tenant architecture. They provide isolated workspaces for teams to manage templates, objects, and API keys.</p>

      <h2>Roles & Permissions</h2>
      <p>Each organization has customizable roles with granular permissions. Default roles include Owner, Admin, and Member. Create custom roles with <code>POST /organizations/{id}/roles</code>.</p>

      <h2>Invitations</h2>
      <p>Invite members via email using <code>POST /organizations/{id}/invitations</code>. Invitees accept via a unique invitation link.</p>

      <h2>Balance & Billing</h2>
      <p>Track organization balance and transaction history with the balance endpoints. Deposits are managed through the payments system.</p>
    `,
  },
  "concepts/wallets": {
    title: "Wallets",
    description: "The primary identity primitive for authentication and asset ownership on the DUAL network.",
    sectionLabel: "Core Concepts",
    sectionHref: "/docs/concepts/organizations",
    content: `
      <h2>What are Wallets?</h2>
      <p>Wallets are the identity layer in DUAL. Every user has a wallet that serves as their authentication credential and ownership proof for objects.</p>

      <h2>Registration Flow</h2>
      <p>Register with <code>POST /wallets/register</code>, then verify with <code>POST /wallets/register/verify</code>. Guest login is available for anonymous access.</p>

      <h2>Linked Wallets</h2>
      <p>Users can link multiple wallets together, enabling cross-identity asset management. Use <code>POST /wallets/link</code> to connect wallets.</p>
    `,
  },
  "concepts/templates": {
    title: "Templates",
    description: "Define the structure, properties, and behavior of tokenized objects.",
    sectionLabel: "Core Concepts",
    sectionHref: "/docs/concepts/organizations",
    content: `
      <h2>What are Templates?</h2>
      <p>Templates are the blueprint for objects. They define private fields, resource types, and default values. Think of them as classes in object-oriented programming — objects are instances.</p>

      <h2>Template Variations</h2>
      <p>Variations allow you to create different configurations of a template without duplicating the base structure. Each variation can override properties and define unique characteristics.</p>

      <h2>Naming Convention</h2>
      <p>Templates use reverse-domain notation: <code>io.example.product.v1</code>. This ensures uniqueness across organizations.</p>
    `,
  },
  "concepts/objects": {
    title: "Objects",
    description: "Tokenized instances of templates representing real-world or digital assets.",
    sectionLabel: "Core Concepts",
    sectionHref: "/docs/concepts/organizations",
    content: `
      <h2>What are Objects?</h2>
      <p>Objects are the core asset unit in DUAL — tokenized representations of real-world or digital items. Each object is an instance of a template and carries its own state, ownership, and activity history.</p>

      <h2>Object Relationships</h2>
      <p>Objects can have parent-child relationships, enabling hierarchical asset structures. Query relationships with <code>GET /objects/{id}/children</code> and <code>GET /objects/{id}/parents</code>.</p>

      <h2>Activity Log</h2>
      <p>Every action performed on an object is recorded in its activity log, providing a complete audit trail. Access it via <code>GET /objects/{id}/activity</code>.</p>

      <h2>Search & Discovery</h2>
      <p>Use <code>POST /objects/search</code> for flexible querying with filters, or <code>GET /objects/{id}/geo</code> for geographic proximity searches.</p>
    `,
  },
  "concepts/actions": {
    title: "Actions",
    description: "Operations executed on objects through the DUAL Event Bus.",
    sectionLabel: "Core Concepts",
    sectionHref: "/docs/concepts/organizations",
    content: `
      <h2>What are Actions?</h2>
      <p>Actions are the primary way to interact with objects on the DUAL network. They are executed through the Event Bus and can trigger state changes, transfers, or custom logic.</p>

      <h2>Action Types</h2>
      <p>Define custom action types with <code>POST /ebus/action-types</code>. Each type specifies the behavior, validation rules, and required parameters.</p>

      <h2>Batch Execution</h2>
      <p>Execute multiple actions atomically with <code>POST /ebus/actions/batch</code>. Batches are processed by the Sequencer and anchored on-chain.</p>
    `,
  },
  "concepts/faces": {
    title: "Faces",
    description: "Visual representations attached to templates — images, 3D models, and web views.",
    sectionLabel: "Core Concepts",
    sectionHref: "/docs/concepts/organizations",
    content: `
      <h2>What are Faces?</h2>
      <p>Faces define how objects are visually presented. A template can have multiple faces for different contexts — a thumbnail, a full-size image, a 3D model, or an interactive web view.</p>

      <h2>Face Types</h2>
      <ul>
        <li><strong>Image</strong> — Static image representation</li>
        <li><strong>Image Progress</strong> — Image with progress overlay</li>
        <li><strong>Image Policy</strong> — Policy-controlled image display</li>
        <li><strong>Image Layered</strong> — Composited multi-layer image</li>
        <li><strong>3D</strong> — Three-dimensional model viewer</li>
        <li><strong>Web</strong> — Interactive web view (HTML/JS)</li>
      </ul>

      <h2>Template Association</h2>
      <p>Faces are associated with templates, not individual objects. All objects of a given template share the same face definitions. Manage faces with the <code>/faces</code> endpoints.</p>
    `,
  },
  "infrastructure/sequencer": {
    title: "Sequencer",
    description: "The batching and ordering layer for the DUAL optimistic ZK-rollup.",
    sectionLabel: "Infrastructure",
    sectionHref: "/docs/infrastructure/sequencer",
    content: `
      <h2>How the Sequencer Works</h2>
      <p>The Sequencer collects actions from the Event Bus, orders them deterministically, and groups them into batches. Each batch produces a fingerprint that gets anchored on-chain.</p>

      <h2>Batches</h2>
      <p>A batch contains a set of ordered actions with a cryptographic fingerprint. Query batches via <code>GET /batches</code> and individual batch details via <code>GET /batches/{batchId}</code>.</p>

      <h2>Checkpoints</h2>
      <p>Checkpoints are periodic snapshots of the platform state. They enable efficient state verification without replaying the entire action history.</p>
    `,
  },
  "infrastructure/zk-rollup": {
    title: "ZK Rollup",
    description: "The optimistic ZK-rollup architecture powering DUAL's hybrid on-chain/off-chain system.",
    sectionLabel: "Infrastructure",
    sectionHref: "/docs/infrastructure/sequencer",
    content: `
      <h2>Optimistic ZK-Rollup</h2>
      <p>DUAL uses an optimistic rollup approach where batches of off-chain actions are compressed into fingerprints and anchored on Ethereum. A 4-hour fraud challenge window allows validators to dispute invalid state transitions.</p>

      <h2>ZK Proofs</h2>
      <p>When disputes arise, SP1-based zero-knowledge proofs are generated to cryptographically verify the correctness of state transitions without revealing the underlying data.</p>

      <h2>Benefits</h2>
      <ul>
        <li>High throughput — thousands of actions per second off-chain</li>
        <li>Low cost — only fingerprints are written on-chain</li>
        <li>Security — full Ethereum L1 security via fraud proofs</li>
        <li>Privacy — ZK proofs enable private verification</li>
      </ul>
    `,
  },
  "infrastructure/smart-contracts": {
    title: "Smart Contracts",
    description: "The Solidity contracts that anchor DUAL's state on Ethereum.",
    sectionLabel: "Infrastructure",
    sectionHref: "/docs/infrastructure/sequencer",
    content: `
      <h2>Contract Architecture</h2>
      <p>DUAL deploys 6 core smart contracts on Ethereum:</p>
      <ul>
        <li><strong>BridgedNFTs</strong> — Asset registry for bridging tokens between L1 and L2</li>
        <li><strong>BatchRegistry</strong> — Anchors batch fingerprints on-chain</li>
        <li><strong>MultiTokenDeposit</strong> — Fee vault supporting ETH, USDC, and DUAL token deposits</li>
        <li><strong>FeeDispatcher</strong> — Revenue distribution (75% to stakers, 25% to protocol)</li>
        <li><strong>Staking</strong> — DUAL/xDUAL token staking with Synthetix reward model</li>
        <li><strong>Ledger</strong> — Immutable action log for audit trail</li>
      </ul>

      <h2>DUAL Token</h2>
      <p>Stake DUAL tokens to receive xDUAL, which provides governance voting power and a share of protocol fees. The staking contract implements the Synthetix reward distribution model.</p>
    `,
  },
  "guides/architecture-decisions": {
    title: "Architecture Decisions",
    description: "When to use what — practical guidance for designing your DUAL application.",
    sectionLabel: "Guides",
    sectionHref: "/docs/guides/architecture-decisions",
    content: `
      <h2>Single vs Multiple Templates</h2>
      <p>One of the first architectural decisions is whether to use a single template for all asset types or separate templates for each. The rule of thumb: <strong>if the properties differ significantly between asset types, use separate templates. If only the values differ, use one template.</strong></p>
      <p>For example, if you're tokenizing real estate, you might have properties like bedrooms, sqft, and price that are universal. In this case, one template works well. But if you also want to tokenize vehicles with properties like engine type and VIN, those are fundamentally different — use a separate template.</p>
      <p>Benefits of separate templates: clearer schema separation, easier validation, simpler action definitions, better indexing. Benefits of a single template: less setup, simpler client logic, unified querying.</p>

      <h2>Event Bus vs Webhooks</h2>
      <p>The Event Bus and webhooks serve different purposes in your architecture. <strong>Use the Event Bus to execute actions (write operations) and webhooks to receive notifications about what happened (read operations).</strong></p>
      <p>Event Bus is for triggering state changes: minting an object, transferring ownership, updating properties. Webhooks are for reacting to those changes: notifying a user when they received an asset, syncing to an external database, triggering a workflow.</p>
      <p>In practice, your architecture flows like this: Client → Event Bus (write) → Sequencer → State change → Webhook (notification) → Your backend (read/react). Never use webhooks for critical state changes — they're best-effort.</p>

      <h2>Roles & Permission Design</h2>
      <p>Structure your organization's roles to balance security and usability. Start simple: <strong>3 base roles: Admin (full access), Operator (can mint/transfer objects), Viewer (read-only access).</strong></p>
      <p>Admin has unrestricted access to templates, API keys, billing, and members. Operators can execute actions on objects and view templates but cannot modify template definitions or manage API keys. Viewers can only see objects and historical data.</p>
      <p>As your team grows, add custom roles: QA (can mint test objects), Finance (can view billing but not change), Support (can view objects and activity logs). Use the custom roles API: <code>POST /organizations/{id}/roles</code>.</p>
      <p>Pro tip: Rotate API keys quarterly and use different keys for different environments (dev/staging/prod). Limit API key scope to specific templates or actions when possible.</p>

      <h2>On-chain vs Off-chain Storage</h2>
      <p>Understanding what lives on-chain vs off-chain is critical for cost and performance. <strong>Object properties are stored off-chain (fast, mutable). The Sequencer batches and anchors only fingerprints on-chain (immutable proof).</strong></p>
      <p>Use off-chain storage (DUAL's default) for metadata, properties, and mutable state: addresses, current owner, status, timestamp. Use on-chain anchoring for immutable proofs: ownership history, transaction audits, fraud challenge windows.</p>
      <p>Cost implication: storing 1 million properties off-chain costs ~$10k/month in DUAL storage fees. Anchoring 1 million objects on-chain (in batches) costs ~$100/day in gas. Most use cases benefit from hybrid: keep properties off-chain, anchor critical ownership events on-chain.</p>

      <h2>Direct API vs SDK vs CLI</h2>
      <p>Three ways to interact with DUAL, each suited to different scenarios:</p>
      <ul>
        <li><strong>SDK (@dual/sdk)</strong> — Best for production applications. TypeScript library with type safety, request signing, error handling, and retry logic. Use this for web apps, mobile backends, and services.</li>
        <li><strong>CLI (@dual/cli)</strong> — Best for testing, scripting, and one-off operations. Use it for bulk minting from CSV, local development, debugging, and CI/CD pipelines.</li>
        <li><strong>Direct API (HTTP REST)</strong> — Use this when you need fine-grained control, work in a non-TypeScript language (Python, Go, Rust), or want to integrate with existing HTTP client libraries.</li>
      </ul>
      <p>Production rule: Always use the SDK. It handles request signing and has battle-tested error handling. Only use direct API if you have a specific reason (language constraint, legacy integration).</p>

      <h2>Template Versioning Strategy</h2>
      <p>Templates with live objects can never be modified. Plan for versioning from day one. <strong>Name templates with a version suffix: <code>my-org::property::v1</code>, <code>my-org::property::v2</code></strong>.</p>
      <p>When you need to add a field or change validation, create a new template version. Migrate existing objects to the new template with a batch action. Never try to modify a template with live objects — it will fail.</p>
      <p>Strategy: Use v1 for MVP, v2 when you need schema changes. Keep the old template around for 3 months so clients can still query old objects. Add a deprecation notice in your docs.</p>
      <p>Example flow: Create <code>property::v1</code>, mint 1000 objects. Need to add square footage field? Create <code>property::v2</code>, write a migration script that creates new objects with both old and new data, archive v1.</p>
    `,
  },
  "guides/data-modelling": {
    title: "Data Modelling Cookbook",
    description: "Template schemas for common tokenisation use cases with example JSON.",
    sectionLabel: "Guides",
    sectionHref: "/docs/guides/data-modelling",
    content: `
      <h2>Real Estate Properties</h2>
      <p>For tokenizing real estate, model the property itself as the object. Include both immutable identifiers and mutable state.</p>
      <p><strong>Key properties:</strong> address, square footage, bedrooms, bathrooms, price, current status (available/sold/pending), geolocation coordinates, property tax ID, year built.</p>
      <p><strong>Actions:</strong> reserve (locks for 48 hours), purchase (transfers ownership + records on-chain), transfer (change owner), update-listing (price, status).</p>
      <p>Example template schema:</p>
      <pre><code>{
  "name": "com.realestate.property::v1",
  "description": "Tokenized real estate property",
  "private": {
    "address": "123 Main St, Springfield, IL",
    "sqft": 3500,
    "bedrooms": 4,
    "bathrooms": 2.5,
    "price_usd": 450000,
    "status": "available",
    "geo_latitude": 39.7817,
    "geo_longitude": -89.6501,
    "property_tax_id": "IL-555-123-456",
    "year_built": 2005,
    "listing_agent": "agent@broker.com",
    "last_updated": "2026-03-14T10:00:00Z"
  }
}</code></pre>

      <h2>Event Tickets</h2>
      <p>Event tickets are a perfect use case for DUAL — unique, transferable, and time-limited.</p>
      <p><strong>Key properties:</strong> event name, venue, date/time, seat assignment, ticket tier (VIP/standard/general), admission status (not-used/used/refunded), seat section, row, number.</p>
      <p><strong>Actions:</strong> validate (check-in), transfer (resale), refund (mark as refunded), update-metadata (event changed).</p>
      <p>Example template schema:</p>
      <pre><code>{
  "name": "io.eventtech.ticket::v1",
  "description": "Event admission ticket",
  "private": {
    "event_name": "Summer Music Festival 2026",
    "venue": "Central Park, NYC",
    "event_date": "2026-07-15T18:00:00Z",
    "event_id": "EVT-2026-SUMMER",
    "seat_section": "A",
    "seat_row": "12",
    "seat_number": "45",
    "tier": "VIP",
    "price_usd": 250,
    "is_used": false,
    "checked_in_at": null,
    "transferable_until": "2026-07-15T17:00:00Z"
  }
}</code></pre>

      <h2>Loyalty Points</h2>
      <p>Loyalty points can be tokenized for transparency and transferability. Model as an object with a mutable balance and history.</p>
      <p><strong>Key properties:</strong> current balance, tier level (bronze/silver/gold), earn rate multiplier, redemption history (array of past redemptions), expiry date, program ID.</p>
      <p><strong>Actions:</strong> earn (add points), redeem (deduct points, create reward), transfer (move between wallets), tier-upgrade (promotion).</p>
      <p>Example template schema:</p>
      <pre><code>{
  "name": "com.retail.loyaltypoints::v1",
  "description": "Tokenized loyalty program points",
  "private": {
    "program_id": "ELITE_REWARDS",
    "holder_name": "John Doe",
    "current_balance": 5250,
    "tier": "gold",
    "earn_rate_multiplier": 2.0,
    "points_earned_total": 12500,
    "points_redeemed_total": 7250,
    "redemption_history": [
      {"date": "2026-02-01", "points": 1000, "reward": "dinner_voucher"},
      {"date": "2026-01-15", "points": 500, "reward": "discount_code"}
    ],
    "tier_upgrade_date": "2026-01-01",
    "expires_at": "2027-03-14"
  }
}</code></pre>

      <h2>Certificates & Credentials</h2>
      <p>Professional credentials, certificates, and diplomas are ideal DUAL use cases — immutable, verifiable, and transferable.</p>
      <p><strong>Key properties:</strong> holder name, issue date, expiry date, issuing organization, credential type (degree/certification/license), verification status, issuer digital signature.</p>
      <p><strong>Actions:</strong> verify (issuer confirms), revoke (remove validity), renew (extend expiry), update-holder (name change).</p>
      <p>Example template schema:</p>
      <pre><code>{
  "name": "io.credentialing.certificate::v1",
  "description": "Professional certificate or credential",
  "private": {
    "holder_name": "Jane Smith",
    "holder_email": "jane@example.com",
    "credential_type": "aws_solutions_architect",
    "issuer": "Amazon Web Services",
    "issued_date": "2024-05-15",
    "expiry_date": "2027-05-15",
    "credential_id": "AWS-12345-67890",
    "score_or_grade": "98%",
    "verification_status": "verified",
    "issuer_signature": "0x...",
    "issuer_public_key": "0x..."
  }
}</code></pre>

      <h2>Collectibles & NFTs</h2>
      <p>Digital collectibles and NFTs benefit from DUAL's rich metadata and action system. Include edition information, rarity, and media references.</p>
      <p><strong>Key properties:</strong> name, artist/creator, edition number, total editions, rarity (common/rare/epic/legendary), media URL, metadata hash, creation date.</p>
      <p><strong>Actions:</strong> transfer (resale), list-for-sale (marketplace), delist, burn (retire).</p>
      <p>Example template schema:</p>
      <pre><code>{
  "name": "io.collectibles.nft::v1",
  "description": "Digital collectible with edition tracking",
  "private": {
    "name": "Cosmic Wanderer #42",
    "artist": "Luna Studios",
    "artist_wallet": "0x742d35Cc6634C0532925a3b844Bc9e7595f50e7e",
    "edition_number": 42,
    "total_editions": 500,
    "rarity": "rare",
    "media_url": "ipfs://QmXxxx...",
    "media_type": "image/png",
    "metadata_hash": "0xabcd1234...",
    "created_date": "2025-11-20",
    "secondary_sale_royalty_percent": 10
  }
}</code></pre>

      <h2>Supply Chain Items</h2>
      <p>Track physical goods through a supply chain with location history, handler changes, and condition monitoring.</p>
      <p><strong>Key properties:</strong> SKU, origin location, current location, temperature readings, current handler, timestamp array, chain-of-custody entries.</p>
      <p><strong>Actions:</strong> transfer-custody (handoff), update-location (GPS), flag-issue (damage/temperature alert), finalize (delivery complete).</p>
      <p>Example template schema:</p>
      <pre><code>{
  "name": "com.supplychain.shipment::v1",
  "description": "Supply chain item with location and custody tracking",
  "private": {
    "sku": "WIDGET-2024-001",
    "product_name": "Industrial Widget",
    "quantity": 500,
    "origin": "Shanghai, China",
    "origin_facility": "FAC-SHANGHAI-01",
    "destination": "Los Angeles, USA",
    "current_location": "Hong Kong Port",
    "current_handler": "Global Logistics Inc",
    "current_handler_id": "handler-7822",
    "temperature_readings": [
      {"timestamp": "2026-03-14T08:00:00Z", "celsius": 22.5},
      {"timestamp": "2026-03-14T12:00:00Z", "celsius": 23.1}
    ],
    "custody_chain": [
      {"handler": "Origin Warehouse", "transferred_at": "2026-03-01", "signature": "0x..."},
      {"handler": "Shanghai Port", "transferred_at": "2026-03-05", "signature": "0x..."}
    ],
    "issues_flagged": [],
    "estimated_delivery": "2026-04-15"
  }
}</code></pre>
    `,
  },
  "guides/code-samples": {
    title: "Code Samples & Starter Repos",
    description: "Production-ready examples and boilerplate to accelerate your DUAL integration.",
    sectionLabel: "Guides",
    sectionHref: "/docs/guides/code-samples",
    content: `
      <h2>Quick Start Snippets</h2>
      <p>Five essential TypeScript snippets using <code>@dual/sdk</code> to get you started:</p>

      <h3>Authentication</h3>
      <pre><code>import { DualClient } from '@dual/sdk';

const client = new DualClient({
  apiKey: process.env.DUAL_API_KEY,
  orgId: process.env.DUAL_ORG_ID,
});

const wallet = await client.wallets.login({
  email: 'user@example.com',
  password: 'secure-password',
});

console.log('Logged in:', wallet.id);</code></pre>

      <h3>Create Template</h3>
      <pre><code>const template = await client.templates.create({
  name: 'io.example.product::v1',
  description: 'A product token template',
  private: {
    serial_number: '',
    manufacture_date: '',
    price_usd: 0,
  },
});

console.log('Template created:', template.id);</code></pre>

      <h3>Mint Object</h3>
      <pre><code>const object = await client.objects.create({
  template_id: template.id,
  owner_wallet_id: wallet.id,
  properties: {
    serial_number: 'SN-12345',
    manufacture_date: '2026-03-14',
    price_usd: 99.99,
  },
});

console.log('Object minted:', object.id);</code></pre>

      <h3>Transfer Object</h3>
      <pre><code>const action = await client.actions.execute({
  type: 'transfer',
  object_id: object.id,
  parameters: {
    recipient_wallet_id: 'wallet-recipient-id',
    notes: 'Product transferred',
  },
});

console.log('Action executed:', action.id);</code></pre>

      <h3>Query Objects</h3>
      <pre><code>const objects = await client.objects.search({
  template_id: template.id,
  filters: {
    owner_wallet_id: wallet.id,
    status: 'active',
  },
  limit: 50,
});

console.log('Found objects:', objects.length);</code></pre>

      <h2>Express.js API Backend</h2>
      <p>A sample Express route file that wraps DUAL operations:</p>
      <pre><code>import express from 'express';
import { DualClient } from '@dual/sdk';

const router = express.Router();
const dual = new DualClient({
  apiKey: process.env.DUAL_API_KEY,
  orgId: process.env.DUAL_ORG_ID,
});

// Create asset endpoint
router.post('/assets', async (req, res) => {
  try {
    const { template_id, properties, owner_id } = req.body;

    const object = await dual.objects.create({
      template_id,
      properties,
      owner_wallet_id: owner_id,
    });

    res.json({ success: true, asset_id: object.id });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// List assets endpoint
router.get('/assets', async (req, res) => {
  try {
    const { owner_id, template_id } = req.query;

    const objects = await dual.objects.search({
      owner_wallet_id: owner_id,
      template_id,
      limit: 50,
    });

    res.json({ assets: objects });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Transfer asset endpoint
router.post('/assets/:id/transfer', async (req, res) => {
  try {
    const { id } = req.params;
    const { recipient_id } = req.body;

    const action = await dual.actions.execute({
      type: 'transfer',
      object_id: id,
      parameters: { recipient_wallet_id: recipient_id },
    });

    res.json({ success: true, action_id: action.id });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;</code></pre>

      <h2>Next.js Full-Stack App</h2>
      <p><strong>Architecture overview:</strong> Pages for listing objects, viewing details, and an admin dashboard. Key API route and React component:</p>

      <h3>API Route: pages/api/assets/[id].ts</h3>
      <pre><code>import { DualClient } from '@dual/sdk';
import { NextApiRequest, NextApiResponse } from 'next';

const dual = new DualClient({
  apiKey: process.env.DUAL_API_KEY,
  orgId: process.env.DUAL_ORG_ID,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const object = await dual.objects.get(id as string);
      const activity = await dual.objects.getActivity(id as string);

      res.status(200).json({ object, activity });
    } catch (error) {
      res.status(404).json({ error: 'Asset not found' });
    }
  }
}
</code></pre>

      <h3>React Component: components/AssetDetail.tsx</h3>
      <pre><code>import { useEffect, useState } from 'react';

export default function AssetDetail({ assetId }: { assetId: string }) {
  const [asset, setAsset] = useState(null);
  const [activity, setActivity] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/assets/" + assetId)
      .then(res => res.json())
      .then(data => {
        setAsset(data.object);
        setActivity(data.activity);
        setLoading(false);
      });
  }, [assetId]);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>{asset.template_id}</h1>
      <p>Owner: {asset.owner_wallet_id}</p>
      <p>Created: {new Date(asset.created_at).toLocaleDateString()}</p>
      <h2>Activity Log</h2>
      <ul>
        {activity.map(act => (
          <li key={act.id}>{act.type} - {act.timestamp}</li>
        ))}
      </ul>
    </div>
  );
}</code></pre>

      <h2>Webhook Handler</h2>
      <p>Express middleware that validates and processes DUAL webhook payloads with signature verification:</p>
      <pre><code>import crypto from 'crypto';
import express from 'express';

const WEBHOOK_SECRET = process.env.DUAL_WEBHOOK_SECRET;

export function verifyWebhookSignature(
  payload: string,
  signature: string
): boolean {
  const expected = crypto
    .createHmac('sha256', WEBHOOK_SECRET!)
    .update(payload)
    .digest('hex');

  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expected)
  );
}

export function webhookHandler(
  req: express.Request,
  res: express.Response
) {
  const signature = req.headers['x-dual-signature'] as string;
  const payload = JSON.stringify(req.body);

  if (!verifyWebhookSignature(payload, signature)) {
    return res.status(401).json({ error: 'Invalid signature' });
  }

  const { event_type, data } = req.body;

  switch (event_type) {
    case 'object.created':
      console.log('Object created:', data.object_id);
      // Handle creation
      break;
    case 'action.executed':
      console.log('Action executed:', data.action_id);
      // Handle action
      break;
    case 'transfer.completed':
      console.log('Transfer complete:', data.object_id);
      // Update your database
      break;
  }

  res.status(200).json({ received: true });
}</code></pre>

      <h2>CLI Scripting</h2>
      <p>Bash script for bulk minting 100 objects from a CSV file using the DUAL CLI:</p>
      <pre><code>#!/bin/bash
set -e

API_KEY="\${DUAL_API_KEY}"
ORG_ID="\${DUAL_ORG_ID}"
TEMPLATE_ID="io.example.product::v1"
CSV_FILE="products.csv"

echo "Starting bulk mint..."

while IFS=',' read -r name sku price; do
  if [ "$name" != "name" ]; then
    echo "Minting: $name"

    dual objects create \
      --template-id "$TEMPLATE_ID" \
      --property name="$name" \
      --property sku="$sku" \
      --property price_usd="$price" \
      --api-key "$API_KEY" \
      --org-id "$ORG_ID"

    # Rate limit: 10 per second
    sleep 0.1
  fi
done < "$CSV_FILE"

echo "Bulk mint complete!"</code></pre>

      <h2>GitHub Starter Repos</h2>
      <p>Jump-start your development with these production-ready templates:</p>
      <ul>
        <li><strong>dual-starter-express</strong> — Full Express.js backend with DUAL integration, authentication, and webhook handling. <a href="https://github.com/aspect-apps/dual-starter-express">View repo</a></li>
        <li><strong>dual-starter-nextjs</strong> — Next.js full-stack app with API routes, React components, and server-side rendering. <a href="https://github.com/aspect-apps/dual-starter-nextjs">View repo</a></li>
        <li><strong>dual-starter-python</strong> — Python Flask backend for non-Node environments. <a href="https://github.com/aspect-apps/dual-starter-python">View repo</a></li>
        <li><strong>dual-sdk-examples</strong> — 20+ standalone examples covering all SDK features. <a href="https://github.com/aspect-apps/dual-sdk-examples">View repo</a></li>
      </ul>
    `,
  },
  "guides/sandbox": {
    title: "Sandbox & Environments",
    description: "Test environments, API endpoints, and how to develop safely.",
    sectionLabel: "Guides",
    sectionHref: "/docs/guides/sandbox",
    content: `
      <h2>Available Environments</h2>
      <p>DUAL provides two environments for development and production use:</p>
      <table>
        <tr>
          <th>Environment</th>
          <th>API Base URL</th>
          <th>Cost</th>
          <th>Rate Limit</th>
          <th>Data Persistence</th>
        </tr>
        <tr>
          <td><strong>Sandbox</strong></td>
          <td>https://sandbox.blockv-labs.io</td>
          <td>Free</td>
          <td>1,000 calls/day</td>
          <td>Resets weekly</td>
        </tr>
        <tr>
          <td><strong>Production</strong></td>
          <td>https://blockv-labs.io</td>
          <td>Paid (usage-based)</td>
          <td>Based on plan</td>
          <td>Persistent</td>
        </tr>
      </table>

      <h2>Sandbox Features</h2>
      <p>The sandbox environment is fully functional and ideal for development and testing:</p>
      <ul>
        <li>Pre-loaded <strong>demo organization</strong> ready to use immediately</li>
        <li>Sample templates for common use cases (real estate, tickets, loyalty)</li>
        <li>Test wallet credentials: <code>email: sandbox@dual.io</code>, <code>password: sandbox123</code></li>
        <li>Pre-populated API keys with limited scope for safe testing</li>
        <li>1,000 free API calls per day (shared across your team)</li>
        <li>Full webhook support with test payload delivery</li>
        <li>Access to all developer tools and debugging features</li>
      </ul>

      <h2>Sandbox Limitations</h2>
      <p>The sandbox has a few limitations to note:</p>
      <ul>
        <li><strong>No real on-chain anchoring</strong> — State is simulated; no fingerprints are actually written to Ethereum</li>
        <li><strong>Weekly data reset</strong> — All data (templates, objects, wallets) is cleared every Sunday at midnight UTC</li>
        <li><strong>Test webhooks</strong> — Webhooks fire but with test payloads; real event data is not included</li>
        <li><strong>No payment processing</strong> — Billing and subscriptions are disabled in sandbox</li>
        <li><strong>Rate limits enforced</strong> — You'll hit limits faster than production to encourage efficient API usage</li>
      </ul>
      <p>Always move to production before launching a real application. Sandbox is for development only.</p>

      <h2>Switching Environments</h2>
      <p>Configure your SDK and CLI to use different environments:</p>

      <h3>SDK Configuration</h3>
      <pre><code>import { DualClient } from '@dual/sdk';

// Development: Sandbox
const devClient = new DualClient({
  apiUrl: 'https://sandbox.blockv-labs.io',
  apiKey: process.env.SANDBOX_API_KEY,
  orgId: process.env.SANDBOX_ORG_ID,
});

// Production: Mainnet
const prodClient = new DualClient({
  apiUrl: 'https://blockv-labs.io',
  apiKey: process.env.PROD_API_KEY,
  orgId: process.env.PROD_ORG_ID,
});

// Or use environment variables
const client = new DualClient({
  apiUrl: process.env.DUAL_API_URL,
  apiKey: process.env.DUAL_API_KEY,
  orgId: process.env.DUAL_ORG_ID,
});</code></pre>

      <h3>CLI Configuration</h3>
      <pre><code>// For sandbox
dual config set api-url https://sandbox.blockv-labs.io
dual config set api-key <your-sandbox-key>

// For production
dual config set api-url https://blockv-labs.io
dual config set api-key <your-prod-key></code></pre>

      <h3>Environment Variables</h3>
      <pre><code>// .env.development
DUAL_API_URL=https://sandbox.blockv-labs.io
DUAL_API_KEY=sk_sandbox_...
DUAL_ORG_ID=org_sandbox_...

// .env.production
DUAL_API_URL=https://blockv-labs.io
DUAL_API_KEY=sk_prod_...
DUAL_ORG_ID=org_prod_...</code></pre>

      <h2>Test Credentials & Data</h2>
      <p>Pre-loaded data available in sandbox for immediate testing:</p>
      <table>
        <tr>
          <th>Resource</th>
          <th>ID</th>
          <th>Notes</th>
        </tr>
        <tr>
          <td>Demo Organization</td>
          <td>org_sandbox_demo</td>
          <td>Full permissions for testing</td>
        </tr>
        <tr>
          <td>Real Estate Template</td>
          <td>io.example.property::v1</td>
          <td>Pre-created with sample schema</td>
        </tr>
        <tr>
          <td>Test Wallet</td>
          <td>wallet_sandbox_test</td>
          <td>Email: sandbox@dual.io</td>
        </tr>
        <tr>
          <td>Sample Object</td>
          <td>obj_sandbox_property_1</td>
          <td>Test real estate listing</td>
        </tr>
      </table>

      <h2>Best Practices</h2>
      <p>Follow these patterns for safe and efficient development:</p>
      <ul>
        <li><strong>Always develop against sandbox first.</strong> Test all flows, error handling, and edge cases before touching production.</li>
        <li><strong>Use environment variables.</strong> Never hardcode API URLs, keys, or org IDs. Inject them at runtime.</li>
        <li><strong>Test webhook handlers with sandbox payloads.</strong> Download example webhooks from the dashboard and verify signature validation.</li>
        <li><strong>Implement proper error handling.</strong> Sandbox surfaces the same errors as production; test your retry logic.</li>
        <li><strong>Monitor API usage.</strong> Check your daily quota in the dashboard; plan API-heavy operations during off-peak hours.</li>
        <li><strong>Document your test data.</strong> Keep notes on which test credentials/objects you're using for which features.</li>
      </ul>
    `,
  },
  "developer-tools/error-reference": {
    title: "Error Reference",
    description: "Complete guide to DUAL API error codes, common causes, and fixes.",
    sectionLabel: "Developer Tools",
    sectionHref: "/docs/developer-tools/error-reference",
    content: `
      <h2>Error Response Format</h2>
      <p>All DUAL API errors follow a consistent JSON format for easy client-side handling:</p>
      <pre><code>{
  "error": {
    "code": 4001,
    "message": "Invalid template schema",
    "details": {
      "field": "private.price",
      "reason": "Field type must be number, got string"
    }
  }
}</code></pre>
      <p>Always check the <code>code</code> field to determine error type. The <code>message</code> is human-readable but should not be parsed. The <code>details</code> object provides context-specific information.</p>

      <h2>HTTP Status Codes</h2>
      <p>DUAL uses standard HTTP status codes to indicate request outcomes:</p>
      <table>
        <tr>
          <th>Status Code</th>
          <th>Error Type</th>
          <th>Example</th>
        </tr>
        <tr>
          <td><strong>400</strong></td>
          <td>Validation Error</td>
          <td>Missing required field, invalid data type</td>
        </tr>
        <tr>
          <td><strong>401</strong></td>
          <td>Authentication Error</td>
          <td>Invalid credentials, expired token, missing API key</td>
        </tr>
        <tr>
          <td><strong>403</strong></td>
          <td>Permission Error</td>
          <td>User lacks required role, org access denied</td>
        </tr>
        <tr>
          <td><strong>404</strong></td>
          <td>Not Found</td>
          <td>Resource does not exist, template not found</td>
        </tr>
        <tr>
          <td><strong>409</strong></td>
          <td>Conflict</td>
          <td>Template name already exists, object locked</td>
        </tr>
        <tr>
          <td><strong>422</strong></td>
          <td>Unprocessable Entity</td>
          <td>Semantic error in business logic, invalid state transition</td>
        </tr>
        <tr>
          <td><strong>429</strong></td>
          <td>Rate Limited</td>
          <td>Too many requests, quota exceeded</td>
        </tr>
        <tr>
          <td><strong>500</strong></td>
          <td>Server Error</td>
          <td>Internal error, database failure</td>
        </tr>
      </table>

      <h2>Authentication Errors</h2>
      <p>Common authentication issues and their causes:</p>
      <ul>
        <li><strong>Invalid credentials (401)</strong> — Email/password combination does not match. Double-check the credentials used during wallet registration.</li>
        <li><strong>Expired token (401)</strong> — JWT token lifetime exceeded. Tokens expire after 24 hours; call <code>POST /wallets/login</code> again to refresh.</li>
        <li><strong>Missing API key (401)</strong> — Request lacks <code>x-api-key</code> header. Include the header in all API requests.</li>
        <li><strong>Invalid API key (401)</strong> — The key is malformed or revoked. Generate a new key in the dashboard.</li>
        <li><strong>Missing authorization header (401)</strong> — Use either Bearer token or API key; one is required.</li>
      </ul>

      <h2>Template Errors</h2>
      <p>Issues when creating or modifying templates:</p>
      <ul>
        <li><strong>Duplicate name (409)</strong> — A template with that name already exists in your organization. Template names must be unique. Use a version suffix (v2, v3) if you need a new variant.</li>
        <li><strong>Invalid schema (400)</strong> — The schema JSON is malformed or contains unsupported types. Check that all field types are strings, numbers, booleans, or arrays.</li>
        <li><strong>Template in use (409)</strong> — Cannot delete a template with live objects. Create a new template version and migrate objects instead.</li>
        <li><strong>Invalid property type (400)</strong> — Field type not supported. Supported types: string, number, boolean, array, object (for nested data).</li>
      </ul>

      <h2>Object Errors</h2>
      <p>Errors when creating, updating, or querying objects:</p>
      <ul>
        <li><strong>Template not found (404)</strong> — The template_id you provided does not exist. Verify the ID matches a template in your org.</li>
        <li><strong>Invalid properties (400)</strong> — Object properties do not match the template schema. Check field names and types.</li>
        <li><strong>Ownership conflict (422)</strong> — Cannot transfer object to non-existent wallet. Verify recipient wallet ID is valid.</li>
        <li><strong>Object locked (422)</strong> — Object is in the middle of a state transition. Wait a moment and retry.</li>
        <li><strong>Object not found (404)</strong> — Object ID does not exist. Verify the ID and check if the object was deleted.</li>
      </ul>

      <h2>Action Errors</h2>
      <p>Issues when executing actions on objects:</p>
      <ul>
        <li><strong>Invalid action type (400)</strong> — The action type is not registered for this template. Create the action type with <code>POST /ebus/action-types</code>.</li>
        <li><strong>Object locked (422)</strong> — Object has an in-flight action. Wait for it to complete before executing another.</li>
        <li><strong>Insufficient permissions (403)</strong> — Current user lacks permission to execute this action. Check role permissions.</li>
        <li><strong>Invalid parameters (400)</strong> — Action parameters do not match the expected schema. Verify all required parameters are provided.</li>
        <li><strong>State violation (422)</strong> — Action cannot be executed in current object state. For example, cannot transfer a locked object.</li>
      </ul>

      <h2>Webhook Errors</h2>
      <p>Common issues with webhook delivery and configuration:</p>
      <ul>
        <li><strong>Invalid URL (400)</strong> — Webhook URL is not a valid HTTPS endpoint. All webhooks must use HTTPS.</li>
        <li><strong>Signature mismatch (401)</strong> — Webhook signature verification failed. Check that you're using the correct secret and hashing method.</li>
        <li><strong>Timeout (504)</strong> — Webhook endpoint did not respond within 30 seconds. Optimize your handler to respond quickly.</li>
        <li><strong>Delivery failed (500)</strong> — Server error when calling your webhook. Check your webhook logs and endpoint status.</li>
      </ul>

      <h2>Debugging Tips</h2>
      <p>Strategies for solving errors quickly:</p>
      <ul>
        <li><strong>Check the X-Request-Id header</strong> — Every response includes <code>X-Request-Id</code>. Save this when reporting issues to support; it helps track the request through our logs.</li>
        <li><strong>Enable debug mode in SDK</strong> — Set <code>debug: true</code> when initializing the client to log all requests and responses to stderr.</li>
        <li><strong>Common gotchas:</strong>
          <ul>
            <li>Forgetting <code>Content-Type: application/json</code> header on POST requests</li>
            <li>Using expired JWT tokens without refreshing</li>
            <li>Wrong org context (using sandbox API key with prod URL)</li>
            <li>Object IDs and template IDs are case-sensitive</li>
            <li>Properties object must match template schema exactly</li>
          </ul>
        </li>
        <li><strong>Test in sandbox first</strong> — Errors in sandbox have the same root causes as production. Debug locally before deploying.</li>
      </ul>
    `,
  },
  "developer-tools/rate-limits": {
    title: "Rate Limits & Quotas",
    description: "API rate limits, quotas, and how to handle throttling gracefully.",
    sectionLabel: "Developer Tools",
    sectionHref: "/docs/developer-tools/rate-limits",
    content: `
      <h2>Rate Limit Tiers</h2>
      <p>DUAL offers three subscription tiers with different rate limits and quotas:</p>
      <table>
        <tr>
          <th>Tier</th>
          <th>Requests/Minute</th>
          <th>Requests/Day</th>
          <th>Cost</th>
        </tr>
        <tr>
          <td><strong>Free</strong></td>
          <td>100</td>
          <td>1,000</td>
          <td>Free</td>
        </tr>
        <tr>
          <td><strong>Developer</strong></td>
          <td>500</td>
          <td>50,000</td>
          <td>$99/month</td>
        </tr>
        <tr>
          <td><strong>Enterprise</strong></td>
          <td>5,000</td>
          <td>Unlimited</td>
          <td>Custom</td>
        </tr>
      </table>
      <p>These limits apply per organization. If you approach your limit, contact support to discuss upgrading or optimizing your usage.</p>

      <h2>Per-Endpoint Limits</h2>
      <p>Some endpoints have additional limits to prevent abuse and ensure fair resource allocation:</p>
      <ul>
        <li><strong>Object mutations</strong> (POST /objects, PATCH /objects/:id) — 50 requests/minute</li>
        <li><strong>Batch actions</strong> (POST /ebus/actions/batch) — 10 requests/minute</li>
        <li><strong>File uploads</strong> (POST /files) — 20 requests/minute</li>
        <li><strong>Template creation</strong> (POST /templates) — 10 requests/minute</li>
        <li><strong>Read endpoints</strong> (GET /objects, /templates, /batches) — 1,000 requests/minute</li>
      </ul>
      <p>Read endpoints have generous limits because they don't modify state. Plan write-heavy operations to stay within mutation limits.</p>

      <h2>Rate Limit Headers</h2>
      <p>All responses include headers showing your current rate limit status:</p>
      <pre><code>X-RateLimit-Limit: 100
X-RateLimit-Remaining: 42
X-RateLimit-Reset: 1678886400</code></pre>
      <ul>
        <li><code>X-RateLimit-Limit</code> — Your limit for this window (minute or day)</li>
        <li><code>X-RateLimit-Remaining</code> — Requests remaining in this window</li>
        <li><code>X-RateLimit-Reset</code> — Unix timestamp when the limit resets</li>
      </ul>
      <p>Monitor <code>X-RateLimit-Remaining</code> in your client code. When it approaches 0, pause and wait for the reset.</p>

      <h2>Handling 429 Responses</h2>
      <p>When you exceed the rate limit, the API responds with HTTP 429 (Too Many Requests). Include a <code>Retry-After</code> header indicating seconds to wait.</p>

      <h3>Exponential Backoff with Jitter</h3>
      <p>Implement retry logic with exponential backoff to handle rate limits gracefully:</p>
      <pre><code>async function requestWithRetry(
  fn: () => Promise<any>,
  maxRetries: number = 5
): Promise<any> {
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      if (error.status === 429) {
        const retryAfter = parseInt(
          error.headers['retry-after'] || '60',
          10
        );
        const jitter = Math.random() * 1000;
        const delay = retryAfter * 1000 * Math.pow(2, attempt) + jitter;

        console.log("Rate limited. Retrying after " + delay + "ms...");
        await new Promise(resolve => setTimeout(resolve, delay));
        continue;
      }
      throw error;
    }
  }
  throw new Error('Max retries exceeded');
}</code></pre>

      <h2>Batch Operations</h2>
      <p>Use batch endpoints to reduce request count and improve throughput:</p>
      <ul>
        <li><strong>POST /ebus/actions/batch</strong> — Execute up to 500 actions in a single request (counts as 1 request against limit, not 500)</li>
        <li><strong>POST /objects/search</strong> — Query multiple objects with filters in one request</li>
        <li><strong>POST /templates/{id}/variations</strong> — Create multiple variations at once</li>
      </ul>
      <p>Batching is the most efficient way to handle bulk operations. A batch of 500 actions counts as 1 API call, not 500.</p>

      <h2>Sequencer Quotas</h2>
      <p>Beyond API rate limits, the Sequencer has its own quotas:</p>
      <ul>
        <li><strong>Maximum batch size</strong> — 500 actions per batch</li>
        <li><strong>Checkpoint frequency</strong> — Batches are anchored on-chain every 15 minutes</li>
        <li><strong>Max object size</strong> — 1 MB per object (total property size)</li>
        <li><strong>Max action history</strong> — Last 1,000 actions per object</li>
      </ul>
      <p>These quotas are per-organization. If you need higher limits, contact support.</p>

      <h2>Optimization Tips</h2>
      <p>Reduce API usage and stay within limits with these strategies:</p>
      <ul>
        <li><strong>Cache template definitions.</strong> Templates rarely change; fetch once and cache locally.</li>
        <li><strong>Use webhooks instead of polling.</strong> React to events via webhooks rather than continuously querying for changes.</li>
        <li><strong>Paginate list requests.</strong> Fetch 100 objects at a time, not 10,000 in one request. Use <code>limit</code> and <code>offset</code> parameters.</li>
        <li><strong>Batch related operations.</strong> Instead of creating 100 objects individually, use batch mode to reduce requests to 1 (if under 500 count).</li>
        <li><strong>Index frequently-queried fields.</strong> Work with support to add indexes on properties you search often.</li>
        <li><strong>Monitor your usage.</strong> Check the dashboard daily to see request trends and plan capacity.</li>
      </ul>
    `,
  },
};
