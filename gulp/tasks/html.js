import fileInclude from "gulp-file-include";
import webpHtmlNosvg from "gulp-webp-html-nosvg";
import versionNumber from "gulp-version-number";
import { isModuleNamespaceObject } from "util/types";
import pug from "gulp-pug";

export const html = () => {
    return app.gulp.src(app.path.src.pug)
    .pipe(app.plugins.plumber(
        app.plugins.notify.onError({
            title: "HTML",
            message: "Error: <%= error.message %>"
        }))
    )
    .pipe(fileInclude())
    .pipe(pug({
        pretty: true,//стиснення html файлу
        verbose: true // показувати який файл оброблений в терміналі
    }))
    .pipe(app.plugins.replace(/@img\//g, 'img/'))
    .pipe(app.plugins.if(
        app.isBuild,
        webpHtmlNosvg()
    ))
    .pipe(app.plugins.if(
        app.isBuild,
        versionNumber({
            'value': '%DT%',
            'append': {
                'key': '_v',
                'cover': 0,
                'to': [
                    'css',
                    'js'
                ]
            },
            'output': {
                'file': 'gulp/version.json'
            }
        })
    ))
    .pipe(app.gulp.dest(app.path.build.html))
    .pipe(app.plugins.browsersync.stream())
}