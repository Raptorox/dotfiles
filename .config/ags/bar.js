const hyprland = await Service.import('hyprland')
import Variable from 'resource:///com/github/Aylur/ags/variable.js'

const dispatch = ws => hyprland.messageAsync(`dispatch workspace ${ws}`)

const workspaces = Widget.EventBox({
    on_scroll_up: () => dispatch('-1'),
    on_scroll_down: () => dispatch('+1'),
    class_name: 'workspaces',
    child: Widget.Box({
        children: Array.from({ length: 10 }, (_, i) => i + 1).map(i => Widget.Button({
            attribute: {
                id: i,
                urgent: false
            },
            label: `${i}`,
            class_name: 'ws-button',
            on_clicked: () => dispatch(i),
            setup: self => {
                self.hook(hyprland, () => {
                    if(hyprland.active.workspace.id === self.attribute.id) self.attribute.urgent = false
                    self.toggleClassName('focused', hyprland.active.workspace.id === self.attribute.id) 
                    self.toggleClassName('occupied', (hyprland.getWorkspace(self.attribute.id)?.windows || 0) > 0)
                    self.toggleClassName('urgent', self.attribute.urgent)
                })
                self.hook(hyprland, (_, address) => {
                    if (hyprland.getClient(address)?.workspace.id === self.attribute.id) {
                        self.attribute.urgent = true
                        self.toggleClassName('urgent', self.attribute.urgent)
                    }
                }, 'urgent-window')
            }
        }))
    })
})

const show_power = Variable(false)

const powermenu = Widget.EventBox({
    on_hover: () => show_power.value = true,
    on_hover_lost: () => show_power.value = false,
    child: Widget.Box({
        class_name: 'powermenu',
        children: [
            Widget.Revealer({
                reveal_child: show_power.bind(),
                transition: 'slide_left',
                child: Widget.Box({
                    children: [
                        Widget.Button({
                            label: '',
                            class_name: 'logout',
                            on_clicked: () => Utils.execAsync('echo wassup')
                        }),
                        Widget.Button({
                            label: '',
                            class_name: 'lock',
                            on_clicked: () => Utils.execAsync('echo wassup')
                        }),
                        Widget.Button({
                            label: '',
                            class_name: 'hibernate',
                            on_clicked: () => Utils.execAsync('echo wassup')
                        }),
                        Widget.Button({
                            label: '',
                            class_name: 'suspend',
                            on_clicked: () => Utils.execAsync('echo wassup')
                        }),
                        Widget.Button({
                            label: '',
                            class_name: 'reboot',
                            on_clicked: () => Utils.execAsync('echo wassup')
                        }),
                    ]
                })
            }),
            Widget.Button({
                label: '',
                class_name: 'poweroff',
                on_clicked: () => Utils.execAsync('echo wassup')
            })
        ]
    })
})

const left = Widget.Box({
    hpack: 'start',
    children: [
        Widget.Button({
            label: '',
            class_name: 'launcher',
            on_clicked: () => App.toggleWindow('launcher')
        }),
        workspaces
    ]
})

const center = Widget.Box({
    hpack: 'center',
    children: [
        Widget.Label("")
    ]
})

const right = Widget.Box({
    hpack: 'end',
    children: [
        powermenu
    ]
})

const all = Widget.CenterBox({
    width_request: 300,
    start_widget: left,
    center_widget: center,
    end_widget: right
})

export const bar = Widget.Window({
    name: 'bar',
    anchor: ['top', 'left', 'right'],
    exclusivity: 'exclusive',
    child: all
})