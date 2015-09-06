// Generated on 2015-06-04 using
// generator-webapp 0.5.1
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// If you want to recursively match all subfolders, use:
// 'test/spec/**/*.js'

module.exports = function (grunt) {

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Configurable paths
  var config = {
    app: 'app',
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
      app:          {
        files: {
          'build/scripts/main.js': 'app/scripts/main.js',
          'build/scripts/detail.js': 'app/scripts/detail.js',
          'viewer/scripts/viewer.js': 'app/scripts/viewer.js',
          'viewer/scripts/osdregionselect.js': 'app/scripts/osdregionselect.js'
        }
      }
    },

    replace: {
      viewerjs: {
        src: 'viewer/scripts/viewer.js',
        overwrite: true,
        replacements: [{
          from: /\/images\//g,
          to: "/static/img/"
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
        tasks: ['sass', 'copy:build', 'copy:viewer']
      },
      styles: {
        files: ['<%= config.app %>/styles/{,*/}*.css'],
        tasks: ['newer:copy:styles', 'autoprefixer']
      },
      react: {
        files: ['<%= config.app %>/scripts/{,*/}*.jsx','<%= config.app %>/scripts/*.js'],
        tasks: ['browserify:app']
      },
      wordpress: {
        files: ['wordpress/**/*'],
        tasks: ['build']
      },
      images: {
        files: ['app/images/*'],
        tasks: ['copy:images']
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

    // Make sure code styles are up to par and there are no obvious mistakes
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: [
        'Gruntfile.js',
        '<%= config.app %>/scripts/{,*/}*.js',
        '!<%= config.app %>/scripts/vendor/*',
        'test/spec/{,*/}*.js'
      ]
    },

    // Mocha testing framework configuration options
    mocha: {
      all: {
        options: {
          run: true,
          urls: ['http://<%= connect.test.options.hostname %>:<%= connect.test.options.port %>/index.html']
        }
      }
    },

    // Compiles Sass to CSS and generates necessary files if requested
    sass: {
      options: {
        loadPath: 'bower_components'
      },
      dist: {
        files: [{
          expand: true,
          cwd: '<%= config.app %>/styles',
          src: ['*.{scss,sass}'],
          dest: '.tmp/styles',
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

    // Renames files for browser caching purposes
    rev: {
      dist: {
        files: {
          src: [
            '<%= config.dist %>/scripts/{,*/}*.js',
            '<%= config.dist %>/styles/{,*/}*.css',
            '<%= config.dist %>/images/{,*/}*.*',
            '<%= config.dist %>/styles/fonts/{,*/}*.*',
            '<%= config.dist %>/*.{ico,png}'
          ]
        }
      }
    },

    // Reads HTML for usemin blocks to enable smart builds that automatically
    // concat, minify and revision files. Creates configurations in memory so
    // additional tasks can operate on them
    useminPrepare: {
      options: {
        dest: '<%= config.dist %>'
      },
      html: '<%= config.app %>/index.html'
    },

    // Performs rewrites based on rev and the useminPrepare configuration
    usemin: {
      options: {
        assetsDirs: [
          '<%= config.dist %>',
          '<%= config.dist %>/images',
          '<%= config.dist %>/styles'
        ]
      },
      html: ['<%= config.dist %>/{,*/}*.html'],
      css: ['<%= config.dist %>/styles/{,*/}*.css']
    },

    // Copies remaining files to places other tasks can use
    copy: {
      wordpress: {
         expand: true,
         dot: true,
         cwd: 'wordpress',
         src: '**',
         dest: 'build/'
      },
      build: {
        files: [{
          expand: true,
          cwd: '.tmp/styles',
          src: '**',
          dest: 'build/styles'
        }, {
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
          cwd: '.tmp/styles',
          src: 'viewer.css*',
          dest: 'viewer/styles'
        }, {
          expand: true,
          cwd: 'app',
          src: [
            'images/cc.png',
            'images/close.png',
            'images/embed.png',
            'images/metadata.png',
            'images/pd.png',
            'images/zoom-in.png',
            'images/zoom-out.png'
          ],
          dest: 'viewer'
        }, {
          expand: true,
          cwd: 'app',
          src: 'styles/fonts/**',
          dest: 'viewer'
        }]
      },
      viewerjs: {
        src: 'build/scripts/vendor.js',
        dest: 'viewer/scripts/vendor.js'
      }
    },

    // Run some tasks in parallel to speed up build process
    concurrent: {
      server: [
        'sass:server',
        'coffee:dist',
        'react:dist'
      ],
      test: [
        'coffee'
      ],
      dist: [
        'sass'
      ]
    },

    //Manually concat bower js
    concat: {
      options: {
        separator: ';\n',
      },
      bower: {
        files: [{
          src: [
            'bower_components/jquery/dist/jquery.js',
            'bower_components/react/react.js',
            // 'bower_components/zeroclipboard/dist/ZeroClipboard.min.js'
          ],
          dest: 'build/scripts/vendor.js'
        // },{
        //   src: 'bower_components/zeroclipboard/dist/ZeroClipboard.swf',
        //   dest: 'build/scripts/ZeroClipboard.swf'
        }]
      }
    },

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
      }
    }
  });


  grunt.registerTask('serve', 'start the server and preview your app, --allow-remote for remote access', function (target) {
    if (grunt.option('allow-remote')) {
      grunt.config.set('connect.options.hostname', '0.0.0.0');
    }
    if (target === 'dist') {
      return grunt.task.run(['build', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      'clean:server',
      'wiredep',
      'concurrent:server',
      'autoprefixer',
      'connect:livereload',
      'watch'
    ]);
  });

  grunt.registerTask('server', function (target) {
    grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
    grunt.task.run([target ? ('serve:' + target) : 'serve']);
  });

  grunt.registerTask('test', function (target) {
    if (target !== 'watch') {
      grunt.task.run([
        'clean:server',
        'concurrent:test',
        'autoprefixer'
      ]);
    }

    grunt.task.run([
      'connect:test',
      'mocha'
    ]);
  });

  grunt.registerTask('build', [
    'clean:build',
    'copy:wordpress',
    'sass',
    'concat:bower',
    'browserify:app',
    'copy:build'
  ]);

  grunt.registerTask('buildAssets', [
    // 'clean:dist',
    // 'clean:build',
    // 'wiredep',
    // 'useminPrepare',
    'concurrent:dist',
    // 'autoprefixer',
    // 'cssmin',
    // 'uglify',
    // 'copy:wordpress',
    'browserify:app',
    'copy:build',
    // 'rev',
    // 'usemin',
    // 'htmlmin'
  ]);

  grunt.registerTask('buildViewer', [
    'browserify:app',
    'sass',
    'concat:bower',
    'copy:viewerjs',
    'copy:viewer',
    'replace:viewerjs'
  ]);

  grunt.registerTask('default', [
    'newer:jshint',
    'test',
    'build'
  ]);
};
