module.exports = function(grunt) {

  //Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    mocha: {
      all: {
        src: ["test/unit/index.html"]
      },
      options: {
        run: true
      }
    },
    connect: {
      server: {
        options: {
          port: 8080,
          protocol: "http",
          hostname: "127.0.0.1",
          base: ".",
          livereload: true
        }
      }
    },
    requirejs: {
      compile: {
        options: {
          baseUrl: ".",
          mainConfigFile: "src/require.config.js",
          include: ["src/require.config"],
          optimize: "none",
          out: "build/phoenix.js",
        }
      }
    },
    uglify: {
      options: {
        banner: "/*! <%= pkg.name %> - v<%= pkg.version %> - " +
        "<%= grunt.template.today('yyyy-mm-dd') %> */"
      },
      js: {
        files: {
          "build/phoenix.min.js": ["build/phoenix.js"]
        }
      }
    },
    jshint: {
      foo: {
        src: "src/**/*.js"
      },
      options: {
        jshintrc: ".jshintrc"
      }
    },
    watch: {
      js: {
        files: ["src/**/*.js"],
        tasks: []
      }
    },
    copy: {
      css: {
        files: [
          { src: "src/components/styles/pheonix.css", dest: "src/styles/phoenix.css" }
        ]
      }
    },
    cssmin: {
      dist: {
        files: {
          "src/styles/phoenix.min.css" : ["build/phoenix.css"]
        }
      }
    }
  });

  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-contrib-concat");
  grunt.loadNpmTasks("grunt-contrib-jshint");
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks("grunt-contrib-cssmin");
  grunt.loadNpmTasks("grunt-contrib-requirejs");
  grunt.loadNpmTasks("grunt-contrib-connect");
  grunt.loadNpmTasks("grunt-mocha");

  grunt.registerTask("default", ["copy", "connect", "concat", "watch"]);
  grunt.registerTask("lint", ["jshint"]);
  grunt.registerTask("test", ["mocha"]);
  grunt.registerTask("build", ["requirejs", "copy"]);
};