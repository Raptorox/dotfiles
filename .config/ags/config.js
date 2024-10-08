import { bar } from './bar.js'
import { launcher } from './launcher.js'

const scss = `${App.configDir}/style.scss`
const css = '/tmp/ags-style.css'

Utils.exec(`sass ${scss} ${css}`)
Utils.monitorFile(
    `${App.configDir}`,
    function() {
        Utils.exec(`sass ${scss} ${css}`)
        App.resetCss()
        App.applyCss(css)
    }
)

App.config({
    style: `/tmp/ags-style.css`,
    windows: [
        bar,
        launcher
    ]
})
