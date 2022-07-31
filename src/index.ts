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

export class BangleConfig {
  constructor(private _rawConfig: RawBangleConfig) {}

  get build() {
    return this._rawConfig.build;
  }

  get changelogText(): string {
    return this._rawConfig.changelogText;
  }

  get helpDocsVersion(): string {
    return this._rawConfig.helpDocsVersion;
  }
}
