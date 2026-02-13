"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Container, Card, Form, Button } from "react-bootstrap";

const VALID_NAMES = ["jeyantharan", "pavithra"];

function normalize(name: string) {
  return name.trim().toLowerCase();
}

function isValidPair(yourName: string, valentineName: string) {
  const a = normalize(yourName);
  const b = normalize(valentineName);
  const entered = new Set([a, b]);
  const valid = new Set(VALID_NAMES);
  if (entered.size !== 2) return false;
  return VALID_NAMES.every((n) => entered.has(n));
}

export default function EntryPage() {
  const router = useRouter();
  const [yourName, setYourName] = useState("");
  const [valentineName, setValentineName] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!yourName.trim() || !valentineName.trim()) {
      setError("Please enter both names.");
      return;
    }
    if (!isValidPair(yourName, valentineName)) {
      setError("These names don't match our records. Try again!");
      return;
    }
    if (typeof window !== "undefined") {
      sessionStorage.setItem("valentineYourName", yourName.trim());
      sessionStorage.setItem("valentineName", valentineName.trim());
    }
    router.push("/home");
  };

  return (
    <div className="valentine-page">
      <Container className="py-4">
        <Card className="card-valentine p-4 p-md-5 mx-auto" style={{ maxWidth: "420px" }}>
          <div className="text-center mb-4">
            <span className="fs-1" style={{ display: "inline-block", marginBottom: "0.25rem" }}>💕</span>
            <h1 className="page-heading mt-2 mb-1">
              Valentine&apos;s Day
            </h1>
            <p className="page-subtitle small">Enter your names to continue</p>
          </div>
          <Form onSubmit={handleSubmit} className="form-valentine">
            <Form.Group className="mb-3">
              <Form.Label>Your name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                value={yourName}
                onChange={(e) => setYourName(e.target.value)}
                autoComplete="off"
              />
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label>Your Valentine&apos;s name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your Valentine's name"
                value={valentineName}
                onChange={(e) => setValentineName(e.target.value)}
                autoComplete="off"
              />
            </Form.Group>
            {error && <p className="error-msg">{error}</p>}
            <Button type="submit" className="btn-valentine w-100">
              Continue
            </Button>
          </Form>
        </Card>
      </Container>
    </div>
  );
}
