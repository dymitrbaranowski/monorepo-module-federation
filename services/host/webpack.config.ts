import path from "path";
import webpack from "webpack";
import {BuildMode, BuildPaths, BuildPlatform, buildWebpack} from '@packages/build-config'
import  PackageJson from "./package.json";


interface EnvVariables {
  mode?: BuildMode; // 'development' | 'production'
  port?: number;
  analyzer?: boolean;
  platform?: BuildPlatform;
}

export default (env: EnvVariables) => {
  const paths: BuildPaths = {
    output: path.resolve(__dirname, "build"),
    entry: path.resolve(__dirname, "src", "bootstrap.tsx"),
    html: path.resolve(__dirname, "public", "index.html"),
    public: path.resolve(__dirname, "public"),

    src: path.resolve(__dirname, "src"),
  };

  const config:webpack.Configuration = buildWebpack({
    port: env.port ?? 3001,
    mode: env.mode ?? "development",
    paths,
    analyzer: env.analyzer,
    platform: env.platform ?? "desktop",
  });


  config.plugins.push(new webpack.container.ModuleFederationPlugin({

  }))
  return config;
};

