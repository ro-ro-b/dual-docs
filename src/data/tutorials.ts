export interface Tutorial {
  slug: string;
  title: string;
  description: string;
  time: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  prerequisites: string[];
  content: string;
}

export const tutorials: Tutorial[] = [
  {
    slug: "create-first-template",
    title: "Create Your First Template",
    description: "Learn how to define a template with properties, actions, and faces.",
    time: "10 min",
    difficulty: "Beginner",
    prerequisites: ["A DUAL account with an organization", "An API key or JWT token"],
    content: `
      <h2>What You'll Build</h2>
      <p>In this tutorial you'll create a <strong>template</strong> — the blueprint that defines the structure, properties, and behaviour of tokenized objects on the DUAL network. By the end you'll have a working template you can mint objects from.</p>

      <h2>Step 1 — Authenticate</h2>
      <p>First, obtain a JWT token by logging in with your wallet credentials. You'll use this token in every subsequent request.</p>
      <div class="code-block" data-lang="bash">
curl -X POST https://blockv-labs.io/wallets/login \\
  -H "Content-Type: application/json" \\
  -d '{
    "email": "dev@example.com",
    "password": "your-password"
  }'
      </div>
      <p>The response includes a <code>token</code> field — save it as an environment variable:</p>
      <div class="code-block" data-lang="bash">
export DUAL_TOKEN="eyJhbGciOiJIUzI1NiIs..."
      </div>

      <h2>Step 2 — Create the Template</h2>
      <p>Templates define the schema for your tokenized objects. Each template belongs to an organization and specifies properties, actions, and visual faces.</p>
      <div class="code-block" data-lang="bash">
curl -X POST https://blockv-labs.io/templates \\
  -H "Authorization: Bearer $DUAL_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "template": {
      "name": "my-org::loyalty-card::v1",
      "description": "A digital loyalty card template",
      "public": false,
      "cloneable": false,
      "properties": {
        "points": 0,
        "tier": "silver",
        "holder_name": ""
      }
    }
  }'
      </div>
      <p>The template name follows the convention <code>org::name::version</code>. Properties define the default data fields that every object minted from this template will inherit.</p>

      <h2>Step 3 — Verify Your Template</h2>
      <p>Confirm the template was created by listing your organization's templates:</p>
      <div class="code-block" data-lang="bash">
curl https://blockv-labs.io/templates \\
  -H "Authorization: Bearer $DUAL_TOKEN"
      </div>
      <p>You should see your new template in the response array with all the properties you defined.</p>

      <h2>Step 4 — Add a Face</h2>
      <p>Faces are the visual layer of your template. They can be images, 3D models, or web views. Let's attach a simple image face:</p>
      <div class="code-block" data-lang="bash">
curl -X POST https://blockv-labs.io/faces \\
  -H "Authorization: Bearer $DUAL_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "face": {
      "template": "my-org::loyalty-card::v1",
      "display_type": "ResourceFace",
      "meta": {
        "image": "https://your-cdn.com/loyalty-card.png"
      },
      "is_default": true
    }
  }'
      </div>

      <h2>What's Next?</h2>
      <p>Your template is ready. In the next tutorial, <a href="/docs/tutorials/mint-transfer-objects">Mint &amp; Transfer Objects</a>, you'll create object instances from this template and transfer them between wallets.</p>
      <div class="callout">
        <strong>Tip:</strong> You can update a template's properties at any time using <code>PATCH /templates/{id}</code>, but be aware that changes won't retroactively update objects already minted from it.
      </div>
    `,
  },
  {
    slug: "mint-transfer-objects",
    title: "Mint & Transfer Objects",
    description: "Mint objects from templates and transfer them between wallets using the Event Bus.",
    time: "15 min",
    difficulty: "Intermediate",
    prerequisites: [
      "Completed the Create Your First Template tutorial",
      "A template ID from the previous tutorial",
    ],
    content: `
      <h2>What You'll Build</h2>
      <p>In this tutorial you'll <strong>mint</strong> a tokenized object from the template you created, inspect it, and then <strong>transfer</strong> it to another wallet via the Event Bus action system.</p>

      <h2>Step 1 — Mint an Object</h2>
      <p>Objects are instances of templates. Minting creates a new object owned by your wallet with the default properties defined in the template.</p>
      <div class="code-block" data-lang="bash">
curl -X POST https://blockv-labs.io/objects \\
  -H "Authorization: Bearer $DUAL_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "template_id": "your-template-id",
    "num": 1,
    "properties": {
      "holder_name": "Alice Smith",
      "points": 100
    }
  }'
      </div>
      <p>The response returns an array of newly minted objects, each with a unique <code>id</code> and the properties you specified.</p>

      <h2>Step 2 — Inspect the Object</h2>
      <p>Retrieve the full object details including its current state, ownership, and properties:</p>
      <div class="code-block" data-lang="bash">
curl https://blockv-labs.io/objects/{objectId} \\
  -H "Authorization: Bearer $DUAL_TOKEN"
      </div>
      <p>Key fields in the response:</p>
      <table>
        <thead><tr><th>Field</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td><code>id</code></td><td>Unique object identifier</td></tr>
          <tr><td><code>template_id</code></td><td>Template this object was minted from</td></tr>
          <tr><td><code>owner</code></td><td>Current owner's wallet address</td></tr>
          <tr><td><code>properties</code></td><td>Object data (points, tier, etc.)</td></tr>
        </tbody>
      </table>

      <h2>Step 3 — Transfer via the Event Bus</h2>
      <p>The Event Bus processes actions on objects. A <strong>transfer</strong> action changes the object's owner from your wallet to another.</p>
      <div class="code-block" data-lang="bash">
curl -X POST https://blockv-labs.io/ebus/events \\
  -H "Authorization: Bearer $DUAL_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "action_name": "Transfer",
    "object_id": "your-object-id",
    "new_owner": "recipient-wallet-address"
  }'
      </div>
      <p>The Event Bus validates the action against the template's rules, updates the object's owner, and emits an event that can trigger webhooks.</p>

      <h2>Step 4 — Verify the Transfer</h2>
      <p>Fetch the object again to confirm the <code>owner</code> field has changed:</p>
      <div class="code-block" data-lang="bash">
curl https://blockv-labs.io/objects/{objectId} \\
  -H "Authorization: Bearer $DUAL_TOKEN"
      </div>

      <h2>Understanding the Action Pipeline</h2>
      <p>When an action is submitted to the Event Bus, it goes through several stages:</p>
      <ol>
        <li><strong>Validation</strong> — The action is checked against template rules and permissions</li>
        <li><strong>Execution</strong> — The state change is applied off-chain</li>
        <li><strong>Sequencing</strong> — The Sequencer orders and batches the action</li>
        <li><strong>Anchoring</strong> — The batch fingerprint is written on-chain</li>
      </ol>

      <h2>What's Next?</h2>
      <p>Now that you can mint and transfer, try <a href="/docs/tutorials/build-web-face">Building a Web Face</a> to give your objects a custom interactive display.</p>
    `,
  },
  {
    slug: "build-web-face",
    title: "Build a Web Face",
    description: "Create a custom web-based visual representation for your objects using HTML/CSS/JS.",
    time: "20 min",
    difficulty: "Intermediate",
    prerequisites: [
      "A DUAL account with a template",
      "Basic HTML/CSS/JS knowledge",
    ],
    content: `
      <h2>What You'll Build</h2>
      <p>Faces are the visual layer of DUAL objects. While image faces are simple, <strong>web faces</strong> let you create fully interactive displays using HTML, CSS, and JavaScript. In this tutorial you'll build a dynamic loyalty card face that reads object properties in real time.</p>

      <h2>Step 1 — Understand Face Types</h2>
      <p>DUAL supports several face display types:</p>
      <table>
        <thead><tr><th>Display Type</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td><code>ResourceFace</code></td><td>Static image (PNG, JPG, SVG)</td></tr>
          <tr><td><code>WebFace</code></td><td>Interactive HTML/JS rendered in a webview</td></tr>
          <tr><td><code>NativeFace</code></td><td>Platform-native UI component</td></tr>
          <tr><td><code>GLTFFace</code></td><td>3D model rendered with a GL viewer</td></tr>
        </tbody>
      </table>
      <p>We'll be creating a <code>WebFace</code> — the most flexible option.</p>

      <h2>Step 2 — Create Your HTML</h2>
      <p>A web face is a standard HTML page that receives object data through the DUAL Bridge API. Here's a minimal loyalty card face:</p>
      <div class="code-block" data-lang="html">
&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
  &lt;style&gt;
    body {
      margin: 0; padding: 24px;
      font-family: system-ui, sans-serif;
      background: linear-gradient(135deg, #0f172a, #1e293b);
      color: white; min-height: 100vh;
    }
    .card { max-width: 360px; margin: 0 auto; }
    .points { font-size: 48px; font-weight: bold; color: #15b8a7; }
    .tier { text-transform: uppercase; letter-spacing: 2px; opacity: 0.6; }
    .name { margin-top: 16px; font-size: 18px; }
  &lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;
  &lt;div class="card"&gt;
    &lt;div class="tier" id="tier"&gt;&lt;/div&gt;
    &lt;div class="points" id="points"&gt;&lt;/div&gt;
    &lt;div class="name" id="name"&gt;&lt;/div&gt;
  &lt;/div&gt;
  &lt;script src="https://cdn.dual.network/bridge.js"&gt;&lt;/script&gt;
  &lt;script&gt;
    DualBridge.onLoad(function(object) {
      document.getElementById('tier').textContent = object.properties.tier;
      document.getElementById('points').textContent = object.properties.points + ' pts';
      document.getElementById('name').textContent = object.properties.holder_name;
    });
  &lt;/script&gt;
&lt;/body&gt;
&lt;/html&gt;
      </div>

      <h2>Step 3 — Host Your Face</h2>
      <p>Upload your HTML file to any static hosting provider (Vercel, Netlify, S3, etc.) and note the public URL. The face URL must be accessible over HTTPS.</p>

      <h2>Step 4 — Register the Face</h2>
      <p>Attach the web face to your template:</p>
      <div class="code-block" data-lang="bash">
curl -X POST https://blockv-labs.io/faces \\
  -H "Authorization: Bearer $DUAL_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "face": {
      "template": "my-org::loyalty-card::v1",
      "display_type": "WebFace",
      "meta": {
        "url": "https://your-cdn.com/loyalty-face.html"
      },
      "is_default": true
    }
  }'
      </div>

      <h2>Step 5 — Test in the Viewer</h2>
      <p>Retrieve an object minted from this template and view it. The face will load your HTML, inject the object's properties, and render the interactive card.</p>
      <div class="code-block" data-lang="bash">
curl https://blockv-labs.io/objects/{objectId} \\
  -H "Authorization: Bearer $DUAL_TOKEN" \\
  | jq '.properties.faces'
      </div>

      <div class="callout">
        <strong>Bridge API Reference:</strong> The <code>DualBridge</code> object provides <code>onLoad()</code>, <code>onStateChange()</code>, and <code>performAction()</code> methods for full two-way communication between your face and the DUAL platform.
      </div>

      <h2>What's Next?</h2>
      <p>To receive notifications when objects change state, try <a href="/docs/tutorials/setup-webhooks">Set Up Webhooks</a>.</p>
    `,
  },
  {
    slug: "setup-webhooks",
    title: "Set Up Webhooks",
    description: "Configure webhooks to receive real-time notifications when objects change state.",
    time: "8 min",
    difficulty: "Beginner",
    prerequisites: ["A DUAL account", "A publicly accessible HTTPS endpoint"],
    content: `
      <h2>What You'll Build</h2>
      <p>Webhooks let your server receive real-time HTTP callbacks when events occur in DUAL — like object transfers, property changes, or new mints. In this tutorial you'll register a webhook endpoint, configure event filters, and handle incoming payloads.</p>

      <h2>Step 1 — Create Your Endpoint</h2>
      <p>Set up an HTTPS endpoint on your server that accepts POST requests. Here's a minimal Node.js example:</p>
      <div class="code-block" data-lang="javascript">
const express = require('express');
const app = express();
app.use(express.json());

app.post('/webhooks/dual', (req, res) => {
  const event = req.body;
  console.log('Event:', event.event_type);
  console.log('Object:', event.object_id);
  console.log('Data:', event.payload);

  // Always return 200 to acknowledge receipt
  res.status(200).json({ received: true });
});

app.listen(3000, () => console.log('Webhook server on :3000'));
      </div>

      <h2>Step 2 — Register the Webhook</h2>
      <p>Tell DUAL to send events to your endpoint:</p>
      <div class="code-block" data-lang="bash">
curl -X POST https://blockv-labs.io/webhooks \\
  -H "Authorization: Bearer $DUAL_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "webhook": {
      "url": "https://your-server.com/webhooks/dual",
      "events": ["object.transferred", "object.updated"],
      "active": true
    }
  }'
      </div>

      <h2>Step 3 — Test with a Transfer</h2>
      <p>Transfer an object to trigger a webhook delivery:</p>
      <div class="code-block" data-lang="bash">
curl -X POST https://blockv-labs.io/ebus/events \\
  -H "Authorization: Bearer $DUAL_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "action_name": "Transfer",
    "object_id": "your-object-id",
    "new_owner": "recipient-wallet"
  }'
      </div>
      <p>Within seconds your endpoint should receive a POST with a payload like:</p>
      <div class="code-block" data-lang="json">
{
  "event_type": "object.transferred",
  "object_id": "abc-123",
  "timestamp": "2026-03-13T10:30:00Z",
  "payload": {
    "previous_owner": "wallet-a",
    "new_owner": "wallet-b"
  }
}
      </div>

      <h2>Step 4 — Manage Your Webhooks</h2>
      <p>List all registered webhooks:</p>
      <div class="code-block" data-lang="bash">
curl https://blockv-labs.io/webhooks \\
  -H "Authorization: Bearer $DUAL_TOKEN"
      </div>
      <p>Delete a webhook by ID:</p>
      <div class="code-block" data-lang="bash">
curl -X DELETE https://blockv-labs.io/webhooks/{webhookId} \\
  -H "Authorization: Bearer $DUAL_TOKEN"
      </div>

      <div class="callout">
        <strong>Retry Policy:</strong> DUAL retries failed webhook deliveries with exponential backoff (1s, 5s, 30s, 5m). After 5 consecutive failures, the webhook is automatically deactivated. Re-enable it via <code>PATCH /webhooks/{id}</code>.
      </div>

      <h2>What's Next?</h2>
      <p>Ready to add monetization? Head to <a href="/docs/tutorials/integrate-payments">Integrate Payments</a>.</p>
    `,
  },
  {
    slug: "integrate-payments",
    title: "Integrate Payments",
    description: "Add deposit tracking and payment configuration to your application.",
    time: "12 min",
    difficulty: "Advanced",
    prerequisites: [
      "A DUAL organization with billing enabled",
      "Familiarity with crypto tokens (ERC-20)",
    ],
    content: `
      <h2>What You'll Build</h2>
      <p>DUAL supports on-chain payments for tokenized assets. In this tutorial you'll configure the payment system, track deposits, and query balance and transaction history for your organization.</p>

      <h2>Step 1 — Check Payment Config</h2>
      <p>First, retrieve your organization's payment configuration to see supported tokens and deposit addresses:</p>
      <div class="code-block" data-lang="bash">
curl https://blockv-labs.io/payments/config \\
  -H "Authorization: Bearer $DUAL_TOKEN"
      </div>
      <p>The response includes:</p>
      <table>
        <thead><tr><th>Field</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td><code>multi_token_deposit_address</code></td><td>The address where users send tokens</td></tr>
          <tr><td><code>vee_address</code></td><td>VEE token contract address</td></tr>
          <tr><td><code>supported_tokens</code></td><td>Array of accepted ERC-20 tokens</td></tr>
        </tbody>
      </table>

      <h2>Step 2 — Monitor Deposits</h2>
      <p>Once a user sends tokens to the deposit address, DUAL detects them automatically. List deposits with optional filters:</p>
      <div class="code-block" data-lang="bash">
# List all deposits
curl https://blockv-labs.io/payments/deposits \\
  -H "Authorization: Bearer $DUAL_TOKEN"

# Filter by transaction hash
curl "https://blockv-labs.io/payments/deposits?tx_hash=0xabc..." \\
  -H "Authorization: Bearer $DUAL_TOKEN"

# Filter by token
curl "https://blockv-labs.io/payments/deposits?token=VEE" \\
  -H "Authorization: Bearer $DUAL_TOKEN"
      </div>

      <h2>Step 3 — Check Organization Balance</h2>
      <p>Track your organization's running balance and credit history:</p>
      <div class="code-block" data-lang="bash">
# Current balance
curl https://blockv-labs.io/organizations/{orgId}/balance \\
  -H "Authorization: Bearer $DUAL_TOKEN"

# Balance history (credits and debits over time)
curl https://blockv-labs.io/organizations/{orgId}/balance/history \\
  -H "Authorization: Bearer $DUAL_TOKEN"
      </div>

      <h2>Step 4 — Implement in Your App</h2>
      <p>Here's a complete JavaScript example that polls for new deposits and updates a UI:</p>
      <div class="code-block" data-lang="javascript">
const API_BASE = 'https://blockv-labs.io';

async function checkDeposits(token) {
  const res = await fetch(\"\" + API_BASE + "/payments/deposits\", {
    headers: {
      'Authorization': \"Bearer \" + token + "\",
      'Content-Type': 'application/json'
    }
  });
  const data = await res.json();
  return data.items || [];
}

async function getBalance(token, orgId) {
  const res = await fetch(
    \"\" + API_BASE + "/organizations/\" + orgId + "/balance\",
    { headers: { 'Authorization': \"Bearer \" + token + "\" } }
  );
  return res.json();
}

// Poll every 30 seconds
setInterval(async () => {
  const deposits = await checkDeposits(AUTH_TOKEN);
  const balance = await getBalance(AUTH_TOKEN, ORG_ID);
  updateUI(deposits, balance);
}, 30000);
      </div>

      <div class="callout">
        <strong>Production Tip:</strong> Instead of polling, combine this with webhooks to receive instant notifications when deposits are confirmed. Register a webhook for <code>payment.deposit.confirmed</code> events.
      </div>

      <h2>Summary</h2>
      <p>You've now set up the payment pipeline: configuration, deposit tracking, balance monitoring, and a client-side integration pattern. For the full payments API reference, see <a href="/docs/api/payments">Payments API</a>.</p>
    `,
  },
  {
    slug: "batch-actions",
    title: "Batch Actions & Event Bus Patterns",
    description: "Execute bulk operations efficiently using batch actions, custom action types, and Event Bus patterns.",
    time: "15 min",
    difficulty: "Intermediate",
    prerequisites: [
      "A DUAL account with an organization",
      "At least one template with minted objects",
    ],
    content: `
      <h2>What You'll Build</h2>
      <p>Real-world tokenization often involves operating on hundreds or thousands of objects simultaneously — airdropping rewards, expiring promotions, or updating properties in bulk. In this tutorial you'll create <strong>custom action types</strong>, execute <strong>batch actions</strong>, and learn Event Bus patterns for reliable high-throughput operations.</p>

      <h2>Step 1 — Create a Custom Action Type</h2>
      <p>Action types define what operations can be performed on objects. DUAL ships with built-in types (Transfer, Drop, Pickup), but you can create your own for domain-specific logic.</p>
      <div class="code-block" data-lang="bash">
curl -X POST https://blockv-labs.io/actions/types \\
  -H "Authorization: Bearer $DUAL_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "action_type": {
      "name": "Redeem",
      "description": "Mark a reward token as redeemed",
      "template": "my-org::reward-token::v1",
      "state_changes": {
        "properties.redeemed": true,
        "properties.redeemed_at": "{{timestamp}}"
      }
    }
  }'
      </div>
      <p>The <code>state_changes</code> field defines what happens to the object when this action fires. Template variables like <code>{{timestamp}}</code> are resolved at execution time.</p>

      <h2>Step 2 — Execute a Single Action</h2>
      <p>Test your custom action on a single object first:</p>
      <div class="code-block" data-lang="bash">
curl -X POST https://blockv-labs.io/ebus/events \\
  -H "Authorization: Bearer $DUAL_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "action_name": "Redeem",
    "object_id": "your-object-id"
  }'
      </div>
      <p>Check the object to confirm the properties changed:</p>
      <div class="code-block" data-lang="bash">
curl https://blockv-labs.io/objects/{objectId} \\
  -H "Authorization: Bearer $DUAL_TOKEN" \\
  | jq '.properties'
      </div>

      <h2>Step 3 — Execute Batch Actions</h2>
      <p>The batch endpoint lets you execute the same action across multiple objects in a single API call. This is far more efficient than individual requests.</p>
      <div class="code-block" data-lang="bash">
curl -X POST https://blockv-labs.io/ebus/events/batch \\
  -H "Authorization: Bearer $DUAL_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "actions": [
      { "action_name": "Redeem", "object_id": "object-id-1" },
      { "action_name": "Redeem", "object_id": "object-id-2" },
      { "action_name": "Redeem", "object_id": "object-id-3" }
    ]
  }'
      </div>
      <p>The response returns an array of results — one per action — so you can check which succeeded and which failed.</p>

      <h2>Step 4 — Query Action History</h2>
      <p>View the execution history for any object to audit what happened and when:</p>
      <div class="code-block" data-lang="bash">
curl "https://blockv-labs.io/objects/{objectId}/activity" \\
  -H "Authorization: Bearer $DUAL_TOKEN"
      </div>

      <div class="callout">
        <strong>Rate Limits:</strong> Batch actions support up to 100 operations per request. For larger volumes, split into multiple batches and use webhooks to track completion.
      </div>

      <h2>What's Next?</h2>
      <p>Now that you can operate at scale, try <a href="/docs/tutorials/org-roles-permissions">Organization Roles &amp; Permissions</a> to control who can execute which actions.</p>
    `,
  },
  {
    slug: "org-roles-permissions",
    title: "Organization Roles & Permissions",
    description: "Set up multi-tenant organizations with custom roles, member management, and fine-grained access control.",
    time: "12 min",
    difficulty: "Intermediate",
    prerequisites: [
      "A DUAL account",
      "Organization admin access",
    ],
    content: `
      <h2>What You'll Build</h2>
      <p>Organizations are the multi-tenant layer of DUAL — they group templates, objects, and members under shared ownership with role-based access. In this tutorial you'll create an organization, define custom roles, invite members, and configure permissions.</p>

      <h2>Step 1 — Create an Organization</h2>
      <p>Every DUAL deployment starts with an organization:</p>
      <div class="code-block" data-lang="bash">
curl -X POST https://blockv-labs.io/organizations \\
  -H "Authorization: Bearer $DUAL_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "organization": {
      "name": "Acme Rewards",
      "description": "Loyalty program tokenization",
      "metadata": {
        "industry": "retail",
        "tier": "enterprise"
      }
    }
  }'
      </div>
      <p>Save the <code>id</code> from the response — you'll need it for all subsequent org operations.</p>

      <h2>Step 2 — Define Custom Roles</h2>
      <p>DUAL provides default roles (Owner, Admin, Member), but you can create custom roles with fine-grained permissions:</p>
      <div class="code-block" data-lang="bash">
curl -X POST https://blockv-labs.io/organizations/{orgId}/roles \\
  -H "Authorization: Bearer $DUAL_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "role": {
      "name": "Template Designer",
      "permissions": [
        "templates.create",
        "templates.update",
        "templates.read",
        "faces.create",
        "faces.update",
        "storage.upload"
      ]
    }
  }'
      </div>
      <p>Permissions follow a <code>resource.action</code> pattern. Common resources include <code>templates</code>, <code>objects</code>, <code>faces</code>, <code>actions</code>, <code>webhooks</code>, and <code>storage</code>.</p>

      <h2>Step 3 — Invite Members</h2>
      <p>Add team members to your organization with a specific role:</p>
      <div class="code-block" data-lang="bash">
curl -X POST https://blockv-labs.io/organizations/{orgId}/members \\
  -H "Authorization: Bearer $DUAL_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "member": {
      "wallet_id": "member-wallet-address",
      "role": "Template Designer"
    }
  }'
      </div>

      <h2>Step 4 — List and Manage Members</h2>
      <p>View all organization members and their roles:</p>
      <div class="code-block" data-lang="bash">
curl https://blockv-labs.io/organizations/{orgId}/members \\
  -H "Authorization: Bearer $DUAL_TOKEN"
      </div>
      <p>Remove a member when needed:</p>
      <div class="code-block" data-lang="bash">
curl -X DELETE https://blockv-labs.io/organizations/{orgId}/members/{walletId} \\
  -H "Authorization: Bearer $DUAL_TOKEN"
      </div>

      <div class="callout">
        <strong>Best Practice:</strong> Follow the principle of least privilege — give members only the permissions they need. Use the Template Designer role for content creators and restrict <code>objects.delete</code> and <code>webhooks.manage</code> to admins.
      </div>

      <h2>What's Next?</h2>
      <p>With your team in place, learn to <a href="/docs/tutorials/search-filter-objects">Search &amp; Filter Objects</a> across your growing token library.</p>
    `,
  },
  {
    slug: "search-filter-objects",
    title: "Search & Filter Objects",
    description: "Use DUAL's search API to query, filter, and paginate across large object collections.",
    time: "10 min",
    difficulty: "Beginner",
    prerequisites: [
      "A DUAL account with minted objects",
      "Familiarity with query parameters",
    ],
    content: `
      <h2>What You'll Build</h2>
      <p>As your token library grows, you'll need efficient ways to find objects. DUAL provides powerful search and filter capabilities — by template, owner, properties, and more. In this tutorial you'll master the object query API with pagination, sorting, and aggregation.</p>

      <h2>Step 1 — Basic Object Listing</h2>
      <p>Start with a simple paginated list of your objects:</p>
      <div class="code-block" data-lang="bash">
curl "https://blockv-labs.io/objects?limit=10&offset=0" \\
  -H "Authorization: Bearer $DUAL_TOKEN"
      </div>
      <p>The response includes a <code>results</code> array and pagination metadata (<code>total</code>, <code>limit</code>, <code>offset</code>).</p>

      <h2>Step 2 — Filter by Template</h2>
      <p>Retrieve only objects minted from a specific template:</p>
      <div class="code-block" data-lang="bash">
curl "https://blockv-labs.io/objects?template_id=your-template-id&limit=20" \\
  -H "Authorization: Bearer $DUAL_TOKEN"
      </div>

      <h2>Step 3 — Search by Properties</h2>
      <p>Use the search endpoint to find objects by their custom properties:</p>
      <div class="code-block" data-lang="bash">
curl -X POST https://blockv-labs.io/objects/search \\
  -H "Authorization: Bearer $DUAL_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "filters": {
      "template_id": "my-org::loyalty-card::v1",
      "properties.tier": "gold",
      "properties.points": { "$gte": 500 }
    },
    "sort": { "properties.points": -1 },
    "limit": 50
  }'
      </div>
      <p>Supported filter operators:</p>
      <table>
        <thead><tr><th>Operator</th><th>Description</th><th>Example</th></tr></thead>
        <tbody>
          <tr><td><code>$eq</code></td><td>Equal to</td><td><code>{"tier": {"$eq": "gold"}}</code></td></tr>
          <tr><td><code>$gte</code></td><td>Greater than or equal</td><td><code>{"points": {"$gte": 100}}</code></td></tr>
          <tr><td><code>$lte</code></td><td>Less than or equal</td><td><code>{"points": {"$lte": 1000}}</code></td></tr>
          <tr><td><code>$in</code></td><td>In array</td><td><code>{"tier": {"$in": ["gold","platinum"]}}</code></td></tr>
          <tr><td><code>$exists</code></td><td>Field exists</td><td><code>{"redeemed_at": {"$exists": true}}</code></td></tr>
        </tbody>
      </table>

      <h2>Step 4 — Count Objects</h2>
      <p>Get a quick count without fetching full objects — useful for dashboards:</p>
      <div class="code-block" data-lang="bash">
curl -X POST https://blockv-labs.io/objects/count \\
  -H "Authorization: Bearer $DUAL_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "filters": {
      "template_id": "my-org::loyalty-card::v1",
      "properties.redeemed": false
    }
  }'
      </div>

      <h2>Step 5 — Navigate Object Hierarchies</h2>
      <p>Objects can have parent-child relationships. Query the hierarchy:</p>
      <div class="code-block" data-lang="bash">
# Get children of an object
curl "https://blockv-labs.io/objects/{objectId}/children" \\
  -H "Authorization: Bearer $DUAL_TOKEN"

# Get parents of an object
curl "https://blockv-labs.io/objects/{objectId}/parents" \\
  -H "Authorization: Bearer $DUAL_TOKEN"
      </div>

      <div class="callout">
        <strong>Performance Tip:</strong> Always include a <code>template_id</code> filter when searching large datasets. This lets DUAL use indexed lookups instead of full scans.
      </div>

      <h2>What's Next?</h2>
      <p>Ready to go public? Try <a href="/docs/tutorials/public-api-indexer">Querying the Public API</a> to build read-only interfaces without authentication.</p>
    `,
  },
  {
    slug: "public-api-indexer",
    title: "Querying the Public API",
    description: "Build read-only interfaces using the unauthenticated public indexer for token discovery and verification.",
    time: "10 min",
    difficulty: "Beginner",
    prerequisites: [
      "Basic REST API knowledge",
      "A public template ID (or use the demo template)",
    ],
    content: `
      <h2>What You'll Build</h2>
      <p>DUAL's Public API (indexer) provides read-only access to on-chain data without authentication. This is perfect for building <strong>token explorers</strong>, <strong>verification pages</strong>, and <strong>public-facing marketplaces</strong>. In this tutorial you'll query templates, objects, and sequencer data using only public endpoints.</p>

      <h2>Step 1 — Discover Public Templates</h2>
      <p>List all publicly available templates — no auth required:</p>
      <div class="code-block" data-lang="bash">
curl https://blockv-labs.io/pub/templates
      </div>
      <p>Only templates marked as <code>"public": true</code> appear here.</p>

      <h2>Step 2 — Look Up an Object</h2>
      <p>Retrieve public details for any object by ID:</p>
      <div class="code-block" data-lang="bash">
curl https://blockv-labs.io/pub/objects/{objectId}
      </div>
      <p>This returns ownership info, properties, and face URLs — everything a viewer needs to render the object.</p>

      <h2>Step 3 — Query the Sequencer</h2>
      <p>The sequencer provides on-chain verification data. Query recent batches to see what's been anchored:</p>
      <div class="code-block" data-lang="bash">
# Get recent sequencer checkpoints
curl https://blockv-labs.io/pub/sequencer/checkpoints

# Verify a specific batch
curl https://blockv-labs.io/pub/sequencer/batches/{batchId}
      </div>

      <h2>Step 4 — Build a Token Explorer</h2>
      <p>Here's a complete JavaScript snippet that fetches and displays public tokens:</p>
      <div class="code-block" data-lang="javascript">
const API = 'https://blockv-labs.io/pub';

async function loadPublicTokens(templateId) {
  const template = await fetch(
    \"\" + API + "/templates/\" + templateId + "\"
  ).then(r => r.json());

  const objects = await fetch(
    \"\" + API + "/objects?template_id=\" + templateId + "&limit=50\"
  ).then(r => r.json());

  return {
    template: template.name,
    tokens: objects.results.map(obj => ({
      id: obj.id,
      owner: obj.owner,
      properties: obj.properties,
      face: obj.faces?.[0]?.meta?.image || null
    }))
  };
}
      </div>

      <div class="callout">
        <strong>CORS Enabled:</strong> All public API endpoints have CORS enabled, so you can call them directly from browser JavaScript without a backend proxy.
      </div>

      <h2>What's Next?</h2>
      <p>Want AI to build on your platform? Try <a href="/docs/tutorials/ai-agent-mcp">Building an AI Agent with MCP</a> to connect Claude directly to your DUAL instance.</p>
    `,
  },
  {
    slug: "ai-agent-mcp",
    title: "Build an AI Agent with MCP",
    description: "Connect Claude or any MCP-compatible AI to your DUAL instance using the Model Context Protocol server.",
    time: "20 min",
    difficulty: "Advanced",
    prerequisites: [
      "Node.js 18+ installed",
      "A DUAL account with API key",
      "Claude Desktop, Cursor, or Claude Code installed",
    ],
    content: `
      <h2>What You'll Build</h2>
      <p>The <strong>Model Context Protocol (MCP)</strong> lets AI agents interact with external tools natively. DUAL's MCP server exposes 80 tools across 14 API modules — meaning an AI agent can create templates, mint tokens, execute actions, and query data using natural language. In this tutorial you'll install the server, connect it to Claude, and build a complete tokenization workflow driven by conversation.</p>

      <h2>Step 1 — Install the MCP Server</h2>
      <div class="code-block" data-lang="bash">
git clone https://github.com/ro-ro-b/dual-mcp-server.git
cd dual-mcp-server
npm install
npm run build
      </div>

      <h2>Step 2 — Configure Claude Desktop</h2>
      <p>Add the DUAL server to your Claude Desktop config:</p>
      <div class="code-block" data-lang="json">
{
  "mcpServers": {
    "dual": {
      "command": "node",
      "args": ["/path/to/dual-mcp-server/dist/index.js"],
      "env": {
        "DUAL_API_KEY": "your-api-key-here"
      }
    }
  }
}
      </div>
      <p>Config file locations:</p>
      <table>
        <thead><tr><th>Platform</th><th>Path</th></tr></thead>
        <tbody>
          <tr><td>macOS</td><td><code>~/Library/Application Support/Claude/claude_desktop_config.json</code></td></tr>
          <tr><td>Windows</td><td><code>%APPDATA%\\Claude\\claude_desktop_config.json</code></td></tr>
          <tr><td>Linux</td><td><code>~/.config/Claude/claude_desktop_config.json</code></td></tr>
        </tbody>
      </table>
      <p>Restart Claude Desktop after saving.</p>

      <h2>Step 3 — Authenticate via Chat</h2>
      <p>If you didn't set an API key, authenticate interactively:</p>
      <div class="code-block" data-lang="text">
You: Log me into DUAL with email dev@example.com

Claude: [calls dual_login] Logged in as dev@example.com. Session authenticated.
      </div>

      <h2>Step 4 — Build a Token with Natural Language</h2>
      <p>Describe what you want and let the AI handle the API calls:</p>
      <div class="code-block" data-lang="text">
You: Create a reward token template called "Coffee Stamp Card" with properties
     for stamps (number, default 0), max_stamps (10), and redeemed (false).

Claude: [calls dual_create_template]
        Created template "Coffee Stamp Card" (ID: tmpl_abc123).

You: Mint 5 of those for wallet "wallet_xyz"

Claude: [calls dual_execute_action to mint 5 objects]
        Minted 5 Coffee Stamp Card objects.

You: Set up a webhook to notify me when any get redeemed

Claude: [calls dual_create_webhook]
        Webhook created for object.updated events.
      </div>

      <h2>Step 5 — Available Modules</h2>
      <p>The MCP server exposes 14 modules with 80 tools total:</p>
      <table>
        <thead><tr><th>Module</th><th>Tools</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td>Wallets</td><td>10</td><td>Auth, registration, profile</td></tr>
          <tr><td>Organizations</td><td>10</td><td>Multi-tenant workspaces</td></tr>
          <tr><td>Templates</td><td>7</td><td>Token blueprint CRUD</td></tr>
          <tr><td>Objects</td><td>8</td><td>Token instances, search</td></tr>
          <tr><td>Actions</td><td>7</td><td>Event Bus operations</td></tr>
          <tr><td>Faces</td><td>6</td><td>Visual representations</td></tr>
          <tr><td>Storage</td><td>4</td><td>File management</td></tr>
          <tr><td>Webhooks</td><td>6</td><td>Real-time notifications</td></tr>
          <tr><td>Notifications</td><td>5</td><td>Message sending</td></tr>
          <tr><td>Sequencer</td><td>4</td><td>Batch and ZK queries</td></tr>
          <tr><td>API Keys</td><td>3</td><td>Access management</td></tr>
          <tr><td>Payments</td><td>2</td><td>Deposits and config</td></tr>
          <tr><td>Support</td><td>3</td><td>Feature requests</td></tr>
          <tr><td>Public API</td><td>5</td><td>Read-only (no auth)</td></tr>
        </tbody>
      </table>

      <h2>Alternative: Claude Code CLI</h2>
      <div class="code-block" data-lang="bash">
claude mcp add dual node /path/to/dual-mcp-server/dist/index.js
      </div>

      <div class="callout">
        <strong>Security Note:</strong> The MCP server runs locally on your machine. Your API key and JWT tokens never leave your computer — they're passed directly to the DUAL API over HTTPS.
      </div>

      <h2>Summary</h2>
      <p>You've connected an AI agent to the DUAL platform via MCP. The agent can now autonomously create templates, mint tokens, manage organizations, and execute actions through natural conversation. For the full reference, see the <a href="/docs/developer-kit/mcp">MCP Server docs</a> and <a href="/docs/developer-kit/mcp-guide">Setup Guide</a>.</p>
    `,
  },
  {
    slug: "ai-token-classifier",
    title: "AI-Powered Token Classification",
    description: "Use an LLM to automatically classify, tag, and enrich token metadata based on object properties.",
    time: "18 min",
    difficulty: "Advanced",
    prerequisites: [
      "A DUAL account with minted objects",
      "OpenAI or Anthropic API key",
      "Node.js 18+ installed",
    ],
    content: `
      <h2>What You'll Build</h2>
      <p>Token libraries grow fast, and manual tagging doesn't scale. In this tutorial you'll build an <strong>AI classification pipeline</strong> that reads token properties, uses an LLM to generate semantic tags, and writes those tags back to the objects — automatically organizing your entire collection.</p>

      <h2>Step 1 — Set Up the Project</h2>
      <p>Create a new Node.js project with the required dependencies:</p>
      <div class="code-block" data-lang="bash">
mkdir dual-ai-classifier && cd dual-ai-classifier
npm init -y
npm install openai node-fetch
      </div>

      <h2>Step 2 — Fetch Objects to Classify</h2>
      <p>Start by pulling a batch of untagged objects from your DUAL instance:</p>
      <div class="code-block" data-lang="javascript">
const API = 'https://blockv-labs.io';

async function fetchUntaggedObjects(token, templateId) {
  const res = await fetch(
    \"\" + API + "/objects/search\",
    {
      method: 'POST',
      headers: {
        'Authorization': \"Bearer \" + token + "\",
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        filters: {
          template_id: templateId,
          'properties.ai_tags': { '$exists': false }
        },
        limit: 50
      })
    }
  );
  return (await res.json()).results;
}
      </div>

      <h2>Step 3 — Classify with an LLM</h2>
      <p>Send each object's properties to the LLM for semantic analysis and tag generation:</p>
      <div class="code-block" data-lang="javascript">
import OpenAI from 'openai';
const openai = new OpenAI();

async function classifyObject(obj) {
  const completion = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      {
        role: 'system',
        content: \"You are a token classification engine. Given an object's properties, return a JSON object with:
- "category": one of ["loyalty", "collectible", "access-pass", "certificate", "coupon", "identity"]
- "tags": array of 3-5 descriptive tags
- "sentiment": "positive", "neutral", or "negative"
- "summary": one-sentence description\"
      },
      {
        role: 'user',
        content: JSON.stringify(obj.properties)
      }
    ],
    response_format: { type: 'json_object' }
  });

  return JSON.parse(completion.choices[0].message.content);
}
      </div>

      <h2>Step 4 — Write Tags Back to DUAL</h2>
      <p>Update each object with the AI-generated classification:</p>
      <div class="code-block" data-lang="javascript">
async function tagObject(token, objectId, classification) {
  await fetch(\"\" + API + "/objects/\" + objectId + "\", {
    method: 'PATCH',
    headers: {
      'Authorization': \"Bearer \" + token + "\",
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      properties: {
        ai_tags: classification.tags,
        ai_category: classification.category,
        ai_summary: classification.summary,
        ai_classified_at: new Date().toISOString()
      }
    })
  });
}
      </div>

      <h2>Step 5 — Run the Pipeline</h2>
      <p>Wire it all together into a batch classification pipeline:</p>
      <div class="code-block" data-lang="javascript">
async function runClassificationPipeline(token, templateId) {
  const objects = await fetchUntaggedObjects(token, templateId);
  console.log(\"Classifying \" + objects.length + " objects...\");

  for (const obj of objects) {
    const classification = await classifyObject(obj);
    await tagObject(token, obj.id, classification);
    console.log(\"Tagged \" + obj.id + ": \" + classification.category + "\");
  }

  console.log('Classification complete.');
}
      </div>

      <div class="callout">
        <strong>Cost Optimization:</strong> Batch multiple objects into a single LLM call by sending an array of properties. This reduces API calls and cost by up to 10x. Use GPT-4o-mini or Claude Haiku for classification tasks — they're fast and cheap.
      </div>

      <div class="callout">
        <strong>Companion Repo:</strong> Get the full working source code for this tutorial at <a href="https://github.com/ro-ro-b/dual-ai-classifier" target="_blank">github.com/ro-ro-b/dual-ai-classifier</a> — clone it, add your API keys, and run it locally in minutes.
      </div>

      <h2>What's Next?</h2>
      <p>Now that your tokens are tagged, try <a href="/docs/tutorials/ai-chatbot-integration">Building a Conversational Token Assistant</a> so users can query their collection with natural language.</p>
    `,
  },
  {
    slug: "ai-chatbot-integration",
    title: "Conversational Token Assistant",
    description: "Build a chatbot that lets users query, transfer, and manage their tokens through natural language.",
    time: "25 min",
    difficulty: "Advanced",
    prerequisites: [
      "Completed the Build an AI Agent with MCP tutorial",
      "Node.js 18+ and the DUAL TypeScript SDK",
      "An Anthropic or OpenAI API key",
    ],
    content: `
      <h2>What You'll Build</h2>
      <p>Most users don't want to learn API endpoints — they want to talk to their tokens. In this tutorial you'll build a <strong>conversational assistant</strong> that can look up tokens, check balances, transfer objects, and answer questions about a user's collection — all through chat. We'll use tool-calling (function calling) so the LLM can invoke DUAL APIs on behalf of the user.</p>

      <h2>Step 1 — Define the Tool Schema</h2>
      <p>Create the tool definitions that tell the LLM what DUAL operations are available:</p>
      <div class="code-block" data-lang="javascript">
const tools = [
  {
    type: 'function',
    function: {
      name: 'list_my_tokens',
      description: 'List tokens owned by the current user, optionally filtered by template',
      parameters: {
        type: 'object',
        properties: {
          template_name: {
            type: 'string',
            description: 'Filter by template name (optional)'
          },
          limit: {
            type: 'number',
            description: 'Max results (default 10)'
          }
        }
      }
    }
  },
  {
    type: 'function',
    function: {
      name: 'get_token_details',
      description: 'Get full details of a specific token by ID',
      parameters: {
        type: 'object',
        properties: {
          object_id: { type: 'string', description: 'The token/object ID' }
        },
        required: ['object_id']
      }
    }
  },
  {
    type: 'function',
    function: {
      name: 'transfer_token',
      description: 'Transfer a token to another wallet',
      parameters: {
        type: 'object',
        properties: {
          object_id: { type: 'string', description: 'Token to transfer' },
          recipient: { type: 'string', description: 'Recipient wallet or email' }
        },
        required: ['object_id', 'recipient']
      }
    }
  },
  {
    type: 'function',
    function: {
      name: 'search_tokens',
      description: 'Search tokens by properties like points, tier, or tags',
      parameters: {
        type: 'object',
        properties: {
          query: { type: 'string', description: 'Natural language search query' },
          filters: { type: 'object', description: 'Property filters' }
        },
        required: ['query']
      }
    }
  }
];
      </div>

      <h2>Step 2 — Implement Tool Handlers</h2>
      <p>Each tool maps to a DUAL API call:</p>
      <div class="code-block" data-lang="javascript">
const API = 'https://blockv-labs.io';

const toolHandlers = {
  async list_my_tokens({ template_name, limit = 10 }) {
    const params = new URLSearchParams({ limit });
    if (template_name) params.set('template_name', template_name);
    const res = await dualFetch(\"/objects?\" + params + "\");
    return res.results.map(o => ({
      id: o.id, name: o.template_name,
      properties: o.properties
    }));
  },

  async get_token_details({ object_id }) {
    return dualFetch(\"/objects/\" + object_id + "\");
  },

  async transfer_token({ object_id, recipient }) {
    return dualFetch('/ebus/events', {
      method: 'POST',
      body: JSON.stringify({
        action_name: 'Transfer',
        object_id, new_owner: recipient
      })
    });
  },

  async search_tokens({ query, filters }) {
    return dualFetch('/objects/search', {
      method: 'POST',
      body: JSON.stringify({ filters: filters || {}, limit: 20 })
    });
  }
};
      </div>

      <h2>Step 3 — Build the Chat Loop</h2>
      <p>Create the conversation loop that sends messages, handles tool calls, and streams responses:</p>
      <div class="code-block" data-lang="javascript">
import Anthropic from '@anthropic-ai/sdk';
const anthropic = new Anthropic();

async function chat(userMessage, history = []) {
  history.push({ role: 'user', content: userMessage });

  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-5-20250514',
    max_tokens: 1024,
    system: \"You are a helpful assistant for managing DUAL tokens.
The user may ask about their tokens, request transfers, or search
their collection. Use the available tools to fulfill requests.
Always confirm before executing transfers.\",
    tools,
    messages: history
  });

  // Handle tool use
  if (response.stop_reason === 'tool_use') {
    const toolUse = response.content.find(b => b.type === 'tool_use');
    const result = await toolHandlers[toolUse.name](toolUse.input);

    history.push({ role: 'assistant', content: response.content });
    history.push({
      role: 'user',
      content: [{
        type: 'tool_result',
        tool_use_id: toolUse.id,
        content: JSON.stringify(result)
      }]
    });

    return chat('', history); // Continue the conversation
  }

  return response.content[0].text;
}
      </div>

      <h2>Step 4 — Example Conversations</h2>
      <p>Here's what the assistant can handle:</p>
      <div class="code-block" data-lang="text">
User: What tokens do I have?
Bot:  [calls list_my_tokens] You have 12 tokens across 3 templates:
      - 5x Coffee Stamp Cards (2 fully stamped)
      - 4x Event Passes (upcoming concert, 2 expired)
      - 3x Loyalty Badges (gold tier)

User: Transfer my gold badge to alice@example.com
Bot:  I can transfer your Gold Loyalty Badge (ID: obj_789) to
      alice@example.com. This action cannot be undone. Proceed?

User: Yes
Bot:  [calls transfer_token] Done! The Gold Loyalty Badge has been
      transferred to alice@example.com.
      </div>

      <div class="callout">
        <strong>Safety Pattern:</strong> Always confirm destructive or irreversible actions (transfers, burns, deletes) before executing them. The assistant should summarize what it's about to do and wait for explicit confirmation.
      </div>

      <div class="callout">
        <strong>Companion Repo:</strong> Get the full working source code for this tutorial at <a href="https://github.com/ro-ro-b/dual-ai-chatbot" target="_blank">github.com/ro-ro-b/dual-ai-chatbot</a> — clone it, add your API keys, and run it locally in minutes.
      </div>

      <h2>What's Next?</h2>
      <p>Add intelligence to your workflows with <a href="/docs/tutorials/ai-webhook-responder">AI-Powered Webhook Automation</a> — let AI decide how to handle incoming events.</p>
    `,
  },
  {
    slug: "ai-webhook-responder",
    title: "AI-Powered Webhook Automation",
    description: "Use an LLM to interpret incoming webhook events and trigger intelligent, context-aware responses.",
    time: "20 min",
    difficulty: "Advanced",
    prerequisites: [
      "Completed the Set Up Webhooks tutorial",
      "Node.js 18+ with Express",
      "An Anthropic or OpenAI API key",
    ],
    content: `
      <h2>What You'll Build</h2>
      <p>Standard webhook handlers use rigid if/else logic — transfer events go here, updates go there. In this tutorial you'll build an <strong>AI-powered webhook responder</strong> that interprets events with an LLM, decides the best response, and executes it autonomously. Think of it as giving your webhook pipeline a brain.</p>

      <h2>Step 1 — Set Up the Webhook Server</h2>
      <div class="code-block" data-lang="bash">
mkdir dual-ai-webhooks && cd dual-ai-webhooks
npm init -y
npm install express @anthropic-ai/sdk
      </div>

      <h2>Step 2 — Define the AI Decision Engine</h2>
      <p>Create a function that takes a raw webhook event and returns an action plan:</p>
      <div class="code-block" data-lang="javascript">
import Anthropic from '@anthropic-ai/sdk';
const anthropic = new Anthropic();

async function decideAction(event) {
  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-5-20250514',
    max_tokens: 512,
    system: \"You are an event handler for a token platform.
Given a webhook event, decide the appropriate response.
Return JSON with:
- "action": one of ["notify_owner", "update_property", "trigger_webhook", "log_only", "escalate"]
- "reason": why you chose this action
- "params": any parameters needed to execute the action

Rules:
- Transfers over 100 tokens: escalate to admin
- Property changes on premium templates: notify the owner
- Failed actions: log and retry once
- Suspicious patterns (>10 transfers/minute): escalate immediately\",
    messages: [{
      role: 'user',
      content: JSON.stringify(event, null, 2)
    }]
  });

  return JSON.parse(response.content[0].text);
}
      </div>

      <h2>Step 3 — Build Action Executors</h2>
      <p>Implement handlers for each action the AI can decide on:</p>
      <div class="code-block" data-lang="javascript">
const actionExecutors = {
  async notify_owner({ object_id, message }) {
    const obj = await dualFetch(\"/objects/\" + object_id + "\");
    await dualFetch('/notifications/send', {
      method: 'POST',
      body: JSON.stringify({
        recipient: obj.owner,
        title: 'Token Activity Alert',
        body: message
      })
    });
  },

  async update_property({ object_id, properties }) {
    await dualFetch(\"/objects/\" + object_id + "\", {
      method: 'PATCH',
      body: JSON.stringify({ properties })
    });
  },

  async escalate({ event, reason }) {
    await dualFetch('/notifications/send', {
      method: 'POST',
      body: JSON.stringify({
        recipient: process.env.ADMIN_WALLET,
        title: 'ESCALATION: ' + reason,
        body: JSON.stringify(event)
      })
    });
  },

  async log_only({ event, reason }) {
    console.log('[AI Decision]', reason, event.event_type);
  }
};
      </div>

      <h2>Step 4 — Wire It Together</h2>
      <div class="code-block" data-lang="javascript">
import express from 'express';
const app = express();
app.use(express.json());

app.post('/webhooks/ai', async (req, res) => {
  const event = req.body;
  res.status(200).json({ received: true }); // ACK immediately

  try {
    const decision = await decideAction(event);
    console.log(\"[AI] \" + event.event_type + " → \" + decision.action + ": \" + decision.reason + "\");

    const executor = actionExecutors[decision.action];
    if (executor) {
      await executor({ ...decision.params, event });
    }
  } catch (err) {
    console.error('AI decision failed:', err.message);
    // Fall back to logging
    await actionExecutors.log_only({
      event, reason: 'AI decision error — logged for review'
    });
  }
});

app.listen(3000, () => console.log('AI webhook responder on :3000'));
      </div>

      <h2>Step 5 — Register the Webhook</h2>
      <div class="code-block" data-lang="bash">
curl -X POST https://blockv-labs.io/webhooks \\
  -H "Authorization: Bearer $DUAL_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "webhook": {
      "url": "https://your-server.com/webhooks/ai",
      "events": ["object.transferred", "object.updated", "action.failed"],
      "active": true
    }
  }'
      </div>

      <div class="callout">
        <strong>Latency Tip:</strong> Always ACK the webhook immediately (200 OK) before running the AI decision. DUAL expects a response within 5 seconds. Process the event asynchronously after acknowledging receipt.
      </div>

      <div class="callout">
        <strong>Companion Repo:</strong> Get the full working source code for this tutorial at <a href="https://github.com/ro-ro-b/dual-ai-webhooks" target="_blank">github.com/ro-ro-b/dual-ai-webhooks</a> — clone it, add your API keys, and run it locally in minutes.
      </div>

      <h2>What's Next?</h2>
      <p>Add semantic search to your token library with <a href="/docs/tutorials/ai-semantic-search">Semantic Search over Token Metadata</a>.</p>
    `,
  },
  {
    slug: "ai-semantic-search",
    title: "Semantic Search over Token Metadata",
    description: "Build a vector search layer over DUAL objects using embeddings for natural-language token discovery.",
    time: "22 min",
    difficulty: "Advanced",
    prerequisites: [
      "A DUAL account with 50+ minted objects",
      "Node.js 18+ installed",
      "An OpenAI API key (for embeddings)",
    ],
    content: `
      <h2>What You'll Build</h2>
      <p>DUAL's built-in search is great for exact filters, but what about fuzzy queries like "find tokens similar to my gold loyalty card" or "show me anything related to summer events"? In this tutorial you'll build a <strong>semantic search layer</strong> that uses vector embeddings to find tokens by meaning, not just exact property matches.</p>

      <h2>Step 1 — Project Setup</h2>
      <div class="code-block" data-lang="bash">
mkdir dual-semantic-search && cd dual-semantic-search
npm init -y
npm install openai node-fetch
      </div>

      <h2>Step 2 — Generate Embeddings for Your Tokens</h2>
      <p>First, pull your objects and create a text representation of each one, then embed it:</p>
      <div class="code-block" data-lang="javascript">
import OpenAI from 'openai';
const openai = new OpenAI();
const API = 'https://blockv-labs.io';

function objectToText(obj) {
  const props = Object.entries(obj.properties || {})
    .map(([k, v]) => \"\" + k + ": \" + v + "\")
    .join(', ');
  return \"Template: \" + obj.template_name + ". Properties: \" + props + "\";
}

async function embedText(text) {
  const res = await openai.embeddings.create({
    model: 'text-embedding-3-small',
    input: text
  });
  return res.data[0].embedding;
}

async function indexAllObjects(token) {
  const objects = await dualFetch('/objects?limit=200');
  const index = [];

  for (const obj of objects.results) {
    const text = objectToText(obj);
    const embedding = await embedText(text);
    index.push({ id: obj.id, text, embedding, obj });
  }

  return index;
}
      </div>

      <h2>Step 3 — Build the Search Function</h2>
      <p>Use cosine similarity to find the most relevant tokens for a natural-language query:</p>
      <div class="code-block" data-lang="javascript">
function cosineSimilarity(a, b) {
  let dot = 0, magA = 0, magB = 0;
  for (let i = 0; i &lt; a.length; i++) {
    dot += a[i] * b[i];
    magA += a[i] * a[i];
    magB += b[i] * b[i];
  }
  return dot / (Math.sqrt(magA) * Math.sqrt(magB));
}

async function semanticSearch(query, index, topK = 5) {
  const queryEmbedding = await embedText(query);

  const scored = index.map(item => ({
    ...item,
    score: cosineSimilarity(queryEmbedding, item.embedding)
  }));

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, topK);
}
      </div>

      <h2>Step 4 — Query with Natural Language</h2>
      <div class="code-block" data-lang="javascript">
async function main() {
  const token = process.env.DUAL_TOKEN;
  console.log('Indexing objects...');
  const index = await indexAllObjects(token);
  console.log(\"Indexed \" + index.length + " objects.\\n\");

  const queries = [
    'loyalty cards with high point balances',
    'expired event passes from last month',
    'anything related to coffee or food rewards',
    'premium collectible tokens'
  ];

  for (const query of queries) {
    console.log(\"Query: "\" + query\");
    const results = await semanticSearch(query, index);
    results.forEach((r, i) => {
      console.log(\"  \" + i + 1 + ". \" + r.text + " (score: \" + r.score.toFixed(3) + ")\");
    });
    console.log();
  }
}

main();
      </div>

      <h2>Step 5 — Add to Your Chatbot</h2>
      <p>Integrate semantic search as a tool in your conversational assistant:</p>
      <div class="code-block" data-lang="javascript">
// Add to your chatbot's tool definitions
{
  type: 'function',
  function: {
    name: 'semantic_search_tokens',
    description: 'Find tokens using natural language description',
    parameters: {
      type: 'object',
      properties: {
        query: {
          type: 'string',
          description: 'Natural language search query'
        },
        limit: {
          type: 'number',
          description: 'Max results (default 5)'
        }
      },
      required: ['query']
    }
  }
}
      </div>

      <div class="callout">
        <strong>Production Scaling:</strong> For collections over 1,000 objects, swap the in-memory index for a vector database like Pinecone, Weaviate, or pgvector. The embedding generation stays the same — you just change the storage and retrieval layer.
      </div>

      <div class="callout">
        <strong>Companion Repo:</strong> Get the full working source code for this tutorial at <a href="https://github.com/ro-ro-b/dual-ai-semantic-search" target="_blank">github.com/ro-ro-b/dual-ai-semantic-search</a> — clone it, add your API keys, and run it locally in minutes.
      </div>

      <h2>What's Next?</h2>
      <p>Add guardrails to your AI integrations with <a href="/docs/tutorials/ai-guardrails">AI Safety &amp; Guardrails for Token Operations</a>.</p>
    `,
  },
  {
    slug: "ai-guardrails",
    title: "AI Safety & Guardrails for Token Operations",
    description: "Implement validation layers, rate limiting, and approval workflows to safely let AI agents manage tokens.",
    time: "15 min",
    difficulty: "Intermediate",
    prerequisites: [
      "Completed the Build an AI Agent with MCP tutorial",
      "Basic understanding of LLM tool calling",
    ],
    content: `
      <h2>What You'll Build</h2>
      <p>AI agents are powerful, but power without guardrails is dangerous. An unchecked LLM could transfer all your tokens, delete templates, or burn through your API rate limits. In this tutorial you'll build a <strong>safety layer</strong> that wraps DUAL API calls with validation, rate limiting, human-in-the-loop approval, and audit logging — ensuring AI agents operate within safe boundaries.</p>

      <h2>Step 1 — Define Permission Tiers</h2>
      <p>Categorize every DUAL operation by risk level:</p>
      <div class="code-block" data-lang="javascript">
const PERMISSION_TIERS = {
  // Green: AI can execute freely
  read: [
    'list_objects', 'get_object', 'list_templates',
    'get_template', 'search_objects', 'get_balance',
    'list_webhooks', 'get_sequencer_status'
  ],

  // Yellow: AI can execute with rate limits
  limited: [
    'mint_object', 'update_properties',
    'create_webhook', 'send_notification'
  ],

  // Red: Requires human approval
  restricted: [
    'transfer_object', 'burn_object',
    'delete_template', 'create_api_key',
    'bulk_transfer', 'update_template'
  ],

  // Black: AI can never execute
  forbidden: [
    'delete_organization', 'change_owner',
    'reset_api_keys', 'modify_roles'
  ]
};
      </div>

      <h2>Step 2 — Build the Rate Limiter</h2>
      <p>Prevent AI agents from making too many calls in a short period:</p>
      <div class="code-block" data-lang="javascript">
class RateLimiter {
  constructor() {
    this.windows = new Map();
  }

  check(operation, limits = { perMinute: 30, perHour: 200 }) {
    const now = Date.now();
    const key = operation;

    if (!this.windows.has(key)) {
      this.windows.set(key, []);
    }

    const calls = this.windows.get(key);
    // Clean old entries
    const minuteAgo = now - 60000;
    const hourAgo = now - 3600000;
    const recentMinute = calls.filter(t => t > minuteAgo);
    const recentHour = calls.filter(t => t > hourAgo);

    if (recentMinute.length >= limits.perMinute) {
      return { allowed: false, reason: 'Rate limit: too many calls per minute' };
    }
    if (recentHour.length >= limits.perHour) {
      return { allowed: false, reason: 'Rate limit: too many calls per hour' };
    }

    calls.push(now);
    this.windows.set(key, calls.filter(t => t > hourAgo));
    return { allowed: true };
  }
}
      </div>

      <h2>Step 3 — Human-in-the-Loop Approval</h2>
      <p>For restricted operations, pause execution and ask for confirmation:</p>
      <div class="code-block" data-lang="javascript">
class ApprovalQueue {
  constructor() {
    this.pending = new Map();
  }

  async requestApproval(operation, params, context) {
    const id = crypto.randomUUID();
    const request = {
      id, operation, params, context,
      requestedAt: new Date().toISOString(),
      status: 'pending'
    };

    this.pending.set(id, request);

    // Send notification to admin
    await sendAdminNotification({
      title: \"AI Agent Approval Request\",
      body: \"Operation: \" + operation + "\\nParams: \" + JSON.stringify(params) + "\\nContext: \" + context + "\",
      approval_id: id
    });

    return { approval_id: id, status: 'pending' };
  }

  approve(id) {
    const req = this.pending.get(id);
    if (req) { req.status = 'approved'; return true; }
    return false;
  }

  deny(id, reason) {
    const req = this.pending.get(id);
    if (req) { req.status = 'denied'; req.reason = reason; return true; }
    return false;
  }
}
      </div>

      <h2>Step 4 — The Guardrail Wrapper</h2>
      <p>Wrap every AI tool call through the safety layer:</p>
      <div class="code-block" data-lang="javascript">
const rateLimiter = new RateLimiter();
const approvalQueue = new ApprovalQueue();
const auditLog = [];

async function safeExecute(operation, params, aiContext) {
  // 1. Check if forbidden
  if (PERMISSION_TIERS.forbidden.includes(operation)) {
    auditLog.push({ operation, status: 'blocked', reason: 'forbidden' });
    return { error: 'This operation is not available to AI agents.' };
  }

  // 2. Check rate limits for non-read operations
  if (!PERMISSION_TIERS.read.includes(operation)) {
    const rateCheck = rateLimiter.check(operation);
    if (!rateCheck.allowed) {
      auditLog.push({ operation, status: 'rate_limited' });
      return { error: rateCheck.reason };
    }
  }

  // 3. Require approval for restricted operations
  if (PERMISSION_TIERS.restricted.includes(operation)) {
    const approval = await approvalQueue.requestApproval(
      operation, params, aiContext
    );
    auditLog.push({ operation, status: 'awaiting_approval', id: approval.approval_id });
    return { pending: true, message: 'Awaiting human approval', ...approval };
  }

  // 4. Execute
  const result = await executeOperation(operation, params);
  auditLog.push({
    operation, status: 'executed',
    timestamp: new Date().toISOString(), params
  });

  return result;
}
      </div>

      <h2>Step 5 — Audit Dashboard</h2>
      <p>Expose the audit log so you can review what the AI agent has been doing:</p>
      <div class="code-block" data-lang="javascript">
app.get('/admin/audit', (req, res) => {
  const { operation, status, since } = req.query;
  let logs = [...auditLog];

  if (operation) logs = logs.filter(l => l.operation === operation);
  if (status) logs = logs.filter(l => l.status === status);
  if (since) logs = logs.filter(l => new Date(l.timestamp) > new Date(since));

  res.json({
    total: logs.length,
    logs: logs.slice(-100) // Last 100 entries
  });
});
      </div>

      <div class="callout">
        <strong>Defense in Depth:</strong> These client-side guardrails are your first line of defense, but always combine them with server-side rate limits and DUAL's built-in permission system. Use scoped API keys that only grant the permissions the AI actually needs.
      </div>

      <div class="callout">
        <strong>Companion Repo:</strong> Get the full working source code for this tutorial at <a href="https://github.com/ro-ro-b/dual-ai-guardrails" target="_blank">github.com/ro-ro-b/dual-ai-guardrails</a> — clone it, add your API keys, and run it locally in minutes.
      </div>

      <h2>Summary</h2>
      <p>You've built a comprehensive safety layer for AI-powered token operations: permission tiers prevent dangerous calls, rate limiting stops runaway agents, human-in-the-loop approval catches high-risk operations, and audit logging provides full visibility. For more on the DUAL permission model, see <a href="/docs/tutorials/org-roles-permissions">Organization Roles &amp; Permissions</a>.</p>
    `,
  },
  {
    slug: "build-real-estate-app",
    title: "Build a Real Estate Tokenisation App",
    description: "End-to-end guide: from org setup to minting property tokens, transfers, payments, webhooks, and faces.",
    time: "45 min",
    difficulty: "Advanced",
    prerequisites: ["A DUAL account with an organization", "An API key or JWT token", "Node.js 18+ installed", "Basic TypeScript knowledge"],
    content: `
      <h2>What You'll Build</h2>
      <p>In this comprehensive tutorial, you'll build a <strong>real estate tokenisation platform</strong> where each property is a DUAL object with rich metadata, visual faces, payment integration, and automated webhook notifications. By the end, you'll have a complete TypeScript application that demonstrates how to mint property tokens, handle transfers, process payments, and react to state changes via webhooks.</p>

      <h2>Step 1 — Set Up Your Organization</h2>
      <p>Create an organization to manage your real estate tokenisation platform. This organization will contain your templates, objects, and team members with different roles.</p>
      <h3>Create an Organization</h3>
      <div class="code-block" data-lang="bash">
curl -X POST https://blockv-labs.io/organizations \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "Real Estate Tokens Inc",
    "description": "Property tokenisation platform"
  }'
      </div>
      <p>The response includes an <code>id</code> field — save it as your <code>ORG_ID</code>.</p>
      <h3>Invite Team Members</h3>
      <p>Add team members with specific roles (admin, agent, viewer):</p>
      <div class="code-block" data-lang="bash">
curl -X POST https://blockv-labs.io/organizations/{ORG_ID}/members \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "email": "agent@realestate.com",
    "role": "agent"
  }'
      </div>

      <h2>Step 2 — Design Your Property Template</h2>
      <p>Create a template that defines the structure of property tokens. This template includes properties for address, size, amenities, pricing, and status.</p>
      <div class="code-block" data-lang="bash">
curl -X POST https://blockv-labs.io/templates \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "Property",
    "organizationId": "{ORG_ID}",
    "properties": [
      {
        "name": "address",
        "type": "string",
        "required": true,
        "description": "Full property address"
      },
      {
        "name": "squareMeters",
        "type": "number",
        "required": true,
        "description": "Property size in square meters"
      },
      {
        "name": "bedrooms",
        "type": "number",
        "required": true
      },
      {
        "name": "bathrooms",
        "type": "number",
        "required": true
      },
      {
        "name": "price",
        "type": "number",
        "required": true,
        "description": "Price in USD"
      },
      {
        "name": "status",
        "type": "enum",
        "values": ["available", "reserved", "sold"],
        "default": "available",
        "required": true
      },
      {
        "name": "listingDate",
        "type": "string",
        "format": "date-time",
        "required": true
      },
      {
        "name": "geoLocation",
        "type": "object",
        "properties": {
          "latitude": { "type": "number" },
          "longitude": { "type": "number" }
        },
        "required": true
      }
    ],
    "actions": [
      {
        "name": "reserve",
        "description": "Reserve the property"
      },
      {
        "name": "purchase",
        "description": "Complete purchase of the property"
      },
      {
        "name": "transfer",
        "description": "Transfer ownership to another wallet"
      }
    ]
  }'
      </div>
      <p>Save the returned <code>templateId</code> for the next steps.</p>

      <h2>Step 3 — Add Visual Faces</h2>
      <p>Attach visual representations of your property token. Add an image face for property photos and a web face for interactive viewing.</p>
      <h3>Add Image Face</h3>
      <div class="code-block" data-lang="bash">
curl -X POST https://blockv-labs.io/templates/{TEMPLATE_ID}/faces \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "image",
    "type": "image",
    "mimeType": "image/jpeg",
    "url": "https://example.com/property-photo.jpg",
    "description": "Property exterior photo"
  }'
      </div>
      <h3>Add Web Face</h3>
      <div class="code-block" data-lang="bash">
curl -X POST https://blockv-labs.io/templates/{TEMPLATE_ID}/faces \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "web",
    "type": "web",
    "url": "https://your-domain.com/viewer/{objectId}",
    "description": "Interactive property viewer"
  }'
      </div>

      <h2>Step 4 — Mint Property Objects</h2>
      <p>Create token objects from your template. Each property becomes a unique, tokenized object on the DUAL network.</p>
      <div class="code-block" data-lang="bash">
# Mint Property 1: Luxury Penthouse
curl -X POST https://blockv-labs.io/objects \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "templateId": "{TEMPLATE_ID}",
    "organizationId": "{ORG_ID}",
    "properties": {
      "address": "123 Park Avenue, New York, NY 10016",
      "squareMeters": 500,
      "bedrooms": 4,
      "bathrooms": 3,
      "price": 8500000,
      "status": "available",
      "listingDate": "2026-01-15T00:00:00Z",
      "geoLocation": {
        "latitude": 40.7829,
        "longitude": -73.9654
      }
    }
  }'
      </div>
      <p>Repeat this process for 2-3 additional properties, varying the details. Save each <code>objectId</code> returned.</p>

      <h2>Step 5 — Set Up Payments</h2>
      <p>Configure payment processing for your real estate platform. This enables buyers to purchase properties using supported payment methods.</p>
      <h3>Check Payment Configuration</h3>
      <div class="code-block" data-lang="bash">
curl -X GET https://blockv-labs.io/payments/config \\
  -H "Authorization: Bearer YOUR_API_KEY"
      </div>
      <h3>Payment Flow</h3>
      <p>When a buyer executes the <code>purchase</code> action on a property:</p>
      <ol>
        <li>The system captures the buyer's wallet address</li>
        <li>A payment request is generated with the property price</li>
        <li>The buyer completes the payment</li>
        <li>Upon confirmation, ownership transfers to the buyer's wallet</li>
      </ol>
      <div class="callout">
        <strong>Tip:</strong> Payment flows integrate seamlessly with DUAL's object transfer mechanism. Configure your webhook (Step 6) to receive confirmation when payments complete.
      </div>

      <h2>Step 6 — Register Webhooks</h2>
      <p>Set up webhooks to receive real-time notifications when property statuses change. This allows your application to react to important events like reservations and purchases.</p>
      <div class="code-block" data-lang="bash">
curl -X POST https://blockv-labs.io/webhooks \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "url": "https://your-domain.com/webhooks/property-events",
    "events": ["object.status.changed", "action.executed", "object.transferred"],
    "organizationId": "{ORG_ID}"
  }'
      </div>
      <h3>Expected Webhook Payload</h3>
      <div class="code-block" data-lang="bash">
{
  "eventId": "evt_abc123",
  "eventType": "object.status.changed",
  "timestamp": "2026-03-14T10:30:00Z",
  "objectId": "obj_property001",
  "previousStatus": "available",
  "newStatus": "reserved",
  "actor": {
    "walletAddress": "0x742d35Cc6634C0532925a3b844Bc9e7595f42D07",
    "email": "buyer@example.com"
  },
  "metadata": {
    "actionId": "act_reserve123",
    "transactionHash": "0x123abc..."
  }
}
      </div>

      <h2>Step 7 — Execute Actions</h2>
      <p>Use the Event Bus to execute property actions. Let's reserve a property, which triggers the status change to "reserved".</p>
      <div class="code-block" data-lang="bash">
curl -X POST https://blockv-labs.io/ebus/actions \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "objectId": "{OBJECT_ID_1}",
    "action": "reserve",
    "actor": {
      "walletAddress": "0x742d35Cc6634C0532925a3b844Bc9e7595f42D07"
    },
    "parameters": {
      "reservationPeriod": 30
    }
  }'
      </div>
      <p>This action:</p>
      <ol>
        <li>Changes the property status from "available" to "reserved"</li>
        <li>Records the buyer's wallet address as the reserver</li>
        <li>Triggers a webhook notification to your application</li>
        <li>Creates an immutable on-chain record of the reservation</li>
      </ol>

      <h2>Step 8 — Transfer Ownership</h2>
      <p>After payment completes, transfer the property token to the buyer's wallet using the transfer action.</p>
      <div class="code-block" data-lang="bash">
curl -X POST https://blockv-labs.io/ebus/actions \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "objectId": "{OBJECT_ID_1}",
    "action": "transfer",
    "actor": {
      "walletAddress": "{SELLER_WALLET}"
    },
    "parameters": {
      "recipientWallet": "{BUYER_WALLET}",
      "transactionHash": "{PAYMENT_TX_HASH}"
    }
  }'
      </div>
      <p>After transfer, the buyer owns the property token, which they can view, further transfer, or use in other applications compatible with DUAL objects.</p>

      <h2>Step 9 — Query &amp; Verify</h2>
      <p>Use the Indexer (Public API) to verify the on-chain state of your property tokens at any time.</p>
      <div class="code-block" data-lang="bash">
curl -X GET "https://blockv-labs.io/indexer/objects/{OBJECT_ID}" \\
  -H "Authorization: Bearer YOUR_API_KEY"
      </div>
      <p>The response includes:</p>
      <ul>
        <li>Current owner wallet address</li>
        <li>All properties with their current values</li>
        <li>Complete action history</li>
        <li>All transfers and ownership changes</li>
        <li>Links to faces and visual representations</li>
      </ul>

      <h2>Step 10 — Full TypeScript App</h2>
      <p>Here's a complete TypeScript application that ties everything together using the DUAL SDK:</p>
      <div class="code-block" data-lang="typescript">
import { DualClient, Template, DualObject, Webhook } from "@dual/sdk";

interface Property {
  address: string;
  squareMeters: number;
  bedrooms: number;
  bathrooms: number;
  price: number;
  status: "available" | "reserved" | "sold";
  listingDate: string;
  geoLocation: { latitude: number; longitude: number };
}

class RealEstateApp {
  private client: DualClient;
  private orgId: string;
  private templateId: string;

  constructor(apiKey: string, orgId: string) {
    this.client = new DualClient({ apiKey });
    this.orgId = orgId;
  }

  async createPropertyTemplate(): Promise<void> {
    try {
      const template: Template = await this.client.templates.create({
        name: "Property",
        organizationId: this.orgId,
        properties: [
          { name: "address", type: "string", required: true },
          { name: "squareMeters", type: "number", required: true },
          { name: "bedrooms", type: "number", required: true },
          { name: "bathrooms", type: "number", required: true },
          { name: "price", type: "number", required: true },
          {
            name: "status",
            type: "enum",
            values: ["available", "reserved", "sold"],
            default: "available",
            required: true,
          },
          { name: "listingDate", type: "string", required: true },
          {
            name: "geoLocation",
            type: "object",
            required: true,
          },
        ],
        actions: [
          { name: "reserve", description: "Reserve the property" },
          { name: "purchase", description: "Complete purchase" },
          { name: "transfer", description: "Transfer ownership" },
        ],
      });

      this.templateId = template.id;
      console.log("✓ Template created: " + this.templateId);
    } catch (error) {
      console.error("Failed to create template:", error);
      throw error;
    }
  }

  async addPropertyFaces(): Promise<void> {
    try {
      await this.client.templates.addFace(this.templateId, {
        name: "image",
        type: "image",
        mimeType: "image/jpeg",
        url: "https://example.com/property.jpg",
        description: "Property photo",
      });

      await this.client.templates.addFace(this.templateId, {
        name: "web",
        type: "web",
        url: "https://your-domain.com/viewer/{objectId}",
        description: "Interactive viewer",
      });

      console.log("✓ Faces added to template");
    } catch (error) {
      console.error("Failed to add faces:", error);
      throw error;
    }
  }

  async mintProperty(property: Property): Promise<string> {
    try {
      const obj: DualObject = await this.client.objects.mint({
        templateId: this.templateId,
        organizationId: this.orgId,
        properties: property,
      });

      console.log("✓ Property minted: " + obj.id);
      return obj.id;
    } catch (error) {
      console.error("Failed to mint property:", error);
      throw error;
    }
  }

  async registerWebhook(url: string): Promise<void> {
    try {
      const webhook: Webhook = await this.client.webhooks.create({
        url,
        events: ["object.status.changed", "action.executed", "object.transferred"],
        organizationId: this.orgId,
      });

      console.log("✓ Webhook registered: " + webhook.id);
    } catch (error) {
      console.error("Failed to register webhook:", error);
      throw error;
    }
  }

  async reserveProperty(objectId: string, buyerWallet: string): Promise<void> {
    try {
      await this.client.eventBus.executeAction({
        objectId,
        action: "reserve",
        actor: { walletAddress: buyerWallet },
        parameters: { reservationPeriod: 30 },
      });

      console.log("✓ Property reserved: " + objectId);
    } catch (error) {
      console.error("Failed to reserve property:", error);
      throw error;
    }
  }

  async transferProperty(
    objectId: string,
    sellerWallet: string,
    buyerWallet: string,
    txHash: string
  ): Promise<void> {
    try {
      await this.client.eventBus.executeAction({
        objectId,
        action: "transfer",
        actor: { walletAddress: sellerWallet },
        parameters: {
          recipientWallet: buyerWallet,
          transactionHash: txHash,
        },
      });

      console.log("✓ Property transferred: " + objectId);
    } catch (error) {
      console.error("Failed to transfer property:", error);
      throw error;
    }
  }

  async queryPropertyState(objectId: string): Promise<any> {
    try {
      const obj = await this.client.indexer.getObject(objectId);
      console.log("✓ Property state retrieved:", obj);
      return obj;
    } catch (error) {
      console.error("Failed to query property:", error);
      throw error;
    }
  }
}

// Main execution
async function main() {
  const apiKey = process.env.DUAL_API_KEY!;
  const orgId = process.env.DUAL_ORG_ID!;

  const app = new RealEstateApp(apiKey, orgId);

  try {
    // 1. Create template
    await app.createPropertyTemplate();

    // 2. Add visual faces
    await app.addPropertyFaces();

    // 3. Mint sample properties
    const property1: Property = {
      address: "123 Park Avenue, New York, NY 10016",
      squareMeters: 500,
      bedrooms: 4,
      bathrooms: 3,
      price: 8500000,
      status: "available",
      listingDate: new Date().toISOString(),
      geoLocation: { latitude: 40.7829, longitude: -73.9654 },
    };

    const propertyId1 = await app.mintProperty(property1);

    // 4. Register webhook for notifications
    await app.registerWebhook("https://your-domain.com/webhooks/property-events");

    // 5. Reserve the property
    const buyerWallet = "0x742d35Cc6634C0532925a3b844Bc9e7595f42D07";
    await app.reserveProperty(propertyId1, buyerWallet);

    // 6. Simulate payment and transfer ownership
    const sellerWallet = "0xOriginalOwner...";
    const paymentTxHash = "0x123abc...";
    await app.transferProperty(propertyId1, sellerWallet, buyerWallet, paymentTxHash);

    // 7. Query final state
    await app.queryPropertyState(propertyId1);

    console.log("\\n✓ Real estate tokenisation workflow complete!");
  } catch (error) {
    console.error("Application error:", error);
    process.exit(1);
  }
}

main();
      </div>

      <h2>Key Takeaways</h2>
      <ul>
        <li><strong>Organization Management:</strong> DUAL organizations provide role-based access control and multi-user collaboration</li>
        <li><strong>Rich Templates:</strong> Properties are defined once, minted many times with unique data per object</li>
        <li><strong>Visual Faces:</strong> Combine image and web faces for rich representation across platforms</li>
        <li><strong>Payment Integration:</strong> Properties can be purchased directly with built-in payment flows</li>
        <li><strong>Real-time Events:</strong> Webhooks notify your application of every state change</li>
        <li><strong>Immutable History:</strong> All transfers, reservations, and actions are recorded on-chain</li>
        <li><strong>Public Verification:</strong> Anyone can query the on-chain state of any property using the Indexer</li>
      </ul>

      <div class="callout">
        <strong>Next Steps:</strong> Deploy this to production by adding user authentication, implementing the webhook handler endpoint, integrating with your payment processor, and setting up a web interface to browse and purchase properties. For more on integrating with the DUAL SDK, see <a href="/docs/developer-kit/sdk">DUAL SDK Documentation</a>.
      </div>
    `,
  },
];
