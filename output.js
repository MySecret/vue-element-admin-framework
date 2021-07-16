{
  mode: 'development',
  context: 'E:\\SVN\\前端源码\\业务系统',
  node: {
    setImmediate: false,
    process: 'mock',
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  },
  output: {
    path: 'E:\\SVN\\前端源码\\业务系统\\dist',
    filename: 'static/js/[name].js',
    publicPath: '/',
    chunkFilename: 'static/js/[name].js'
  },
  resolve: {
    alias: {
      '@': 'E:\\SVN\\前端源码\\业务系统\\src',
      vue$: 'vue/dist/vue.runtime.esm.js'
    },
    extensions: [
      '.mjs',
      '.js',
      '.jsx',
      '.vue',
      '.json',
      '.wasm'
    ],
    modules: [
      'node_modules',
      'E:\\SVN\\前端源码\\业务系统\\node_modules',
      'E:\\SVN\\前端源码\\业务系统\\node_modules\\@vue\\cli-service\\node_modules'
    ],
    plugins: [
      {
        apply: function nothing() {
          // ¯\_(ツ)_/¯
        },
        makePlugin: function () { /* omitted long function */ },
        moduleLoader: function () { /* omitted long function */ },
        topLevelLoader: {
          apply: function nothing() {
            // ¯\_(ツ)_/¯
          }
        },
        bind: function () { /* omitted long function */ },
        tsLoaderOptions: function () { /* omitted long function */ },
        forkTsCheckerOptions: function () { /* omitted long function */ }
      }
    ]
  },
  resolveLoader: {
    modules: [
      'E:\\SVN\\前端源码\\业务系统\\node_modules\\@vue\\cli-plugin-babel\\node_modules',
      'node_modules',
      'E:\\SVN\\前端源码\\业务系统\\node_modules',
      'E:\\SVN\\前端源码\\业务系统\\node_modules\\@vue\\cli-service\\node_modules'
    ],
    plugins: [
      {
        apply: function nothing() {
          // ¯\_(ツ)_/¯
        }
      }
    ]
  },
  module: {
    noParse: /^(vue|vue-router|vuex|vuex-router-sync)$/,
    rules: [
      /* config.module.rule('vue') */
      {
        test: /\.vue$/,
        use: [
          {
            loader: 'E:\\SVN\\前端源码\\业务系统\\node_modules\\cache-loader\\dist\\cjs.js',
            options: {
              cacheDirectory: 'E:\\SVN\\前端源码\\业务系统\\node_modules\\.cache\\vue-loader',
              cacheIdentifier: '184ea64e'
            }
          },
          {
            loader: 'E:\\SVN\\前端源码\\业务系统\\node_modules\\vue-loader\\lib\\index.js',
            options: {
              compilerOptions: {
                whitespace: 'condense'
              },
              cacheDirectory: 'E:\\SVN\\前端源码\\业务系统\\node_modules\\.cache\\vue-loader',
              cacheIdentifier: '184ea64e'
            }
          }
        ]
      },
      /* config.module.rule('images') */
      {
        test: /\.(png|jpe?g|gif|webp)(\?.*)?$/,
        use: [
          {
            loader: 'E:\\SVN\\前端源码\\业务系统\\node_modules\\url-loader\\dist\\cjs.js',
            options: {
              limit: 4096,
              fallback: {
                loader: 'E:\\SVN\\前端源码\\业务系统\\node_modules\\file-loader\\dist\\cjs.js',
                options: {
                  name: 'static/img/[name].[hash:8].[ext]'
                }
              }
            }
          }
        ]
      },
      /* config.module.rule('svg') */
      {
        test: /\.(svg)(\?.*)?$/,
        exclude: [
          'E:\\SVN\\前端源码\\业务系统\\src\\icons'
        ],
        use: [
          {
            loader: 'E:\\SVN\\前端源码\\业务系统\\node_modules\\file-loader\\dist\\cjs.js',
            options: {
              name: 'static/img/[name].[hash:8].[ext]'
            }
          }
        ]
      },
      /* config.module.rule('media') */
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        use: [
          {
            loader: 'E:\\SVN\\前端源码\\业务系统\\node_modules\\url-loader\\dist\\cjs.js',
            options: {
              limit: 4096,
              fallback: {
                loader: 'E:\\SVN\\前端源码\\业务系统\\node_modules\\file-loader\\dist\\cjs.js',
                options: {
                  name: 'static/media/[name].[hash:8].[ext]'
                }
              }
            }
          }
        ]
      },
      /* config.module.rule('fonts') */
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
        use: [
          {
            loader: 'E:\\SVN\\前端源码\\业务系统\\node_modules\\url-loader\\dist\\cjs.js',
            options: {
              limit: 4096,
              fallback: {
                loader: 'E:\\SVN\\前端源码\\业务系统\\node_modules\\file-loader\\dist\\cjs.js',
                options: {
                  name: 'static/fonts/[name].[hash:8].[ext]'
                }
              }
            }
          }
        ]
      },
      /* config.module.rule('pug') */
      {
        test: /\.pug$/,
        oneOf: [
          /* config.module.rule('pug').rule('pug-vue') */
          {
            resourceQuery: /vue/,
            use: [
              {
                loader: 'pug-plain-loader'
              }
            ]
          },
          /* config.module.rule('pug').rule('pug-template') */
          {
            use: [
              {
                loader: 'E:\\SVN\\前端源码\\业务系统\\node_modules\\raw-loader\\index.js'
              },
              {
                loader: 'pug-plain-loader'
              }
            ]
          }
        ]
      },
      /* config.module.rule('css') */
      {
        test: /\.css$/,
        oneOf: [
          /* config.module.rule('css').rule('vue-modules') */
          {
            resourceQuery: /module/,
            use: [
              {
                loader: 'E:\\SVN\\前端源码\\业务系统\\node_modules\\mini-css-extract-plugin\\dist\\loader.js',
                options: {
                  hmr: true,
                  publicPath: '../../'
                }
              },
              {
                loader: 'E:\\SVN\\前端源码\\业务系统\\node_modules\\css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2,
                  modules: {
                    localIdentName: '[name]_[local]_[hash:base64:5]'
                  }
                }
              },
              {
                loader: 'E:\\SVN\\前端源码\\业务系统\\node_modules\\@vue\\cli-service\\node_modules\\postcss-loader\\src\\index.js',
                options: {
                  sourceMap: false
                }
              }
            ]
          },
          /* config.module.rule('css').rule('vue') */
          {
            resourceQuery: /\?vue/,
            use: [
              {
                loader: 'E:\\SVN\\前端源码\\业务系统\\node_modules\\mini-css-extract-plugin\\dist\\loader.js',
                options: {
                  hmr: true,
                  publicPath: '../../'
                }
              },
              {
                loader: 'E:\\SVN\\前端源码\\业务系统\\node_modules\\css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              {
                loader: 'E:\\SVN\\前端源码\\业务系统\\node_modules\\@vue\\cli-service\\node_modules\\postcss-loader\\src\\index.js',
                options: {
                  sourceMap: false
                }
              }
            ]
          },
          /* config.module.rule('css').rule('normal-modules') */
          {
            test: /\.module\.\w+$/,
            use: [
              {
                loader: 'E:\\SVN\\前端源码\\业务系统\\node_modules\\mini-css-extract-plugin\\dist\\loader.js',
                options: {
                  hmr: true,
                  publicPath: '../../'
                }
              },
              {
                loader: 'E:\\SVN\\前端源码\\业务系统\\node_modules\\css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2,
                  modules: {
                    localIdentName: '[name]_[local]_[hash:base64:5]'
                  }
                }
              },
              {
                loader: 'E:\\SVN\\前端源码\\业务系统\\node_modules\\@vue\\cli-service\\node_modules\\postcss-loader\\src\\index.js',
                options: {
                  sourceMap: false
                }
              }
            ]
          },
          /* config.module.rule('css').rule('normal') */
          {
            use: [
              {
                loader: 'E:\\SVN\\前端源码\\业务系统\\node_modules\\mini-css-extract-plugin\\dist\\loader.js',
                options: {
                  hmr: true,
                  publicPath: '../../'
                }
              },
              {
                loader: 'E:\\SVN\\前端源码\\业务系统\\node_modules\\css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              {
                loader: 'E:\\SVN\\前端源码\\业务系统\\node_modules\\@vue\\cli-service\\node_modules\\postcss-loader\\src\\index.js',
                options: {
                  sourceMap: false
                }
              }
            ]
          }
        ]
      },
      /* config.module.rule('postcss') */
      {
        test: /\.p(ost)?css$/,
        oneOf: [
          /* config.module.rule('postcss').rule('vue-modules') */
          {
            resourceQuery: /module/,
            use: [
              {
                loader: 'E:\\SVN\\前端源码\\业务系统\\node_modules\\mini-css-extract-plugin\\dist\\loader.js',
                options: {
                  hmr: true,
                  publicPath: '../../'
                }
              },
              {
                loader: 'E:\\SVN\\前端源码\\业务系统\\node_modules\\css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2,
                  modules: {
                    localIdentName: '[name]_[local]_[hash:base64:5]'
                  }
                }
              },
              {
                loader: 'E:\\SVN\\前端源码\\业务系统\\node_modules\\@vue\\cli-service\\node_modules\\postcss-loader\\src\\index.js',
                options: {
                  sourceMap: false
                }
              }
            ]
          },
          /* config.module.rule('postcss').rule('vue') */
          {
            resourceQuery: /\?vue/,
            use: [
              {
                loader: 'E:\\SVN\\前端源码\\业务系统\\node_modules\\mini-css-extract-plugin\\dist\\loader.js',
                options: {
                  hmr: true,
                  publicPath: '../../'
                }
              },
              {
                loader: 'E:\\SVN\\前端源码\\业务系统\\node_modules\\css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              {
                loader: 'E:\\SVN\\前端源码\\业务系统\\node_modules\\@vue\\cli-service\\node_modules\\postcss-loader\\src\\index.js',
                options: {
                  sourceMap: false
                }
              }
            ]
          },
          /* config.module.rule('postcss').rule('normal-modules') */
          {
            test: /\.module\.\w+$/,
            use: [
              {
                loader: 'E:\\SVN\\前端源码\\业务系统\\node_modules\\mini-css-extract-plugin\\dist\\loader.js',
                options: {
                  hmr: true,
                  publicPath: '../../'
                }
              },
              {
                loader: 'E:\\SVN\\前端源码\\业务系统\\node_modules\\css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2,
                  modules: {
                    localIdentName: '[name]_[local]_[hash:base64:5]'
                  }
                }
              },
              {
                loader: 'E:\\SVN\\前端源码\\业务系统\\node_modules\\@vue\\cli-service\\node_modules\\postcss-loader\\src\\index.js',
                options: {
                  sourceMap: false
                }
              }
            ]
          },
          /* config.module.rule('postcss').rule('normal') */
          {
            use: [
              {
                loader: 'E:\\SVN\\前端源码\\业务系统\\node_modules\\mini-css-extract-plugin\\dist\\loader.js',
                options: {
                  hmr: true,
                  publicPath: '../../'
                }
              },
              {
                loader: 'E:\\SVN\\前端源码\\业务系统\\node_modules\\css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              {
                loader: 'E:\\SVN\\前端源码\\业务系统\\node_modules\\@vue\\cli-service\\node_modules\\postcss-loader\\src\\index.js',
                options: {
                  sourceMap: false
                }
              }
            ]
          }
        ]
      },
      /* config.module.rule('scss') */
      {
        test: /\.scss$/,
        oneOf: [
          /* config.module.rule('scss').rule('vue-modules') */
          {
            resourceQuery: /module/,
            use: [
              {
                loader: 'E:\\SVN\\前端源码\\业务系统\\node_modules\\mini-css-extract-plugin\\dist\\loader.js',
                options: {
                  hmr: true,
                  publicPath: '../../'
                }
              },
              {
                loader: 'E:\\SVN\\前端源码\\业务系统\\node_modules\\css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2,
                  modules: {
                    localIdentName: '[name]_[local]_[hash:base64:5]'
                  }
                }
              },
              {
                loader: 'E:\\SVN\\前端源码\\业务系统\\node_modules\\@vue\\cli-service\\node_modules\\postcss-loader\\src\\index.js',
                options: {
                  sourceMap: false
                }
              },
              {
                loader: 'E:\\SVN\\前端源码\\业务系统\\node_modules\\sass-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false
                }
              }
            ]
          },
          /* config.module.rule('scss').rule('vue') */
          {
            resourceQuery: /\?vue/,
            use: [
              {
                loader: 'E:\\SVN\\前端源码\\业务系统\\node_modules\\mini-css-extract-plugin\\dist\\loader.js',
                options: {
                  hmr: true,
                  publicPath: '../../'
                }
              },
              {
                loader: 'E:\\SVN\\前端源码\\业务系统\\node_modules\\css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              {
                loader: 'E:\\SVN\\前端源码\\业务系统\\node_modules\\@vue\\cli-service\\node_modules\\postcss-loader\\src\\index.js',
                options: {
                  sourceMap: false
                }
              },
              {
                loader: 'E:\\SVN\\前端源码\\业务系统\\node_modules\\sass-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false
                }
              }
            ]
          },
          /* config.module.rule('scss').rule('normal-modules') */
          {
            test: /\.module\.\w+$/,
            use: [
              {
                loader: 'E:\\SVN\\前端源码\\业务系统\\node_modules\\mini-css-extract-plugin\\dist\\loader.js',
                options: {
                  hmr: true,
                  publicPath: '../../'
                }
              },
              {
                loader: 'E:\\SVN\\前端源码\\业务系统\\node_modules\\css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2,
                  modules: {
                    localIdentName: '[name]_[local]_[hash:base64:5]'
                  }
                }
              },
              {
                loader: 'E:\\SVN\\前端源码\\业务系统\\node_modules\\@vue\\cli-service\\node_modules\\postcss-loader\\src\\index.js',
                options: {
                  sourceMap: false
                }
              },
              {
                loader: 'E:\\SVN\\前端源码\\业务系统\\node_modules\\sass-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false
                }
              }
            ]
          },
          /* config.module.rule('scss').rule('normal') */
          {
            use: [
              {
                loader: 'E:\\SVN\\前端源码\\业务系统\\node_modules\\mini-css-extract-plugin\\dist\\loader.js',
                options: {
                  hmr: true,
                  publicPath: '../../'
                }
              },
              {
                loader: 'E:\\SVN\\前端源码\\业务系统\\node_modules\\css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              {
                loader: 'E:\\SVN\\前端源码\\业务系统\\node_modules\\@vue\\cli-service\\node_modules\\postcss-loader\\src\\index.js',
                options: {
                  sourceMap: false
                }
              },
              {
                loader: 'E:\\SVN\\前端源码\\业务系统\\node_modules\\sass-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false
                }
              }
            ]
          }
        ]
      },
      /* config.module.rule('sass') */
      {
        test: /\.sass$/,
        oneOf: [
          /* config.module.rule('sass').rule('vue-modules') */
          {
            resourceQuery: /module/,
            use: [
              {
                loader: 'E:\\SVN\\前端源码\\业务系统\\node_modules\\mini-css-extract-plugin\\dist\\loader.js',
                options: {
                  hmr: true,
                  publicPath: '../../'
                }
              },
              {
                loader: 'E:\\SVN\\前端源码\\业务系统\\node_modules\\css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2,
                  modules: {
                    localIdentName: '[name]_[local]_[hash:base64:5]'
                  }
                }
              },
              {
                loader: 'E:\\SVN\\前端源码\\业务系统\\node_modules\\@vue\\cli-service\\node_modules\\postcss-loader\\src\\index.js',
                options: {
                  sourceMap: false
                }
              },
              {
                loader: 'E:\\SVN\\前端源码\\业务系统\\node_modules\\sass-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  sassOptions: {
                    indentedSyntax: true
                  }
                }
              }
            ]
          },
          /* config.module.rule('sass').rule('vue') */
          {
            resourceQuery: /\?vue/,
            use: [
              {
                loader: 'E:\\SVN\\前端源码\\业务系统\\node_modules\\mini-css-extract-plugin\\dist\\loader.js',
                options: {
                  hmr: true,
                  publicPath: '../../'
                }
              },
              {
                loader: 'E:\\SVN\\前端源码\\业务系统\\node_modules\\css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              {
                loader: 'E:\\SVN\\前端源码\\业务系统\\node_modules\\@vue\\cli-service\\node_modules\\postcss-loader\\src\\index.js',
                options: {
                  sourceMap: false
                }
              },
              {
                loader: 'E:\\SVN\\前端源码\\业务系统\\node_modules\\sass-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  sassOptions: {
                    indentedSyntax: true
                  }
                }
              }
            ]
          },
          /* config.module.rule('sass').rule('normal-modules') */
          {
            test: /\.module\.\w+$/,
            use: [
              {
                loader: 'E:\\SVN\\前端源码\\业务系统\\node_modules\\mini-css-extract-plugin\\dist\\loader.js',
                options: {
                  hmr: true,
                  publicPath: '../../'
                }
              },
              {
                loader: 'E:\\SVN\\前端源码\\业务系统\\node_modules\\css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2,
                  modules: {
                    localIdentName: '[name]_[local]_[hash:base64:5]'
                  }
                }
              },
              {
                loader: 'E:\\SVN\\前端源码\\业务系统\\node_modules\\@vue\\cli-service\\node_modules\\postcss-loader\\src\\index.js',
                options: {
                  sourceMap: false
                }
              },
              {
                loader: 'E:\\SVN\\前端源码\\业务系统\\node_modules\\sass-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  sassOptions: {
                    indentedSyntax: true
                  }
                }
              }
            ]
          },
          /* config.module.rule('sass').rule('normal') */
          {
            use: [
              {
                loader: 'E:\\SVN\\前端源码\\业务系统\\node_modules\\mini-css-extract-plugin\\dist\\loader.js',
                options: {
                  hmr: true,
                  publicPath: '../../'
                }
              },
              {
                loader: 'E:\\SVN\\前端源码\\业务系统\\node_modules\\css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              {
                loader: 'E:\\SVN\\前端源码\\业务系统\\node_modules\\@vue\\cli-service\\node_modules\\postcss-loader\\src\\index.js',
                options: {
                  sourceMap: false
                }
              },
              {
                loader: 'E:\\SVN\\前端源码\\业务系统\\node_modules\\sass-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  sassOptions: {
                    indentedSyntax: true
                  }
                }
              }
            ]
          }
        ]
      },
      /* config.module.rule('less') */
      {
        test: /\.less$/,
        oneOf: [
          /* config.module.rule('less').rule('vue-modules') */
          {
            resourceQuery: /module/,
            use: [
              {
                loader: 'E:\\SVN\\前端源码\\业务系统\\node_modules\\mini-css-extract-plugin\\dist\\loader.js',
                options: {
                  hmr: true,
                  publicPath: '../../'
                }
              },
              {
                loader: 'E:\\SVN\\前端源码\\业务系统\\node_modules\\css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2,
                  modules: {
                    localIdentName: '[name]_[local]_[hash:base64:5]'
                  }
                }
              },
              {
                loader: 'E:\\SVN\\前端源码\\业务系统\\node_modules\\@vue\\cli-service\\node_modules\\postcss-loader\\src\\index.js',
                options: {
                  sourceMap: false
                }
              },
              {
                loader: 'less-loader',
                options: {
                  sourceMap: false
                }
              }
            ]
          },
          /* config.module.rule('less').rule('vue') */
          {
            resourceQuery: /\?vue/,
            use: [
              {
                loader: 'E:\\SVN\\前端源码\\业务系统\\node_modules\\mini-css-extract-plugin\\dist\\loader.js',
                options: {
                  hmr: true,
                  publicPath: '../../'
                }
              },
              {
                loader: 'E:\\SVN\\前端源码\\业务系统\\node_modules\\css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              {
                loader: 'E:\\SVN\\前端源码\\业务系统\\node_modules\\@vue\\cli-service\\node_modules\\postcss-loader\\src\\index.js',
                options: {
                  sourceMap: false
                }
              },
              {
                loader: 'less-loader',
                options: {
                  sourceMap: false
                }
              }
            ]
          },
          /* config.module.rule('less').rule('normal-modules') */
          {
            test: /\.module\.\w+$/,
            use: [
              {
                loader: 'E:\\SVN\\前端源码\\业务系统\\node_modules\\mini-css-extract-plugin\\dist\\loader.js',
                options: {
                  hmr: true,
                  publicPath: '../../'
                }
              },
              {
                loader: 'E:\\SVN\\前端源码\\业务系统\\node_modules\\css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2,
                  modules: {
                    localIdentName: '[name]_[local]_[hash:base64:5]'
                  }
                }
              },
              {
                loader: 'E:\\SVN\\前端源码\\业务系统\\node_modules\\@vue\\cli-service\\node_modules\\postcss-loader\\src\\index.js',
                options: {
                  sourceMap: false
                }
              },
              {
                loader: 'less-loader',
                options: {
                  sourceMap: false
                }
              }
            ]
          },
          /* config.module.rule('less').rule('normal') */
          {
            use: [
              {
                loader: 'E:\\SVN\\前端源码\\业务系统\\node_modules\\mini-css-extract-plugin\\dist\\loader.js',
                options: {
                  hmr: true,
                  publicPath: '../../'
                }
              },
              {
                loader: 'E:\\SVN\\前端源码\\业务系统\\node_modules\\css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              {
                loader: 'E:\\SVN\\前端源码\\业务系统\\node_modules\\@vue\\cli-service\\node_modules\\postcss-loader\\src\\index.js',
                options: {
                  sourceMap: false
                }
              },
              {
                loader: 'less-loader',
                options: {
                  sourceMap: false
                }
              }
            ]
          }
        ]
      },
      /* config.module.rule('stylus') */
      {
        test: /\.styl(us)?$/,
        oneOf: [
          /* config.module.rule('stylus').rule('vue-modules') */
          {
            resourceQuery: /module/,
            use: [
              {
                loader: 'E:\\SVN\\前端源码\\业务系统\\node_modules\\mini-css-extract-plugin\\dist\\loader.js',
                options: {
                  hmr: true,
                  publicPath: '../../'
                }
              },
              {
                loader: 'E:\\SVN\\前端源码\\业务系统\\node_modules\\css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2,
                  modules: {
                    localIdentName: '[name]_[local]_[hash:base64:5]'
                  }
                }
              },
              {
                loader: 'E:\\SVN\\前端源码\\业务系统\\node_modules\\@vue\\cli-service\\node_modules\\postcss-loader\\src\\index.js',
                options: {
                  sourceMap: false
                }
              },
              {
                loader: 'stylus-loader',
                options: {
                  sourceMap: false,
                  preferPathResolver: 'webpack'
                }
              }
            ]
          },
          /* config.module.rule('stylus').rule('vue') */
          {
            resourceQuery: /\?vue/,
            use: [
              {
                loader: 'E:\\SVN\\前端源码\\业务系统\\node_modules\\mini-css-extract-plugin\\dist\\loader.js',
                options: {
                  hmr: true,
                  publicPath: '../../'
                }
              },
              {
                loader: 'E:\\SVN\\前端源码\\业务系统\\node_modules\\css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              {
                loader: 'E:\\SVN\\前端源码\\业务系统\\node_modules\\@vue\\cli-service\\node_modules\\postcss-loader\\src\\index.js',
                options: {
                  sourceMap: false
                }
              },
              {
                loader: 'stylus-loader',
                options: {
                  sourceMap: false,
                  preferPathResolver: 'webpack'
                }
              }
            ]
          },
          /* config.module.rule('stylus').rule('normal-modules') */
          {
            test: /\.module\.\w+$/,
            use: [
              {
                loader: 'E:\\SVN\\前端源码\\业务系统\\node_modules\\mini-css-extract-plugin\\dist\\loader.js',
                options: {
                  hmr: true,
                  publicPath: '../../'
                }
              },
              {
                loader: 'E:\\SVN\\前端源码\\业务系统\\node_modules\\css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2,
                  modules: {
                    localIdentName: '[name]_[local]_[hash:base64:5]'
                  }
                }
              },
              {
                loader: 'E:\\SVN\\前端源码\\业务系统\\node_modules\\@vue\\cli-service\\node_modules\\postcss-loader\\src\\index.js',
                options: {
                  sourceMap: false
                }
              },
              {
                loader: 'stylus-loader',
                options: {
                  sourceMap: false,
                  preferPathResolver: 'webpack'
                }
              }
            ]
          },
          /* config.module.rule('stylus').rule('normal') */
          {
            use: [
              {
                loader: 'E:\\SVN\\前端源码\\业务系统\\node_modules\\mini-css-extract-plugin\\dist\\loader.js',
                options: {
                  hmr: true,
                  publicPath: '../../'
                }
              },
              {
                loader: 'E:\\SVN\\前端源码\\业务系统\\node_modules\\css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              {
                loader: 'E:\\SVN\\前端源码\\业务系统\\node_modules\\@vue\\cli-service\\node_modules\\postcss-loader\\src\\index.js',
                options: {
                  sourceMap: false
                }
              },
              {
                loader: 'stylus-loader',
                options: {
                  sourceMap: false,
                  preferPathResolver: 'webpack'
                }
              }
            ]
          }
        ]
      },
      /* config.module.rule('js') */
      {
        test: /\.m?jsx?$/,
        exclude: [
          function () { /* omitted long function */ }
        ],
        use: [
          {
            loader: 'E:\\SVN\\前端源码\\业务系统\\node_modules\\cache-loader\\dist\\cjs.js',
            options: {
              cacheDirectory: 'E:\\SVN\\前端源码\\业务系统\\node_modules\\.cache\\babel-loader',
              cacheIdentifier: '22369714'
            }
          },
          {
            loader: 'E:\\SVN\\前端源码\\业务系统\\node_modules\\babel-loader\\lib\\index.js'
          }
        ]
      },
      /* config.module.rule('icons') */
      {
        test: /\.svg$/,
        include: [
          'E:\\SVN\\前端源码\\业务系统\\src\\icons'
        ],
        use: [
          {
            loader: 'svg-sprite-loader',
            options: {
              symbolId: 'icon-[name]'
            }
          }
        ]
      }
    ]
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          name: 'chunk-vendors',
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          chunks: 'initial'
        },
        common: {
          name: 'chunk-common',
          minChunks: 2,
          priority: -20,
          chunks: 'initial',
          reuseExistingChunk: true
        }
      }
    },
    minimizer: [
      {
        options: {
          test: /\.m?js(\?.*)?$/i,
          chunkFilter: () => true,
          warningsFilter: () => true,
          extractComments: false,
          sourceMap: false,
          cache: true,
          cacheKeys: defaultCacheKeys => defaultCacheKeys,
          parallel: true,
          include: undefined,
          exclude: undefined,
          minify: undefined,
          terserOptions: {
            compress: {
              arrows: false,
              collapse_vars: false,
              comparisons: false,
              computed_props: false,
              hoist_funs: false,
              hoist_props: false,
              hoist_vars: false,
              inline: false,
              loops: false,
              negate_iife: false,
              properties: false,
              reduce_funcs: false,
              reduce_vars: false,
              switches: false,
              toplevel: false,
              typeofs: false,
              booleans: true,
              if_return: true,
              sequences: true,
              unused: true,
              conditionals: true,
              dead_code: true,
              evaluate: true
            },
            mangle: {
              safari10: true
            }
          }
        }
      }
    ]
  },
  plugins: [
    /* config.plugin('vue-loader') */
    new VueLoaderPlugin(),
    /* config.plugin('define') */
    new DefinePlugin(
      {
        'process.env': {
          NODE_ENV: '"development"',
          VUE_APP_BASE_API: '"http://mes.ironmanapi.com:6255/api"',
          BASE_URL: '"/"'
        }
      }
    ),
    /* config.plugin('case-sensitive-paths') */
    new CaseSensitivePathsPlugin(),
    /* config.plugin('friendly-errors') */
    new FriendlyErrorsWebpackPlugin(
      {
        additionalTransformers: [
          function () { /* omitted long function */ }
        ],
        additionalFormatters: [
          function () { /* omitted long function */ }
        ]
      }
    ),
    /* config.plugin('extract-css') */
    new MiniCssExtractPlugin(
      {
        filename: 'static/css/[name].[contenthash:8].css',
        chunkFilename: 'static/css/[name].[contenthash:8].css'
      }
    ),
    /* config.plugin('html') */
    new HtmlWebpackPlugin(
      {
        title: 'ironman',
        templateParameters: function () { /* omitted long function */ },
        template: 'E:\\SVN\\前端源码\\业务系统\\public\\index.html'
      }
    ),
    /* config.plugin('preload') */
    new PreloadPlugin(
      {
        rel: 'preload',
        fileBlacklist: [
          /\.map$/,
          /hot-update\.js$/,
          /runtime\..*\.js$/
        ],
        include: 'initial'
      }
    ),
    /* config.plugin('copy') */
    new CopyPlugin(
      [
        {
          from: 'E:\\SVN\\前端源码\\业务系统\\public',
          to: 'E:\\SVN\\前端源码\\业务系统\\dist',
          toType: 'dir',
          ignore: [
            '.DS_Store',
            {
              glob: 'index.html',
              matchBase: false
            }
          ]
        }
      ]
    ),
    {
      pluginDescriptor: {
        name: 'OptimizeCssAssetsWebpackPlugin'
      },
      options: {
        assetProcessors: [
          {
            phase: 'compilation.optimize-chunk-assets',
            regExp: /\.css(\?.*)?$/i,
            processor: (assetName, asset, assets) =>
            this.processCss(assetName, asset, assets)
          }
        ],
        canPrint: undefined,
        assetNameRegExp: /\.css(\?.*)?$/i,
        cssProcessor: {
          version: '8.3.0',
          plugins: [
            {
              postcssPlugin: 'postcss-discard-comments',
              OnceExit: function () { /* omitted long function */ }
            },
            {
              postcssPlugin: 'postcss-minify-gradients',
              OnceExit(css) {
                css.walkDecls(optimise);
              }
            },
            {
              postcssPlugin: 'postcss-reduce-initial',
              prepare: function () { /* omitted long function */ }
            },
            {
              postcssPlugin: 'postcss-svgo',
              OnceExit: function () { /* omitted long function */ }
            },
            {
              postcssPlugin: 'postcss-normalize-display-values',
              prepare: function () { /* omitted long function */ }
            },
            {
              postcssPlugin: 'postcss-reduce-transforms',
              prepare: function () { /* omitted long function */ }
            },
            {
              postcssPlugin: 'postcss-colormin',
              prepare: function () { /* omitted long function */ }
            },
            {
              postcssPlugin: 'postcss-normalize-timing-functions',
              OnceExit: function () { /* omitted long function */ }
            },
            {
              postcssPlugin: 'postcss-calc',
              OnceExit: function () { /* omitted long function */ }
            },
            {
              postcssPlugin: 'postcss-convert-values',
              OnceExit(css) {
                css.walkDecls(transform.bind(null, opts));
              }
            },
            {
              postcssPlugin: 'postcss-ordered-values',
              prepare: function () { /* omitted long function */ }
            },
            {
              postcssPlugin: 'postcss-minify-selectors',
              OnceExit: function () { /* omitted long function */ }
            },
            {
              postcssPlugin: 'postcss-minify-params',
              OnceExit(css) {
                css.walkAtRules(transform.bind(null, browsers.some(hasAllBug)));
              }
            },
            {
              postcssPlugin: 'postcss-normalize-charset',
              OnceExit: function () { /* omitted long function */ }
            },
            {
              postcssPlugin: 'postcss-discard-overridden',
              prepare: function () { /* omitted long function */ }
            },
            {
              postcssPlugin: 'postcss-normalize-string',
              OnceExit: function () { /* omitted long function */ }
            },
            {
              postcssPlugin: 'postcss-normalize-unicode',
              prepare: function () { /* omitted long function */ }
            },
            {
              postcssPlugin: 'postcss-minify-font-values',
              prepare: function () { /* omitted long function */ }
            },
            {
              postcssPlugin: 'postcss-normalize-url',
              OnceExit: function () { /* omitted long function */ }
            },
            {
              postcssPlugin: 'postcss-normalize-repeat-style',
              prepare: function () { /* omitted long function */ }
            },
            {
              postcssPlugin: 'postcss-normalize-positions',
              OnceExit: function () { /* omitted long function */ }
            },
            {
              postcssPlugin: 'postcss-normalize-whitespace',
              OnceExit: function () { /* omitted long function */ }
            },
            {
              postcssPlugin: 'postcss-merge-longhand',
              OnceExit: function () { /* omitted long function */ }
            },
            {
              postcssPlugin: 'postcss-discard-duplicates',
              OnceExit(css) {
                dedupe(css);
              }
            },
            {
              postcssPlugin: 'postcss-merge-rules',
              prepare: function () { /* omitted long function */ }
            },
            {
              postcssPlugin: 'postcss-discard-empty',
              OnceExit(css, {
                result
              }) {
                discardAndReport(css, result);
              }
            },
            {
              postcssPlugin: 'postcss-unique-selectors',
              OnceExit: function () { /* omitted long function */ }
            },
            {
              postcssPlugin: 'css-declaration-sorter',
              OnceExit: function () { /* omitted long function */ }
            },
            {
              postcssPlugin: 'cssnano-util-raw-cache',
              OnceExit: function () { /* omitted long function */ }
            }
          ]
        },
        cssProcessorOptions: {},
        cssProcessorPluginOptions: {}
      },
      phaseAssetProcessors: {
        'compilation.optimize-chunk-assets': [
          {
            phase: 'compilation.optimize-chunk-assets',
            regExp: /\.css(\?.*)?$/i,
            processor: (assetName, asset, assets) =>
            this.processCss(assetName, asset, assets)
          }
        ],
        'compilation.optimize-assets': [],
        emit: []
      },
      deleteAssetsMap: {}
    }
  ],
  entry: {
    app: [
      './src/main.js'
    ]
  },
  name: '诺彩智造'
}
