function config --wraps='git --git-dir=$HOME/.dots/ --work-tree=$HOME' --description 'alias config git --git-dir=$HOME/.dots/ --work-tree=$HOME'
  git --git-dir=$HOME/.dots/ --work-tree=$HOME $argv
        
end
