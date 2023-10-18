export default {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testRegex: 'src\/.*\.spec\.ts$',
    clearMocks: true,
    verbose: true,
    collectCoverage: true,
    coverageReporters: [
        'html',
        'text',
    ],
    coverageThreshold: {
        global: {
            branches: 95,
            functions: 95,
            lines:95,
            statements:95
        }
    },
    collectCoverageFrom: [
        'src/**/*.ts',
        '!src/index.ts'
    ]
};