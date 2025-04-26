# Token Finder for OpenAI Models

A simple web application that helps you count and visualize tokens for different OpenAI models. Built with React, TypeScript, and Vite.

## Features

- Real-time token counting for OpenAI models
- Support for multiple models (GPT-3.5 Turbo, GPT-4, GPT-4o, GPT2)
- Display of raw token IDs
- Clean, modern UI with dark theme
- Character count alongside token count

## Technologies Used

- React 19
- TypeScript
- Vite
- TailwindCSS
- tiktoken (for token counting)

## Prerequisites

- Node.js (v18 or higher)
- Yarn package manager

## Getting Started

1. Clone the repository:

```bash
git clone <your-repo-url>
cd token-finder
```

2. Install dependencies:

```bash
yarn install
```

3. Start the development server:

```bash
yarn dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Building for Production

To create a production build:

```bash
yarn build
```

The built files will be in the `dist` directory.

## Usage

1. Select your desired OpenAI model from the dropdown
2. Enter or paste your text in the textarea
3. View the token count and token IDs in real-time
4. The tokens are displayed as comma-separated numbers

## License

MIT
