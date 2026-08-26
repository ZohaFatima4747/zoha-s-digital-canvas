const links = [
  { href: "#work", label: "Work" },
  { href: "#services", label: "Services" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export function Footer() {
  return (
    <footer className="border-t border-border py-10">
      <div className="mx-auto flex max-w-[1500px] flex-col gap-6 px-6 md:flex-row md:items-center md:justify-between md:px-10">
        <a href="#top" data-cursor="top" className="label-mono">
          Zoha Fatima <span className="text-muted-foreground">/ Full-Stack Developer</span>
        </a>

        <nav className="flex flex-wrap gap-x-6 gap-y-2">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              data-cursor
              className="label-mono text-muted-foreground transition-colors hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <span className="label-mono text-muted-foreground">
          © {new Date().getFullYear()} — All rights reserved
        </span>
      </div>
    </footer>
  );
}
