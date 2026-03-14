import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Canvas, IText, Rect } from 'fabric';
import Brand from '../components/Brand';
import ThemeToggle from '../components/ThemeToggle';

type FeedPost = {
  id: string;
  text: string;
  cardImage: string;
  createdAt: string;
};

const cardColors = ['#8b5cf6', '#0ea5a4', '#ec4899', '#2563eb', '#16a34a'];

export default function FeedPage() {
  const [cardText, setCardText] = useState('late night thoughts ✨');
  const [cardColor, setCardColor] = useState(cardColors[0]);
  const [posts, setPosts] = useState<FeedPost[]>([]);
  const canvasElRef = useRef<HTMLCanvasElement | null>(null);
  const editorRef = useRef<Canvas | null>(null);
  const bgRef = useRef<Rect | null>(null);
  const textRef = useRef<IText | null>(null);

  useEffect(() => {
    if (!canvasElRef.current || editorRef.current) return;

    const editor = new Canvas(canvasElRef.current, {
      width: 420,
      height: 240,
      backgroundColor: '#111827',
      preserveObjectStacking: true,
      selection: false,
    });

    const bg = new Rect({
      left: 0,
      top: 0,
      width: 420,
      height: 240,
      fill: cardColor,
      rx: 16,
      ry: 16,
      selectable: false,
      evented: false,
    });

    const txt = new IText(cardText, {
      left: 26,
      top: 42,
      width: 368,
      fill: '#ffffff',
      fontSize: 34,
      fontWeight: '700',
      fontFamily: 'Inter',
      editable: false,
      selectable: false,
    });

    editor.add(bg);
    editor.add(txt);
    editorRef.current = editor;
    bgRef.current = bg;
    textRef.current = txt;

    return () => {
      editor.dispose();
      editorRef.current = null;
    };
  }, [cardColor, cardText]);

  useEffect(() => {
    if (!editorRef.current || !bgRef.current) return;
    bgRef.current.set('fill', cardColor);
    editorRef.current.renderAll();
  }, [cardColor]);

  useEffect(() => {
    if (!editorRef.current || !textRef.current) return;
    textRef.current.set('text', cardText || 'write something...');
    editorRef.current.renderAll();
  }, [cardText]);

  const publishPost = () => {
    const editor = editorRef.current;
    if (!editor) return;

    const dataUrl = editor.toDataURL({ format: 'png', multiplier: 2 });
    setPosts((prev) => [
      {
        id: crypto.randomUUID(),
        text: cardText,
        cardImage: dataUrl,
        createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
      ...prev,
    ]);
  };

  return (
    <>
      <header className="site-header">
        <Brand subtitle="Your private corner" />
        <div className="feed-header-actions">
          <ThemeToggle />
          <details className="dropdown">
            <summary className="dropbtn">Profile Menu</summary>
            <div className="dropdown-content">
              <Link to="/profile">Update Profile</Link>
              <Link to="/inbox">Anonymous Inbox</Link>
              <Link to="/dashboard">Weekly Dashboard</Link>
              <Link to="/group-chat">Group Chat</Link>
              <Link to="/about">About</Link>
              <Link to="/">Log out</Link>
            </div>
          </details>
        </div>
      </header>

      <main className="container page-stack">
        <section className="panel">
          <h2>Create a feed card</h2>
          <p>Use the editor below to craft a simple visual post.</p>

          <div className="canvas-tools">
            <label>
              Card text
              <textarea value={cardText} onChange={(event) => setCardText(event.target.value)} rows={2} />
            </label>

            <label>
              Color
              <select value={cardColor} onChange={(event) => setCardColor(event.target.value)}>
                {cardColors.map((color) => (
                  <option key={color} value={color}>
                    {color}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="canvas-wrap">
            <canvas ref={canvasElRef} />
          </div>

          <button className="button primary" type="button" onClick={publishPost}>
            Publish Card
          </button>
        </section>

        <section className="panel">
          <h2>Your posts</h2>
          {posts.length === 0 ? (
            <p className="muted-note">No post yet. Publish your first card above.</p>
          ) : (
            <div className="feed-posts">
              {posts.map((post) => (
                <article key={post.id} className="feed-post-card">
                  <img src={post.cardImage} alt="Feed card" />
                  <p>{post.text}</p>
                  <small>{post.createdAt}</small>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>
    </>
  );
}
