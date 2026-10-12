import { marked } from "marked";

const messages = [
  {
    sender: "me",
    message:
      "I'm building a settings page for our app. It has a lot of options, and it's starting to feel cluttered. How should I organize it?",
  },
  {
    sender: "them",
    message: `Start by sorting the options into a few clear groups, like Account, Notifications and Privacy. Most people come to a settings page to change one thing, so the group names should match how they think about the app, not how the code is built.\n\nInside each group, put the options people change most at the top. Settings that are rarely touched, or that can break things, can go further down or behind an Advanced section. Short labels with a one line description below them are easier to scan than long labels.\n\nLast, save changes as soon as they are made where you can, and show a small confirmation. If some settings need a save button, keep it in the same place in every group, so people always know where to find it.`,
  },
];

export const chat = () => ({
  idx: 0,
  messages: [],
  qued: null,

  queNext() {
    this.qued = messages[this.idx];
  },

  onReset() {
    this.idx = 0;
    this.messages = [];
  },

  async type(message) {
    return new Promise((resolve) => {
      const words = message.split(" ");

      const writeWord = (words) => {
        const [word, ...rest] = words;

        setTimeout(() => {}, 50);
      };

      writeWord(words);
    });
  },

  onSubmit(e) {
    if (e) e.preventDefault();

    if (this.idx >= messages.length) return;

    const msg = {
      ...messages[this.idx],
      message: marked.parse(messages[this.idx].message),
    };

    this.messages.push(msg);
    this.qued = null;

    if (msg.sender === "me") {
      this.idx++;
      
      setTimeout(() => {
        this.onSubmit();
      }, 500);
    } else {
    }

    console.log(e);
  },

  init() {
    this.queNext();

    console.log(
      marked.parse("# Marked in the browser\n\nRendered by **marked**."),
    );
  },
});
