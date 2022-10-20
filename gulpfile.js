import gulp from "gulp";
import { path } from "./gulp/config/path.js";
import { copy } from "./gulp/config/tasks/copy.js";
import { reset } from "./gulp/config/tasks/reset.js";
import { html } from "./gulp/config/tasks/html.js";
import { plugins } from "./gulp/config/plugins.js";
import { server } from "./gulp/config//tasks/server.js";
import { scss } from "./gulp/config//tasks/scss.js";
import { js } from "./gulp/config//tasks/js.js";
import { images } from "./gulp/config//tasks/images.js";
import { otfToTtf, ttfToWoff, fontsStyle } from "./gulp/config/tasks/fonts.js";
import { svgSprive } from "./gulp/config/tasks/svgSprive.js";
import { zip } from "./gulp/config/tasks/zip.js";
import { ftp } from "./gulp/config/tasks/ftp.js";

global.app = {
  isBuild: process.argv.includes("--build"),
  isDev: !process.argv.includes("--build"),
  path: path,
  gulp: gulp,
  plugins: plugins,
};

function watcher() {
  gulp.watch(path.watch.files, copy);
  gulp.watch(path.watch.html, html);
  gulp.watch(path.watch.scss, scss);
  gulp.watch(path.watch.js, js);
  gulp.watch(path.watch.images, images);
}

export { svgSprive };

const fonts = gulp.series(otfToTtf, ttfToWoff, fontsStyle);
const mainTasks = gulp.series(
  fonts,
  gulp.parallel(copy, html, scss, js, images)
);
const dev = gulp.series(reset, mainTasks, gulp.parallel(watcher, server));
const build = gulp.series(reset, mainTasks);
const deployZIP = gulp.series(reset, mainTasks, zip);
const deployFTP = gulp.series(reset, mainTasks, ftp);

export { dev };
export { build };
export { deployZIP };
export { deployFTP };

gulp.task("default", dev);
