const { query } = await Service.import('applications')
const NAME = 'launcher'

const Item = app => Widget.Button({
    class_name: 'app',
    on_clicked: () => {
        App.closeWindow(NAME),
        app.launch()
    },
    attribute: { app },
    child: Widget.Box({
        children: [
            Widget.Icon({
                icon: app.icon_name || '',
                size: 42
            }),
            Widget.Label({
                label: app.name,
                xalign: 0,
                vpack: 'center',
                truncate: 'end'
            })
        ]
    })
})

const Launcher = ({ width, height, spacing }) => {
    let apps = query('').map(Item)

    const entry = Widget.Entry({
        hexpand: true,
        css: `margin-bottom: ${spacing}px;`,

        on_change: ({ text }) => apps.forEach(item => {
            item.visible = item.attribute.app.match(text ?? '')
        }),

        on_accept: () => {
            const results = apps.filter((item) => item.visible)
            if (results[0]) {
                App.closeWindow(NAME)
                results[0].attribute.app.launch()
            }
        }
    })

    const list = Widget.Box({
        vertical: true,
        children: apps,
        spacing
    })

    function repopulate() {
        apps = query('').map(Item)
        list.children = apps
    }

    return Widget.Box({
        vertical: true,
        css: `margin: ${spacing * 2}px;`,
        children: [
            entry,
            Widget.Scrollable({
                hscroll: 'never',
                css: `min-width: ${width}px;` + `min-height: ${height}px;`,
                child: list
            })
        ],
        setup: self => self.hook(App, (_, name, visible) => {
            if (name !== NAME) return
            if (visible) {
                repopulate()
                entry.text = ''
                entry.grab_focus()
            }
        })
    })
}

export const launcher = Widget.Window({
    name: NAME,
    visible: false,
    css: 'border-radius: 12px;',
    keymode: 'exclusive',
    setup: self => self.keybind('Escape', () => {
        App.closeWindow(NAME)
    }),
    child: Launcher({
        width: 500,
        height: 500,
        spacing: 12
    })
})
