const buildFields = [
  "appEnv",
  "buildTime",
  "commitHash",
  "deployBranch",
  "hot",
  "netlifyBuildContext",
  "nodeEnv",
  "releaseId",
  "releaseVersion",
];

export interface FinalConfig {
  build: RawBuildConfig;
  app: RawAppConfig;
  debug: RawDebugConfig | undefined;
}

export interface RawBuildConfig {
  readonly appEnv: string;
  readonly buildTime: string;
  readonly commitHash: string;
  readonly deployBranch: string;
  readonly hot: boolean;
  readonly netlifyBuildContext: string;
  readonly nodeEnv: string;
  readonly releaseId: string;
  readonly releaseVersion: string;
}

const appFields = ["helpDocsVersion", "changelogText"];
export interface RawAppConfig {
  helpDocsVersion: string;
  changelogText: string;
}

const debugFields = ["writeSlowDown"];
export interface RawDebugConfig {
  writeSlowDown: number;
}

function checkObject<T>(object: T, fields: string[], objectName: string) {
  if (Object.keys(object).length !== fields.length) {
    const missingKey = fields.find((field) => !(field in object));
    console.log(Object.keys(object), fields);
    throw new Error(`${objectName} has a missing key ${missingKey}`);
  }
  for (const [key, value] of Object.entries(object)) {
    if (!fields.includes(key)) {
      throw new Error(`Unknown ${objectName} field: ${key}`);
    }
    if (value === undefined) {
      throw new Error(`${objectName} field ${key} is undefined`);
    }
  }
}

export class BangleConfig {
  build: Partial<RawBuildConfig>;
  app: Partial<RawAppConfig>;
  debug: Partial<RawDebugConfig>;

  static fromJSONString(s: string) {
    const { build, app, debug } = JSON.parse(s);
    return new BangleConfig({ app, build, debug });
  }

  serialize() {
    const payload: Record<keyof FinalConfig, any> = {
      build: this.build,
      app: this.app,
      debug: this.debug,
    };
    return JSON.stringify(payload);
  }

  finalize(): FinalConfig {
    checkObject(this.build, buildFields, "build");
    checkObject(this.app, appFields, "app");

    if (Object.keys(this.debug).length > 0) {
      checkObject(this.debug, debugFields, "debug");
    }

    return {
      app: this.app as any,
      build: this.build as any,
      debug:
        Object.keys(this.debug).length > 0 ? (this.debug as any) : undefined,
    };
  }

  merge(other: BangleConfig) {
    const build = { ...this.build, ...other.build };
    const app = { ...this.app, ...other.app };
    const debug = { ...this.debug, ...other.debug };

    return new BangleConfig({ build, app, debug });
  }
  print(label = "config") {
    const trim = (obj: any) => {
      return JSON.parse(
        JSON.stringify(obj, (_: any, v: any) => {
          if (typeof v === "string") {
            if (v.length > 20) {
              return v.substring(0, 20) + "...";
            }
            return v;
          }

          return v;
        })
      );
    };

    const grp = console.group ? console.group : console.log;
    const grpEnd = console.groupEnd ? console.groupEnd : console.log;

    grp(label);
    console.table(trim(this.app));
    console.table(trim(this.build));
    console.table(trim(this.debug));
    grpEnd();
  }

  constructor(
    obj: Partial<{
      build: Partial<RawBuildConfig>;
      app: Partial<RawAppConfig>;
      debug: Partial<RawDebugConfig>;
    }> = {}
  ) {
    this.build = obj.build || {};
    this.app = obj.app || {};
    this.debug = obj.debug || {};
  }
}
