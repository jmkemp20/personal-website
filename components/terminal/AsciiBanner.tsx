const BANNER = String.raw`
     ██╗ ██████╗ ███████╗██╗  ██╗██╗   ██╗ █████╗     ██╗  ██╗███████╗███╗   ███╗██████╗ 
     ██║██╔═══██╗██╔════╝██║  ██║██║   ██║██╔══██╗    ██║ ██╔╝██╔════╝████╗ ████║██╔══██╗
     ██║██║   ██║███████╗███████║██║   ██║███████║    █████╔╝ █████╗  ██╔████╔██║██████╔╝
██   ██║██║   ██║╚════██║██╔══██║██║   ██║██╔══██║    ██╔═██╗ ██╔══╝  ██║╚██╔╝██║██╔═══╝ 
╚█████╔╝╚██████╔╝███████║██║  ██║╚██████╔╝██║  ██║    ██║  ██╗███████╗██║ ╚═╝ ██║██║     
 ╚════╝  ╚═════╝ ╚══════╝╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═╝    ╚═╝  ╚═╝╚══════╝╚═╝     ╚═╝╚═╝      
`;

const BANNER_FONT_STACK =
  '"Cascadia Mono", "Cascadia Code", Consolas, "Liberation Mono", Menlo, "Courier New", monospace';

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
        <pre
          className="w-max whitespace-pre text-[0.55rem] leading-none tracking-normal text-accent md:text-[0.68rem] lg:text-[0.78rem]"
          style={{
            fontFamily: BANNER_FONT_STACK,
            fontFeatureSettings: '"liga" 0, "calt" 0',
            fontVariantLigatures: "none",
            textRendering: "geometricPrecision",
          }}
        >
          {BANNER}
        </pre>
      </div>
      <span className="sr-only">joshua kemp</span>
    </div>
  );
}
