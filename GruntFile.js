module.exports = function(grunt) {

  //Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    mocha: {
      all: {
        src: ['test/unit/index.html']
      },
      options: {
        run: true
      }
    },
    connect: {
      server: {
        options: {
          port: 8080,
          protocol: 'http',
          hostname: '127.0.0.1',
          base: '.',
          livereload: true
        }
      }
    },
    requirejs: {
      compile: {
        options: {
          baseUrl: '.',
          name: 'node_modules/almond/almond',
          mainConfigFile: 'src/require.config.js',
          include: ['src/require.config', 'phx'],
          optimize: 'none',
          out: 'build/phx.js',
          wrap: {
            startFile: "src/start.js",
            endFile: "src/end.js"
          }
        }
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %> */'
      },
      js: {
        files: {
          'build/phx.min.js': ['build/phx.js']
        }
      }
    },
    jshint: {
      foo: {
        src: 'src/**/*.js'
      },
      options: {
        jshintrc: '.jshintrc'
      }
    },
    watch: {
      js: {
        files: ['src/**/*.js'],
        tasks: []
      }
    },
    copy: {
      css: {
        files: [
          { src: 'src/components/styles/phx.css', dest: 'src/styles/phx.css' }
        ]
      }
    },
    cssmin: {
      dist: {
        files: {
          'src/styles/phx.min.css' : ['build/phx.css']
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-mocha');

  grunt.registerTask('default', ['copy', 'connect', 'watch']);
  grunt.registerTask('lint', ['jshint']);
  grunt.registerTask('test', ['mocha']);
  grunt.registerTask('build', ['requirejs', 'copy']);
};