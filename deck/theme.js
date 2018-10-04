import { notes } from 'mdx-deck/themes';
import syntaxStyle from 'react-syntax-highlighter/styles/prism/duotone-dark';

export default {
  ...notes,
  prism: {
    style: syntaxStyle
  }
};
