function purge --wraps='yay -Yc' --description 'alias purge yay -Yc'
    pikaur -Rns (pikaur -Qtdq) $argv

end
