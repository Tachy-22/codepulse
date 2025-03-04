"use client";

import FileTree from "./FileTree";
import CodeBlock from "./ui/code-block";

const InstallationGuide = ({ type }: { type: "nextjs" | "stripe" }) => {
  const guides = {
    nextjs: {
      title: "Install Next.js",
      description: "Create a new Next.js app with TypeScript and Tailwind CSS",
      steps: [
        {
          title: "Create Next.js App",
          description: "Use create-next-app to bootstrap your project",
          code: "npx create-next-app@latest my-app --typescript --tailwind --eslint",
        },
        {
          title: "Navigate to Project",
          description: "Move into your project directory",
          code: "cd my-app",
        },
        {
          title: "Start Development Server",
          description: "Run the development server",
          code: "npm run dev",
        },
      ],
      folderStructure: `my-app/
  node_modules/
  public/
    next.svg
    vercel.svg
  src/
    app/
      favicon.ico
      globals.css
      layout.tsx
      page.tsx
    components/
  .eslintrc.json
  .gitignore
  next.config.js
  package.json
  postcss.config.js
  tailwind.config.ts
  tsconfig.json`,
    },
    stripe: {
      title: "Install Stripe",
      description: "Add Stripe payments to your Next.js application",
      steps: [
        {
          title: "Install Stripe Dependencies",
          description: "Install the required Stripe packages",
          code: "npm install stripe @stripe/stripe-js",
        },
        {
          title: "Install Stripe CLI (Optional)",
          description: "Install Stripe CLI for webhook testing",
          code: "brew install stripe/stripe-cli/stripe",
        },
        {
          title: "Login to Stripe CLI",
          description: "Authenticate with your Stripe account",
          code: "stripe login",
        },
      ],
      folderStructure: `my-app/
  src/
    app/
      api/
        stripe/
          webhook/
            route.ts
          create-session/
            route.ts
      checkout/
        page.tsx
    lib/
      stripe.ts
  .env.local
  package.json`,
    },
  };

  const guide = type === "nextjs" ? guides.nextjs : guides.stripe;
  const borderColor = "blue";

  return (
    <div className="p-4 px-1 lg:px-4">
      <div className="max-w-4xl mx-auto flex flex-col gap-8">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {guide.title}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            {guide.description}
          </p>
        </div>

        <div className="flex flex-col gap-10">
          {guide.steps.map((step, index) => (
            <div key={index} className="relative pl-8 lg:ml-8 ml-6">
              {/* Vertical Line */}
              <div
                className={`absolute left-0 top-[28px] h-full w-[2px] bg-gradient-to-b from-${borderColor}-500 to-${borderColor}-300 dark:from-${borderColor}-400 dark:to-${borderColor}-600`}
              />

              {/* Circle with number */}
              <div
                className={`absolute left-[-16px] top-[20px] h-8 w-8 rounded-full 
                  bg-gradient-to-br from-${borderColor}-400 to-${borderColor}-600 
                  flex items-center justify-center
                  shadow-lg shadow-${borderColor}-500/20`}
              >
                <span className="text-white text-sm font-medium">
                  {index + 1}
                </span>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-bold text-gray-700 dark:text-gray-300">
                  {step.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {step.description}
                </p>
                <div className="rounded-lg overflow-hidden border border-gray-700/20">
                  <CodeBlock
                    language="bash"
                    filename="Terminal"
                    code={step.code}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add Folder Structure Section */}
        <div className="flex flex-col gap-6 mt-8 px-4">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
            Expected File Structure
          </h2>
          <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-[1.25rem]">
            <FileTree content={guide.folderStructure} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstallationGuide;
