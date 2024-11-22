import { PlopTypes } from "@turbo/gen";

export default function generator(plop: PlopTypes.NodePlopAPI): void {
  plop.setGenerator('api', {
    description: 'Create a new API app workspace',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What is the name of your new API app?',
      },
      {
        type: 'input',
        name: 'port',
        message: 'What port would you like your API app to run on?',
        validate: (input, answers) => {
          return String(input).match(/^8\d{3}$/) !== null && String(input) !== '8000';
        }
      },
    ],
    actions: [
      // Copy files
      {
        type: 'addMany',
        destination: '{{turbo.paths.root}}/apps/{{name}}',
        base: '{{turbo.paths.root}}/apps/api',
        templateFiles: '{{turbo.paths.root}}/apps/api/**/*',
        globOptions: {
          dot: true,
          ignore: ['**/node_modules/**', '**/dist/**', "**/.turbo/**"],
        },
        verbose: true,
      },
      {
        type: 'modify',
        path: '{{ turbo.paths.root }}/apps/{{name}}/Dockerfile',
        pattern: /RUN turbo prune api --docker/g,
        template: 'RUN turbo prune {{name}} --docker',
      },
      {
        type: 'modify',
        path: '{{ turbo.paths.root }}/apps/{{name}}/Dockerfile',
        pattern: /RUN npm run build -- --filter=api/g,
        template: 'RUN npm run build -- --filter={{name}}',
      },
      {
        type: 'modify',
        path: '{{ turbo.paths.root }}/apps/{{name}}/Dockerfile',
        pattern: /COPY --from=installer \/app\/apps\/api\/dist .\/dist/g,
        template: 'COPY --from=installer /app/apps/{{name}}/dist ./dist',
      },
      {
        type: 'modify',
        path: '{{ turbo.paths.root }}/apps/{{name}}/Dockerfile',
        pattern: /EXPOSE 8000/g,
        template: 'EXPOSE {{port}}',
      },
      {
        type: 'modify',
        path: '{{ turbo.paths.root }}/apps/{{name}}/src/index.ts',
        pattern: /\|\|\s*8000;/g,
        template: '|| {{port}};',
      },
      {
        type: 'modify',
        path: '{{ turbo.paths.root }}/apps/{{name}}/package.json',
        transform: (content, data) => {
          const packageJson = JSON.parse(content);
          packageJson.name = data.name;
          return JSON.stringify(packageJson, null, 2);
        },
      },
    ],
  });
}
