/* ────────────────────────────────────────────────────────────
   DUAL API – Enriched Endpoint Data
   Generated from vlabsio/api-v3 OpenAPI 3.1.0 spec
   ──────────────────────────────────────────────────────────── */

export interface Parameter {
  name: string;
  in: "path" | "query" | "header";
  type: string;
  required: boolean;
  description: string;
}

export interface SchemaProperty {
  name: string;
  type: string;
  required: boolean;
  description: string;
}

export interface Endpoint {
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  path: string;
  operationId: string;
  summary: string;
  description: string;
  tag: string;
  parameters: Parameter[];
  requestBody?: {
    contentType: string;
    required: boolean;
    properties: SchemaProperty[];
  };
  responses: {
    code: string;
    description: string;
    schemaName?: string;
    properties?: SchemaProperty[];
  }[];
}

export interface EndpointGroup {
  tag: string;
  label: string;
  description: string;
  endpoints: Endpoint[];
}

/* ── Raw endpoint definitions ────────────────────────────── */

const rawEndpoints: Endpoint[] = [
  // ═══════════════════ PAYMENTS ═══════════════════
  {
    method: "GET", path: "/payments/config", operationId: "GetPaymentConfig",
    summary: "Retrieve payment configuration",
    description: "Fetch the payment configuration details including supported tokens and deposit addresses.",
    tag: "payments", parameters: [],
    responses: [
      { code: "200", description: "Successfully retrieved the payment configuration details.", schemaName: "PaymentConfig", properties: [
        { name: "multi_token_deposit_address", type: "string", required: true, description: "Address for multi-token deposits" },
        { name: "vee_address", type: "string", required: true, description: "VEE token contract address" },
        { name: "supported_tokens", type: "array", required: false, description: "List of supported deposit tokens" },
      ]},
      { code: "400", description: "Bad request." },
      { code: "500", description: "Internal server error." },
    ],
  },
  {
    method: "GET", path: "/payments/deposits", operationId: "ListDeposits",
    summary: "List all deposits",
    description: "Fetch a list of all deposits with optional filters.",
    tag: "payments",
    parameters: [
      { name: "tx_hash", in: "query", type: "string", required: false, description: "Transaction hash of the deposit" },
      { name: "token", in: "query", type: "string", required: false, description: "Token used for the deposit" },
      { name: "token_address", in: "query", type: "string", required: false, description: "Token address for the deposit" },
    ],
    responses: [
      { code: "200", description: "Successfully retrieved the list of deposits.", schemaName: "ListDepositsOut", properties: [
        { name: "items", type: "array", required: true, description: "Array of deposit records" },
        { name: "next", type: "string", required: false, description: "Pagination cursor for next page" },
      ]},
    ],
  },

  // ═══════════════════ SUPPORT ═══════════════════
  {
    method: "POST", path: "/support/request-access", operationId: "RequestAccess",
    summary: "Request access to a feature or service",
    description: "Allows users to request access to a specific feature or service within the application.",
    tag: "support", parameters: [],
    requestBody: { contentType: "application/json", required: true, properties: [
      { name: "feature", type: "string", required: true, description: "The feature or service to request access to" },
      { name: "reason", type: "string", required: false, description: "Reason for requesting access" },
    ]},
    responses: [{ code: "200", description: "Access request submitted successfully." }],
  },
  {
    method: "GET", path: "/support", operationId: "ListSupportMessages",
    summary: "Retrieve a list of support messages",
    description: "Fetch a list of support messages with optional filters like prefix, public, unpublished, and pagination.",
    tag: "support",
    parameters: [
      { name: "wallet_id", in: "query", type: "string", required: false, description: "Filter support messages by wallet ID" },
      { name: "prefix", in: "query", type: "string", required: false, description: "Filter by message prefix" },
      { name: "limit", in: "query", type: "integer", required: false, description: "Maximum number of results to return" },
      { name: "next", in: "query", type: "string", required: false, description: "Pagination cursor" },
    ],
    responses: [
      { code: "200", description: "Successfully retrieved support messages.", schemaName: "ListMessagesOut", properties: [
        { name: "items", type: "array", required: true, description: "Array of support messages" },
        { name: "next", type: "string", required: false, description: "Pagination cursor for next page" },
      ]},
    ],
  },
  {
    method: "POST", path: "/support", operationId: "SendSupportMessage",
    summary: "Send a support message",
    description: "Send a support message to the system.",
    tag: "support", parameters: [],
    requestBody: { contentType: "application/json", required: true, properties: [
      { name: "subject", type: "string", required: true, description: "Message subject" },
      { name: "body", type: "string", required: true, description: "Message body content" },
      { name: "public", type: "boolean", required: false, description: "Whether the message is publicly visible" },
    ]},
    responses: [{ code: "200", description: "Support message sent successfully." }],
  },
  {
    method: "GET", path: "/support/{messageId}", operationId: "GetSupportMessage",
    summary: "Retrieve a specific support message",
    description: "Fetch a specific support message by its ID.",
    tag: "support",
    parameters: [
      { name: "messageId", in: "path", type: "string", required: true, description: "Unique identifier of the support message" },
    ],
    responses: [{ code: "200", description: "Successfully retrieved the support message." }],
  },

  // ═══════════════════ ORGANIZATIONS ═══════════════════
  {
    method: "GET", path: "/organizations", operationId: "ListOrganizations",
    summary: "List all organizations",
    description: "Retrieve a list of all organizations the authenticated user has access to.",
    tag: "organizations",
    parameters: [
      { name: "role_name", in: "query", type: "string", required: false, description: "Filter by role name" },
      { name: "limit", in: "query", type: "integer", required: false, description: "Maximum number of results" },
      { name: "next", in: "query", type: "string", required: false, description: "Pagination cursor" },
    ],
    responses: [
      { code: "200", description: "Successfully retrieved organizations.", schemaName: "ListOrganizationsOut", properties: [
        { name: "items", type: "array", required: true, description: "Array of organization objects" },
        { name: "next", type: "string", required: false, description: "Pagination cursor for next page" },
      ]},
    ],
  },
  {
    method: "POST", path: "/organizations", operationId: "CreateOrganization",
    summary: "Create a new organization",
    description: "Create a new organization in the system.",
    tag: "organizations", parameters: [],
    requestBody: { contentType: "application/json", required: true, properties: [
      { name: "name", type: "string", required: true, description: "Display name of the organization" },
      { name: "fqdn", type: "string", required: true, description: "Fully qualified domain name for the organization" },
      { name: "description", type: "string", required: false, description: "Description of the organization" },
      { name: "image", type: "string", required: false, description: "URL to the organization's logo image" },
    ]},
    responses: [
      { code: "200", description: "Organization created successfully.", schemaName: "organization", properties: [
        { name: "id", type: "string", required: true, description: "Unique identifier" },
        { name: "name", type: "string", required: true, description: "Organization display name" },
        { name: "fqdn", type: "string", required: true, description: "Fully qualified domain name" },
        { name: "description", type: "string", required: false, description: "Description" },
        { name: "image", type: "string", required: false, description: "Logo image URL" },
        { name: "account", type: "object", required: true, description: "Associated billing account" },
        { name: "when_created", type: "string", required: true, description: "ISO 8601 creation timestamp" },
        { name: "when_modified", type: "string", required: true, description: "ISO 8601 last modification timestamp" },
      ]},
    ],
  },
  {
    method: "GET", path: "/organizations/{organizationId}", operationId: "GetOrganization",
    summary: "Get organization details",
    description: "Retrieve details of a specific organization.",
    tag: "organizations",
    parameters: [
      { name: "organizationId", in: "path", type: "string", required: true, description: "Unique identifier of the organization" },
    ],
    responses: [
      { code: "200", description: "Successfully retrieved organization.", schemaName: "organization", properties: [
        { name: "id", type: "string", required: true, description: "Unique identifier" },
        { name: "name", type: "string", required: true, description: "Organization display name" },
        { name: "fqdn", type: "string", required: true, description: "Fully qualified domain name" },
        { name: "members", type: "array", required: false, description: "List of organization members" },
        { name: "roles", type: "array", required: false, description: "List of organization roles" },
        { name: "account", type: "object", required: true, description: "Associated billing account" },
      ]},
    ],
  },
  {
    method: "PUT", path: "/organizations/{organizationId}", operationId: "UpdateOrganization",
    summary: "Update organization",
    description: "Update details of a specific organization.",
    tag: "organizations",
    parameters: [
      { name: "organizationId", in: "path", type: "string", required: true, description: "Unique identifier of the organization" },
    ],
    requestBody: { contentType: "application/json", required: true, properties: [
      { name: "name", type: "string", required: false, description: "Updated display name" },
      { name: "description", type: "string", required: false, description: "Updated description" },
      { name: "image", type: "string", required: false, description: "Updated logo image URL" },
    ]},
    responses: [{ code: "200", description: "Organization updated successfully.", schemaName: "organization" }],
  },
  {
    method: "GET", path: "/organizations/{organizationId}/balance", operationId: "GetOrganizationBalance",
    summary: "Get organization balance",
    description: "Retrieve the balance of a specific organization.",
    tag: "organizations",
    parameters: [
      { name: "organizationId", in: "path", type: "string", required: true, description: "Unique identifier of the organization" },
    ],
    responses: [{ code: "200", description: "Successfully retrieved balance.", properties: [
      { name: "balance", type: "number", required: true, description: "Current balance" },
      { name: "currency", type: "string", required: true, description: "Currency code" },
    ]}],
  },
  {
    method: "GET", path: "/organizations/{organizationId}/balance/history", operationId: "GetBalanceHistory",
    summary: "Get balance history",
    description: "Retrieve the balance history of a specific organization.",
    tag: "organizations",
    parameters: [
      { name: "organizationId", in: "path", type: "string", required: true, description: "Unique identifier of the organization" },
      { name: "limit", in: "query", type: "integer", required: false, description: "Maximum results per page" },
      { name: "next", in: "query", type: "string", required: false, description: "Pagination cursor" },
    ],
    responses: [{ code: "200", description: "Successfully retrieved balance history." }],
  },
  {
    method: "GET", path: "/organizations/{organizationId}/members", operationId: "ListMembers",
    summary: "List organization members",
    description: "Retrieve a list of members in a specific organization.",
    tag: "organizations",
    parameters: [
      { name: "organizationId", in: "path", type: "string", required: true, description: "Unique identifier of the organization" },
    ],
    responses: [
      { code: "200", description: "Successfully retrieved members.", schemaName: "ListMembersOut", properties: [
        { name: "items", type: "array", required: true, description: "Array of member objects" },
        { name: "next", type: "string", required: false, description: "Pagination cursor" },
      ]},
    ],
  },
  {
    method: "POST", path: "/organizations/{organizationId}/members", operationId: "AddMember",
    summary: "Add organization member",
    description: "Add a new member to a specific organization.",
    tag: "organizations",
    parameters: [
      { name: "organizationId", in: "path", type: "string", required: true, description: "Unique identifier of the organization" },
    ],
    requestBody: { contentType: "application/json", required: true, properties: [
      { name: "wallet_id", type: "string", required: true, description: "Wallet ID of the user to add" },
      { name: "role_id", type: "string", required: true, description: "Role to assign to the new member" },
    ]},
    responses: [{ code: "200", description: "Member added successfully." }],
  },
  {
    method: "DELETE", path: "/organizations/{organizationId}/members/{memberId}", operationId: "RemoveMember",
    summary: "Remove organization member",
    description: "Remove a member from a specific organization.",
    tag: "organizations",
    parameters: [
      { name: "organizationId", in: "path", type: "string", required: true, description: "Unique identifier of the organization" },
      { name: "memberId", in: "path", type: "string", required: true, description: "Unique identifier of the member" },
    ],
    responses: [{ code: "200", description: "Member removed successfully." }],
  },
  {
    method: "PATCH", path: "/organizations/{organizationId}/members/{memberId}", operationId: "UpdateMemberRole",
    summary: "Update member role",
    description: "Update a member's role in a specific organization.",
    tag: "organizations",
    parameters: [
      { name: "organizationId", in: "path", type: "string", required: true, description: "Unique identifier of the organization" },
      { name: "memberId", in: "path", type: "string", required: true, description: "Unique identifier of the member" },
    ],
    requestBody: { contentType: "application/json", required: true, properties: [
      { name: "role_id", type: "string", required: true, description: "New role ID to assign" },
    ]},
    responses: [{ code: "200", description: "Member role updated successfully." }],
  },
  {
    method: "GET", path: "/organizations/{organizationId}/roles", operationId: "ListRoles",
    summary: "List organization roles",
    description: "Retrieve a list of roles in a specific organization.",
    tag: "organizations",
    parameters: [
      { name: "organizationId", in: "path", type: "string", required: true, description: "Unique identifier of the organization" },
    ],
    responses: [
      { code: "200", description: "Successfully retrieved roles.", schemaName: "ListRolesOut", properties: [
        { name: "items", type: "array", required: true, description: "Array of role objects" },
      ]},
    ],
  },
  {
    method: "POST", path: "/organizations/{organizationId}/roles", operationId: "CreateRole",
    summary: "Create organization role",
    description: "Create a new role in a specific organization.",
    tag: "organizations",
    parameters: [
      { name: "organizationId", in: "path", type: "string", required: true, description: "Unique identifier of the organization" },
    ],
    requestBody: { contentType: "application/json", required: true, properties: [
      { name: "name", type: "string", required: true, description: "Name of the role" },
      { name: "permissions", type: "array", required: true, description: "Array of permission objects" },
    ]},
    responses: [{ code: "200", description: "Role created successfully.", schemaName: "Role" }],
  },
  {
    method: "PATCH", path: "/organizations/{organizationId}/roles/{roleId}", operationId: "UpdateRole",
    summary: "Update organization role",
    description: "Update a role in a specific organization.",
    tag: "organizations",
    parameters: [
      { name: "organizationId", in: "path", type: "string", required: true, description: "Unique identifier of the organization" },
      { name: "roleId", in: "path", type: "string", required: true, description: "Unique identifier of the role" },
    ],
    requestBody: { contentType: "application/json", required: true, properties: [
      { name: "name", type: "string", required: false, description: "Updated role name" },
      { name: "permissions", type: "array", required: false, description: "Updated permissions array" },
    ]},
    responses: [{ code: "200", description: "Role updated successfully." }],
  },
  {
    method: "DELETE", path: "/organizations/{organizationId}/roles/{roleId}", operationId: "DeleteRole",
    summary: "Delete organization role",
    description: "Delete a role from a specific organization.",
    tag: "organizations",
    parameters: [
      { name: "organizationId", in: "path", type: "string", required: true, description: "Unique identifier of the organization" },
      { name: "roleId", in: "path", type: "string", required: true, description: "Unique identifier of the role" },
    ],
    responses: [{ code: "200", description: "Role deleted successfully." }],
  },
  {
    method: "POST", path: "/organizations/{organizationId}/invitations", operationId: "CreateInvitation",
    summary: "Create invitation",
    description: "Create a new invitation for a specific organization.",
    tag: "organizations",
    parameters: [
      { name: "organizationId", in: "path", type: "string", required: true, description: "Unique identifier of the organization" },
    ],
    requestBody: { contentType: "application/json", required: true, properties: [
      { name: "email", type: "string", required: true, description: "Email address to invite" },
      { name: "role_id", type: "string", required: true, description: "Role to assign upon acceptance" },
    ]},
    responses: [{ code: "200", description: "Invitation created successfully." }],
  },
  {
    method: "GET", path: "/organizations/{organizationId}/invitations", operationId: "ListInvitations",
    summary: "List invitations",
    description: "Retrieve a list of invitations for a specific organization.",
    tag: "organizations",
    parameters: [
      { name: "organizationId", in: "path", type: "string", required: true, description: "Unique identifier of the organization" },
    ],
    responses: [{ code: "200", description: "Successfully retrieved invitations." }],
  },
  {
    method: "DELETE", path: "/organizations/{organizationId}/invitations/{invitationId}", operationId: "DeleteInvitation",
    summary: "Delete invitation",
    description: "Delete an invitation from a specific organization.",
    tag: "organizations",
    parameters: [
      { name: "organizationId", in: "path", type: "string", required: true, description: "Unique identifier of the organization" },
      { name: "invitationId", in: "path", type: "string", required: true, description: "Unique identifier of the invitation" },
    ],
    responses: [{ code: "200", description: "Invitation deleted successfully." }],
  },
  {
    method: "POST", path: "/organizations/invitations/{invitationId}/accept", operationId: "AcceptInvitation",
    summary: "Accept invitation",
    description: "Accept an invitation to join an organization.",
    tag: "organizations",
    parameters: [
      { name: "invitationId", in: "path", type: "string", required: true, description: "Unique identifier of the invitation" },
    ],
    responses: [{ code: "200", description: "Invitation accepted successfully." }],
  },

  // ═══════════════════ EVENT BUS ═══════════════════
  {
    method: "POST", path: "/ebus/actions", operationId: "ExecuteAction",
    summary: "Execute an action",
    description: "Execute an action on the event bus. Actions are the primary mechanism for modifying object state.",
    tag: "ebus", parameters: [],
    requestBody: { contentType: "application/json", required: true, properties: [
      { name: "action_type", type: "string", required: true, description: "The type of action to execute" },
      { name: "object_id", type: "string", required: true, description: "Target object identifier" },
      { name: "payload", type: "object", required: false, description: "Action-specific payload data" },
    ]},
    responses: [{ code: "200", description: "Action executed successfully." }],
  },
  {
    method: "GET", path: "/ebus/actions", operationId: "ListActions",
    summary: "List available actions",
    description: "Retrieve a list of available actions with optional filters.",
    tag: "ebus",
    parameters: [
      { name: "action_id", in: "query", type: "string", required: false, description: "Filter by action ID" },
      { name: "template_id", in: "query", type: "string", required: false, description: "Filter by template ID" },
      { name: "limit", in: "query", type: "integer", required: false, description: "Maximum results" },
      { name: "next", in: "query", type: "string", required: false, description: "Pagination cursor" },
    ],
    responses: [{ code: "200", description: "Successfully retrieved actions." }],
  },
  {
    method: "GET", path: "/ebus/actions/{actionId}", operationId: "GetAction",
    summary: "Get action details",
    description: "Retrieve details of a specific action.",
    tag: "ebus",
    parameters: [
      { name: "actionId", in: "path", type: "string", required: true, description: "Unique identifier of the action" },
    ],
    responses: [{ code: "200", description: "Successfully retrieved action details." }],
  },
  {
    method: "POST", path: "/ebus/actions/batch", operationId: "ExecuteBatchActions",
    summary: "Execute batch actions",
    description: "Execute multiple actions in a single batch request for improved throughput.",
    tag: "ebus", parameters: [],
    requestBody: { contentType: "application/json", required: true, properties: [
      { name: "actions", type: "array", required: true, description: "Array of action objects to execute" },
    ]},
    responses: [{ code: "200", description: "Batch actions executed successfully." }],
  },
  {
    method: "GET", path: "/ebus/action-types", operationId: "ListActionTypes",
    summary: "List action types",
    description: "Retrieve a list of available action types.",
    tag: "ebus",
    parameters: [
      { name: "name", in: "query", type: "string", required: false, description: "Filter by action type name" },
      { name: "limit", in: "query", type: "integer", required: false, description: "Maximum results" },
    ],
    responses: [{ code: "200", description: "Successfully retrieved action types." }],
  },
  {
    method: "POST", path: "/ebus/action-types", operationId: "CreateActionType",
    summary: "Create action type",
    description: "Create a new action type definition.",
    tag: "ebus", parameters: [],
    requestBody: { contentType: "application/json", required: true, properties: [
      { name: "name", type: "string", required: true, description: "Name of the action type" },
      { name: "description", type: "string", required: false, description: "Description of the action type" },
      { name: "schema", type: "object", required: false, description: "JSON schema for action payload validation" },
    ]},
    responses: [{ code: "200", description: "Action type created successfully." }],
  },
  {
    method: "GET", path: "/ebus/action-types/{actionTypeId}", operationId: "GetActionType",
    summary: "Get action type details",
    description: "Retrieve details of a specific action type.",
    tag: "ebus",
    parameters: [
      { name: "actionTypeId", in: "path", type: "string", required: true, description: "Unique identifier of the action type" },
    ],
    responses: [{ code: "200", description: "Successfully retrieved action type." }],
  },
  {
    method: "PUT", path: "/ebus/action-types/{actionTypeId}", operationId: "UpdateActionType",
    summary: "Update action type",
    description: "Update a specific action type.",
    tag: "ebus",
    parameters: [
      { name: "actionTypeId", in: "path", type: "string", required: true, description: "Unique identifier of the action type" },
    ],
    requestBody: { contentType: "application/json", required: true, properties: [
      { name: "name", type: "string", required: false, description: "Updated name" },
      { name: "description", type: "string", required: false, description: "Updated description" },
      { name: "schema", type: "object", required: false, description: "Updated JSON schema" },
    ]},
    responses: [{ code: "200", description: "Action type updated successfully." }],
  },

  // ═══════════════════ WALLETS ═══════════════════
  {
    method: "POST", path: "/wallets/login", operationId: "Login",
    summary: "Login with wallet",
    description: "Authenticate a wallet and receive a JWT token pair (access + refresh).",
    tag: "wallets", parameters: [],
    requestBody: { contentType: "application/json", required: true, properties: [
      { name: "email", type: "string", required: false, description: "Email address for login" },
      { name: "phone_number", type: "string", required: false, description: "Phone number for login" },
      { name: "password", type: "string", required: true, description: "Account password" },
      { name: "otp", type: "string", required: false, description: "One-time password if 2FA is enabled" },
    ]},
    responses: [
      { code: "200", description: "Login successful.", schemaName: "LoginOut", properties: [
        { name: "wallet", type: "object", required: true, description: "The authenticated wallet object" },
        { name: "access_token", type: "string", required: true, description: "JWT access token" },
        { name: "refresh_token", type: "string", required: true, description: "JWT refresh token for obtaining new access tokens" },
      ]},
    ],
  },
  {
    method: "POST", path: "/wallets/login/guest", operationId: "GuestLogin",
    summary: "Guest login",
    description: "Login as a guest user with limited permissions.",
    tag: "wallets", parameters: [],
    requestBody: { contentType: "application/json", required: true, properties: [
      { name: "nickname", type: "string", required: false, description: "Display name for the guest" },
    ]},
    responses: [
      { code: "200", description: "Guest login successful.", schemaName: "LoginOut" },
    ],
  },
  {
    method: "POST", path: "/wallets/reset-code", operationId: "RequestResetCode",
    summary: "Request password reset",
    description: "Request a password reset code to be sent via email or SMS.",
    tag: "wallets", parameters: [],
    requestBody: { contentType: "application/json", required: true, properties: [
      { name: "email", type: "string", required: false, description: "Email address for reset code delivery" },
      { name: "phone_number", type: "string", required: false, description: "Phone number for reset code delivery" },
    ]},
    responses: [{ code: "200", description: "Reset code sent successfully." }],
  },
  {
    method: "POST", path: "/wallets/reset-code/verify", operationId: "VerifyResetCode",
    summary: "Verify reset code",
    description: "Verify a password reset code and set a new password.",
    tag: "wallets", parameters: [],
    requestBody: { contentType: "application/json", required: true, properties: [
      { name: "code", type: "string", required: true, description: "The reset verification code" },
      { name: "new_password", type: "string", required: true, description: "New password to set" },
    ]},
    responses: [{ code: "200", description: "Password reset successfully." }],
  },
  {
    method: "POST", path: "/wallets/register", operationId: "Register",
    summary: "Register new wallet",
    description: "Register a new wallet account. A verification code will be sent.",
    tag: "wallets", parameters: [],
    requestBody: { contentType: "application/json", required: true, properties: [
      { name: "email", type: "string", required: false, description: "Email address for the new account" },
      { name: "phone_number", type: "string", required: false, description: "Phone number for the new account" },
      { name: "password", type: "string", required: true, description: "Account password" },
      { name: "nickname", type: "string", required: false, description: "Display name" },
    ]},
    responses: [{ code: "200", description: "Registration initiated. Verify to complete." }],
  },
  {
    method: "POST", path: "/wallets/register/verify", operationId: "VerifyRegistration",
    summary: "Verify registration",
    description: "Verify a wallet registration with the code sent to email or phone.",
    tag: "wallets", parameters: [],
    requestBody: { contentType: "application/json", required: true, properties: [
      { name: "code", type: "string", required: true, description: "Verification code" },
    ]},
    responses: [
      { code: "200", description: "Registration verified. Account is now active.", schemaName: "LoginOut" },
    ],
  },
  {
    method: "GET", path: "/wallets/me", operationId: "GetCurrentWallet",
    summary: "Get current wallet",
    description: "Retrieve details of the current authenticated wallet.",
    tag: "wallets", parameters: [],
    responses: [
      { code: "200", description: "Successfully retrieved wallet.", schemaName: "wallet", properties: [
        { name: "id", type: "string", required: true, description: "Unique identifier" },
        { name: "nickname", type: "string", required: false, description: "Display name" },
        { name: "email", type: "string", required: false, description: "Email address" },
        { name: "phone_number", type: "string", required: false, description: "Phone number" },
        { name: "avatar", type: "object", required: false, description: "Avatar asset object" },
        { name: "language", type: "string", required: true, description: "Preferred language code" },
        { name: "fqdn", type: "string", required: true, description: "Fully qualified domain name" },
        { name: "activated", type: "boolean", required: true, description: "Whether the wallet is activated" },
        { name: "disabled", type: "boolean", required: true, description: "Whether the wallet is disabled" },
        { name: "when_created", type: "string", required: true, description: "ISO 8601 creation timestamp" },
        { name: "when_modified", type: "string", required: true, description: "ISO 8601 last modification timestamp" },
      ]},
    ],
  },
  {
    method: "PATCH", path: "/wallets/me", operationId: "UpdateCurrentWallet",
    summary: "Update current wallet",
    description: "Update details of the current authenticated wallet.",
    tag: "wallets", parameters: [],
    requestBody: { contentType: "application/json", required: true, properties: [
      { name: "nickname", type: "string", required: false, description: "Updated display name" },
      { name: "language", type: "string", required: false, description: "Updated preferred language" },
      { name: "avatar", type: "string", required: false, description: "Updated avatar URL" },
    ]},
    responses: [{ code: "200", description: "Wallet updated successfully.", schemaName: "wallet" }],
  },
  {
    method: "DELETE", path: "/wallets/me", operationId: "DeleteCurrentWallet",
    summary: "Delete current wallet",
    description: "Permanently delete the current authenticated wallet. This action is irreversible.",
    tag: "wallets", parameters: [],
    responses: [{ code: "200", description: "Wallet deleted successfully." }],
  },
  {
    method: "GET", path: "/wallets/me/linked", operationId: "GetLinkedWallets",
    summary: "Get linked wallets",
    description: "Retrieve wallets linked to the current authenticated wallet.",
    tag: "wallets", parameters: [],
    responses: [{ code: "200", description: "Successfully retrieved linked wallets." }],
  },
  {
    method: "GET", path: "/wallets/{walletId}", operationId: "GetWalletById",
    summary: "Get wallet by ID",
    description: "Retrieve details of a specific wallet by its ID.",
    tag: "wallets",
    parameters: [
      { name: "walletId", in: "path", type: "string", required: true, description: "Unique identifier of the wallet" },
    ],
    responses: [{ code: "200", description: "Successfully retrieved wallet.", schemaName: "wallet" }],
  },
  {
    method: "GET", path: "/wallets/{walletId}/linked", operationId: "GetLinkedWalletsById",
    summary: "Get linked wallets by ID",
    description: "Retrieve wallets linked to a specific wallet.",
    tag: "wallets",
    parameters: [
      { name: "walletId", in: "path", type: "string", required: true, description: "Unique identifier of the wallet" },
    ],
    responses: [{ code: "200", description: "Successfully retrieved linked wallets." }],
  },
  {
    method: "POST", path: "/wallets/link", operationId: "LinkWallet",
    summary: "Link wallet",
    description: "Link a wallet to the current authenticated wallet.",
    tag: "wallets", parameters: [],
    requestBody: { contentType: "application/json", required: true, properties: [
      { name: "wallet_id", type: "string", required: true, description: "ID of the wallet to link" },
    ]},
    responses: [{ code: "200", description: "Wallet linked successfully." }],
  },
  // Wallet login with refresh token
  {
    method: "POST", path: "/wallets/token/refresh", operationId: "RefreshToken",
    summary: "Refresh access token",
    description: "Obtain a new access token using a valid refresh token.",
    tag: "wallets", parameters: [],
    requestBody: { contentType: "application/json", required: true, properties: [
      { name: "refresh_token", type: "string", required: true, description: "The refresh token from login" },
    ]},
    responses: [
      { code: "200", description: "Token refreshed successfully.", schemaName: "RefreshTokenOut", properties: [
        { name: "access_token", type: "string", required: true, description: "New JWT access token" },
        { name: "refresh_token", type: "string", required: true, description: "New refresh token" },
      ]},
    ],
  },

  // ═══════════════════ API KEYS ═══════════════════
  {
    method: "GET", path: "/api-keys", operationId: "ListApiKeys",
    summary: "List API keys",
    description: "Retrieve a list of API keys for the current organization.",
    tag: "apikeys", parameters: [],
    responses: [
      { code: "200", description: "Successfully retrieved API keys.", schemaName: "ListApiKeysOut", properties: [
        { name: "items", type: "array", required: true, description: "Array of API key objects" },
      ]},
    ],
  },
  {
    method: "POST", path: "/api-keys", operationId: "CreateApiKey",
    summary: "Create API key",
    description: "Create a new API key for programmatic access.",
    tag: "apikeys", parameters: [],
    requestBody: { contentType: "application/json", required: true, properties: [
      { name: "name", type: "string", required: true, description: "Descriptive name for the API key" },
      { name: "permissions", type: "array", required: false, description: "Array of permission scopes" },
    ]},
    responses: [
      { code: "200", description: "API key created successfully.", schemaName: "ApiKeyCreateOut", properties: [
        { name: "id", type: "string", required: true, description: "API key identifier" },
        { name: "key", type: "string", required: true, description: "The API key value (shown once)" },
        { name: "name", type: "string", required: true, description: "Name of the API key" },
        { name: "when_created", type: "string", required: true, description: "Creation timestamp" },
      ]},
    ],
  },
  {
    method: "DELETE", path: "/api-keys/{apiKeyId}", operationId: "DeleteApiKey",
    summary: "Delete API key",
    description: "Permanently delete a specific API key. This action is irreversible.",
    tag: "apikeys",
    parameters: [
      { name: "apiKeyId", in: "path", type: "string", required: true, description: "Unique identifier of the API key" },
    ],
    responses: [{ code: "200", description: "API key deleted successfully." }],
  },

  // ═══════════════════ TEMPLATES ═══════════════════
  {
    method: "GET", path: "/templates", operationId: "ListTemplates",
    summary: "List templates",
    description: "Retrieve a list of templates with optional filtering.",
    tag: "templates",
    parameters: [
      { name: "prefix", in: "query", type: "string", required: false, description: "Filter by template name prefix" },
      { name: "fqdn", in: "query", type: "string", required: false, description: "Filter by fully qualified domain name" },
      { name: "limit", in: "query", type: "integer", required: false, description: "Maximum results per page" },
      { name: "next", in: "query", type: "string", required: false, description: "Pagination cursor" },
    ],
    responses: [
      { code: "200", description: "Successfully retrieved templates.", schemaName: "ListTemplatesOut", properties: [
        { name: "items", type: "array", required: true, description: "Array of template objects" },
        { name: "next", type: "string", required: false, description: "Pagination cursor for next page" },
      ]},
    ],
  },
  {
    method: "POST", path: "/templates", operationId: "CreateTemplate",
    summary: "Create template",
    description: "Create a new template defining object structure and behavior.",
    tag: "templates", parameters: [],
    requestBody: { contentType: "application/json", required: true, properties: [
      { name: "name", type: "string", required: true, description: "Template name" },
      { name: "fqdn", type: "string", required: true, description: "Fully qualified domain name" },
      { name: "object", type: "object", required: true, description: "Default object properties schema" },
      { name: "actions", type: "array", required: true, description: "Allowed actions on objects of this template" },
      { name: "public_access", type: "boolean", required: false, description: "Whether template is publicly accessible" },
    ]},
    responses: [
      { code: "200", description: "Template created successfully.", schemaName: "template", properties: [
        { name: "id", type: "string", required: true, description: "Unique identifier" },
        { name: "name", type: "string", required: true, description: "Template name" },
        { name: "fqdn", type: "string", required: true, description: "Fully qualified domain name" },
        { name: "object", type: "object", required: true, description: "Default object properties" },
        { name: "factory", type: "object", required: false, description: "Factory configuration for minting" },
        { name: "actions", type: "array", required: true, description: "Allowed actions" },
        { name: "when_created", type: "string", required: true, description: "Creation timestamp" },
        { name: "when_modified", type: "string", required: true, description: "Last modification timestamp" },
      ]},
    ],
  },
  {
    method: "GET", path: "/templates/{templateId}", operationId: "GetTemplate",
    summary: "Get template",
    description: "Retrieve a specific template by ID.",
    tag: "templates",
    parameters: [
      { name: "templateId", in: "path", type: "string", required: true, description: "Unique identifier of the template" },
    ],
    responses: [{ code: "200", description: "Successfully retrieved template.", schemaName: "template" }],
  },
  {
    method: "PATCH", path: "/templates/{templateId}", operationId: "UpdateTemplate",
    summary: "Update template",
    description: "Update a specific template's properties.",
    tag: "templates",
    parameters: [
      { name: "templateId", in: "path", type: "string", required: true, description: "Unique identifier of the template" },
    ],
    requestBody: { contentType: "application/json", required: true, properties: [
      { name: "name", type: "string", required: false, description: "Updated template name" },
      { name: "object", type: "object", required: false, description: "Updated default object properties" },
      { name: "public_access", type: "boolean", required: false, description: "Updated public access setting" },
    ]},
    responses: [{ code: "200", description: "Template updated successfully.", schemaName: "template" }],
  },
  {
    method: "DELETE", path: "/templates/{templateId}", operationId: "DeleteTemplate",
    summary: "Delete template",
    description: "Permanently delete a specific template.",
    tag: "templates",
    parameters: [
      { name: "templateId", in: "path", type: "string", required: true, description: "Unique identifier of the template" },
    ],
    responses: [{ code: "200", description: "Template deleted successfully." }],
  },
  {
    method: "GET", path: "/templates/{templateId}/variations", operationId: "ListVariations",
    summary: "List template variations",
    description: "Retrieve all variations of a specific template.",
    tag: "templates",
    parameters: [
      { name: "templateId", in: "path", type: "string", required: true, description: "Unique identifier of the template" },
    ],
    responses: [{ code: "200", description: "Successfully retrieved variations." }],
  },
  {
    method: "POST", path: "/templates/{templateId}/variations", operationId: "CreateVariation",
    summary: "Create template variation",
    description: "Create a new variation for a specific template.",
    tag: "templates",
    parameters: [
      { name: "templateId", in: "path", type: "string", required: true, description: "Unique identifier of the template" },
    ],
    requestBody: { contentType: "application/json", required: true, properties: [
      { name: "name", type: "string", required: true, description: "Variation name" },
      { name: "object", type: "object", required: true, description: "Variation-specific object overrides" },
    ]},
    responses: [{ code: "200", description: "Variation created successfully." }],
  },

  // ═══════════════════ OBJECTS ═══════════════════
  {
    method: "GET", path: "/objects", operationId: "ListObjects",
    summary: "List objects",
    description: "Retrieve a list of objects with optional filtering by template, owner, location, and more.",
    tag: "objects",
    parameters: [
      { name: "template_id", in: "query", type: "string", required: false, description: "Filter by template ID" },
      { name: "owner", in: "query", type: "string", required: false, description: "Filter by owner wallet ID" },
      { name: "fqdn", in: "query", type: "string", required: false, description: "Filter by fully qualified domain name" },
      { name: "faces", in: "query", type: "boolean", required: false, description: "Include face data in response" },
      { name: "actions", in: "query", type: "boolean", required: false, description: "Include action data in response" },
      { name: "dropped", in: "query", type: "boolean", required: false, description: "Filter dropped objects" },
      { name: "geo_hash", in: "query", type: "string", required: false, description: "Filter by geographic hash" },
      { name: "limit", in: "query", type: "integer", required: false, description: "Maximum results per page" },
      { name: "next", in: "query", type: "string", required: false, description: "Pagination cursor" },
    ],
    responses: [{ code: "200", description: "Successfully retrieved objects." }],
  },
  {
    method: "GET", path: "/objects/{objectId}", operationId: "GetObject",
    summary: "Get object",
    description: "Retrieve a specific object including its properties, ownership, and metadata.",
    tag: "objects",
    parameters: [
      { name: "objectId", in: "path", type: "string", required: true, description: "Unique identifier of the object" },
    ],
    responses: [{ code: "200", description: "Successfully retrieved object." }],
  },
  {
    method: "PATCH", path: "/objects/{objectId}", operationId: "UpdateObject",
    summary: "Update object",
    description: "Update properties of a specific object.",
    tag: "objects",
    parameters: [
      { name: "objectId", in: "path", type: "string", required: true, description: "Unique identifier of the object" },
    ],
    requestBody: { contentType: "application/json", required: true, properties: [
      { name: "properties", type: "object", required: false, description: "Updated object properties" },
    ]},
    responses: [{ code: "200", description: "Object updated successfully." }],
  },
  {
    method: "GET", path: "/objects/{objectId}/children", operationId: "GetObjectChildren",
    summary: "Get object children",
    description: "Retrieve children of a specific object in the object tree.",
    tag: "objects",
    parameters: [
      { name: "objectId", in: "path", type: "string", required: true, description: "Unique identifier of the parent object" },
    ],
    responses: [{ code: "200", description: "Successfully retrieved children." }],
  },
  {
    method: "GET", path: "/objects/{objectId}/parents", operationId: "GetObjectParents",
    summary: "Get object parents",
    description: "Retrieve parents of a specific object in the object tree.",
    tag: "objects",
    parameters: [
      { name: "objectId", in: "path", type: "string", required: true, description: "Unique identifier of the child object" },
    ],
    responses: [{ code: "200", description: "Successfully retrieved parents." }],
  },
  {
    method: "GET", path: "/objects/{objectId}/activity", operationId: "GetObjectActivity",
    summary: "Get object activity",
    description: "Retrieve the activity log showing all state changes for a specific object.",
    tag: "objects",
    parameters: [
      { name: "objectId", in: "path", type: "string", required: true, description: "Unique identifier of the object" },
      { name: "limit", in: "query", type: "integer", required: false, description: "Maximum results per page" },
    ],
    responses: [{ code: "200", description: "Successfully retrieved activity log." }],
  },
  {
    method: "GET", path: "/objects/{objectId}/geo", operationId: "GetObjectsByGeo",
    summary: "Get objects by geo",
    description: "Retrieve objects by geographic location proximity.",
    tag: "objects",
    parameters: [
      { name: "objectId", in: "path", type: "string", required: true, description: "Reference object ID for geo query" },
    ],
    responses: [{ code: "200", description: "Successfully retrieved nearby objects." }],
  },
  {
    method: "POST", path: "/objects/search", operationId: "SearchObjects",
    summary: "Search objects",
    description: "Search for objects using structured query filters including template, ownership, properties, and more.",
    tag: "objects", parameters: [],
    requestBody: { contentType: "application/json", required: true, properties: [
      { name: "filter", type: "object", required: true, description: "Search filter criteria" },
      { name: "sort", type: "object", required: false, description: "Sort configuration" },
      { name: "limit", type: "integer", required: false, description: "Maximum results" },
    ]},
    responses: [{ code: "200", description: "Search results returned successfully." }],
  },
  {
    method: "POST", path: "/objects/count", operationId: "CountObjects",
    summary: "Count objects",
    description: "Count objects matching specific filter criteria without returning full objects.",
    tag: "objects", parameters: [],
    requestBody: { contentType: "application/json", required: true, properties: [
      { name: "filter", type: "object", required: true, description: "Count filter criteria" },
    ]},
    responses: [{ code: "200", description: "Count returned successfully.", properties: [
      { name: "count", type: "integer", required: true, description: "Number of matching objects" },
    ]}],
  },

  // ═══════════════════ FACES ═══════════════════
  {
    method: "GET", path: "/faces", operationId: "ListFaces",
    summary: "List faces",
    description: "Retrieve a list of face definitions (visual representations for objects).",
    tag: "faces",
    parameters: [
      { name: "limit", in: "query", type: "integer", required: false, description: "Maximum results" },
      { name: "next", in: "query", type: "string", required: false, description: "Pagination cursor" },
    ],
    responses: [{ code: "200", description: "Successfully retrieved faces." }],
  },
  {
    method: "POST", path: "/faces", operationId: "CreateFace",
    summary: "Create face",
    description: "Create a new face definition for rendering objects.",
    tag: "faces", parameters: [],
    requestBody: { contentType: "application/json", required: true, properties: [
      { name: "template_id", type: "string", required: true, description: "Template this face belongs to" },
      { name: "display_url", type: "string", required: true, description: "URL for the face display resource" },
      { name: "type", type: "string", required: true, description: "Face type (image, webview, 3d, native)" },
      { name: "platform", type: "string", required: false, description: "Target platform (web, ios, android)" },
    ]},
    responses: [{ code: "200", description: "Face created successfully." }],
  },
  {
    method: "GET", path: "/faces/{faceId}", operationId: "GetFace",
    summary: "Get face",
    description: "Retrieve a specific face definition.",
    tag: "faces",
    parameters: [
      { name: "faceId", in: "path", type: "string", required: true, description: "Unique identifier of the face" },
    ],
    responses: [{ code: "200", description: "Successfully retrieved face." }],
  },
  {
    method: "PATCH", path: "/faces/{faceId}", operationId: "UpdateFace",
    summary: "Update face",
    description: "Update a specific face definition.",
    tag: "faces",
    parameters: [
      { name: "faceId", in: "path", type: "string", required: true, description: "Unique identifier of the face" },
    ],
    requestBody: { contentType: "application/json", required: true, properties: [
      { name: "display_url", type: "string", required: false, description: "Updated display URL" },
      { name: "type", type: "string", required: false, description: "Updated face type" },
    ]},
    responses: [{ code: "200", description: "Face updated successfully." }],
  },
  {
    method: "DELETE", path: "/faces/{faceId}", operationId: "DeleteFace",
    summary: "Delete face",
    description: "Permanently delete a specific face definition.",
    tag: "faces",
    parameters: [
      { name: "faceId", in: "path", type: "string", required: true, description: "Unique identifier of the face" },
    ],
    responses: [{ code: "200", description: "Face deleted successfully." }],
  },
  {
    method: "GET", path: "/faces/template/{templateId}", operationId: "GetFacesByTemplate",
    summary: "Get faces by template",
    description: "Retrieve all face definitions associated with a specific template.",
    tag: "faces",
    parameters: [
      { name: "templateId", in: "path", type: "string", required: true, description: "Unique identifier of the template" },
    ],
    responses: [{ code: "200", description: "Successfully retrieved faces for template." }],
  },

  // ═══════════════════ STORAGE ═══════════════════
  {
    method: "POST", path: "/storage/upload", operationId: "UploadFile",
    summary: "Upload file",
    description: "Upload a file to the DUAL storage system.",
    tag: "storage", parameters: [],
    requestBody: { contentType: "multipart/form-data", required: true, properties: [
      { name: "file", type: "binary", required: true, description: "The file to upload" },
      { name: "folder", type: "string", required: false, description: "Target folder path" },
    ]},
    responses: [{ code: "200", description: "File uploaded successfully.", properties: [
      { name: "id", type: "string", required: true, description: "Unique file identifier" },
      { name: "url", type: "string", required: true, description: "Public URL of the uploaded file" },
    ]}],
  },
  {
    method: "GET", path: "/storage/{fileId}", operationId: "GetFile",
    summary: "Get file",
    description: "Retrieve a specific file from storage. Returns the file content or a redirect URL.",
    tag: "storage",
    parameters: [
      { name: "fileId", in: "path", type: "string", required: true, description: "Unique identifier of the file" },
      { name: "noRedirect", in: "query", type: "boolean", required: false, description: "Return URL instead of redirecting" },
    ],
    responses: [{ code: "200", description: "File retrieved successfully." }],
  },
  {
    method: "DELETE", path: "/storage/{fileId}", operationId: "DeleteFile",
    summary: "Delete file",
    description: "Permanently delete a specific file from storage.",
    tag: "storage",
    parameters: [
      { name: "fileId", in: "path", type: "string", required: true, description: "Unique identifier of the file" },
    ],
    responses: [{ code: "200", description: "File deleted successfully." }],
  },
  {
    method: "GET", path: "/storage/template/{templateId}", operationId: "GetTemplateAssets",
    summary: "Get template assets",
    description: "Retrieve all storage assets associated with a specific template.",
    tag: "storage",
    parameters: [
      { name: "templateId", in: "path", type: "string", required: true, description: "Unique identifier of the template" },
    ],
    responses: [{ code: "200", description: "Successfully retrieved template assets." }],
  },
  {
    method: "POST", path: "/storage/template/{templateId}", operationId: "UploadTemplateAsset",
    summary: "Upload template asset",
    description: "Upload a storage asset for a specific template.",
    tag: "storage",
    parameters: [
      { name: "templateId", in: "path", type: "string", required: true, description: "Unique identifier of the template" },
    ],
    requestBody: { contentType: "multipart/form-data", required: true, properties: [
      { name: "file", type: "binary", required: true, description: "The asset file to upload" },
    ]},
    responses: [{ code: "200", description: "Template asset uploaded successfully." }],
  },

  // ═══════════════════ NOTIFICATIONS ═══════════════════
  {
    method: "GET", path: "/messages", operationId: "ListMessages",
    summary: "List messages",
    description: "Retrieve a list of notification messages.",
    tag: "notifications",
    parameters: [
      { name: "limit", in: "query", type: "integer", required: false, description: "Maximum results per page" },
      { name: "next", in: "query", type: "string", required: false, description: "Pagination cursor" },
    ],
    responses: [{ code: "200", description: "Successfully retrieved messages." }],
  },
  {
    method: "POST", path: "/messages/send", operationId: "SendMessage",
    summary: "Send message",
    description: "Send a notification message to one or more recipients.",
    tag: "notifications", parameters: [],
    requestBody: { contentType: "application/json", required: true, properties: [
      { name: "to", type: "array", required: true, description: "Array of recipient wallet IDs" },
      { name: "template_id", type: "string", required: false, description: "Message template to use" },
      { name: "subject", type: "string", required: false, description: "Message subject" },
      { name: "body", type: "string", required: false, description: "Message body" },
      { name: "data", type: "object", required: false, description: "Template variable data" },
    ]},
    responses: [{ code: "200", description: "Message sent successfully." }],
  },
  {
    method: "GET", path: "/messages/templates", operationId: "ListMessageTemplates",
    summary: "List message templates",
    description: "Retrieve a list of notification message templates.",
    tag: "notifications", parameters: [],
    responses: [{ code: "200", description: "Successfully retrieved message templates." }],
  },
  {
    method: "GET", path: "/messages/templates/{templateId}", operationId: "GetMessageTemplate",
    summary: "Get message template",
    description: "Retrieve a specific message template.",
    tag: "notifications",
    parameters: [
      { name: "templateId", in: "path", type: "string", required: true, description: "Unique identifier of the template" },
    ],
    responses: [{ code: "200", description: "Successfully retrieved message template." }],
  },
  {
    method: "POST", path: "/messages/templates", operationId: "CreateMessageTemplate",
    summary: "Create message template",
    description: "Create a new notification message template.",
    tag: "notifications", parameters: [],
    requestBody: { contentType: "application/json", required: true, properties: [
      { name: "name", type: "string", required: true, description: "Template name" },
      { name: "subject", type: "string", required: true, description: "Message subject template" },
      { name: "body", type: "string", required: true, description: "Message body template with variable placeholders" },
      { name: "channels", type: "array", required: false, description: "Delivery channels (email, push, sms)" },
    ]},
    responses: [{ code: "200", description: "Message template created successfully." }],
  },
  {
    method: "PATCH", path: "/messages/templates/{templateId}", operationId: "UpdateMessageTemplate",
    summary: "Update message template",
    description: "Update a specific message template.",
    tag: "notifications",
    parameters: [
      { name: "templateId", in: "path", type: "string", required: true, description: "Unique identifier of the template" },
    ],
    requestBody: { contentType: "application/json", required: true, properties: [
      { name: "name", type: "string", required: false, description: "Updated template name" },
      { name: "subject", type: "string", required: false, description: "Updated subject template" },
      { name: "body", type: "string", required: false, description: "Updated body template" },
    ]},
    responses: [{ code: "200", description: "Message template updated successfully." }],
  },
  {
    method: "DELETE", path: "/messages/templates/{templateId}", operationId: "DeleteMessageTemplate",
    summary: "Delete message template",
    description: "Permanently delete a specific message template.",
    tag: "notifications",
    parameters: [
      { name: "templateId", in: "path", type: "string", required: true, description: "Unique identifier of the template" },
    ],
    responses: [{ code: "200", description: "Message template deleted successfully." }],
  },

  // ═══════════════════ WEBHOOKS ═══════════════════
  {
    method: "GET", path: "/webhooks", operationId: "ListWebhooks",
    summary: "List webhooks",
    description: "Retrieve a list of configured webhooks with optional filtering.",
    tag: "webhooks",
    parameters: [
      { name: "type", in: "query", type: "string", required: false, description: "Filter by webhook type" },
      { name: "template_id", in: "query", type: "string", required: false, description: "Filter by template ID" },
      { name: "action", in: "query", type: "string", required: false, description: "Filter by action name" },
      { name: "is_active", in: "query", type: "boolean", required: false, description: "Filter by active status" },
    ],
    responses: [{ code: "200", description: "Successfully retrieved webhooks." }],
  },
  {
    method: "POST", path: "/webhooks", operationId: "CreateWebhook",
    summary: "Create webhook",
    description: "Create a new webhook to receive event notifications at the specified URL.",
    tag: "webhooks", parameters: [],
    requestBody: { contentType: "application/json", required: true, properties: [
      { name: "url", type: "string", required: true, description: "Webhook endpoint URL" },
      { name: "type", type: "string", required: true, description: "Event type to subscribe to" },
      { name: "template_id", type: "string", required: false, description: "Template to scope events to" },
      { name: "action", type: "string", required: false, description: "Action to scope events to" },
      { name: "secret", type: "string", required: false, description: "Shared secret for webhook signature verification" },
    ]},
    responses: [{ code: "200", description: "Webhook created successfully." }],
  },
  {
    method: "GET", path: "/webhooks/{webhookId}", operationId: "GetWebhook",
    summary: "Get webhook",
    description: "Retrieve a specific webhook configuration.",
    tag: "webhooks",
    parameters: [
      { name: "webhookId", in: "path", type: "string", required: true, description: "Unique identifier of the webhook" },
    ],
    responses: [{ code: "200", description: "Successfully retrieved webhook." }],
  },
  {
    method: "PATCH", path: "/webhooks/{webhookId}", operationId: "UpdateWebhook",
    summary: "Update webhook",
    description: "Update a specific webhook configuration.",
    tag: "webhooks",
    parameters: [
      { name: "webhookId", in: "path", type: "string", required: true, description: "Unique identifier of the webhook" },
    ],
    requestBody: { contentType: "application/json", required: true, properties: [
      { name: "url", type: "string", required: false, description: "Updated endpoint URL" },
      { name: "is_active", type: "boolean", required: false, description: "Enable or disable the webhook" },
    ]},
    responses: [{ code: "200", description: "Webhook updated successfully." }],
  },
  {
    method: "DELETE", path: "/webhooks/{webhookId}", operationId: "DeleteWebhook",
    summary: "Delete webhook",
    description: "Permanently delete a specific webhook.",
    tag: "webhooks",
    parameters: [
      { name: "webhookId", in: "path", type: "string", required: true, description: "Unique identifier of the webhook" },
    ],
    responses: [{ code: "200", description: "Webhook deleted successfully." }],
  },
  {
    method: "POST", path: "/webhooks/{webhookId}/test", operationId: "TestWebhook",
    summary: "Test webhook",
    description: "Send a test event payload to the webhook endpoint to verify connectivity.",
    tag: "webhooks",
    parameters: [
      { name: "webhookId", in: "path", type: "string", required: true, description: "Unique identifier of the webhook" },
    ],
    requestBody: { contentType: "application/json", required: false, properties: [
      { name: "payload", type: "object", required: false, description: "Custom test payload" },
    ]},
    responses: [{ code: "200", description: "Test event sent successfully." }],
  },

  // ═══════════════════ SEQUENCER ═══════════════════
  {
    method: "GET", path: "/batches", operationId: "ListBatches",
    summary: "List batches",
    description: "Retrieve a list of sequencer batches containing transactions.",
    tag: "sequencer",
    parameters: [
      { name: "limit", in: "query", type: "integer", required: false, description: "Maximum results" },
      { name: "next", in: "query", type: "string", required: false, description: "Pagination cursor" },
    ],
    responses: [{ code: "200", description: "Successfully retrieved batches." }],
  },
  {
    method: "GET", path: "/batches/{batchId}", operationId: "GetBatch",
    summary: "Get batch",
    description: "Retrieve details of a specific sequencer batch including contained transactions.",
    tag: "sequencer",
    parameters: [
      { name: "batchId", in: "path", type: "string", required: true, description: "Unique identifier of the batch" },
    ],
    responses: [{ code: "200", description: "Successfully retrieved batch." }],
  },
  {
    method: "GET", path: "/checkpoints", operationId: "ListCheckpoints",
    summary: "List checkpoints",
    description: "Retrieve a list of ZK-rollup checkpoints with state roots.",
    tag: "sequencer",
    parameters: [
      { name: "prev_state_root", in: "query", type: "string", required: false, description: "Filter by previous state root" },
      { name: "next_state_root", in: "query", type: "string", required: false, description: "Filter by next state root" },
      { name: "limit", in: "query", type: "integer", required: false, description: "Maximum results" },
    ],
    responses: [{ code: "200", description: "Successfully retrieved checkpoints." }],
  },
  {
    method: "GET", path: "/checkpoints/{checkpointId}", operationId: "GetCheckpoint",
    summary: "Get checkpoint",
    description: "Retrieve details of a specific ZK-rollup checkpoint including proof data.",
    tag: "sequencer",
    parameters: [
      { name: "checkpointId", in: "path", type: "string", required: true, description: "Unique identifier of the checkpoint" },
    ],
    responses: [{ code: "200", description: "Successfully retrieved checkpoint." }],
  },

  // ═══════════════════ PUBLIC API (INDEXER) ═══════════════════
  {
    method: "GET", path: "/public/templates", operationId: "ListPublicTemplates",
    summary: "List public templates",
    description: "Retrieve a list of publicly available templates. No authentication required.",
    tag: "indexer",
    parameters: [
      { name: "fqdn", in: "query", type: "string", required: false, description: "Filter by domain" },
      { name: "limit", in: "query", type: "integer", required: false, description: "Maximum results" },
      { name: "next", in: "query", type: "string", required: false, description: "Pagination cursor" },
    ],
    responses: [{ code: "200", description: "Successfully retrieved public templates." }],
  },
  {
    method: "GET", path: "/public/templates/{templateId}", operationId: "GetPublicTemplate",
    summary: "Get public template",
    description: "Retrieve a specific public template. No authentication required.",
    tag: "indexer",
    parameters: [
      { name: "templateId", in: "path", type: "string", required: true, description: "Unique identifier of the template" },
    ],
    responses: [{ code: "200", description: "Successfully retrieved public template." }],
  },
  {
    method: "GET", path: "/public/objects/{objectId}", operationId: "GetPublicObject",
    summary: "Get public object",
    description: "Retrieve a specific public object. No authentication required.",
    tag: "indexer",
    parameters: [
      { name: "objectId", in: "path", type: "string", required: true, description: "Unique identifier of the object" },
    ],
    responses: [{ code: "200", description: "Successfully retrieved public object." }],
  },
  {
    method: "POST", path: "/public/objects/search", operationId: "SearchPublicObjects",
    summary: "Search public objects",
    description: "Search for public objects using various filters. No authentication required.",
    tag: "indexer", parameters: [],
    requestBody: { contentType: "application/json", required: true, properties: [
      { name: "filter", type: "object", required: true, description: "Search filter criteria" },
      { name: "limit", type: "integer", required: false, description: "Maximum results" },
    ]},
    responses: [{ code: "200", description: "Search results returned successfully." }],
  },
  {
    method: "GET", path: "/public/faces/template/{templateId}", operationId: "GetPublicFacesByTemplate",
    summary: "Get public faces by template",
    description: "Retrieve public face definitions for a specific template. No authentication required.",
    tag: "indexer",
    parameters: [
      { name: "templateId", in: "path", type: "string", required: true, description: "Unique identifier of the template" },
    ],
    responses: [{ code: "200", description: "Successfully retrieved public faces." }],
  },
  {
    method: "GET", path: "/public/organizations/{organizationId}", operationId: "GetPublicOrganization",
    summary: "Get public organization",
    description: "Retrieve public details of a specific organization. No authentication required.",
    tag: "indexer",
    parameters: [
      { name: "organizationId", in: "path", type: "string", required: true, description: "Unique identifier of the organization" },
    ],
    responses: [{ code: "200", description: "Successfully retrieved public organization." }],
  },
  {
    method: "GET", path: "/public/stats", operationId: "GetPublicStats",
    summary: "Get public stats",
    description: "Retrieve public platform statistics including total objects, templates, and wallets.",
    tag: "indexer", parameters: [],
    responses: [{ code: "200", description: "Successfully retrieved platform statistics.", properties: [
      { name: "total_objects", type: "integer", required: true, description: "Total number of objects" },
      { name: "total_templates", type: "integer", required: true, description: "Total number of templates" },
      { name: "total_wallets", type: "integer", required: true, description: "Total registered wallets" },
    ]}],
  },
];

/* ── Tag metadata ── */

const tagMeta: Record<string, { label: string; description: string }> = {
  payments: { label: "Payments", description: "Payment configuration and deposit management for the DUAL network." },
  support: { label: "Support", description: "Support message management and feature access requests." },
  organizations: { label: "Organizations", description: "Organization management including members, roles, invitations, and billing." },
  ebus: { label: "Event Bus", description: "Execute and manage actions on the DUAL event bus. Actions are the primary way to interact with objects." },
  wallets: { label: "Wallets", description: "Wallet authentication, registration, and management. Wallets are the primary identity primitive." },
  apikeys: { label: "API Keys", description: "Create and manage API keys for programmatic access to the DUAL platform." },
  templates: { label: "Templates", description: "Template management for defining object structures, properties, and variations." },
  objects: { label: "Objects", description: "Object lifecycle management including creation, querying, search, and relationship traversal." },
  faces: { label: "Faces", description: "Face management for defining visual representations of objects (images, 3D, web views)." },
  storage: { label: "Storage", description: "File storage and asset management for templates and objects." },
  notifications: { label: "Notifications", description: "Message sending, templates, and notification management." },
  webhooks: { label: "Webhooks", description: "Webhook configuration for receiving real-time event notifications." },
  sequencer: { label: "Sequencer", description: "Batch and checkpoint management for the optimistic ZK-rollup sequencer." },
  indexer: { label: "Public API", description: "Public read-only endpoints for accessing templates, objects, and platform statistics without authentication." },
};

/* ── Exports ── */

export const endpointGroups: EndpointGroup[] = Object.entries(tagMeta).map(([tag, meta]) => ({
  tag,
  label: meta.label,
  description: meta.description,
  endpoints: rawEndpoints.filter(e => e.tag === tag),
}));

export const allEndpoints = rawEndpoints;

/** Base URL for the DUAL API */
export const API_BASE_URL = "https://blockv-labs.io";

/** Generate a curl example for an endpoint */
export function generateCurl(ep: Endpoint): string {
  const url = `${API_BASE_URL}${ep.path}`;
  const parts = [`curl -X ${ep.method} '${url}'`];
  parts.push(`  -H 'Authorization: Bearer YOUR_ACCESS_TOKEN'`);
  parts.push(`  -H 'Content-Type: application/json'`);
  if (ep.requestBody && ep.requestBody.properties.length > 0) {
    const body: Record<string, string | boolean | number> = {};
    for (const prop of ep.requestBody.properties) {
      if (prop.required) {
        if (prop.type === "boolean") body[prop.name] = true;
        else if (prop.type === "integer" || prop.type === "number") body[prop.name] = 0;
        else if (prop.type === "array") (body as Record<string, unknown>)[prop.name] = [];
        else if (prop.type === "object") (body as Record<string, unknown>)[prop.name] = {};
        else body[prop.name] = `your_${prop.name}`;
      }
    }
    parts.push(`  -d '${JSON.stringify(body, null, 2)}'`);
  }
  return parts.join(" \\\n");
}

/** Generate markdown for an entire endpoint group */
export function generateGroupMarkdown(group: { label: string; description: string; endpoints: Endpoint[] }): string {
  const lines: string[] = [];
  lines.push(`# ${group.label}`);
  lines.push(``);
  lines.push(group.description);
  lines.push(``);
  lines.push(`**Base URL:** \`${API_BASE_URL}\``);
  lines.push(`**Auth:** Bearer JWT / x-api-key`);
  lines.push(``);
  lines.push(`## Endpoints (${group.endpoints.length})`);
  lines.push(``);
  for (const ep of group.endpoints) {
    lines.push(`### ${ep.method} ${ep.path}`);
    lines.push(``);
    lines.push(ep.description || ep.summary);
    lines.push(``);
    const pathParams = ep.parameters.filter(p => p.in === "path");
    const queryParams = ep.parameters.filter(p => p.in === "query");
    if (pathParams.length > 0) {
      lines.push(`**Path Parameters:**`);
      for (const p of pathParams) {
        lines.push(`- \`${p.name}\` (${p.type}) — ${p.description || "required"}`);
      }
      lines.push(``);
    }
    if (queryParams.length > 0) {
      lines.push(`**Query Parameters:**`);
      for (const p of queryParams) {
        lines.push(`- \`${p.name}\` (${p.type}${p.required ? ", required" : ""}) — ${p.description || ""}`);
      }
      lines.push(``);
    }
    if (ep.requestBody && ep.requestBody.properties.length > 0) {
      lines.push(`**Request Body** (${ep.requestBody.contentType}):`);
      for (const p of ep.requestBody.properties) {
        lines.push(`- \`${p.name}\` (${p.type}${p.required ? ", required" : ""}) — ${p.description || ""}`);
      }
      lines.push(``);
    }
    lines.push(`\`\`\`bash`);
    lines.push(generateCurl(ep));
    lines.push(`\`\`\``);
    lines.push(``);
  }
  return lines.join("\n");
}

/** Generate a JavaScript/TypeScript fetch example */
export function generateJS(ep: Endpoint): string {
  const url = `${API_BASE_URL}${ep.path}`;
  const lines: string[] = [];
  lines.push(`const response = await fetch('${url}', {`);
  lines.push(`  method: '${ep.method}',`);
  lines.push(`  headers: {`);
  lines.push(`    'Authorization': 'Bearer YOUR_ACCESS_TOKEN',`);
  lines.push(`    'Content-Type': 'application/json',`);
  lines.push(`  },`);
  if (ep.requestBody && ep.requestBody.properties.length > 0) {
    const body: Record<string, string | boolean | number> = {};
    for (const prop of ep.requestBody.properties) {
      if (prop.required) {
        if (prop.type === "boolean") body[prop.name] = true;
        else if (prop.type === "integer" || prop.type === "number") body[prop.name] = 0;
        else if (prop.type === "array") (body as Record<string, unknown>)[prop.name] = [];
        else if (prop.type === "object") (body as Record<string, unknown>)[prop.name] = {};
        else body[prop.name] = `your_${prop.name}`;
      }
    }
    lines.push(`  body: JSON.stringify(${JSON.stringify(body, null, 4).split("\n").join("\n  ")}),`);
  }
  lines.push(`});`);
  lines.push(``);
  lines.push(`const data = await response.json();`);
  lines.push(`console.log(data);`);
  return lines.join("\n");
}
