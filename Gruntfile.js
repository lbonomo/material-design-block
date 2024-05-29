/**
 * Grunt file.
 */

module.exports = function (grunt) {
  const extensions = "{css,php,js,html,png,svg,txt}";

  grunt.initConfig({
    browserSync: {
      dev: {
        bsFiles: {
          src: [`theme/dst/**/*.${extensions}`],
        },
        options: {
          watchTask: true,
          open: false,
          proxy: "https://lucasbonomo.lndo.site/",
        },
      },
    },

    sync: {
      theme: {
        files: [
          {
            cwd: "src/",
            src: [`**/*.${extensions}`],
            dest: "dst/",
          },
        ],
      },
      verbose: true,
      updateAndDelete: true,
    },

    watch: {
      all: {
        files: [
          `theme/src/**/*.${extensions}`,
        ],
        tasks: ["sync:theme"],
      },
    },

    clean: {
      dst: {
        src: ["theme/dst/*"],
      },
    },
  });

  // Modules.
  grunt.loadNpmTasks("grunt-sync");
  grunt.loadNpmTasks("grunt-contrib-clean");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-browser-sync");

  // Tasks.
  grunt.registerTask("dst", ["clean:dst", "sync:theme"]);
  grunt.registerTask("dev", ["browserSync:dev", "watch:all"]);
};
