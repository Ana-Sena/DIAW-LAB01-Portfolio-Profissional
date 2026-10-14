export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <p>{new Date().getFullYear()}</p>
      </div>
    </footer>
  );
}
