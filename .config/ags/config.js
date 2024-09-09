import { bar } from './bar.js'
import { launcher } from './launcher.js'

Utils.monitorFile(
    `${App.configDir}`,
    function() {
        const scss = `${App.configDir}/style.scss`
        const css = `${App.configDir}/style.css`
        Utils.exec(`sass ${scss} ${css}`)
        App.resetCss()
        App.applyCss(css)
    }
)

App.config({
    style: `${App.configDir}/style.css`,
    windows: [
        bar,
        launcher
    ]
})