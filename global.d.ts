interface Window {
  dataLayer: any[] | undefined;
}

// <n8n-demo> is a Lit-based custom element from @n8n_io/n8n-demo-component,
// registered globally via its side-effect import in main.tsx. Its props are
// plain string attributes (see the package's `@property({type: String})`
// declarations) — JSX just needs to know the tag and attributes are legal.
namespace JSX {
  interface IntrinsicElements {
    "n8n-demo": React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement> & {
        workflow?: string;
        frame?: "true" | "false";
        src?: string;
        theme?: "light" | "dark";
        collapseformobile?: "true" | "false";
        clicktointeract?: "true" | "false";
        hidecanvaserrors?: "true" | "false";
        disableinteractivity?: "true" | "false";
        tidyup?: "true" | "false";
      },
      HTMLElement
    >;
  }
}