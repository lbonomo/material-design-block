/*
# Debug


# Dist
*.php    = Sincronizar
*.css    = en "dst"
*.js     = en "dst"
*.scss   = transcompilar style.scss > CSS en "dst"
imagenes = optimizar y copiar en "dst"

https://github.com/gruntjs/grunt-contrib-watch


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
          // server: { baseDir: "./" }
          watchTask: true,
          open: false,
          proxy: "https://uou.lndo.site/",
        },
      },
    },

    // uglify: {
    //   dist: {
    //     files: {
    //       "./theme/dst/assets/js/build.js": ["theme/src/assets/js/*.js"],
    //     },
    //   },
    // },

    sync: {
      // acf_json: {
      //   files: [
      //     {
      //       cwd: "theme/src/acf-json/",
      //       src: ["*.json"],
      //       dest: "theme/dst/acf-json/",
      //     },
      //   ],
      // },
      // json_import: {
      //   files: [
      //     {
      //       cwd: "theme/dst/acf-json/",
      //       src: ["*.json"],
      //       dest: "theme/src/acf-json/",
      //     },
      //   ],
      // },
      // plugins: {
      //   files: [
      //     {
      //       cwd: "plugins/honeycomb-blocks/src/",
      //       src: [`**/*`],
      //       dest: "plugins/honeycomb-blocks/dst/",
      //     },
      //   ],
      // },
      theme: {
        files: [
          {
            cwd: "src/",
            src: [`**/*.${extensions}`],
            dest: "dst/",
          },
        ],
      },
      verbose: true, // Display log messages when copying files
      // pretend: true, // Don't do any IO. Before you run the task with `updateAndDelete` PLEASE MAKE SURE it doesn't remove too much.
      updateAndDelete: true, // Remove all files from dest that are not found in src. Default: false
      // compareUsing: "md5" // compares via md5 hash of file contents, instead of file modification ti
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
