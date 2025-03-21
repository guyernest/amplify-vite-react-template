# Kosher Product Checker

A barcode-based product lookup tool for verifying kosher status, built with AWS Amplify Gen 2, React, and Vite.

## Overview

This application allows users to:

1. Search for products by barcode
2. View kosher information and certification
3. Add new products to the database
4. Update or delete existing product information

Built as a practical example of AWS Amplify Gen 2 capabilities, this app demonstrates the integration of React with AWS services including authentication, API (GraphQL), and database functionality.

## Features

- **Authentication**: Secure user authentication via AWS Cognito
- **Database**: DynamoDB-powered storage with GraphQL access
- **Real-time Updates**: Changes are immediately reflected in the UI
- **Mobile-Responsive**: Works on desktop and mobile devices
- **Barcode Lookup**: Quick access to product information via barcodes

## Technology Stack

- **Frontend**: React with TypeScript and Vite
- **Styling**: Custom CSS with responsive design
- **Backend**: AWS Amplify Gen 2
  - GraphQL API with AWS AppSync
  - Authentication with Amazon Cognito
  - Database with Amazon DynamoDB
  - Serverless functions with AWS Lambda

## Local Development

To run this application locally:

1. Clone the repository

   ```
   git clone <repository-url>
   ```

2. Install dependencies

   ```
   npm install
   ```

3. Start the development server

   ```
   npm run dev
   ```

4. Open your browser to http://localhost:5173

## Understanding AWS Amplify Gen 2

Amplify Gen 2 is AWS's latest approach to full-stack application development, offering several advantages over previous generations:

- **Type Safety**: End-to-end TypeScript support for better developer experience
- **Infrastructure as Code**: Backend defined as TypeScript code (not via CLI or console)
- **Simplified Deployment**: Streamlined deployment process with GitOps support
- **Sandbox Environment**: Local testing capabilities before deployment

Key components in this application:

- `amplify/` - Contains all backend code and configurations
  - `auth/` - Authentication configuration
  - `data/` - Data models, GraphQL schema, and resolvers
  - `backend.ts` - Main backend configuration file

- `src/` - Frontend React application code

Learn more about Amplify Gen 2 in the [official documentation](https://docs.amplify.aws/gen2/).

## Deploying to AWS

Amplify Gen 2 simplifies deployment through GitHub integration and automatic builds:

1. **Connect GitHub Repository**:
   - Sign in to [AWS Amplify Console](https://console.aws.amazon.com/amplify/home)
   - Select "Host web app" and choose GitHub as your repository provider
   - Authorize AWS Amplify to access your GitHub repositories
   - Select the repository and branch containing your application

2. **Configure Build Settings**:
   - Amplify automatically detects that you're using a Gen 2 project
   - The default build settings from `amplify.yml` will be used
   - You can customize build settings if needed

3. **Deploy**:
   - Click "Save and deploy"
   - Amplify will automatically build and deploy your application
   - Each new commit to your connected branch will trigger a new build and deployment

With this GitHub integration, you benefit from:

- Continuous deployment workflow
- Automatic backend provisioning
- Preview environments for pull requests
- Built-in monitoring and logging

For detailed deployment instructions, see the [Amplify documentation](https://docs.amplify.aws/gen2/deploy/deploy-nextjs/).

## License

This application is licensed under the MIT-0 License. See the LICENSE file for details.
