import dartSass from "sass";
import gulpSass from "gulp-sass";
import rename from "gulp-rename";

import cleanCss from "gulp-clean-css"; //стиснення файлів
import webpcss from "gulp-webpcss"; //Вивід webp зображень
import autoPrefixer from "gulp-autoprefixer"; //добавлення вендорних префіксів
import groupCssMediaQueries from "gulp-group-css-media-queries";//групування медіа-запитів

const sass = gulpSass(dartSass);

export const scss = () => {
    return app.gulp.src(app.path.src.scss, { sourcemaps: app.isDev })
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "SCSS",
                message: "Error: <%= error.message %>"
            }))
        )
        .pipe(app.plugins.replace(/@img\//g, 'img/'))
        .pipe(sass({
            outputStyle: 'expanded'
        }))
        .pipe(app.plugins.if(
            app.isBuild,
            groupCssMediaQueries()
        ))
        .pipe(app.plugins.if(
            app.isBuild,
            webpcss({
                webpCLass: ".webp",
                noWebpClass: ".no-webp"
            })
        ))
        .pipe(app.plugins.if(
            app.isBuild,
            autoPrefixer({
                grid: true,
                overrideBrowserList: ["last 3 versions"],
                cascade: true
            })
        ))
        .pipe(app.gulp.dest(app.path.build.css))
        .pipe(app.plugins.if(
            app.isBuild,
            cleanCss()
        ))
        .pipe(cleanCss())
        .pipe(rename({
            extname: ".min.css"
        }))
        .pipe(app.gulp.dest(app.path.build.css))
        .pipe(app.plugins.browsersync.stream());
}