interface RawBangleConfig {
    build: {
        readonly appEnv: string;
        readonly buildTime: string;
        readonly commitHash: string;
        readonly deployBranch: string;
        readonly hot: boolean;
        readonly netlifyBuildContext: string;
        readonly nodeEnv: string;
        readonly releaseId: string;
        readonly releaseVersion: string;
    };
    helpDocsVersion: string;
    changelogText: string;
}
export declare class BangleConfig {
    private _rawConfig;
    constructor(_rawConfig: RawBangleConfig);
    get build(): {
        readonly appEnv: string;
        readonly buildTime: string;
        readonly commitHash: string;
        readonly deployBranch: string;
        readonly hot: boolean;
        readonly netlifyBuildContext: string;
        readonly nodeEnv: string;
        readonly releaseId: string;
        readonly releaseVersion: string;
    };
    get changelogText(): string;
    get helpDocsVersion(): string;
}
export {};
