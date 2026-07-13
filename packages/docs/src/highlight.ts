import { createHighlighter } from "shiki";
import { format } from "prettier";

const highlighterPromise = createHighlighter({
  themes: ["github-light", "github-dark"],
  langs: ["html", "js", "css", "bash"],
});

export async function highlight(
  code: string,
  printWidth = 80,
  lang = "html",
): Promise<string> {
  // prettier has no shell-script parser, so bash code is passed through unformatted
  const parser =
    lang === "html" ? "html" : lang === "css" ? "css" : lang === "bash" ? null : "babel";
  const formatted = parser
    ? await format(code, {
        parser,
        printWidth: printWidth,
        tabWidth: 2,
        // singleAttributePerLine: true
      })
    : code;

  const highlighter = await highlighterPromise;
  return highlighter.codeToHtml(formatted.trimEnd(), {
    lang,
    themes: { light: "github-light", dark: "github-dark" },
    defaultColor: false,
  });
}
