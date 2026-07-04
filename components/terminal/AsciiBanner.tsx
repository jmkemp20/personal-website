const BANNER = String.raw`
     ██╗ ██████╗ ███████╗██╗  ██╗██╗   ██╗ █████╗     ██╗  ██╗███████╗███╗   ███╗██████╗ 
     ██║██╔═══██╗██╔════╝██║  ██║██║   ██║██╔══██╗    ██║ ██╔╝██╔════╝████╗ ████║██╔══██╗
     ██║██║   ██║███████╗███████║██║   ██║███████║    █████╔╝ █████╗  ██╔████╔██║██████╔╝
██   ██║██║   ██║╚════██║██╔══██║██║   ██║██╔══██║    ██╔═██╗ ██╔══╝  ██║╚██╔╝██║██╔═══╝ 
╚█████╔╝╚██████╔╝███████║██║  ██║╚██████╔╝██║  ██║    ██║  ██╗███████╗██║ ╚═╝ ██║██║     
 ╚════╝  ╚═════╝ ╚══════╝╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═╝    ╚═╝  ╚═╝╚══════╝╚═╝     ╚═╝╚═╝     
`;

/** ASCII wordmark for large screens; a compact styled name on small ones. */
export function AsciiBanner() {
  return (
    <div>
      {/* Small screens: readable stylized name */}
      <p className="text-2xl font-bold tracking-tight text-fg sm:hidden">
        <span className="text-accent">$</span> joshua
        <span className="text-accent">_</span>kemp
      </p>

      {/* Larger screens: full ASCII art. leading-none keeps the block glyphs
          connected vertically so the wordmark reads as solid letters. */}
      <div className="hidden overflow-x-auto pb-1 sm:block" aria-hidden>
        <pre className="w-max text-[0.55rem] text-accent md:text-[0.68rem] lg:text-[0.78rem]">
          {BANNER}
        </pre>
      </div>
      <span className="sr-only">joshua kemp</span>
    </div>
  );
}
