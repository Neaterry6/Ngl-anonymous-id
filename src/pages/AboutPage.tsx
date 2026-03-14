import Header from '../components/Header';

export default function AboutPage() {
  return (
    <>
      <Header title="About" />
      <main className="container page-stack">
        <section className="panel">
          <h1>Why VZN Anon exists</h1>
          <p>
            Sometimes the most honest messages are the ones people are shy to send publicly.
            VZN Anon gives you a clean private space to collect that feedback, reflect on it,
            and engage with your community in your own way.
          </p>
        </section>

        <section className="panel">
          <h2>Built with intention</h2>
          <p>
            The experience is designed to be lightweight, mobile-friendly, and simple to use across feed,
            inbox, profile, dashboard, and group chat.
          </p>
          <p className="muted-note">Created with love — my broken VZN.</p>
        </section>
      </main>
    </>
  );
}
