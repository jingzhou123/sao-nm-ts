module.exports = (
  {
    name,
    description,
    username,
    email
  },
  data
) => {
  return {
    name,
    version: '0.0.0',
    description,
    main: 'dist/index.js',
    files: [
      'dist/**/*'
    ],
    scripts: {
      test: 'jest',
      'test:cov': 'jest --coverage',
      'test:watch': 'jest --watch',
      prepublishOnly: 'npm run build',
      build: 'rm -rf dist && tsc --build tsconfig.json'
    },
    repository: {
      url: `${username}/${name}`,
      type: 'git'
    },
    author: `${username}<${email}>`,
    license: 'MIT',
    devDependencies: {
      '@types/jest': '^23.3.12',
      'jest': '^23.6.0',
      'ts-jest': '^23.10.5',
      'typescript': '^3.1.6'
    },
  }
}
