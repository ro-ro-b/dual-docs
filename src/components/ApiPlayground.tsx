"use client";

import { useState, useCallback } from "react";
import { Endpoint, API_BASE_URL } from "@/data/api-endpoints";

interface ApiPlaygroundProps {
  endpoint: Endpoint;
}

interface ExampleData {
  pathValues?: Record<string, string>;
  queryValues?: Record<string, string>;
  bodyJson?: string;
  token?: string;
}

const defaultExamples: Record<string, ExampleData> = {
  "POST /templates": {
    bodyJson: JSON.stringify({
      template: {
        name: "my-org::example::v1",
        description: "Example template",
        public: false
      }
    }, null, 2)
  },
  "POST /objects": {
    bodyJson: JSON.stringify({
      templateRef: "obj_abc123",
      properties: {
        name: "Sample Object",
        value: 100
      }
    }, null, 2)
  },
  "POST /wallets/login": {
    bodyJson: JSON.stringify({
      email: "sandbox@dual.io",
      password: "sandbox123"
    }, null, 2)
  },
  "GET /objects/{id}": {
    pathValues: { id: "obj_abc123" }
  },
  "GET /templates/{id}": {
    pathValues: { id: "tmpl_abc123" }
  }
};

export default function ApiPlayground({ endpoint }: ApiPlaygroundProps) {
  const [token, setToken] = useState("");
  const [pathValues, setPathValues] = useState<Record<string, string>>(() => {
    const init: Record<string, string> = {};
    endpoint.parameters.filter(p => p.in === "path").forEach(p => { init[p.name] = ""; });
    return init;
  });
  const [queryValues, setQueryValues] = useState<Record<string, string>>(() => {
    const init: Record<string, string> = {};
    endpoint.parameters.filter(p => p.in === "query").forEach(p => { init[p.name] = ""; });
    return init;
  });
  const [bodyJson, setBodyJson] = useState(() => {
    if (!endpoint.requestBody?.properties.length) return "";
    const obj: Record<string, string> = {};
    endpoint.requestBody.properties.forEach(p => {
      obj[p.name] = p.type === "number" || p.type === "integer" ? "0" as unknown as string : "";
    });
    return JSON.stringify(obj, null, 2);
  });

  const [response, setResponse] = useState<{ status: number; statusText: string; body: string; time: number } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const pathParams = endpoint.parameters.filter(p => p.in === "path");
  const queryParams = endpoint.parameters.filter(p => p.in === "query");
  const needsAuth = endpoint.tag !== "indexer";

  const findExampleForEndpoint = useCallback(() => {
    const endpointKey = `${endpoint.method} ${endpoint.path}`;
    return defaultExamples[endpointKey];
  }, [endpoint.method, endpoint.path]);

  const handleLoadExample = useCallback(() => {
    const example = findExampleForEndpoint();
    if (!example) {
      setError("No example available for this endpoint");
      return;
    }

    if (example.pathValues) {
      setPathValues(prev => ({ ...prev, ...example.pathValues }));
    }
    if (example.queryValues) {
      setQueryValues(prev => ({ ...prev, ...example.queryValues }));
    }
    if (example.bodyJson) {
      setBodyJson(example.bodyJson);
    }
    if (example.token) {
      setToken(example.token);
    }
    setError("");
  }, [findExampleForEndpoint]);

  const buildUrl = useCallback(() => {
    let url = API_BASE_URL + endpoint.path;
    for (const [key, val] of Object.entries(pathValues)) {
      url = url.replace(`{${key}}`, val || `{${key}}`);
    }
    const qp = Object.entries(queryValues).filter(([, v]) => v.trim() !== "");
    if (qp.length > 0) {
      url += "?" + qp.map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`).join("&");
    }
    return url;
  }, [endpoint.path, pathValues, queryValues]);

  const handleSend = async () => {
    setLoading(true);
    setError("");
    setResponse(null);

    const url = buildUrl();
    const headers: Record<string, string> = { "Content-Type": "application/json" };
    if (token.trim()) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const options: RequestInit = {
      method: endpoint.method,
      headers,
    };

    if (["POST", "PUT", "PATCH"].includes(endpoint.method) && bodyJson.trim()) {
      try {
        JSON.parse(bodyJson);
        options.body = bodyJson;
      } catch {
        setError("Invalid JSON in request body");
        setLoading(false);
        return;
      }
    }

    const start = performance.now();
    try {
      const res = await fetch(url, options);
      const elapsed = Math.round(performance.now() - start);
      let body: string;
      try {
        const json = await res.json();
        body = JSON.stringify(json, null, 2);
      } catch {
        body = await res.text();
      }
      setResponse({ status: res.status, statusText: res.statusText, body, time: elapsed });
    } catch {
      const elapsed = Math.round(performance.now() - start);
      setError(`Network error — the API may not allow browser requests (CORS). Copy the cURL above instead.`);
      setResponse({ status: 0, statusText: "CORS / Network Error", body: "", time: elapsed });
    } finally {
      setLoading(false);
    }
  };

  const statusColor = response
    ? response.status >= 200 && response.status < 300
      ? "text-emerald-600"
      : response.status >= 400
      ? "text-red-500"
      : "text-amber-500"
    : "";

  return (
    <div className="rounded-lg border overflow-hidden" style={{ borderColor: "rgba(21,184,167,0.2)", backgroundColor: "rgba(21,184,167,0.02)" }}>
      {/* Header */}
      <div className="flex items-center gap-2 px-4 py-2.5" style={{ backgroundColor: "rgba(21,184,167,0.06)", borderBottom: "1px solid rgba(21,184,167,0.1)" }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#15b8a7" strokeWidth="2">
          <polygon points="5 3 19 12 5 21 5 3" />
        </svg>
        <span className="text-xs font-bold tracking-wider text-[#15b8a7] uppercase" style={{ fontFamily: "var(--font-satoshi)" }}>
          Try It
        </span>
        <span className="ml-auto text-[10px]" style={{ fontFamily: "var(--font-dm-mono)", color: "var(--text-muted)", opacity: 0.6 }}>
          {buildUrl()}
        </span>
      </div>

      {/* Info Banner */}
      <div className="px-4 py-2" style={{ backgroundColor: "rgba(21,184,167,0.05)", borderBottom: "1px solid rgba(21,184,167,0.1)" }}>
        <p className="text-xs" style={{ fontFamily: "var(--font-satoshi)", color: "var(--text-muted)" }}>
          <span style={{ color: "rgba(21,184,167,0.8)" }}>Sandbox:</span> sandbox@dual.io / sandbox123
        </p>
      </div>

      <div className="p-4 space-y-3">
        {/* Auth token */}
        {needsAuth && (
          <div>
            <label className="block text-[10px] font-bold tracking-wider uppercase mb-1" style={{ fontFamily: "var(--font-satoshi)", color: "var(--text-muted)" }}>
              Bearer Token
            </label>
            <input
              type="text"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              placeholder="eyJhbGciOiJIUzI1NiIs..."
              className="w-full px-3 py-1.5 text-xs rounded-md border focus:border-[#15b8a7] focus:outline-none focus:ring-1 focus:ring-[#15b8a7]/20 transition-colors"
              style={{ fontFamily: "var(--font-dm-mono)", backgroundColor: "var(--surface)", borderColor: "var(--border)", color: "var(--text-primary)" }}
            />
          </div>
        )}

        {/* Path params */}
        {pathParams.length > 0 && (
          <div>
            <label className="block text-[10px] font-bold tracking-wider uppercase mb-1" style={{ fontFamily: "var(--font-satoshi)", color: "var(--text-muted)" }}>
              Path Parameters
            </label>
            <div className="space-y-1.5">
              {pathParams.map((p) => (
                <div key={p.name} className="flex items-center gap-2">
                  <span className="text-xs text-[#15b8a7] font-medium w-32 shrink-0" style={{ fontFamily: "var(--font-dm-mono)" }}>
                    {p.name}
                  </span>
                  <input
                    type="text"
                    value={pathValues[p.name] || ""}
                    onChange={(e) => setPathValues({ ...pathValues, [p.name]: e.target.value })}
                    placeholder={p.description || p.type}
                    className="flex-1 px-3 py-1.5 text-xs rounded-md border focus:border-[#15b8a7] focus:outline-none focus:ring-1 focus:ring-[#15b8a7]/20 transition-colors"
                    style={{ fontFamily: "var(--font-dm-mono)", backgroundColor: "var(--surface)", borderColor: "var(--border)", color: "var(--text-primary)" }}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Query params */}
        {queryParams.length > 0 && (
          <div>
            <label className="block text-[10px] font-bold tracking-wider uppercase mb-1" style={{ fontFamily: "var(--font-satoshi)", color: "var(--text-muted)" }}>
              Query Parameters
            </label>
            <div className="space-y-1.5">
              {queryParams.map((p) => (
                <div key={p.name} className="flex items-center gap-2">
                  <span className="text-xs font-medium w-32 shrink-0" style={{ fontFamily: "var(--font-dm-mono)", color: "var(--text-muted)" }}>
                    {p.name}
                    {p.required && <span className="text-red-400 ml-0.5">*</span>}
                  </span>
                  <input
                    type="text"
                    value={queryValues[p.name] || ""}
                    onChange={(e) => setQueryValues({ ...queryValues, [p.name]: e.target.value })}
                    placeholder={p.description || p.type}
                    className="flex-1 px-3 py-1.5 text-xs rounded-md border focus:border-[#15b8a7] focus:outline-none focus:ring-1 focus:ring-[#15b8a7]/20 transition-colors"
                    style={{ fontFamily: "var(--font-dm-mono)", backgroundColor: "var(--surface)", borderColor: "var(--border)", color: "var(--text-primary)" }}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Request body */}
        {endpoint.requestBody && endpoint.requestBody.properties.length > 0 && (
          <div>
            <label className="block text-[10px] font-bold tracking-wider uppercase mb-1" style={{ fontFamily: "var(--font-satoshi)", color: "var(--text-muted)" }}>
              Request Body
            </label>
            <textarea
              value={bodyJson}
              onChange={(e) => setBodyJson(e.target.value)}
              rows={Math.min(12, bodyJson.split("\n").length + 1)}
              className="w-full px-3 py-2 text-xs rounded-md border focus:border-[#15b8a7] focus:outline-none focus:ring-1 focus:ring-[#15b8a7]/20 transition-colors resize-y"
              style={{ fontFamily: "var(--font-dm-mono)", lineHeight: 1.6, backgroundColor: "var(--surface)", borderColor: "var(--border)", color: "var(--text-primary)" }}
            />
          </div>
        )}

        {/* Buttons */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleLoadExample}
            className="flex items-center gap-2 px-4 py-2 border text-xs font-medium rounded-lg transition-colors cursor-pointer uppercase tracking-wider"
            style={{ fontFamily: "var(--font-satoshi)", borderColor: "rgba(21,184,167,0.3)", color: "rgb(21,184,167)", backgroundColor: "transparent" }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "rgba(21,184,167,0.08)"}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            Load Example
          </button>

          <button
            type="button"
            onClick={handleSend}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 bg-[#15b8a7] text-white text-xs font-medium rounded-lg hover:bg-[#13a596] disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer uppercase tracking-wider"
            style={{ fontFamily: "var(--font-satoshi)" }}
          >
            {loading ? (
              <>
                <svg width="14" height="14" viewBox="0 0 24 24" className="animate-spin" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                </svg>
                Sending...
              </>
            ) : (
              <>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
                Send Request
              </>
            )}
          </button>
        </div>

        {/* Error */}
        {error && (
          <div className="text-xs text-amber-600 bg-amber-50 border border-amber-200 rounded-md px-3 py-2 dark:bg-amber-950/30 dark:text-amber-400 dark:border-amber-800" style={{ fontFamily: "var(--font-satoshi)" }}>
            {error}
          </div>
        )}

        {/* Response */}
        {response && (
          <div className="rounded-lg border overflow-hidden" style={{ borderColor: "var(--border)" }}>
            <div className="flex items-center gap-3 px-4 py-2 bg-[#1e1e2e] border-b border-white/10">
              <span className="text-xs text-white/40 uppercase font-medium" style={{ fontFamily: "var(--font-dm-mono)" }}>
                Response
              </span>
              <span className={`text-xs font-bold ${statusColor}`} style={{ fontFamily: "var(--font-dm-mono)" }}>
                {response.status > 0 ? `${response.status} ${response.statusText}` : response.statusText}
              </span>
              <span className="ml-auto text-xs text-white/30" style={{ fontFamily: "var(--font-dm-mono)" }}>
                {response.time}ms
              </span>
            </div>
            {response.body && (
              <pre className="bg-[#1e1e2e] p-4 overflow-x-auto text-xs leading-relaxed max-h-64 overflow-y-auto">
                <code className="text-[#cdd6f4]" style={{ fontFamily: "var(--font-dm-mono)" }}>
                  {response.body}
                </code>
              </pre>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
