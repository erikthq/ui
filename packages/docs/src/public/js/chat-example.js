import { marked } from "marked";

const messages = [
  {
    sender: "me",
    message:
      "I'm building a settings page for our app. It has a lot of options, and it's starting to feel cluttered. How should I organize it?",
  },
  {
    sender: "them",
    message: `Start by sorting the options into a few clear groups. Most people come to a settings page to change one thing, so the group names should match how they think about the app, not how the code is built.

A good starting point for most apps:

- **Account**: name, email, password and sign out
- **Notifications**: what to hear about, and where
- **Privacy**: who can see what, and data export
- **Advanced**: anything rarely touched, or that can break things

Inside each group, put the options people change most at the top. Short labels with a one line description below them are easier to scan than long labels.

Last, save changes as soon as they are made where you can, and show a small confirmation.`,
  },
  {
    sender: "me",
    message: "Nice. Should the on/off options be checkboxes or switches?",
  },
  {
    sender: "them",
    message: `It depends on **when the change happens**:

1. Use a **switch** when the setting applies right away, like turning on dark mode.
2. Use a **checkbox** when the choice is only saved after the user presses a button, like picking options in a form.

A switch looks like it does something the moment you flip it, so people expect it to save on its own. In erikt/ui a switch is a checkbox with a class:

\`\`\`html
<label>
  <input type="checkbox" class="switch" checked />
  Email me when someone replies
</label>
\`\`\`

Always put the label in the \`<label>\`, so clicking the text flips it too. There is more on this in the [Nielsen Norman Group article on toggle switches](https://www.nngroup.com/articles/toggle-switch-guidelines/).`,
  },
  {
    sender: "me",
    message: "How do I make sure the page works well with a keyboard?",
  },
  {
    sender: "them",
    message: `If you use native elements, most of it works already. A few things to check:

- **Tab order** follows the order on the page. Don't change it with \`tabindex\` values above 0.
- **Focus is visible** on every control. Never remove the outline without putting something in its place.
- **Groups have headings**, so screen reader users can jump between them. A \`<fieldset>\` with a \`<legend>\` works well for this.
- **Dangerous actions ask first**. Deleting an account should open a \`<dialog>\`, and focus should go back to the button when it closes.

Then try it yourself: put the mouse away and change a few settings with only *Tab*, *Space* and *Enter*. MDN has a good guide on [keyboard accessible pages](https://developer.mozilla.org/en-US/docs/Web/Accessibility/Guides/Understanding_WCAG/Keyboard) if you want to go deeper.`,
  },
];

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Mock AI endpoint. Replies with the message at `idx`, streamed one word at a
// time like a model generating tokens
const server = {
  stream(text) {
    const encoder = new TextEncoder();
    const tokens = text.match(/\S+\s*/g) ?? [];

    return new ReadableStream({
      async pull(controller) {
        // await wait(20 + Math.random() * 60);
        await wait(10 + Math.random() * 20);

        const token = tokens.shift();

        if (token === undefined) controller.close();
        else controller.enqueue(encoder.encode(token));
      },
    });
  },

  async fetch(idx) {
    // time to first token
    await wait(200);

    const reply = messages[idx];

    if (reply?.sender !== "them") return new Response(null, { status: 404 });

    return new Response(this.stream(reply.message), {
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  },
};

export const chat = () => ({
  idx: 0,
  messages: [],
  qued: null,
  streaming: false,
  // bumped on reset, so an ongoing stream knows to stop
  session: 0,

  queNext() {
    const next = messages[this.idx];
    this.qued = next?.sender === "me" ? next : null;
  },

  onReset() {
    this.session++;
    this.idx = 0;
    this.messages = [];
    this.streaming = false;
    this.queNext();
  },

  async onSubmit(e) {
    if (e) e.preventDefault();

    if (this.streaming || !this.qued) return;

    const session = this.session;
    const stale = () => session !== this.session;

    this.streaming = true;
    this.messages.push({
      ...this.qued,
      message: marked.parse(this.qued.message),
    });
    this.idx++;
    this.qued = null;

    this.messages.push({ sender: "them", message: "", pending: true });
    // read it back from the array to get Alpine's reactive proxy
    const reply = this.messages[this.messages.length - 1];

    const response = await server.fetch(this.idx);

    if (stale()) return;

    if (!response.ok) {
      this.messages.pop();
      this.streaming = false;
      return;
    }

    const reader = response.body
      .pipeThrough(new TextDecoderStream())
      .getReader();

    let text = "";

    while (true) {
      const { done, value } = await reader.read();

      if (stale()) return reader.cancel();
      if (done) break;

      text += value;
      // screen readers wait for the whole reply instead of reading each word
      reply.pending = false;
      reply.busy = true;
      reply.message = marked.parse(text);
    }

    reply.pending = false;
    reply.busy = false;
    this.idx++;
    this.streaming = false;
    this.queNext();
  },

  scrollToBottom() {
    // the jump button hides once scrolled down, so focus would be lost
    this.$refs.output.focus();
    this.$refs.output.scrollTo({
      top: this.$refs.output.scrollHeight,
      behavior: "smooth",
    });
  },

  init() {
    this.queNext();
  },
});
