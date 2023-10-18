module.exports = {
    ignorePatterns: [
        'node_modules',
        '.idea',
        '.vscode',
        '.tscache',
        'build/**/*',
        'coverage/**/*'
    ],
    root: true,
    overrides: [
        {
            files: [
                '*.spec.ts',
                '*.spec.js'
            ]
        }
    ]
};