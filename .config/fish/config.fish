set -x ROC_ENABLE_PRE_VEGA 1

set -x MAKEFLAGS -j4
set -x TESTSUITEFLAGS -j4

set -x EDITOR nvim

fish_add_path /home/raptorox/.deno/bin /home/raptorox/.local/bin

starship init fish | source

fish_ssh_agent

abbr snvim 's -E nvim'
