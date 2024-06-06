function ports --wraps='nmap localhost' --description 'alias ports nmap localhost'
    nmap localhost $argv

end
