function notify -d "Wrapper for ntfy pub that makes more sense"
    ntfy pub -t $argv[2] $argv[1] $argv[3..-1]
end
