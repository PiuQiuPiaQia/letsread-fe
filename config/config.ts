import { defineConfig } from "umi";
import theme from "../src/utils/theme";
import defaultSettings from "./defaultSettings";
import MonacoWebpackPlugin from "monaco-editor-webpack-plugin";
import { prefixPath } from "../src/utils/env";
import path from "path";
const esbuild = require("esbuild");
const { NODE_ENV } = process.env;

/**
 * base config file
 */
export default defineConfig({
  history: {
    type: "hash",
  },
  define: {
    env: NODE_ENV,
  },
  hash: true,
  locale: false,
  base: "/",
  publicPath: prefixPath,
  ignoreMomentLocale: true,
  theme: {
    "primary-color": defaultSettings.primaryColor,
    "primary-color-hover": "#1A66FF",
    "border-color-base": "#DCDFE5",
    "text-color": "#030A1A",
    "normal-icon-color": "#858C99",
    "normal-font-color": "#030A1A",
    ...theme,
  },
  antd: {},
  dva: {
    hmr: true,
  },
  targets: {
    // 浏览器兼容 Default: { chrome: 49, firefox: 64, safari: 10, edge: 13, ios: 10 }
    ie: 11,
    // firefox: 52,
  },
  dynamicImport: {
    loading: "@/pages/Loading",
  },
  dynamicImportSyntax: {},
  headScripts: [
    { src: `${prefixPath}classList.polyfill.min.js`, defer: true },
    { src: `${prefixPath}xlsx.full.min.js`, defer: true },
    { src: `${prefixPath}tinymce/tinymce.min.js`, defer: true },
  ],
  externals: {
    // react: 'window.React',
    xlsx: "XLSX",
  },
  scripts: [],
  copy: ["./vendor/classList.polyfill.min.js"],
  cssLoader: {
    modules: {
      localIdentName: "[local]--[hash:base64:5]",
      getLocalIdent: (
        context: {
          resourcePath: string;
        },
        _: string,
        localName: string
      ) => {
        if (
          context.resourcePath.includes("node_modules") ||
          context.resourcePath.includes("ant.design.pro.less") ||
          context.resourcePath.includes("global.less")
        ) {
          return localName;
        }

        const match = context.resourcePath.match(/src(.*)/);

        if (match && match[1]) {
          return null;
        }

        return localName;
      },
    },
  },
  manifest: {
    basePath: prefixPath,
  },
  metas: [],
  alias: {
    "@root": "/",
  },
  //["module-resolver", { root:["./"] ,"alias": { "@": path.resolve(__dirname,"../src") } }],
  // extraBabelPlugins:[['inline-react-svg',{}],["module-resolver", { root:["../"] ,"alias": { "@": "./src" } }]],
  extraBabelIncludes: [
    path.join(__dirname, "./node_modules/exif-rotate-js/lib"),
  ],
  chunks: ["vendors", "umi"],
  chainWebpack(config) {
    config.merge({
      optimization: {
        splitChunks: {
          cacheGroups: {
            commons: {
              test: /(react|react-dom)/,
              name: "vendors",
              chunks: "all",
            },
          },
        },
      },
    });
    // config.resolve.alias.set('monaco-editor', 'monaco-editor/esm/vs/editor/editor.api.js')
    config.plugin("monaco-editor").use(MonacoWebpackPlugin, [
      {
        languages: [
          "javascript",
          "python",
          "html",
          "java",
          "lua",
          "php",
          "cpp",
          "csharp",
          "shell",
          "go",
        ],
      },
    ]);
    config.module
      .rule("xlsx")
      .test(/\.(xlsx)$/)
      .use("file-loader")
      .loader("file-loader")
      .end();
  },
  // mfsu: {},
  // esbuild is father build tools
  // https://umijs.org/plugins/plugin-esbuild
});
