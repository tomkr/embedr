// Generated on 2015-06-04 using
// generator-webapp 0.5.1
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// If you want to recursively match all subfolders, use:
// 'test/spec/**/*.js'

module.exports = function (grunt) {
  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Configurable paths
  var config = {
    app: 'src',
    dist: 'dist',
    build: 'build',
    wp: 'wp'
  };

  // Define the configuration for all the tasks
  grunt.initConfig({

    // Project settings
    config: config,

    browserify:     {
      options:      {
        transform:  [ require('grunt-react').browserify ]
      },
      app: {
        files: {
          'build/embedr/js/main.js': 'src/scripts/main.js',
          'build/embedr/js/detail.js': 'src/scripts/detail.js'
        }
      },
      viewer: {
        files: {
          'build/viewer/static/js/viewer.js': 'src/scripts/viewer.js'
        }
      }
    },

    mochify: {
      options: {
        reporter: 'spec'
      },
      myTarget: {
        src: [
          'test/**/*spec.jsx'
        ],
        options: {
          transform:  [ 'reactify' ]
        }
      }
    },

    replace: {
      viewer: {
        src: 'build/viewer/static/js/viewer.js',
        overwrite: true,
        replacements: [{
          from: /\/images\//g,
          to: "static/img/"
        }]
      }
    },

    // Watches files for changes and runs tasks based on the changed files
    watch: {
      bower: {
        files: ['bower.json'],
        tasks: ['concat:bower', 'copy:viewerjs']
      },
      sass: {
        files: ['<%= config.app %>/styles/{,*/}*.{scss,sass}'],
        tasks: ['sass', 'copy:app', 'copy:viewer']
      },
      styles: {
        files: ['<%= config.app %>/styles/{,*/}*.css'],
        tasks: ['newer:copy:styles', 'autoprefixer']
      },
      react: {
        files: ['<%= config.app %>/scripts/{,*/}*.jsx','<%= config.app %>/scripts/*.js'],
        tasks: ['browserify:app', 'browserify:viewer', 'replace:viewer']
      },
      wordpress: {
        files: ['wordpress/**/*'],
        tasks: ['build']
      },
      images: {
        files: ['app/images/*'],
        tasks: ['build']
      }
    },

    // Empties folders to start fresh
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= config.dist %>/*',
            '!<%= config.dist %>/.git*'
          ]
        }]
      },
      build: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            'build/*',
            '!build/.git*',
            '!build/wp-config.php'
          ]
        }]
      },
      server: '.tmp'
    },

    // Compiles Sass to CSS and generates necessary files if requested
    sass: {
      app: {
        files: [{
          expand: true,
          cwd: '<%= config.app %>/styles',
          src: ['detail.scss', 'main.scss'],
          dest: 'build/embedr/css',
          ext: '.css'
        }]
      },
      viewer: {
        files: [{
          expand: true,
          cwd: '<%= config.app %>/styles',
          src: 'viewer.scss',
          dest: 'build/viewer/static/css/',
          ext: '.css'
        }]
      },
      server: {
        files: [{
          expand: true,
          cwd: '<%= config.app %>/styles',
          src: ['*.{scss,sass}'],
          dest: '.tmp/styles',
          ext: '.css'
        }]
      }
    },

    // Copies remaining files to places other tasks can use
    copy: {
      wordpress: {
         expand: true,
         dot: true,
         cwd: 'wordpress-theme',
         src: '**',
         dest: 'build'
      },
      app: {
        files: [{
          expand: true,
          cwd: 'app',
          src: 'images/**',
          dest: 'build'
        }, {
          expand: true,
          cwd: 'app',
          src: 'styles/fonts/**',
          dest: 'build'
        }]
      },
      viewer: {
        files: [{
          expand: true,
          cwd: 'app/images',
          src: [
            'cc.png',
            'close.png',
            'close_dark.png',
            'embed.png',
            'metadata.png',
            'pd.png',
            'zoom-in.png',
            'zoom-out.png'
          ],
          dest: 'viewer/static/img'
        }, {
          expand: true,
          cwd: 'app/styles/fonts',
          src: '**',
          dest: 'viewer/static/css/fonts'
        },{
          dest: 'build/viewer/static/js/osdregionselect.js',
          src: 'src/scripts/osdregionselect.js'
        }]
      }
    },

    // Some deployment scripts
    rsync: {
      options: {
        args: ["--verbose"],
        exclude: ["wp-config.php"],
        recursive: true
      },
      dev: {
        options: {
          src: "build/",
          dest: "/web",
          host: "kennisland-dev"
        }
      },
      prod: {
        options: {
          src: "build/",
          dest: "/web",
          host: "kennisland"
        }
      },
      viewer: {
        options: {
          src: "build/viewer/",
          dest: "/web/viewer",
          host: "kennisland-dev"
        }
      }
    }
  });

  // Run all the build steps
  grunt.registerTask('build', [
    'buildWordpress',
    'buildApp',
    'buildViewer'
  ]);

  // Build the React app
  grunt.registerTask('buildApp', [
    'browserify:app',
    'sass:app',
    'copy:app'
  ]);

  // Build the viewer
  grunt.registerTask('buildViewer', [
    'browserify:viewer',
    'sass:viewer',
    'copy:viewer',
    'replace:viewer'
  ]);

  // Build wordpress
  grunt.registerTask('buildWordpress', [
    'copy:wordpress'
  ]);

  // Test then build
  grunt.registerTask('default', [
    'test',
    'build'
  ]);

  grunt.registerTask('test', 'mochify');
};
