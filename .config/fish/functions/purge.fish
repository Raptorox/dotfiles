function purge --wraps='pikaur -Rns (pikaur -Qtdq)' --description 'alias purge pikaur -Rns (pikaur -Qtdq)'
    pikaur -Rns (pikaur -Qtdq) $argv

end
