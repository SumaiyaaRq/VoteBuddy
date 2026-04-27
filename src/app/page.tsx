import Link from "next/link";

export default function Home() {
  return (
    <div style={{ 
      minHeight: "100vh", 
      display: "flex", 
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "2rem",
      textAlign: "center"
    }}>
      <div className="glass" style={{
        padding: "4rem 2rem",
        borderRadius: "var(--radius-lg)",
        maxWidth: "800px",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "2rem"
      }}>
        <div style={{
          background: "var(--primary)",
          width: "80px",
          height: "80px",
          borderRadius: "var(--radius-md)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto",
          boxShadow: "0 10px 25px rgba(79, 70, 229, 0.4)"
        }}>
          <span style={{ fontSize: "2.5rem" }}>🗳️</span>
        </div>
        
        <div>
          <h1 style={{ fontSize: "3.5rem", marginBottom: "1rem", lineHeight: 1.1 }}>
            VoteBuddy
          </h1>
          <p style={{ fontSize: "1.25rem", opacity: 0.8, maxWidth: "600px", margin: "0 auto" }}>
            Your intelligent assistant for navigating the election process.
            Simple, secure, and neutral guidance for every voter.
          </p>
        </div>

        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", marginTop: "1rem" }}>
          <Link href="/login" className="btn btn-primary" style={{ minWidth: "160px" }}>
            Get Started
          </Link>
          <Link href="/about" className="btn" style={{ 
            minWidth: "160px",
            background: "rgba(255, 255, 255, 0.05)",
            border: "1px solid var(--glass-border)"
          }}>
            Learn More
          </Link>
        </div>

        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", 
          gap: "1.5rem",
          marginTop: "2rem",
          textAlign: "left"
        }}>
          <div className="card" style={{ background: "rgba(255, 255, 255, 0.03)" }}>
            <h3 style={{ marginBottom: "0.5rem" }}>🤖 AI Assistant</h3>
            <p style={{ fontSize: "0.875rem", opacity: 0.7 }}>Get instant answers to your voting questions.</p>
          </div>
          <div className="card" style={{ background: "rgba(255, 255, 255, 0.03)" }}>
            <h3 style={{ marginBottom: "0.5rem" }}>📍 Polling Locator</h3>
            <p style={{ fontSize: "0.875rem", opacity: 0.7 }}>Find your nearest voting station in seconds.</p>
          </div>
          <div className="card" style={{ background: "rgba(255, 255, 255, 0.03)" }}>
            <h3 style={{ marginBottom: "0.5rem" }}>✅ Eligibility</h3>
            <p style={{ fontSize: "0.875rem", opacity: 0.7 }}>Check if you're ready to vote with our smart tool.</p>
          </div>
        </div>
      </div>
      
      <footer style={{ marginTop: "4rem", opacity: 0.5, fontSize: "0.875rem" }}>
        © 2026 VoteBuddy. Providing neutral election guidance.
      </footer>
    </div>
  );
}
