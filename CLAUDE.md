# Commands
- **Build**: `npm run build` (runs TypeScript compiler and Vite build)
- **Dev server**: `npm run dev` (runs Vite development server)
- **Lint**: `npm run lint` (runs ESLint with strict settings)
- **Preview build**: `npm run preview` (runs Vite preview server)

# Code Style Guidelines
- **TypeScript**: Strict mode enabled with no unused locals/parameters
- **React**: Use functional components with hooks
- **Imports**: Group by external packages, then internal modules
- **State Management**: Use React hooks (useState, useEffect)
- **Amplify**: Use generated client for data operations
- **Error Handling**: Handle potential errors in async operations with try/catch
- **Naming**: PascalCase for components, camelCase for functions/variables
- **Types**: Define explicit types for all functions, variables, and props
- **Formatting**: Follow eslint configuration (recommended TypeScript and React-hooks rules)
- **Comments**: Use JSDoc style for functions and components
- **Authentication**: Use Amplify Authenticator components for auth flows