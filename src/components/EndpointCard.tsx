"use client";

import { useState } from "react";
import CodeBlock from "./CodeBlock";
import ApiPlayground from "./ApiPlayground";
import { Endpoint, generateCurl, generateJS } from "@/data/api-endpoints";

const methodColors: Record<string, { bg: string; text: string; border: string }> = {
  GET:    { bg: "bg-emerald-50 dark:bg-emerald-950/40", text: "text-emerald-700 dark:text-emerald-400", border: "border-emerald-200 dark:border-emerald-800" },
  POST:   { bg: "bg-blue-50 dark:bg-blue-950/40",    text: "text-blue-700 dark:text-blue-400",    border: "border-blue-200 dark:border-blue-800" },
  PUT:    { bg: "bg-amber-50 dark:bg-amber-950/40",   text: "text-amber-700 dark:text-amber-400",   border: "border-amber-200 dark:border-amber-800" },
  PATCH:  { bg: "bg-orange-50 dark:bg-orange-950/40",  text: "text-orange-700 dark:text-orange-400",  border: "border-orange-200 dark:border-orange-800" },
  DELETE: { bg: "bg-red-50 dark:bg-red-950/40",     text: "text-red-700 dark:text-red-400",     border: "border-red-200 dark:border-red-800" },
};

export default function EndpointCard({ endpoint }: { endpoint: Endpoint }) {
  const [expanded, setExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState<"curl" | "javascript">("curl");
  const colors = methodColors[endpoint.method] || methodColors.GET;

  const pathParams = endpoint.parameters.filter(p => p.in === "path");
  const queryParams = endpoint.parameters.filter(p => p.in === "query");

  return (
    <div
      className="rounded-lg border transition-all duration-200"
      style={{
        backgroundColor: "var(--surface)",
        borderColor: expanded ? "var(--border)" : "var(--border)",
        boxShadow: expanded ? "0 1px 3px rgba(0,0,0,0.08)" : "none",
      }}
    >
      {/* Header — always visible */}
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center gap-3 px-4 py-3 text-left cursor-pointer"
      >
        {/* Method badge */}
        <span
          className={`shrink-0 px-2.5 py-0.5 rounded text-xs font-bold ${colors.bg} ${colors.text} border ${colors.border}`}
          style={{ fontFamily: "var(--font-dm-mono)", minWidth: "62px", textAlign: "center" }}
        >
          {endpoint.method}
        </span>

        {/* Path */}
        <span
          className="text-sm font-medium truncate"
          style={{ fontFamily: "var(--font-dm-mono)", color: "var(--text-primary)" }}
        >
          {endpoint.path}
        </span>

        {/* Summary */}
        <span
          className="text-sm truncate ml-auto mr-2 hidden sm:block"
          style={{ fontFamily: "var(--font-satoshi)", color: "var(--text-muted)" }}
        >
          {endpoint.summary}
        </span>

        {/* Expand chevron */}
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className={`shrink-0 transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
          style={{ color: "var(--text-muted)" }}
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {/* Expanded details */}
      {expanded && (
        <div className="px-4 pb-4 space-y-4" style={{ borderTop: "1px solid var(--border)" }}>
          {/* Description */}
          <p className="text-sm pt-3 leading-relaxed" style={{ fontFamily: "var(--font-satoshi)", color: "var(--text-secondary)" }}>
            {endpoint.description}
          </p>

          {/* Auth indicator */}
          <div className="flex items-center gap-2">
            <span className="text-xs px-2 py-0.5 rounded" style={{ fontFamily: "var(--font-dm-mono)", backgroundColor: "var(--code-bg)", color: "var(--code-text)" }}>
              {endpoint.tag === "indexer" ? "No auth required" : "Bearer token / API key"}
            </span>
          </div>

          {/* Path Parameters */}
          {pathParams.length > 0 && (
            <div>
              <h4 className="text-xs font-bold tracking-wider mb-2 uppercase" style={{ fontFamily: "var(--font-satoshi)", color: "var(--text-muted)" }}>
                Path Parameters
              </h4>
              <div className="rounded-lg border overflow-hidden" style={{ borderColor: "var(--border)" }}>
                <table className="w-full text-sm">
                  <thead>
                    <tr style={{ backgroundColor: "rgba(21,184,167,0.06)" }}>
                      <th className="text-left px-3 py-2 text-xs font-medium" style={{ fontFamily: "var(--font-satoshi)", color: "var(--text-muted)" }}>Name</th>
                      <th className="text-left px-3 py-2 text-xs font-medium" style={{ fontFamily: "var(--font-satoshi)", color: "var(--text-muted)" }}>Type</th>
                      <th className="text-left px-3 py-2 text-xs font-medium hidden sm:table-cell" style={{ fontFamily: "var(--font-satoshi)", color: "var(--text-muted)" }}>Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pathParams.map((p) => (
                      <tr key={p.name} style={{ borderTop: "1px solid var(--border)" }}>
                        <td className="px-3 py-2">
                          <code className="text-xs text-[#15b8a7] font-medium" style={{ fontFamily: "var(--font-dm-mono)" }}>{p.name}</code>
                          <span className="ml-1.5 text-[10px] text-red-500 font-medium">required</span>
                        </td>
                        <td className="px-3 py-2 text-xs" style={{ fontFamily: "var(--font-dm-mono)", color: "var(--text-secondary)" }}>{p.type}</td>
                        <td className="px-3 py-2 text-xs hidden sm:table-cell" style={{ fontFamily: "var(--font-satoshi)", color: "var(--text-secondary)" }}>{p.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Query Parameters */}
          {queryParams.length > 0 && (
            <div>
              <h4 className="text-xs font-bold tracking-wider mb-2 uppercase" style={{ fontFamily: "var(--font-satoshi)", color: "var(--text-muted)" }}>
                Query Parameters
              </h4>
              <div className="rounded-lg border overflow-hidden" style={{ borderColor: "var(--border)" }}>
                <table className="w-full text-sm">
                  <thead>
                    <tr style={{ backgroundColor: "rgba(21,184,167,0.06)" }}>
                      <th className="text-left px-3 py-2 text-xs font-medium" style={{ fontFamily: "var(--font-satoshi)", color: "var(--text-muted)" }}>Name</th>
                      <th className="text-left px-3 py-2 text-xs font-medium" style={{ fontFamily: "var(--font-satoshi)", color: "var(--text-muted)" }}>Type</th>
                      <th className="text-left px-3 py-2 text-xs font-medium" style={{ fontFamily: "var(--font-satoshi)", color: "var(--text-muted)" }}>Required</th>
                      <th className="text-left px-3 py-2 text-xs font-medium hidden sm:table-cell" style={{ fontFamily: "var(--font-satoshi)", color: "var(--text-muted)" }}>Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {queryParams.map((p) => (
                      <tr key={p.name} style={{ borderTop: "1px solid var(--border)" }}>
                        <td className="px-3 py-2">
                          <code className="text-xs font-medium" style={{ fontFamily: "var(--font-dm-mono)", color: "var(--text-secondary)" }}>{p.name}</code>
                        </td>
                        <td className="px-3 py-2 text-xs" style={{ fontFamily: "var(--font-dm-mono)", color: "var(--text-secondary)" }}>{p.type}</td>
                        <td className="px-3 py-2 text-xs" style={{ fontFamily: "var(--font-satoshi)", color: "var(--text-muted)" }}>
                          {p.required ? <span className="text-red-500 font-medium">Yes</span> : "No"}
                        </td>
                        <td className="px-3 py-2 text-xs hidden sm:table-cell" style={{ fontFamily: "var(--font-satoshi)", color: "var(--text-secondary)" }}>{p.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Request Body */}
          {endpoint.requestBody && endpoint.requestBody.properties.length > 0 && (
            <div>
              <h4 className="text-xs font-bold tracking-wider mb-2 uppercase" style={{ fontFamily: "var(--font-satoshi)", color: "var(--text-muted)" }}>
                Request Body
                <span className="ml-2 font-normal normal-case" style={{ fontFamily: "var(--font-dm-mono)", color: "var(--text-muted)", opacity: 0.6 }}>
                  {endpoint.requestBody.contentType}
                </span>
              </h4>
              <div className="rounded-lg border overflow-hidden" style={{ borderColor: "var(--border)" }}>
                <table className="w-full text-sm">
                  <thead>
                    <tr style={{ backgroundColor: "rgba(21,184,167,0.06)" }}>
                      <th className="text-left px-3 py-2 text-xs font-medium" style={{ fontFamily: "var(--font-satoshi)", color: "var(--text-muted)" }}>Field</th>
                      <th className="text-left px-3 py-2 text-xs font-medium" style={{ fontFamily: "var(--font-satoshi)", color: "var(--text-muted)" }}>Type</th>
                      <th className="text-left px-3 py-2 text-xs font-medium" style={{ fontFamily: "var(--font-satoshi)", color: "var(--text-muted)" }}>Required</th>
                      <th className="text-left px-3 py-2 text-xs font-medium hidden sm:table-cell" style={{ fontFamily: "var(--font-satoshi)", color: "var(--text-muted)" }}>Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {endpoint.requestBody.properties.map((p) => (
                      <tr key={p.name} style={{ borderTop: "1px solid var(--border)" }}>
                        <td className="px-3 py-2">
                          <code className="text-xs font-medium" style={{ fontFamily: "var(--font-dm-mono)", color: "var(--text-secondary)" }}>{p.name}</code>
                        </td>
                        <td className="px-3 py-2 text-xs" style={{ fontFamily: "var(--font-dm-mono)", color: "var(--text-secondary)" }}>{p.type}</td>
                        <td className="px-3 py-2 text-xs" style={{ fontFamily: "var(--font-satoshi)", color: "var(--text-muted)" }}>
                          {p.required ? <span className="text-red-500 font-medium">Yes</span> : "No"}
                        </td>
                        <td className="px-3 py-2 text-xs hidden sm:table-cell" style={{ fontFamily: "var(--font-satoshi)", color: "var(--text-secondary)" }}>{p.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Response */}
          {endpoint.responses.length > 0 && endpoint.responses[0].properties && endpoint.responses[0].properties.length > 0 && (
            <div>
              <h4 className="text-xs font-bold tracking-wider mb-2 uppercase" style={{ fontFamily: "var(--font-satoshi)", color: "var(--text-muted)" }}>
                Response
                <span className="ml-2 font-normal normal-case">
                  <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-800">
                    {endpoint.responses[0].code}
                  </span>
                </span>
                {endpoint.responses[0].schemaName && (
                  <span className="ml-2 font-normal normal-case" style={{ fontFamily: "var(--font-dm-mono)", color: "var(--text-muted)", opacity: 0.6 }}>
                    {endpoint.responses[0].schemaName}
                  </span>
                )}
              </h4>
              <div className="rounded-lg border overflow-hidden" style={{ borderColor: "var(--border)" }}>
                <table className="w-full text-sm">
                  <thead>
                    <tr style={{ backgroundColor: "rgba(21,184,167,0.06)" }}>
                      <th className="text-left px-3 py-2 text-xs font-medium" style={{ fontFamily: "var(--font-satoshi)", color: "var(--text-muted)" }}>Field</th>
                      <th className="text-left px-3 py-2 text-xs font-medium" style={{ fontFamily: "var(--font-satoshi)", color: "var(--text-muted)" }}>Type</th>
                      <th className="text-left px-3 py-2 text-xs font-medium hidden sm:table-cell" style={{ fontFamily: "var(--font-satoshi)", color: "var(--text-muted)" }}>Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {endpoint.responses[0].properties.map((p) => (
                      <tr key={p.name} style={{ borderTop: "1px solid var(--border)" }}>
                        <td className="px-3 py-2">
                          <code className="text-xs font-medium" style={{ fontFamily: "var(--font-dm-mono)", color: "var(--text-secondary)" }}>{p.name}</code>
                        </td>
                        <td className="px-3 py-2 text-xs" style={{ fontFamily: "var(--font-dm-mono)", color: "var(--text-secondary)" }}>{p.type}</td>
                        <td className="px-3 py-2 text-xs hidden sm:table-cell" style={{ fontFamily: "var(--font-satoshi)", color: "var(--text-secondary)" }}>{p.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Code Examples */}
          <div>
            <div className="flex items-center gap-1 mb-2">
              <h4 className="text-xs font-bold tracking-wider uppercase" style={{ fontFamily: "var(--font-satoshi)", color: "var(--text-muted)" }}>
                Code Example
              </h4>
              <div className="ml-auto flex rounded-md border overflow-hidden" style={{ borderColor: "var(--border)" }}>
                <button
                  type="button"
                  onClick={() => setActiveTab("curl")}
                  className="px-3 py-1 text-xs font-medium cursor-pointer transition-colors"
                  style={{
                    fontFamily: "var(--font-dm-mono)",
                    backgroundColor: activeTab === "curl" ? "var(--text-primary)" : "var(--surface)",
                    color: activeTab === "curl" ? "var(--background)" : "var(--text-muted)",
                  }}
                >
                  cURL
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("javascript")}
                  className="px-3 py-1 text-xs font-medium cursor-pointer transition-colors"
                  style={{
                    fontFamily: "var(--font-dm-mono)",
                    borderLeft: "1px solid var(--border)",
                    backgroundColor: activeTab === "javascript" ? "var(--text-primary)" : "var(--surface)",
                    color: activeTab === "javascript" ? "var(--background)" : "var(--text-muted)",
                  }}
                >
                  JavaScript
                </button>
              </div>
            </div>
            <CodeBlock
              code={activeTab === "curl" ? generateCurl(endpoint) : generateJS(endpoint)}
              language={activeTab === "curl" ? "bash" : "javascript"}
            />
          </div>

          {/* API Playground */}
          <ApiPlayground endpoint={endpoint} />
        </div>
      )}
    </div>
  );
}
