import { Link } from 'react-router-dom';
import Header from '../components/Header';

export default function LandingPage() {
  return (
    <>
      <Header title="A simple way to hear what people really think" />
      <main className="container hero">
        <section className="panel hero-panel ngl-hero">
          <p className="badge">Anonymous • Honest • Private</p>
          <h1>Get honest messages from your circle</h1>
          <p>
            Share your link in your bio or story. Friends can drop a message without revealing their name,
            and you see everything in one clean inbox.
          </p>
          <div className="cta-row">
            <Link className="button primary" to="/signup">Create account</Link>
            <Link className="button secondary" to="/login">I already have an account</Link>
          </div>
        </section>
      </main>
      <footer>
        <p>Created with love — my broken VZN.</p>
      </footer>
    </>
  );
}
